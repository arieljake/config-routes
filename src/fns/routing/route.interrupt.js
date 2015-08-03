let Q = require("q");

export
default
function routeInterrupt(state, config)
{
	var deferred = Q.defer();
	
	deferred.reject(true);

	return deferred.promise;
};

export function humanize(utils, config)
{
	var output = utils.devariable("route interrupt", config);

	return output;
};