global.$traceurRuntime = require('traceur-runtime');

let path = require("path");

import {default as _} from "lodash";
import {Library} from './lib/Library';
import {RouteFactory} from './lib/RouteFactory';
import {RouteLibrary} from './lib/RouteLibrary';
import {RouteContext} from './lib/RouteContext';
import {FnLibrary} from './lib/FnLibrary';
import {ObjectPath} from "./utils/ObjectPath";
import {VariableString} from './utils/VariableString';

export function createRoutes(config)
{
	let stdFnLibPath = path.join(__dirname, "fns");	
	let fnPaths = _.flatten([stdFnLibPath,config.fnLib]);
	let fnLib = new FnLibrary(fnPaths);
	let routeLib = new RouteLibrary(config.routeLib);
	let routes = new RouteFactory(routeLib, fnLib, config.routeEvents);
	
	return routes;
};

export function createLibrary(libDirs, fileNameRegex, getDecorator)
{
	let lib = new Library(libDirs, fileNameRegex);
	
	if (getDecorator)
	{
		lib.get = function(id)
		{
			var entry = lib.getById(id);
			
			if (!entry)
				return undefined;
			
			var result = getDecorator(entry);
			
			return result;
		};
	}
	
	return lib;
};

export function createContext(state)
{
	return new RouteContext(state);
};

export var utils = {
	ObjectPath,
	VariableString
};