let path = require("path");
let q = require('q');
let _ = require('lodash');
let EventEmitter = require('events').EventEmitter;

let FnLibrary = require('./FnLibrary').FnLibrary;
let FnsRunner = require('./FnsRunner').FnsRunner;
let RouteContext = require("./RouteContext").RouteContext;

export class Route extends EventEmitter
{
	constructor(name, definition, fnLib)
	{
		this.name = name;
		this.definition = definition;
		this.fnLib = fnLib;
	}

	getFns()
	{
		return this.definition.map((def) =>
		{
			return {
				name: def.fn,
				config: def.config,
				exe: this.fnLib.get(def.fn)
			};
		});
	}

	run(req, res)
	{
		let context = new RouteContext(req, res, this.fnLib);
		let fns = this.getFns();
		let boundFns = fns.map((fn) => _.bind(fn.exe, null, context, fn.config));
		let runner = new FnsRunner(boundFns);

		this.attachToRunner(runner, fns);
		this.emit('routeStarting', this.name, this.config, context.serialize());

		runner.run()
			.then(() =>
			{
				this.emit('routeComplete', this.name, context.serialize());
			})
			.catch((err) =>
			{
				let erroredFn = fns[err.fnIndex];
				this.emit('routeFnError', err.error, erroredFn.name, erroredFn.config, this.name, this.config);
			});
	}

	attachToRunner(fnRunner, fns)
	{
		fnRunner.on('fnComplete', (fnIndex) =>
		{
			let completedFn = fns[fnIndex];
			this.emit('routeFnComplete', completedFn.name, completedFn.config, this.name, this.config);
		});
	}
};