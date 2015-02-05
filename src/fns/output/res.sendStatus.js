export
default
function resSendStatus(state, config) {

	let res = state.get("res");
	
	res.sendStatus(config.status);
};

export function humanize(utils, config) {
	
	return "Send 404";
};