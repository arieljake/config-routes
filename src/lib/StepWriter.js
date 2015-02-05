let _ = require("lodash");

let WriterUtils = require("./WriterUtils").WriterUtils;

export class StepWriter
{
	constructor(fnLib)
	{
		this.fnLib = fnLib;
	}

	write(stepDefinition)
	{
		var fnHumanizer = this.fnLib.getHumanizer(stepDefinition.fn);

		return fnHumanizer ? fnHumanizer(WriterUtils, stepDefinition.config) : undefined;
	}
}