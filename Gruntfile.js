module.exports = function(grunt) {
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-browserify');
  grunt.loadNpmTasks('grunt-express-server');
  grunt.loadNpmTasks('grunt-contrib-jshint');

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
          transform: ['debowerify'],
          debug: true
        },
        src: ['app/js/**/*.js'],
        dest: 'build/bundle.js'
      }
    },
    express: {
      options: {
        port: 3000,
        background: false
      },
      dev: {
        options: {
          script: './server.js'
        }
      }
    },
    jshint: {
      all: ['Gruntfile.js', 'server.js','app/client.js' ,'routes/**/*.js', 'app/js/**/*.js']
    },
  });
  grunt.registerTask('build', ['clean:dev', 'browserify:dev', 'copy:dev']);
  grunt.registerTask('default', ['jshint', 'build', 'express:dev']);
};
