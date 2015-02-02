
let Q = require('q');

export
default
function insertRecords(state, config) {

	var deferred = Q.defer();
	var mongoDB = state.get(config.mongoVarName);
	var collection = config.collection;
	var records = state.get(config.recordsVarName);
	var options = state.get(config.optionsVarName) || config.options || {};

	var resultHandler = function(err, result)
	{
		if (err)
		{
			state.set(config.saveErrorTo, err);
			deferred.reject(err);
		}
		else
		{
			state.set(config.saveResultTo, result);
			deferred.resolve(result);
		}
	};
	
	mongoDB.collection(collection).insert(records, options, resultHandler);
	
	return deferred.promise;
};