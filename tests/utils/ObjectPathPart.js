global.$traceurRuntime = require('traceur-runtime');

var assert = require("chai").assert;
var ObjectPathPart = require("../../dist-es5/utils/ObjectPathPart").ObjectPathPart;

describe("ObjectPathPart", function()
{
	it("isArray returns false", function()
	{
		var part = new ObjectPathPart("test");

		assert.isFalse(part.isArray(), "not an array part");
	});
	
	it("isArray returns true", function()
	{
		var part = new ObjectPathPart("test[]");

		assert.isTrue(part.isArray(), "is an array part");
	});
	
	it("get arrayName works", function()
	{
		var part = new ObjectPathPart("test[]");
		var arrayName = part.arrayName;
		
		assert.equal(arrayName, "test", "arrayName matches");
	});
	
	it("getValueIn works", function()
	{
		var part = new ObjectPathPart("foo");
		var obj = {
			foo: "bar"
		};
		var result = part.getValueIn(obj);
		
		assert.equal(result, "bar", "getValueIn matches");
	});
	
	it("createIn does nothing if property exists", function()
	{
		var part = new ObjectPathPart("foo");
		var obj = {
			foo: "bar"
		};
		var result = part.createIn(obj);
		
		assert.equal(result, "bar", "result matches");
	});
	
	it("createIn creates object if property does not exist", function()
	{
		var part = new ObjectPathPart("foo");
		var obj = {};
		var result = part.createIn(obj);
		
		assert.isObject(result, "createIn matches");
		assert.isObject(obj.foo, "createIn matches");
	});
	
	it("createIn creates array if property specified with []", function()
	{
		var part = new ObjectPathPart("foo[]");
		var obj = {};
		var result = part.createIn(obj);
		
		assert.isArray(result, "createIn matches");
		assert.isArray(obj.foo, "createIn matches");
	});
	
	it("setIn sets property on object when not an array", function()
	{
		var part = new ObjectPathPart("foo");
		var obj = {};
		
		part.setIn(obj, "bar");
		
		assert.equal(obj.foo, "bar", "setIn result matches");
	});
	
	it("setIn concatenates value when array specified and already exists", function()
	{
		var part = new ObjectPathPart("foo[]");
		var obj = {
			foo: []
		};
		
		part.setIn(obj, "bar");
		
		assert.isArray(obj.foo, "property is array");
		assert.equal(obj.foo.length, 1, "array length matches");
		assert.equal(obj.foo[0], "bar", "array value matches");
	});
	
	it("setIn concatenates value when array specified and doesn't exist", function()
	{
		var part = new ObjectPathPart("foo[]");
		var obj = {};
		
		part.setIn(obj, "bar");
		
		assert.isArray(obj.foo, "property is array");
		assert.equal(obj.foo.length, 1, "array length matches");
		assert.equal(obj.foo[0], "bar", "array value matches");
	});
});