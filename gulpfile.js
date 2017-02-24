var gulp = require('gulp');
var minify = require('gulp-minify');
 
gulp.task('js', function() {
  gulp.src('edsUI.js')
    .pipe(minify({
        ext: {
            min: '.min.js'
        }
    }))
    .pipe(gulp.dest('dist/js'))
});

gulp.task('css', function() {
  gulp.src('edsUI.css')
    .pipe(minify({
        ext:{
            min:'.min.css'
        }
    }))
    .pipe(gulp.dest('dist/css'))
});


gulp.task('img', function() {
  gulp.src('images/*')
    .pipe(minify({}))
    .pipe(gulp.dest('dist/css/images'))
});

gulp.task('compress', ['js','css', 'img']);
