'use strict';
module.exports = function(grunt) {
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-browserify');
  grunt.loadNpmTasks('grunt-mocha'); //mjg - added mocha
  grunt.loadNpmTasks('grunt-express-server');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-watch');

  grunt.initConfig({
    clean: {
      dev: {
        src: ['build/']
      }
    },
    copy: {
      dev: {
        expand: true,
        cwd: 'app/',
        src: ['*.html', '*.css'],
        dest: 'build/',
        filter: 'isFile'
      }
    },
    browserify: {
      dev: {
        options: {
          transform: ['debowerify', 'hbsfy'], //mjg - added hbsfy
          debug: true
        },
        src: ['app/js/**/*.js'],
        dest: 'build/bundle.js'
      },
      //mjg - added so that tests get browserified and can be viewed in chrome
      test: {
        options: {
          transform: ['hbsfy', 'debowerify'],
          debug: true
        },
        src: ['test/mocha/backbone/**/*.js'],
        dest: 'test/testbundle.js'
      }
    },
    express: {
      options: {
        port: 3000
      },
      dev: {
        options: {
          script: 'server.js'
        }
      }
    },
    mocha: { //mjg - added mocha
      backbonetest: {
        src: ['test/test.html'],
        options: {
          run: true
        }
      }
    },
    jshint: {
      options: {
        curly: true,
        eqeqeq: true,
        eqnull: true,
        browser: true,
        node: true,
        globals: {
          'describe'   : false,
          'it'         : false,
          'to'         : false,
          'ok'         : false,
          'be'         : false,
          'before'     : false,
          'beforeEach' : false,
          'after'      : false,
          'afterEach'  : false,
          'equal'      : false,
          'google'     : false
        },
      },
      all: ['Gruntfile.js', 'server.js', 'routes/**/*.js', 'app/js/**/*.js']
    },
    watch: {
      files: ['server.js', 'routes/**/*.js', 'app/**/*'],
      tasks: ['build']
    }
  });
  grunt.registerTask('build', ['clean:dev', 'browserify:dev', 'copy:dev']);
  grunt.registerTask('default', ['jshint', 'build', 'express:dev', 'watch']);
};
