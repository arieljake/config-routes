
export
default
function delVar(state, config) {

    var value;

	state.unset(config.valueVarName);
};

export function humanize(utils, config) {

	var output = utils.devariable("delete #valueVarName# in state", config);
	
	return output;
};