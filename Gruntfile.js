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
				copyRuntime: 'dist-es5'
			},
			all:
			{
				files: [
				{
					expand: true,
					cwd: 'src/',
					src: ['**/*.js'],
					dest: 'dist-es5'
				},
				{
					expand: true,
					cwd: 'example/',
					src: ['**/*.js'],
					dest: 'example-es5'
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
					cwd: 'dist-es5/',
					src: ['**'],
					dest: 'example-es5/AppBase'
				},
				{
					expand: true,
					cwd: 'example/',
					src: ['routes/**'],
					dest: 'example-es5/'
				}]
			}
		},
		clean:
		{
			dist: ['dist-es5'],
			example: ['example-es5']
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