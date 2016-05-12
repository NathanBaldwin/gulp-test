var gulp = require('gulp'),
  sass = require('gulp-ruby-sass'),
  autoprefixer = require('gulp-autoprefixer'),
  browserSync = require('browser-sync');
  concat = require('gulp-concat'),
  filter      = require('gulp-filter');

gulp.task('browser-sync', function() {
  var files = [
    './Javascripts/**',
    // './css/**'
   ];

  browserSync.init(files, {
    // server: "./",
    proxy: "http://127.0.0.1:8081/gulp-test"
  });
});

gulp.task('styles', function() {
  return sass('sass/*.scss', { style: 'expanded' })
    .pipe(autoprefixer('last 2 version'))
    .pipe(gulp.dest('css'))
    .pipe(browserSync.stream())
});

gulp.task('updateJS', function() {
  return gulp.src('./Javascripts/**')
    .pipe(browserSync.stream({match: '**/*.js'}))
})


gulp.task('watch', function() {
  gulp.watch('sass/**', ['styles'])
  gulp.watch('Javascripts/**', ['updateJS'])

});

gulp.task('default', ['styles', 'browser-sync', 'watch']);
