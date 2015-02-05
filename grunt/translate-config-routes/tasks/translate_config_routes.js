/*
 * grunt-translate-config-routes
 * https://github.com/arieljake/config-routes
 *
 * Copyright (c) 2015 Ariel Jakobovits
 * Licensed under the MIT license.
 */

'use strict';

var ConfigRoutes = require('config-routes');

module.exports = function(grunt)
{

	grunt.registerMultiTask('translateRoutes', 'Convert config-routes to human readable format', function()
	{
		var options = this.options(
		{

		});

		var routeWriter = ConfigRoutes.createRouteWriter(
		{});

		this.files.forEach(function(f)
		{
			var src = f.src.filter(function(filepath)
			{
				if (!grunt.file.exists(filepath))
				{
					grunt.log.warn('Source file "' + filepath + '" not found.');
					return false;
				}
				else
				{
					return true;
				}
			}).map(function(filepath)
			{
				return grunt.file.read(filepath);
			}).join(grunt.util.normalizelf(options.separator));

			var routeDefinition = JSON.parse(src);
			var writeStream = routeWriter.write(routeDefinition);

			var output = "";
			var chunk;

			while (chunk = writeStream.read())
			{
				output += chunk + "\n";
			}

			grunt.file.write(f.dest, output);

			grunt.log.writeln('File "' + f.dest + '" created.');
		});
	});

};