module.exports = function (grunt) {
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		traceur: {
			options: {
				experimental: true,
				modules: 'commonjs',
				blockBinding: true,
				copyRuntime: 'dist'
			},
			all: {
				files: [{
					expand: true,
					src: ['router.js', 'objects/**/*.js', 'fnLib/**/*.js', 'functions/**/*.js'],
					dest: 'dist'
      			}]
			}
		},
		copy: {
			dist: {
				files: [
					{
						expand: true,
						src: ['routes/**'],
						dest: 'dist/'
					}
				]
			}
		},
		clean: {
			dist: ['dist']
		},
		mochaTest: {
			objects: {
				options: {
					reporter: 'spec',
					captureFile: 'logs/mocha.txt',
					quiet: false,
					clearRequireCache: false
				},
				src: ['objects/**/*.test.js']
			}
		}
	});

	grunt.loadNpmTasks('grunt-contrib-clean');
	grunt.loadNpmTasks('grunt-contrib-copy');
	grunt.loadNpmTasks('grunt-mocha-test');
	grunt.loadNpmTasks('grunt-traceur');

	grunt.registerTask('build', ['clean:dist', 'traceur:all', 'copy:dist']);
	grunt.registerTask('test', ['mochaTest:objects']);
};