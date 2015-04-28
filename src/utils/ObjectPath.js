
import {default as _} from "lodash";
import {ObjectPathPart} from "./ObjectPathPart";

export class ObjectPath
{
	constructor(path)
	{
		this.path = path;
	}

	deleteIn(obj)
	{
		let result = this.descendIn(obj,false);

		if (result)
			delete result.object[result.finalProperty];
	}

	getValueIn(obj)
	{
		let result = this.descendIn(obj,false);

		if (result && result.finalProperty && result.object)
			return result.object[result.finalProperty];
		else
			return undefined;
	}

	setValueIn(obj, value)
	{
		let result = this.descendIn(obj,true);

		if (result)
		{
			var finalPathPart = new ObjectPathPart(result.finalProperty);
			finalPathPart.setIn(result.object, value);
		}
	}

	descendIn(obj,fillPath)
	{
		if (!obj || !this.path)
			return undefined;

		let objRef = obj;
		let pathParts = _.isArray(this.path) ? this.path : this.path.split(".");
		let partIndex = 0

		while (partIndex < pathParts.length - 1)
		{
			let property = pathParts[partIndex++];
			let pathPart = new ObjectPathPart(property);
			let childRef = pathPart.getValueIn(objRef);

			if (childRef === undefined)
			{
				if (fillPath && _.isObject(objRef))
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
			finalProperty: pathParts[partIndex],
			object: objRef
		};
	}
};