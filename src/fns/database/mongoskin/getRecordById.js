
let Q = require('q');

export
default
function getRecordById(state, config) {

	var deferred = Q.defer();
	var mongoDB = state.get(config.mongoVarName);
	var collection = config.collection;
	var recordId = state.get(config.recordIdVarName) || config.recordId;
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
	
	mongoDB.collection(collection).findById(recordId, options, resultHandler);
	
	return deferred.promise;
};