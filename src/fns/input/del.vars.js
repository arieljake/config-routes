let DelVar = require('./del.var');

export
default
function delVars(state, config) {

    config.vars = config.vars || [];
	
	config.vars.forEach(function(varConfig) {
		
		DelVar.default(state, varConfig);
		
	});
};

export function humanize(utils, config) {

	var output = utils.devariable("delete multiple variables in state", config);
	
	return output;
};