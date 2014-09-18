var gulp = require('gulp');
var _ = require('./utils');
var source = require('vinyl-source-stream');
var buffer = require('gulp-buffer');
var uglify = require('gulp-uglify');
var _if = require('gulp-if');
var notify = require('gulp-notify');
var debowerify = require('debowerify');

var args = require('yargs').argv;
var isProduction = !!args.production;

var browserify = require('browserify');
var watchify = require('watchify');

module.exports = function () {
    var options = {
        debug: !isProduction
    };
    var bundler = browserify();
    bundler.add(_.path.scripts);
    bundler.transform(debowerify);
    return rebundler(bundler)();
};

module.exports.watch = function () {
    var options = watchify.args;
    options.debug = !isProduction;

    var b = browserify(options);
    b.add(_.path.scripts);
    b.transform(debowerify);

    var bundler = watchify(b);

    var rebundle = rebundler(bundler);
    bundler.on('update', function () {
        rebundle().pipe(notify('Compiled JS'));
    });

    gulp.watch(_.path.scriptsWatch, 'js');
};

function rebundler(bundler) {
    return function () {
        return bundler.bundle()
          .on('error', _.plumb.errorHandler)
          .pipe(source('app.bundle.js'))

          .pipe(_if(isProduction, buffer()))
          .pipe(_if(isProduction, uglify()))

          .pipe(gulp.dest(_.join(_.output, 'build/')));
    };
}
