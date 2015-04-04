"use strict";
Object.defineProperties(exports, {
  Formatter: {get: function() {
      return Formatter;
    }},
  __esModule: {value: true}
});
var __moduleName = "dist-es5/lib/Formatter";
'use strict';
var MongoDbId = require('mongodb').ObjectID;
var uuid = require('uuid');
var _ = require('lodash');
var Formatter = {
  format: function(value, config) {
    if (!config)
      return value;
    var formatType;
    if (_.isString(config))
      formatType = config.toString();
    else
      formatType = config.type;
    var formatter = _.find(Formatter.formatters, function(formatter) {
      return formatter.test(formatType) === true;
    });
    if (formatter) {
      value = formatter.format(value, config, formatType);
    }
    return value;
  },
  formatters: [{
    test: Formatter.formatTypeEqualsTest("integer"),
    format: function(value, config) {
      return parseInt(value, 10);
    }
  }, {
    test: Formatter.formatTypeEqualsTest("string"),
    format: function(value, config) {
      return value.toString();
    }
  }, {
    test: Formatter.formatTypeEqualsTest("mongoId"),
    format: function(value, config) {
      if (typeof value == "string")
        return MongoDbId.createFromHexString(value);
      else
        return value;
    }
  }, {
    test: Formatter.formatTypeEqualsTest("uuid"),
    format: function(value, config) {
      return uuid.v1();
    }
  }, {
    test: Formatter.formatTypeEqualsTest("timestamp"),
    format: function(value, config) {
      return Date.now();
    }
  }, {
    test: Formatter.formatTypeEqualsTest("regexReplace"),
    format: function(value, config) {
      var regex = new RegExp(config.regex, config.regexOptions);
      return value.replace(regex, config.replace);
    }
  }, {
    regex: /^(\d+)digit#$/,
    test: function(formatType) {
      return this.regex.test(formatType);
    },
    format: function(value, config, formatType) {
      var numDigitsStr = this.regex.exec(formatType)[1];
      var numDigits = parseInt(numDigitsStr, 10);
      return ("" + Math.random()).substring(2, 2 + numDigits);
    }
  }],
  formatTypeEqualsTest: function(type) {
    return function(formatType) {
      return formatType == type;
    };
  }
};
//# sourceURL=src/lib/Formatter.js