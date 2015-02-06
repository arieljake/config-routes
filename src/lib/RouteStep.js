let q = require('q');
let _ = require('lodash');
var uuid = require('uuid');

export class RouteStep
{
	constructor(definition, fnLib, index)
	{
		this.id = uuid.v1();
		this.definition = definition;
		this.fnLib = fnLib;
		this.index = index;
	}

	get name()
	{
		return this.definition.fn;
	}

	get desc()
	{
		return this.definition.desc;
	}
	
	getExecutable(context)
	{
		var stepFn = this.fnLib.get(this.definition.fn);
		
		if (!stepFn)
			throw new Error("function not found");
		
		var executable = _.bind(stepFn, null, context, this.definition.config)
		
		return executable;
	}

	toObject()
	{
		return {
			id: this.id,
			name: this.name,
			config: this.definition,
			index: this.index
		};
	}
};