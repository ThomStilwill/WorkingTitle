var gulp = require('gulp')
var pump = require('pump')
var concat = require('gulp-concat')
var sourcemaps = require('gulp-sourcemaps')
var Server = require('karma').Server
var less = require('gulp-less')
var clean = require('gulp-clean')
var notify = require('gulp-notify')

var distfolder = 'dist/'
var distfolderweb = distfolder + 'web/'
var distfolderserver = distfolder + 'server/'
var deployTarget = '\\\\mars\\node_apps\\web'

gulp.task('default', ['tools', 'server', 'app', 'vue', 'content', 'less', 'libs', 'fonts'])

gulp.task('watch', ['default'], function () {
  gulp.watch(['less/**/*.less', 'client/**/*.*'], ['default'])
})

gulp.task('content', function (cb) {
  var dest = distfolderweb

  pump([
    gulp.src(['client/*.html']),
    gulp.dest(dest)
  ], cb)
})

gulp.task('fonts', function (cb) {
  var dest = distfolderweb + 'fonts'

  pump([
    gulp.src(['node_modules/bootstrap/dist/fonts/*.*',
      'node_modules/font-awesome/fonts/*.*']),
    gulp.dest(dest)
  ], cb)
})

gulp.task('cleancss', function (cb) {
  var dest = distfolderweb + 'css'
  return clean(dest, {force: true})
})

gulp.task('less', function (cb) {
  var dest = distfolderweb + 'css'

  pump([
    gulp.src([ 'node_modules/bootstrap/less/bootstrap.less',
      'node_modules/font-awesome/less/font-awesome.less',
      // 'node_modules/angular-ui-bootstrap/dist/ui-bootstrap-csp.css',
      'client/less/*.less'
    ]),
    sourcemaps.init(),
    less(),
    concat('app.css'),
    sourcemaps.write('../maps'),
    gulp.dest(dest)
  ], cb)
})

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
      'node_modules/angular-messages/angular-messages.min.js',
      'node_modules/angular-ui-router/release/angular-ui-router.min.js',
      'node_modules/angular-ui-bootstrap/dist/ui-bootstrap-tpls.js',
      'node_modules/vue/dist/vue.js',
      'node_modules/jquery/dist/jquery.min.js',
      'node_modules/bootstrap/dist/js/bootstrap.min.js',
      'node_modules/moment/moment.js',
      'client/scripts/**/*.js'
    ]),
    concat('libs.js'),
    gulp.dest(dest)
  ], cb)
})

gulp.task('clean-app', function (cb) {
  var dest = distfolderweb + 'app'

  pump([
    gulp.src([dest + '**/*.*']),
    clean({force: true})
  ], cb)
})

gulp.task('app-templates', ['clean-app'], function (cb) {
  var dest = distfolderweb + 'app'

  pump([
    gulp.src(['client/app/**/*.html']),
    gulp.dest(dest)
  ], cb)
})

gulp.task('app', ['clean-app', 'app-templates'], function (cb) {
  var dest = distfolderweb + 'app'

  pump([
    gulp.src(['client/app/**/*.js', '!client/app/**/*.spec.js']),
    sourcemaps.init(),
    concat('app.js'),
    sourcemaps.write('../maps'),
    gulp.dest(dest)
  ], cb)
})

gulp.task('vue', ['clean-app'], function (cb) {
  var dest = distfolderweb + 'app'

  pump([
    gulp.src(['client/vue/**/*.js', '!client/vue/**/*.spec.js']),
    concat('vueapp.js'),
    gulp.dest(dest)
  ], cb)
})

gulp.task('server', function (cb) {
  var dest = distfolderserver

  pump([
    gulp.src(['server/**/*.*']),
    gulp.dest(dest)
  ], cb)
})

gulp.task('tools', function (cb) {
  var dest = distfolder

  pump([
    gulp.src(['package.json', 'restart.cmd']),
    gulp.dest(dest)
  ], cb)
})

gulp.task('tdd', function (done) {
  new Server({
    configFile: __dirname + '/karma.conf.js'
  }, done).start()
})

gulp.task('cleandeploy', function (cb) {
  // deployTarget + 'server', {force: true}
  // pump([
  //   gulp.src([deployTarget + 'web/' + '**/*.*']),
  //   clean({force: true})
  // ], cb)
})

gulp.task('deploy', function (cb) {
  pump([
    gulp.src(['dist/**/*.*', 'package.json', 'restart.cmd']),
    gulp.dest(deployTarget)
  ], cb)
})
