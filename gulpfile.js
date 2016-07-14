/*this file is required for Sass compile*/

'use strict';
 
var gulp = require('gulp');
var sass = require('gulp-sass');
 
gulp.task('sass', function () {
	/*filepath to the main css file*/
  return gulp.src('.assets/css/main.scss')
    .pipe(sass().on('error', sass.logError))
    /*default css destination*/
    .pipe(gulp.dest('./css'));
});
 
gulp.task('sass:watch', function () {
	/*listens to Sass*/
  gulp.watch('./assets/css/main.scss', ['sass']);
});
