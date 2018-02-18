var gulp = require('gulp')
var pump = require('pump')
var Server = require('karma').Server

var concat = require('gulp-concat')
var sourcemaps = require('gulp-sourcemaps')
var less = require('gulp-less')
var clean = require('gulp-rimraf')
// var notify = require('gulp-notify')

var browserify = require('browserify')
var stringify = require('stringify')
var source = require('vinyl-source-stream')

var distfolder = 'dist/'
var distfolderweb = distfolder + 'web/'
var distfolderserver = distfolder + 'server/'
var deployTarget = '\\\\mars\\node_apps\\web'

gulp.task('cleandist', function (cb) {
  var dest = distfolder
  pump([
    gulp.src(dest + '/*', {read: false}),
    clean()
  ], cb)
})

gulp.task('tools', function (cb) {
  var dest = distfolder

  pump([
    gulp.src(['package.json', 'restart.cmd']),
    gulp.dest(dest)
  ], cb)
})

gulp.task('content', function (cb) {
  var dest = distfolderweb

  pump([
    gulp.src(['client/*.html']),
    gulp.dest(dest)
  ], cb)
})

gulp.task('css', function (cb) {
  var dest = distfolderweb + 'css'

  pump([
    gulp.src([
      'node_modules/angular-ui-grid/ui-grid.woff',
      'node_modules/angular-ui-grid/ui-grid.ttf'
    ]),
    gulp.dest(dest)
  ], cb)
})

gulp.task('fonts', function (cb) {
  var dest = distfolderweb + 'fonts'

  pump([
    gulp.src(['node_modules/bootstrap/dist/fonts/*.*',
      'node_modules/font-awesome/fonts/*.*'
    ]),
    gulp.dest(dest)
  ], cb)
})

gulp.task('cleancss', function (cb) {
  var dest = distfolderweb + 'css'
  return clean(dest, {force: true, read: false})
})

gulp.task('less', function (cb) {
  var dest = distfolderweb + 'css'

  pump([
    gulp.src([ 'node_modules/bootstrap/less/bootstrap.less',
      'node_modules/font-awesome/less/font-awesome.less',
      'node_modules/angular-ui-grid/ui-grid.css',
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
    clean(dest, null, {force: true, read: false}),
    gulp.dest(dest)
  ], cb)
})

gulp.task('vuelibs', function (cb) {
  var dest = distfolderweb + 'scripts'

  pump([
    gulp.src([
      'node_modules/vue/dist/vue.js',
      'node_modules/vue-router/dist/vue-router.js',
      'node_modules/vue-the-mask/dist/vue-the-mask.js',
      'node_modules/vee-validate/dist/vee-validate.js',
      'node_modules/axios/dist/axios.js',
      'node_modules/jquery/dist/jquery.min.js',
      'node_modules/bootstrap/dist/js/bootstrap.min.js',
      'client/scripts/**/*.js',
      '!client/**/*.spec.js'
    ]),
    concat('vuelibs.js'),
    gulp.dest(dest)
  ], cb)
})

gulp.task('nglibs', function (cb) {
  var dest = distfolderweb + 'scripts'

  pump([
    gulp.src(['node_modules/angular/angular.min.js',
      'node_modules/angular-messages/angular-messages.min.js',
      'node_modules/angular-ui-router/release/angular-ui-router.min.js',
      'node_modules/angular-ui-bootstrap/dist/ui-bootstrap-tpls.js',
      'node_modules/angular-ui-grid/ui-grid.js',
      'node_modules/jquery/dist/jquery.min.js',
      'node_modules/bootstrap/dist/js/bootstrap.min.js',
      'node_modules/moment/moment.js',
      'client/scripts/**/*.js',
      '!client/**/*.spec.js'
    ]),
    concat('nglibs.js'),
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

gulp.task('app-templates', gulp.series('clean-app', function (cb) {
  var dest = distfolderweb + 'app'

  pump([
    gulp.src(['client/app/**/*.html']),
    gulp.dest(dest)
  ], cb)
}))

gulp.task('app', gulp.series('clean-app', 'app-templates', function (cb) {
  var dest = distfolderweb + 'app'

  pump([
    gulp.src(['client/app/**/*.js', '!client/app/**/*.spec.js']),
    sourcemaps.init(),
    concat('app.js'),
    sourcemaps.write('../maps'),
    gulp.dest(dest)
  ], cb)
}))

gulp.task('vue', function (cb) {
  var dest = distfolderweb + 'app'
  pump([
    browserify('./client/vue/boot.js', {extensions: '.html', debug: true})
      .transform(stringify, {
        appliesTo: { includeExtensions: ['.html'] },
        minify: true
      })
      .transform('babelify', {presets: ['env']})
      .bundle(),
    source('vueapp.js'),
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

gulp.task('tdd', function (cb) {
  new Server({
    configFile: path.join(__dirname, '/karma.conf.js')
  }, cb).start()
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

gulp.task('default', gulp.series('tools', 'content', 'server', 'app', 'vue', 'less', 'css', 'vuelibs', 'nglibs', 'fonts'))

gulp.task('watch-content', function () {
  gulp.watch(['client/*.html'], gulp.task('content'))
})

gulp.task('watch-less', function () {
  gulp.watch(['client/less/**/*.less'], gulp.task('less'))
})

gulp.task('watch-app', function () {
  gulp.watch(['client/app/**/*.*'], gulp.task('app'))
})

gulp.task('watch-vue', function () {
  gulp.watch(['client/vue/**/*.*'], gulp.task('vue'))
})

gulp.task('watch', gulp.parallel('watch-less', 'watch-app', 'watch-vue', 'watch-content'))
