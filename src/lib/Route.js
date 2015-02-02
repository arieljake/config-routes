let path = require("path");
let q = require('q');
let _ = require('lodash');
var uuid = require('uuid');
let EventEmitter = require('events').EventEmitter;

let FnLibrary = require('./FnLibrary').FnLibrary;
let FnsRunner = require('./FnsRunner').FnsRunner;
let RouteContext = require("./RouteContext").RouteContext;

export class Route extends EventEmitter
{
	constructor(name, definition, fnLib)
	{
		this.id = uuid.v1();
		this.name = name;
		this.definition = definition;
		this.fnLib = fnLib;
		this.fns = this.getFns();
	}

	getFns()
	{
		return this.definition.map((def, index) =>
		{
			return {
				name: def.fn,
				config: def.config,
				exe: this.fnLib.get(def.fn),
				index: index
			};
		});
	}

	run(req, res)
	{
		this.context = new RouteContext(req, res, this.fnLib);
		let boundFns = this.fns.map((fn) => _.bind(fn.exe, null, this.context, fn.config));
		let runner = new FnsRunner(boundFns);

		this.attachToRunner(runner);

		runner.run()
			.catch((err) =>
			{
				let erroredFn = this.fns[err.fnIndex];
				this.emit('routeFnError', err.error, this.fnToObject(erroredFn), this.toObject());
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
			let completedFn = this.fns[fnIndex];
			this.emit('routeFnComplete', this.fnToObject(completedFn), this.toObject());
		});
	}

	toObject()
	{
		return {
			id: this.id,
			name: this.name,
			definition: this.definition,
			state: this.context.serialize()
		};
	}

	fnToObject(fn)
	{
		return {
			name: fn.name,
			config: fn.config,
			index: fn.index
		};
	}
};