define("config-routes/lib/FnsRunner", ["q", "eventemitter3"], function($__0,$__2) {
  "use strict";
  var __moduleName = "config-routes/lib/FnsRunner";
  if (!$__0 || !$__0.__esModule)
    $__0 = {default: $__0};
  if (!$__2 || !$__2.__esModule)
    $__2 = {default: $__2};
  'use strict';
  var Q = $__0.default;
  var EventEmitter = $__2.default;
  var FnsRunner = function FnsRunner(fns) {
    $traceurRuntime.superConstructor($FnsRunner).call(this);
    this.fns = fns;
  };
  var $FnsRunner = FnsRunner;
  ($traceurRuntime.createClass)(FnsRunner, {run: function() {
      var fns = this.fns;
      var fnIndex = 0;
      var emitter = this;
      var gen = $traceurRuntime.initGeneratorFunction(function $__5() {
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
        }, $__5, this);
      });
      return Q.async(gen)();
    }}, {}, EventEmitter);
  ;
  return {
    get FnsRunner() {
      return FnsRunner;
    },
    __esModule: true
  };
});
//# sourceURL=src/lib/FnsRunner.js