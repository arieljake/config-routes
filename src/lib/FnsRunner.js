'use strict';

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
			try
			{
				emitter.emit('runnerStarting');
			
				while (fnIndex < fns.length)
				{
					yield fns[fnIndex]();

					emitter.emit('fnComplete', fnIndex);
					fnIndex++;	
				}

				emitter.emit('runnerComplete');
			}
			catch (err)
			{
				emitter.emit('fnError', fnIndex, err);
				
				yield Q.reject({
					fnIndex: fnIndex,
					error: err
				});
			}
		};

		return Q.async(gen)();
	}
};