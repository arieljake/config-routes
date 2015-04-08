'use strict';

import {default as _} from 'lodash';

export class RouteStep
{
	constructor(id, name, desc, stepFn, stepConfig)
	{
		this.id = id;
		this.name = name;
		this.desc = desc;
		this.stepFn = stepFn;
		this.stepConfig = stepConfig;
	}
	
	getExecutable(context)
	{
		return _.bind(this.stepFn, null, context, this.stepConfig);
	}

	toObject()
	{
		return {
			id: this.id,
			name: this.name,
			desc: this.desc
		};
	}
};