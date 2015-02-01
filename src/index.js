let path = require("path");
let _ = require("lodash");

let RouteFactory = require('./routing/RouteFactory').RouteFactory;
let FnLibrary = require('./routing/FnLibrary').FnLibrary;

export function createRoutes(config)
{
	let stdFnLibPath = path.join(__dirname, "fnLib");	
	let fnPaths = _.flatten([stdFnLibPath,config.fnLib]);	
	let fnLib = new FnLibrary(fnPaths);
	let routes = new RouteFactory(config.routeLib, fnLib, config.routeEvents);
	
	return routes;
};