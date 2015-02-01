"use strict";
Object.defineProperties(exports, {
  FnsRunner: {get: function() {
      return FnsRunner;
    }},
  __esModule: {value: true}
});
var __moduleName = "dist-es5/lib/FnsRunner";
var q = require('q');
var EventEmitter = require('events').EventEmitter;
var FnsRunner = function FnsRunner(fns) {
  this.fns = fns;
};
($traceurRuntime.createClass)(FnsRunner, {run: function() {
    var fns = this.fns;
    var fnIndex = 0;
    var emitter = this;
    var gen = $traceurRuntime.initGeneratorFunction(function $__1() {
      return $traceurRuntime.createGeneratorInstance(function($ctx) {
        while (true)
          switch ($ctx.state) {
            case 0:
              $ctx.state = (fnIndex < fns.length) ? 1 : -2;
              break;
            case 1:
              $ctx.state = 2;
              return fns[fnIndex]();
            case 2:
              $ctx.maybeThrow();
              $ctx.state = 4;
              break;
            case 4:
              emitter.emit('fnComplete', fnIndex);
              fnIndex++;
              $ctx.state = 0;
              break;
            default:
              return $ctx.end();
          }
      }, $__1, this);
    });
    return q.async(gen)();
  }}, {}, EventEmitter);
;
//# sourceURL=src/lib/FnsRunner.js