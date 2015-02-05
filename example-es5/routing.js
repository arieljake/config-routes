"use strict";
var __moduleName = "example-es5/routing";
'use strict';
var path = require("path");
var ConfigRoutes = require('./config-routes');
var routes = ConfigRoutes.createRoutes({
  routeLib: path.join(__dirname, "routes"),
  fnLib: path.join(__dirname, "functions"),
  routeEvents: {
    routeStarting: function(routeName, routeConfig) {
      console.dir("route " + routeName + " starting");
    },
    stepComplete: function(fnName, fnConfig, routeName, routeConfig) {
      console.dir("route fn " + fnName + " complete");
    },
    stepError: function(err, fnName, fnConfig) {
      console.dir("route fn error " + err + " in " + fnName);
    },
    routeComplete: function(routeName) {
      console.dir("route " + routeName + " complete");
    }
  }
});
var route = routes.get("customer/GetCustomers.json");
var req = {mongoDB: {collection: function() {
      return {find: function() {
          return {toArray: function(cb) {
              cb(null, [{"name": "Customer 1"}]);
            }};
        }};
    }}};
var res = {send: function(value) {
    console.dir(value);
  }};
route.run(req, res);
//# sourceURL=example-src/routing.js