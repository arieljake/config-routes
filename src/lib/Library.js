'use strict';

let fs = require('fs');
let path = require('path');
let wrench = require('wrench');
let _ = require("lodash");

export class Library
{
	constructor(dirs, fileNameRegex)
	{
		this.dirs = _.flatten([dirs]);
		this.fileNameRegex = fileNameRegex || /\.js$/;
		this.entries = _.chain(this.dirs)
			.map(_.bind(this.loadDir, this))
			.flatten()
			.value();
	}

	getById(value)
	{
		return this.entries.find((entry) => entry.id == value);
	}

	getByName(value)
	{
		return this.entries.find((entry) => entry.name == value);
	}

	getByPath(value)
	{
		return this.entries.find((entry) => entry.relativePath == value);
	}

	loadDir(dir)
	{
		if (!dir)
			return [];
		
		return wrench
			.readdirSyncRecursive(dir)
			.filter((fileName) => this.fileNameRegex.test(fileName))
			.map((fileName) =>
			{
				let name = path.basename(fileName, path.extname(fileName));
				let id = path.join(path.dirname(fileName), name);
				let relativePath = fileName;
				let fullPath = path.join(dir, fileName);

				return {
					id,
					name,
					relativePath,
					fullPath
				};
			});
	}
	
	toObject()
	{
		return {
			dirs: this.dirs,
			entries: this.entries
		};
	}
}