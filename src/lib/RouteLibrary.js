let fs = require("fs");

let Library = require('./Library').Library;

export class RouteLibrary
{
	constructor(routePaths)
	{
		this.lib = new Library(routePaths, /\.json$/);
	}

	get(id)
	{
		var entry = this.lib.getById(id);

		if (!entry)
			return undefined;
		
		var route = JSON.parse(fs.readFileSync(entry.fullPath, "utf8"));
		
		return route;
	}
	
	toObject()
	{
		return this.lib.toObject();
	}
}