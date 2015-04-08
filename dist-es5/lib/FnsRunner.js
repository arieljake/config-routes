"use strict";
Object.defineProperties(exports, {
  FnsRunner: {get: function() {
      return FnsRunner;
    }},
  __esModule: {value: true}
});
var __moduleName = "dist-es5/lib/FnsRunner";
var $__q__,
    $__eventemitter3__;
'use strict';
var Q = ($__q__ = require("q"), $__q__ && $__q__.__esModule && $__q__ || {default: $__q__}).default;
var EventEmitter = ($__eventemitter3__ = require("eventemitter3"), $__eventemitter3__ && $__eventemitter3__.__esModule && $__eventemitter3__ || {default: $__eventemitter3__}).default;
var FnsRunner = function FnsRunner(fns) {
  this.fns = fns;
};
($traceurRuntime.createClass)(FnsRunner, {run: function() {
    var fns = this.fns;
    var fnIndex = 0;
    var emitter = this;
    var gen = $traceurRuntime.initGeneratorFunction(function $__3() {
      var err;
      return $traceurRuntime.createGeneratorInstance(function($ctx) {
        while (true)
          switch ($ctx.state) {
            case 0:
              $ctx.pushTry(18, null);
              $ctx.state = 21;
              break;
            case 21:
              emitter.emit('runnerStarting');
              $ctx.state = 9;
              break;
            case 9:
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
              $ctx.state = 9;
              break;
            case 7:
              emitter.emit('runnerComplete');
              $ctx.state = 11;
              break;
            case 11:
              $ctx.popTry();
              $ctx.state = -2;
              break;
            case 18:
              $ctx.popTry();
              err = $ctx.storedException;
              $ctx.state = 16;
              break;
            case 16:
              emitter.emit('fnError', fnIndex, err);
              $ctx.state = 17;
              break;
            case 17:
              $ctx.state = 13;
              return Q.reject({
                fnIndex: fnIndex,
                error: err.message || err
              });
            case 13:
              $ctx.maybeThrow();
              $ctx.state = -2;
              break;
            default:
              return $ctx.end();
          }
      }, $__3, this);
    });
    return Q.async(gen)();
  }}, {}, EventEmitter);
;
//# sourceURL=src/lib/FnsRunner.js