let _ = require("lodash");

let Library = require("./Library").Library;
let VariableString = require("../utils/VariableString").VariableString;

export class FnTranslator
{
	constructor(txDirs)
	{
		this.lib = new Library(txDirs);
	}

	translate(definition)
	{
		var tx = this.lib.get(id);

		return tx ? _translate(definition, tx) : undefined;
	}

	_translate(definition, translation)
	{
		if (translation.varString)
			return VariableString(translation.varString, definition);
		
		return "step";
	}
}