global.$traceurRuntime = require('traceur-runtime');

var assert = require("chai").assert;
var ObjectPath = require("../../dist-es5/utils/ObjectPath").ObjectPath;

describe("ObjectPath", function()
{
	it("deleteIn works when path exists", function()
	{
		var path = new ObjectPath("foo.bar");
		var obj = {
			foo: {
				bar: 1
			}
		};

		path.deleteIn(obj);
		
		assert.isUndefined(obj.foo.bar, "property is removed");
	});
	
	it("deleteIn fails silently when path DNE", function()
	{
		var path = new ObjectPath("foo.bars");
		var obj = {
			foo: {
				bar: 1
			}
		};

		path.deleteIn(obj);
	});
	
	it("getValueIn works when path exists", function()
	{
		var path = new ObjectPath("foo.bar");
		var obj = {
			foo: {
				bar: 1
			}
		};

		var result = path.getValueIn(obj);
		
		assert.equal(result, 1, "result matches");
	});
	
	it("getValueIn returns undefined when path DNE", function()
	{
		var path = new ObjectPath("foo.bars");
		var obj = {
			foo: {
				bar: 1
			}
		};

		var result = path.getValueIn(obj);
		
		assert.isUndefined(result, "result matches");
	});
	
	it("setValueIn works when full path exists", function()
	{
		var path = new ObjectPath("foo.bar");
		var obj = {
			foo: {
				bar: 1
			}
		};

		path.setValueIn(obj,2);
		
		assert.equal(obj.foo.bar, 2, "result matches");
	});
	
	it("setValueIn works when some path exists", function()
	{
		var path = new ObjectPath("foo.bar");
		var obj = {
			foo: {
				
			}
		};

		path.setValueIn(obj,2);
		
		assert.equal(obj.foo.bar, 2, "result matches");
	});
	
	it("setValueIn works when no path exists", function()
	{
		var path = new ObjectPath("foo.bar");
		var obj = {};

		path.setValueIn(obj,2);
		
		assert.equal(obj.foo.bar, 2, "result matches");
	});
	
	it("setValueIn adds value to array", function()
	{
		var path = new ObjectPath("foo.bar[]");
		var obj = {};

		path.setValueIn(obj,2);
		
		assert.isArray(obj.foo.bar, "property type matches");
		assert.equal(obj.foo.bar.length, 1, "array length matches");
		assert.equal(obj.foo.bar[0], 2, "value matches");
	});
	
	it("setValueIn adds value to object in array", function()
	{
		var path = new ObjectPath("foo.bar[].0.pen");
		var obj = {};

		path.setValueIn(obj,2);
		
		assert.isArray(obj.foo.bar, "property type matches");
		assert.equal(obj.foo.bar.length, 1, "array length matches");
		assert.isObject(obj.foo.bar[0], "array item type matches");
		assert.equal(obj.foo.bar[0].pen, 2, "value matches");
	});
});