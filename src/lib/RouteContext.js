'use strict';


import
{
	default as _
}
from 'lodash';
import
{
	ObjectPath
}
from '../utils/ObjectPath';
import
{
	VariableString
}
from '../utils/VariableString';

export class RouteContext
{
	constructor(state)
	{
		this.model = state ||
		{};
		this.inheritedProps = [];
		this.excludedOnDumpProps = [];
	}

	get(name)
	{
		let path = new ObjectPath(name);

		return path.getValueIn(this.model);
	}

	set(name, value, inherited, excludedOnDump)
	{
		if (!name)
			return;

		let path = new ObjectPath(name);

		path.setValueIn(this.model, value);

		if (inherited === true)
		{
			this.inheritedProps.push(name);
		}

		if (excludedOnDump === true)
		{
			this.excludedOnDumpProps.push(name);
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

	assemble(map)
	{
		var self = this;
		var result;

		if (typeof map === "string")
		{
			result = self.get(map);
		}
		else
		{
			result = {};

			Object.keys(map).map(function(key)
			{
				var valueVarName = map[key];
				var value = self.get(valueVarName);

				result[key] = value;
			});
		}

		return result;
	}

	child()
	{
		let child = new RouteContext();

		this.inheritedProps.forEach((prop) =>
		{
			let value = this.get(prop);
			let isExcludedOnDump = this.excludedOnDumpProps.indexOf(prop) >= 0;

			child.set(prop, value, true, isExcludedOnDump);
		});

		return child;
	}

	toObject()
	{
		return _.omit(this.model, this.excludedOnDumpProps);
	}
};