// Karma configuration
// http://karma-runner.github.io/0.10/config/configuration-file.html

module.exports = function(config) {
  config.set({
    // base path, that will be used to resolve files and exclude
    basePath: '',

    // testing framework to use (jasmine/mocha/qunit/...)
    frameworks: ['jasmine'],

    // list of files / patterns to load in the browser
    files: [
      'src/vendor/angular/angular.js',
      'src/vendor/ng-table/ng-table.js',
      'src/vendor/angular-bootstrap/ui-bootstrap-tpls.js',
      'src/vendor/angular-route/angular-route.js',
      'src/vendor/angular-animate/angular-animate.js',
      'src/vendor/angular-cookies/angular-cookies.js',
      'src/vendor/angular-resource/angular-resource.js',
      'src/vendor/angular-sanitize/angular-sanitize.js',
      'src/vendor/angular-cache/dist/angular-cache.js',
      'src/vendor/angular-gettext/dist/angular-gettext.js',
      'src/vendor/angular-toastr/dist/angular-toastr.js',
      'src/vendor/moment/moment.js',
      'src/vendor/angular-moment/angular-moment.js',
      'src/vendor/snapjs/snap.js',
      'src/vendor/angular-snap/angular-snap.js',
      'src/vendor/underscore/underscore.js',
      'src/vendor/angular-ui-select/dist/select.js',
      'src/non_bower_components/zenbox/zenbox.js',
      'src/vendor/angular-mocks/angular-mocks.js',
      'src/app/{,**/}/*.module.js',
      'src/app/{,**/}/*.js'
    ],

    // list of files / patterns to exclude
    exclude: [],

    // web server port
    port: 8081,

    // level of logging
    // possible values: LOG_DISABLE || LOG_ERROR || LOG_WARN || LOG_INFO || LOG_DEBUG
    logLevel: config.LOG_INFO,


    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: false,


    // Start these browsers, currently available:
    // - Chrome
    // - ChromeCanary
    // - Firefox
    // - Opera
    // - Safari (only Mac)
    // - PhantomJS
    // - IE (only Windows)
    browsers: ['Chrome'],


    // Continuous Integration mode
    // if true, it capture browsers, run tests and exit
    singleRun: false
  });
};
