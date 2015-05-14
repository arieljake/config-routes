import {default as _} from 'lodash';

export class Toolset
{
	constructor(toolFnName)
	{
		this.toolFnName = toolFnName || "exe";
		this.entries = [];
	}
	
	createNameMatcher(name)
	{
		return function(key)
		{
			return key == name;
		};
	}
	
	add(matchFn, exeFn)
	{
		if (typeof matchFn === "string")
		{
			matchFn = this.createNameMatcher(matchFn);
		}

		var entry = {
			match: matchFn
		};
		
		entry[this.toolFnName] = exeFn;
		
		this.entries.push(entry);
	}
	
	clear()
	{
		this.entries.length = 0;
	}
	
	get(key)
	{
		return _.find(this.entries, function(entry)
		{
			return entry.match(key) === true;
		});
	}
}