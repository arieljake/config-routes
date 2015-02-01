export
default
function resSend(state, config) {

	let value = state.get(config.valueAt);
	let res = state.get("res");
	
	res.send(value);
};