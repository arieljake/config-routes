'use strict';

import
{
	default as Q
}
from "q";
import
{
	default as EventEmitter
}
from "eventemitter3";

export class FnsRunner extends EventEmitter
{
	constructor(fns)
	{
		this.fns = fns;
	}

	run()
	{
		let runner = this;
		let fns = this.fns;
		let fnIndex = 0;
		let gen = function*()
		{
			try
			{
				runner.emit('runnerStarting');

				while (fnIndex < fns.length)
				{
					yield fns[fnIndex]();

					runner.emit('fnComplete', fnIndex);
					fnIndex++;
				}

				runner.emit('runnerComplete');
			}
			catch (err)
			{
				if (err && err.message == "$abort")
					yield runner.handleAbort(fnIndex, err);
				else
					yield runner.handleError(fnIndex, err);
			}
		};

		return Q.async(gen)();
	}
	
	handleError(fnIndex, err)
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

		this.emit('fnError', fnIndex, error);

		return Q.reject(
		{
			fnIndex: fnIndex,
			error: error
		});
	}
	
	handleAbort(fnIndex, err)
	{
		return Q(
		{
			fnIndex: fnIndex,
			abort: true
		});
	}
};