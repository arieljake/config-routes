'use strict';

let Stream = require('stream');
let _ = require('lodash');

export class RouteWriter
{
	constructor(routeLib, stepWriter)
	{
		this.routeLib = routeLib;
		this.stepWriter = stepWriter;
	}
	
	write(routeName)
	{
		let routeDefinition = this.routeLib.get(routeName);
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
		if (!routeDefinition || routeDefinition.length == 0)
			return null;
		
		let stepDefinition = routeDefinition.shift();
		let writtenStep = this.stepWriter.write(stepDefinition);
		
		return writtenStep;
	}
}