# gulp-gnirts

[![npm](https://img.shields.io/npm/v/gulp-gnirts.svg)](https://www.npmjs.com/package/gulp-gnirts) [![GitHub issues](https://img.shields.io/github/issues/anseki/gulp-gnirts.svg)](https://github.com/anseki/gulp-gnirts/issues) [![David](https://img.shields.io/david/anseki/gulp-gnirts.svg)](package.json) [![license](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)

This [gulp](http://gulpjs.com/) plugin is wrapper of [gnirts](https://github.com/anseki/gnirts).

* [Grunt](http://gruntjs.com/) plugin: [grunt-gnirts](https://github.com/anseki/grunt-gnirts)
* [webpack](https://webpack.js.org/) loader: [gnirts-loader](https://github.com/anseki/gnirts-loader)

Obfuscate string literals in JavaScript code.  
See [gnirts](https://github.com/anseki/gnirts) for more information about gnirts.

## Getting Started

```shell
npm install gulp-gnirts --save-dev
```

## Usage

`gulpfile.js`

```js
var gulp = require('gulp'),
  gnirts = require('gulp-gnirts');

gulp.task('default', function() {
  return gulp.src('./develop/*.js')
    .pipe(gnirts())
    .pipe(gulp.dest('./public_html/'));
});
```
