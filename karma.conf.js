module.exports = function (config) {
  'use strict'
  config.set({

    basePath: '',

    frameworks: ['mocha', 'chai'],

    files: [
      'node_modules/angular/angular.js',
      'node_modules/jquery/dist/jquery.js',
      'client/**/*.js',
      'client/**/*.spec.js'
    ],

    reporters: ['progress'],

    port: 9876,
    colors: true,
    autoWatch: true,
    singleRun: false,
    concurrency: Infinity,

    // level of logging
    // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    logLevel: config.LOG_INFO,

    browsers: ['Chrome'],
    client: {
      mocha: {
        reporter: 'html',
        ui: 'bdd'
      }
    }
  })
}
