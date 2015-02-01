let fs = require('fs');
let path = require('path');
let wrench = require('wrench');
let _ = require("lodash");

export class FnLibrary
{
	constructor(fnDirs)
	{
		this.fnDirs = _.flatten([fnDirs]);
		this.fns = _.flatten(fnDirs, this._loadFunctionsInDir);
	}

	get(name)
	{
		var fnDef = this.fns.find((fn) => fn.id == name);

		return fnDef ? fnDef.fn : undefined;
	}

	_loadFunctionsInDir(dir)
	{
		return wrench
			.readdirSyncRecursive(dir)
			.filter((fileName) => path.extname(fileName) == '.js')
			.map((fileName) =>
			{
				let name = path.basename(fileName, '.js');
				let id = path.join(path.dirname(fileName), name);
				let fnPath = path.join(dir, fileName);
				let fn = require(fnPath).default;

				return {
					fileName,
					fnPath,
					name,
					id,
					fn
				};
			});
	}
}