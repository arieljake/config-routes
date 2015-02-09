let ObjectPath = require('../utils/ObjectPath').ObjectPath;
let VariableString = require('../utils/VariableString').VariableString;

export class RouteContext
{
	constructor(fnLib, state)
	{
		this.fnLib = fnLib;
		this.model = state || {};
	}

	get(name)
	{
		let path = new ObjectPath(name);

		return path.getValueIn(this.model);
	}

	set(name, value)
	{
		if (!name)
			return;

		let path = new ObjectPath(name);

		path.setValueIn(this.model, value);
	}
	
	unset(name)
	{
		if (!name)
			return;
		
		let path = new ObjectPath(name);
		
		path.deleteIn(this.model);
	}
	
	translate(varString)
	{
		return VariableString(varString, this.model);
	}

	getFnByName(name)
	{
		return fnLib.get(name);
	}

	toObject()
	{
		return this.model;
	}
};