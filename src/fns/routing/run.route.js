export
default
function setVar(state, config) {

	var routeLib = state.get(config.routeLibVarName);
    var routeName = state.translate(config.routeNameString);
	var route = routeLib.get(routeName);
	var req = state.get("req");
	var res = state.get("res");
	
	return route.run(req, res);
};

export function humanize(utils, config) {

	var output = utils.devariable("run route #routeName#", config);
	
	return output;
};