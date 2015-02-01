let path = require("path");
let _ = require("lodash");

let RouteFactory = require('./routing/RouteFactory').RouteFactory;
let FnLibrary = require('./routing/FnLibrary').FnLibrary;

export function createRoutes(routeLib, fnLibs)
{
	let stdFnLib = path.join(__dirname, "fnLib");
	
	fnLibs = _.flatten([stdFnLib,fnLibs]);
	
	let fnLib = new FnLibrary(fnLibs);
	let routes = new RouteFactory(routeLib, fnLib);
	
	return routes;
};