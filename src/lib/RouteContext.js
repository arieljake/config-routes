let _ = require('lodash');

let ObjectPath = require('../utils/ObjectPath').ObjectPath;
let VariableString = require('../utils/VariableString').VariableString;

export class RouteContext
{
	constructor(req, res, fnLib)
	{
		this.model = {
			req: req,
			res: res
		};
		this.fnLib = fnLib;
	}

	get(name)
	{
		let path = new ObjectPath(name);

		return path.getValueIn(this.model);
	}

	set(name, value)
	{
		if (!name)
			return;

		let path = new ObjectPath(name);

		path.setValueIn(this.model, value);
	}
	
	get request()
	{
		var req = this.model.req;
		
		return {
			toObject: function()
			{
				["params", "query", "body"].reduce((memo, property) => {
					return _.assign(memo, req[property]);
				},{});
			},
			get: function(name)
			{
				["params", "query", "body"].reduce((value, property) => {
					return value || req[property][name];
				});
			}
		};
	}
	
	translate(varString)
	{
		return VariableString(varString, this.model);
	}

	getFnByName(name)
	{
		return fnLib.get(name);
	}

	serialize()
	{
		var serialized = _.omit(this.model, ['req','res']);
		
		serialized.req = {
			query: this.model.req.query,
			params: this.model.req.params,
			body: this.model.req.body,
		};
		
		return serialized;
	}
};