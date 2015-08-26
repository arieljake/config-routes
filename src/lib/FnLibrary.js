'use strict';

import {Library} from "./Library";

export class FnLibrary
{
	constructor(fnPaths, fileNameRegex)
	{
		this.lib = new Library(fnPaths, fileNameRegex || /\.js$/);
	}

	get(id)
	{
		var entry = this.lib.getById(id);

		if (!entry)
			return undefined;
		
		var fn = require(entry.fullPath);
		
		if (fn.default)
			return fn.default;
		else
			return fn;
	}

	getHumanizer(id)
	{
		var entry = this.lib.getById(id);

		if (!entry)
			return undefined;
		
		var fn = require(entry.fullPath);
		
		return fn.humanize;
	}
	
	toObject()
	{
		return this.lib.toObject();
	}
}