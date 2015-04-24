'use strict';

import { default as _} from 'lodash';
import {ObjectPath} from "../utils/ObjectPath";

let filterTypeEqualsTest = function(type)
{
	return function(filterType)
	{
		return filterType == type;
	};
};

export var Filter = {

	filter: function(value, config, state)
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

			var filter = _.find(Filter.filters, function(filter)
			{
				return filter.filterApplies(filterType) === true;
			});

			if (filter)
			{
				if (config.valueVarName)
				{
					var path = new ObjectPath(config.valueVarName);
					value = path.getValueIn(value);
				}
				
				return filter.passes(value, config, state, filterType);
			}
			else
			{
				return true;
			}
		}
	},

	filters: [
		{
			filterApplies: filterTypeEqualsTest("matches"),
			passes: function(value, config)
			{
				var regex = new RegExp(config.regex);
				return regex.test(value);
			}
		},
		{
			filterApplies: filterTypeEqualsTest("notIn"),
			passes: function(value, config, state, filterType)
			{
				var values = state.get(config.collectionVarName);
				return values.indexOf(value) < 0;
			}
		}
	]
};