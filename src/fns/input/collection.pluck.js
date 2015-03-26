let _ = require("lodash");
let ObjectPath = require("../../utils/ObjectPath").ObjectPath;
let Formatter = require("../../lib/Formatter").Formatter;

export
default
function pluck(state, config)
{
	let collection = state.get(config.collectionVarName);
	let path = new ObjectPath(config.propertyName);
	let format = config.format;
	
	let value = _.map(collection, function(item)
	{
		var itemValue = path.getValueIn(item);
		
		itemValue = Formatter.format(itemValue, format);
		
		return itemValue;
	});

	state.set(config.saveTo, value);

	if (config.deleteOriginal === true)
	{
		state.unset(config.collectionVarName);
	}
};