let _ = require("lodash");

export class ObjectPathPart
{
	constructor(part)
	{
		this.part = part;
	}

	isArray()
	{
		return this.part.substr(-2) == "[]";
	}
	
	get arrayName()
	{
		return this.part.replace("[]", "");
	}

	get basename()
	{
		if (this.isArray())
			return this.arrayName;
		else
			return this.part;
	}
	
	getValueIn(obj)
	{
		return obj[this.basename];
	}
	
	createIn(obj)
	{
		var value;
		
		if (obj[this.basename] !== undefined)
		{
			value = obj[this.basename];
		}
		else if (this.isArray())
		{
			value = obj[this.basename] = [];
		}
		else
		{
			value = obj[this.basename] = {};
		}
		
		return value;
	}
	
	setIn(obj, value)
	{
		if (this.isArray())
		{
			this.createIn(obj);
			obj[this.basename].push(value);
		}
		else
		{
			obj[this.basename] = value;
		}
	}
};