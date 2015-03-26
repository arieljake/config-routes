"use strict";
Object.defineProperties(exports, {
  Formatter: {get: function() {
      return Formatter;
    }},
  __esModule: {value: true}
});
var __moduleName = "dist-es5/lib/Formatter";
var MongoDbId = require('mongodb').ObjectID;
var uuid = require('uuid');
var _ = require('lodash');
var Formatter = {format: function(value, config) {
    if (!config)
      return value;
    var formatType;
    if (_.isString(config))
      formatType = config.toString();
    else
      formatType = config.type;
    switch (formatType) {
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
  }};
//# sourceURL=src/lib/Formatter.js