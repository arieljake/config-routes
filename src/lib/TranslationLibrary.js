let Library = require('./Library').Library;

export class TranslationLibrary
{
	constructor(tranlationPaths)
	{
		this.lib = new Library(tranlationPaths, /\.json$/);
	}

	get(id)
	{
		var entry = this.lib.get(id);

		return entry ? entry.value : undefined;
	}
	
	toObject()
	{
		return this.lib.toObject();
	}
}