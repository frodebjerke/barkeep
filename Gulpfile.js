var gulp = require('gulp');
var tasks = require('./gulpscripts');

gulp.task("less", tasks.less);
gulp.task("watch-less", tasks.less.watch);

gulp.task("js", tasks.js);
gulp.task("watch-js", tasks.js.watch);

gulp.task('default', ['less', 'js']);

gulp.task('watch', ['watch-js', 'watch-less']);
