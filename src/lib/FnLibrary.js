let fs = require('fs');
let path = require('path');
let wrench = require('wrench');
let _ = require('lodash');

let Library = require('./Library').Library;

export class FnLibrary
{
	constructor(fnDirs)
	{
		this.lib = new Library(fnDirs);
	}

	get(id)
	{
		var fnEntry = this.lib.get(id);

		return fnEntry ? fnEntry.value.default : undefined;
	}
	
	toObject()
	{
		return this.lib.toObject();
	}
}