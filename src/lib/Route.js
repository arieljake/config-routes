'use strict';

let Q = require('q');
let _ = require('lodash');
let uuid = require('uuid');
let EventEmitter = require('events').EventEmitter;
let FnsRunner = require('./FnsRunner').FnsRunner;
let Step = require('./RouteStep').RouteStep;

export class Route extends EventEmitter
{
	constructor(name, definition, fnLib, context)
	{
		this.id = uuid.v1();
		this.name = name;
		this.definition = definition;
		this.fnLib = fnLib;
		this.context = context;
		this.steps = this.getSteps();
	}

	getSteps()
	{
		return this.definition.map((stepDef, index) =>
		{
			var step = new Step(stepDef, this.fnLib);
			step.index = index;

			return step;
		});
	}

	get desc()
	{
		return this.steps.map((step) =>
		{
			return step.desc;
		}).join("<br>");
	}

	run()
	{
		var deferred = Q.defer();

		let boundFns = this.steps.map((step) => step.getExecutable(this.context));
		let runner = new FnsRunner(boundFns);

		this.attachToRunner(runner);

		runner.run()
			.then(function()
			{
				deferred.resolve();
			})
			.catch((err) =>
			{
				let erroredStep = this.steps[err.fnIndex];
				this.emit('stepError', err.error, erroredStep.toObject(), this.toObject());
				
				if (erroredStep.hasErrorHandler)
				{
					let errorHandler = erroredStep.getErrorHandler(this.context);
					errorHandler();
				}
			
				deferred.reject(err);
			});

		return deferred.promise;
	}

	attachToRunner(fnRunner)
	{
		fnRunner.on('runnerStarting', (fnIndex) =>
		{
			this.emit('routeStarting', this.toObject());
		});

		fnRunner.on('runnerComplete', (fnIndex) =>
		{
			this.emit('routeComplete', this.toObject());
		});

		fnRunner.on('fnComplete', (fnIndex) =>
		{
			let completedStep = this.steps[fnIndex];
			this.emit('stepComplete', completedStep.toObject(), this.toObject());
		});
	}

	toObject()
	{
		var hiddenContextKeys = _.filter(Object.keys(this.context), function(key) {
			return key.indexOf("_") === 0;
		})
		
		return {
			id: this.id,
			name: this.name,
			fnLib: this.fnLib.toObject(),
			definition: this.definition,
			state: _.omit(this.context.toObject(), hiddenContextKeys)
		};
	}
};