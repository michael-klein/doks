import React__default, { useEffect } from "react";
import { h as _objectWithoutPropertiesLoose, _ as _extends, j as jsx } from "./main.js";
import { b as _assertThisInitialized, d as _setPrototypeOf } from "./jsx-runtime_commonjs-proxy.js";
import "react-dom";
import "./styled.js";
var runtime = { exports: {} };
(function(module) {
  var runtime2 = function(exports) {
    var Op = Object.prototype;
    var hasOwn = Op.hasOwnProperty;
    var undefined$1;
    var $Symbol = typeof Symbol === "function" ? Symbol : {};
    var iteratorSymbol = $Symbol.iterator || "@@iterator";
    var asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator";
    var toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag";
    function define(obj, key, value) {
      Object.defineProperty(obj, key, {
        value,
        enumerable: true,
        configurable: true,
        writable: true
      });
      return obj[key];
    }
    try {
      define({}, "");
    } catch (err) {
      define = function(obj, key, value) {
        return obj[key] = value;
      };
    }
    function wrap(innerFn, outerFn, self, tryLocsList) {
      var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator;
      var generator = Object.create(protoGenerator.prototype);
      var context = new Context(tryLocsList || []);
      generator._invoke = makeInvokeMethod(innerFn, self, context);
      return generator;
    }
    exports.wrap = wrap;
    function tryCatch(fn, obj, arg) {
      try {
        return { type: "normal", arg: fn.call(obj, arg) };
      } catch (err) {
        return { type: "throw", arg: err };
      }
    }
    var GenStateSuspendedStart = "suspendedStart";
    var GenStateSuspendedYield = "suspendedYield";
    var GenStateExecuting = "executing";
    var GenStateCompleted = "completed";
    var ContinueSentinel = {};
    function Generator() {
    }
    function GeneratorFunction() {
    }
    function GeneratorFunctionPrototype() {
    }
    var IteratorPrototype = {};
    define(IteratorPrototype, iteratorSymbol, function() {
      return this;
    });
    var getProto = Object.getPrototypeOf;
    var NativeIteratorPrototype = getProto && getProto(getProto(values([])));
    if (NativeIteratorPrototype && NativeIteratorPrototype !== Op && hasOwn.call(NativeIteratorPrototype, iteratorSymbol)) {
      IteratorPrototype = NativeIteratorPrototype;
    }
    var Gp = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(IteratorPrototype);
    GeneratorFunction.prototype = GeneratorFunctionPrototype;
    define(Gp, "constructor", GeneratorFunctionPrototype);
    define(GeneratorFunctionPrototype, "constructor", GeneratorFunction);
    GeneratorFunction.displayName = define(GeneratorFunctionPrototype, toStringTagSymbol, "GeneratorFunction");
    function defineIteratorMethods(prototype) {
      ["next", "throw", "return"].forEach(function(method) {
        define(prototype, method, function(arg) {
          return this._invoke(method, arg);
        });
      });
    }
    exports.isGeneratorFunction = function(genFun) {
      var ctor = typeof genFun === "function" && genFun.constructor;
      return ctor ? ctor === GeneratorFunction || (ctor.displayName || ctor.name) === "GeneratorFunction" : false;
    };
    exports.mark = function(genFun) {
      if (Object.setPrototypeOf) {
        Object.setPrototypeOf(genFun, GeneratorFunctionPrototype);
      } else {
        genFun.__proto__ = GeneratorFunctionPrototype;
        define(genFun, toStringTagSymbol, "GeneratorFunction");
      }
      genFun.prototype = Object.create(Gp);
      return genFun;
    };
    exports.awrap = function(arg) {
      return { __await: arg };
    };
    function AsyncIterator(generator, PromiseImpl) {
      function invoke(method, arg, resolve, reject) {
        var record = tryCatch(generator[method], generator, arg);
        if (record.type === "throw") {
          reject(record.arg);
        } else {
          var result = record.arg;
          var value = result.value;
          if (value && typeof value === "object" && hasOwn.call(value, "__await")) {
            return PromiseImpl.resolve(value.__await).then(function(value2) {
              invoke("next", value2, resolve, reject);
            }, function(err) {
              invoke("throw", err, resolve, reject);
            });
          }
          return PromiseImpl.resolve(value).then(function(unwrapped) {
            result.value = unwrapped;
            resolve(result);
          }, function(error) {
            return invoke("throw", error, resolve, reject);
          });
        }
      }
      var previousPromise;
      function enqueue(method, arg) {
        function callInvokeWithMethodAndArg() {
          return new PromiseImpl(function(resolve, reject) {
            invoke(method, arg, resolve, reject);
          });
        }
        return previousPromise = previousPromise ? previousPromise.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg();
      }
      this._invoke = enqueue;
    }
    defineIteratorMethods(AsyncIterator.prototype);
    define(AsyncIterator.prototype, asyncIteratorSymbol, function() {
      return this;
    });
    exports.AsyncIterator = AsyncIterator;
    exports.async = function(innerFn, outerFn, self, tryLocsList, PromiseImpl) {
      if (PromiseImpl === void 0)
        PromiseImpl = Promise;
      var iter = new AsyncIterator(wrap(innerFn, outerFn, self, tryLocsList), PromiseImpl);
      return exports.isGeneratorFunction(outerFn) ? iter : iter.next().then(function(result) {
        return result.done ? result.value : iter.next();
      });
    };
    function makeInvokeMethod(innerFn, self, context) {
      var state = GenStateSuspendedStart;
      return function invoke(method, arg) {
        if (state === GenStateExecuting) {
          throw new Error("Generator is already running");
        }
        if (state === GenStateCompleted) {
          if (method === "throw") {
            throw arg;
          }
          return doneResult();
        }
        context.method = method;
        context.arg = arg;
        while (true) {
          var delegate = context.delegate;
          if (delegate) {
            var delegateResult = maybeInvokeDelegate(delegate, context);
            if (delegateResult) {
              if (delegateResult === ContinueSentinel)
                continue;
              return delegateResult;
            }
          }
          if (context.method === "next") {
            context.sent = context._sent = context.arg;
          } else if (context.method === "throw") {
            if (state === GenStateSuspendedStart) {
              state = GenStateCompleted;
              throw context.arg;
            }
            context.dispatchException(context.arg);
          } else if (context.method === "return") {
            context.abrupt("return", context.arg);
          }
          state = GenStateExecuting;
          var record = tryCatch(innerFn, self, context);
          if (record.type === "normal") {
            state = context.done ? GenStateCompleted : GenStateSuspendedYield;
            if (record.arg === ContinueSentinel) {
              continue;
            }
            return {
              value: record.arg,
              done: context.done
            };
          } else if (record.type === "throw") {
            state = GenStateCompleted;
            context.method = "throw";
            context.arg = record.arg;
          }
        }
      };
    }
    function maybeInvokeDelegate(delegate, context) {
      var method = delegate.iterator[context.method];
      if (method === undefined$1) {
        context.delegate = null;
        if (context.method === "throw") {
          if (delegate.iterator["return"]) {
            context.method = "return";
            context.arg = undefined$1;
            maybeInvokeDelegate(delegate, context);
            if (context.method === "throw") {
              return ContinueSentinel;
            }
          }
          context.method = "throw";
          context.arg = new TypeError("The iterator does not provide a 'throw' method");
        }
        return ContinueSentinel;
      }
      var record = tryCatch(method, delegate.iterator, context.arg);
      if (record.type === "throw") {
        context.method = "throw";
        context.arg = record.arg;
        context.delegate = null;
        return ContinueSentinel;
      }
      var info = record.arg;
      if (!info) {
        context.method = "throw";
        context.arg = new TypeError("iterator result is not an object");
        context.delegate = null;
        return ContinueSentinel;
      }
      if (info.done) {
        context[delegate.resultName] = info.value;
        context.next = delegate.nextLoc;
        if (context.method !== "return") {
          context.method = "next";
          context.arg = undefined$1;
        }
      } else {
        return info;
      }
      context.delegate = null;
      return ContinueSentinel;
    }
    defineIteratorMethods(Gp);
    define(Gp, toStringTagSymbol, "Generator");
    define(Gp, iteratorSymbol, function() {
      return this;
    });
    define(Gp, "toString", function() {
      return "[object Generator]";
    });
    function pushTryEntry(locs) {
      var entry = { tryLoc: locs[0] };
      if (1 in locs) {
        entry.catchLoc = locs[1];
      }
      if (2 in locs) {
        entry.finallyLoc = locs[2];
        entry.afterLoc = locs[3];
      }
      this.tryEntries.push(entry);
    }
    function resetTryEntry(entry) {
      var record = entry.completion || {};
      record.type = "normal";
      delete record.arg;
      entry.completion = record;
    }
    function Context(tryLocsList) {
      this.tryEntries = [{ tryLoc: "root" }];
      tryLocsList.forEach(pushTryEntry, this);
      this.reset(true);
    }
    exports.keys = function(object) {
      var keys = [];
      for (var key in object) {
        keys.push(key);
      }
      keys.reverse();
      return function next() {
        while (keys.length) {
          var key2 = keys.pop();
          if (key2 in object) {
            next.value = key2;
            next.done = false;
            return next;
          }
        }
        next.done = true;
        return next;
      };
    };
    function values(iterable) {
      if (iterable) {
        var iteratorMethod = iterable[iteratorSymbol];
        if (iteratorMethod) {
          return iteratorMethod.call(iterable);
        }
        if (typeof iterable.next === "function") {
          return iterable;
        }
        if (!isNaN(iterable.length)) {
          var i = -1, next = function next2() {
            while (++i < iterable.length) {
              if (hasOwn.call(iterable, i)) {
                next2.value = iterable[i];
                next2.done = false;
                return next2;
              }
            }
            next2.value = undefined$1;
            next2.done = true;
            return next2;
          };
          return next.next = next;
        }
      }
      return { next: doneResult };
    }
    exports.values = values;
    function doneResult() {
      return { value: undefined$1, done: true };
    }
    Context.prototype = {
      constructor: Context,
      reset: function(skipTempReset) {
        this.prev = 0;
        this.next = 0;
        this.sent = this._sent = undefined$1;
        this.done = false;
        this.delegate = null;
        this.method = "next";
        this.arg = undefined$1;
        this.tryEntries.forEach(resetTryEntry);
        if (!skipTempReset) {
          for (var name in this) {
            if (name.charAt(0) === "t" && hasOwn.call(this, name) && !isNaN(+name.slice(1))) {
              this[name] = undefined$1;
            }
          }
        }
      },
      stop: function() {
        this.done = true;
        var rootEntry = this.tryEntries[0];
        var rootRecord = rootEntry.completion;
        if (rootRecord.type === "throw") {
          throw rootRecord.arg;
        }
        return this.rval;
      },
      dispatchException: function(exception) {
        if (this.done) {
          throw exception;
        }
        var context = this;
        function handle(loc, caught) {
          record.type = "throw";
          record.arg = exception;
          context.next = loc;
          if (caught) {
            context.method = "next";
            context.arg = undefined$1;
          }
          return !!caught;
        }
        for (var i = this.tryEntries.length - 1; i >= 0; --i) {
          var entry = this.tryEntries[i];
          var record = entry.completion;
          if (entry.tryLoc === "root") {
            return handle("end");
          }
          if (entry.tryLoc <= this.prev) {
            var hasCatch = hasOwn.call(entry, "catchLoc");
            var hasFinally = hasOwn.call(entry, "finallyLoc");
            if (hasCatch && hasFinally) {
              if (this.prev < entry.catchLoc) {
                return handle(entry.catchLoc, true);
              } else if (this.prev < entry.finallyLoc) {
                return handle(entry.finallyLoc);
              }
            } else if (hasCatch) {
              if (this.prev < entry.catchLoc) {
                return handle(entry.catchLoc, true);
              }
            } else if (hasFinally) {
              if (this.prev < entry.finallyLoc) {
                return handle(entry.finallyLoc);
              }
            } else {
              throw new Error("try statement without catch or finally");
            }
          }
        }
      },
      abrupt: function(type, arg) {
        for (var i = this.tryEntries.length - 1; i >= 0; --i) {
          var entry = this.tryEntries[i];
          if (entry.tryLoc <= this.prev && hasOwn.call(entry, "finallyLoc") && this.prev < entry.finallyLoc) {
            var finallyEntry = entry;
            break;
          }
        }
        if (finallyEntry && (type === "break" || type === "continue") && finallyEntry.tryLoc <= arg && arg <= finallyEntry.finallyLoc) {
          finallyEntry = null;
        }
        var record = finallyEntry ? finallyEntry.completion : {};
        record.type = type;
        record.arg = arg;
        if (finallyEntry) {
          this.method = "next";
          this.next = finallyEntry.finallyLoc;
          return ContinueSentinel;
        }
        return this.complete(record);
      },
      complete: function(record, afterLoc) {
        if (record.type === "throw") {
          throw record.arg;
        }
        if (record.type === "break" || record.type === "continue") {
          this.next = record.arg;
        } else if (record.type === "return") {
          this.rval = this.arg = record.arg;
          this.method = "return";
          this.next = "end";
        } else if (record.type === "normal" && afterLoc) {
          this.next = afterLoc;
        }
        return ContinueSentinel;
      },
      finish: function(finallyLoc) {
        for (var i = this.tryEntries.length - 1; i >= 0; --i) {
          var entry = this.tryEntries[i];
          if (entry.finallyLoc === finallyLoc) {
            this.complete(entry.completion, entry.afterLoc);
            resetTryEntry(entry);
            return ContinueSentinel;
          }
        }
      },
      "catch": function(tryLoc) {
        for (var i = this.tryEntries.length - 1; i >= 0; --i) {
          var entry = this.tryEntries[i];
          if (entry.tryLoc === tryLoc) {
            var record = entry.completion;
            if (record.type === "throw") {
              var thrown = record.arg;
              resetTryEntry(entry);
            }
            return thrown;
          }
        }
        throw new Error("illegal catch attempt");
      },
      delegateYield: function(iterable, resultName, nextLoc) {
        this.delegate = {
          iterator: values(iterable),
          resultName,
          nextLoc
        };
        if (this.method === "next") {
          this.arg = undefined$1;
        }
        return ContinueSentinel;
      }
    };
    return exports;
  }(module.exports);
  try {
    regeneratorRuntime = runtime2;
  } catch (accidentalStrictMode) {
    if (typeof globalThis === "object") {
      globalThis.regeneratorRuntime = runtime2;
    } else {
      Function("r", "regeneratorRuntime = r")(runtime2);
    }
  }
})(runtime);
var regenerator = runtime.exports;
var _regeneratorRuntime = regenerator;
function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) {
  try {
    var info = gen[key](arg);
    var value = info.value;
  } catch (error) {
    reject(error);
    return;
  }
  if (info.done) {
    resolve(value);
  } else {
    Promise.resolve(value).then(_next, _throw);
  }
}
function _asyncToGenerator(fn) {
  return function() {
    var self = this, args = arguments;
    return new Promise(function(resolve, reject) {
      var gen = fn.apply(self, args);
      function _next(value) {
        asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value);
      }
      function _throw(err) {
        asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err);
      }
      _next(void 0);
    });
  };
}
function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}
function _defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor)
      descriptor.writable = true;
    Object.defineProperty(target, descriptor.key, descriptor);
  }
}
function _createClass(Constructor, protoProps, staticProps) {
  if (protoProps)
    _defineProperties(Constructor.prototype, protoProps);
  if (staticProps)
    _defineProperties(Constructor, staticProps);
  return Constructor;
}
function _typeof(obj) {
  "@babel/helpers - typeof";
  if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
    _typeof = function _typeof2(obj2) {
      return typeof obj2;
    };
  } else {
    _typeof = function _typeof2(obj2) {
      return obj2 && typeof Symbol === "function" && obj2.constructor === Symbol && obj2 !== Symbol.prototype ? "symbol" : typeof obj2;
    };
  }
  return _typeof(obj);
}
function _possibleConstructorReturn(self, call) {
  if (call && (_typeof(call) === "object" || typeof call === "function")) {
    return call;
  } else if (call !== void 0) {
    throw new TypeError("Derived constructors may only return object or undefined");
  }
  return _assertThisInitialized(self);
}
function _getPrototypeOf(o) {
  _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf2(o2) {
    return o2.__proto__ || Object.getPrototypeOf(o2);
  };
  return _getPrototypeOf(o);
}
function _inherits(subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function");
  }
  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      writable: true,
      configurable: true
    }
  });
  if (superClass)
    _setPrototypeOf(subClass, superClass);
}
function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }
  return obj;
}
function _objectWithoutProperties(source, excluded) {
  if (source == null)
    return {};
  var target = _objectWithoutPropertiesLoose(source, excluded);
  var key, i;
  if (Object.getOwnPropertySymbols) {
    var sourceSymbolKeys = Object.getOwnPropertySymbols(source);
    for (i = 0; i < sourceSymbolKeys.length; i++) {
      key = sourceSymbolKeys[i];
      if (excluded.indexOf(key) >= 0)
        continue;
      if (!Object.prototype.propertyIsEnumerable.call(source, key))
        continue;
      target[key] = source[key];
    }
  }
  return target;
}
function _arrayLikeToArray(arr, len) {
  if (len == null || len > arr.length)
    len = arr.length;
  for (var i = 0, arr2 = new Array(len); i < len; i++) {
    arr2[i] = arr[i];
  }
  return arr2;
}
function _arrayWithoutHoles(arr) {
  if (Array.isArray(arr))
    return _arrayLikeToArray(arr);
}
function _iterableToArray(iter) {
  if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null)
    return Array.from(iter);
}
function _unsupportedIterableToArray(o, minLen) {
  if (!o)
    return;
  if (typeof o === "string")
    return _arrayLikeToArray(o, minLen);
  var n = Object.prototype.toString.call(o).slice(8, -1);
  if (n === "Object" && o.constructor)
    n = o.constructor.name;
  if (n === "Map" || n === "Set")
    return Array.from(o);
  if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))
    return _arrayLikeToArray(o, minLen);
}
function _nonIterableSpread() {
  throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function _toConsumableArray(arr) {
  return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread();
}
function _objectSpread(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i] != null ? Object(arguments[i]) : {};
    var ownKeys = Object.keys(source);
    if (typeof Object.getOwnPropertySymbols === "function") {
      ownKeys.push.apply(ownKeys, Object.getOwnPropertySymbols(source).filter(function(sym) {
        return Object.getOwnPropertyDescriptor(source, sym).enumerable;
      }));
    }
    ownKeys.forEach(function(key) {
      _defineProperty(target, key, source[key]);
    });
  }
  return target;
}
function powerSetPermutations(arr) {
  var arrLength = arr.length;
  if (arrLength === 0 || arrLength === 1)
    return arr;
  if (arrLength === 2) {
    return [arr[0], arr[1], "".concat(arr[0], ".").concat(arr[1]), "".concat(arr[1], ".").concat(arr[0])];
  }
  if (arrLength === 3) {
    return [arr[0], arr[1], arr[2], "".concat(arr[0], ".").concat(arr[1]), "".concat(arr[0], ".").concat(arr[2]), "".concat(arr[1], ".").concat(arr[0]), "".concat(arr[1], ".").concat(arr[2]), "".concat(arr[2], ".").concat(arr[0]), "".concat(arr[2], ".").concat(arr[1]), "".concat(arr[0], ".").concat(arr[1], ".").concat(arr[2]), "".concat(arr[0], ".").concat(arr[2], ".").concat(arr[1]), "".concat(arr[1], ".").concat(arr[0], ".").concat(arr[2]), "".concat(arr[1], ".").concat(arr[2], ".").concat(arr[0]), "".concat(arr[2], ".").concat(arr[0], ".").concat(arr[1]), "".concat(arr[2], ".").concat(arr[1], ".").concat(arr[0])];
  }
  if (arrLength >= 4) {
    return [arr[0], arr[1], arr[2], arr[3], "".concat(arr[0], ".").concat(arr[1]), "".concat(arr[0], ".").concat(arr[2]), "".concat(arr[0], ".").concat(arr[3]), "".concat(arr[1], ".").concat(arr[0]), "".concat(arr[1], ".").concat(arr[2]), "".concat(arr[1], ".").concat(arr[3]), "".concat(arr[2], ".").concat(arr[0]), "".concat(arr[2], ".").concat(arr[1]), "".concat(arr[2], ".").concat(arr[3]), "".concat(arr[3], ".").concat(arr[0]), "".concat(arr[3], ".").concat(arr[1]), "".concat(arr[3], ".").concat(arr[2]), "".concat(arr[0], ".").concat(arr[1], ".").concat(arr[2]), "".concat(arr[0], ".").concat(arr[1], ".").concat(arr[3]), "".concat(arr[0], ".").concat(arr[2], ".").concat(arr[1]), "".concat(arr[0], ".").concat(arr[2], ".").concat(arr[3]), "".concat(arr[0], ".").concat(arr[3], ".").concat(arr[1]), "".concat(arr[0], ".").concat(arr[3], ".").concat(arr[2]), "".concat(arr[1], ".").concat(arr[0], ".").concat(arr[2]), "".concat(arr[1], ".").concat(arr[0], ".").concat(arr[3]), "".concat(arr[1], ".").concat(arr[2], ".").concat(arr[0]), "".concat(arr[1], ".").concat(arr[2], ".").concat(arr[3]), "".concat(arr[1], ".").concat(arr[3], ".").concat(arr[0]), "".concat(arr[1], ".").concat(arr[3], ".").concat(arr[2]), "".concat(arr[2], ".").concat(arr[0], ".").concat(arr[1]), "".concat(arr[2], ".").concat(arr[0], ".").concat(arr[3]), "".concat(arr[2], ".").concat(arr[1], ".").concat(arr[0]), "".concat(arr[2], ".").concat(arr[1], ".").concat(arr[3]), "".concat(arr[2], ".").concat(arr[3], ".").concat(arr[0]), "".concat(arr[2], ".").concat(arr[3], ".").concat(arr[1]), "".concat(arr[3], ".").concat(arr[0], ".").concat(arr[1]), "".concat(arr[3], ".").concat(arr[0], ".").concat(arr[2]), "".concat(arr[3], ".").concat(arr[1], ".").concat(arr[0]), "".concat(arr[3], ".").concat(arr[1], ".").concat(arr[2]), "".concat(arr[3], ".").concat(arr[2], ".").concat(arr[0]), "".concat(arr[3], ".").concat(arr[2], ".").concat(arr[1]), "".concat(arr[0], ".").concat(arr[1], ".").concat(arr[2], ".").concat(arr[3]), "".concat(arr[0], ".").concat(arr[1], ".").concat(arr[3], ".").concat(arr[2]), "".concat(arr[0], ".").concat(arr[2], ".").concat(arr[1], ".").concat(arr[3]), "".concat(arr[0], ".").concat(arr[2], ".").concat(arr[3], ".").concat(arr[1]), "".concat(arr[0], ".").concat(arr[3], ".").concat(arr[1], ".").concat(arr[2]), "".concat(arr[0], ".").concat(arr[3], ".").concat(arr[2], ".").concat(arr[1]), "".concat(arr[1], ".").concat(arr[0], ".").concat(arr[2], ".").concat(arr[3]), "".concat(arr[1], ".").concat(arr[0], ".").concat(arr[3], ".").concat(arr[2]), "".concat(arr[1], ".").concat(arr[2], ".").concat(arr[0], ".").concat(arr[3]), "".concat(arr[1], ".").concat(arr[2], ".").concat(arr[3], ".").concat(arr[0]), "".concat(arr[1], ".").concat(arr[3], ".").concat(arr[0], ".").concat(arr[2]), "".concat(arr[1], ".").concat(arr[3], ".").concat(arr[2], ".").concat(arr[0]), "".concat(arr[2], ".").concat(arr[0], ".").concat(arr[1], ".").concat(arr[3]), "".concat(arr[2], ".").concat(arr[0], ".").concat(arr[3], ".").concat(arr[1]), "".concat(arr[2], ".").concat(arr[1], ".").concat(arr[0], ".").concat(arr[3]), "".concat(arr[2], ".").concat(arr[1], ".").concat(arr[3], ".").concat(arr[0]), "".concat(arr[2], ".").concat(arr[3], ".").concat(arr[0], ".").concat(arr[1]), "".concat(arr[2], ".").concat(arr[3], ".").concat(arr[1], ".").concat(arr[0]), "".concat(arr[3], ".").concat(arr[0], ".").concat(arr[1], ".").concat(arr[2]), "".concat(arr[3], ".").concat(arr[0], ".").concat(arr[2], ".").concat(arr[1]), "".concat(arr[3], ".").concat(arr[1], ".").concat(arr[0], ".").concat(arr[2]), "".concat(arr[3], ".").concat(arr[1], ".").concat(arr[2], ".").concat(arr[0]), "".concat(arr[3], ".").concat(arr[2], ".").concat(arr[0], ".").concat(arr[1]), "".concat(arr[3], ".").concat(arr[2], ".").concat(arr[1], ".").concat(arr[0])];
  }
}
var classNameCombinations = {};
function getClassNameCombinations(classNames) {
  if (classNames.length === 0 || classNames.length === 1)
    return classNames;
  var key = classNames.join(".");
  if (!classNameCombinations[key]) {
    classNameCombinations[key] = powerSetPermutations(classNames);
  }
  return classNameCombinations[key];
}
function createStyleObject(classNames) {
  var elementStyle = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
  var stylesheet = arguments.length > 2 ? arguments[2] : void 0;
  var nonTokenClassNames = classNames.filter(function(className) {
    return className !== "token";
  });
  var classNamesCombinations = getClassNameCombinations(nonTokenClassNames);
  return classNamesCombinations.reduce(function(styleObject, className) {
    return _objectSpread({}, styleObject, stylesheet[className]);
  }, elementStyle);
}
function createClassNameString(classNames) {
  return classNames.join(" ");
}
function createChildren(stylesheet, useInlineStyles) {
  var childrenCount = 0;
  return function(children) {
    childrenCount += 1;
    return children.map(function(child, i) {
      return createElement({
        node: child,
        stylesheet,
        useInlineStyles,
        key: "code-segment-".concat(childrenCount, "-").concat(i)
      });
    });
  };
}
function createElement(_ref) {
  var node = _ref.node, stylesheet = _ref.stylesheet, _ref$style = _ref.style, style = _ref$style === void 0 ? {} : _ref$style, useInlineStyles = _ref.useInlineStyles, key = _ref.key;
  var properties = node.properties, type = node.type, TagName = node.tagName, value = node.value;
  if (type === "text") {
    return value;
  } else if (TagName) {
    var childrenCreator = createChildren(stylesheet, useInlineStyles);
    var props;
    if (!useInlineStyles) {
      props = _objectSpread({}, properties, {
        className: createClassNameString(properties.className)
      });
    } else {
      var allStylesheetSelectors = Object.keys(stylesheet).reduce(function(classes, selector) {
        selector.split(".").forEach(function(className2) {
          if (!classes.includes(className2))
            classes.push(className2);
        });
        return classes;
      }, []);
      var startingClassName = properties.className && properties.className.includes("token") ? ["token"] : [];
      var className = properties.className && startingClassName.concat(properties.className.filter(function(className2) {
        return !allStylesheetSelectors.includes(className2);
      }));
      props = _objectSpread({}, properties, {
        className: createClassNameString(className) || void 0,
        style: createStyleObject(properties.className, Object.assign({}, properties.style, style), stylesheet)
      });
    }
    var children = childrenCreator(node.children);
    return React__default.createElement(TagName, _extends({
      key
    }, props), children);
  }
}
var checkForListedLanguage = function(astGenerator, language) {
  var langs = astGenerator.listLanguages();
  return langs.indexOf(language) !== -1;
};
var newLineRegex = /\n/g;
function getNewLines(str) {
  return str.match(newLineRegex);
}
function getAllLineNumbers(_ref) {
  var lines = _ref.lines, startingLineNumber = _ref.startingLineNumber, style = _ref.style;
  return lines.map(function(_, i) {
    var number = i + startingLineNumber;
    return React__default.createElement("span", {
      key: "line-".concat(i),
      className: "react-syntax-highlighter-line-number",
      style: typeof style === "function" ? style(number) : style
    }, "".concat(number, "\n"));
  });
}
function AllLineNumbers(_ref2) {
  var codeString = _ref2.codeString, codeStyle = _ref2.codeStyle, _ref2$containerStyle = _ref2.containerStyle, containerStyle = _ref2$containerStyle === void 0 ? {
    float: "left",
    paddingRight: "10px"
  } : _ref2$containerStyle, _ref2$numberStyle = _ref2.numberStyle, numberStyle = _ref2$numberStyle === void 0 ? {} : _ref2$numberStyle, startingLineNumber = _ref2.startingLineNumber;
  return React__default.createElement("code", {
    style: Object.assign({}, codeStyle, containerStyle)
  }, getAllLineNumbers({
    lines: codeString.replace(/\n$/, "").split("\n"),
    style: numberStyle,
    startingLineNumber
  }));
}
function getEmWidthOfNumber(num) {
  return "".concat(num.toString().length, ".25em");
}
function getInlineLineNumber(lineNumber, inlineLineNumberStyle) {
  return {
    type: "element",
    tagName: "span",
    properties: {
      key: "line-number--".concat(lineNumber),
      className: ["comment", "linenumber", "react-syntax-highlighter-line-number"],
      style: inlineLineNumberStyle
    },
    children: [{
      type: "text",
      value: lineNumber
    }]
  };
}
function assembleLineNumberStyles(lineNumberStyle, lineNumber, largestLineNumber) {
  var defaultLineNumberStyle = {
    display: "inline-block",
    minWidth: getEmWidthOfNumber(largestLineNumber),
    paddingRight: "1em",
    textAlign: "right",
    userSelect: "none"
  };
  var customLineNumberStyle = typeof lineNumberStyle === "function" ? lineNumberStyle(lineNumber) : lineNumberStyle;
  var assembledStyle = _objectSpread({}, defaultLineNumberStyle, customLineNumberStyle);
  return assembledStyle;
}
function createLineElement(_ref3) {
  var children = _ref3.children, lineNumber = _ref3.lineNumber, lineNumberStyle = _ref3.lineNumberStyle, largestLineNumber = _ref3.largestLineNumber, showInlineLineNumbers = _ref3.showInlineLineNumbers, _ref3$lineProps = _ref3.lineProps, lineProps = _ref3$lineProps === void 0 ? {} : _ref3$lineProps, _ref3$className = _ref3.className, className = _ref3$className === void 0 ? [] : _ref3$className, showLineNumbers = _ref3.showLineNumbers, wrapLongLines = _ref3.wrapLongLines;
  var properties = typeof lineProps === "function" ? lineProps(lineNumber) : lineProps;
  properties["className"] = className;
  if (lineNumber && showInlineLineNumbers) {
    var inlineLineNumberStyle = assembleLineNumberStyles(lineNumberStyle, lineNumber, largestLineNumber);
    children.unshift(getInlineLineNumber(lineNumber, inlineLineNumberStyle));
  }
  if (wrapLongLines & showLineNumbers) {
    properties.style = _objectSpread({}, properties.style, {
      display: "flex"
    });
  }
  return {
    type: "element",
    tagName: "span",
    properties,
    children
  };
}
function flattenCodeTree(tree) {
  var className = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : [];
  var newTree = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : [];
  for (var i = 0; i < tree.length; i++) {
    var node = tree[i];
    if (node.type === "text") {
      newTree.push(createLineElement({
        children: [node],
        className: _toConsumableArray(new Set(className))
      }));
    } else if (node.children) {
      var classNames = className.concat(node.properties.className);
      newTree = newTree.concat(flattenCodeTree(node.children, classNames));
    }
  }
  return newTree;
}
function processLines(codeTree, wrapLines, lineProps, showLineNumbers, showInlineLineNumbers, startingLineNumber, largestLineNumber, lineNumberStyle, wrapLongLines) {
  var _ref4;
  var tree = flattenCodeTree(codeTree.value);
  var newTree = [];
  var lastLineBreakIndex = -1;
  var index = 0;
  function createWrappedLine(children2, lineNumber2) {
    var className = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : [];
    return createLineElement({
      children: children2,
      lineNumber: lineNumber2,
      lineNumberStyle,
      largestLineNumber,
      showInlineLineNumbers,
      lineProps,
      className,
      showLineNumbers,
      wrapLongLines
    });
  }
  function createUnwrappedLine(children2, lineNumber2) {
    if (showLineNumbers && lineNumber2 && showInlineLineNumbers) {
      var inlineLineNumberStyle = assembleLineNumberStyles(lineNumberStyle, lineNumber2, largestLineNumber);
      children2.unshift(getInlineLineNumber(lineNumber2, inlineLineNumberStyle));
    }
    return children2;
  }
  function createLine(children2, lineNumber2) {
    var className = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : [];
    return wrapLines || className.length > 0 ? createWrappedLine(children2, lineNumber2, className) : createUnwrappedLine(children2, lineNumber2);
  }
  var _loop = function _loop2() {
    var node = tree[index];
    var value = node.children[0].value;
    var newLines = getNewLines(value);
    if (newLines) {
      var splitValue = value.split("\n");
      splitValue.forEach(function(text, i) {
        var lineNumber2 = showLineNumbers && newTree.length + startingLineNumber;
        var newChild = {
          type: "text",
          value: "".concat(text, "\n")
        };
        if (i === 0) {
          var _children = tree.slice(lastLineBreakIndex + 1, index).concat(createLineElement({
            children: [newChild],
            className: node.properties.className
          }));
          var _line = createLine(_children, lineNumber2);
          newTree.push(_line);
        } else if (i === splitValue.length - 1) {
          var stringChild = tree[index + 1] && tree[index + 1].children && tree[index + 1].children[0];
          if (stringChild) {
            var lastLineInPreviousSpan = {
              type: "text",
              value: "".concat(text)
            };
            var newElem = createLineElement({
              children: [lastLineInPreviousSpan],
              className: node.properties.className
            });
            tree.splice(index + 1, 0, newElem);
          } else {
            var _children2 = [newChild];
            var _line2 = createLine(_children2, lineNumber2, node.properties.className);
            newTree.push(_line2);
          }
        } else {
          var _children3 = [newChild];
          var _line3 = createLine(_children3, lineNumber2, node.properties.className);
          newTree.push(_line3);
        }
      });
      lastLineBreakIndex = index;
    }
    index++;
  };
  while (index < tree.length) {
    _loop();
  }
  if (lastLineBreakIndex !== tree.length - 1) {
    var children = tree.slice(lastLineBreakIndex + 1, tree.length);
    if (children && children.length) {
      var lineNumber = showLineNumbers && newTree.length + startingLineNumber;
      var line = createLine(children, lineNumber);
      newTree.push(line);
    }
  }
  return wrapLines ? newTree : (_ref4 = []).concat.apply(_ref4, newTree);
}
function defaultRenderer(_ref5) {
  var rows = _ref5.rows, stylesheet = _ref5.stylesheet, useInlineStyles = _ref5.useInlineStyles;
  return rows.map(function(node, i) {
    return createElement({
      node,
      stylesheet,
      useInlineStyles,
      key: "code-segement".concat(i)
    });
  });
}
function isHighlightJs(astGenerator) {
  return astGenerator && typeof astGenerator.highlightAuto !== "undefined";
}
function getCodeTree(_ref6) {
  var astGenerator = _ref6.astGenerator, language = _ref6.language, code = _ref6.code, defaultCodeValue = _ref6.defaultCodeValue;
  if (isHighlightJs(astGenerator)) {
    var hasLanguage = checkForListedLanguage(astGenerator, language);
    if (language === "text") {
      return {
        value: defaultCodeValue,
        language: "text"
      };
    } else if (hasLanguage) {
      return astGenerator.highlight(language, code);
    } else {
      return astGenerator.highlightAuto(code);
    }
  }
  try {
    return language && language !== "text" ? {
      value: astGenerator.highlight(code, language)
    } : {
      value: defaultCodeValue
    };
  } catch (e) {
    return {
      value: defaultCodeValue
    };
  }
}
function highlight(defaultAstGenerator, defaultStyle) {
  return function SyntaxHighlighter2(_ref7) {
    var language = _ref7.language, children = _ref7.children, _ref7$style = _ref7.style, style = _ref7$style === void 0 ? defaultStyle : _ref7$style, _ref7$customStyle = _ref7.customStyle, customStyle = _ref7$customStyle === void 0 ? {} : _ref7$customStyle, _ref7$codeTagProps = _ref7.codeTagProps, codeTagProps = _ref7$codeTagProps === void 0 ? {
      className: language ? "language-".concat(language) : void 0,
      style: _objectSpread({}, style['code[class*="language-"]'], style['code[class*="language-'.concat(language, '"]')])
    } : _ref7$codeTagProps, _ref7$useInlineStyles = _ref7.useInlineStyles, useInlineStyles = _ref7$useInlineStyles === void 0 ? true : _ref7$useInlineStyles, _ref7$showLineNumbers = _ref7.showLineNumbers, showLineNumbers = _ref7$showLineNumbers === void 0 ? false : _ref7$showLineNumbers, _ref7$showInlineLineN = _ref7.showInlineLineNumbers, showInlineLineNumbers = _ref7$showInlineLineN === void 0 ? true : _ref7$showInlineLineN, _ref7$startingLineNum = _ref7.startingLineNumber, startingLineNumber = _ref7$startingLineNum === void 0 ? 1 : _ref7$startingLineNum, lineNumberContainerStyle = _ref7.lineNumberContainerStyle, _ref7$lineNumberStyle = _ref7.lineNumberStyle, lineNumberStyle = _ref7$lineNumberStyle === void 0 ? {} : _ref7$lineNumberStyle, wrapLines = _ref7.wrapLines, _ref7$wrapLongLines = _ref7.wrapLongLines, wrapLongLines = _ref7$wrapLongLines === void 0 ? false : _ref7$wrapLongLines, _ref7$lineProps = _ref7.lineProps, lineProps = _ref7$lineProps === void 0 ? {} : _ref7$lineProps, renderer = _ref7.renderer, _ref7$PreTag = _ref7.PreTag, PreTag = _ref7$PreTag === void 0 ? "pre" : _ref7$PreTag, _ref7$CodeTag = _ref7.CodeTag, CodeTag = _ref7$CodeTag === void 0 ? "code" : _ref7$CodeTag, _ref7$code = _ref7.code, code = _ref7$code === void 0 ? Array.isArray(children) ? children[0] : children : _ref7$code, astGenerator = _ref7.astGenerator, rest = _objectWithoutProperties(_ref7, ["language", "children", "style", "customStyle", "codeTagProps", "useInlineStyles", "showLineNumbers", "showInlineLineNumbers", "startingLineNumber", "lineNumberContainerStyle", "lineNumberStyle", "wrapLines", "wrapLongLines", "lineProps", "renderer", "PreTag", "CodeTag", "code", "astGenerator"]);
    astGenerator = astGenerator || defaultAstGenerator;
    var allLineNumbers = showLineNumbers ? React__default.createElement(AllLineNumbers, {
      containerStyle: lineNumberContainerStyle,
      codeStyle: codeTagProps.style || {},
      numberStyle: lineNumberStyle,
      startingLineNumber,
      codeString: code
    }) : null;
    var defaultPreStyle = style.hljs || style['pre[class*="language-"]'] || {
      backgroundColor: "#fff"
    };
    var generatorClassName = isHighlightJs(astGenerator) ? "hljs" : "prismjs";
    var preProps = useInlineStyles ? Object.assign({}, rest, {
      style: Object.assign({}, defaultPreStyle, customStyle)
    }) : Object.assign({}, rest, {
      className: rest.className ? "".concat(generatorClassName, " ").concat(rest.className) : generatorClassName,
      style: Object.assign({}, customStyle)
    });
    if (!astGenerator) {
      return React__default.createElement(PreTag, preProps, allLineNumbers, React__default.createElement(CodeTag, codeTagProps, code));
    }
    if (wrapLines === void 0 && renderer || wrapLongLines)
      wrapLines = true;
    renderer = renderer || defaultRenderer;
    var defaultCodeValue = [{
      type: "text",
      value: code
    }];
    var codeTree = getCodeTree({
      astGenerator,
      language,
      code,
      defaultCodeValue
    });
    if (codeTree.language === null) {
      codeTree.value = defaultCodeValue;
    }
    var largestLineNumber = codeTree.value.length + startingLineNumber;
    var rows = processLines(codeTree, wrapLines, lineProps, showLineNumbers, showInlineLineNumbers, startingLineNumber, largestLineNumber, lineNumberStyle, wrapLongLines);
    if (wrapLongLines) {
      codeTagProps.style = _objectSpread({}, codeTagProps.style, {
        whiteSpace: "pre-wrap"
      });
    } else {
      codeTagProps.style = _objectSpread({}, codeTagProps.style, {
        whiteSpace: "pre"
      });
    }
    return React__default.createElement(PreTag, preProps, React__default.createElement(CodeTag, codeTagProps, !showInlineLineNumbers && allLineNumbers, renderer({
      rows,
      stylesheet: style,
      useInlineStyles
    })));
  };
}
var createAsyncLoadingHighlighter = function(options) {
  var loader2 = options.loader, isLanguageRegistered2 = options.isLanguageRegistered, registerLanguage2 = options.registerLanguage, languageLoaders2 = options.languageLoaders, noAsyncLoadingLanguages = options.noAsyncLoadingLanguages;
  var ReactAsyncHighlighter = /* @__PURE__ */ function(_React$PureComponent) {
    _inherits(ReactAsyncHighlighter2, _React$PureComponent);
    function ReactAsyncHighlighter2() {
      _classCallCheck(this, ReactAsyncHighlighter2);
      return _possibleConstructorReturn(this, _getPrototypeOf(ReactAsyncHighlighter2).apply(this, arguments));
    }
    _createClass(ReactAsyncHighlighter2, [{
      key: "componentDidUpdate",
      value: function componentDidUpdate() {
        if (!ReactAsyncHighlighter2.isRegistered(this.props.language) && languageLoaders2) {
          this.loadLanguage();
        }
      }
    }, {
      key: "componentDidMount",
      value: function componentDidMount() {
        var _this = this;
        if (!ReactAsyncHighlighter2.astGeneratorPromise) {
          ReactAsyncHighlighter2.loadAstGenerator();
        }
        if (!ReactAsyncHighlighter2.astGenerator) {
          ReactAsyncHighlighter2.astGeneratorPromise.then(function() {
            _this.forceUpdate();
          });
        }
        if (!ReactAsyncHighlighter2.isRegistered(this.props.language) && languageLoaders2) {
          this.loadLanguage();
        }
      }
    }, {
      key: "loadLanguage",
      value: function loadLanguage() {
        var _this2 = this;
        var language = this.props.language;
        if (language === "text") {
          return;
        }
        ReactAsyncHighlighter2.loadLanguage(language).then(function() {
          return _this2.forceUpdate();
        }).catch(function() {
        });
      }
    }, {
      key: "normalizeLanguage",
      value: function normalizeLanguage(language) {
        return ReactAsyncHighlighter2.isSupportedLanguage(language) ? language : "text";
      }
    }, {
      key: "render",
      value: function render() {
        return React__default.createElement(ReactAsyncHighlighter2.highlightInstance, _extends({}, this.props, {
          language: this.normalizeLanguage(this.props.language),
          astGenerator: ReactAsyncHighlighter2.astGenerator
        }));
      }
    }], [{
      key: "preload",
      value: function preload() {
        return ReactAsyncHighlighter2.loadAstGenerator();
      }
    }, {
      key: "loadLanguage",
      value: function() {
        var _loadLanguage = _asyncToGenerator(/* @__PURE__ */ _regeneratorRuntime.mark(function _callee(language) {
          var languageLoader;
          return _regeneratorRuntime.wrap(function _callee$(_context) {
            while (1) {
              switch (_context.prev = _context.next) {
                case 0:
                  languageLoader = languageLoaders2[language];
                  if (!(typeof languageLoader === "function")) {
                    _context.next = 5;
                    break;
                  }
                  return _context.abrupt("return", languageLoader(ReactAsyncHighlighter2.registerLanguage));
                case 5:
                  throw new Error("Language ".concat(language, " not supported"));
                case 6:
                case "end":
                  return _context.stop();
              }
            }
          }, _callee, this);
        }));
        return function loadLanguage(_x) {
          return _loadLanguage.apply(this, arguments);
        };
      }()
    }, {
      key: "isSupportedLanguage",
      value: function isSupportedLanguage(language) {
        return ReactAsyncHighlighter2.isRegistered(language) || typeof languageLoaders2[language] === "function";
      }
    }, {
      key: "loadAstGenerator",
      value: function loadAstGenerator() {
        ReactAsyncHighlighter2.astGeneratorPromise = loader2().then(function(astGenerator) {
          ReactAsyncHighlighter2.astGenerator = astGenerator;
          if (registerLanguage2) {
            ReactAsyncHighlighter2.languages.forEach(function(language, name) {
              return registerLanguage2(astGenerator, name, language);
            });
          }
        });
        return ReactAsyncHighlighter2.astGeneratorPromise;
      }
    }]);
    return ReactAsyncHighlighter2;
  }(React__default.PureComponent);
  _defineProperty(ReactAsyncHighlighter, "astGenerator", null);
  _defineProperty(ReactAsyncHighlighter, "highlightInstance", highlight(null, {}));
  _defineProperty(ReactAsyncHighlighter, "astGeneratorPromise", null);
  _defineProperty(ReactAsyncHighlighter, "languages", new Map());
  _defineProperty(ReactAsyncHighlighter, "supportedLanguages", options.supportedLanguages || Object.keys(languageLoaders2 || {}));
  _defineProperty(ReactAsyncHighlighter, "isRegistered", function(language) {
    if (noAsyncLoadingLanguages) {
      return true;
    }
    if (!registerLanguage2) {
      throw new Error("Current syntax highlighter doesn't support registration of languages");
    }
    if (!ReactAsyncHighlighter.astGenerator) {
      return ReactAsyncHighlighter.languages.has(language);
    }
    return isLanguageRegistered2(ReactAsyncHighlighter.astGenerator, language);
  });
  _defineProperty(ReactAsyncHighlighter, "registerLanguage", function(name, language) {
    if (!registerLanguage2) {
      throw new Error("Current syntax highlighter doesn't support registration of languages");
    }
    if (ReactAsyncHighlighter.astGenerator) {
      return registerLanguage2(ReactAsyncHighlighter.astGenerator, name, language);
    } else {
      ReactAsyncHighlighter.languages.set(name, language);
    }
  });
  return ReactAsyncHighlighter;
};
var createLanguageAsyncLoader = function(name, loader2) {
  return /* @__PURE__ */ function() {
    var _ref = _asyncToGenerator(/* @__PURE__ */ _regeneratorRuntime.mark(function _callee(registerLanguage2) {
      var module;
      return _regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.next = 2;
              return loader2();
            case 2:
              module = _context.sent;
              registerLanguage2(name, module.default || module);
            case 4:
            case "end":
              return _context.stop();
          }
        }
      }, _callee, this);
    }));
    return function(_x) {
      return _ref.apply(this, arguments);
    };
  }();
};
var languageLoaders = {
  oneC: createLanguageAsyncLoader("oneC", function() {
    return import(
      /* webpackChunkName: "react-syntax-highlighter_languages_highlight_oneC" */
      "./1c.js"
    ).then(function(n) {
      return n._;
    });
  }),
  abnf: createLanguageAsyncLoader("abnf", function() {
    return import(
      /* webpackChunkName: "react-syntax-highlighter_languages_highlight_abnf" */
      "./abnf.js"
    ).then(function(n) {
      return n.a;
    });
  }),
  accesslog: createLanguageAsyncLoader("accesslog", function() {
    return import(
      /* webpackChunkName: "react-syntax-highlighter_languages_highlight_accesslog" */
      "./accesslog.js"
    ).then(function(n) {
      return n.a;
    });
  }),
  actionscript: createLanguageAsyncLoader("actionscript", function() {
    return import(
      /* webpackChunkName: "react-syntax-highlighter_languages_highlight_actionscript" */
      "./actionscript.js"
    ).then(function(n) {
      return n.a;
    });
  }),
  ada: createLanguageAsyncLoader("ada", function() {
    return import(
      /* webpackChunkName: "react-syntax-highlighter_languages_highlight_ada" */
      "./ada.js"
    ).then(function(n) {
      return n.a;
    });
  }),
  angelscript: createLanguageAsyncLoader("angelscript", function() {
    return import(
      /* webpackChunkName: "react-syntax-highlighter_languages_highlight_angelscript" */
      "./angelscript.js"
    ).then(function(n) {
      return n.a;
    });
  }),
  apache: createLanguageAsyncLoader("apache", function() {
    return import(
      /* webpackChunkName: "react-syntax-highlighter_languages_highlight_apache" */
      "./apache.js"
    ).then(function(n) {
      return n.a;
    });
  }),
  applescript: createLanguageAsyncLoader("applescript", function() {
    return import(
      /* webpackChunkName: "react-syntax-highlighter_languages_highlight_applescript" */
      "./applescript.js"
    ).then(function(n) {
      return n.a;
    });
  }),
  arcade: createLanguageAsyncLoader("arcade", function() {
    return import(
      /* webpackChunkName: "react-syntax-highlighter_languages_highlight_arcade" */
      "./arcade.js"
    ).then(function(n) {
      return n.a;
    });
  }),
  arduino: createLanguageAsyncLoader("arduino", function() {
    return import(
      /* webpackChunkName: "react-syntax-highlighter_languages_highlight_arduino" */
      "./arduino.js"
    ).then(function(n) {
      return n.a;
    });
  }),
  armasm: createLanguageAsyncLoader("armasm", function() {
    return import(
      /* webpackChunkName: "react-syntax-highlighter_languages_highlight_armasm" */
      "./armasm.js"
    ).then(function(n) {
      return n.a;
    });
  }),
  asciidoc: createLanguageAsyncLoader("asciidoc", function() {
    return import(
      /* webpackChunkName: "react-syntax-highlighter_languages_highlight_asciidoc" */
      "./asciidoc.js"
    ).then(function(n) {
      return n.a;
    });
  }),
  aspectj: createLanguageAsyncLoader("aspectj", function() {
    return import(
      /* webpackChunkName: "react-syntax-highlighter_languages_highlight_aspectj" */
      "./aspectj.js"
    ).then(function(n) {
      return n.a;
    });
  }),
  autohotkey: createLanguageAsyncLoader("autohotkey", function() {
    return import(
      /* webpackChunkName: "react-syntax-highlighter_languages_highlight_autohotkey" */
      "./autohotkey.js"
    ).then(function(n) {
      return n.a;
    });
  }),
  autoit: createLanguageAsyncLoader("autoit", function() {
    return import(
      /* webpackChunkName: "react-syntax-highlighter_languages_highlight_autoit" */
      "./autoit.js"
    ).then(function(n) {
      return n.a;
    });
  }),
  avrasm: createLanguageAsyncLoader("avrasm", function() {
    return import(
      /* webpackChunkName: "react-syntax-highlighter_languages_highlight_avrasm" */
      "./avrasm.js"
    ).then(function(n) {
      return n.a;
    });
  }),
  awk: createLanguageAsyncLoader("awk", function() {
    return import(
      /* webpackChunkName: "react-syntax-highlighter_languages_highlight_awk" */
      "./awk.js"
    ).then(function(n) {
      return n.a;
    });
  }),
  axapta: createLanguageAsyncLoader("axapta", function() {
    return import(
      /* webpackChunkName: "react-syntax-highlighter_languages_highlight_axapta" */
      "./axapta.js"
    ).then(function(n) {
      return n.a;
    });
  }),
  bash: createLanguageAsyncLoader("bash", function() {
    return import(
      /* webpackChunkName: "react-syntax-highlighter_languages_highlight_bash" */
      "./bash.js"
    ).then(function(n) {
      return n.b;
    });
  }),
  basic: createLanguageAsyncLoader("basic", function() {
    return import(
      /* webpackChunkName: "react-syntax-highlighter_languages_highlight_basic" */
      "./basic.js"
    ).then(function(n) {
      return n.b;
    });
  }),
  bnf: createLanguageAsyncLoader("bnf", function() {
    return import(
      /* webpackChunkName: "react-syntax-highlighter_languages_highlight_bnf" */
      "./bnf.js"
    ).then(function(n) {
      return n.b;
    });
  }),
  brainfuck: createLanguageAsyncLoader("brainfuck", function() {
    return import(
      /* webpackChunkName: "react-syntax-highlighter_languages_highlight_brainfuck" */
      "./brainfuck.js"
    ).then(function(n) {
      return n.b;
    });
  }),
  cLike: createLanguageAsyncLoader("cLike", function() {
    return import(
      /* webpackChunkName: "react-syntax-highlighter_languages_highlight_cLike" */
      "./c-like.js"
    ).then(function(n) {
      return n.c;
    });
  }),
  c: createLanguageAsyncLoader("c", function() {
    return import(
      /* webpackChunkName: "react-syntax-highlighter_languages_highlight_c" */
      "./c.js"
    ).then(function(n) {
      return n.c;
    });
  }),
  cal: createLanguageAsyncLoader("cal", function() {
    return import(
      /* webpackChunkName: "react-syntax-highlighter_languages_highlight_cal" */
      "./cal.js"
    ).then(function(n) {
      return n.c;
    });
  }),
  capnproto: createLanguageAsyncLoader("capnproto", function() {
    return import(
      /* webpackChunkName: "react-syntax-highlighter_languages_highlight_capnproto" */
      "./capnproto.js"
    ).then(function(n) {
      return n.c;
    });
  }),
  ceylon: createLanguageAsyncLoader("ceylon", function() {
    return import(
      /* webpackChunkName: "react-syntax-highlighter_languages_highlight_ceylon" */
      "./ceylon.js"
    ).then(function(n) {
      return n.c;
    });
  }),
  clean: createLanguageAsyncLoader("clean", function() {
    return import(
      /* webpackChunkName: "react-syntax-highlighter_languages_highlight_clean" */
      "./clean.js"
    ).then(function(n) {
      return n.c;
    });
  }),
  clojureRepl: createLanguageAsyncLoader("clojureRepl", function() {
    return import(
      /* webpackChunkName: "react-syntax-highlighter_languages_highlight_clojureRepl" */
      "./clojure-repl.js"
    ).then(function(n) {
      return n.c;
    });
  }),
  clojure: createLanguageAsyncLoader("clojure", function() {
    return import(
      /* webpackChunkName: "react-syntax-highlighter_languages_highlight_clojure" */
      "./clojure.js"
    ).then(function(n) {
      return n.c;
    });
  }),
  cmake: createLanguageAsyncLoader("cmake", function() {
    return import(
      /* webpackChunkName: "react-syntax-highlighter_languages_highlight_cmake" */
      "./cmake.js"
    ).then(function(n) {
      return n.c;
    });
  }),
  coffeescript: createLanguageAsyncLoader("coffeescript", function() {
    return import(
      /* webpackChunkName: "react-syntax-highlighter_languages_highlight_coffeescript" */
      "./coffeescript.js"
    ).then(function(n) {
      return n.c;
    });
  }),
  coq: createLanguageAsyncLoader("coq", function() {
    return import(
      /* webpackChunkName: "react-syntax-highlighter_languages_highlight_coq" */
      "./coq.js"
    ).then(function(n) {
      return n.c;
    });
  }),
  cos: createLanguageAsyncLoader("cos", function() {
    return import(
      /* webpackChunkName: "react-syntax-highlighter_languages_highlight_cos" */
      "./cos.js"
    ).then(function(n) {
      return n.c;
    });
  }),
  cpp: createLanguageAsyncLoader("cpp", function() {
    return import(
      /* webpackChunkName: "react-syntax-highlighter_languages_highlight_cpp" */
      "./cpp.js"
    ).then(function(n) {
      return n.c;
    });
  }),
  crmsh: createLanguageAsyncLoader("crmsh", function() {
    return import(
      /* webpackChunkName: "react-syntax-highlighter_languages_highlight_crmsh" */
      "./crmsh.js"
    ).then(function(n) {
      return n.c;
    });
  }),
  crystal: createLanguageAsyncLoader("crystal", function() {
    return import(
      /* webpackChunkName: "react-syntax-highlighter_languages_highlight_crystal" */
      "./crystal.js"
    ).then(function(n) {
      return n.c;
    });
  }),
  csharp: createLanguageAsyncLoader("csharp", function() {
    return import(
      /* webpackChunkName: "react-syntax-highlighter_languages_highlight_csharp" */
      "./csharp.js"
    ).then(function(n) {
      return n.c;
    });
  }),
  csp: createLanguageAsyncLoader("csp", function() {
    return import(
      /* webpackChunkName: "react-syntax-highlighter_languages_highlight_csp" */
      "./csp.js"
    ).then(function(n) {
      return n.c;
    });
  }),
  css: createLanguageAsyncLoader("css", function() {
    return import(
      /* webpackChunkName: "react-syntax-highlighter_languages_highlight_css" */
      "./css.js"
    ).then(function(n) {
      return n.c;
    });
  }),
  d: createLanguageAsyncLoader("d", function() {
    return import(
      /* webpackChunkName: "react-syntax-highlighter_languages_highlight_d" */
      "./d.js"
    ).then(function(n) {
      return n.d;
    });
  }),
  dart: createLanguageAsyncLoader("dart", function() {
    return import(
      /* webpackChunkName: "react-syntax-highlighter_languages_highlight_dart" */
      "./dart.js"
    ).then(function(n) {
      return n.d;
    });
  }),
  delphi: createLanguageAsyncLoader("delphi", function() {
    return import(
      /* webpackChunkName: "react-syntax-highlighter_languages_highlight_delphi" */
      "./delphi.js"
    ).then(function(n) {
      return n.d;
    });
  }),
  diff: createLanguageAsyncLoader("diff", function() {
    return import(
      /* webpackChunkName: "react-syntax-highlighter_languages_highlight_diff" */
      "./diff.js"
    ).then(function(n) {
      return n.d;
    });
  }),
  django: createLanguageAsyncLoader("django", function() {
    return import(
      /* webpackChunkName: "react-syntax-highlighter_languages_highlight_django" */
      "./django.js"
    ).then(function(n) {
      return n.d;
    });
  }),
  dns: createLanguageAsyncLoader("dns", function() {
    return import(
      /* webpackChunkName: "react-syntax-highlighter_languages_highlight_dns" */
      "./dns.js"
    ).then(function(n) {
      return n.d;
    });
  }),
  dockerfile: createLanguageAsyncLoader("dockerfile", function() {
    return import(
      /* webpackChunkName: "react-syntax-highlighter_languages_highlight_dockerfile" */
      "./dockerfile.js"
    ).then(function(n) {
      return n.d;
    });
  }),
  dos: createLanguageAsyncLoader("dos", function() {
    return import(
      /* webpackChunkName: "react-syntax-highlighter_languages_highlight_dos" */
      "./dos.js"
    ).then(function(n) {
      return n.d;
    });
  }),
  dsconfig: createLanguageAsyncLoader("dsconfig", function() {
    return import(
      /* webpackChunkName: "react-syntax-highlighter_languages_highlight_dsconfig" */
      "./dsconfig.js"
    ).then(function(n) {
      return n.d;
    });
  }),
  dts: createLanguageAsyncLoader("dts", function() {
    return import(
      /* webpackChunkName: "react-syntax-highlighter_languages_highlight_dts" */
      "./dts.js"
    ).then(function(n) {
      return n.d;
    });
  }),
  dust: createLanguageAsyncLoader("dust", function() {
    return import(
      /* webpackChunkName: "react-syntax-highlighter_languages_highlight_dust" */
      "./dust.js"
    ).then(function(n) {
      return n.d;
    });
  }),
  ebnf: createLanguageAsyncLoader("ebnf", function() {
    return import(
      /* webpackChunkName: "react-syntax-highlighter_languages_highlight_ebnf" */
      "./ebnf.js"
    ).then(function(n) {
      return n.e;
    });
  }),
  elixir: createLanguageAsyncLoader("elixir", function() {
    return import(
      /* webpackChunkName: "react-syntax-highlighter_languages_highlight_elixir" */
      "./elixir.js"
    ).then(function(n) {
      return n.e;
    });
  }),
  elm: createLanguageAsyncLoader("elm", function() {
    return import(
      /* webpackChunkName: "react-syntax-highlighter_languages_highlight_elm" */
      "./elm.js"
    ).then(function(n) {
      return n.e;
    });
  }),
  erb: createLanguageAsyncLoader("erb", function() {
    return import(
      /* webpackChunkName: "react-syntax-highlighter_languages_highlight_erb" */
      "./erb.js"
    ).then(function(n) {
      return n.e;
    });
  }),
  erlangRepl: createLanguageAsyncLoader("erlangRepl", function() {
    return import(
      /* webpackChunkName: "react-syntax-highlighter_languages_highlight_erlangRepl" */
      "./erlang-repl.js"
    ).then(function(n) {
      return n.e;
    });
  }),
  erlang: createLanguageAsyncLoader("erlang", function() {
    return import(
      /* webpackChunkName: "react-syntax-highlighter_languages_highlight_erlang" */
      "./erlang.js"
    ).then(function(n) {
      return n.e;
    });
  }),
  excel: createLanguageAsyncLoader("excel", function() {
    return import(
      /* webpackChunkName: "react-syntax-highlighter_languages_highlight_excel" */
      "./excel.js"
    ).then(function(n) {
      return n.e;
    });
  }),
  fix: createLanguageAsyncLoader("fix", function() {
    return import(
      /* webpackChunkName: "react-syntax-highlighter_languages_highlight_fix" */
      "./fix.js"
    ).then(function(n) {
      return n.f;
    });
  }),
  flix: createLanguageAsyncLoader("flix", function() {
    return import(
      /* webpackChunkName: "react-syntax-highlighter_languages_highlight_flix" */
      "./flix.js"
    ).then(function(n) {
      return n.f;
    });
  }),
  fortran: createLanguageAsyncLoader("fortran", function() {
    return import(
      /* webpackChunkName: "react-syntax-highlighter_languages_highlight_fortran" */
      "./fortran.js"
    ).then(function(n) {
      return n.f;
    });
  }),
  fsharp: createLanguageAsyncLoader("fsharp", function() {
    return import(
      /* webpackChunkName: "react-syntax-highlighter_languages_highlight_fsharp" */
      "./fsharp.js"
    ).then(function(n) {
      return n.f;
    });
  }),
  gams: createLanguageAsyncLoader("gams", function() {
    return import(
      /* webpackChunkName: "react-syntax-highlighter_languages_highlight_gams" */
      "./gams.js"
    ).then(function(n) {
      return n.g;
    });
  }),
  gauss: createLanguageAsyncLoader("gauss", function() {
    return import(
      /* webpackChunkName: "react-syntax-highlighter_languages_highlight_gauss" */
      "./gauss.js"
    ).then(function(n) {
      return n.g;
    });
  }),
  gcode: createLanguageAsyncLoader("gcode", function() {
    return import(
      /* webpackChunkName: "react-syntax-highlighter_languages_highlight_gcode" */
      "./gcode.js"
    ).then(function(n) {
      return n.g;
    });
  }),
  gherkin: createLanguageAsyncLoader("gherkin", function() {
    return import(
      /* webpackChunkName: "react-syntax-highlighter_languages_highlight_gherkin" */
      "./gherkin.js"
    ).then(function(n) {
      return n.g;
    });
  }),
  glsl: createLanguageAsyncLoader("glsl", function() {
    return import(
      /* webpackChunkName: "react-syntax-highlighter_languages_highlight_glsl" */
      "./glsl.js"
    ).then(function(n) {
      return n.g;
    });
  }),
  gml: createLanguageAsyncLoader("gml", function() {
    return import(
      /* webpackChunkName: "react-syntax-highlighter_languages_highlight_gml" */
      "./gml.js"
    ).then(function(n) {
      return n.g;
    });
  }),
  go: createLanguageAsyncLoader("go", function() {
    return import(
      /* webpackChunkName: "react-syntax-highlighter_languages_highlight_go" */
      "./go.js"
    ).then(function(n) {
      return n.g;
    });
  }),
  golo: createLanguageAsyncLoader("golo", function() {
    return import(
      /* webpackChunkName: "react-syntax-highlighter_languages_highlight_golo" */
      "./golo.js"
    ).then(function(n) {
      return n.g;
    });
  }),
  gradle: createLanguageAsyncLoader("gradle", function() {
    return import(
      /* webpackChunkName: "react-syntax-highlighter_languages_highlight_gradle" */
      "./gradle.js"
    ).then(function(n) {
      return n.g;
    });
  }),
  groovy: createLanguageAsyncLoader("groovy", function() {
    return import(
      /* webpackChunkName: "react-syntax-highlighter_languages_highlight_groovy" */
      "./groovy.js"
    ).then(function(n) {
      return n.g;
    });
  }),
  haml: createLanguageAsyncLoader("haml", function() {
    return import(
      /* webpackChunkName: "react-syntax-highlighter_languages_highlight_haml" */
      "./haml.js"
    ).then(function(n) {
      return n.h;
    });
  }),
  handlebars: createLanguageAsyncLoader("handlebars", function() {
    return import(
      /* webpackChunkName: "react-syntax-highlighter_languages_highlight_handlebars" */
      "./handlebars.js"
    ).then(function(n) {
      return n.h;
    });
  }),
  haskell: createLanguageAsyncLoader("haskell", function() {
    return import(
      /* webpackChunkName: "react-syntax-highlighter_languages_highlight_haskell" */
      "./haskell.js"
    ).then(function(n) {
      return n.h;
    });
  }),
  haxe: createLanguageAsyncLoader("haxe", function() {
    return import(
      /* webpackChunkName: "react-syntax-highlighter_languages_highlight_haxe" */
      "./haxe.js"
    ).then(function(n) {
      return n.h;
    });
  }),
  hsp: createLanguageAsyncLoader("hsp", function() {
    return import(
      /* webpackChunkName: "react-syntax-highlighter_languages_highlight_hsp" */
      "./hsp.js"
    ).then(function(n) {
      return n.h;
    });
  }),
  htmlbars: createLanguageAsyncLoader("htmlbars", function() {
    return import(
      /* webpackChunkName: "react-syntax-highlighter_languages_highlight_htmlbars" */
      "./htmlbars.js"
    ).then(function(n) {
      return n.h;
    });
  }),
  http: createLanguageAsyncLoader("http", function() {
    return import(
      /* webpackChunkName: "react-syntax-highlighter_languages_highlight_http" */
      "./http.js"
    ).then(function(n) {
      return n.h;
    });
  }),
  hy: createLanguageAsyncLoader("hy", function() {
    return import(
      /* webpackChunkName: "react-syntax-highlighter_languages_highlight_hy" */
      "./hy.js"
    ).then(function(n) {
      return n.h;
    });
  }),
  inform7: createLanguageAsyncLoader("inform7", function() {
    return import(
      /* webpackChunkName: "react-syntax-highlighter_languages_highlight_inform7" */
      "./inform7.js"
    ).then(function(n) {
      return n.i;
    });
  }),
  ini: createLanguageAsyncLoader("ini", function() {
    return import(
      /* webpackChunkName: "react-syntax-highlighter_languages_highlight_ini" */
      "./ini.js"
    ).then(function(n) {
      return n.i;
    });
  }),
  irpf90: createLanguageAsyncLoader("irpf90", function() {
    return import(
      /* webpackChunkName: "react-syntax-highlighter_languages_highlight_irpf90" */
      "./irpf90.js"
    ).then(function(n) {
      return n.i;
    });
  }),
  isbl: createLanguageAsyncLoader("isbl", function() {
    return import(
      /* webpackChunkName: "react-syntax-highlighter_languages_highlight_isbl" */
      "./isbl.js"
    ).then(function(n) {
      return n.i;
    });
  }),
  java: createLanguageAsyncLoader("java", function() {
    return import(
      /* webpackChunkName: "react-syntax-highlighter_languages_highlight_java" */
      "./java.js"
    ).then(function(n) {
      return n.j;
    });
  }),
  javascript: createLanguageAsyncLoader("javascript", function() {
    return import(
      /* webpackChunkName: "react-syntax-highlighter_languages_highlight_javascript" */
      "./javascript.js"
    ).then(function(n) {
      return n.j;
    });
  }),
  jbossCli: createLanguageAsyncLoader("jbossCli", function() {
    return import(
      /* webpackChunkName: "react-syntax-highlighter_languages_highlight_jbossCli" */
      "./jboss-cli.js"
    ).then(function(n) {
      return n.j;
    });
  }),
  json: createLanguageAsyncLoader("json", function() {
    return import(
      /* webpackChunkName: "react-syntax-highlighter_languages_highlight_json" */
      "./json.js"
    ).then(function(n) {
      return n.j;
    });
  }),
  juliaRepl: createLanguageAsyncLoader("juliaRepl", function() {
    return import(
      /* webpackChunkName: "react-syntax-highlighter_languages_highlight_juliaRepl" */
      "./julia-repl.js"
    ).then(function(n) {
      return n.j;
    });
  }),
  julia: createLanguageAsyncLoader("julia", function() {
    return import(
      /* webpackChunkName: "react-syntax-highlighter_languages_highlight_julia" */
      "./julia.js"
    ).then(function(n) {
      return n.j;
    });
  }),
  kotlin: createLanguageAsyncLoader("kotlin", function() {
    return import(
      /* webpackChunkName: "react-syntax-highlighter_languages_highlight_kotlin" */
      "./kotlin.js"
    ).then(function(n) {
      return n.k;
    });
  }),
  lasso: createLanguageAsyncLoader("lasso", function() {
    return import(
      /* webpackChunkName: "react-syntax-highlighter_languages_highlight_lasso" */
      "./lasso.js"
    ).then(function(n) {
      return n.l;
    });
  }),
  latex: createLanguageAsyncLoader("latex", function() {
    return import(
      /* webpackChunkName: "react-syntax-highlighter_languages_highlight_latex" */
      "./latex.js"
    ).then(function(n) {
      return n.l;
    });
  }),
  ldif: createLanguageAsyncLoader("ldif", function() {
    return import(
      /* webpackChunkName: "react-syntax-highlighter_languages_highlight_ldif" */
      "./ldif.js"
    ).then(function(n) {
      return n.l;
    });
  }),
  leaf: createLanguageAsyncLoader("leaf", function() {
    return import(
      /* webpackChunkName: "react-syntax-highlighter_languages_highlight_leaf" */
      "./leaf.js"
    ).then(function(n) {
      return n.l;
    });
  }),
  less: createLanguageAsyncLoader("less", function() {
    return import(
      /* webpackChunkName: "react-syntax-highlighter_languages_highlight_less" */
      "./less.js"
    ).then(function(n) {
      return n.l;
    });
  }),
  lisp: createLanguageAsyncLoader("lisp", function() {
    return import(
      /* webpackChunkName: "react-syntax-highlighter_languages_highlight_lisp" */
      "./lisp.js"
    ).then(function(n) {
      return n.l;
    });
  }),
  livecodeserver: createLanguageAsyncLoader("livecodeserver", function() {
    return import(
      /* webpackChunkName: "react-syntax-highlighter_languages_highlight_livecodeserver" */
      "./livecodeserver.js"
    ).then(function(n) {
      return n.l;
    });
  }),
  livescript: createLanguageAsyncLoader("livescript", function() {
    return import(
      /* webpackChunkName: "react-syntax-highlighter_languages_highlight_livescript" */
      "./livescript.js"
    ).then(function(n) {
      return n.l;
    });
  }),
  llvm: createLanguageAsyncLoader("llvm", function() {
    return import(
      /* webpackChunkName: "react-syntax-highlighter_languages_highlight_llvm" */
      "./llvm.js"
    ).then(function(n) {
      return n.l;
    });
  }),
  lsl: createLanguageAsyncLoader("lsl", function() {
    return import(
      /* webpackChunkName: "react-syntax-highlighter_languages_highlight_lsl" */
      "./lsl.js"
    ).then(function(n) {
      return n.l;
    });
  }),
  lua: createLanguageAsyncLoader("lua", function() {
    return import(
      /* webpackChunkName: "react-syntax-highlighter_languages_highlight_lua" */
      "./lua.js"
    ).then(function(n) {
      return n.l;
    });
  }),
  makefile: createLanguageAsyncLoader("makefile", function() {
    return import(
      /* webpackChunkName: "react-syntax-highlighter_languages_highlight_makefile" */
      "./makefile.js"
    ).then(function(n) {
      return n.m;
    });
  }),
  markdown: createLanguageAsyncLoader("markdown", function() {
    return import(
      /* webpackChunkName: "react-syntax-highlighter_languages_highlight_markdown" */
      "./markdown.js"
    ).then(function(n) {
      return n.m;
    });
  }),
  mathematica: createLanguageAsyncLoader("mathematica", function() {
    return import(
      /* webpackChunkName: "react-syntax-highlighter_languages_highlight_mathematica" */
      "./mathematica.js"
    ).then(function(n) {
      return n.m;
    });
  }),
  matlab: createLanguageAsyncLoader("matlab", function() {
    return import(
      /* webpackChunkName: "react-syntax-highlighter_languages_highlight_matlab" */
      "./matlab.js"
    ).then(function(n) {
      return n.m;
    });
  }),
  maxima: createLanguageAsyncLoader("maxima", function() {
    return import(
      /* webpackChunkName: "react-syntax-highlighter_languages_highlight_maxima" */
      "./maxima.js"
    ).then(function(n) {
      return n.m;
    });
  }),
  mel: createLanguageAsyncLoader("mel", function() {
    return import(
      /* webpackChunkName: "react-syntax-highlighter_languages_highlight_mel" */
      "./mel.js"
    ).then(function(n) {
      return n.m;
    });
  }),
  mercury: createLanguageAsyncLoader("mercury", function() {
    return import(
      /* webpackChunkName: "react-syntax-highlighter_languages_highlight_mercury" */
      "./mercury.js"
    ).then(function(n) {
      return n.m;
    });
  }),
  mipsasm: createLanguageAsyncLoader("mipsasm", function() {
    return import(
      /* webpackChunkName: "react-syntax-highlighter_languages_highlight_mipsasm" */
      "./mipsasm.js"
    ).then(function(n) {
      return n.m;
    });
  }),
  mizar: createLanguageAsyncLoader("mizar", function() {
    return import(
      /* webpackChunkName: "react-syntax-highlighter_languages_highlight_mizar" */
      "./mizar.js"
    ).then(function(n) {
      return n.m;
    });
  }),
  mojolicious: createLanguageAsyncLoader("mojolicious", function() {
    return import(
      /* webpackChunkName: "react-syntax-highlighter_languages_highlight_mojolicious" */
      "./mojolicious.js"
    ).then(function(n) {
      return n.m;
    });
  }),
  monkey: createLanguageAsyncLoader("monkey", function() {
    return import(
      /* webpackChunkName: "react-syntax-highlighter_languages_highlight_monkey" */
      "./monkey.js"
    ).then(function(n) {
      return n.m;
    });
  }),
  moonscript: createLanguageAsyncLoader("moonscript", function() {
    return import(
      /* webpackChunkName: "react-syntax-highlighter_languages_highlight_moonscript" */
      "./moonscript.js"
    ).then(function(n) {
      return n.m;
    });
  }),
  n1ql: createLanguageAsyncLoader("n1ql", function() {
    return import(
      /* webpackChunkName: "react-syntax-highlighter_languages_highlight_n1ql" */
      "./n1ql.js"
    ).then(function(n) {
      return n.n;
    });
  }),
  nginx: createLanguageAsyncLoader("nginx", function() {
    return import(
      /* webpackChunkName: "react-syntax-highlighter_languages_highlight_nginx" */
      "./nginx.js"
    ).then(function(n) {
      return n.n;
    });
  }),
  nim: createLanguageAsyncLoader("nim", function() {
    return import(
      /* webpackChunkName: "react-syntax-highlighter_languages_highlight_nim" */
      "./nim.js"
    ).then(function(n) {
      return n.n;
    });
  }),
  nix: createLanguageAsyncLoader("nix", function() {
    return import(
      /* webpackChunkName: "react-syntax-highlighter_languages_highlight_nix" */
      "./nix.js"
    ).then(function(n) {
      return n.n;
    });
  }),
  nodeRepl: createLanguageAsyncLoader("nodeRepl", function() {
    return import(
      /* webpackChunkName: "react-syntax-highlighter_languages_highlight_nodeRepl" */
      "./node-repl.js"
    ).then(function(n) {
      return n.n;
    });
  }),
  nsis: createLanguageAsyncLoader("nsis", function() {
    return import(
      /* webpackChunkName: "react-syntax-highlighter_languages_highlight_nsis" */
      "./nsis.js"
    ).then(function(n) {
      return n.n;
    });
  }),
  objectivec: createLanguageAsyncLoader("objectivec", function() {
    return import(
      /* webpackChunkName: "react-syntax-highlighter_languages_highlight_objectivec" */
      "./objectivec.js"
    ).then(function(n) {
      return n.o;
    });
  }),
  ocaml: createLanguageAsyncLoader("ocaml", function() {
    return import(
      /* webpackChunkName: "react-syntax-highlighter_languages_highlight_ocaml" */
      "./ocaml.js"
    ).then(function(n) {
      return n.o;
    });
  }),
  openscad: createLanguageAsyncLoader("openscad", function() {
    return import(
      /* webpackChunkName: "react-syntax-highlighter_languages_highlight_openscad" */
      "./openscad.js"
    ).then(function(n) {
      return n.o;
    });
  }),
  oxygene: createLanguageAsyncLoader("oxygene", function() {
    return import(
      /* webpackChunkName: "react-syntax-highlighter_languages_highlight_oxygene" */
      "./oxygene.js"
    ).then(function(n) {
      return n.o;
    });
  }),
  parser3: createLanguageAsyncLoader("parser3", function() {
    return import(
      /* webpackChunkName: "react-syntax-highlighter_languages_highlight_parser3" */
      "./parser3.js"
    ).then(function(n) {
      return n.p;
    });
  }),
  perl: createLanguageAsyncLoader("perl", function() {
    return import(
      /* webpackChunkName: "react-syntax-highlighter_languages_highlight_perl" */
      "./perl.js"
    ).then(function(n) {
      return n.p;
    });
  }),
  pf: createLanguageAsyncLoader("pf", function() {
    return import(
      /* webpackChunkName: "react-syntax-highlighter_languages_highlight_pf" */
      "./pf.js"
    ).then(function(n) {
      return n.p;
    });
  }),
  pgsql: createLanguageAsyncLoader("pgsql", function() {
    return import(
      /* webpackChunkName: "react-syntax-highlighter_languages_highlight_pgsql" */
      "./pgsql.js"
    ).then(function(n) {
      return n.p;
    });
  }),
  phpTemplate: createLanguageAsyncLoader("phpTemplate", function() {
    return import(
      /* webpackChunkName: "react-syntax-highlighter_languages_highlight_phpTemplate" */
      "./php-template.js"
    ).then(function(n) {
      return n.p;
    });
  }),
  php: createLanguageAsyncLoader("php", function() {
    return import(
      /* webpackChunkName: "react-syntax-highlighter_languages_highlight_php" */
      "./php.js"
    ).then(function(n) {
      return n.p;
    });
  }),
  plaintext: createLanguageAsyncLoader("plaintext", function() {
    return import(
      /* webpackChunkName: "react-syntax-highlighter_languages_highlight_plaintext" */
      "./plaintext.js"
    ).then(function(n) {
      return n.p;
    });
  }),
  pony: createLanguageAsyncLoader("pony", function() {
    return import(
      /* webpackChunkName: "react-syntax-highlighter_languages_highlight_pony" */
      "./pony.js"
    ).then(function(n) {
      return n.p;
    });
  }),
  powershell: createLanguageAsyncLoader("powershell", function() {
    return import(
      /* webpackChunkName: "react-syntax-highlighter_languages_highlight_powershell" */
      "./powershell.js"
    ).then(function(n) {
      return n.p;
    });
  }),
  processing: createLanguageAsyncLoader("processing", function() {
    return import(
      /* webpackChunkName: "react-syntax-highlighter_languages_highlight_processing" */
      "./processing.js"
    ).then(function(n) {
      return n.p;
    });
  }),
  profile: createLanguageAsyncLoader("profile", function() {
    return import(
      /* webpackChunkName: "react-syntax-highlighter_languages_highlight_profile" */
      "./profile.js"
    ).then(function(n) {
      return n.p;
    });
  }),
  prolog: createLanguageAsyncLoader("prolog", function() {
    return import(
      /* webpackChunkName: "react-syntax-highlighter_languages_highlight_prolog" */
      "./prolog.js"
    ).then(function(n) {
      return n.p;
    });
  }),
  properties: createLanguageAsyncLoader("properties", function() {
    return import(
      /* webpackChunkName: "react-syntax-highlighter_languages_highlight_properties" */
      "./properties.js"
    ).then(function(n) {
      return n.p;
    });
  }),
  protobuf: createLanguageAsyncLoader("protobuf", function() {
    return import(
      /* webpackChunkName: "react-syntax-highlighter_languages_highlight_protobuf" */
      "./protobuf.js"
    ).then(function(n) {
      return n.p;
    });
  }),
  puppet: createLanguageAsyncLoader("puppet", function() {
    return import(
      /* webpackChunkName: "react-syntax-highlighter_languages_highlight_puppet" */
      "./puppet.js"
    ).then(function(n) {
      return n.p;
    });
  }),
  purebasic: createLanguageAsyncLoader("purebasic", function() {
    return import(
      /* webpackChunkName: "react-syntax-highlighter_languages_highlight_purebasic" */
      "./purebasic.js"
    ).then(function(n) {
      return n.p;
    });
  }),
  pythonRepl: createLanguageAsyncLoader("pythonRepl", function() {
    return import(
      /* webpackChunkName: "react-syntax-highlighter_languages_highlight_pythonRepl" */
      "./python-repl.js"
    ).then(function(n) {
      return n.p;
    });
  }),
  python: createLanguageAsyncLoader("python", function() {
    return import(
      /* webpackChunkName: "react-syntax-highlighter_languages_highlight_python" */
      "./python.js"
    ).then(function(n) {
      return n.p;
    });
  }),
  q: createLanguageAsyncLoader("q", function() {
    return import(
      /* webpackChunkName: "react-syntax-highlighter_languages_highlight_q" */
      "./q.js"
    ).then(function(n) {
      return n.q;
    });
  }),
  qml: createLanguageAsyncLoader("qml", function() {
    return import(
      /* webpackChunkName: "react-syntax-highlighter_languages_highlight_qml" */
      "./qml.js"
    ).then(function(n) {
      return n.q;
    });
  }),
  r: createLanguageAsyncLoader("r", function() {
    return import(
      /* webpackChunkName: "react-syntax-highlighter_languages_highlight_r" */
      "./r.js"
    ).then(function(n) {
      return n.r;
    });
  }),
  reasonml: createLanguageAsyncLoader("reasonml", function() {
    return import(
      /* webpackChunkName: "react-syntax-highlighter_languages_highlight_reasonml" */
      "./reasonml.js"
    ).then(function(n) {
      return n.r;
    });
  }),
  rib: createLanguageAsyncLoader("rib", function() {
    return import(
      /* webpackChunkName: "react-syntax-highlighter_languages_highlight_rib" */
      "./rib.js"
    ).then(function(n) {
      return n.r;
    });
  }),
  roboconf: createLanguageAsyncLoader("roboconf", function() {
    return import(
      /* webpackChunkName: "react-syntax-highlighter_languages_highlight_roboconf" */
      "./roboconf.js"
    ).then(function(n) {
      return n.r;
    });
  }),
  routeros: createLanguageAsyncLoader("routeros", function() {
    return import(
      /* webpackChunkName: "react-syntax-highlighter_languages_highlight_routeros" */
      "./routeros.js"
    ).then(function(n) {
      return n.r;
    });
  }),
  rsl: createLanguageAsyncLoader("rsl", function() {
    return import(
      /* webpackChunkName: "react-syntax-highlighter_languages_highlight_rsl" */
      "./rsl.js"
    ).then(function(n) {
      return n.r;
    });
  }),
  ruby: createLanguageAsyncLoader("ruby", function() {
    return import(
      /* webpackChunkName: "react-syntax-highlighter_languages_highlight_ruby" */
      "./ruby.js"
    ).then(function(n) {
      return n.r;
    });
  }),
  ruleslanguage: createLanguageAsyncLoader("ruleslanguage", function() {
    return import(
      /* webpackChunkName: "react-syntax-highlighter_languages_highlight_ruleslanguage" */
      "./ruleslanguage.js"
    ).then(function(n) {
      return n.r;
    });
  }),
  rust: createLanguageAsyncLoader("rust", function() {
    return import(
      /* webpackChunkName: "react-syntax-highlighter_languages_highlight_rust" */
      "./rust.js"
    ).then(function(n) {
      return n.r;
    });
  }),
  sas: createLanguageAsyncLoader("sas", function() {
    return import(
      /* webpackChunkName: "react-syntax-highlighter_languages_highlight_sas" */
      "./sas.js"
    ).then(function(n) {
      return n.s;
    });
  }),
  scala: createLanguageAsyncLoader("scala", function() {
    return import(
      /* webpackChunkName: "react-syntax-highlighter_languages_highlight_scala" */
      "./scala.js"
    ).then(function(n) {
      return n.s;
    });
  }),
  scheme: createLanguageAsyncLoader("scheme", function() {
    return import(
      /* webpackChunkName: "react-syntax-highlighter_languages_highlight_scheme" */
      "./scheme.js"
    ).then(function(n) {
      return n.s;
    });
  }),
  scilab: createLanguageAsyncLoader("scilab", function() {
    return import(
      /* webpackChunkName: "react-syntax-highlighter_languages_highlight_scilab" */
      "./scilab.js"
    ).then(function(n) {
      return n.s;
    });
  }),
  scss: createLanguageAsyncLoader("scss", function() {
    return import(
      /* webpackChunkName: "react-syntax-highlighter_languages_highlight_scss" */
      "./scss.js"
    ).then(function(n) {
      return n.s;
    });
  }),
  shell: createLanguageAsyncLoader("shell", function() {
    return import(
      /* webpackChunkName: "react-syntax-highlighter_languages_highlight_shell" */
      "./shell.js"
    ).then(function(n) {
      return n.s;
    });
  }),
  smali: createLanguageAsyncLoader("smali", function() {
    return import(
      /* webpackChunkName: "react-syntax-highlighter_languages_highlight_smali" */
      "./smali.js"
    ).then(function(n) {
      return n.s;
    });
  }),
  smalltalk: createLanguageAsyncLoader("smalltalk", function() {
    return import(
      /* webpackChunkName: "react-syntax-highlighter_languages_highlight_smalltalk" */
      "./smalltalk.js"
    ).then(function(n) {
      return n.s;
    });
  }),
  sml: createLanguageAsyncLoader("sml", function() {
    return import(
      /* webpackChunkName: "react-syntax-highlighter_languages_highlight_sml" */
      "./sml.js"
    ).then(function(n) {
      return n.s;
    });
  }),
  sqf: createLanguageAsyncLoader("sqf", function() {
    return import(
      /* webpackChunkName: "react-syntax-highlighter_languages_highlight_sqf" */
      "./sqf.js"
    ).then(function(n) {
      return n.s;
    });
  }),
  sql: createLanguageAsyncLoader("sql", function() {
    return import(
      /* webpackChunkName: "react-syntax-highlighter_languages_highlight_sql" */
      "./sql.js"
    ).then(function(n) {
      return n.s;
    });
  }),
  stan: createLanguageAsyncLoader("stan", function() {
    return import(
      /* webpackChunkName: "react-syntax-highlighter_languages_highlight_stan" */
      "./stan.js"
    ).then(function(n) {
      return n.s;
    });
  }),
  stata: createLanguageAsyncLoader("stata", function() {
    return import(
      /* webpackChunkName: "react-syntax-highlighter_languages_highlight_stata" */
      "./stata.js"
    ).then(function(n) {
      return n.s;
    });
  }),
  step21: createLanguageAsyncLoader("step21", function() {
    return import(
      /* webpackChunkName: "react-syntax-highlighter_languages_highlight_step21" */
      "./step21.js"
    ).then(function(n) {
      return n.s;
    });
  }),
  stylus: createLanguageAsyncLoader("stylus", function() {
    return import(
      /* webpackChunkName: "react-syntax-highlighter_languages_highlight_stylus" */
      "./stylus.js"
    ).then(function(n) {
      return n.s;
    });
  }),
  subunit: createLanguageAsyncLoader("subunit", function() {
    return import(
      /* webpackChunkName: "react-syntax-highlighter_languages_highlight_subunit" */
      "./subunit.js"
    ).then(function(n) {
      return n.s;
    });
  }),
  swift: createLanguageAsyncLoader("swift", function() {
    return import(
      /* webpackChunkName: "react-syntax-highlighter_languages_highlight_swift" */
      "./swift.js"
    ).then(function(n) {
      return n.s;
    });
  }),
  taggerscript: createLanguageAsyncLoader("taggerscript", function() {
    return import(
      /* webpackChunkName: "react-syntax-highlighter_languages_highlight_taggerscript" */
      "./taggerscript.js"
    ).then(function(n) {
      return n.t;
    });
  }),
  tap: createLanguageAsyncLoader("tap", function() {
    return import(
      /* webpackChunkName: "react-syntax-highlighter_languages_highlight_tap" */
      "./tap.js"
    ).then(function(n) {
      return n.t;
    });
  }),
  tcl: createLanguageAsyncLoader("tcl", function() {
    return import(
      /* webpackChunkName: "react-syntax-highlighter_languages_highlight_tcl" */
      "./tcl.js"
    ).then(function(n) {
      return n.t;
    });
  }),
  thrift: createLanguageAsyncLoader("thrift", function() {
    return import(
      /* webpackChunkName: "react-syntax-highlighter_languages_highlight_thrift" */
      "./thrift.js"
    ).then(function(n) {
      return n.t;
    });
  }),
  tp: createLanguageAsyncLoader("tp", function() {
    return import(
      /* webpackChunkName: "react-syntax-highlighter_languages_highlight_tp" */
      "./tp.js"
    ).then(function(n) {
      return n.t;
    });
  }),
  twig: createLanguageAsyncLoader("twig", function() {
    return import(
      /* webpackChunkName: "react-syntax-highlighter_languages_highlight_twig" */
      "./twig.js"
    ).then(function(n) {
      return n.t;
    });
  }),
  typescript: createLanguageAsyncLoader("typescript", function() {
    return import(
      /* webpackChunkName: "react-syntax-highlighter_languages_highlight_typescript" */
      "./typescript.js"
    ).then(function(n) {
      return n.t;
    });
  }),
  vala: createLanguageAsyncLoader("vala", function() {
    return import(
      /* webpackChunkName: "react-syntax-highlighter_languages_highlight_vala" */
      "./vala.js"
    ).then(function(n) {
      return n.v;
    });
  }),
  vbnet: createLanguageAsyncLoader("vbnet", function() {
    return import(
      /* webpackChunkName: "react-syntax-highlighter_languages_highlight_vbnet" */
      "./vbnet.js"
    ).then(function(n) {
      return n.v;
    });
  }),
  vbscriptHtml: createLanguageAsyncLoader("vbscriptHtml", function() {
    return import(
      /* webpackChunkName: "react-syntax-highlighter_languages_highlight_vbscriptHtml" */
      "./vbscript-html.js"
    ).then(function(n) {
      return n.v;
    });
  }),
  vbscript: createLanguageAsyncLoader("vbscript", function() {
    return import(
      /* webpackChunkName: "react-syntax-highlighter_languages_highlight_vbscript" */
      "./vbscript.js"
    ).then(function(n) {
      return n.v;
    });
  }),
  verilog: createLanguageAsyncLoader("verilog", function() {
    return import(
      /* webpackChunkName: "react-syntax-highlighter_languages_highlight_verilog" */
      "./verilog.js"
    ).then(function(n) {
      return n.v;
    });
  }),
  vhdl: createLanguageAsyncLoader("vhdl", function() {
    return import(
      /* webpackChunkName: "react-syntax-highlighter_languages_highlight_vhdl" */
      "./vhdl.js"
    ).then(function(n) {
      return n.v;
    });
  }),
  vim: createLanguageAsyncLoader("vim", function() {
    return import(
      /* webpackChunkName: "react-syntax-highlighter_languages_highlight_vim" */
      "./vim.js"
    ).then(function(n) {
      return n.v;
    });
  }),
  x86asm: createLanguageAsyncLoader("x86asm", function() {
    return import(
      /* webpackChunkName: "react-syntax-highlighter_languages_highlight_x86asm" */
      "./x86asm.js"
    ).then(function(n) {
      return n.x;
    });
  }),
  xl: createLanguageAsyncLoader("xl", function() {
    return import(
      /* webpackChunkName: "react-syntax-highlighter_languages_highlight_xl" */
      "./xl.js"
    ).then(function(n) {
      return n.x;
    });
  }),
  xml: createLanguageAsyncLoader("xml", function() {
    return import(
      /* webpackChunkName: "react-syntax-highlighter_languages_highlight_xml" */
      "./xml.js"
    ).then(function(n) {
      return n.x;
    });
  }),
  xquery: createLanguageAsyncLoader("xquery", function() {
    return import(
      /* webpackChunkName: "react-syntax-highlighter_languages_highlight_xquery" */
      "./xquery.js"
    ).then(function(n) {
      return n.x;
    });
  }),
  yaml: createLanguageAsyncLoader("yaml", function() {
    return import(
      /* webpackChunkName: "react-syntax-highlighter_languages_highlight_yaml" */
      "./yaml.js"
    ).then(function(n) {
      return n.y;
    });
  }),
  zephir: createLanguageAsyncLoader("zephir", function() {
    return import(
      /* webpackChunkName: "react-syntax-highlighter_languages_highlight_zephir" */
      "./zephir.js"
    ).then(function(n) {
      return n.z;
    });
  })
};
var SyntaxHighlighter = createAsyncLoadingHighlighter({
  loader: function loader() {
    return import(
      /* webpackChunkName:"react-syntax-highlighter/lowlight-import" */
      "./core.js"
    ).then(function(n) {
      return n.c;
    }).then(function(module) {
      return module.default || module;
    });
  },
  isLanguageRegistered: function isLanguageRegistered(instance, language) {
    return !!checkForListedLanguage(instance, language);
  },
  languageLoaders,
  registerLanguage: function registerLanguage(instance, name, language) {
    return instance.registerLanguage(name, language);
  }
});
const styleMap = new Map();
const getStyle = async (style) => {
  if (!styleMap.has(style)) {
    let styleFetcher;
    switch (style) {
      case "anOldHope":
        styleFetcher = import("./an-old-hope.js").then(function(n) {
          return n.a;
        });
        break;
      case "arta":
        styleFetcher = import("./arta.js").then(function(n) {
          return n.a;
        });
        break;
      case "atelierDuneDark":
        styleFetcher = import("./atelier-dune-dark.js").then(function(n) {
          return n.a;
        });
        break;
      case "atelierDuneLight":
        styleFetcher = import("./atelier-dune-light.js").then(function(n) {
          return n.a;
        });
        break;
      case "darcula":
        styleFetcher = import("./darcula.js").then(function(n) {
          return n.d;
        });
        break;
      case "far":
        styleFetcher = import("./far.js").then(function(n) {
          return n.f;
        });
        break;
      case "github":
        styleFetcher = import("./github.js").then(function(n) {
          return n.g;
        });
        break;
      case "gradientDark":
        styleFetcher = import("./gradient-dark.js").then(function(n) {
          return n.g;
        });
        break;
      case "isblEditorDark":
        styleFetcher = import("./isbl-editor-dark.js").then(function(n) {
          return n.i;
        });
        break;
      case "isblEditorLight":
        styleFetcher = import("./isbl-editor-light.js").then(function(n) {
          return n.i;
        });
        break;
      case "monokai":
        styleFetcher = import("./monokai.js").then(function(n) {
          return n.m;
        });
        break;
      case "sunburst":
        styleFetcher = import("./sunburst.js").then(function(n) {
          return n.s;
        });
        break;
      case "nightOwl":
        styleFetcher = import("./night-owl.js").then(function(n) {
          return n.n;
        });
        break;
    }
    styleMap.set(style, styleFetcher);
  }
  return styleMap.get(style);
};
const CodeSyntaxHighlighter = ({
  theme,
  language,
  children
}) => {
  const [style, setStyle] = React__default.useState(null);
  useEffect(() => {
    let apply = true;
    getStyle(theme).then((style2) => {
      if (apply) {
        setStyle(style2.default);
      }
    });
    return () => {
      apply = false;
    };
  }, [theme]);
  return style ? /* @__PURE__ */ jsx(SyntaxHighlighter, {
    style,
    customStyle: {
      marginLeft: "-10px",
      marginRight: "-10px",
      paddingLeft: "11px",
      paddingRight: "11px",
      borderRadius: "3px"
    },
    language,
    children
  }) : /* @__PURE__ */ jsx("code", {
    children
  });
};
export { CodeSyntaxHighlighter, CodeSyntaxHighlighter as default };
//# sourceMappingURL=syntax_highlighter.js.map
