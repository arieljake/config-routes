let Library = require('./Library').Library;

export class FnLibrary
{
	constructor(fnPaths)
	{
		this.lib = new Library(fnPaths, /\.js$/);
	}

	get(id)
	{
		var entry = this.lib.get(id);

		return entry ? entry.value.default : undefined;
	}
	
	toObject()
	{
		return this.lib.toObject();
	}
}