let q = require('q');
let EventEmitter = require('events').EventEmitter;

export class FnsRunner extends EventEmitter
{
	constructor(fns)
	{
		this.fns = fns;
	}

	run()
	{
		let fns = this.fns;
		let fnIndex = 0;
		let emitter = this;
		let gen = function*()
		{
			while (fnIndex < fns.length)
			{
				yield fns[fnIndex]();
				emitter.emit('fnComplete', fnIndex);
				fnIndex++;
			}
		};

		return q.async(gen)();
	}
};