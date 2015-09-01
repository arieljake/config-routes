let Q = require("q");
let async = require("async");
let runRoute = require("./run.route").default;

export
default

function runRouteMap(state, config)
{
	var deferred = Q.defer();
	var collection = state.get(config.collectionVarName);
	var routeConfig = config.routeConfig;
	var itemKey = "__item_" + Math.random().toString().substr(2);
	var results = [];

	if (routeConfig.inputs === undefined)
		routeConfig.inputs = {};

	routeConfig.inputs[config.itemVarName] = itemKey;
	
	async.forEachSeries(collection,

		function(item, done)
		{
			state.set(itemKey, item);

			runRoute(state, routeConfig)
				.then(function()
				{
					results.push(state.assemble(config.result));
					
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
			{
				deferred.reject(err);
			}
			else
			{
				if (config.saveTo)
					state.set(config.saveTo, results);
				
				deferred.resolve();
			}
		});

	return deferred.promise;
};

export function humanize(utils, config)
{
	var output = utils.devariable("run route #routeName# as mapping fn", config);

	return output;
};