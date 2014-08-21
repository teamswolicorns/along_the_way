module.exports = function(grunt) {
  //install these like npm install --save-dev grunt-contrib-clean
  grunt.loadNpmTasks('grunt-contrib-clean'); //erases everything in a dir (dist in our case)
  grunt.loadNpmTasks('grunt-contrib-copy'); //copies static files
  grunt.loadNpmTasks('grunt-browserify'); //builds js files

  grunt.initConfig({
    clean: {
      dev: {
        src: ['dist/']
      }
    },
    copy: {
      dev: {
        expand: true,
        cwd: 'app/',  //current working directory
        src: ['*.html', '*.css'],
        dest: 'dist/',
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
        dest: 'dist/bundle.js'
      }
    },
  });
  grunt.registerTask('build:dev', ['clean:dev', 'browserify:dev', 'copy:dev']);
//cleans the dist folder, browserifys it, copies the html and css files into dist
//todo: add testing task
};
