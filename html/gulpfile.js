var gulp = require('gulp');
// Requires the gulp-sass plugin
var sass = require('gulp-sass');
var browserSync = require('browser-sync').create();
var useref = require('gulp-useref');
var uglify = require('gulp-uglify');
var gulpIf = require('gulp-if');
var cssnano = require('gulp-cssnano');
var imagemin = require('gulp-imagemin');
var cache = require('gulp-cache');

gulp.task('sass', function() {
  return gulp.src('html-files/assets/scss/**/*.scss')
    .pipe(sass()) // Using gulp-sass
    .pipe(gulp.dest('html-files/assets/css'))
    .pipe(browserSync.reload({
      stream: true
    }))
})


gulp.task('browserSync', function() {
  browserSync.init({
    server: {
      baseDir: 'html-files'
    },
  })
});

gulp.task('watch', function(){
    gulp.watch('html-files/assets/scss/**/*.scss', gulp.series('sass'));
    gulp.watch('html-files/assets/scss/**/*.scss', gulp.series('browserSync'));
});

gulp.task('useref', function(){
  return gulp.src('html-files/*.html')
    .pipe(useref())
    .pipe(gulp.dest('dist'))
});

gulp.task('useref', function(){
  return gulp.src('html-files/*.html')
    .pipe(useref())
    .pipe(gulpIf('*.js', uglify()))
    // Minifies only if it's a CSS file
    .pipe(gulpIf('*.css', cssnano()))
    .pipe(gulp.dest('dist'))
});

gulp.task('images', function(){
  return gulp.src('html-files/assets/img/**/*.+(png|jpg|jpeg|gif|svg)')
  // Caching images that ran through imagemin
  .pipe(cache(imagemin({
      interlaced: true
    })))
  .pipe(gulp.dest('dist/assets/img'))
});