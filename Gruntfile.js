module.exports = function (grunt) {
  grunt.initConfig({
    watch: {
      less: {
        files: ['web/style/**/*.less'],
        tasks: ['less:dev']
      },
      js: {
        files: ['web/**/*.js'],
        tasks: ['uglify:appdev']
      }

    },
    less: {
      dev: {
        files: {
          'public/build/style.css': ['web/style/**/*.less', 'bower_components/bootstrap/dist/css/bootstrap.css']
        }
      }
    },
    uglify: {
			libdev: {
				options: {
					mangle: false,
					compress: false,
					preserveComments: 'all',
					beautify: false
				},
				files: {
					'public/build/lib.js': [
					'bower_components/mithril/mithril.js'
					]
				}
			},
			appdev: {
				options: {
					mangle: false,
					compress: false,
					preserveComments: 'all',
					beautify: true
				},
				files: {
					'public/build/app.js': [
          'web/shared/**/*.js',
          'web/addBottle/**/*.js',
					'web/pourdrink/**/*.js',
          'web/drinks/**/*.js',
          'web/app.js',
					]
				}
			}
		}
  });


	grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-less');
  grunt.registerTask('default', ['uglify:libdev', 'uglify:appdev','less:dev', 'watch']);
};
