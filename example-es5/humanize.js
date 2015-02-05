"use strict";
var __moduleName = "example-es5/humanize";
'use strict';
var path = require("path");
var ConfigRoutes = require('./config-routes');
var routeWriter = ConfigRoutes.createRouteWriter({
  routeLib: path.join(__dirname, "routes"),
  fnLib: path.join(__dirname, "functions")
});
var stream = routeWriter.write("CreateEvent");
var output = "";
var chunk;
while (chunk = stream.read()) {
  output += chunk + "\n";
}
console.log(output);
//# sourceURL=example-src/humanize.js