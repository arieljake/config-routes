"use strict";
Object.defineProperties(exports, {
  RouteWriter: {get: function() {
      return RouteWriter;
    }},
  __esModule: {value: true}
});
var __moduleName = "dist-es5/lib/RouteWriter";
'use strict';
var Stream = require('stream');
var _ = require('lodash');
var RouteWriter = function RouteWriter(routeLib, stepWriter) {
  this.routeLib = routeLib;
  this.stepWriter = stepWriter;
};
($traceurRuntime.createClass)(RouteWriter, {
  write: function(routeName) {
    var routeDefinition = this.routeLib.get(routeName);
    var stream = new Stream.Readable();
    var source = _.bind(this.getNext, this, routeDefinition);
    stream.setEncoding("utf8");
    stream._read = function() {
      this.push(source());
    };
    return stream;
  },
  getNext: function(routeDefinition) {
    if (!routeDefinition || routeDefinition.length == 0)
      return null;
    var stepDefinition = routeDefinition.shift();
    var writtenStep = this.stepWriter.write(stepDefinition);
    return writtenStep;
  }
}, {});
//# sourceURL=src/lib/RouteWriter.js