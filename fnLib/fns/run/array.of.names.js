
let FnsRunner = require("../../../objects/FnsRunner").FnsRunner;

export
default
function stringToArray(state, config) {

	let fnNames = state.get(config.arrayAt);
	let fns = fnNames.map((name) => state.getFnByName(name));
	let runner = new FnsRunner(fns);

	return new Promise(
		function (resolve, reject) {
			runner.run().then(function() {
				resolve();
			});
		}
	);
};