# gulp-gnirts

This [gulp](http://gulpjs.com/) plugin is wrapper of [gnirts](https://github.com/anseki/gnirts).

* [Grunt](http://gruntjs.com/) plugin: [grunt-gnirts](https://github.com/anseki/grunt-gnirts)

Obfuscate the string literal in the JavaScript code.

gnirts mangles the string literal more than hexadecimal escape like `"\x66\x6f\x6f"`.  
That hexadecimal escape is found out too easily, and it is decoded too easily. That stands out in the code. The stealers get the secret text easily by pasting that on the console (e.g. Developer Tools of web browser).
gnirts can't protect the string perfectly, but it force a troublesome work upon them.

For example, a string that should be hidden is here:

```js
var password = 'open the sesame';
```

Add the directives:

```js
var password = /* @mangle */ 'open the sesame' /* @/mangle */;
```

The string literal between `/* @mangle */` and `/* @/mangle */` is obfuscated:

```js
var password = (function(){var O=Array.prototype.slice.call(arguments),l=O.shift();return O.reverse().map(function(c,O){return String.fromCharCode(c-l-30-O)}).join('')})(12,155,145,155,153)+(16).toString(36).toLowerCase().split('').map(function(O){return String.fromCharCode(O.charCodeAt()+(-71))}).join('')+(38210).toString(36).toLowerCase()+(16).toString(36).toLowerCase().split('').map(function(O){return String.fromCharCode(O.charCodeAt()+(-71))}).join('')+(function(){var O=Array.prototype.slice.call(arguments),l=O.shift();return O.reverse().map(function(c,O){return String.fromCharCode(c-l-37-O)}).join('')})(41,191,178,195,180,193)+(14).toString(36).toLowerCase();
```

But an above code is no good because a `password` variable can be shown by the debugger (e.g. Developer Tools of web browser).  
Using no variable is better way.  
For example, check whether an input from user is matched to a string literal:

```js
if (userInput === 'open the sesame') {
  console.log('OK, the door will be opened.');
}
```

Add the directives:

```js
if (/* @mangle */ userInput === 'open the sesame' /* @/mangle */) {
  console.log('OK, the door will be opened.');
}
```

The code between `/* @mangle */` and `/* @/mangle */` is obfuscated:

```js
if ((new RegExp('^[\\s\\S]{10}'+((function(){var O=Array.prototype.slice.call(arguments),l=O.shift();return O.reverse().map(function(c,O){return String.fromCharCode(c-l-62-O)}).join('')})(8,171)+(28).toString(36).toLowerCase()+(function(){var O=Array.prototype.slice.call(arguments),l=O.shift();return O.reverse().map(function(c,O){return String.fromCharCode(c-l-26-O)}).join('')})(9,132)+(22).toString(36).toLowerCase()+(function(){var O=Array.prototype.slice.call(arguments),l=O.shift();return O.reverse().map(function(c,O){return String.fromCharCode(c-l-8-O)}).join('')})(19,128)).replace(/(\W)/g,'\\$1'))).test(userInput)&&(userInput).indexOf((function(){var O=Array.prototype.slice.call(arguments),l=O.shift();return O.reverse().map(function(c,O){return String.fromCharCode(c-l-18-O)}).join('')})(13,135)+(14).toString(36).toLowerCase()+(function(){var O=Array.prototype.slice.call(arguments),l=O.shift();return O.reverse().map(function(c,O){return String.fromCharCode(c-l-2-O)}).join('')})(25,59)+(28).toString(36).toLowerCase())===6&&(new RegExp('^[\\s\\S]{5}'+((function(){var O=Array.prototype.slice.call(arguments),l=O.shift();return O.reverse().map(function(c,O){return String.fromCharCode(c-l-3-O)}).join('')})(52,171)).replace(/(\W)/g,'\\$1'))).test(userInput)&&(userInput).indexOf((function(){var O=Array.prototype.slice.call(arguments),l=O.shift();return O.reverse().map(function(c,O){return String.fromCharCode(c-l-55-O)}).join('')})(44,209)+(16).toString(36).toLowerCase().split('').map(function(O){return String.fromCharCode(O.charCodeAt()+(-71))}).join(''))===3&&(new RegExp('^[\\s\\S]{2}'+((function(){var O=Array.prototype.slice.call(arguments),l=O.shift();return O.reverse().map(function(c,O){return String.fromCharCode(c-l-45-O)}).join('')})(7,153)).replace(/(\W)/g,'\\$1'))).test(userInput)&&(userInput).indexOf((function(){var O=Array.prototype.slice.call(arguments),l=O.shift();return O.reverse().map(function(c,O){return String.fromCharCode(c-l-33-O)}).join('')})(25,169)+(25).toString(36).toLowerCase())===0) {
  console.log('OK, the door will be opened.');
}
```

## More Informations
See [gnirts](https://github.com/anseki/gnirts).

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

See [gnirts](https://github.com/anseki/gnirts) for options and more information.
