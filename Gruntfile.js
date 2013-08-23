module.exports = function(grunt) {
    // 以下代码初始化Grunt任务
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        stylus: {
            compile: {
                options: {
                    paths: ['public/stylesheets'],
                    // urlfunc: 'embedurl', // use embedurl('test.png') in our code to trigger Data URI embedding
                    use: [
                        //require('fluidity') // use stylus plugin at compile time
                    ],
                    import: [] //  @import 'foo', 'bar/moo', etc. into every .styl file
                },
                files: {
                    'public/css/app.css': ['public/stylus/*.styl'] // compile and concat into single file
                }
            }
        },

        watch: {
            css: {
                files: ['**/*.styl'],
                tasks: ['stylus'],
                options: {
                    spawn: false,
                    livereload: true
                }
            },
        },

        copy: {
            main: {
                files: [
                    { expand: true, cwd: 'public/stylus/img/', src: ['**'], dest: 'public/css/img/' }
                ]
            }
        }
    })

    grunt.loadNpmTasks('grunt-contrib-stylus')
    grunt.loadNpmTasks('grunt-contrib-copy')
    grunt.loadNpmTasks('grunt-contrib-watch')
    
    grunt.registerTask('dev', ['stylus', 'copy', 'watch'])
};
