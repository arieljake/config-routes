let Q = require("q");
let async = require("async");
let runRoute = require("./run.route").default;

export
default

function runRouteMap(state, config)
{
	var collection = state.get(config.collectionVarName);
	var routeConfig = config.routeConfig;
	var itemKey = "__item_" + Math.random().toString().substr(2);
	var results = [];
	var deferred = Q.defer();

	if (routeConfig.input === undefined)
	{
		routeConfig.input = {};
	}

	routeConfig.input[config.inputVarName] = itemKey;

	async.forEachSeries(collection,

		function(item, done)
		{
			state.set(itemKey, item);

			runRoute(state, routeConfig)
				.then(function()
				{
					var result = state.get(config.outputVarName);
					results.push(result);
					
					done();
				})
				.catch(function(err)
				{
					done(err);
				});
		},

		function(err)
		{
			if (err)
				state.set(config.saveErrorTo, err);
			else
				state.set(config.saveTo, results);

			deferred.resolve();
		});

	return deferred.promise;
};

export function humanize(utils, config)
{
	var output = utils.devariable("run route #routeName# as mapping fn", config);

	return output;
};