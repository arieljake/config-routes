"use strict";
Object.defineProperties(exports, {
  Formatter: {get: function() {
      return Formatter;
    }},
  __esModule: {value: true}
});
var __moduleName = "dist-es5/lib/Formatter";
var $__uuid__,
    $__lodash__;
'use strict';
var MongoDbId = require('mongodb').ObjectID;
var uuid = ($__uuid__ = require("uuid"), $__uuid__ && $__uuid__.__esModule && $__uuid__ || {default: $__uuid__}).default;
var _ = ($__lodash__ = require("lodash"), $__lodash__ && $__lodash__.__esModule && $__lodash__ || {default: $__lodash__}).default;
var formatTypeEqualsTest = function(type) {
  return function(formatType) {
    return formatType == type;
  };
};
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
    test: formatTypeEqualsTest("integer"),
    format: function(value, config) {
      return parseInt(value, 10);
    }
  }, {
    test: formatTypeEqualsTest("string"),
    format: function(value, config) {
      return value.toString();
    }
  }, {
    test: formatTypeEqualsTest("mongoId"),
    format: function(value, config) {
      if (typeof value == "string")
        return MongoDbId.createFromHexString(value);
      else
        return value;
    }
  }, {
    test: formatTypeEqualsTest("uuid"),
    format: function(value, config) {
      return uuid.v1();
    }
  }, {
    test: formatTypeEqualsTest("timestamp"),
    format: function(value, config) {
      return Date.now();
    }
  }, {
    test: formatTypeEqualsTest("regexReplace"),
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
  }]
};
//# sourceURL=src/lib/Formatter.js