export
default
function getRecords(state, config) {

	let value = [
		{
			name: "ARIEL"
		},
		{
			name: "JAKE"
		}
	];
	
	state.set(config.saveTo, value);
};