module.exports = function(grunt)
{
	grunt.initConfig(
	{
		pkg: grunt.file.readJSON('package.json'),

		clean:
		{
			dist: ['dist-es5']
		},

		traceur:
		{
			node:
			{
				options:
				{
					experimental: true,
					modules: 'commonjs',
					blockBinding: true,
					copyRuntime: 'dist-es5'
				},
				files: [
					{
						expand: true,
						cwd: 'src/',
						src: ['**/*.js'],
						dest: 'dist-es5'
				}]
			},
			browser:
			{
				options:
				{
					experimental: true,
					modules: 'amd',
					blockBinding: true,
					copyRuntime: 'dist-es5-browser',
					moduleNaming:
					{
						stripPrefix: "dist-es5-browser",
						addPrefix: "config-routes"
					}
				},
				files: [
					{
						expand: true,
						cwd: 'src/',
						src: ['**/*.js'],
						dest: 'dist-es5-browser'
				}]
			}
		},

		mochaTest:
		{
			dist:
			{
				options:
				{
					reporter: 'spec',
					captureFile: 'logs/mocha.txt',
					quiet: false,
					clearRequireCache: false
				},
				src: ['tests/**/*.js']
			}
		}
	});

	grunt.loadNpmTasks('grunt-contrib-clean');
	grunt.loadNpmTasks('grunt-contrib-copy');
	grunt.loadNpmTasks('grunt-mocha-test');
	grunt.loadNpmTasks('grunt-traceur');

	grunt.registerTask('build', ['clean:dist', 'traceur:node', 'traceur:browser']);
	grunt.registerTask('test', ['mochaTest:dist']);
};