export
default
function stringToArray(state, config) {

	let input = state.get(config.stringAt);
	let inputParts = input.split(config.delim);

	state.set(config.outputTo, inputParts);
};