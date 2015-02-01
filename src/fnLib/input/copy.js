export
default
function copy(state, config) {

	let value = state.get(config.valueAt);
	
	state.set(config.outputTo, value);
};