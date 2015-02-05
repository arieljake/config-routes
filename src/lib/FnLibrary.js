let Library = require('./Library').Library;

export class FnLibrary
{
	constructor(fnPaths)
	{
		this.lib = new Library(fnPaths, /\.js$/);
	}

	get(id)
	{
		var entry = this.lib.get("id", id);

		if (!entry)
			return undefined;
		
		var fn = require(entry.fullPath);
		
		return fn.default;
	}

	getHumanizer(id)
	{
		var entry = this.lib.get("id", id);

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