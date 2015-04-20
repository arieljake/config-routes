let Q = require("q");
let runRoute = require("./run.route").default;

export
default
function runRouteOnEach(state, config)
{
	var collection = state.get(config.collectionVarName);
	var inputVarName = config.inputVarName;
	var routeConfig = config.routeConfig;
	var itemKey = "__item_" + Math.random().toString().substr(2);
	
	if (routeConfig.input === undefined)
	{
		routeConfig.input = {};
	}
	
	routeConfig.input[inputVarName] = itemKey;
	
	var routePromises = collection.map(function(item) {
		
		state.set(itemKey, item);
		
		return runRoute(state, routeConfig);
	});
	
	return Q.all(routePromises);
};

export function humanize(utils, config)
{
	var output = utils.devariable("run route #routeName# on each", config);

	return output;
};