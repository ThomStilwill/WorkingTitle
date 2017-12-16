var gulp = require('gulp'),
    pump = require('pump'),
    watch = require('gulp-watch'),
    concat = require('gulp-concat'),
    path = require('path'),
    fs = require('fs'),
    less = require('gulp-less'),
    clean = require('gulp-clean-dest'),
    distfolder = 'dist/web/';

gulp.task('default',['app','content', 'less','libs','fonts'], function(){

})

gulp.task('watch', ['default'], function(){
    return gulp.watch(['less/**/*.less',
                       'client/**/*.*'
                        ]
                       ,['default']);
})

gulp.task('content',function(cb){
    var dest = distfolder;

    pump([
        gulp.src(['client/index.html']),
        gulp.dest(dest),
    ],cb);
})


gulp.task('fonts',  function(cb){
    var dest = distfolder + 'fonts';

    pump([
        gulp.src(['node_modules/bootstrap/dist/fonts/*.*']),
        gulp.dest(dest)
    ],cb)
})

gulp.task('cleancss',function(cb){
    // var dest = distfolder + 'css';
    // return clean(dest,null,{force: true});
})

gulp.task('less',  function(cb){
    var dest = distfolder + 'css';

    pump([
        gulp.src([  'node_modules/bootstrap/less/bootstrap.less',
                    'client/less/*.less',
                  ]),
        less(),
        concat('app.css'),
        gulp.dest(dest)
    ],cb)
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

gulp.task('cleanlibs',function(cb){
    var dest = distfolder + 'scripts';

    pump([
        clean(dest,null,{force: true}),
        gulp.dest(dest)
    ],cb)
})

gulp.task('libs', function(cb){
    var dest = distfolder + 'scripts';

    pump([
        gulp.src(['node_modules/angular/angular.min.js',
                  'node_modules/angular-ui-router/release/angular-ui-router.min.js',
                  'node_modules/jquery/dist/jquery.min.js',
                  'node_modules/bootstrap/dist/js/bootstrap.min.js'
                    ]),
        concat('libs.js'),
        gulp.dest(dest)
    ],cb)
})

gulp.task('app-templates', function(cb){
    var dest = distfolder + 'app';

    pump([
        gulp.src(['client/app/**/*.html']),
        gulp.dest(dest)
    ],cb)
})

gulp.task('app',['app-templates'], function(cb){
    var dest = distfolder + 'app';

    pump([
        gulp.src(['client/app/**/*.js']),
        concat('app.js'),
        gulp.dest(dest)
    ],cb)
})
