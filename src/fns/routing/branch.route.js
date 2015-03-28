let _ = require('lodash');
let runRoute = require("./run.route").default;

export
default

function branchRoute(state, config)
{
	var value = state.get(config.valueVarName);
	var format = config.format;
	var cases = config.cases;
	var defaultCase = config.defaultCase;

	var targetCase = _.find(cases, function(curCase)
	{
		return curCase.value == value;
	});

	if (!targetCase)
	{
		targetCase = defaultCase;
	}

	if (targetCase)
	{
		var routeConfig = {
			routeLibVarName: config.routeLibVarName,
			route: targetCase.route,
			desc: targetCase.desc,
			input: _.defaults({}, targetCase.input, config.input)
		};
		
		return runRoute(state, routeConfig);
	}
	else
	{
		throw new Error("no valid switch");
	}
};

export function humanize(utils, config)
{
	var output = utils.devariable("branch route", config);

	return output;
};