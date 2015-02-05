let _ = require("lodash");

let VariableString = require("../utils/VariableString").VariableString;

export class FnTranslator
{
	constructor(translationLib)
	{
		this.lib = translationLib;
	}

	translate(definition)
	{
		var tx = this.lib.get(id);

		return tx ? _translate(definition, tx) : undefined;
	}

	_translate(definition, translation)
	{
		if (translation.varString)
		{
			return VariableString(translation.varString, definition);
		}
		
		return "step";
	}
}