let Q = require('q');
let _ = require('lodash');

export default function insertRecords(state, config)
{
	try
	{
		var deferred = Q.defer();
		var mongoDB = state.get(config.mongoVarName);
		var collection = config.collection;
		var records = state.get(config.recordsVarName);
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
				if (_.isArray(records) === false)
					result = result[0];

				state.set(config.saveResultTo, result);
				deferred.resolve(result);
			}
		};


		mongoDB.collection(collection).insert(records, options, resultHandler);
	}
	catch (err)
	{
		deferred.reject(err);
	}

	return deferred.promise;
};

export function humanize(utils, config)
{
	var output = utils.devariable("save #recordsVarName# in the #collection# table", config);

	return output;
};