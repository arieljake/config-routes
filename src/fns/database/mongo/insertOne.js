let Q = require('q');
let _ = require('lodash');

export default function insertOne(state, config)
{
	try
	{
		var deferred = Q.defer();
		var mongoDB = state.get(config.mongoVarName);
		var collection = config.collection;
		var record = state.get(config.recordVarName) || config.record || {};
		var options = state.get(config.optionsVarName) || config.options ||
		{};

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

		mongoDB.collection(collection).insertOne(record, options, resultHandler);
	}
	catch (err)
	{
		deferred.reject(err);
	}

	return deferred.promise;
};

export function humanize(utils, config)
{
	var output = utils.devariable("save #recordVarName# in the #collection# table", config);

	return output;
};