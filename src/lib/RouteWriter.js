'use strict';

let Stream = require('stream');
let _ = require('lodash');

export class RouteWriter
{
	constructor(translator)
	{
		this.translator = translator;
	}
	
	write(routeDefinition)
	{
		let stream = new Stream.Readable();
		let source = _.bind(this.getNext, this, routeDefinition);
		
		stream.setEncoding("utf8");
		stream._read = function()
		{
			this.push(source());	
		};
		
		return stream;
	}

	getNext(routeDefinition)
	{
		if (routeDefinition.length === 0)
			return null;
		
		let stepDefinition = routeDefinition.shift();
		let writtenStep = this.writeStep(stepDefinition);
		
		return writtenStep;
	}
	
	writeStep(definition)
	{
		return this.translator.translate(definition);
	}
}