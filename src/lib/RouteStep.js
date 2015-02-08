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
	
	get hasErrorHandler()
	{
		return this.definition.hasOwnProperty("onError");
	}
	
	getExecutable(context)
	{
		var stepFn = this.fnLib.get(this.definition.fn);
		
		if (!stepFn)
			throw new Error("function not found: " + this.definition.fn);
		
		var executable = _.bind(stepFn, null, context, this.definition.config)
		
		return executable;
	}
	
	getErrorHandler(context)
	{
		var stepFn = this.fnLib.get(this.definition.onError.fn);
		
		if (!stepFn)
			throw new Error("route step has no error handler");
		
		var executable = _.bind(stepFn, null, context, this.definition.onError.config)
		
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