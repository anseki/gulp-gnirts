'use strict';

let mangleThrow;
const expect = require('chai').expect,
  sinon = require('sinon'),
  File = require('vinyl'),
  proxyquire = require('proxyquire').noPreserveCache(),
  ERR_MSG = 'ERR_MSG',
  gnirts = {
    mangle: sinon.spy(content => {
      if (mangleThrow) { throw new Error(ERR_MSG); }
      return `${content}<mangle>`;
    })
  },
  plugin = proxyquire('../', {gnirts}),

  CONTENTS = 'content',
  RES_METHOD = `${CONTENTS}<mangle>`;

function resetAll() {
  gnirts.mangle.resetHistory();
}

function newBufferFile(path) {
  return new File({
    // Check `allocUnsafe` to make sure of the new API.
    contents: Buffer.allocUnsafe && Buffer.from ? Buffer.from(CONTENTS) : new Buffer(CONTENTS),
    path
  });
}

describe('implements a basic flow as Buffer based plugin', () => {

  it('should accept contents from Buffer', done => {
    mangleThrow = false;
    resetAll();
    const pluginStream = plugin(),
      passedFile = newBufferFile();
    expect(passedFile.isNull()).to.be.false;
    expect(passedFile.isStream()).to.be.false;
    expect(passedFile.isBuffer()).to.be.true;

    pluginStream.write(passedFile);
    pluginStream.once('data', file => {
      expect(file.isNull()).to.be.false;
      expect(file.isStream()).to.be.false;
      expect(file.isBuffer()).to.be.true;
      expect(gnirts.mangle.calledOnceWithExactly(CONTENTS)).to.be.true;
      expect(file.contents.toString()).to.equal(RES_METHOD);

      done();
    });
  });

  it('should throw an error if a Stream is input', () => {
    mangleThrow = false;
    resetAll();
    const pluginStream = plugin(),
      passedFile = new File({
        contents: new (require('stream')).Readable({objectMode: true})
          .wrap(require('event-stream').readArray(['stream', 'with', 'those', 'contents']))
      });
    expect(passedFile.isNull()).to.be.false;
    expect(passedFile.isStream()).to.be.true;
    expect(passedFile.isBuffer()).to.be.false;

    expect(() => { pluginStream.write(passedFile); }).to.throw('Streaming not supported');
    expect(gnirts.mangle.notCalled).to.be.true;
  });

  it('should skip process if a null is input', done => {
    mangleThrow = false;
    resetAll();
    const pluginStream = plugin(),
      passedFile = new File();
    expect(passedFile.isNull()).to.be.true;
    expect(passedFile.isStream()).to.be.false;
    expect(passedFile.isBuffer()).to.be.false;

    pluginStream.write(passedFile);
    pluginStream.once('data', file => {
      expect(file.isNull()).to.be.true;
      expect(file.isStream()).to.be.false;
      expect(file.isBuffer()).to.be.false;
      expect(gnirts.mangle.notCalled).to.be.true;

      done();
    });
  });

});

describe('mangle()', () => {

  it('should return processed value by method', done => {
    mangleThrow = false;
    resetAll();
    const pluginStream = plugin();
    pluginStream.write(newBufferFile());
    pluginStream.once('data', file => {
      expect(gnirts.mangle.calledOnceWithExactly(CONTENTS)).to.be.true;
      expect(file.contents.toString()).to.equal(RES_METHOD);

      done();
    });
  });

  it('should throw an error if mangle failed', done => {
    mangleThrow = false;
    resetAll();
    let pluginStream = plugin();
    pluginStream.write(newBufferFile());
    pluginStream.once('data', file => {
      expect(gnirts.mangle.calledOnceWithExactly(CONTENTS)).to.be.true;
      expect(file.contents.toString()).to.equal(RES_METHOD);

      // Throws
      mangleThrow = true;
      resetAll();
      pluginStream = plugin();
      expect(() => { pluginStream.write(newBufferFile()); }).to.throw(ERR_MSG);
      expect(gnirts.mangle.calledOnceWithExactly(CONTENTS)).to.be.true;

      done();
    });
  });

});
