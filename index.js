'use strict';

var PluginError = require('plugin-error'),
  through = require('through2'),
  gnirts = require('gnirts');

module.exports = function() {
  return through.obj(function(file, encoding, callback) { // eslint-disable-line consistent-return
    if (file.isNull()) {
      return callback(null, file);
    }
    if (file.isStream()) {
      return callback(new PluginError('gulp-gnirts', 'Streaming not supported'));
    }

    var content = gnirts.mangle(file.contents.toString());
    // Check `allocUnsafe` to make sure of the new API.
    file.contents = Buffer.allocUnsafe && Buffer.from ? Buffer.from(content) : new Buffer(content);
    callback(null, file);
  });
};
