let _ = require('lodash');
let ObjectPath = require("../../utils/ObjectPath").ObjectPath;

export
default
function unsetVars(state, config)
{
	let value = state.get(config.valueVarName);
	let varsToUnset = config.vars;

	varsToUnset.forEach(function(varName)
	{
		let path = new ObjectPath(varName);
		path.deleteIn(value);
	});
};

export function humanize(utils, config)
{
	let varsString = config.vars.join(", ");
	let output = "unset " + varsString + " in " + config.valueVarName;

	return output;
};