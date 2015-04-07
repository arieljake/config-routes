'use strict';

global.$traceurRuntime = require('traceur-runtime');

var assert = require("chai").assert;
var Q = require("q");

var FnsRunner = require("../../dist-es5/lib/FnsRunner").FnsRunner;

describe("FnsRunner", function()
{
	it("promise completes with no fns", function(done)
	{
		var fns = [];
		var runner = new FnsRunner(fns);

		runner.run()
			.then(function()
			{
				done();
			});
	});

	it("promise completes after fns return", function(done)
	{
		var value;
		var fn1 = function()
		{
			value = 1;
			return true;
		};
		var fns = [fn1];
		var runner = new FnsRunner(fns);

		runner.run()
			.then(function()
			{
				try
				{
					assert.equal(value, 1, "value updated");

					done();
				}
				catch (err)
				{
					done(err);
				}
			});
	});

	it("promise completes after fns promise compeletes", function(done)
	{
		var value;
		var fn1 = function()
		{
			var deferred = Q.defer();

			setTimeout(function()
			{
				value = 1;
				deferred.resolve(value);
			}, 100);

			return deferred.promise;
		};
		var fns = [fn1];
		var runner = new FnsRunner(fns);

		runner.run()
			.then(function()
			{
				try
				{
					assert.equal(value, 1, "value updated");

					done();
				}
				catch (err)
				{
					done(err);
				}
			});
	});

	it("promise catches after fns throw error", function(done)
	{
		var value;
		var fn1 = function()
		{
			value = 1;
			throw new Error("aaah");
		};
		var fns = [fn1];
		var runner = new FnsRunner(fns);

		runner.run()
			.catch(function(err)
			{
				try
				{
					assert.equal(value, 1, "value updated");
					done();
				}
				catch (err)
				{
					done(err);
				}
			});

	});

	it("promise catches after fns reject promise", function(done)
	{
		var value;
		var fn1 = function()
		{
			var deferred = Q.defer();

			setTimeout(function()
			{
				value = 1;
				deferred.reject(value);
			}, 100);

			return deferred.promise;
		};
		var fns = [fn1];
		var runner = new FnsRunner(fns);

		runner.run()
			.catch(function(err)
			{
				try
				{
					assert.equal(value, 1, "value updated");
					done();
				}
				catch (err)
				{
					done(err);
				}
			});
	});

	it("promise catches after 2nd fn throws error", function(done)
	{
		var value;
		var fn1 = function()
		{
			value = 1;
		};
		var fn2 = function()
		{
			value = 2;
			assert.equal(value, 3);
		};
		var fns = [fn1, fn2];
		var runner = new FnsRunner(fns);

		runner.run()
			.catch(function(err)
			{
				try
				{
					assert.equal(value, 2, "value updated");
					done();
				}
				catch (err)
				{
					done(err);
				}
			});
	});

	it("runnerStarting event fires", function(done)
	{
		var fns = [];
		var runner = new FnsRunner(fns);

		runner.on("runnerStarting", function()
		{
			done();
		});

		runner.run();
	});

	it("runnerComplete event fires", function(done)
	{
		var fns = [];
		var runner = new FnsRunner(fns);

		runner.on("runnerComplete", function()
		{
			done();
		});

		runner.run();
	});

	it("runnerStarting event fires once", function(done)
	{
		var value1, value2;
		var runnerStartingCounter = 0;
		var fn1 = function()
		{
			value1 = 1;
		};
		var fn2 = function()
		{
			value2 = 2;
		};
		var fns = [fn1, fn2];
		var runner = new FnsRunner(fns);

		runner.on("runnerStarting", function()
		{
			runnerStartingCounter++;
		});

		runner.on("runnerComplete", function()
		{
			try
			{
				assert.equal(value1, 1, "fn1 ran");
				assert.equal(value2, 2, "fn2 ran");
				assert.equal(runnerStartingCounter, 1, "runnerStarting fired once");

				done();
			}
			catch (err)
			{
				done(err);
			}
		});

		runner.run();
	});

	it("fnComplete fires once for each fn", function(done)
	{
		var fnsCompleted = [];
		var value1, value2;
		var fn1 = function()
		{
			value1 = 1;
		};
		var fn2 = function()
		{
			value2 = 2;
		};
		var fns = [fn1, fn2];
		var runner = new FnsRunner(fns);

		runner.on("fnComplete", function(fnIndex)
		{
			fnsCompleted.push(fnIndex);
		});

		runner.on("runnerComplete", function(fnIndex)
		{
			try
			{
				assert.equal(fnsCompleted.length, fns.length, "fnCompleted called once for each fn");
				assert.sameMembers(fnsCompleted, [0, 1], "each fn completed");

				done();
			}
			catch (err)
			{
				done(err);
			}
		});

		runner.run();
	});

	it("fnError fires if fn throws error", function(done)
	{
		var fn1 = function()
		{
			throw new Error("test error");
		};
		var fns = [fn1];
		var runner = new FnsRunner(fns);

		runner.on("fnError", function(fnIndex, err)
		{
			try
			{
				assert.equal(err.message, "test error", "error matches");
				assert.equal(fnIndex, 0, "fn 0 threw error");

				done();
			}
			catch (err)
			{
				done(err);
			}
		});

		runner.run();
	});

	it("fn error trigger promise catch", function(done)
	{
		var fn1 = function()
		{
			throw new Error("test error");
		};
		var fns = [fn1];
		var runner = new FnsRunner(fns);

		runner.run()
			.catch(function(err)
			{
				try
				{
					assert.equal(err.fnIndex, 0, "err contains index of fn that err'd");
					assert(err.error, "err contains thrown error");
					assert.equal(err.error.message, "test error", "error matches");

					done();
				}
				catch (err)
				{
					done(err);
				}
			});
	});

	it("fn error stops sequence", function(done)
	{
		var value = 1;
		var fn1 = function()
		{
			throw new Error("test error");
		};
		var fn2 = function()
		{
			value = 2;
		};
		var fns = [fn1, fn2];
		var runner = new FnsRunner(fns);

		runner.on("runnerComplete", function(fnIndex)
		{
			done("runner should not complete");
		});
		
		runner.run()
			.catch(function(err)
			{
				setTimeout(function()
				{
					try
					{
						assert.equal(value, 1, "fn2 never ran");

						done();
					}
					catch (err)
					{
						done(err);
					}
				}, 100);
			});
	});
});