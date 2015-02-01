let path = require("path");
let q = require('q');
let _ = require('lodash');
let EventEmitter = require('events').EventEmitter;

let FnLibrary = require('./FnLibrary').FnLibrary;
let FnsRunner = require('./FnsRunner').FnsRunner;
let Context = require("./Context").Context;

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
				config: _.omit(def, "fn"),
				exe: this.fnLib.get(def.fn)
			};
		});
	}

	run(req, res)
	{
		let model = {
			req,
			res
		};
		let context = new Context(model, this.fnLib);
		let fns = this.getFns();
		let boundFns = fns.map((fn) => _.bind(fn.exe, null, context, fn.config));
		let runner = new FnsRunner(boundFns);

		this.attachToRunner(runner, fns);
		this.emit('routeStarting', this.name, context.serialize());

		runner.run()
			.then(() =>
			{
				this.emit('routeComplete', this.name, context.serialize());
			});
	}

	attachToRunner(fnRunner, fns)
	{
		fnRunner.on('fnComplete', (fnIndex) =>
		{
			let completedFn = fns[fnIndex];
			this.emit('routeFnComplete', completedFn, this.name, this.config);
		});
	}
};