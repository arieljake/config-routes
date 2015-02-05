let fs = require("fs");

let Library = require('./Library').Library;

export class RouteLibrary
{
	constructor(routePaths)
	{
		this.lib = new Library(routePaths, /\.json$/);
	}

	get(name)
	{
		var entry = this.lib.get("name", name);

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