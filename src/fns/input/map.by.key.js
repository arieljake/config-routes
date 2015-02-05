export
default
function mapByKey(state, config) {

	let source = state.get(config.arrayAt);
	let lookup = state.get(config.mapAt);
	let result = source.map( (key) => lookup[key] );

	state.set(config.saveTo, result);
};