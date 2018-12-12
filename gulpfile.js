let minify = require('gulp-minify');
let gulp = require('gulp');

gulp.task('js', function() {
    return gulp.src('src/js/*.js')
        .pipe(minify({
            ext: {
                min: '.min.js'
            },
            noSource: true
        }))
        .pipe(gulp.dest('dist/js'));
});

gulp.task('css', function() {
  return gulp.src('src/css/**/*')
    .pipe(gulp.dest('dist/css'));
});
