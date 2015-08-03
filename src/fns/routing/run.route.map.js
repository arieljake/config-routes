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
	var results = [];

	async.forEachSeries(collection,

		function(item, done)
		{
			state.set(config.itemVarName, item);

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