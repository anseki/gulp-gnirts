'use strict';

var gutil = require('gulp-util'),
  through = require('through2'),
  gnirts = require('gnirts');

module.exports = function() {
  return through.obj(function(file, encoding, callback) {
    if (file.isNull()) {
      return callback(null, file);
    }
    if (file.isStream()) {
      return callback(new gutil.PluginError('gulp-gnirts', 'Streaming not supported'));
    }

    file.contents = new Buffer(gnirts.mangle(file.contents.toString()));
    callback(null, file);
  });
};
