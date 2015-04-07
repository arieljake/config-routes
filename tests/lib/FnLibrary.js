'use strict';

global.$traceurRuntime = require('traceur-runtime');

var path = require("path");
var assert = require("chai").assert;

var FnLibrary = require("../../dist-es5/lib/FnLibrary").FnLibrary;
var fnsPath = path.join(__dirname, "..", "..", "dist-es5", "fns");
var testFnsPath = path.join(__dirname, "..", "_testFns");
	
describe("FnLibrary", function() {
	
	it ("returns fn by id", function() {
		
		var fnLib = new FnLibrary(fnsPath);
		var fn = fnLib.get("input/set.var");
		
		assert(fn);
		
	});
});