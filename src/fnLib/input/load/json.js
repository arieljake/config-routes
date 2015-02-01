import fs from 'fs';

export
default
function loadJson(state, config) {

	let path = state.get(config.pathAt);
	let content = fs.readFileSync(path, "utf8");
	let value = JSON.parse(content);

	state.set(config.outputTo, value);
};