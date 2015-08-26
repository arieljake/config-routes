'use strict';

let fs = require('fs');
let path = require('path');
let wrench = require('wrench');

import {default as _} from 'lodash';

export class Library
{
	constructor(dirs, fileNameRegex)
	{
		this.defaultFileNameRegex = fileNameRegex || /\.js$/;
		this.entries = _.chain(_.flatten([dirs]))
			.map(this.prepDir.bind(this))
			.map(this.loadDir.bind(this))
			.flatten()
			.value();
	}
	
	prepDir(dir)
	{
		if (!dir)
			return [];
		
		var self = this;
		
		if (typeof dir === "string")
		{
			return {
				dirPath: dir,
				fileNameRegex: self.defaultFileNameRegex
			};
		}
		else
		{
			return {
				dirPath: dir.dirPath,
				fileNameRegex: dir.fileNameRegex || self.defaultFileNameRegex
			};
		}
	}

	loadDir(dir)
	{
		if (!dir)
			return [];
		
		var self = this;
		
		return wrench
			.readdirSyncRecursive(dir.dirPath)
			.filter((fileName) => dir.fileNameRegex.test(fileName))
			.map((fileName) =>
			{
				let name = path.basename(fileName, path.extname(fileName));
				let id = path.join(path.dirname(fileName), name);
				let relativePath = fileName;
				let fullPath = path.join(dir.dirPath, fileName);

				return {
					id,
					name,
					relativePath,
					fullPath
				};
			});
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
	
	toObject()
	{
		return {
			dirs: this.dirs,
			entries: this.entries
		};
	}
}