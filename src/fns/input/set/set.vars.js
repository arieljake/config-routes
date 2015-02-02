let setVar = require('./set.var').default;

export
default
function setVars(state, config) {

	config.vars = config.vars || [];
	
    config.vars.forEach(function(varConfig) {
		
		setVar(state, varConfig);
		
	});
};