var gulp = require('gulp');
var tasks = require('./gulpscripts');

gulp.task('default', ['less', 'js']);
gulp.task('watch', ['watch-js', 'watch-less']);

Object.keys(tasks).forEach(function (key) {
    gulp.task('watch-' + key, [key], tasks[key].watch);
    gulp.task(key, tasks[key]);
});
