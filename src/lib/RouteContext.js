'use strict';

let ObjectPath = require('../utils/ObjectPath').ObjectPath;
let VariableString = require('../utils/VariableString').VariableString;

export class RouteContext
{
	constructor(state)
	{
		this.model = state || {};
		this.inheritedProps = [];
	}

	get(name)
	{
		let path = new ObjectPath(name);

		return path.getValueIn(this.model);
	}

	set(name, value, inherited)
	{
		if (!name)
			return;

		let path = new ObjectPath(name);

		path.setValueIn(this.model, value);
		
		if (inherited === true)
		{
			this.inheritedProps.push(name);
		}
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
	
	child()
	{
		let child = new RouteContext();
		
		this.inheritedProps.forEach((prop) => {
			let value = this.get(prop);
			
			child.set(prop, value, true);
		});
		
		return child;
	}

	toObject()
	{
		return this.model;
	}
};