module.exports = function(grunt)
{
	grunt.initConfig(
	{
		pkg: grunt.file.readJSON('package.json'),
		traceur:
		{
			options:
			{
				experimental: true,
				modules: 'commonjs',
				blockBinding: true,
				copyRuntime: 'dist'
			},
			all:
			{
				files: [
				{
					expand: true,
					src: ['objects/**/*.js', 'fnLib/**/*.js'],
					dest: 'dist'
				},
				{
					expand: true,
					src: ['example.js', 'functions/**/*.js'],
					dest: 'example'
				}]
			}
		},
		copy:
		{
			example:
			{
				files: [
				{
					expand: true,
					src: ['**'],
					cwd: 'dist/',
					dest: 'example/'
				},
				{
					expand: true,
					src: ['routes/**'],
					dest: 'example/'
				}]
			}
		},
		clean:
		{
			dist: ['dist'],
			example: ['example']
		},
		mochaTest:
		{
			objects:
			{
				options:
				{
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

	grunt.registerTask('build', ['clean:dist', 'clean:example', 'traceur:all', 'copy:example']);
	grunt.registerTask('test', ['mochaTest:objects']);
};