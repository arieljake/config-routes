export
default
function resSendStatus(state, config) {

	let res = state.get(config.responseVarName);
	
	res.sendStatus(config.status);
};

export function humanize(utils, config) {
	
	return "Send 404";
};