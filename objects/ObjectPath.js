let _ = require("lodash");

export class ObjectPath
{
	constructor(path) {
		this.path = path;
	}
	
	deleteIn(obj) {
		let {finalProperty, object} = this.descendIn(obj);
		
		delete object[finalProperty];
	}
	
	getValueIn(obj) {
		let {finalProperty, object} = this.descendIn(obj);
		
		return object[finalProperty];
	}
	
	setValueIn(obj, value) {
		let {finalProperty, object} = this.descendIn(obj);
		
		object[finalProperty] = value;
	}
	
	descendIn(obj) {
		if (!obj || !this.path)
			return undefined;

		let objRef = obj;
		let pathParts = this.path.split(".");

		while (pathParts.length > 1)
		{
			let property = pathParts.shift();
			let childRef = objRef[property];

			if (childRef === undefined)
			{
				if (_.isObject(objRef))
					childRef = objRef[property] = {};
				else
					return undefined;
			}

			objRef = childRef;
		}

		return {
			finalProperty: pathParts.shift(),
			object: obj
		};
	}
};