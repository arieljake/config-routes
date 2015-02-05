let path = require("path");
let q = require('q');
let _ = require('lodash');
var uuid = require('uuid');
let EventEmitter = require('events').EventEmitter;

let FnLibrary = require('./FnLibrary').FnLibrary;
let FnsRunner = require('./FnsRunner').FnsRunner;
let RouteContext = require('./RouteContext').RouteContext;
let Step = require('./RouteStep').RouteStep;

export class Route extends EventEmitter
{
	constructor(name, definition, fnLib)
	{
		this.id = uuid.v1();
		this.name = name;
		this.definition = definition;
		this.fnLib = fnLib;
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

	run(req, res)
	{
		this.context = new RouteContext(req, res, this.fnLib);
		
		let boundFns = this.steps.map((step) => step.getExecutable(this.context));
		let runner = new FnsRunner(boundFns);

		this.attachToRunner(runner);

		runner.run()
			.catch((err) =>
			{
				let erroredStep = this.steps[err.fnIndex];
				this.emit('stepError', err.error, erroredStep.toObject(), this.toObject());
			});
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
		return {
			id: this.id,
			name: this.name,
			fnLib: this.fnLib.toObject(),
			definition: this.definition,
			state: this.context.serialize()
		};
	}
};