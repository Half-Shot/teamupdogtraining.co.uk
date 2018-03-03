module.exports = function(grunt) {

    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        assemble: {
            options: {
                assets: 'assets',
                partials: ['layouts/partials/**/*.hbs'],
                layout: ['layouts/default.hbs'],
                data: ['data/*.{json,yml}'],
                flatten: true,
                production: (!grunt.cli.tasks.includes('dev'))
            },
            site: {
                src: ['layouts/pages/*.hbs'],
                dest: "site/."
            }
        },
        clean: ['./site/*'],
        mkdir: {
            all: {
                options: {
                    mode: 0755,
                    create: ['site','site/style']
                }
            }
        },
        sass: {
            options: {
                sourceMap: (!grunt.cli.tasks.includes('dev'))
            },
            dist: {
                files: {
                    'site/style/main.css': 'sass/main.scss'
                }
            }
        },
        watch: {
            scripts: {
                files: ['layouts/**', 'data/**', 'assets/**', 'sass/**'],
                tasks: ['default:dev'],
                options: {
                    spawn: false,
                    livereload: true
                }
            }
        },
        connect: {
            server: {
                options: {
                    port: 9000,
                    livereload: true,
                    base: './site'
                }
            }
        }
    });

    grunt.loadNpmTasks('grunt-assemble');
    grunt.loadNpmTasks('grunt-sass');
    grunt.loadNpmTasks('grunt-mkdir');
    grunt.loadNpmTasks('grunt-contrib-connect');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-watch');

    // Default task(s).
    grunt.registerTask('default', [
        'clean',
        'mkdir',
        'sass',
        'assemble']
    );

    grunt.registerTask('dev', [
        'default',
        'connect',
        'watch']
    );
};