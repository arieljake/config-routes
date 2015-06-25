'use strict';

import { default as _} from 'lodash';
import {Toolset} from "../utils/Toolset";
import {ObjectPath} from "../utils/ObjectPath";

var Filter = new Toolset("filter");

Filter.filter = function(value, config, state)
{
	if (!config)
		return true;

	if (Array.isArray(config))
	{
		var passes = true;

		for (var i = 0; i < config.length && passes === true; i++)
		{
			passes = Filter.filter(value, config[i], state);
		}

		return passes;
	}
	else
	{
		var filterType;

		if (_.isString(config))
			filterType = config.toString();
		else
			filterType = config.type;

		var filter = this.get(filterType);

		if (filter)
		{
			if (config.valueVarName)
			{
				var path = new ObjectPath(config.valueVarName);
				value = path.getValueIn(value);
			}

			return filter.filter(value, config, state, filterType);
		}
		else
		{
			throw new Error("unfound filter type; " + filterType);
		}
	}
};

export {Filter};