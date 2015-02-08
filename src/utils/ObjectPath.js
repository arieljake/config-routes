let _ = require("lodash");
let ObjectPathPart = require("./ObjectPathPart").ObjectPathPart;

export class ObjectPath
{
	constructor(path)
	{
		this.path = path;
	}

	deleteIn(obj)
	{
		let
		{
			finalProperty, object
		} = this.descendIn(obj);

		delete object[finalProperty];
	}

	getValueIn(obj)
	{
		let
		{
			finalProperty, object
		} = this.descendIn(obj);

		if (!finalProperty || !object)
			return undefined;
		else
			return object[finalProperty];
	}

	setValueIn(obj, value)
	{
		let
		{
			finalProperty, object
		} = this.descendIn(obj);

		var finalPathPart = new ObjectPathPart(finalProperty);
		finalPathPart.setIn(object, value);
	}

	descendIn(obj)
	{
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
			let pathPart = new ObjectPathPart(property);
			let childRef = pathPart.getValueIn(objRef);

			if (childRef === undefined)
			{
				if (_.isObject(objRef))
				{
					childRef = pathPart.createIn(objRef);
				}
				else
				{
					return undefined;
				}
			}

			objRef = childRef;
		}

		return {
			finalProperty: pathParts.shift(),
			object: objRef
		};
	}
};