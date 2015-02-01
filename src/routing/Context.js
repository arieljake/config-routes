
let ObjectPath = require('../utils/ObjectPath').ObjectPath;

export class Context {
	constructor(model,fnLib) {
		this.model = model;
		this.fnLib = fnLib;
	}

	get(name) {
		let path = new ObjectPath(name);

		return path.getValueIn(this.model);
	}

	set(name, value) {
		let path = new ObjectPath(name);
		
		path.setValueIn(this.model, value);
	}
		
	getFnByName(name) {
		return fnLib.get(name);
	}
};