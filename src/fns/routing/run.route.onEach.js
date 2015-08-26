let Q = require("q");
let async = require("async");
let runRoute = require("./run.route").default;

export
default

function runRouteOnEach(state, config)
{
	var collection = state.get(config.collectionVarName);
	var inputVarName = config.inputVarName;
	var routeConfig = config.routeConfig;
	var itemKey = "__item_" + Math.random().toString().substr(2);
	var deferred = Q.defer();

	if (routeConfig.inputs === undefined)
		routeConfig.inputs = {};

	routeConfig.inputs[inputVarName] = itemKey;

	async.forEachSeries(collection,

		function(item, done)
		{
			state.set(itemKey, item);

			runRoute(state, routeConfig)
				.then(function(result)
				{
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
				deferred.reject(err);
			else
				deferred.resolve();
		});

	return deferred.promise;
};

export function humanize(utils, config)
{
	var output = utils.devariable("run route #routeName# on each", config);

	return output;
};