global.$traceurRuntime = require('traceur-runtime');

let path = require("path");
let _ = require("lodash");

let RouteFactory = require('./lib/RouteFactory').RouteFactory;
let FnLibrary = require('./lib/FnLibrary').FnLibrary;

export function createRoutes(config)
{
	let stdFnLibPath = path.join(__dirname, "fns");	
	let fnPaths = _.flatten([stdFnLibPath,config.fnLib]);	
	let fnLib = new FnLibrary(fnPaths);
	let routes = new RouteFactory(config.routeLib, fnLib, config.routeEvents);
	
	return routes;
};