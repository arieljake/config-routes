'use strict';

global.$traceurRuntime = require('traceur-runtime');

var path = require("path");
var assert = require("chai").assert;
var Library = require("../../dist-es5/lib/Library").Library;
	
describe("Library", function() {
	
	it ("returns fn by id", function() {
		
		var paths = [
			{
				dirPath: path.join(__dirname, "..", "..", "dist-es5", "fns"),
				fileNameRegex: /noop/
			}
		];
		
		var lib = new Library(paths);
		var fn = lib.getById("noop");
		
		assert(fn);
		
		fn = lib.getById("input/set.var");
		
		assert(!fn);
		
	});
});