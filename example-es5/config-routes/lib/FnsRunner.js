"use strict";
Object.defineProperties(exports, {
  FnsRunner: {get: function() {
      return FnsRunner;
    }},
  __esModule: {value: true}
});
var __moduleName = "dist-es5/lib/FnsRunner";
'use strict';
var Q = require('q');
var EventEmitter = require('events').EventEmitter;
var FnsRunner = function FnsRunner(fns) {
  this.fns = fns;
};
($traceurRuntime.createClass)(FnsRunner, {run: function() {
    var fns = this.fns;
    var fnIndex = 0;
    var emitter = this;
    var gen = $traceurRuntime.initGeneratorFunction(function $__1() {
      var err;
      return $traceurRuntime.createGeneratorInstance(function($ctx) {
        while (true)
          switch ($ctx.state) {
            case 0:
              if (fnIndex === 0)
                emitter.emit('runnerStarting', fnIndex);
              $ctx.state = 20;
              break;
            case 20:
              $ctx.pushTry(12, null);
              $ctx.state = 15;
              break;
            case 15:
              $ctx.state = (fnIndex < fns.length) ? 1 : 7;
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
              if (fnIndex >= fns.length)
                emitter.emit('runnerComplete', fnIndex);
              $ctx.state = 15;
              break;
            case 7:
              $ctx.popTry();
              $ctx.state = -2;
              break;
            case 12:
              $ctx.popTry();
              err = $ctx.storedException;
              $ctx.state = 8;
              break;
            case 8:
              $ctx.state = 9;
              return Q.reject({
                fnIndex: fnIndex,
                error: err
              });
            case 9:
              $ctx.maybeThrow();
              $ctx.state = -2;
              break;
            default:
              return $ctx.end();
          }
      }, $__1, this);
    });
    return Q.async(gen)();
  }}, {}, EventEmitter);
;
//# sourceURL=src/lib/FnsRunner.js