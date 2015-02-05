global.$traceurRuntime = require('traceur-runtime');

let path = require("path");
let _ = require("lodash");

let RouteFactory = require('./lib/RouteFactory').RouteFactory;
let FnLibrary = require('./lib/FnLibrary').FnLibrary;
let FnTranslator = require('./lib/FnTranslator').FnTranslator;
let RouteWriter = require('./lib/RouteWriter').RouteWriter;
let TranslationLibrary = require('./lib/TranslationLibrary').TranslationLibrary;

export function createRoutes(config)
{
	let stdFnLibPath = path.join(__dirname, "fns");	
	let fnPaths = _.flatten([stdFnLibPath,config.fnLib]);
	let fnLib = new FnLibrary(fnPaths);
	let routes = new RouteFactory(config.routeLib, fnLib, config.routeEvents);
	
	return routes;
};

export function createRouteWriter(config)
{
	let stdTranslationLibPath = path.join(__dirname, "translations");
	let translationPaths = _.flatten([stdTranslationLibPath,config.translationLib]);
	let translationLib = new TranslationLibrary(translationPaths,/\.json$/);
	let translator = new FnTranslator(translationLib);
	let writer = new RouteWriter(translator);
	
	return writer;
};