'use strict';

let MongoDbId = require('mongodb').ObjectID;
let uuid = require('uuid');
let _ = require('lodash');

export var Formatter = {

	format: function(value, config)
	{
		if (!config)
			return value;

		var formatType;

		if (_.isString(config))
			formatType = config.toString();
		else
			formatType = config.type;

		switch (formatType)
		{
			case "integer":
				value = parseInt(value, 10);
				break;

			case "string":
				value = value.toString();
				break;

			case "boolean":
				value = (value == "true");
				break;

			case "mongoId":
				if (typeof value == "string")
					value = MongoDbId.createFromHexString(value);
				break;

			case "uuid":
				value = uuid.v1();
				break;

			case "timestamp":
				value = Date.now();
				break;

			case "length":
				value = value.length;
				break;

			case "regexReplace":
				var regex = new RegExp(config.regex, config.regexOptions);
				value = value.replace(regex, config.replace);
				break;
		}

		return value;
	}
};