let fs = require('fs');
let path = require('path');
let wrench = require('wrench');
let _ = require("lodash");

export class Library
{
	constructor(dirs)
	{
		this.dirs = _.flatten([dirs]);
		this.entries = _.chain(this.dirs)
			.map(this.loadDir)
			.flatten()
			.value();
	}

	get(id)
	{
		return this.entries.find((entry) => entry.id == id);
	}

	loadDir(dir)
	{
		if (!dir)
			return [];
		
		return wrench
			.readdirSyncRecursive(dir)
			.filter((fileName) => path.extname(fileName) == '.js')
			.map((fileName) =>
			{
				let name = path.basename(fileName, '.js');
				let id = path.join(path.dirname(fileName), name);
				let relativePath = fileName;
				let fullPath = path.join(dir, fileName);
				let value = require(fullPath);

				return {
					id,
					name,
					relativePath,
					fullPath,
					value
				};
			});
	}
	
	toObject()
	{
		return {
			dirs: this.dirs
		};
	}
}