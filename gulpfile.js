var gulp = require('gulp'),
  pump = require('pump'),
  watch = require('gulp-watch'),
  concat = require('gulp-concat'),
  sourcemaps = require('gulp-sourcemaps'),
  path = require('path'),
  fs = require('fs'),
  less = require('gulp-less'),
  clean = require('gulp-clean-dest'),
  distfolderweb = 'dist/web/'
distfolderserver = 'dist/server/'

gulp.task('default', ['server', 'app', 'content', 'less', 'libs', 'fonts'], function () {

})

gulp.task('watch', ['default'], function () {
  return gulp.watch(['less/**/*.less',
    'client/**/*.*'
  ]
    , ['default'])
})

gulp.task('content', function (cb) {
  var dest = distfolderweb

  pump([
    gulp.src(['client/index.html']),
    gulp.dest(dest)
  ], cb)
})

gulp.task('fonts', function (cb) {
  var dest = distfolderweb + 'fonts'

  pump([
    gulp.src(['node_modules/bootstrap/dist/fonts/*.*']),
    gulp.dest(dest)
  ], cb)
})

gulp.task('cleancss', function (cb) {
  // var dest = distfolder + 'css';
  // return clean(dest,null,{force: true});
})

gulp.task('less', function (cb) {
  var dest = distfolderweb + 'css'

  pump([
    gulp.src([ 'node_modules/bootstrap/less/bootstrap.less',
      'client/less/*.less'
    ]),
    less(),
    concat('app.css'),
    gulp.dest(dest)
  ], cb)
})

// gulp.task('css', function(cb){
//     var dest = distfolder + 'css';

//     pump([
//         gulp.src([]),
//         less(),
//         concat('libs.css'),
//         gulp.dest(dest)
//     ],cb)
// })

gulp.task('cleanlibs', function (cb) {
  var dest = distfolderweb + 'scripts'

  pump([
    clean(dest, null, {force: true}),
    gulp.dest(dest)
  ], cb)
})

gulp.task('libs', function (cb) {
  var dest = distfolderweb + 'scripts'

  pump([
    gulp.src(['node_modules/angular/angular.min.js',
      'node_modules/angular-ui-router/release/angular-ui-router.min.js',
      'node_modules/jquery/dist/jquery.min.js',
      'node_modules/bootstrap/dist/js/bootstrap.min.js',
      'node_modules/moment/moment.js',
      'client/scripts/**/*.js'
    ]),
    concat('libs.js'),
    gulp.dest(dest)
  ], cb)
})

gulp.task('app-templates', function (cb) {
  var dest = distfolderweb + 'app'

  pump([
    gulp.src(['client/app/**/*.html', 'client/app/**/*.json']),
    gulp.dest(dest)
  ], cb)
})

gulp.task('app', ['app-templates'], function (cb) {
  var dest = distfolderweb + 'app'

  pump([
    gulp.src(['client/app/**/*.js']),
    sourcemaps.init(),
    concat('app.js'),
    sourcemaps.write('../maps'),
    gulp.dest(dest)
  ], cb)
})

gulp.task('server', [], function (cb) {
  var dest = distfolderserver

  pump([
    gulp.src(['server/**/*.*']),
    gulp.dest(dest)
  ], cb)
})

gulp.task('deploy', function (cb) {
  var deployTarget = '\\\\mars\\node_apps\\web'

  pump([
    gulp.src(['dist/**/*.*']),
    gulp.dest(deployTarget)
  ], cb)
})
