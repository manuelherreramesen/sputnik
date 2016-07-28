// Generated on 2014-01-15 using generator-angular 0.7.1
'use strict';

module.exports = function (grunt) {

    var env = grunt.option('env') || 'server';
    var settings = {
        // grunt serve (local server)
        server: {
            name: 'server',
            cdn: '//localhost:8080',
            apiEndpoint: '/casino/api',
            adyenSkin: 'Xei5n0YO',
            netentServer: 'https://cosmopolitan-game-test.casinomodule.com/',
            piqServer: 'https://payments.blingcity.com/paymentiq/',
            piqMerchantId: '100010999'
        },
        // grunt build --env=development (test.cosmo-bling.com)
        development: {
            name: 'development',
            cdn: 'https://d3qmiwvctqznko.cloudfront.net',
            apiEndpoint: '/casino/api',
            adyenSkin: 'Xei5n0YO',
            netentServer: 'https://cosmopolitan-game-test.casinomodule.com/',
            piqServer: 'https://payments.blingcity.com/paymentiq/',
            piqMerchantId: '100010999'
        },
        // grunt build --env=staging (www.cosmo-bling.com)
        staging: {
            name: 'staging',
            cdn: 'https://d28jpx0w753s0b.cloudfront.net',
            apiEndpoint: '/casino/api',
            adyenSkin: 'Xei5n0YO',
            netentServer: 'https://cosmopolitan-game-test.casinomodule.com/',
            piqServer: 'https://payments.blingcity.com/paymentiq/',
            piqMerchantId: '100010999'
        },
        // grunt build --env=production (www.blingcity.com)
        production: {
            name: 'production',
            cdn: 'https://d2dvtgjvlf7wzl.cloudfront.net',
            apiEndpoint: '/casino/api',
            adyenSkin: 'Xei5n0YO',
            netentServer: 'https://cosmopolitan-game.casinomodule.com/',
            piqServer: '',
            piqMerchantId: '100010001100010001'
        }
    };

    // Load grunt tasks automatically
    require('load-grunt-tasks')(grunt);

    // Time how long tasks take. Can help when optimizing build times
    require('time-grunt')(grunt);

    // Define the configuration for all the tasks
    grunt.initConfig({

        environment: env,

        // Project settings
        yeoman: {
            // configurable paths
            pkg: grunt.file.readJSON('package.json'),
            src: require('./bower.json').appPath || 'src',
            dist: 'dist'
        },

        // Wrapped these are strings to stop jshint moaning about non-camelcase
        'nggettext_extract': {
            pot: {
                files: {
                    '<%= yeoman.src %>/languages/template.pot': [
                        '<%= yeoman.src %>/index.html',
                        '<%= yeoman.src %>/languages/__dynamic-strings.html',
                        '<%= yeoman.src %>/template/**/*.html',
                        '<%= yeoman.src %>/app/{,**/}*.html',
                        '<%= yeoman.src %>/app/{,**/}*.js'
                    ]
                }
            }
        },
        'nggettext_compile': {
            all: {
                options: {
                    format: 'json'
                },
                files: {
                    '<%= yeoman.src %>/languages/en_US.json': ['<%= yeoman.src %>/languages/en_US.po'],
                    '<%= yeoman.src %>/languages/sv_SE.json': ['<%= yeoman.src %>/languages/sv_SE.po']
                }
            }
        },

        // For creating an ENV constant within Angular
        ngconstant: {
            options: {
                space: '  ',
                wrap: '"use strict";\n\n {%= __ngModule %}',
                name: 'config',
                constants: {
                    LANGUAGES: [
                        {
                            code: 'en_US',
                            text: 'English',
                            supportCode: '20240852'
                        }, {
                            code: 'sv_SE',
                            text: 'Svenska',
                            supportCode: '20236731'
                        }
                    ]
                }
            },
            // Environment targets
            server: {
                options: {
                    dest: '<%= yeoman.src %>/app/config.js'
                },
                constants: {
                    ENV: settings[env]
                }
            },
            development: {
                options: {
                    dest: '<%= yeoman.src %>/app/config.js'
                },
                constants: {
                    ENV: settings[env]
                }
            },
            staging: {
                options: {
                    dest: '<%= yeoman.src %>/app/config.js'
                },
                constants: {
                    ENV: settings[env]
                }
            },
            production: {
                options: {
                    dest: '<%= yeoman.src %>/app/config.js'
                },
                constants: {
                    ENV: settings[env]
                }
            }
        },

        webfont: {
            icons: {
                src: '<%= yeoman.src %>/images/icons/*.svg',
                dest: '<%= yeoman.src %>/fonts',
                destCss: '<%= yeoman.src %>/styles',
                options: {
                    engine: 'fontforge',
                    stylesheet: 'scss',
                    relativeFontPath: '/fonts',
                    htmlDemo: false,
                    syntax: 'bem',
                    templateOptions: {
                        baseClass: 'icon',
                        classPrefix: 'icon-',
                        mixinPrefix: 'icon-'
                    }
                }
            }
        },

        // Watches files for changes and runs tasks based on the changed files
        watch: {
            js: {
                files: ['<%= yeoman.src %>/app/{,**/}*.js'],
                tasks: ['newer:jshint:all'],
                options: {
                    livereload: false
                }
            },
            jsTest: {
                files: ['<%= yeoman.src %>/app/{,**/}*.spec.js'],
                tasks: ['newer:jshint:test', 'karma']
            },
            compass: {
                files: [
                    '<%= yeoman.src %>/app/{,**/}*.{scss,sass}',
                    '<%= yeoman.src %>/styles/{,**/}*.{scss,sass}'
                ],
                tasks: ['compass:server', 'autoprefixer']
            },
            gruntfile: {
                files: ['Gruntfile.js']
            },
            livereload: {
                options: {
                    livereload: '<%= connect.options.livereload %>'
                },
                files: [
                    '<%= yeoman.src %>/{,**/}*.html',
                    '.tmp/styles/{,**/}*.css'
                ]
            }
        },

        // The actual grunt server settings
        connect: {
            options: {
                port: 9000,
                hostname: '0.0.0.0',
                livereload: 35729
            },
            proxies: [{
                context: '/casino',
                host: 'localhost',
                port: 8080,
                changeOrigin: false,
                xforward: true,
                // rewrite: {
                //     '^/api.*': '/casino\\1'
                // },
                ws: true
            }],
            livereload: {
                options: {
                    open: true,
                    base: [
                        '.tmp',
                        '<%= yeoman.src %>'
                    ],
                    middleware: function (connect, options) {
                        if (!Array.isArray(options.base)) {
                            options.base = [options.base];
                        }

                        // Setup the proxy
                        var middlewares = [require('grunt-connect-proxy/lib/utils').proxyRequest];

                        // Serve static files.
                        options.base.forEach(function(base) {
                            middlewares.push(connect.static(base));
                        });

                        // Make directory browse-able.
                        var directory = options.directory || options.base[options.base.length - 1];
                        middlewares.push(connect.directory(directory));

                        return middlewares;
                    }
                }
            },
            test: {
                options: {
                    port: 9001,
                    base: [
                        '.tmp',
                        'test',
                        '<%= yeoman.src %>'
                    ]
                }
            },
            dist: {
                options: {
                    base: '<%= yeoman.dist %>'
                }
            }
        },

        // Make sure code styles are up to par and there are no obvious mistakes
        jshint: {
            options: {
                jshintrc: '.jshintrc',
                reporter: require('jshint-stylish'),
                ignores: [
                    '<%= yeoman.src %>/app/config.js',
                    '<%= yeoman.src %>/app/utils.js',
                    '<%= yeoman.src %>/app/common/ui.bootstrap.tooltip.js',
                    '<%= yeoman.src %>/app/common/ui.bootstrap.popover.js'
                ]
            },
            all: [
                'Gruntfile.js',
                '<%= yeoman.src %>/app/{,**/}*.js'
            ],
            test: {
                options: {
                    jshintrc: '.jshintrc'
                },
                src: ['<%= yeoman.src %>/app/{,**/}*.spec.js']
            }
        },

        // Empties folders to start fresh
        clean: {
            dist: {
                files: [{
                    dot: true,
                    src: [
                        '.tmp',
                        '<%= yeoman.dist %>/*',
                        '!<%= yeoman.dist %>/.git*'
                    ]
                }]
            },
            server: '.tmp'
        },

        // Add vendor prefixed styles
        autoprefixer: {
            options: {
                browsers: ['last 1 version']
            },
            dist: {
                files: [{
                    expand: true,
                    cwd: '.tmp/styles/',
                    src: '{,**/}*.css',
                    dest: '.tmp/styles/'
                }]
            }
        },

        // Automatically inject Bower components into the app
        'bower-install': {
            app: {
                html: '<%= yeoman.src %>/index.html',
                ignorePath: '<%= yeoman.src %>/'
            }
        },

        // Compiles Sass to CSS and generates necessary files if requested
        compass: {
            options: {
                sassDir: '<%= yeoman.src %>/styles',
                cssDir: '.tmp/styles',
                generatedImagesDir: '.tmp/images/generated',
                imagesDir: '<%= yeoman.src %>/images',
                javascriptsDir: '<%= yeoman.src %>/app',
                fontsDir: '<%= yeoman.src %>/fonts',
                importPath: '<%= yeoman.src %>',
                httpImagesPath: '/images',
                httpGeneratedImagesPath: '/images/generated',
                httpFontsPath: '/fonts',
                relativeAssets: false,
                assetCacheBuster: false,
                raw: 'Sass::Script::Number.precision = 10\n'
            },
            dist: {
                options: {
                    generatedImagesDir: '<%= yeoman.dist %>/images/generated',
                    httpImagesPath: settings[env].cdn + '/images',
                    httpFontsPath: settings[env].cdn + '/fonts'
                }
            },
            server: {
                options: {
                    debugInfo: true
                }
            }
        },

        // Renames files for browser caching purposes
        rev: {
            dist: {
                files: {
                    src: [
                        '<%= yeoman.dist %>/app/{,**/}*.js',
                        '<%= yeoman.dist %>/styles/{,**/}*.css'
                        //'<%= yeoman.dist %>/images/{,**/}*.{png,jpg,jpeg,gif,webp,svg}',
                        //'<%= yeoman.dist %>/fonts/*'
                    ]
                }
            }
        },

        // Reads HTML for usemin blocks to enable smart builds that automatically
        // concat, minify and revision files. Creates configurations in memory so
        // additional tasks can operate on them
        useminPrepare: {
            html: '<%= yeoman.src %>/index.html',
            options: {
                dest: '<%= yeoman.dist %>'
            }
        },

        // Performs rewrites based on rev and the useminPrepare configuration
        usemin: {
            html: ['<%= yeoman.dist %>/{,**/}*.html'],
            css: ['<%= yeoman.dist %>/styles/{,**/}*.css'],
            options: {
                assetsDirs: ['<%= yeoman.dist %>']
            }
        },

        uglify: {
            options: {
                banner: '/*! <%= yeoman.pkg.name %> - v<%= yeoman.pkg.version %> - ' +
                        '<%= grunt.template.today("isoDateTime") %> */\n'
            }
        },

        // The following *-min tasks produce minified files in the dist folder
        imagemin: {
            dist: {
                files: [{
                    expand: true,
                    cwd: '<%= yeoman.src %>/images',
                    src: '{,*/}*.{png,jpg,jpeg,gif}',
                    dest: '<%= yeoman.dist %>/images'
                }]
            }
        },
        svgmin: {
            dist: {
                files: [{
                    expand: true,
                    cwd: '<%= yeoman.src %>/images',
                    src: '{,**/}*.svg',
                    dest: '<%= yeoman.dist %>/images'
                }]
            }
        },
        htmlmin: {
            dist: {
                options: {
                    removeCommentsFromCDATA: true,
                    removeOptionalTags: true,
                    collapseBooleanAttributes: true,
                    collapseWhitespace: true,
                    removeAttributeQuotes: true,
                    removeComments: true, // Only if you don't use comment directives!
                    removeEmptyAttributes: true,
                    removeRedundantAttributes: true,
                    removeScriptTypeAttributes: true,
                    removeStyleLinkTypeAttributes: true

                },
                files: [{
                    expand: true,
                    cwd: '<%= yeoman.dist %>',
                    src: ['*.html', 'app/{,**/}*.html'],
                    dest: '<%= yeoman.dist %>'
                }]
            }
        },

        // Allow the use of non-minsafe AngularJS files. Automatically makes it
        // minsafe compatible so Uglify does not destroy the ng references
        ngmin: {
            dist: {
                files: [{
                    expand: true,
                    cwd: '.tmp/concat/app',
                    src: '*.js',
                    dest: '.tmp/concat/app'
                }]
            }
        },

        // Replace Google CDN references
        cdnify: {
            dist: {
                options: {
                    base: settings[env].cdn
                },
                files: [{
                    expand: true,
                    cwd: '<%= yeoman.dist %>',
                    src: '*.html',
                    dest: '<%= yeoman.dist %>'
                }]
            }
        },

        // Copies remaining files to places other tasks can use
        copy: {
            dist: {
                files: [{
                    expand: true,
                    dot: true,
                    cwd: '<%= yeoman.src %>',
                    dest: '<%= yeoman.dist %>',
                    src: [
                        '*.{ico,png,txt}',
                        '.htaccess',
                        'robots.txt',
                        '*.html',
                        'app/*.html',
                        'images/{,**/}*.{webp}',
                        'fonts/*',
                        'app/data/**/*.json',
                        'languages/*.json'
                    ]
                }, {
                    expand: true,
                    cwd: '<%= yeoman.src %>/images',
                    dest: '<%= yeoman.dist %>/images',
                    src: ['**/*']
                }, {
                    expand: true,
                    cwd: '<%= yeoman.src %>/miami',
                    dest: '<%= yeoman.dist %>/miami',
                    src: ['**/*']
                }, {
                    expand: true,
                    cwd: '<%= yeoman.src %>/wild-welcome',
                    dest: '<%= yeoman.dist %>/wild-welcome',
                    src: ['**/*']
                }]
            },
            styles: {
                expand: true,
                cwd: '<%= yeoman.src %>/styles',
                dest: '.tmp/styles/',
                src: '{,**/}*.css'
            }
        },

        ngtemplates: {
            sputnikApp: {
                options: {
                    prefix: '/'
                },
                cwd: '<%= yeoman.src %>',
                src: [
                    'app/{,**/}*.tpl.html',
                    'template/{,**/}*.html'
                ],
                dest: '.tmp/templates/templates.js'
            }
        },

        // Run some tasks in parallel to speed up the build process
        concurrent: {
            server: [
                'compass:server'
            ],
            test: [
                'compass'
            ],
            dist: [
                'compass:dist',
                //'imagemin',
                'svgmin'
            ]
        },

        // By default, your `index.html`'s <!-- Usemin block --> will take care of
        // minification. These next options are pre-configured if you do not wish
        // to use the Usemin blocks.
        // cssmin: {
        //   dist: {
        //     files: {
        //       '<%= yeoman.dist %>/styles/main.css': [
        //         '.tmp/styles/{,**/}*.css',
        //         '<%= yeoman.src %>/styles/{,**/}*.css'
        //       ]
        //     }
        //   }
        // },
        // uglify: {
        //   dist: {
        //     files: {
        //       '<%= yeoman.dist %>/app/app.js': [
        //         '<%= yeoman.dist %>/app/app.js'
        //       ]
        //     }
        //   }
        // },
        // concat: {
        //   dist: {}
        // },

        // Test settings
        karma: {
            unit: {
                configFile: 'karma.conf.js',
                singleRun: true
            }
        }
    });

    grunt.registerTask('serve', function (target) {
        if (target === 'dist') {
            return grunt.task.run(['build', 'connect:dist:keepalive']);
        }

        grunt.task.run([
            'clean:server',
            'ngconstant:server',
            'nggettext_compile',
            //'webfont',
            'configureProxies:server',
            'bower-install',
            'concurrent:server',
            'autoprefixer',
            'connect:livereload',
            'watch'
        ]);
    });

    grunt.registerTask('server', function () {
        grunt.log.warn('The `server` task has been deprecated. Use `grunt serve` to start a server.');
        grunt.task.run(['serve']);
    });

    grunt.registerTask('test', [
        'clean:server',
        'concurrent:test',
        'autoprefixer',
        'connect:test',
        'karma'
    ]);

    grunt.registerTask('build', function() {
        grunt.log.write('\n---------------\n' + 'Environment: '.green + env + '\n---------------\n');
        grunt.task.run([
            'clean:dist',
            'ngconstant:' + env,
            'nggettext_compile',
            'bower-install',
            'useminPrepare',
            'concurrent:dist',
            'autoprefixer',
            'ngtemplates',
            'concat',
            'ngmin',
            'copy:dist',
            'cssmin',
            'uglify',
            'rev',
            'usemin',
            'htmlmin',
            'cdnify'
        ]);
    });

    grunt.registerTask('default', [
        'newer:jshint',
        'test',
        'build'
    ]);
};
