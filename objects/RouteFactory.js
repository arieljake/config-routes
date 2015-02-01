'use strict';

let fs = require("fs");
let path = require("path");
let wrench = require('wrench');
let Route = require('./Route').Route;

export class RouteFactory
{
	constructor(routeDir, fnLib)
	{
		this.routeDir = routeDir;
		this.fnLib = fnLib;
		
		this.routes = wrench
			.readdirSyncRecursive(routeDir)
			.filter((fileName) => path.extname(fileName) == ".json")
			.map((fileName) =>
			{
				let name = path.basename(fileName);
				let defPath = path.join(routeDir, fileName);
				let definition = JSON.parse(fs.readFileSync(defPath, "utf8"));

				return {
					fileName,
					defPath,
					name,
					definition
				};
			});
	}

	get(name)
	{
		var routeObj = this.routes.find((route) => route.fileName == name);

		if (routeObj)
		{
			return (req, res) =>
			{
				var route = new Route(routeObj.name, routeObj.definition, this.fnLib);
				
				route.run(req, res);
			};
		}
		else
		{
			return (req, res) =>
			{
				res.send(404);
			};
		}
	}
}