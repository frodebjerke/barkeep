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
          'public/build/style.css': ['bower_components/bootstrap/dist/css/bootstrap.css', 'web/style/**/*.less']
        }
      }
    },
    uglify: {
			libdev: {
				options: {
					mangle: false,
					compress: false,
					preserveComments: 'all',
					beautify: true
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
          'web/shared/shared.js',
          'web/shared/views/**/*.js',
          'web/shared/modules/**/*.js',
          'web/apps/appregister.js',
					'web/apps/**/*.js',
          'web/app.js',
					]
				}
			}
		},
    copy: {
      build: {
        files: [
          {expand: true, src: ['lib/**'], dest: 'build/'},
          {expand: true, src: ['app/**'], dest: 'build/'},
          {expand: true, src: ['config/**'], dest: 'build/'},
          {expand: true, src: ['public/**'], dest: 'build/'},
          {expand: true, src: ['app.js', 'Procfile', 'package.json'], dest: 'build/'}
        ]
      }
    }
  });


	grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-less');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.registerTask('default', ['uglify:libdev', 'uglify:appdev','less:dev', 'watch']);
  grunt.registerTask('build', ['uglify:libdev', 'uglify:appdev', 'less:dev', 'copy:build']);
};
