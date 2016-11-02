
var gulp = require('gulp');
var htmlmin = require('gulp-htmlmin');//
var cssmin = require('gulp-minify-css');
var concat = require('gulp-concat');
var jsmin = require('gulp-uglify');
var imagemin = require('gulp-imagemin');
 
gulp.task('minify', function() {
  return gulp.src('src/*.html')
    .pipe(htmlmin({collapseWhitespace: true}))
    .pipe(gulp.dest('dist'));
});
gulp.task('minicss',function(){
	gulp.src('src/css/*.css')
	.pipe(concat('merge.min.css'))
	.pipe(cssmin())
	.pipe(gulp.dest('dist/css'));
}); 
gulp.task('minijs',function(){
	gulp.src('src/js/*.js')
	.pipe(concat('merge.min.js'))
	.pipe(jsmin())
	.pipe(gulp.dest('dist/js'));
});
gulp.task('img', function(argument){
    gulp.src('src/img/*')
        .pipe(imagemin())
        .pipe(gulp.dest('dist/imgs'));
});





gulp.task('auto',['minify','minicss','minijs','img']);