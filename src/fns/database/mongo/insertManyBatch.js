// http://mongodb.github.io/node-mongodb-native/2.0/api/Collection.html#initializeUnorderedBulkOp

let Q = require('q');
let _ = require('lodash');

export default function insertManyBatch(state, config)
{
	try
	{
		var deferred = Q.defer();
		var mongoDB = state.get(config.mongoVarName);
		var collection = config.collection;
		var records = state.get(config.recordsVarName) || config.records || [];
		var options = state.get(config.optionsVarName) || config.options ||
		{};

		var resultHandler = function(err, result)
		{
			if (err)
			{
				state.set(config.saveErrorTo, err);
			}
			
			if (result)
			{
				state.set(config.saveResultTo, result);
			}
			
			deferred.resolve(result);
		};

		var batch = mongoDB.collection(collection).initializeUnorderedBulkOp();
		
		for (var i=0; i < records.length; i++)
		{
			batch.insert(records[i], options);
		}
		
		batch.execute(resultHandler);
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