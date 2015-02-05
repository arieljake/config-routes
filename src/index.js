global.$traceurRuntime = require('traceur-runtime');

let path = require("path");
let _ = require("lodash");

let RouteFactory = require('./lib/RouteFactory').RouteFactory;
let FnLibrary = require('./lib/FnLibrary').FnLibrary;
let RouteLibrary = require('./lib/RouteLibrary').RouteLibrary;
let StepWriter = require('./lib/StepWriter').StepWriter;
let RouteWriter = require('./lib/RouteWriter').RouteWriter;
let Library = require('./lib/Library').Library;

export function createRoutes(config)
{
	let stdFnLibPath = path.join(__dirname, "fns");	
	let fnPaths = _.flatten([stdFnLibPath,config.fnLib]);
	let fnLib = new FnLibrary(fnPaths);
	let routeLib = new RouteLibrary(config.routeLib);
	let routes = new RouteFactory(routeLib, fnLib, config.routeEvents);
	
	return routes;
};

export function createRouteWriter(config)
{
	let stdFnLibPath = path.join(__dirname, "fns");
	let fnPaths = _.flatten([stdFnLibPath,config.fnLib]);
	let fnLib = new FnLibrary(fnPaths);
	let routeLib = new RouteLibrary(config.routeLib);
	let stepWriter = new StepWriter(fnLib);
	let routeWriter = new RouteWriter(routeLib, stepWriter);
	
	return routeWriter;
};

export function createLibrary(libDirs, fileNameRegex)
{
	let lib = new Library(libDirs, fileNameRegex);
	
	return lib;
};