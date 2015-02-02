"use strict";
Object.defineProperties(exports, {
  RouteContext: {get: function() {
      return RouteContext;
    }},
  __esModule: {value: true}
});
var __moduleName = "dist-es5/lib/RouteContext";
var _ = require('lodash');
var ObjectPath = require('../utils/ObjectPath').ObjectPath;
var RouteContext = function RouteContext(req, res, fnLib) {
  this.model = {
    req: req,
    res: res
  };
  this.fnLib = fnLib;
};
($traceurRuntime.createClass)(RouteContext, {
  get: function(name) {
    var path = new ObjectPath(name);
    return path.getValueIn(this.model);
  },
  set: function(name, value) {
    if (!name)
      throw new Error("name undefined in Context.set");
    var path = new ObjectPath(name);
    path.setValueIn(this.model, value);
  },
  getFnByName: function(name) {
    return fnLib.get(name);
  },
  serialize: function() {
    var serialized = _.omit(this.model, ['req', 'res']);
    serialized.req = {
      query: this.model.req.query,
      params: this.model.req.params,
      body: this.model.req.body
    };
    return serialized;
  }
}, {});
;
//# sourceURL=src/lib/RouteContext.js