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
		
		if (!finalProperty || !object)
			return undefined;
		else
			return object[finalProperty];
	}
	
	setValueIn(obj, value) {
		let {finalProperty, object} = this.descendIn(obj);
		
		object[finalProperty] = value;
	}
	
	descendIn(obj) {
		if (!obj || !this.path)
			return {
				finalProperty: undefined,
				object: undefined
			};

		let objRef = obj;
		let pathParts = _.isArray(this.path) ? this.path : this.path.split(".");

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
			object: objRef
		};
	}
};