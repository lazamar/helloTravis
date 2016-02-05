module.exports = function (grunt) {

  'use strict';
  grunt.initConfig({
    jshint: {
      all: ['Gruntfile.js', 'index.js']
    },
    jscs: {
      src: '**/*.js',
      options: {
        force: true,
        config: '.jscsrc',
        verbose: true, // If you need output with rule names http://jscs.info/overview.html#verbose
        fix: true, // Autofix code style violations when possible.
        requireCurlyBraces: ['if']
      }
    },
    githooks: {
      all: {
        'pre-commit': {
          taskNames: 'jshint',
          template: '.grunt-githooks/pre-commit.js'
        }
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-jscs');
  grunt.loadNpmTasks('grunt-githooks');
  grunt.registerTask('default', ['jshint', 'jscs', 'githooks']);
};
