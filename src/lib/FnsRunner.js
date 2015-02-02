let Q = require('q');
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
			if (fnIndex === 0)
				emitter.emit('runnerStarting', fnIndex);
			
			try
			{
				while (fnIndex < fns.length)
				{
					yield fns[fnIndex]();

					emitter.emit('fnComplete', fnIndex);
					fnIndex++;
					
					if (fnIndex >= fns.length)
						emitter.emit('runnerComplete', fnIndex);
				}
			}
			catch (err)
			{
				yield Q.reject({
					fnIndex: fnIndex,
					error: err
				});
			}
		};

		return Q.async(gen)();
	}
};