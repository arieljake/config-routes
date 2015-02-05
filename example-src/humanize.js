'use strict';

let path = require("path");
let ConfigRoutes = require('./config-routes');

let routeWriter = ConfigRoutes.createRouteWriter({
	routeLib: path.join(__dirname, "routes"),
	fnLib: path.join(__dirname, "functions")
});

let stream = routeWriter.write("CreateEvent");
let output = "";
let chunk;

while(chunk = stream.read())
{
	output += chunk + "\n";
}

console.log(output);