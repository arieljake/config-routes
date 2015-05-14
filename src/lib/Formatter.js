'use strict';

import {Toolset} from "../utils/Toolset";

var Formatter = new Toolset("format");

Formatter.format = function(value, config)
{
	if (!config)
		return value;

	if (Array.isArray(config))
	{
		config.forEach(function(formatStep) {
			value = Formatter.format(value, formatStep);
		});

		return value;
	}
	else
	{
		var formatType;

		if (typeof config === "string")
			formatType = config.toString();
		else
			formatType = config.type;

		var formatter = this.get(formatType);

		if (formatter)
		{
			value = formatter.format(value, config, formatType);
		}

		return value;
	}
};

export {Formatter};