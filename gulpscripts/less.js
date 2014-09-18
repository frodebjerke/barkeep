var gulp = require('gulp');
var less = require('gulp-less');
var sourcemaps = require('gulp-sourcemaps');
var _if = require('gulp-if');
var plumber = require('gulp-plumber');
var csso = require('gulp-csso');
var prefix = require('gulp-autoprefixer');
var rename = require('gulp-rename');
var _ = require('./utils');
var watch = require('gulp-watch');
var notify = require('gulp-notify');

var args = require('yargs').argv;
var isProduction = !!args.production;

module.exports = function () {
    return handleStream();
};

module.exports.watch = function () {
    watch({ glob: _.path.lessWatch, emitOnGlob: false }, function () {
        handleStream()
          .pipe(notify('Compiled less'));
    });
};

function handleStream(files) {
    return gulp.src(_.path.less)
      .pipe(plumber(_.plumb))
      .pipe(less())
      .pipe(prefix())
      .pipe(_if(isProduction, csso()))
      .pipe(rename({
          suffix: ".bundle",
      }))
      .pipe(gulp.dest(_.join(_.output, 'build/')));
}
