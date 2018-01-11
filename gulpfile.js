var gulp = require('gulp'),
	stylus = require('gulp-stylus'),
	concat = require('gulp-concat'),
	uglify = require('gulp-uglifyjs'),
	cssmin = require('gulp-cssmin'),
	browserSync  = require('browser-sync').create(),
	autoprefixer = require('gulp-autoprefixer'),
    cssbeautify = require('gulp-cssbeautify');
	concatCss = require('gulp-concat-css');
 
gulp.task('browser-sync', ['stylus'], function() {
	browserSync.init({
		server: {
			baseDir: ""
		},
		notify: false
	});
		
});

gulp.task('stylus',  function() {

	return gulp.src([
		'assets/css/style.styl',
	])
	.pipe(stylus())
	.pipe(autoprefixer({
			browsers: ['> 1%', 'last 2 versions'],
			cascade: false
		}))
	.pipe(cssbeautify())
	.pipe(gulp.dest('assets/css/'))
	.pipe(browserSync.stream());
	

});


gulp.task('watch', function() {
  	gulp.watch('assets/css/**/*.styl', ['stylus']);
  	gulp.watch('assets/js/*.js').on('change', browserSync.reload);
  	gulp.watch('*.html').on('change', browserSync.reload);
});



gulp.task('default', ['browser-sync', 'watch']);