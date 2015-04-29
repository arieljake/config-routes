'use strict';

import {default as Q} from "q";
import {default as EventEmitter} from "eventemitter3";

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
				var error;
				
				if (!err)
					error = "unknown error";
				else if (err.stack)
					error = err.stack;
				else if (err.message)
					error = err.message;
				else
					error = err;
				
				emitter.emit('fnError', fnIndex, error);
				
				yield Q.reject({
					fnIndex: fnIndex,
					error: error
				});
			}
		};

		return Q.async(gen)();
	}
};