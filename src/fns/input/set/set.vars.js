let SetVar = require('./set.var');

export
default
function setVars(state, config) {

	config.vars = config.vars || [];
	
    config.vars.forEach(function(varConfig) {
		
		SetVar.default(state, varConfig);
		
	});
};

export function humanize(utils, config) {
	
	var output = "";
	
	config.vars.forEach(function(varConfig) {
		
		if (output.length > 0)
			output += "\n";
		
		output += SetVar.humanize(utils, varConfig);
		
	});
	
	return output;	
}