let q = require('q');

export class FnsRunner
{
	constructor(fns)
	{
		this.fns = fns;
	}

	run()
	{
		let fns = this.fns;
		let fnIndex = 0;
		let gen = function*()
		{
			while (fnIndex < fns.length)
			{
				yield fns[fnIndex]();
				fnIndex++;
			}
		};

		return q.async(gen)();
	}
};