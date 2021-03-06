import {default as _} from "lodash";
import {ObjectPath} from "./ObjectPath";

export function VariableString(value, context, delim)
{
	if (_.isString(value) === false)
		return value;

	delim = delim || "#";

	var varLocator = new RegExp("\\" + delim + "[\\w\\.\\-\\d]+" + "\\" + delim, "g"); ///\#[\w\.\-\d]+\#/g
	var varExtract = new RegExp("\\" + delim, "g");

	if (!context)
		return _.map(value.match(varLocator), function(varName)
		{
			return varName.replace(/\#/g, "");
		});

	return value.replace(varLocator, function(m, i, t)
	{
		var path = m.replace(varExtract, "");
		var value;
		
		if (_.isFunction(context.get))
		{
			value = context.get(path);
		}
		else
		{
			
			value = new ObjectPath(path).getValueIn(context);
		}
		
		if (value === undefined || value === null)
			return "";
		else
			return value.toString()
	});
}