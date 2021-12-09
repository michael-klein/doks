var __defProp = Object.defineProperty;
var __defProps = Object.defineProperties;
var __getOwnPropDescs = Object.getOwnPropertyDescriptors;
var __getOwnPropSymbols = Object.getOwnPropertySymbols;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __propIsEnum = Object.prototype.propertyIsEnumerable;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues = (a, b2) => {
  for (var prop in b2 || (b2 = {}))
    if (__hasOwnProp.call(b2, prop))
      __defNormalProp(a, prop, b2[prop]);
  if (__getOwnPropSymbols)
    for (var prop of __getOwnPropSymbols(b2)) {
      if (__propIsEnum.call(b2, prop))
        __defNormalProp(a, prop, b2[prop]);
    }
  return a;
};
var __spreadProps = (a, b2) => __defProps(a, __getOwnPropDescs(b2));
var __objRest = (source, exclude) => {
  var target = {};
  for (var prop in source)
    if (__hasOwnProp.call(source, prop) && exclude.indexOf(prop) < 0)
      target[prop] = source[prop];
  if (source != null && __getOwnPropSymbols)
    for (var prop of __getOwnPropSymbols(source)) {
      if (exclude.indexOf(prop) < 0 && __propIsEnum.call(source, prop))
        target[prop] = source[prop];
    }
  return target;
};
var _a;
import { i as isFunction$1, _ as __extends, S as Subscriber, a as Subscription, b as __spreadArray, c as __read, d as arrRemove, o as observable, e as __asyncGenerator, f as __generator, g as __await, O as Observable, r as reportUnhandledError, h as __awaiter, j as __values, k as __asyncValues, l as identity, P as PropTypes, m as react, n as deepmerge, p as formatMuiErrorMessage, q as capitalize, s as _extends$3, t as generateUtilityClass, u as generateUtilityClasses, v as _objectWithoutPropertiesLoose$1, w as composeClasses, x as jsx, y as clsx, z as reactDom, A as jsxs, B as propToStyleFunction, C as styleFunctionSx$1, D as createTheme$1, E as useTheme$1, T as ThemeContext, F as styled$2, G as useTheme$2, H as ThemeContext$1, I as useTheme$3, J as defaultTheme$1, K as createTheme$2, L as styled$3, M as useThemeProps, N as resolveBreakpointValues, Q as handleBreakpoints, R as Subject, U as BehaviorSubject, V as ClassNameGenerator, W as getAugmentedNamespace, X as jsxRuntime, Y as alpha, Z as React, $ as ReactDOM, a0 as keyframes, a1 as styledEngine, a2 as getDefaultExportFromCjs, a3 as ValueSubject, a4 as Fragment, a5 as pathBrowserify, a6 as projects$, a7 as CircularProgress, a8 as documents$, a9 as modifyDocument, aa as rootShouldForwardProp, ab as css, ac as lighten, ad as darken, ae as duration, af as GlobalStyles$1, ag as slotShouldForwardProp, ah as queuedDocuments$, ai as fetchingDocuments$, aj as getThemeProps, ak as contents$ } from "./main.js";
function hasLift(source) {
  return isFunction$1(source === null || source === void 0 ? void 0 : source.lift);
}
function operate(init2) {
  return function(source) {
    if (hasLift(source)) {
      return source.lift(function(liftedSource) {
        try {
          return init2(liftedSource, this);
        } catch (err) {
          this.error(err);
        }
      });
    }
    throw new TypeError("Unable to lift unknown Observable type");
  };
}
var OperatorSubscriber = function(_super) {
  __extends(OperatorSubscriber2, _super);
  function OperatorSubscriber2(destination, onNext, onComplete, onError, onFinalize) {
    var _this = _super.call(this, destination) || this;
    _this.onFinalize = onFinalize;
    _this._next = onNext ? function(value) {
      try {
        onNext(value);
      } catch (err) {
        destination.error(err);
      }
    } : _super.prototype._next;
    _this._error = onError ? function(err) {
      try {
        onError(err);
      } catch (err2) {
        destination.error(err2);
      } finally {
        this.unsubscribe();
      }
    } : _super.prototype._error;
    _this._complete = onComplete ? function() {
      try {
        onComplete();
      } catch (err) {
        destination.error(err);
      } finally {
        this.unsubscribe();
      }
    } : _super.prototype._complete;
    return _this;
  }
  OperatorSubscriber2.prototype.unsubscribe = function() {
    var _a2;
    var closed = this.closed;
    _super.prototype.unsubscribe.call(this);
    !closed && ((_a2 = this.onFinalize) === null || _a2 === void 0 ? void 0 : _a2.call(this));
  };
  return OperatorSubscriber2;
}(Subscriber);
var dateTimestampProvider = {
  now: function() {
    return (dateTimestampProvider.delegate || Date).now();
  },
  delegate: void 0
};
var Action = function(_super) {
  __extends(Action2, _super);
  function Action2(scheduler, work) {
    return _super.call(this) || this;
  }
  Action2.prototype.schedule = function(state, delay) {
    return this;
  };
  return Action2;
}(Subscription);
var intervalProvider = {
  setInterval: function() {
    var args = [];
    for (var _i = 0; _i < arguments.length; _i++) {
      args[_i] = arguments[_i];
    }
    var delegate = intervalProvider.delegate;
    return ((delegate === null || delegate === void 0 ? void 0 : delegate.setInterval) || setInterval).apply(void 0, __spreadArray([], __read(args)));
  },
  clearInterval: function(handle) {
    var delegate = intervalProvider.delegate;
    return ((delegate === null || delegate === void 0 ? void 0 : delegate.clearInterval) || clearInterval)(handle);
  },
  delegate: void 0
};
var AsyncAction = function(_super) {
  __extends(AsyncAction2, _super);
  function AsyncAction2(scheduler, work) {
    var _this = _super.call(this, scheduler, work) || this;
    _this.scheduler = scheduler;
    _this.work = work;
    _this.pending = false;
    return _this;
  }
  AsyncAction2.prototype.schedule = function(state, delay) {
    if (delay === void 0) {
      delay = 0;
    }
    if (this.closed) {
      return this;
    }
    this.state = state;
    var id = this.id;
    var scheduler = this.scheduler;
    if (id != null) {
      this.id = this.recycleAsyncId(scheduler, id, delay);
    }
    this.pending = true;
    this.delay = delay;
    this.id = this.id || this.requestAsyncId(scheduler, this.id, delay);
    return this;
  };
  AsyncAction2.prototype.requestAsyncId = function(scheduler, _id, delay) {
    if (delay === void 0) {
      delay = 0;
    }
    return intervalProvider.setInterval(scheduler.flush.bind(scheduler, this), delay);
  };
  AsyncAction2.prototype.recycleAsyncId = function(_scheduler, id, delay) {
    if (delay === void 0) {
      delay = 0;
    }
    if (delay != null && this.delay === delay && this.pending === false) {
      return id;
    }
    intervalProvider.clearInterval(id);
    return void 0;
  };
  AsyncAction2.prototype.execute = function(state, delay) {
    if (this.closed) {
      return new Error("executing a cancelled action");
    }
    this.pending = false;
    var error = this._execute(state, delay);
    if (error) {
      return error;
    } else if (this.pending === false && this.id != null) {
      this.id = this.recycleAsyncId(this.scheduler, this.id, null);
    }
  };
  AsyncAction2.prototype._execute = function(state, _delay) {
    var errored = false;
    var errorValue;
    try {
      this.work(state);
    } catch (e2) {
      errored = true;
      errorValue = e2 ? e2 : new Error("Scheduled action threw falsy error");
    }
    if (errored) {
      this.unsubscribe();
      return errorValue;
    }
  };
  AsyncAction2.prototype.unsubscribe = function() {
    if (!this.closed) {
      var _a2 = this, id = _a2.id, scheduler = _a2.scheduler;
      var actions = scheduler.actions;
      this.work = this.state = this.scheduler = null;
      this.pending = false;
      arrRemove(actions, this);
      if (id != null) {
        this.id = this.recycleAsyncId(scheduler, id, null);
      }
      this.delay = null;
      _super.prototype.unsubscribe.call(this);
    }
  };
  return AsyncAction2;
}(Action);
var Scheduler = function() {
  function Scheduler2(schedulerActionCtor, now) {
    if (now === void 0) {
      now = Scheduler2.now;
    }
    this.schedulerActionCtor = schedulerActionCtor;
    this.now = now;
  }
  Scheduler2.prototype.schedule = function(work, delay, state) {
    if (delay === void 0) {
      delay = 0;
    }
    return new this.schedulerActionCtor(this, work).schedule(state, delay);
  };
  Scheduler2.now = dateTimestampProvider.now;
  return Scheduler2;
}();
var AsyncScheduler = function(_super) {
  __extends(AsyncScheduler2, _super);
  function AsyncScheduler2(SchedulerAction, now) {
    if (now === void 0) {
      now = Scheduler.now;
    }
    var _this = _super.call(this, SchedulerAction, now) || this;
    _this.actions = [];
    _this._active = false;
    _this._scheduled = void 0;
    return _this;
  }
  AsyncScheduler2.prototype.flush = function(action) {
    var actions = this.actions;
    if (this._active) {
      actions.push(action);
      return;
    }
    var error;
    this._active = true;
    do {
      if (error = action.execute(action.state, action.delay)) {
        break;
      }
    } while (action = actions.shift());
    this._active = false;
    if (error) {
      while (action = actions.shift()) {
        action.unsubscribe();
      }
      throw error;
    }
  };
  return AsyncScheduler2;
}(Scheduler);
var asyncScheduler = new AsyncScheduler(AsyncAction);
function isScheduler(value) {
  return value && isFunction$1(value.schedule);
}
function last(arr) {
  return arr[arr.length - 1];
}
function popResultSelector(args) {
  return isFunction$1(last(args)) ? args.pop() : void 0;
}
function popScheduler(args) {
  return isScheduler(last(args)) ? args.pop() : void 0;
}
var isArrayLike = function(x) {
  return x && typeof x.length === "number" && typeof x !== "function";
};
function isPromise(value) {
  return isFunction$1(value === null || value === void 0 ? void 0 : value.then);
}
function isInteropObservable(input) {
  return isFunction$1(input[observable]);
}
function isAsyncIterable(obj) {
  return Symbol.asyncIterator && isFunction$1(obj === null || obj === void 0 ? void 0 : obj[Symbol.asyncIterator]);
}
function createInvalidObservableTypeError(input) {
  return new TypeError("You provided " + (input !== null && typeof input === "object" ? "an invalid object" : "'" + input + "'") + " where a stream was expected. You can provide an Observable, Promise, ReadableStream, Array, AsyncIterable, or Iterable.");
}
function getSymbolIterator() {
  if (typeof Symbol !== "function" || !Symbol.iterator) {
    return "@@iterator";
  }
  return Symbol.iterator;
}
var iterator = getSymbolIterator();
function isIterable(input) {
  return isFunction$1(input === null || input === void 0 ? void 0 : input[iterator]);
}
function readableStreamLikeToAsyncGenerator(readableStream) {
  return __asyncGenerator(this, arguments, function readableStreamLikeToAsyncGenerator_1() {
    var reader, _a2, value, done;
    return __generator(this, function(_b) {
      switch (_b.label) {
        case 0:
          reader = readableStream.getReader();
          _b.label = 1;
        case 1:
          _b.trys.push([1, , 9, 10]);
          _b.label = 2;
        case 2:
          return [4, __await(reader.read())];
        case 3:
          _a2 = _b.sent(), value = _a2.value, done = _a2.done;
          if (!done)
            return [3, 5];
          return [4, __await(void 0)];
        case 4:
          return [2, _b.sent()];
        case 5:
          return [4, __await(value)];
        case 6:
          return [4, _b.sent()];
        case 7:
          _b.sent();
          return [3, 2];
        case 8:
          return [3, 10];
        case 9:
          reader.releaseLock();
          return [7];
        case 10:
          return [2];
      }
    });
  });
}
function isReadableStreamLike(obj) {
  return isFunction$1(obj === null || obj === void 0 ? void 0 : obj.getReader);
}
function innerFrom(input) {
  if (input instanceof Observable) {
    return input;
  }
  if (input != null) {
    if (isInteropObservable(input)) {
      return fromInteropObservable(input);
    }
    if (isArrayLike(input)) {
      return fromArrayLike(input);
    }
    if (isPromise(input)) {
      return fromPromise(input);
    }
    if (isAsyncIterable(input)) {
      return fromAsyncIterable(input);
    }
    if (isIterable(input)) {
      return fromIterable(input);
    }
    if (isReadableStreamLike(input)) {
      return fromReadableStreamLike(input);
    }
  }
  throw createInvalidObservableTypeError(input);
}
function fromInteropObservable(obj) {
  return new Observable(function(subscriber) {
    var obs = obj[observable]();
    if (isFunction$1(obs.subscribe)) {
      return obs.subscribe(subscriber);
    }
    throw new TypeError("Provided object does not correctly implement Symbol.observable");
  });
}
function fromArrayLike(array) {
  return new Observable(function(subscriber) {
    for (var i = 0; i < array.length && !subscriber.closed; i++) {
      subscriber.next(array[i]);
    }
    subscriber.complete();
  });
}
function fromPromise(promise) {
  return new Observable(function(subscriber) {
    promise.then(function(value) {
      if (!subscriber.closed) {
        subscriber.next(value);
        subscriber.complete();
      }
    }, function(err) {
      return subscriber.error(err);
    }).then(null, reportUnhandledError);
  });
}
function fromIterable(iterable) {
  return new Observable(function(subscriber) {
    var e_1, _a2;
    try {
      for (var iterable_1 = __values(iterable), iterable_1_1 = iterable_1.next(); !iterable_1_1.done; iterable_1_1 = iterable_1.next()) {
        var value = iterable_1_1.value;
        subscriber.next(value);
        if (subscriber.closed) {
          return;
        }
      }
    } catch (e_1_1) {
      e_1 = { error: e_1_1 };
    } finally {
      try {
        if (iterable_1_1 && !iterable_1_1.done && (_a2 = iterable_1.return))
          _a2.call(iterable_1);
      } finally {
        if (e_1)
          throw e_1.error;
      }
    }
    subscriber.complete();
  });
}
function fromAsyncIterable(asyncIterable) {
  return new Observable(function(subscriber) {
    process(asyncIterable, subscriber).catch(function(err) {
      return subscriber.error(err);
    });
  });
}
function fromReadableStreamLike(readableStream) {
  return fromAsyncIterable(readableStreamLikeToAsyncGenerator(readableStream));
}
function process(asyncIterable, subscriber) {
  var asyncIterable_1, asyncIterable_1_1;
  var e_2, _a2;
  return __awaiter(this, void 0, void 0, function() {
    var value, e_2_1;
    return __generator(this, function(_b) {
      switch (_b.label) {
        case 0:
          _b.trys.push([0, 5, 6, 11]);
          asyncIterable_1 = __asyncValues(asyncIterable);
          _b.label = 1;
        case 1:
          return [4, asyncIterable_1.next()];
        case 2:
          if (!(asyncIterable_1_1 = _b.sent(), !asyncIterable_1_1.done))
            return [3, 4];
          value = asyncIterable_1_1.value;
          subscriber.next(value);
          if (subscriber.closed) {
            return [2];
          }
          _b.label = 3;
        case 3:
          return [3, 1];
        case 4:
          return [3, 11];
        case 5:
          e_2_1 = _b.sent();
          e_2 = { error: e_2_1 };
          return [3, 11];
        case 6:
          _b.trys.push([6, , 9, 10]);
          if (!(asyncIterable_1_1 && !asyncIterable_1_1.done && (_a2 = asyncIterable_1.return)))
            return [3, 8];
          return [4, _a2.call(asyncIterable_1)];
        case 7:
          _b.sent();
          _b.label = 8;
        case 8:
          return [3, 10];
        case 9:
          if (e_2)
            throw e_2.error;
          return [7];
        case 10:
          return [7];
        case 11:
          subscriber.complete();
          return [2];
      }
    });
  });
}
function executeSchedule(parentSubscription, scheduler, work, delay, repeat) {
  if (delay === void 0) {
    delay = 0;
  }
  if (repeat === void 0) {
    repeat = false;
  }
  var scheduleSubscription = scheduler.schedule(function() {
    work();
    if (repeat) {
      parentSubscription.add(this.schedule(null, delay));
    } else {
      this.unsubscribe();
    }
  }, delay);
  parentSubscription.add(scheduleSubscription);
  if (!repeat) {
    return scheduleSubscription;
  }
}
function observeOn(scheduler, delay) {
  if (delay === void 0) {
    delay = 0;
  }
  return operate(function(source, subscriber) {
    source.subscribe(new OperatorSubscriber(subscriber, function(value) {
      return executeSchedule(subscriber, scheduler, function() {
        return subscriber.next(value);
      }, delay);
    }, function() {
      return executeSchedule(subscriber, scheduler, function() {
        return subscriber.complete();
      }, delay);
    }, function(err) {
      return executeSchedule(subscriber, scheduler, function() {
        return subscriber.error(err);
      }, delay);
    }));
  });
}
function subscribeOn(scheduler, delay) {
  if (delay === void 0) {
    delay = 0;
  }
  return operate(function(source, subscriber) {
    subscriber.add(scheduler.schedule(function() {
      return source.subscribe(subscriber);
    }, delay));
  });
}
function scheduleObservable(input, scheduler) {
  return innerFrom(input).pipe(subscribeOn(scheduler), observeOn(scheduler));
}
function schedulePromise(input, scheduler) {
  return innerFrom(input).pipe(subscribeOn(scheduler), observeOn(scheduler));
}
function scheduleArray(input, scheduler) {
  return new Observable(function(subscriber) {
    var i = 0;
    return scheduler.schedule(function() {
      if (i === input.length) {
        subscriber.complete();
      } else {
        subscriber.next(input[i++]);
        if (!subscriber.closed) {
          this.schedule();
        }
      }
    });
  });
}
function scheduleIterable(input, scheduler) {
  return new Observable(function(subscriber) {
    var iterator$1;
    executeSchedule(subscriber, scheduler, function() {
      iterator$1 = input[iterator]();
      executeSchedule(subscriber, scheduler, function() {
        var _a2;
        var value;
        var done;
        try {
          _a2 = iterator$1.next(), value = _a2.value, done = _a2.done;
        } catch (err) {
          subscriber.error(err);
          return;
        }
        if (done) {
          subscriber.complete();
        } else {
          subscriber.next(value);
        }
      }, 0, true);
    });
    return function() {
      return isFunction$1(iterator$1 === null || iterator$1 === void 0 ? void 0 : iterator$1.return) && iterator$1.return();
    };
  });
}
function scheduleAsyncIterable(input, scheduler) {
  if (!input) {
    throw new Error("Iterable cannot be null");
  }
  return new Observable(function(subscriber) {
    executeSchedule(subscriber, scheduler, function() {
      var iterator2 = input[Symbol.asyncIterator]();
      executeSchedule(subscriber, scheduler, function() {
        iterator2.next().then(function(result) {
          if (result.done) {
            subscriber.complete();
          } else {
            subscriber.next(result.value);
          }
        });
      }, 0, true);
    });
  });
}
function scheduleReadableStreamLike(input, scheduler) {
  return scheduleAsyncIterable(readableStreamLikeToAsyncGenerator(input), scheduler);
}
function scheduled(input, scheduler) {
  if (input != null) {
    if (isInteropObservable(input)) {
      return scheduleObservable(input, scheduler);
    }
    if (isArrayLike(input)) {
      return scheduleArray(input, scheduler);
    }
    if (isPromise(input)) {
      return schedulePromise(input, scheduler);
    }
    if (isAsyncIterable(input)) {
      return scheduleAsyncIterable(input, scheduler);
    }
    if (isIterable(input)) {
      return scheduleIterable(input, scheduler);
    }
    if (isReadableStreamLike(input)) {
      return scheduleReadableStreamLike(input, scheduler);
    }
  }
  throw createInvalidObservableTypeError(input);
}
function from(input, scheduler) {
  return scheduler ? scheduled(input, scheduler) : innerFrom(input);
}
function isObservable(obj) {
  return !!obj && (obj instanceof Observable || isFunction$1(obj.lift) && isFunction$1(obj.subscribe));
}
function map(project, thisArg) {
  return operate(function(source, subscriber) {
    var index2 = 0;
    source.subscribe(new OperatorSubscriber(subscriber, function(value) {
      subscriber.next(project.call(thisArg, value, index2++));
    }));
  });
}
var isArray$1 = Array.isArray;
function callOrApply(fn2, args) {
  return isArray$1(args) ? fn2.apply(void 0, __spreadArray([], __read(args))) : fn2(args);
}
function mapOneOrManyArgs(fn2) {
  return map(function(args) {
    return callOrApply(fn2, args);
  });
}
var isArray = Array.isArray;
var getPrototypeOf = Object.getPrototypeOf, objectProto = Object.prototype, getKeys = Object.keys;
function argsArgArrayOrObject(args) {
  if (args.length === 1) {
    var first_1 = args[0];
    if (isArray(first_1)) {
      return { args: first_1, keys: null };
    }
    if (isPOJO(first_1)) {
      var keys = getKeys(first_1);
      return {
        args: keys.map(function(key) {
          return first_1[key];
        }),
        keys
      };
    }
  }
  return { args, keys: null };
}
function isPOJO(obj) {
  return obj && typeof obj === "object" && getPrototypeOf(obj) === objectProto;
}
function createObject(keys, values2) {
  return keys.reduce(function(result, key, i) {
    return result[key] = values2[i], result;
  }, {});
}
function combineLatest() {
  var args = [];
  for (var _i = 0; _i < arguments.length; _i++) {
    args[_i] = arguments[_i];
  }
  var scheduler = popScheduler(args);
  var resultSelector = popResultSelector(args);
  var _a2 = argsArgArrayOrObject(args), observables = _a2.args, keys = _a2.keys;
  if (observables.length === 0) {
    return from([], scheduler);
  }
  var result = new Observable(combineLatestInit(observables, scheduler, keys ? function(values2) {
    return createObject(keys, values2);
  } : identity));
  return resultSelector ? result.pipe(mapOneOrManyArgs(resultSelector)) : result;
}
function combineLatestInit(observables, scheduler, valueTransform) {
  if (valueTransform === void 0) {
    valueTransform = identity;
  }
  return function(subscriber) {
    maybeSchedule(scheduler, function() {
      var length = observables.length;
      var values2 = new Array(length);
      var active = length;
      var remainingFirstValues = length;
      var _loop_1 = function(i2) {
        maybeSchedule(scheduler, function() {
          var source = from(observables[i2], scheduler);
          var hasFirstValue = false;
          source.subscribe(new OperatorSubscriber(subscriber, function(value) {
            values2[i2] = value;
            if (!hasFirstValue) {
              hasFirstValue = true;
              remainingFirstValues--;
            }
            if (!remainingFirstValues) {
              subscriber.next(valueTransform(values2.slice()));
            }
          }, function() {
            if (!--active) {
              subscriber.complete();
            }
          }));
        }, subscriber);
      };
      for (var i = 0; i < length; i++) {
        _loop_1(i);
      }
    }, subscriber);
  };
}
function maybeSchedule(scheduler, execute, subscription) {
  if (scheduler) {
    executeSchedule(subscription, scheduler, execute);
  } else {
    execute();
  }
}
function mergeInternals(source, subscriber, project, concurrent, onBeforeNext, expand, innerSubScheduler, additionalTeardown) {
  var buffer = [];
  var active = 0;
  var index2 = 0;
  var isComplete = false;
  var checkComplete = function() {
    if (isComplete && !buffer.length && !active) {
      subscriber.complete();
    }
  };
  var outerNext = function(value) {
    return active < concurrent ? doInnerSub(value) : buffer.push(value);
  };
  var doInnerSub = function(value) {
    expand && subscriber.next(value);
    active++;
    var innerComplete = false;
    innerFrom(project(value, index2++)).subscribe(new OperatorSubscriber(subscriber, function(innerValue) {
      onBeforeNext === null || onBeforeNext === void 0 ? void 0 : onBeforeNext(innerValue);
      if (expand) {
        outerNext(innerValue);
      } else {
        subscriber.next(innerValue);
      }
    }, function() {
      innerComplete = true;
    }, void 0, function() {
      if (innerComplete) {
        try {
          active--;
          var _loop_1 = function() {
            var bufferedValue = buffer.shift();
            if (innerSubScheduler) {
              executeSchedule(subscriber, innerSubScheduler, function() {
                return doInnerSub(bufferedValue);
              });
            } else {
              doInnerSub(bufferedValue);
            }
          };
          while (buffer.length && active < concurrent) {
            _loop_1();
          }
          checkComplete();
        } catch (err) {
          subscriber.error(err);
        }
      }
    }));
  };
  source.subscribe(new OperatorSubscriber(subscriber, outerNext, function() {
    isComplete = true;
    checkComplete();
  }));
  return function() {
    additionalTeardown === null || additionalTeardown === void 0 ? void 0 : additionalTeardown();
  };
}
function mergeMap(project, resultSelector, concurrent) {
  if (concurrent === void 0) {
    concurrent = Infinity;
  }
  if (isFunction$1(resultSelector)) {
    return mergeMap(function(a, i) {
      return map(function(b2, ii) {
        return resultSelector(a, b2, i, ii);
      })(innerFrom(project(a, i)));
    }, concurrent);
  } else if (typeof resultSelector === "number") {
    concurrent = resultSelector;
  }
  return operate(function(source, subscriber) {
    return mergeInternals(source, subscriber, project, concurrent);
  });
}
function mergeAll(concurrent) {
  if (concurrent === void 0) {
    concurrent = Infinity;
  }
  return mergeMap(identity, concurrent);
}
function concatAll() {
  return mergeAll(1);
}
function concat() {
  var args = [];
  for (var _i = 0; _i < arguments.length; _i++) {
    args[_i] = arguments[_i];
  }
  return concatAll()(from(args, popScheduler(args)));
}
function debounceTime(dueTime, scheduler) {
  if (scheduler === void 0) {
    scheduler = asyncScheduler;
  }
  return operate(function(source, subscriber) {
    var activeTask = null;
    var lastValue = null;
    var lastTime = null;
    var emit = function() {
      if (activeTask) {
        activeTask.unsubscribe();
        activeTask = null;
        var value = lastValue;
        lastValue = null;
        subscriber.next(value);
      }
    };
    function emitWhenIdle() {
      var targetTime = lastTime + dueTime;
      var now = scheduler.now();
      if (now < targetTime) {
        activeTask = this.schedule(void 0, targetTime - now);
        subscriber.add(activeTask);
        return;
      }
      emit();
    }
    source.subscribe(new OperatorSubscriber(subscriber, function(value) {
      lastValue = value;
      lastTime = scheduler.now();
      if (!activeTask) {
        activeTask = scheduler.schedule(emitWhenIdle, dueTime);
        subscriber.add(activeTask);
      }
    }, function() {
      emit();
      subscriber.complete();
    }, void 0, function() {
      lastValue = activeTask = null;
    }));
  });
}
function startWith() {
  var values2 = [];
  for (var _i = 0; _i < arguments.length; _i++) {
    values2[_i] = arguments[_i];
  }
  var scheduler = popScheduler(values2);
  return operate(function(source, subscriber) {
    (scheduler ? concat(values2, source, scheduler) : concat(values2, source)).subscribe(subscriber);
  });
}
function chainPropTypes(propType1, propType2) {
  {
    return () => null;
  }
}
const elementAcceptingRef = chainPropTypes(PropTypes.element);
elementAcceptingRef.isRequired = chainPropTypes(PropTypes.element.isRequired);
var elementAcceptingRef$1 = elementAcceptingRef;
var elementTypeAcceptingRef = chainPropTypes(PropTypes.elementType);
function exactProp(propTypes) {
  {
    return propTypes;
  }
}
var reactIs = { exports: {} };
var reactIs_production_min$1 = {};
/** @license React v17.0.2
 * react-is.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var b$1 = 60103, c$1 = 60106, d$1 = 60107, e$1 = 60108, f$1 = 60114, g$1 = 60109, h$1 = 60110, k$1 = 60112, l$1 = 60113, m$1 = 60120, n$2 = 60115, p$1 = 60116, q$1 = 60121, r$2 = 60122, u$1 = 60117, v$1 = 60129, w$1 = 60131;
if (typeof Symbol === "function" && Symbol.for) {
  var x$1 = Symbol.for;
  b$1 = x$1("react.element");
  c$1 = x$1("react.portal");
  d$1 = x$1("react.fragment");
  e$1 = x$1("react.strict_mode");
  f$1 = x$1("react.profiler");
  g$1 = x$1("react.provider");
  h$1 = x$1("react.context");
  k$1 = x$1("react.forward_ref");
  l$1 = x$1("react.suspense");
  m$1 = x$1("react.suspense_list");
  n$2 = x$1("react.memo");
  p$1 = x$1("react.lazy");
  q$1 = x$1("react.block");
  r$2 = x$1("react.server.block");
  u$1 = x$1("react.fundamental");
  v$1 = x$1("react.debug_trace_mode");
  w$1 = x$1("react.legacy_hidden");
}
function y$1(a) {
  if (typeof a === "object" && a !== null) {
    var t2 = a.$$typeof;
    switch (t2) {
      case b$1:
        switch (a = a.type, a) {
          case d$1:
          case f$1:
          case e$1:
          case l$1:
          case m$1:
            return a;
          default:
            switch (a = a && a.$$typeof, a) {
              case h$1:
              case k$1:
              case p$1:
              case n$2:
              case g$1:
                return a;
              default:
                return t2;
            }
        }
      case c$1:
        return t2;
    }
  }
}
var z$1 = g$1, A$1 = b$1, B$2 = k$1, C$2 = d$1, D$1 = p$1, E$2 = n$2, F$2 = c$1, G$1 = f$1, H$2 = e$1, I$2 = l$1;
reactIs_production_min$1.ContextConsumer = h$1;
reactIs_production_min$1.ContextProvider = z$1;
reactIs_production_min$1.Element = A$1;
reactIs_production_min$1.ForwardRef = B$2;
reactIs_production_min$1.Fragment = C$2;
reactIs_production_min$1.Lazy = D$1;
reactIs_production_min$1.Memo = E$2;
reactIs_production_min$1.Portal = F$2;
reactIs_production_min$1.Profiler = G$1;
reactIs_production_min$1.StrictMode = H$2;
reactIs_production_min$1.Suspense = I$2;
reactIs_production_min$1.isAsyncMode = function() {
  return false;
};
reactIs_production_min$1.isConcurrentMode = function() {
  return false;
};
reactIs_production_min$1.isContextConsumer = function(a) {
  return y$1(a) === h$1;
};
reactIs_production_min$1.isContextProvider = function(a) {
  return y$1(a) === g$1;
};
reactIs_production_min$1.isElement = function(a) {
  return typeof a === "object" && a !== null && a.$$typeof === b$1;
};
reactIs_production_min$1.isForwardRef = function(a) {
  return y$1(a) === k$1;
};
reactIs_production_min$1.isFragment = function(a) {
  return y$1(a) === d$1;
};
reactIs_production_min$1.isLazy = function(a) {
  return y$1(a) === p$1;
};
reactIs_production_min$1.isMemo = function(a) {
  return y$1(a) === n$2;
};
reactIs_production_min$1.isPortal = function(a) {
  return y$1(a) === c$1;
};
reactIs_production_min$1.isProfiler = function(a) {
  return y$1(a) === f$1;
};
reactIs_production_min$1.isStrictMode = function(a) {
  return y$1(a) === e$1;
};
reactIs_production_min$1.isSuspense = function(a) {
  return y$1(a) === l$1;
};
reactIs_production_min$1.isValidElementType = function(a) {
  return typeof a === "string" || typeof a === "function" || a === d$1 || a === f$1 || a === v$1 || a === e$1 || a === l$1 || a === m$1 || a === w$1 || typeof a === "object" && a !== null && (a.$$typeof === p$1 || a.$$typeof === n$2 || a.$$typeof === g$1 || a.$$typeof === h$1 || a.$$typeof === k$1 || a.$$typeof === u$1 || a.$$typeof === q$1 || a[0] === r$2) ? true : false;
};
reactIs_production_min$1.typeOf = y$1;
{
  reactIs.exports = reactIs_production_min$1;
}
const fnNameMatchRegex = /^\s*function(?:\s|\s*\/\*.*\*\/\s*)+([^(\s/]*)\s*/;
function getFunctionName(fn2) {
  const match = `${fn2}`.match(fnNameMatchRegex);
  const name = match && match[1];
  return name || "";
}
function getFunctionComponentName(Component, fallback = "") {
  return Component.displayName || Component.name || getFunctionName(Component) || fallback;
}
function getWrappedName(outerType, innerType, wrapperName) {
  const functionName = getFunctionComponentName(innerType);
  return outerType.displayName || (functionName !== "" ? `${wrapperName}(${functionName})` : wrapperName);
}
function getDisplayName(Component) {
  if (Component == null) {
    return void 0;
  }
  if (typeof Component === "string") {
    return Component;
  }
  if (typeof Component === "function") {
    return getFunctionComponentName(Component, "Component");
  }
  if (typeof Component === "object") {
    switch (Component.$$typeof) {
      case reactIs.exports.ForwardRef:
        return getWrappedName(Component, Component.render, "ForwardRef");
      case reactIs.exports.Memo:
        return getWrappedName(Component, Component.type, "memo");
      default:
        return void 0;
    }
  }
  return void 0;
}
function HTMLElementType(props, propName, componentName, location, propFullName) {
  {
    return null;
  }
}
var ponyfillGlobal = typeof window != "undefined" && window.Math == Math ? window : typeof self != "undefined" && self.Math == Math ? self : Function("return this")();
const refType = PropTypes.oneOfType([PropTypes.func, PropTypes.object]);
var refType$1 = refType;
function createChainedFunction(...funcs) {
  return funcs.reduce((acc, func) => {
    if (func == null) {
      return acc;
    }
    return function chainedFunction(...args) {
      acc.apply(this, args);
      func.apply(this, args);
    };
  }, () => {
  });
}
function debounce$1(func, wait = 166) {
  let timeout;
  function debounced(...args) {
    const later = () => {
      func.apply(this, args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  }
  debounced.clear = () => {
    clearTimeout(timeout);
  };
  return debounced;
}
function deprecatedPropType(validator, reason) {
  {
    return () => null;
  }
}
function isMuiElement(element, muiNames) {
  return /* @__PURE__ */ react.exports.isValidElement(element) && muiNames.indexOf(element.type.muiName) !== -1;
}
function ownerDocument(node) {
  return node && node.ownerDocument || document;
}
function ownerWindow(node) {
  const doc = ownerDocument(node);
  return doc.defaultView || window;
}
function requirePropFactory(componentNameInError, Component) {
  {
    return () => null;
  }
}
function setRef(ref, value) {
  if (typeof ref === "function") {
    ref(value);
  } else if (ref) {
    ref.current = value;
  }
}
const useEnhancedEffect = typeof window !== "undefined" ? react.exports.useLayoutEffect : react.exports.useEffect;
var useEnhancedEffect$1 = useEnhancedEffect;
function useId(idOverride) {
  const [defaultId, setDefaultId] = react.exports.useState(idOverride);
  const id = idOverride || defaultId;
  react.exports.useEffect(() => {
    if (defaultId == null) {
      setDefaultId(`mui-${Math.round(Math.random() * 1e9)}`);
    }
  }, [defaultId]);
  return id;
}
function unsupportedProp(props, propName, componentName, location, propFullName) {
  {
    return null;
  }
}
function useControlled({
  controlled,
  default: defaultProp,
  name,
  state = "value"
}) {
  const {
    current: isControlled
  } = react.exports.useRef(controlled !== void 0);
  const [valueState, setValue] = react.exports.useState(defaultProp);
  const value = isControlled ? controlled : valueState;
  const setValueIfUncontrolled = react.exports.useCallback((newValue) => {
    if (!isControlled) {
      setValue(newValue);
    }
  }, []);
  return [value, setValueIfUncontrolled];
}
function useEventCallback(fn2) {
  const ref = react.exports.useRef(fn2);
  useEnhancedEffect$1(() => {
    ref.current = fn2;
  });
  return react.exports.useCallback((...args) => (0, ref.current)(...args), []);
}
function useForkRef(refA, refB) {
  return react.exports.useMemo(() => {
    if (refA == null && refB == null) {
      return null;
    }
    return (refValue) => {
      setRef(refA, refValue);
      setRef(refB, refValue);
    };
  }, [refA, refB]);
}
let hadKeyboardEvent = true;
let hadFocusVisibleRecently = false;
let hadFocusVisibleRecentlyTimeout = null;
const inputTypesWhitelist = {
  text: true,
  search: true,
  url: true,
  tel: true,
  email: true,
  password: true,
  number: true,
  date: true,
  month: true,
  week: true,
  time: true,
  datetime: true,
  "datetime-local": true
};
function focusTriggersKeyboardModality(node) {
  const {
    type,
    tagName
  } = node;
  if (tagName === "INPUT" && inputTypesWhitelist[type] && !node.readOnly) {
    return true;
  }
  if (tagName === "TEXTAREA" && !node.readOnly) {
    return true;
  }
  if (node.isContentEditable) {
    return true;
  }
  return false;
}
function handleKeyDown(event) {
  if (event.metaKey || event.altKey || event.ctrlKey) {
    return;
  }
  hadKeyboardEvent = true;
}
function handlePointerDown() {
  hadKeyboardEvent = false;
}
function handleVisibilityChange() {
  if (this.visibilityState === "hidden") {
    if (hadFocusVisibleRecently) {
      hadKeyboardEvent = true;
    }
  }
}
function prepare(doc) {
  doc.addEventListener("keydown", handleKeyDown, true);
  doc.addEventListener("mousedown", handlePointerDown, true);
  doc.addEventListener("pointerdown", handlePointerDown, true);
  doc.addEventListener("touchstart", handlePointerDown, true);
  doc.addEventListener("visibilitychange", handleVisibilityChange, true);
}
function isFocusVisible(event) {
  const {
    target
  } = event;
  try {
    return target.matches(":focus-visible");
  } catch (error) {
  }
  return hadKeyboardEvent || focusTriggersKeyboardModality(target);
}
function useIsFocusVisible() {
  const ref = react.exports.useCallback((node) => {
    if (node != null) {
      prepare(node.ownerDocument);
    }
  }, []);
  const isFocusVisibleRef = react.exports.useRef(false);
  function handleBlurVisible() {
    if (isFocusVisibleRef.current) {
      hadFocusVisibleRecently = true;
      window.clearTimeout(hadFocusVisibleRecentlyTimeout);
      hadFocusVisibleRecentlyTimeout = window.setTimeout(() => {
        hadFocusVisibleRecently = false;
      }, 100);
      isFocusVisibleRef.current = false;
      return true;
    }
    return false;
  }
  function handleFocusVisible(event) {
    if (isFocusVisible(event)) {
      isFocusVisibleRef.current = true;
      return true;
    }
    return false;
  }
  return {
    isFocusVisibleRef,
    onFocus: handleFocusVisible,
    onBlur: handleBlurVisible,
    ref
  };
}
function getScrollbarSize(doc) {
  const documentWidth = doc.documentElement.clientWidth;
  return Math.abs(window.innerWidth - documentWidth);
}
let cachedType;
function detectScrollType() {
  if (cachedType) {
    return cachedType;
  }
  const dummy = document.createElement("div");
  const container = document.createElement("div");
  container.style.width = "10px";
  container.style.height = "1px";
  dummy.appendChild(container);
  dummy.dir = "rtl";
  dummy.style.fontSize = "14px";
  dummy.style.width = "4px";
  dummy.style.height = "1px";
  dummy.style.position = "absolute";
  dummy.style.top = "-1000px";
  dummy.style.overflow = "scroll";
  document.body.appendChild(dummy);
  cachedType = "reverse";
  if (dummy.scrollLeft > 0) {
    cachedType = "default";
  } else {
    dummy.scrollLeft = 1;
    if (dummy.scrollLeft === 0) {
      cachedType = "negative";
    }
  }
  document.body.removeChild(dummy);
  return cachedType;
}
function getNormalizedScrollLeft(element, direction) {
  const scrollLeft = element.scrollLeft;
  if (direction !== "rtl") {
    return scrollLeft;
  }
  const type = detectScrollType();
  switch (type) {
    case "negative":
      return element.scrollWidth - element.clientWidth + scrollLeft;
    case "reverse":
      return element.scrollWidth - element.clientWidth - scrollLeft;
    default:
      return scrollLeft;
  }
}
const usePreviousProps = (value) => {
  const ref = react.exports.useRef({});
  react.exports.useEffect(() => {
    ref.current = value;
  });
  return ref.current;
};
var usePreviousProps$1 = usePreviousProps;
const visuallyHidden = {
  border: 0,
  clip: "rect(0 0 0 0)",
  height: "1px",
  margin: -1,
  overflow: "hidden",
  padding: 0,
  position: "absolute",
  whiteSpace: "nowrap",
  width: "1px"
};
var visuallyHidden$1 = visuallyHidden;
function validatorNoop() {
  return null;
}
validatorNoop.isRequired = validatorNoop;
var integerPropType = validatorNoop;
var esm = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  [Symbol.toStringTag]: "Module",
  chainPropTypes,
  deepmerge,
  elementAcceptingRef: elementAcceptingRef$1,
  elementTypeAcceptingRef,
  exactProp,
  formatMuiErrorMessage,
  getDisplayName,
  HTMLElementType,
  ponyfillGlobal,
  refType: refType$1,
  unstable_capitalize: capitalize,
  unstable_createChainedFunction: createChainedFunction,
  unstable_debounce: debounce$1,
  unstable_deprecatedPropType: deprecatedPropType,
  unstable_isMuiElement: isMuiElement,
  unstable_ownerDocument: ownerDocument,
  unstable_ownerWindow: ownerWindow,
  unstable_requirePropFactory: requirePropFactory,
  unstable_setRef: setRef,
  unstable_useEnhancedEffect: useEnhancedEffect$1,
  unstable_useId: useId,
  unstable_unsupportedProp: unsupportedProp,
  unstable_useControlled: useControlled,
  unstable_useEventCallback: useEventCallback,
  unstable_useForkRef: useForkRef,
  unstable_useIsFocusVisible: useIsFocusVisible,
  unstable_getScrollbarSize: getScrollbarSize,
  unstable_detectScrollType: detectScrollType,
  unstable_getNormalizedScrollLeft: getNormalizedScrollLeft,
  usePreviousProps: usePreviousProps$1,
  visuallyHidden: visuallyHidden$1,
  integerPropType
});
function stripDiacritics(string) {
  return typeof string.normalize !== "undefined" ? string.normalize("NFD").replace(/[\u0300-\u036f]/g, "") : string;
}
function createFilterOptions(config2 = {}) {
  const {
    ignoreAccents = true,
    ignoreCase = true,
    limit,
    matchFrom = "any",
    stringify,
    trim = false
  } = config2;
  return (options, {
    inputValue,
    getOptionLabel
  }) => {
    let input = trim ? inputValue.trim() : inputValue;
    if (ignoreCase) {
      input = input.toLowerCase();
    }
    if (ignoreAccents) {
      input = stripDiacritics(input);
    }
    const filteredOptions = options.filter((option) => {
      let candidate = (stringify || getOptionLabel)(option);
      if (ignoreCase) {
        candidate = candidate.toLowerCase();
      }
      if (ignoreAccents) {
        candidate = stripDiacritics(candidate);
      }
      return matchFrom === "start" ? candidate.indexOf(input) === 0 : candidate.indexOf(input) > -1;
    });
    return typeof limit === "number" ? filteredOptions.slice(0, limit) : filteredOptions;
  };
}
function findIndex$1(array, comp) {
  for (let i = 0; i < array.length; i += 1) {
    if (comp(array[i])) {
      return i;
    }
  }
  return -1;
}
const defaultFilterOptions = createFilterOptions();
const pageSize = 5;
function useAutocomplete(props) {
  const {
    autoComplete = false,
    autoHighlight = false,
    autoSelect = false,
    blurOnSelect = false,
    disabled: disabledProp,
    clearOnBlur = !props.freeSolo,
    clearOnEscape = false,
    componentName = "useAutocomplete",
    defaultValue = props.multiple ? [] : null,
    disableClearable = false,
    disableCloseOnSelect = false,
    disabledItemsFocusable = false,
    disableListWrap = false,
    filterOptions = defaultFilterOptions,
    filterSelectedOptions = false,
    freeSolo = false,
    getOptionDisabled,
    getOptionLabel: getOptionLabelProp = (option) => {
      var _option$label;
      return (_option$label = option.label) != null ? _option$label : option;
    },
    isOptionEqualToValue = (option, value2) => option === value2,
    groupBy,
    handleHomeEndKeys = !props.freeSolo,
    id: idProp,
    includeInputInList = false,
    inputValue: inputValueProp,
    multiple = false,
    onChange,
    onClose,
    onHighlightChange,
    onInputChange,
    onOpen,
    open: openProp,
    openOnFocus = false,
    options,
    selectOnFocus = !props.freeSolo,
    value: valueProp
  } = props;
  const id = useId(idProp);
  let getOptionLabel = getOptionLabelProp;
  getOptionLabel = (option) => {
    const optionLabel = getOptionLabelProp(option);
    if (typeof optionLabel !== "string") {
      return String(optionLabel);
    }
    return optionLabel;
  };
  const ignoreFocus = react.exports.useRef(false);
  const firstFocus = react.exports.useRef(true);
  const inputRef = react.exports.useRef(null);
  const listboxRef = react.exports.useRef(null);
  const [anchorEl, setAnchorEl] = react.exports.useState(null);
  const [focusedTag, setFocusedTag] = react.exports.useState(-1);
  const defaultHighlighted = autoHighlight ? 0 : -1;
  const highlightedIndexRef = react.exports.useRef(defaultHighlighted);
  const [value, setValueState] = useControlled({
    controlled: valueProp,
    default: defaultValue,
    name: componentName
  });
  const [inputValue, setInputValueState] = useControlled({
    controlled: inputValueProp,
    default: "",
    name: componentName,
    state: "inputValue"
  });
  const [focused, setFocused] = react.exports.useState(false);
  const resetInputValue = react.exports.useCallback((event, newValue) => {
    const isOptionSelected = multiple ? value.length < newValue.length : newValue !== null;
    if (!isOptionSelected && !clearOnBlur) {
      return;
    }
    let newInputValue;
    if (multiple) {
      newInputValue = "";
    } else if (newValue == null) {
      newInputValue = "";
    } else {
      const optionLabel = getOptionLabel(newValue);
      newInputValue = typeof optionLabel === "string" ? optionLabel : "";
    }
    if (inputValue === newInputValue) {
      return;
    }
    setInputValueState(newInputValue);
    if (onInputChange) {
      onInputChange(event, newInputValue, "reset");
    }
  }, [getOptionLabel, inputValue, multiple, onInputChange, setInputValueState, clearOnBlur, value]);
  const prevValue = react.exports.useRef();
  react.exports.useEffect(() => {
    const valueChange = value !== prevValue.current;
    prevValue.current = value;
    if (focused && !valueChange) {
      return;
    }
    if (freeSolo && !valueChange) {
      return;
    }
    resetInputValue(null, value);
  }, [value, resetInputValue, focused, prevValue, freeSolo]);
  const [open, setOpenState] = useControlled({
    controlled: openProp,
    default: false,
    name: componentName,
    state: "open"
  });
  const [inputPristine, setInputPristine] = react.exports.useState(true);
  const inputValueIsSelectedValue = !multiple && value != null && inputValue === getOptionLabel(value);
  const popupOpen = open;
  const filteredOptions = popupOpen ? filterOptions(options.filter((option) => {
    if (filterSelectedOptions && (multiple ? value : [value]).some((value2) => value2 !== null && isOptionEqualToValue(option, value2))) {
      return false;
    }
    return true;
  }), {
    inputValue: inputValueIsSelectedValue && inputPristine ? "" : inputValue,
    getOptionLabel
  }) : [];
  const listboxAvailable = open && filteredOptions.length > 0;
  const focusTag = useEventCallback((tagToFocus) => {
    if (tagToFocus === -1) {
      inputRef.current.focus();
    } else {
      anchorEl.querySelector(`[data-tag-index="${tagToFocus}"]`).focus();
    }
  });
  react.exports.useEffect(() => {
    if (multiple && focusedTag > value.length - 1) {
      setFocusedTag(-1);
      focusTag(-1);
    }
  }, [value, multiple, focusedTag, focusTag]);
  function validOptionIndex(index2, direction) {
    if (!listboxRef.current || index2 === -1) {
      return -1;
    }
    let nextFocus = index2;
    while (true) {
      if (direction === "next" && nextFocus === filteredOptions.length || direction === "previous" && nextFocus === -1) {
        return -1;
      }
      const option = listboxRef.current.querySelector(`[data-option-index="${nextFocus}"]`);
      const nextFocusDisabled = disabledItemsFocusable ? false : !option || option.disabled || option.getAttribute("aria-disabled") === "true";
      if (option && !option.hasAttribute("tabindex") || nextFocusDisabled) {
        nextFocus += direction === "next" ? 1 : -1;
      } else {
        return nextFocus;
      }
    }
  }
  const setHighlightedIndex = useEventCallback(({
    event,
    index: index2,
    reason = "auto"
  }) => {
    highlightedIndexRef.current = index2;
    if (index2 === -1) {
      inputRef.current.removeAttribute("aria-activedescendant");
    } else {
      inputRef.current.setAttribute("aria-activedescendant", `${id}-option-${index2}`);
    }
    if (onHighlightChange) {
      onHighlightChange(event, index2 === -1 ? null : filteredOptions[index2], reason);
    }
    if (!listboxRef.current) {
      return;
    }
    const prev = listboxRef.current.querySelector('[role="option"].Mui-focused');
    if (prev) {
      prev.classList.remove("Mui-focused");
      prev.classList.remove("Mui-focusVisible");
    }
    const listboxNode = listboxRef.current.parentElement.querySelector('[role="listbox"]');
    if (!listboxNode) {
      return;
    }
    if (index2 === -1) {
      listboxNode.scrollTop = 0;
      return;
    }
    const option = listboxRef.current.querySelector(`[data-option-index="${index2}"]`);
    if (!option) {
      return;
    }
    option.classList.add("Mui-focused");
    if (reason === "keyboard") {
      option.classList.add("Mui-focusVisible");
    }
    if (listboxNode.scrollHeight > listboxNode.clientHeight && reason !== "mouse") {
      const element = option;
      const scrollBottom = listboxNode.clientHeight + listboxNode.scrollTop;
      const elementBottom = element.offsetTop + element.offsetHeight;
      if (elementBottom > scrollBottom) {
        listboxNode.scrollTop = elementBottom - listboxNode.clientHeight;
      } else if (element.offsetTop - element.offsetHeight * (groupBy ? 1.3 : 0) < listboxNode.scrollTop) {
        listboxNode.scrollTop = element.offsetTop - element.offsetHeight * (groupBy ? 1.3 : 0);
      }
    }
  });
  const changeHighlightedIndex = useEventCallback(({
    event,
    diff,
    direction = "next",
    reason = "auto"
  }) => {
    if (!popupOpen) {
      return;
    }
    const getNextIndex = () => {
      const maxIndex = filteredOptions.length - 1;
      if (diff === "reset") {
        return defaultHighlighted;
      }
      if (diff === "start") {
        return 0;
      }
      if (diff === "end") {
        return maxIndex;
      }
      const newIndex = highlightedIndexRef.current + diff;
      if (newIndex < 0) {
        if (newIndex === -1 && includeInputInList) {
          return -1;
        }
        if (disableListWrap && highlightedIndexRef.current !== -1 || Math.abs(diff) > 1) {
          return 0;
        }
        return maxIndex;
      }
      if (newIndex > maxIndex) {
        if (newIndex === maxIndex + 1 && includeInputInList) {
          return -1;
        }
        if (disableListWrap || Math.abs(diff) > 1) {
          return maxIndex;
        }
        return 0;
      }
      return newIndex;
    };
    const nextIndex = validOptionIndex(getNextIndex(), direction);
    setHighlightedIndex({
      index: nextIndex,
      reason,
      event
    });
    if (autoComplete && diff !== "reset") {
      if (nextIndex === -1) {
        inputRef.current.value = inputValue;
      } else {
        const option = getOptionLabel(filteredOptions[nextIndex]);
        inputRef.current.value = option;
        const index2 = option.toLowerCase().indexOf(inputValue.toLowerCase());
        if (index2 === 0 && inputValue.length > 0) {
          inputRef.current.setSelectionRange(inputValue.length, option.length);
        }
      }
    }
  });
  const syncHighlightedIndex = react.exports.useCallback(() => {
    if (!popupOpen) {
      return;
    }
    const valueItem = multiple ? value[0] : value;
    if (filteredOptions.length === 0 || valueItem == null) {
      changeHighlightedIndex({
        diff: "reset"
      });
      return;
    }
    if (!listboxRef.current) {
      return;
    }
    if (valueItem != null) {
      const currentOption = filteredOptions[highlightedIndexRef.current];
      if (multiple && currentOption && findIndex$1(value, (val) => isOptionEqualToValue(currentOption, val)) !== -1) {
        return;
      }
      const itemIndex = findIndex$1(filteredOptions, (optionItem) => isOptionEqualToValue(optionItem, valueItem));
      if (itemIndex === -1) {
        changeHighlightedIndex({
          diff: "reset"
        });
      } else {
        setHighlightedIndex({
          index: itemIndex
        });
      }
      return;
    }
    if (highlightedIndexRef.current >= filteredOptions.length - 1) {
      setHighlightedIndex({
        index: filteredOptions.length - 1
      });
      return;
    }
    setHighlightedIndex({
      index: highlightedIndexRef.current
    });
  }, [
    filteredOptions.length,
    multiple ? false : value,
    filterSelectedOptions,
    changeHighlightedIndex,
    setHighlightedIndex,
    popupOpen,
    inputValue,
    multiple
  ]);
  const handleListboxRef = useEventCallback((node) => {
    setRef(listboxRef, node);
    if (!node) {
      return;
    }
    syncHighlightedIndex();
  });
  react.exports.useEffect(() => {
    syncHighlightedIndex();
  }, [syncHighlightedIndex]);
  const handleOpen = (event) => {
    if (open) {
      return;
    }
    setOpenState(true);
    setInputPristine(true);
    if (onOpen) {
      onOpen(event);
    }
  };
  const handleClose = (event, reason) => {
    if (!open) {
      return;
    }
    setOpenState(false);
    if (onClose) {
      onClose(event, reason);
    }
  };
  const handleValue = (event, newValue, reason, details) => {
    if (value === newValue) {
      return;
    }
    if (onChange) {
      onChange(event, newValue, reason, details);
    }
    setValueState(newValue);
  };
  const isTouch = react.exports.useRef(false);
  const selectNewValue = (event, option, reasonProp = "selectOption", origin = "options") => {
    let reason = reasonProp;
    let newValue = option;
    if (multiple) {
      newValue = Array.isArray(value) ? value.slice() : [];
      const itemIndex = findIndex$1(newValue, (valueItem) => isOptionEqualToValue(option, valueItem));
      if (itemIndex === -1) {
        newValue.push(option);
      } else if (origin !== "freeSolo") {
        newValue.splice(itemIndex, 1);
        reason = "removeOption";
      }
    }
    resetInputValue(event, newValue);
    handleValue(event, newValue, reason, {
      option
    });
    if (!disableCloseOnSelect && !event.ctrlKey && !event.metaKey) {
      handleClose(event, reason);
    }
    if (blurOnSelect === true || blurOnSelect === "touch" && isTouch.current || blurOnSelect === "mouse" && !isTouch.current) {
      inputRef.current.blur();
    }
  };
  function validTagIndex(index2, direction) {
    if (index2 === -1) {
      return -1;
    }
    let nextFocus = index2;
    while (true) {
      if (direction === "next" && nextFocus === value.length || direction === "previous" && nextFocus === -1) {
        return -1;
      }
      const option = anchorEl.querySelector(`[data-tag-index="${nextFocus}"]`);
      if (!option || !option.hasAttribute("tabindex") || option.disabled || option.getAttribute("aria-disabled") === "true") {
        nextFocus += direction === "next" ? 1 : -1;
      } else {
        return nextFocus;
      }
    }
  }
  const handleFocusTag = (event, direction) => {
    if (!multiple) {
      return;
    }
    handleClose(event, "toggleInput");
    let nextTag = focusedTag;
    if (focusedTag === -1) {
      if (inputValue === "" && direction === "previous") {
        nextTag = value.length - 1;
      }
    } else {
      nextTag += direction === "next" ? 1 : -1;
      if (nextTag < 0) {
        nextTag = 0;
      }
      if (nextTag === value.length) {
        nextTag = -1;
      }
    }
    nextTag = validTagIndex(nextTag, direction);
    setFocusedTag(nextTag);
    focusTag(nextTag);
  };
  const handleClear = (event) => {
    ignoreFocus.current = true;
    setInputValueState("");
    if (onInputChange) {
      onInputChange(event, "", "clear");
    }
    handleValue(event, multiple ? [] : null, "clear");
  };
  const handleKeyDown2 = (other) => (event) => {
    if (other.onKeyDown) {
      other.onKeyDown(event);
    }
    if (event.defaultMuiPrevented) {
      return;
    }
    if (focusedTag !== -1 && ["ArrowLeft", "ArrowRight"].indexOf(event.key) === -1) {
      setFocusedTag(-1);
      focusTag(-1);
    }
    if (event.which !== 229) {
      switch (event.key) {
        case "Home":
          if (popupOpen && handleHomeEndKeys) {
            event.preventDefault();
            changeHighlightedIndex({
              diff: "start",
              direction: "next",
              reason: "keyboard",
              event
            });
          }
          break;
        case "End":
          if (popupOpen && handleHomeEndKeys) {
            event.preventDefault();
            changeHighlightedIndex({
              diff: "end",
              direction: "previous",
              reason: "keyboard",
              event
            });
          }
          break;
        case "PageUp":
          event.preventDefault();
          changeHighlightedIndex({
            diff: -pageSize,
            direction: "previous",
            reason: "keyboard",
            event
          });
          handleOpen(event);
          break;
        case "PageDown":
          event.preventDefault();
          changeHighlightedIndex({
            diff: pageSize,
            direction: "next",
            reason: "keyboard",
            event
          });
          handleOpen(event);
          break;
        case "ArrowDown":
          event.preventDefault();
          changeHighlightedIndex({
            diff: 1,
            direction: "next",
            reason: "keyboard",
            event
          });
          handleOpen(event);
          break;
        case "ArrowUp":
          event.preventDefault();
          changeHighlightedIndex({
            diff: -1,
            direction: "previous",
            reason: "keyboard",
            event
          });
          handleOpen(event);
          break;
        case "ArrowLeft":
          handleFocusTag(event, "previous");
          break;
        case "ArrowRight":
          handleFocusTag(event, "next");
          break;
        case "Enter":
          if (highlightedIndexRef.current !== -1 && popupOpen) {
            const option = filteredOptions[highlightedIndexRef.current];
            const disabled = getOptionDisabled ? getOptionDisabled(option) : false;
            event.preventDefault();
            if (disabled) {
              return;
            }
            selectNewValue(event, option, "selectOption");
            if (autoComplete) {
              inputRef.current.setSelectionRange(inputRef.current.value.length, inputRef.current.value.length);
            }
          } else if (freeSolo && inputValue !== "" && inputValueIsSelectedValue === false) {
            if (multiple) {
              event.preventDefault();
            }
            selectNewValue(event, inputValue, "createOption", "freeSolo");
          }
          break;
        case "Escape":
          if (popupOpen) {
            event.preventDefault();
            event.stopPropagation();
            handleClose(event, "escape");
          } else if (clearOnEscape && (inputValue !== "" || multiple && value.length > 0)) {
            event.preventDefault();
            event.stopPropagation();
            handleClear(event);
          }
          break;
        case "Backspace":
          if (multiple && inputValue === "" && value.length > 0) {
            const index2 = focusedTag === -1 ? value.length - 1 : focusedTag;
            const newValue = value.slice();
            newValue.splice(index2, 1);
            handleValue(event, newValue, "removeOption", {
              option: value[index2]
            });
          }
          break;
      }
    }
  };
  const handleFocus = (event) => {
    setFocused(true);
    if (openOnFocus && !ignoreFocus.current) {
      handleOpen(event);
    }
  };
  const handleBlur = (event) => {
    if (listboxRef.current !== null && listboxRef.current.parentElement.contains(document.activeElement)) {
      inputRef.current.focus();
      return;
    }
    setFocused(false);
    firstFocus.current = true;
    ignoreFocus.current = false;
    if (autoSelect && highlightedIndexRef.current !== -1 && popupOpen) {
      selectNewValue(event, filteredOptions[highlightedIndexRef.current], "blur");
    } else if (autoSelect && freeSolo && inputValue !== "") {
      selectNewValue(event, inputValue, "blur", "freeSolo");
    } else if (clearOnBlur) {
      resetInputValue(event, value);
    }
    handleClose(event, "blur");
  };
  const handleInputChange = (event) => {
    const newValue = event.target.value;
    if (inputValue !== newValue) {
      setInputValueState(newValue);
      setInputPristine(false);
      if (onInputChange) {
        onInputChange(event, newValue, "input");
      }
    }
    if (newValue === "") {
      if (!disableClearable && !multiple) {
        handleValue(event, null, "clear");
      }
    } else {
      handleOpen(event);
    }
  };
  const handleOptionMouseOver = (event) => {
    setHighlightedIndex({
      event,
      index: Number(event.currentTarget.getAttribute("data-option-index")),
      reason: "mouse"
    });
  };
  const handleOptionTouchStart = () => {
    isTouch.current = true;
  };
  const handleOptionClick = (event) => {
    const index2 = Number(event.currentTarget.getAttribute("data-option-index"));
    selectNewValue(event, filteredOptions[index2], "selectOption");
    isTouch.current = false;
  };
  const handleTagDelete = (index2) => (event) => {
    const newValue = value.slice();
    newValue.splice(index2, 1);
    handleValue(event, newValue, "removeOption", {
      option: value[index2]
    });
  };
  const handlePopupIndicator = (event) => {
    if (open) {
      handleClose(event, "toggleInput");
    } else {
      handleOpen(event);
    }
  };
  const handleMouseDown = (event) => {
    if (event.target.getAttribute("id") !== id) {
      event.preventDefault();
    }
  };
  const handleClick = () => {
    inputRef.current.focus();
    if (selectOnFocus && firstFocus.current && inputRef.current.selectionEnd - inputRef.current.selectionStart === 0) {
      inputRef.current.select();
    }
    firstFocus.current = false;
  };
  const handleInputMouseDown = (event) => {
    if (inputValue === "" || !open) {
      handlePopupIndicator(event);
    }
  };
  let dirty = freeSolo && inputValue.length > 0;
  dirty = dirty || (multiple ? value.length > 0 : value !== null);
  let groupedOptions = filteredOptions;
  if (groupBy) {
    groupedOptions = filteredOptions.reduce((acc, option, index2) => {
      const group = groupBy(option);
      if (acc.length > 0 && acc[acc.length - 1].group === group) {
        acc[acc.length - 1].options.push(option);
      } else {
        acc.push({
          key: index2,
          index: index2,
          group,
          options: [option]
        });
      }
      return acc;
    }, []);
  }
  if (disabledProp && focused) {
    handleBlur();
  }
  return {
    getRootProps: (other = {}) => _extends$3({
      "aria-owns": listboxAvailable ? `${id}-listbox` : null,
      role: "combobox",
      "aria-expanded": listboxAvailable
    }, other, {
      onKeyDown: handleKeyDown2(other),
      onMouseDown: handleMouseDown,
      onClick: handleClick
    }),
    getInputLabelProps: () => ({
      id: `${id}-label`,
      htmlFor: id
    }),
    getInputProps: () => ({
      id,
      value: inputValue,
      onBlur: handleBlur,
      onFocus: handleFocus,
      onChange: handleInputChange,
      onMouseDown: handleInputMouseDown,
      "aria-activedescendant": popupOpen ? "" : null,
      "aria-autocomplete": autoComplete ? "both" : "list",
      "aria-controls": listboxAvailable ? `${id}-listbox` : null,
      autoComplete: "off",
      ref: inputRef,
      autoCapitalize: "none",
      spellCheck: "false"
    }),
    getClearProps: () => ({
      tabIndex: -1,
      onClick: handleClear
    }),
    getPopupIndicatorProps: () => ({
      tabIndex: -1,
      onClick: handlePopupIndicator
    }),
    getTagProps: ({
      index: index2
    }) => ({
      key: index2,
      "data-tag-index": index2,
      tabIndex: -1,
      onDelete: handleTagDelete(index2)
    }),
    getListboxProps: () => ({
      role: "listbox",
      id: `${id}-listbox`,
      "aria-labelledby": `${id}-label`,
      ref: handleListboxRef,
      onMouseDown: (event) => {
        event.preventDefault();
      }
    }),
    getOptionProps: ({
      index: index2,
      option
    }) => {
      const selected = (multiple ? value : [value]).some((value2) => value2 != null && isOptionEqualToValue(option, value2));
      const disabled = getOptionDisabled ? getOptionDisabled(option) : false;
      return {
        key: getOptionLabel(option),
        tabIndex: -1,
        role: "option",
        id: `${id}-option-${index2}`,
        onMouseOver: handleOptionMouseOver,
        onClick: handleOptionClick,
        onTouchStart: handleOptionTouchStart,
        "data-option-index": index2,
        "aria-disabled": disabled,
        "aria-selected": selected
      };
    },
    id,
    inputValue,
    value,
    dirty,
    popupOpen,
    focused: focused || focusedTag !== -1,
    anchorEl,
    setAnchorEl,
    focusedTag,
    groupedOptions
  };
}
function isHostComponent(element) {
  return typeof element === "string";
}
function getBackdropUtilityClass(slot) {
  return generateUtilityClass("MuiBackdrop", slot);
}
generateUtilityClasses("MuiBackdrop", ["root", "invisible"]);
const _excluded$Y = ["classes", "className", "invisible", "component", "components", "componentsProps", "theme"];
const useUtilityClasses$I = (ownerState) => {
  const {
    classes,
    invisible
  } = ownerState;
  const slots = {
    root: ["root", invisible && "invisible"]
  };
  return composeClasses(slots, getBackdropUtilityClass, classes);
};
const BackdropUnstyled = /* @__PURE__ */ react.exports.forwardRef(function BackdropUnstyled2(props, ref) {
  const {
    classes: classesProp,
    className,
    invisible = false,
    component = "div",
    components = {},
    componentsProps = {},
    theme: theme2
  } = props, other = _objectWithoutPropertiesLoose$1(props, _excluded$Y);
  const ownerState = _extends$3({}, props, {
    classes: classesProp,
    invisible
  });
  const classes = useUtilityClasses$I(ownerState);
  const Root = components.Root || component;
  const rootProps = componentsProps.root || {};
  return /* @__PURE__ */ jsx(Root, _extends$3({
    "aria-hidden": true
  }, rootProps, !isHostComponent(Root) && {
    as: component,
    ownerState: _extends$3({}, ownerState, rootProps.ownerState),
    theme: theme2
  }, {
    ref
  }, other, {
    className: clsx(classes.root, rootProps.className, className)
  }));
});
var BackdropUnstyled$1 = BackdropUnstyled;
function appendOwnerState(elementType, existingProps, ownerState) {
  if (isHostComponent(elementType)) {
    return existingProps;
  }
  return _extends$3({}, existingProps, {
    ownerState: _extends$3({}, existingProps.ownerState, ownerState)
  });
}
function getContainer$1(container) {
  return typeof container === "function" ? container() : container;
}
const Portal = /* @__PURE__ */ react.exports.forwardRef(function Portal2(props, ref) {
  const {
    children,
    container,
    disablePortal = false
  } = props;
  const [mountNode, setMountNode] = react.exports.useState(null);
  const handleRef = useForkRef(/* @__PURE__ */ react.exports.isValidElement(children) ? children.ref : null, ref);
  useEnhancedEffect$1(() => {
    if (!disablePortal) {
      setMountNode(getContainer$1(container) || document.body);
    }
  }, [container, disablePortal]);
  useEnhancedEffect$1(() => {
    if (mountNode && !disablePortal) {
      setRef(ref, mountNode);
      return () => {
        setRef(ref, null);
      };
    }
    return void 0;
  }, [ref, mountNode, disablePortal]);
  if (disablePortal) {
    if (/* @__PURE__ */ react.exports.isValidElement(children)) {
      return /* @__PURE__ */ react.exports.cloneElement(children, {
        ref: handleRef
      });
    }
    return children;
  }
  return mountNode ? /* @__PURE__ */ reactDom.exports.createPortal(children, mountNode) : mountNode;
});
var Portal$1 = Portal;
function isOverflowing(container) {
  const doc = ownerDocument(container);
  if (doc.body === container) {
    return ownerWindow(container).innerWidth > doc.documentElement.clientWidth;
  }
  return container.scrollHeight > container.clientHeight;
}
function ariaHidden(element, show) {
  if (show) {
    element.setAttribute("aria-hidden", "true");
  } else {
    element.removeAttribute("aria-hidden");
  }
}
function getPaddingRight(element) {
  return parseInt(ownerWindow(element).getComputedStyle(element).paddingRight, 10) || 0;
}
function ariaHiddenSiblings(container, mountElement, currentElement, elementsToExclude = [], show) {
  const blacklist = [mountElement, currentElement, ...elementsToExclude];
  const blacklistTagNames = ["TEMPLATE", "SCRIPT", "STYLE"];
  [].forEach.call(container.children, (element) => {
    if (blacklist.indexOf(element) === -1 && blacklistTagNames.indexOf(element.tagName) === -1) {
      ariaHidden(element, show);
    }
  });
}
function findIndexOf(items, callback) {
  let idx = -1;
  items.some((item, index2) => {
    if (callback(item)) {
      idx = index2;
      return true;
    }
    return false;
  });
  return idx;
}
function handleContainer(containerInfo, props) {
  const restoreStyle = [];
  const container = containerInfo.container;
  if (!props.disableScrollLock) {
    if (isOverflowing(container)) {
      const scrollbarSize = getScrollbarSize(ownerDocument(container));
      restoreStyle.push({
        value: container.style.paddingRight,
        property: "padding-right",
        el: container
      });
      container.style.paddingRight = `${getPaddingRight(container) + scrollbarSize}px`;
      const fixedElements = ownerDocument(container).querySelectorAll(".mui-fixed");
      [].forEach.call(fixedElements, (element) => {
        restoreStyle.push({
          value: element.style.paddingRight,
          property: "padding-right",
          el: element
        });
        element.style.paddingRight = `${getPaddingRight(element) + scrollbarSize}px`;
      });
    }
    const parent = container.parentElement;
    const containerWindow = ownerWindow(container);
    const scrollContainer = (parent == null ? void 0 : parent.nodeName) === "HTML" && containerWindow.getComputedStyle(parent).overflowY === "scroll" ? parent : container;
    restoreStyle.push({
      value: scrollContainer.style.overflow,
      property: "overflow",
      el: scrollContainer
    }, {
      value: scrollContainer.style.overflowX,
      property: "overflow-x",
      el: scrollContainer
    }, {
      value: scrollContainer.style.overflowY,
      property: "overflow-y",
      el: scrollContainer
    });
    scrollContainer.style.overflow = "hidden";
  }
  const restore = () => {
    restoreStyle.forEach(({
      value,
      el,
      property
    }) => {
      if (value) {
        el.style.setProperty(property, value);
      } else {
        el.style.removeProperty(property);
      }
    });
  };
  return restore;
}
function getHiddenSiblings(container) {
  const hiddenSiblings = [];
  [].forEach.call(container.children, (element) => {
    if (element.getAttribute("aria-hidden") === "true") {
      hiddenSiblings.push(element);
    }
  });
  return hiddenSiblings;
}
class ModalManager {
  constructor() {
    this.containers = void 0;
    this.modals = void 0;
    this.modals = [];
    this.containers = [];
  }
  add(modal, container) {
    let modalIndex = this.modals.indexOf(modal);
    if (modalIndex !== -1) {
      return modalIndex;
    }
    modalIndex = this.modals.length;
    this.modals.push(modal);
    if (modal.modalRef) {
      ariaHidden(modal.modalRef, false);
    }
    const hiddenSiblings = getHiddenSiblings(container);
    ariaHiddenSiblings(container, modal.mount, modal.modalRef, hiddenSiblings, true);
    const containerIndex = findIndexOf(this.containers, (item) => item.container === container);
    if (containerIndex !== -1) {
      this.containers[containerIndex].modals.push(modal);
      return modalIndex;
    }
    this.containers.push({
      modals: [modal],
      container,
      restore: null,
      hiddenSiblings
    });
    return modalIndex;
  }
  mount(modal, props) {
    const containerIndex = findIndexOf(this.containers, (item) => item.modals.indexOf(modal) !== -1);
    const containerInfo = this.containers[containerIndex];
    if (!containerInfo.restore) {
      containerInfo.restore = handleContainer(containerInfo, props);
    }
  }
  remove(modal) {
    const modalIndex = this.modals.indexOf(modal);
    if (modalIndex === -1) {
      return modalIndex;
    }
    const containerIndex = findIndexOf(this.containers, (item) => item.modals.indexOf(modal) !== -1);
    const containerInfo = this.containers[containerIndex];
    containerInfo.modals.splice(containerInfo.modals.indexOf(modal), 1);
    this.modals.splice(modalIndex, 1);
    if (containerInfo.modals.length === 0) {
      if (containerInfo.restore) {
        containerInfo.restore();
      }
      if (modal.modalRef) {
        ariaHidden(modal.modalRef, true);
      }
      ariaHiddenSiblings(containerInfo.container, modal.mount, modal.modalRef, containerInfo.hiddenSiblings, false);
      this.containers.splice(containerIndex, 1);
    } else {
      const nextTop = containerInfo.modals[containerInfo.modals.length - 1];
      if (nextTop.modalRef) {
        ariaHidden(nextTop.modalRef, false);
      }
    }
    return modalIndex;
  }
  isTopModal(modal) {
    return this.modals.length > 0 && this.modals[this.modals.length - 1] === modal;
  }
}
const candidatesSelector = ["input", "select", "textarea", "a[href]", "button", "[tabindex]", "audio[controls]", "video[controls]", '[contenteditable]:not([contenteditable="false"])'].join(",");
function getTabIndex(node) {
  const tabindexAttr = parseInt(node.getAttribute("tabindex"), 10);
  if (!Number.isNaN(tabindexAttr)) {
    return tabindexAttr;
  }
  if (node.contentEditable === "true" || (node.nodeName === "AUDIO" || node.nodeName === "VIDEO" || node.nodeName === "DETAILS") && node.getAttribute("tabindex") === null) {
    return 0;
  }
  return node.tabIndex;
}
function isNonTabbableRadio(node) {
  if (node.tagName !== "INPUT" || node.type !== "radio") {
    return false;
  }
  if (!node.name) {
    return false;
  }
  const getRadio = (selector) => node.ownerDocument.querySelector(`input[type="radio"]${selector}`);
  let roving = getRadio(`[name="${node.name}"]:checked`);
  if (!roving) {
    roving = getRadio(`[name="${node.name}"]`);
  }
  return roving !== node;
}
function isNodeMatchingSelectorFocusable(node) {
  if (node.disabled || node.tagName === "INPUT" && node.type === "hidden" || isNonTabbableRadio(node)) {
    return false;
  }
  return true;
}
function defaultGetTabbable(root) {
  const regularTabNodes = [];
  const orderedTabNodes = [];
  Array.from(root.querySelectorAll(candidatesSelector)).forEach((node, i) => {
    const nodeTabIndex = getTabIndex(node);
    if (nodeTabIndex === -1 || !isNodeMatchingSelectorFocusable(node)) {
      return;
    }
    if (nodeTabIndex === 0) {
      regularTabNodes.push(node);
    } else {
      orderedTabNodes.push({
        documentOrder: i,
        tabIndex: nodeTabIndex,
        node
      });
    }
  });
  return orderedTabNodes.sort((a, b2) => a.tabIndex === b2.tabIndex ? a.documentOrder - b2.documentOrder : a.tabIndex - b2.tabIndex).map((a) => a.node).concat(regularTabNodes);
}
function defaultIsEnabled() {
  return true;
}
function Unstable_TrapFocus(props) {
  const {
    children,
    disableAutoFocus = false,
    disableEnforceFocus = false,
    disableRestoreFocus = false,
    getTabbable = defaultGetTabbable,
    isEnabled = defaultIsEnabled,
    open
  } = props;
  const ignoreNextEnforceFocus = react.exports.useRef();
  const sentinelStart = react.exports.useRef(null);
  const sentinelEnd = react.exports.useRef(null);
  const nodeToRestore = react.exports.useRef(null);
  const reactFocusEventTarget = react.exports.useRef(null);
  const activated = react.exports.useRef(false);
  const rootRef = react.exports.useRef(null);
  const handleRef = useForkRef(children.ref, rootRef);
  const lastKeydown = react.exports.useRef(null);
  react.exports.useEffect(() => {
    if (!open || !rootRef.current) {
      return;
    }
    activated.current = !disableAutoFocus;
  }, [disableAutoFocus, open]);
  react.exports.useEffect(() => {
    if (!open || !rootRef.current) {
      return;
    }
    const doc = ownerDocument(rootRef.current);
    if (!rootRef.current.contains(doc.activeElement)) {
      if (!rootRef.current.hasAttribute("tabIndex")) {
        rootRef.current.setAttribute("tabIndex", -1);
      }
      if (activated.current) {
        rootRef.current.focus();
      }
    }
    return () => {
      if (!disableRestoreFocus) {
        if (nodeToRestore.current && nodeToRestore.current.focus) {
          ignoreNextEnforceFocus.current = true;
          nodeToRestore.current.focus();
        }
        nodeToRestore.current = null;
      }
    };
  }, [open]);
  react.exports.useEffect(() => {
    if (!open || !rootRef.current) {
      return;
    }
    const doc = ownerDocument(rootRef.current);
    const contain = (nativeEvent) => {
      const {
        current: rootElement
      } = rootRef;
      if (rootElement === null) {
        return;
      }
      if (!doc.hasFocus() || disableEnforceFocus || !isEnabled() || ignoreNextEnforceFocus.current) {
        ignoreNextEnforceFocus.current = false;
        return;
      }
      if (!rootElement.contains(doc.activeElement)) {
        if (nativeEvent && reactFocusEventTarget.current !== nativeEvent.target || doc.activeElement !== reactFocusEventTarget.current) {
          reactFocusEventTarget.current = null;
        } else if (reactFocusEventTarget.current !== null) {
          return;
        }
        if (!activated.current) {
          return;
        }
        let tabbable = [];
        if (doc.activeElement === sentinelStart.current || doc.activeElement === sentinelEnd.current) {
          tabbable = getTabbable(rootRef.current);
        }
        if (tabbable.length > 0) {
          var _lastKeydown$current, _lastKeydown$current2;
          const isShiftTab = Boolean(((_lastKeydown$current = lastKeydown.current) == null ? void 0 : _lastKeydown$current.shiftKey) && ((_lastKeydown$current2 = lastKeydown.current) == null ? void 0 : _lastKeydown$current2.key) === "Tab");
          const focusNext = tabbable[0];
          const focusPrevious = tabbable[tabbable.length - 1];
          if (isShiftTab) {
            focusPrevious.focus();
          } else {
            focusNext.focus();
          }
        } else {
          rootElement.focus();
        }
      }
    };
    const loopFocus = (nativeEvent) => {
      lastKeydown.current = nativeEvent;
      if (disableEnforceFocus || !isEnabled() || nativeEvent.key !== "Tab") {
        return;
      }
      if (doc.activeElement === rootRef.current && nativeEvent.shiftKey) {
        ignoreNextEnforceFocus.current = true;
        sentinelEnd.current.focus();
      }
    };
    doc.addEventListener("focusin", contain);
    doc.addEventListener("keydown", loopFocus, true);
    const interval = setInterval(() => {
      if (doc.activeElement.tagName === "BODY") {
        contain();
      }
    }, 50);
    return () => {
      clearInterval(interval);
      doc.removeEventListener("focusin", contain);
      doc.removeEventListener("keydown", loopFocus, true);
    };
  }, [disableAutoFocus, disableEnforceFocus, disableRestoreFocus, isEnabled, open, getTabbable]);
  const onFocus = (event) => {
    if (nodeToRestore.current === null) {
      nodeToRestore.current = event.relatedTarget;
    }
    activated.current = true;
    reactFocusEventTarget.current = event.target;
    const childrenPropsHandler = children.props.onFocus;
    if (childrenPropsHandler) {
      childrenPropsHandler(event);
    }
  };
  const handleFocusSentinel = (event) => {
    if (nodeToRestore.current === null) {
      nodeToRestore.current = event.relatedTarget;
    }
    activated.current = true;
  };
  return /* @__PURE__ */ jsxs(react.exports.Fragment, {
    children: [/* @__PURE__ */ jsx("div", {
      tabIndex: 0,
      onFocus: handleFocusSentinel,
      ref: sentinelStart,
      "data-test": "sentinelStart"
    }), /* @__PURE__ */ react.exports.cloneElement(children, {
      ref: handleRef,
      onFocus
    }), /* @__PURE__ */ jsx("div", {
      tabIndex: 0,
      onFocus: handleFocusSentinel,
      ref: sentinelEnd,
      "data-test": "sentinelEnd"
    })]
  });
}
function getModalUtilityClass(slot) {
  return generateUtilityClass("MuiModal", slot);
}
generateUtilityClasses("MuiModal", ["root", "hidden"]);
const _excluded$X = ["BackdropComponent", "BackdropProps", "children", "classes", "className", "closeAfterTransition", "component", "components", "componentsProps", "container", "disableAutoFocus", "disableEnforceFocus", "disableEscapeKeyDown", "disablePortal", "disableRestoreFocus", "disableScrollLock", "hideBackdrop", "keepMounted", "manager", "onBackdropClick", "onClose", "onKeyDown", "open", "theme", "onTransitionEnter", "onTransitionExited"];
const useUtilityClasses$H = (ownerState) => {
  const {
    open,
    exited,
    classes
  } = ownerState;
  const slots = {
    root: ["root", !open && exited && "hidden"]
  };
  return composeClasses(slots, getModalUtilityClass, classes);
};
function getContainer(container) {
  return typeof container === "function" ? container() : container;
}
function getHasTransition(props) {
  return props.children ? props.children.props.hasOwnProperty("in") : false;
}
const defaultManager = new ModalManager();
const ModalUnstyled = /* @__PURE__ */ react.exports.forwardRef(function ModalUnstyled2(props, ref) {
  const {
    BackdropComponent,
    BackdropProps,
    children,
    classes: classesProp,
    className,
    closeAfterTransition = false,
    component = "div",
    components = {},
    componentsProps = {},
    container,
    disableAutoFocus = false,
    disableEnforceFocus = false,
    disableEscapeKeyDown = false,
    disablePortal = false,
    disableRestoreFocus = false,
    disableScrollLock = false,
    hideBackdrop = false,
    keepMounted = false,
    manager = defaultManager,
    onBackdropClick,
    onClose,
    onKeyDown,
    open,
    theme: theme2,
    onTransitionEnter,
    onTransitionExited
  } = props, other = _objectWithoutPropertiesLoose$1(props, _excluded$X);
  const [exited, setExited] = react.exports.useState(true);
  const modal = react.exports.useRef({});
  const mountNodeRef = react.exports.useRef(null);
  const modalRef = react.exports.useRef(null);
  const handleRef = useForkRef(modalRef, ref);
  const hasTransition = getHasTransition(props);
  const getDoc = () => ownerDocument(mountNodeRef.current);
  const getModal = () => {
    modal.current.modalRef = modalRef.current;
    modal.current.mountNode = mountNodeRef.current;
    return modal.current;
  };
  const handleMounted = () => {
    manager.mount(getModal(), {
      disableScrollLock
    });
    modalRef.current.scrollTop = 0;
  };
  const handleOpen = useEventCallback(() => {
    const resolvedContainer = getContainer(container) || getDoc().body;
    manager.add(getModal(), resolvedContainer);
    if (modalRef.current) {
      handleMounted();
    }
  });
  const isTopModal = react.exports.useCallback(() => manager.isTopModal(getModal()), [manager]);
  const handlePortalRef = useEventCallback((node) => {
    mountNodeRef.current = node;
    if (!node) {
      return;
    }
    if (open && isTopModal()) {
      handleMounted();
    } else {
      ariaHidden(modalRef.current, true);
    }
  });
  const handleClose = react.exports.useCallback(() => {
    manager.remove(getModal());
  }, [manager]);
  react.exports.useEffect(() => {
    return () => {
      handleClose();
    };
  }, [handleClose]);
  react.exports.useEffect(() => {
    if (open) {
      handleOpen();
    } else if (!hasTransition || !closeAfterTransition) {
      handleClose();
    }
  }, [open, handleClose, hasTransition, closeAfterTransition, handleOpen]);
  const ownerState = _extends$3({}, props, {
    classes: classesProp,
    closeAfterTransition,
    disableAutoFocus,
    disableEnforceFocus,
    disableEscapeKeyDown,
    disablePortal,
    disableRestoreFocus,
    disableScrollLock,
    exited,
    hideBackdrop,
    keepMounted
  });
  const classes = useUtilityClasses$H(ownerState);
  if (!keepMounted && !open && (!hasTransition || exited)) {
    return null;
  }
  const handleEnter = () => {
    setExited(false);
    if (onTransitionEnter) {
      onTransitionEnter();
    }
  };
  const handleExited = () => {
    setExited(true);
    if (onTransitionExited) {
      onTransitionExited();
    }
    if (closeAfterTransition) {
      handleClose();
    }
  };
  const handleBackdropClick = (event) => {
    if (event.target !== event.currentTarget) {
      return;
    }
    if (onBackdropClick) {
      onBackdropClick(event);
    }
    if (onClose) {
      onClose(event, "backdropClick");
    }
  };
  const handleKeyDown2 = (event) => {
    if (onKeyDown) {
      onKeyDown(event);
    }
    if (event.key !== "Escape" || !isTopModal()) {
      return;
    }
    if (!disableEscapeKeyDown) {
      event.stopPropagation();
      if (onClose) {
        onClose(event, "escapeKeyDown");
      }
    }
  };
  const childProps = {};
  if (children.props.tabIndex === void 0) {
    childProps.tabIndex = "-1";
  }
  if (hasTransition) {
    childProps.onEnter = createChainedFunction(handleEnter, children.props.onEnter);
    childProps.onExited = createChainedFunction(handleExited, children.props.onExited);
  }
  const Root = components.Root || component;
  const rootProps = componentsProps.root || {};
  return /* @__PURE__ */ jsx(Portal$1, {
    ref: handlePortalRef,
    container,
    disablePortal,
    children: /* @__PURE__ */ jsxs(Root, _extends$3({
      role: "presentation"
    }, rootProps, !isHostComponent(Root) && {
      as: component,
      ownerState: _extends$3({}, ownerState, rootProps.ownerState),
      theme: theme2
    }, other, {
      ref: handleRef,
      onKeyDown: handleKeyDown2,
      className: clsx(classes.root, rootProps.className, className),
      children: [!hideBackdrop && BackdropComponent ? /* @__PURE__ */ jsx(BackdropComponent, _extends$3({
        open,
        onClick: handleBackdropClick
      }, BackdropProps)) : null, /* @__PURE__ */ jsx(Unstable_TrapFocus, {
        disableEnforceFocus,
        disableAutoFocus,
        disableRestoreFocus,
        isEnabled: isTopModal,
        open,
        children: /* @__PURE__ */ react.exports.cloneElement(children, childProps)
      })]
    }))
  });
});
var ModalUnstyled$1 = ModalUnstyled;
const _excluded$W = ["sx"];
const splitProps = (props) => {
  const result = {
    systemProps: {},
    otherProps: {}
  };
  Object.keys(props).forEach((prop) => {
    if (propToStyleFunction[prop]) {
      result.systemProps[prop] = props[prop];
    } else {
      result.otherProps[prop] = props[prop];
    }
  });
  return result;
};
function extendSxProp(props) {
  const {
    sx: inSx
  } = props, other = _objectWithoutPropertiesLoose$1(props, _excluded$W);
  const {
    systemProps,
    otherProps
  } = splitProps(other);
  return _extends$3({}, otherProps, {
    sx: _extends$3({}, systemProps, inSx)
  });
}
var styleFunctionSx = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  [Symbol.toStringTag]: "Module",
  "default": styleFunctionSx$1,
  extendSxProp
});
var createTheme = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  [Symbol.toStringTag]: "Module",
  "default": createTheme$1
});
const hasSymbol = typeof Symbol === "function" && Symbol.for;
var nested = hasSymbol ? Symbol.for("mui.nested") : "__THEME_NESTED__";
function mergeOuterLocalTheme(outerTheme, localTheme) {
  if (typeof localTheme === "function") {
    const mergedTheme = localTheme(outerTheme);
    return mergedTheme;
  }
  return _extends$3({}, outerTheme, localTheme);
}
function ThemeProvider$1(props) {
  const {
    children,
    theme: localTheme
  } = props;
  const outerTheme = useTheme$1();
  const theme2 = react.exports.useMemo(() => {
    const output = outerTheme === null ? localTheme : mergeOuterLocalTheme(outerTheme, localTheme);
    if (output != null) {
      output[nested] = outerTheme !== null;
    }
    return output;
  }, [localTheme, outerTheme]);
  return /* @__PURE__ */ jsx(ThemeContext.Provider, {
    value: theme2,
    children
  });
}
const _excluded$V = ["className", "component"];
function createBox(options = {}) {
  const {
    defaultTheme: defaultTheme2
  } = options;
  const BoxRoot = styled$2("div")(styleFunctionSx$1);
  const Box2 = /* @__PURE__ */ react.exports.forwardRef(function Box3(inProps, ref) {
    const theme2 = useTheme$2(defaultTheme2);
    const _extendSxProp = extendSxProp(inProps), {
      className,
      component = "div"
    } = _extendSxProp, other = _objectWithoutPropertiesLoose$1(_extendSxProp, _excluded$V);
    return /* @__PURE__ */ jsx(BoxRoot, _extends$3({
      as: component,
      ref,
      className: clsx(className, "MuiBox-root"),
      theme: theme2
    }, other));
  });
  return Box2;
}
const Box$2 = createBox();
var Box$3 = Box$2;
function InnerThemeProvider(props) {
  const theme2 = useTheme$2();
  return /* @__PURE__ */ jsx(ThemeContext$1.Provider, {
    value: typeof theme2 === "object" ? theme2 : {},
    children: props.children
  });
}
function ThemeProvider(props) {
  const {
    children,
    theme: localTheme
  } = props;
  return /* @__PURE__ */ jsx(ThemeProvider$1, {
    theme: localTheme,
    children: /* @__PURE__ */ jsx(InnerThemeProvider, {
      children
    })
  });
}
var top = "top";
var bottom = "bottom";
var right = "right";
var left = "left";
var auto = "auto";
var basePlacements = [top, bottom, right, left];
var start = "start";
var end = "end";
var clippingParents = "clippingParents";
var viewport = "viewport";
var popper = "popper";
var reference = "reference";
var variationPlacements = /* @__PURE__ */ basePlacements.reduce(function(acc, placement) {
  return acc.concat([placement + "-" + start, placement + "-" + end]);
}, []);
var placements = /* @__PURE__ */ [].concat(basePlacements, [auto]).reduce(function(acc, placement) {
  return acc.concat([placement, placement + "-" + start, placement + "-" + end]);
}, []);
var beforeRead = "beforeRead";
var read = "read";
var afterRead = "afterRead";
var beforeMain = "beforeMain";
var main$1 = "main";
var afterMain = "afterMain";
var beforeWrite = "beforeWrite";
var write = "write";
var afterWrite = "afterWrite";
var modifierPhases = [beforeRead, read, afterRead, beforeMain, main$1, afterMain, beforeWrite, write, afterWrite];
function getNodeName(element) {
  return element ? (element.nodeName || "").toLowerCase() : null;
}
function getWindow(node) {
  if (node == null) {
    return window;
  }
  if (node.toString() !== "[object Window]") {
    var ownerDocument2 = node.ownerDocument;
    return ownerDocument2 ? ownerDocument2.defaultView || window : window;
  }
  return node;
}
function isElement(node) {
  var OwnElement = getWindow(node).Element;
  return node instanceof OwnElement || node instanceof Element;
}
function isHTMLElement(node) {
  var OwnElement = getWindow(node).HTMLElement;
  return node instanceof OwnElement || node instanceof HTMLElement;
}
function isShadowRoot(node) {
  if (typeof ShadowRoot === "undefined") {
    return false;
  }
  var OwnElement = getWindow(node).ShadowRoot;
  return node instanceof OwnElement || node instanceof ShadowRoot;
}
function applyStyles(_ref) {
  var state = _ref.state;
  Object.keys(state.elements).forEach(function(name) {
    var style2 = state.styles[name] || {};
    var attributes = state.attributes[name] || {};
    var element = state.elements[name];
    if (!isHTMLElement(element) || !getNodeName(element)) {
      return;
    }
    Object.assign(element.style, style2);
    Object.keys(attributes).forEach(function(name2) {
      var value = attributes[name2];
      if (value === false) {
        element.removeAttribute(name2);
      } else {
        element.setAttribute(name2, value === true ? "" : value);
      }
    });
  });
}
function effect$2(_ref2) {
  var state = _ref2.state;
  var initialStyles = {
    popper: {
      position: state.options.strategy,
      left: "0",
      top: "0",
      margin: "0"
    },
    arrow: {
      position: "absolute"
    },
    reference: {}
  };
  Object.assign(state.elements.popper.style, initialStyles.popper);
  state.styles = initialStyles;
  if (state.elements.arrow) {
    Object.assign(state.elements.arrow.style, initialStyles.arrow);
  }
  return function() {
    Object.keys(state.elements).forEach(function(name) {
      var element = state.elements[name];
      var attributes = state.attributes[name] || {};
      var styleProperties = Object.keys(state.styles.hasOwnProperty(name) ? state.styles[name] : initialStyles[name]);
      var style2 = styleProperties.reduce(function(style3, property) {
        style3[property] = "";
        return style3;
      }, {});
      if (!isHTMLElement(element) || !getNodeName(element)) {
        return;
      }
      Object.assign(element.style, style2);
      Object.keys(attributes).forEach(function(attribute) {
        element.removeAttribute(attribute);
      });
    });
  };
}
var applyStyles$1 = {
  name: "applyStyles",
  enabled: true,
  phase: "write",
  fn: applyStyles,
  effect: effect$2,
  requires: ["computeStyles"]
};
function getBasePlacement(placement) {
  return placement.split("-")[0];
}
function getBoundingClientRect(element, includeScale) {
  var rect = element.getBoundingClientRect();
  var scaleX = 1;
  var scaleY = 1;
  return {
    width: rect.width / scaleX,
    height: rect.height / scaleY,
    top: rect.top / scaleY,
    right: rect.right / scaleX,
    bottom: rect.bottom / scaleY,
    left: rect.left / scaleX,
    x: rect.left / scaleX,
    y: rect.top / scaleY
  };
}
function getLayoutRect(element) {
  var clientRect = getBoundingClientRect(element);
  var width = element.offsetWidth;
  var height = element.offsetHeight;
  if (Math.abs(clientRect.width - width) <= 1) {
    width = clientRect.width;
  }
  if (Math.abs(clientRect.height - height) <= 1) {
    height = clientRect.height;
  }
  return {
    x: element.offsetLeft,
    y: element.offsetTop,
    width,
    height
  };
}
function contains(parent, child) {
  var rootNode = child.getRootNode && child.getRootNode();
  if (parent.contains(child)) {
    return true;
  } else if (rootNode && isShadowRoot(rootNode)) {
    var next = child;
    do {
      if (next && parent.isSameNode(next)) {
        return true;
      }
      next = next.parentNode || next.host;
    } while (next);
  }
  return false;
}
function getComputedStyle(element) {
  return getWindow(element).getComputedStyle(element);
}
function isTableElement(element) {
  return ["table", "td", "th"].indexOf(getNodeName(element)) >= 0;
}
function getDocumentElement(element) {
  return ((isElement(element) ? element.ownerDocument : element.document) || window.document).documentElement;
}
function getParentNode(element) {
  if (getNodeName(element) === "html") {
    return element;
  }
  return element.assignedSlot || element.parentNode || (isShadowRoot(element) ? element.host : null) || getDocumentElement(element);
}
function getTrueOffsetParent(element) {
  if (!isHTMLElement(element) || getComputedStyle(element).position === "fixed") {
    return null;
  }
  return element.offsetParent;
}
function getContainingBlock(element) {
  var isFirefox = navigator.userAgent.toLowerCase().indexOf("firefox") !== -1;
  var isIE = navigator.userAgent.indexOf("Trident") !== -1;
  if (isIE && isHTMLElement(element)) {
    var elementCss = getComputedStyle(element);
    if (elementCss.position === "fixed") {
      return null;
    }
  }
  var currentNode = getParentNode(element);
  while (isHTMLElement(currentNode) && ["html", "body"].indexOf(getNodeName(currentNode)) < 0) {
    var css2 = getComputedStyle(currentNode);
    if (css2.transform !== "none" || css2.perspective !== "none" || css2.contain === "paint" || ["transform", "perspective"].indexOf(css2.willChange) !== -1 || isFirefox && css2.willChange === "filter" || isFirefox && css2.filter && css2.filter !== "none") {
      return currentNode;
    } else {
      currentNode = currentNode.parentNode;
    }
  }
  return null;
}
function getOffsetParent(element) {
  var window2 = getWindow(element);
  var offsetParent = getTrueOffsetParent(element);
  while (offsetParent && isTableElement(offsetParent) && getComputedStyle(offsetParent).position === "static") {
    offsetParent = getTrueOffsetParent(offsetParent);
  }
  if (offsetParent && (getNodeName(offsetParent) === "html" || getNodeName(offsetParent) === "body" && getComputedStyle(offsetParent).position === "static")) {
    return window2;
  }
  return offsetParent || getContainingBlock(element) || window2;
}
function getMainAxisFromPlacement(placement) {
  return ["top", "bottom"].indexOf(placement) >= 0 ? "x" : "y";
}
var max = Math.max;
var min = Math.min;
var round$1 = Math.round;
function within(min$1, value, max$1) {
  return max(min$1, min(value, max$1));
}
function getFreshSideObject() {
  return {
    top: 0,
    right: 0,
    bottom: 0,
    left: 0
  };
}
function mergePaddingObject(paddingObject) {
  return Object.assign({}, getFreshSideObject(), paddingObject);
}
function expandToHashMap(value, keys) {
  return keys.reduce(function(hashMap, key) {
    hashMap[key] = value;
    return hashMap;
  }, {});
}
var toPaddingObject = function toPaddingObject2(padding, state) {
  padding = typeof padding === "function" ? padding(Object.assign({}, state.rects, {
    placement: state.placement
  })) : padding;
  return mergePaddingObject(typeof padding !== "number" ? padding : expandToHashMap(padding, basePlacements));
};
function arrow(_ref) {
  var _state$modifiersData$;
  var state = _ref.state, name = _ref.name, options = _ref.options;
  var arrowElement = state.elements.arrow;
  var popperOffsets2 = state.modifiersData.popperOffsets;
  var basePlacement = getBasePlacement(state.placement);
  var axis = getMainAxisFromPlacement(basePlacement);
  var isVertical = [left, right].indexOf(basePlacement) >= 0;
  var len = isVertical ? "height" : "width";
  if (!arrowElement || !popperOffsets2) {
    return;
  }
  var paddingObject = toPaddingObject(options.padding, state);
  var arrowRect = getLayoutRect(arrowElement);
  var minProp = axis === "y" ? top : left;
  var maxProp = axis === "y" ? bottom : right;
  var endDiff = state.rects.reference[len] + state.rects.reference[axis] - popperOffsets2[axis] - state.rects.popper[len];
  var startDiff = popperOffsets2[axis] - state.rects.reference[axis];
  var arrowOffsetParent = getOffsetParent(arrowElement);
  var clientSize = arrowOffsetParent ? axis === "y" ? arrowOffsetParent.clientHeight || 0 : arrowOffsetParent.clientWidth || 0 : 0;
  var centerToReference = endDiff / 2 - startDiff / 2;
  var min2 = paddingObject[minProp];
  var max2 = clientSize - arrowRect[len] - paddingObject[maxProp];
  var center = clientSize / 2 - arrowRect[len] / 2 + centerToReference;
  var offset2 = within(min2, center, max2);
  var axisProp = axis;
  state.modifiersData[name] = (_state$modifiersData$ = {}, _state$modifiersData$[axisProp] = offset2, _state$modifiersData$.centerOffset = offset2 - center, _state$modifiersData$);
}
function effect$1(_ref2) {
  var state = _ref2.state, options = _ref2.options;
  var _options$element = options.element, arrowElement = _options$element === void 0 ? "[data-popper-arrow]" : _options$element;
  if (arrowElement == null) {
    return;
  }
  if (typeof arrowElement === "string") {
    arrowElement = state.elements.popper.querySelector(arrowElement);
    if (!arrowElement) {
      return;
    }
  }
  if (!contains(state.elements.popper, arrowElement)) {
    return;
  }
  state.elements.arrow = arrowElement;
}
var arrow$1 = {
  name: "arrow",
  enabled: true,
  phase: "main",
  fn: arrow,
  effect: effect$1,
  requires: ["popperOffsets"],
  requiresIfExists: ["preventOverflow"]
};
function getVariation(placement) {
  return placement.split("-")[1];
}
var unsetSides = {
  top: "auto",
  right: "auto",
  bottom: "auto",
  left: "auto"
};
function roundOffsetsByDPR(_ref) {
  var x = _ref.x, y2 = _ref.y;
  var win = window;
  var dpr = win.devicePixelRatio || 1;
  return {
    x: round$1(round$1(x * dpr) / dpr) || 0,
    y: round$1(round$1(y2 * dpr) / dpr) || 0
  };
}
function mapToStyles(_ref2) {
  var _Object$assign2;
  var popper2 = _ref2.popper, popperRect = _ref2.popperRect, placement = _ref2.placement, variation = _ref2.variation, offsets = _ref2.offsets, position = _ref2.position, gpuAcceleration = _ref2.gpuAcceleration, adaptive = _ref2.adaptive, roundOffsets = _ref2.roundOffsets;
  var _ref3 = roundOffsets === true ? roundOffsetsByDPR(offsets) : typeof roundOffsets === "function" ? roundOffsets(offsets) : offsets, _ref3$x = _ref3.x, x = _ref3$x === void 0 ? 0 : _ref3$x, _ref3$y = _ref3.y, y2 = _ref3$y === void 0 ? 0 : _ref3$y;
  var hasX = offsets.hasOwnProperty("x");
  var hasY = offsets.hasOwnProperty("y");
  var sideX = left;
  var sideY = top;
  var win = window;
  if (adaptive) {
    var offsetParent = getOffsetParent(popper2);
    var heightProp = "clientHeight";
    var widthProp = "clientWidth";
    if (offsetParent === getWindow(popper2)) {
      offsetParent = getDocumentElement(popper2);
      if (getComputedStyle(offsetParent).position !== "static" && position === "absolute") {
        heightProp = "scrollHeight";
        widthProp = "scrollWidth";
      }
    }
    offsetParent = offsetParent;
    if (placement === top || (placement === left || placement === right) && variation === end) {
      sideY = bottom;
      y2 -= offsetParent[heightProp] - popperRect.height;
      y2 *= gpuAcceleration ? 1 : -1;
    }
    if (placement === left || (placement === top || placement === bottom) && variation === end) {
      sideX = right;
      x -= offsetParent[widthProp] - popperRect.width;
      x *= gpuAcceleration ? 1 : -1;
    }
  }
  var commonStyles = Object.assign({
    position
  }, adaptive && unsetSides);
  if (gpuAcceleration) {
    var _Object$assign;
    return Object.assign({}, commonStyles, (_Object$assign = {}, _Object$assign[sideY] = hasY ? "0" : "", _Object$assign[sideX] = hasX ? "0" : "", _Object$assign.transform = (win.devicePixelRatio || 1) <= 1 ? "translate(" + x + "px, " + y2 + "px)" : "translate3d(" + x + "px, " + y2 + "px, 0)", _Object$assign));
  }
  return Object.assign({}, commonStyles, (_Object$assign2 = {}, _Object$assign2[sideY] = hasY ? y2 + "px" : "", _Object$assign2[sideX] = hasX ? x + "px" : "", _Object$assign2.transform = "", _Object$assign2));
}
function computeStyles(_ref4) {
  var state = _ref4.state, options = _ref4.options;
  var _options$gpuAccelerat = options.gpuAcceleration, gpuAcceleration = _options$gpuAccelerat === void 0 ? true : _options$gpuAccelerat, _options$adaptive = options.adaptive, adaptive = _options$adaptive === void 0 ? true : _options$adaptive, _options$roundOffsets = options.roundOffsets, roundOffsets = _options$roundOffsets === void 0 ? true : _options$roundOffsets;
  var commonStyles = {
    placement: getBasePlacement(state.placement),
    variation: getVariation(state.placement),
    popper: state.elements.popper,
    popperRect: state.rects.popper,
    gpuAcceleration
  };
  if (state.modifiersData.popperOffsets != null) {
    state.styles.popper = Object.assign({}, state.styles.popper, mapToStyles(Object.assign({}, commonStyles, {
      offsets: state.modifiersData.popperOffsets,
      position: state.options.strategy,
      adaptive,
      roundOffsets
    })));
  }
  if (state.modifiersData.arrow != null) {
    state.styles.arrow = Object.assign({}, state.styles.arrow, mapToStyles(Object.assign({}, commonStyles, {
      offsets: state.modifiersData.arrow,
      position: "absolute",
      adaptive: false,
      roundOffsets
    })));
  }
  state.attributes.popper = Object.assign({}, state.attributes.popper, {
    "data-popper-placement": state.placement
  });
}
var computeStyles$1 = {
  name: "computeStyles",
  enabled: true,
  phase: "beforeWrite",
  fn: computeStyles,
  data: {}
};
var passive = {
  passive: true
};
function effect(_ref) {
  var state = _ref.state, instance = _ref.instance, options = _ref.options;
  var _options$scroll = options.scroll, scroll = _options$scroll === void 0 ? true : _options$scroll, _options$resize = options.resize, resize = _options$resize === void 0 ? true : _options$resize;
  var window2 = getWindow(state.elements.popper);
  var scrollParents = [].concat(state.scrollParents.reference, state.scrollParents.popper);
  if (scroll) {
    scrollParents.forEach(function(scrollParent) {
      scrollParent.addEventListener("scroll", instance.update, passive);
    });
  }
  if (resize) {
    window2.addEventListener("resize", instance.update, passive);
  }
  return function() {
    if (scroll) {
      scrollParents.forEach(function(scrollParent) {
        scrollParent.removeEventListener("scroll", instance.update, passive);
      });
    }
    if (resize) {
      window2.removeEventListener("resize", instance.update, passive);
    }
  };
}
var eventListeners = {
  name: "eventListeners",
  enabled: true,
  phase: "write",
  fn: function fn() {
  },
  effect,
  data: {}
};
var hash$1 = {
  left: "right",
  right: "left",
  bottom: "top",
  top: "bottom"
};
function getOppositePlacement(placement) {
  return placement.replace(/left|right|bottom|top/g, function(matched) {
    return hash$1[matched];
  });
}
var hash = {
  start: "end",
  end: "start"
};
function getOppositeVariationPlacement(placement) {
  return placement.replace(/start|end/g, function(matched) {
    return hash[matched];
  });
}
function getWindowScroll(node) {
  var win = getWindow(node);
  var scrollLeft = win.pageXOffset;
  var scrollTop = win.pageYOffset;
  return {
    scrollLeft,
    scrollTop
  };
}
function getWindowScrollBarX(element) {
  return getBoundingClientRect(getDocumentElement(element)).left + getWindowScroll(element).scrollLeft;
}
function getViewportRect(element) {
  var win = getWindow(element);
  var html2 = getDocumentElement(element);
  var visualViewport = win.visualViewport;
  var width = html2.clientWidth;
  var height = html2.clientHeight;
  var x = 0;
  var y2 = 0;
  if (visualViewport) {
    width = visualViewport.width;
    height = visualViewport.height;
    if (!/^((?!chrome|android).)*safari/i.test(navigator.userAgent)) {
      x = visualViewport.offsetLeft;
      y2 = visualViewport.offsetTop;
    }
  }
  return {
    width,
    height,
    x: x + getWindowScrollBarX(element),
    y: y2
  };
}
function getDocumentRect(element) {
  var _element$ownerDocumen;
  var html2 = getDocumentElement(element);
  var winScroll = getWindowScroll(element);
  var body = (_element$ownerDocumen = element.ownerDocument) == null ? void 0 : _element$ownerDocumen.body;
  var width = max(html2.scrollWidth, html2.clientWidth, body ? body.scrollWidth : 0, body ? body.clientWidth : 0);
  var height = max(html2.scrollHeight, html2.clientHeight, body ? body.scrollHeight : 0, body ? body.clientHeight : 0);
  var x = -winScroll.scrollLeft + getWindowScrollBarX(element);
  var y2 = -winScroll.scrollTop;
  if (getComputedStyle(body || html2).direction === "rtl") {
    x += max(html2.clientWidth, body ? body.clientWidth : 0) - width;
  }
  return {
    width,
    height,
    x,
    y: y2
  };
}
function isScrollParent(element) {
  var _getComputedStyle = getComputedStyle(element), overflow = _getComputedStyle.overflow, overflowX = _getComputedStyle.overflowX, overflowY = _getComputedStyle.overflowY;
  return /auto|scroll|overlay|hidden/.test(overflow + overflowY + overflowX);
}
function getScrollParent(node) {
  if (["html", "body", "#document"].indexOf(getNodeName(node)) >= 0) {
    return node.ownerDocument.body;
  }
  if (isHTMLElement(node) && isScrollParent(node)) {
    return node;
  }
  return getScrollParent(getParentNode(node));
}
function listScrollParents(element, list) {
  var _element$ownerDocumen;
  if (list === void 0) {
    list = [];
  }
  var scrollParent = getScrollParent(element);
  var isBody = scrollParent === ((_element$ownerDocumen = element.ownerDocument) == null ? void 0 : _element$ownerDocumen.body);
  var win = getWindow(scrollParent);
  var target = isBody ? [win].concat(win.visualViewport || [], isScrollParent(scrollParent) ? scrollParent : []) : scrollParent;
  var updatedList = list.concat(target);
  return isBody ? updatedList : updatedList.concat(listScrollParents(getParentNode(target)));
}
function rectToClientRect(rect) {
  return Object.assign({}, rect, {
    left: rect.x,
    top: rect.y,
    right: rect.x + rect.width,
    bottom: rect.y + rect.height
  });
}
function getInnerBoundingClientRect(element) {
  var rect = getBoundingClientRect(element);
  rect.top = rect.top + element.clientTop;
  rect.left = rect.left + element.clientLeft;
  rect.bottom = rect.top + element.clientHeight;
  rect.right = rect.left + element.clientWidth;
  rect.width = element.clientWidth;
  rect.height = element.clientHeight;
  rect.x = rect.left;
  rect.y = rect.top;
  return rect;
}
function getClientRectFromMixedType(element, clippingParent) {
  return clippingParent === viewport ? rectToClientRect(getViewportRect(element)) : isHTMLElement(clippingParent) ? getInnerBoundingClientRect(clippingParent) : rectToClientRect(getDocumentRect(getDocumentElement(element)));
}
function getClippingParents(element) {
  var clippingParents2 = listScrollParents(getParentNode(element));
  var canEscapeClipping = ["absolute", "fixed"].indexOf(getComputedStyle(element).position) >= 0;
  var clipperElement = canEscapeClipping && isHTMLElement(element) ? getOffsetParent(element) : element;
  if (!isElement(clipperElement)) {
    return [];
  }
  return clippingParents2.filter(function(clippingParent) {
    return isElement(clippingParent) && contains(clippingParent, clipperElement) && getNodeName(clippingParent) !== "body";
  });
}
function getClippingRect(element, boundary, rootBoundary) {
  var mainClippingParents = boundary === "clippingParents" ? getClippingParents(element) : [].concat(boundary);
  var clippingParents2 = [].concat(mainClippingParents, [rootBoundary]);
  var firstClippingParent = clippingParents2[0];
  var clippingRect = clippingParents2.reduce(function(accRect, clippingParent) {
    var rect = getClientRectFromMixedType(element, clippingParent);
    accRect.top = max(rect.top, accRect.top);
    accRect.right = min(rect.right, accRect.right);
    accRect.bottom = min(rect.bottom, accRect.bottom);
    accRect.left = max(rect.left, accRect.left);
    return accRect;
  }, getClientRectFromMixedType(element, firstClippingParent));
  clippingRect.width = clippingRect.right - clippingRect.left;
  clippingRect.height = clippingRect.bottom - clippingRect.top;
  clippingRect.x = clippingRect.left;
  clippingRect.y = clippingRect.top;
  return clippingRect;
}
function computeOffsets(_ref) {
  var reference2 = _ref.reference, element = _ref.element, placement = _ref.placement;
  var basePlacement = placement ? getBasePlacement(placement) : null;
  var variation = placement ? getVariation(placement) : null;
  var commonX = reference2.x + reference2.width / 2 - element.width / 2;
  var commonY = reference2.y + reference2.height / 2 - element.height / 2;
  var offsets;
  switch (basePlacement) {
    case top:
      offsets = {
        x: commonX,
        y: reference2.y - element.height
      };
      break;
    case bottom:
      offsets = {
        x: commonX,
        y: reference2.y + reference2.height
      };
      break;
    case right:
      offsets = {
        x: reference2.x + reference2.width,
        y: commonY
      };
      break;
    case left:
      offsets = {
        x: reference2.x - element.width,
        y: commonY
      };
      break;
    default:
      offsets = {
        x: reference2.x,
        y: reference2.y
      };
  }
  var mainAxis = basePlacement ? getMainAxisFromPlacement(basePlacement) : null;
  if (mainAxis != null) {
    var len = mainAxis === "y" ? "height" : "width";
    switch (variation) {
      case start:
        offsets[mainAxis] = offsets[mainAxis] - (reference2[len] / 2 - element[len] / 2);
        break;
      case end:
        offsets[mainAxis] = offsets[mainAxis] + (reference2[len] / 2 - element[len] / 2);
        break;
    }
  }
  return offsets;
}
function detectOverflow(state, options) {
  if (options === void 0) {
    options = {};
  }
  var _options = options, _options$placement = _options.placement, placement = _options$placement === void 0 ? state.placement : _options$placement, _options$boundary = _options.boundary, boundary = _options$boundary === void 0 ? clippingParents : _options$boundary, _options$rootBoundary = _options.rootBoundary, rootBoundary = _options$rootBoundary === void 0 ? viewport : _options$rootBoundary, _options$elementConte = _options.elementContext, elementContext = _options$elementConte === void 0 ? popper : _options$elementConte, _options$altBoundary = _options.altBoundary, altBoundary = _options$altBoundary === void 0 ? false : _options$altBoundary, _options$padding = _options.padding, padding = _options$padding === void 0 ? 0 : _options$padding;
  var paddingObject = mergePaddingObject(typeof padding !== "number" ? padding : expandToHashMap(padding, basePlacements));
  var altContext = elementContext === popper ? reference : popper;
  var popperRect = state.rects.popper;
  var element = state.elements[altBoundary ? altContext : elementContext];
  var clippingClientRect = getClippingRect(isElement(element) ? element : element.contextElement || getDocumentElement(state.elements.popper), boundary, rootBoundary);
  var referenceClientRect = getBoundingClientRect(state.elements.reference);
  var popperOffsets2 = computeOffsets({
    reference: referenceClientRect,
    element: popperRect,
    strategy: "absolute",
    placement
  });
  var popperClientRect = rectToClientRect(Object.assign({}, popperRect, popperOffsets2));
  var elementClientRect = elementContext === popper ? popperClientRect : referenceClientRect;
  var overflowOffsets = {
    top: clippingClientRect.top - elementClientRect.top + paddingObject.top,
    bottom: elementClientRect.bottom - clippingClientRect.bottom + paddingObject.bottom,
    left: clippingClientRect.left - elementClientRect.left + paddingObject.left,
    right: elementClientRect.right - clippingClientRect.right + paddingObject.right
  };
  var offsetData = state.modifiersData.offset;
  if (elementContext === popper && offsetData) {
    var offset2 = offsetData[placement];
    Object.keys(overflowOffsets).forEach(function(key) {
      var multiply = [right, bottom].indexOf(key) >= 0 ? 1 : -1;
      var axis = [top, bottom].indexOf(key) >= 0 ? "y" : "x";
      overflowOffsets[key] += offset2[axis] * multiply;
    });
  }
  return overflowOffsets;
}
function computeAutoPlacement(state, options) {
  if (options === void 0) {
    options = {};
  }
  var _options = options, placement = _options.placement, boundary = _options.boundary, rootBoundary = _options.rootBoundary, padding = _options.padding, flipVariations = _options.flipVariations, _options$allowedAutoP = _options.allowedAutoPlacements, allowedAutoPlacements = _options$allowedAutoP === void 0 ? placements : _options$allowedAutoP;
  var variation = getVariation(placement);
  var placements$1 = variation ? flipVariations ? variationPlacements : variationPlacements.filter(function(placement2) {
    return getVariation(placement2) === variation;
  }) : basePlacements;
  var allowedPlacements = placements$1.filter(function(placement2) {
    return allowedAutoPlacements.indexOf(placement2) >= 0;
  });
  if (allowedPlacements.length === 0) {
    allowedPlacements = placements$1;
  }
  var overflows = allowedPlacements.reduce(function(acc, placement2) {
    acc[placement2] = detectOverflow(state, {
      placement: placement2,
      boundary,
      rootBoundary,
      padding
    })[getBasePlacement(placement2)];
    return acc;
  }, {});
  return Object.keys(overflows).sort(function(a, b2) {
    return overflows[a] - overflows[b2];
  });
}
function getExpandedFallbackPlacements(placement) {
  if (getBasePlacement(placement) === auto) {
    return [];
  }
  var oppositePlacement = getOppositePlacement(placement);
  return [getOppositeVariationPlacement(placement), oppositePlacement, getOppositeVariationPlacement(oppositePlacement)];
}
function flip(_ref) {
  var state = _ref.state, options = _ref.options, name = _ref.name;
  if (state.modifiersData[name]._skip) {
    return;
  }
  var _options$mainAxis = options.mainAxis, checkMainAxis = _options$mainAxis === void 0 ? true : _options$mainAxis, _options$altAxis = options.altAxis, checkAltAxis = _options$altAxis === void 0 ? true : _options$altAxis, specifiedFallbackPlacements = options.fallbackPlacements, padding = options.padding, boundary = options.boundary, rootBoundary = options.rootBoundary, altBoundary = options.altBoundary, _options$flipVariatio = options.flipVariations, flipVariations = _options$flipVariatio === void 0 ? true : _options$flipVariatio, allowedAutoPlacements = options.allowedAutoPlacements;
  var preferredPlacement = state.options.placement;
  var basePlacement = getBasePlacement(preferredPlacement);
  var isBasePlacement = basePlacement === preferredPlacement;
  var fallbackPlacements = specifiedFallbackPlacements || (isBasePlacement || !flipVariations ? [getOppositePlacement(preferredPlacement)] : getExpandedFallbackPlacements(preferredPlacement));
  var placements2 = [preferredPlacement].concat(fallbackPlacements).reduce(function(acc, placement2) {
    return acc.concat(getBasePlacement(placement2) === auto ? computeAutoPlacement(state, {
      placement: placement2,
      boundary,
      rootBoundary,
      padding,
      flipVariations,
      allowedAutoPlacements
    }) : placement2);
  }, []);
  var referenceRect = state.rects.reference;
  var popperRect = state.rects.popper;
  var checksMap = new Map();
  var makeFallbackChecks = true;
  var firstFittingPlacement = placements2[0];
  for (var i = 0; i < placements2.length; i++) {
    var placement = placements2[i];
    var _basePlacement = getBasePlacement(placement);
    var isStartVariation = getVariation(placement) === start;
    var isVertical = [top, bottom].indexOf(_basePlacement) >= 0;
    var len = isVertical ? "width" : "height";
    var overflow = detectOverflow(state, {
      placement,
      boundary,
      rootBoundary,
      altBoundary,
      padding
    });
    var mainVariationSide = isVertical ? isStartVariation ? right : left : isStartVariation ? bottom : top;
    if (referenceRect[len] > popperRect[len]) {
      mainVariationSide = getOppositePlacement(mainVariationSide);
    }
    var altVariationSide = getOppositePlacement(mainVariationSide);
    var checks = [];
    if (checkMainAxis) {
      checks.push(overflow[_basePlacement] <= 0);
    }
    if (checkAltAxis) {
      checks.push(overflow[mainVariationSide] <= 0, overflow[altVariationSide] <= 0);
    }
    if (checks.every(function(check) {
      return check;
    })) {
      firstFittingPlacement = placement;
      makeFallbackChecks = false;
      break;
    }
    checksMap.set(placement, checks);
  }
  if (makeFallbackChecks) {
    var numberOfChecks = flipVariations ? 3 : 1;
    var _loop = function _loop2(_i2) {
      var fittingPlacement = placements2.find(function(placement2) {
        var checks2 = checksMap.get(placement2);
        if (checks2) {
          return checks2.slice(0, _i2).every(function(check) {
            return check;
          });
        }
      });
      if (fittingPlacement) {
        firstFittingPlacement = fittingPlacement;
        return "break";
      }
    };
    for (var _i = numberOfChecks; _i > 0; _i--) {
      var _ret = _loop(_i);
      if (_ret === "break")
        break;
    }
  }
  if (state.placement !== firstFittingPlacement) {
    state.modifiersData[name]._skip = true;
    state.placement = firstFittingPlacement;
    state.reset = true;
  }
}
var flip$1 = {
  name: "flip",
  enabled: true,
  phase: "main",
  fn: flip,
  requiresIfExists: ["offset"],
  data: {
    _skip: false
  }
};
function getSideOffsets(overflow, rect, preventedOffsets) {
  if (preventedOffsets === void 0) {
    preventedOffsets = {
      x: 0,
      y: 0
    };
  }
  return {
    top: overflow.top - rect.height - preventedOffsets.y,
    right: overflow.right - rect.width + preventedOffsets.x,
    bottom: overflow.bottom - rect.height + preventedOffsets.y,
    left: overflow.left - rect.width - preventedOffsets.x
  };
}
function isAnySideFullyClipped(overflow) {
  return [top, right, bottom, left].some(function(side) {
    return overflow[side] >= 0;
  });
}
function hide(_ref) {
  var state = _ref.state, name = _ref.name;
  var referenceRect = state.rects.reference;
  var popperRect = state.rects.popper;
  var preventedOffsets = state.modifiersData.preventOverflow;
  var referenceOverflow = detectOverflow(state, {
    elementContext: "reference"
  });
  var popperAltOverflow = detectOverflow(state, {
    altBoundary: true
  });
  var referenceClippingOffsets = getSideOffsets(referenceOverflow, referenceRect);
  var popperEscapeOffsets = getSideOffsets(popperAltOverflow, popperRect, preventedOffsets);
  var isReferenceHidden = isAnySideFullyClipped(referenceClippingOffsets);
  var hasPopperEscaped = isAnySideFullyClipped(popperEscapeOffsets);
  state.modifiersData[name] = {
    referenceClippingOffsets,
    popperEscapeOffsets,
    isReferenceHidden,
    hasPopperEscaped
  };
  state.attributes.popper = Object.assign({}, state.attributes.popper, {
    "data-popper-reference-hidden": isReferenceHidden,
    "data-popper-escaped": hasPopperEscaped
  });
}
var hide$1 = {
  name: "hide",
  enabled: true,
  phase: "main",
  requiresIfExists: ["preventOverflow"],
  fn: hide
};
function distanceAndSkiddingToXY(placement, rects, offset2) {
  var basePlacement = getBasePlacement(placement);
  var invertDistance = [left, top].indexOf(basePlacement) >= 0 ? -1 : 1;
  var _ref = typeof offset2 === "function" ? offset2(Object.assign({}, rects, {
    placement
  })) : offset2, skidding = _ref[0], distance = _ref[1];
  skidding = skidding || 0;
  distance = (distance || 0) * invertDistance;
  return [left, right].indexOf(basePlacement) >= 0 ? {
    x: distance,
    y: skidding
  } : {
    x: skidding,
    y: distance
  };
}
function offset(_ref2) {
  var state = _ref2.state, options = _ref2.options, name = _ref2.name;
  var _options$offset = options.offset, offset2 = _options$offset === void 0 ? [0, 0] : _options$offset;
  var data = placements.reduce(function(acc, placement) {
    acc[placement] = distanceAndSkiddingToXY(placement, state.rects, offset2);
    return acc;
  }, {});
  var _data$state$placement = data[state.placement], x = _data$state$placement.x, y2 = _data$state$placement.y;
  if (state.modifiersData.popperOffsets != null) {
    state.modifiersData.popperOffsets.x += x;
    state.modifiersData.popperOffsets.y += y2;
  }
  state.modifiersData[name] = data;
}
var offset$1 = {
  name: "offset",
  enabled: true,
  phase: "main",
  requires: ["popperOffsets"],
  fn: offset
};
function popperOffsets(_ref) {
  var state = _ref.state, name = _ref.name;
  state.modifiersData[name] = computeOffsets({
    reference: state.rects.reference,
    element: state.rects.popper,
    strategy: "absolute",
    placement: state.placement
  });
}
var popperOffsets$1 = {
  name: "popperOffsets",
  enabled: true,
  phase: "read",
  fn: popperOffsets,
  data: {}
};
function getAltAxis(axis) {
  return axis === "x" ? "y" : "x";
}
function preventOverflow(_ref) {
  var state = _ref.state, options = _ref.options, name = _ref.name;
  var _options$mainAxis = options.mainAxis, checkMainAxis = _options$mainAxis === void 0 ? true : _options$mainAxis, _options$altAxis = options.altAxis, checkAltAxis = _options$altAxis === void 0 ? false : _options$altAxis, boundary = options.boundary, rootBoundary = options.rootBoundary, altBoundary = options.altBoundary, padding = options.padding, _options$tether = options.tether, tether = _options$tether === void 0 ? true : _options$tether, _options$tetherOffset = options.tetherOffset, tetherOffset = _options$tetherOffset === void 0 ? 0 : _options$tetherOffset;
  var overflow = detectOverflow(state, {
    boundary,
    rootBoundary,
    padding,
    altBoundary
  });
  var basePlacement = getBasePlacement(state.placement);
  var variation = getVariation(state.placement);
  var isBasePlacement = !variation;
  var mainAxis = getMainAxisFromPlacement(basePlacement);
  var altAxis = getAltAxis(mainAxis);
  var popperOffsets2 = state.modifiersData.popperOffsets;
  var referenceRect = state.rects.reference;
  var popperRect = state.rects.popper;
  var tetherOffsetValue = typeof tetherOffset === "function" ? tetherOffset(Object.assign({}, state.rects, {
    placement: state.placement
  })) : tetherOffset;
  var data = {
    x: 0,
    y: 0
  };
  if (!popperOffsets2) {
    return;
  }
  if (checkMainAxis || checkAltAxis) {
    var mainSide = mainAxis === "y" ? top : left;
    var altSide = mainAxis === "y" ? bottom : right;
    var len = mainAxis === "y" ? "height" : "width";
    var offset2 = popperOffsets2[mainAxis];
    var min$1 = popperOffsets2[mainAxis] + overflow[mainSide];
    var max$1 = popperOffsets2[mainAxis] - overflow[altSide];
    var additive = tether ? -popperRect[len] / 2 : 0;
    var minLen = variation === start ? referenceRect[len] : popperRect[len];
    var maxLen = variation === start ? -popperRect[len] : -referenceRect[len];
    var arrowElement = state.elements.arrow;
    var arrowRect = tether && arrowElement ? getLayoutRect(arrowElement) : {
      width: 0,
      height: 0
    };
    var arrowPaddingObject = state.modifiersData["arrow#persistent"] ? state.modifiersData["arrow#persistent"].padding : getFreshSideObject();
    var arrowPaddingMin = arrowPaddingObject[mainSide];
    var arrowPaddingMax = arrowPaddingObject[altSide];
    var arrowLen = within(0, referenceRect[len], arrowRect[len]);
    var minOffset = isBasePlacement ? referenceRect[len] / 2 - additive - arrowLen - arrowPaddingMin - tetherOffsetValue : minLen - arrowLen - arrowPaddingMin - tetherOffsetValue;
    var maxOffset = isBasePlacement ? -referenceRect[len] / 2 + additive + arrowLen + arrowPaddingMax + tetherOffsetValue : maxLen + arrowLen + arrowPaddingMax + tetherOffsetValue;
    var arrowOffsetParent = state.elements.arrow && getOffsetParent(state.elements.arrow);
    var clientOffset = arrowOffsetParent ? mainAxis === "y" ? arrowOffsetParent.clientTop || 0 : arrowOffsetParent.clientLeft || 0 : 0;
    var offsetModifierValue = state.modifiersData.offset ? state.modifiersData.offset[state.placement][mainAxis] : 0;
    var tetherMin = popperOffsets2[mainAxis] + minOffset - offsetModifierValue - clientOffset;
    var tetherMax = popperOffsets2[mainAxis] + maxOffset - offsetModifierValue;
    if (checkMainAxis) {
      var preventedOffset = within(tether ? min(min$1, tetherMin) : min$1, offset2, tether ? max(max$1, tetherMax) : max$1);
      popperOffsets2[mainAxis] = preventedOffset;
      data[mainAxis] = preventedOffset - offset2;
    }
    if (checkAltAxis) {
      var _mainSide = mainAxis === "x" ? top : left;
      var _altSide = mainAxis === "x" ? bottom : right;
      var _offset = popperOffsets2[altAxis];
      var _min = _offset + overflow[_mainSide];
      var _max = _offset - overflow[_altSide];
      var _preventedOffset = within(tether ? min(_min, tetherMin) : _min, _offset, tether ? max(_max, tetherMax) : _max);
      popperOffsets2[altAxis] = _preventedOffset;
      data[altAxis] = _preventedOffset - _offset;
    }
  }
  state.modifiersData[name] = data;
}
var preventOverflow$1 = {
  name: "preventOverflow",
  enabled: true,
  phase: "main",
  fn: preventOverflow,
  requiresIfExists: ["offset"]
};
function getHTMLElementScroll(element) {
  return {
    scrollLeft: element.scrollLeft,
    scrollTop: element.scrollTop
  };
}
function getNodeScroll(node) {
  if (node === getWindow(node) || !isHTMLElement(node)) {
    return getWindowScroll(node);
  } else {
    return getHTMLElementScroll(node);
  }
}
function isElementScaled(element) {
  var rect = element.getBoundingClientRect();
  var scaleX = rect.width / element.offsetWidth || 1;
  var scaleY = rect.height / element.offsetHeight || 1;
  return scaleX !== 1 || scaleY !== 1;
}
function getCompositeRect(elementOrVirtualElement, offsetParent, isFixed) {
  if (isFixed === void 0) {
    isFixed = false;
  }
  var isOffsetParentAnElement = isHTMLElement(offsetParent);
  isHTMLElement(offsetParent) && isElementScaled(offsetParent);
  var documentElement = getDocumentElement(offsetParent);
  var rect = getBoundingClientRect(elementOrVirtualElement);
  var scroll = {
    scrollLeft: 0,
    scrollTop: 0
  };
  var offsets = {
    x: 0,
    y: 0
  };
  if (isOffsetParentAnElement || !isOffsetParentAnElement && !isFixed) {
    if (getNodeName(offsetParent) !== "body" || isScrollParent(documentElement)) {
      scroll = getNodeScroll(offsetParent);
    }
    if (isHTMLElement(offsetParent)) {
      offsets = getBoundingClientRect(offsetParent);
      offsets.x += offsetParent.clientLeft;
      offsets.y += offsetParent.clientTop;
    } else if (documentElement) {
      offsets.x = getWindowScrollBarX(documentElement);
    }
  }
  return {
    x: rect.left + scroll.scrollLeft - offsets.x,
    y: rect.top + scroll.scrollTop - offsets.y,
    width: rect.width,
    height: rect.height
  };
}
function order(modifiers) {
  var map2 = new Map();
  var visited = new Set();
  var result = [];
  modifiers.forEach(function(modifier) {
    map2.set(modifier.name, modifier);
  });
  function sort(modifier) {
    visited.add(modifier.name);
    var requires = [].concat(modifier.requires || [], modifier.requiresIfExists || []);
    requires.forEach(function(dep) {
      if (!visited.has(dep)) {
        var depModifier = map2.get(dep);
        if (depModifier) {
          sort(depModifier);
        }
      }
    });
    result.push(modifier);
  }
  modifiers.forEach(function(modifier) {
    if (!visited.has(modifier.name)) {
      sort(modifier);
    }
  });
  return result;
}
function orderModifiers(modifiers) {
  var orderedModifiers = order(modifiers);
  return modifierPhases.reduce(function(acc, phase) {
    return acc.concat(orderedModifiers.filter(function(modifier) {
      return modifier.phase === phase;
    }));
  }, []);
}
function debounce(fn2) {
  var pending;
  return function() {
    if (!pending) {
      pending = new Promise(function(resolve) {
        Promise.resolve().then(function() {
          pending = void 0;
          resolve(fn2());
        });
      });
    }
    return pending;
  };
}
function mergeByName(modifiers) {
  var merged = modifiers.reduce(function(merged2, current) {
    var existing = merged2[current.name];
    merged2[current.name] = existing ? Object.assign({}, existing, current, {
      options: Object.assign({}, existing.options, current.options),
      data: Object.assign({}, existing.data, current.data)
    }) : current;
    return merged2;
  }, {});
  return Object.keys(merged).map(function(key) {
    return merged[key];
  });
}
var DEFAULT_OPTIONS = {
  placement: "bottom",
  modifiers: [],
  strategy: "absolute"
};
function areValidElements() {
  for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
    args[_key] = arguments[_key];
  }
  return !args.some(function(element) {
    return !(element && typeof element.getBoundingClientRect === "function");
  });
}
function popperGenerator(generatorOptions) {
  if (generatorOptions === void 0) {
    generatorOptions = {};
  }
  var _generatorOptions = generatorOptions, _generatorOptions$def = _generatorOptions.defaultModifiers, defaultModifiers2 = _generatorOptions$def === void 0 ? [] : _generatorOptions$def, _generatorOptions$def2 = _generatorOptions.defaultOptions, defaultOptions = _generatorOptions$def2 === void 0 ? DEFAULT_OPTIONS : _generatorOptions$def2;
  return function createPopper2(reference2, popper2, options) {
    if (options === void 0) {
      options = defaultOptions;
    }
    var state = {
      placement: "bottom",
      orderedModifiers: [],
      options: Object.assign({}, DEFAULT_OPTIONS, defaultOptions),
      modifiersData: {},
      elements: {
        reference: reference2,
        popper: popper2
      },
      attributes: {},
      styles: {}
    };
    var effectCleanupFns = [];
    var isDestroyed = false;
    var instance = {
      state,
      setOptions: function setOptions(setOptionsAction) {
        var options2 = typeof setOptionsAction === "function" ? setOptionsAction(state.options) : setOptionsAction;
        cleanupModifierEffects();
        state.options = Object.assign({}, defaultOptions, state.options, options2);
        state.scrollParents = {
          reference: isElement(reference2) ? listScrollParents(reference2) : reference2.contextElement ? listScrollParents(reference2.contextElement) : [],
          popper: listScrollParents(popper2)
        };
        var orderedModifiers = orderModifiers(mergeByName([].concat(defaultModifiers2, state.options.modifiers)));
        state.orderedModifiers = orderedModifiers.filter(function(m2) {
          return m2.enabled;
        });
        runModifierEffects();
        return instance.update();
      },
      forceUpdate: function forceUpdate() {
        if (isDestroyed) {
          return;
        }
        var _state$elements = state.elements, reference3 = _state$elements.reference, popper3 = _state$elements.popper;
        if (!areValidElements(reference3, popper3)) {
          return;
        }
        state.rects = {
          reference: getCompositeRect(reference3, getOffsetParent(popper3), state.options.strategy === "fixed"),
          popper: getLayoutRect(popper3)
        };
        state.reset = false;
        state.placement = state.options.placement;
        state.orderedModifiers.forEach(function(modifier) {
          return state.modifiersData[modifier.name] = Object.assign({}, modifier.data);
        });
        for (var index2 = 0; index2 < state.orderedModifiers.length; index2++) {
          if (state.reset === true) {
            state.reset = false;
            index2 = -1;
            continue;
          }
          var _state$orderedModifie = state.orderedModifiers[index2], fn2 = _state$orderedModifie.fn, _state$orderedModifie2 = _state$orderedModifie.options, _options = _state$orderedModifie2 === void 0 ? {} : _state$orderedModifie2, name = _state$orderedModifie.name;
          if (typeof fn2 === "function") {
            state = fn2({
              state,
              options: _options,
              name,
              instance
            }) || state;
          }
        }
      },
      update: debounce(function() {
        return new Promise(function(resolve) {
          instance.forceUpdate();
          resolve(state);
        });
      }),
      destroy: function destroy() {
        cleanupModifierEffects();
        isDestroyed = true;
      }
    };
    if (!areValidElements(reference2, popper2)) {
      return instance;
    }
    instance.setOptions(options).then(function(state2) {
      if (!isDestroyed && options.onFirstUpdate) {
        options.onFirstUpdate(state2);
      }
    });
    function runModifierEffects() {
      state.orderedModifiers.forEach(function(_ref3) {
        var name = _ref3.name, _ref3$options = _ref3.options, options2 = _ref3$options === void 0 ? {} : _ref3$options, effect2 = _ref3.effect;
        if (typeof effect2 === "function") {
          var cleanupFn = effect2({
            state,
            name,
            instance,
            options: options2
          });
          var noopFn = function noopFn2() {
          };
          effectCleanupFns.push(cleanupFn || noopFn);
        }
      });
    }
    function cleanupModifierEffects() {
      effectCleanupFns.forEach(function(fn2) {
        return fn2();
      });
      effectCleanupFns = [];
    }
    return instance;
  };
}
var defaultModifiers = [eventListeners, popperOffsets$1, computeStyles$1, applyStyles$1, offset$1, flip$1, preventOverflow$1, arrow$1, hide$1];
var createPopper = /* @__PURE__ */ popperGenerator({
  defaultModifiers
});
const _excluded$U = ["anchorEl", "children", "disablePortal", "modifiers", "open", "placement", "popperOptions", "popperRef", "TransitionProps"], _excluded2$5 = ["anchorEl", "children", "container", "disablePortal", "keepMounted", "modifiers", "open", "placement", "popperOptions", "popperRef", "style", "transition"];
function flipPlacement(placement, theme2) {
  const direction = theme2 && theme2.direction || "ltr";
  if (direction === "ltr") {
    return placement;
  }
  switch (placement) {
    case "bottom-end":
      return "bottom-start";
    case "bottom-start":
      return "bottom-end";
    case "top-end":
      return "top-start";
    case "top-start":
      return "top-end";
    default:
      return placement;
  }
}
function resolveAnchorEl$1(anchorEl) {
  return typeof anchorEl === "function" ? anchorEl() : anchorEl;
}
const defaultPopperOptions = {};
const PopperTooltip = /* @__PURE__ */ react.exports.forwardRef(function PopperTooltip2(props, ref) {
  const {
    anchorEl,
    children,
    disablePortal,
    modifiers,
    open,
    placement: initialPlacement,
    popperOptions,
    popperRef: popperRefProp,
    TransitionProps
  } = props, other = _objectWithoutPropertiesLoose$1(props, _excluded$U);
  const tooltipRef = react.exports.useRef(null);
  const ownRef = useForkRef(tooltipRef, ref);
  const popperRef = react.exports.useRef(null);
  const handlePopperRef = useForkRef(popperRef, popperRefProp);
  const handlePopperRefRef = react.exports.useRef(handlePopperRef);
  useEnhancedEffect$1(() => {
    handlePopperRefRef.current = handlePopperRef;
  }, [handlePopperRef]);
  react.exports.useImperativeHandle(popperRefProp, () => popperRef.current, []);
  const theme2 = useTheme$3();
  const rtlPlacement = flipPlacement(initialPlacement, theme2);
  const [placement, setPlacement] = react.exports.useState(rtlPlacement);
  react.exports.useEffect(() => {
    if (popperRef.current) {
      popperRef.current.forceUpdate();
    }
  });
  useEnhancedEffect$1(() => {
    if (!anchorEl || !open) {
      return void 0;
    }
    const handlePopperUpdate = (data) => {
      setPlacement(data.placement);
    };
    resolveAnchorEl$1(anchorEl);
    let popperModifiers = [{
      name: "preventOverflow",
      options: {
        altBoundary: disablePortal
      }
    }, {
      name: "flip",
      options: {
        altBoundary: disablePortal
      }
    }, {
      name: "onUpdate",
      enabled: true,
      phase: "afterWrite",
      fn: ({
        state
      }) => {
        handlePopperUpdate(state);
      }
    }];
    if (modifiers != null) {
      popperModifiers = popperModifiers.concat(modifiers);
    }
    if (popperOptions && popperOptions.modifiers != null) {
      popperModifiers = popperModifiers.concat(popperOptions.modifiers);
    }
    const popper2 = createPopper(resolveAnchorEl$1(anchorEl), tooltipRef.current, _extends$3({
      placement: rtlPlacement
    }, popperOptions, {
      modifiers: popperModifiers
    }));
    handlePopperRefRef.current(popper2);
    return () => {
      popper2.destroy();
      handlePopperRefRef.current(null);
    };
  }, [anchorEl, disablePortal, modifiers, open, popperOptions, rtlPlacement]);
  const childProps = {
    placement
  };
  if (TransitionProps !== null) {
    childProps.TransitionProps = TransitionProps;
  }
  return /* @__PURE__ */ jsx("div", _extends$3({
    ref: ownRef,
    role: "tooltip"
  }, other, {
    children: typeof children === "function" ? children(childProps) : children
  }));
});
const Popper = /* @__PURE__ */ react.exports.forwardRef(function Popper2(props, ref) {
  const {
    anchorEl,
    children,
    container: containerProp,
    disablePortal = false,
    keepMounted = false,
    modifiers,
    open,
    placement = "bottom",
    popperOptions = defaultPopperOptions,
    popperRef,
    style: style2,
    transition = false
  } = props, other = _objectWithoutPropertiesLoose$1(props, _excluded2$5);
  const [exited, setExited] = react.exports.useState(true);
  const handleEnter = () => {
    setExited(false);
  };
  const handleExited = () => {
    setExited(true);
  };
  if (!keepMounted && !open && (!transition || exited)) {
    return null;
  }
  const container = containerProp || (anchorEl ? ownerDocument(resolveAnchorEl$1(anchorEl)).body : void 0);
  return /* @__PURE__ */ jsx(Portal$1, {
    disablePortal,
    container,
    children: /* @__PURE__ */ jsx(PopperTooltip, _extends$3({
      anchorEl,
      disablePortal,
      modifiers,
      ref,
      open: transition ? !exited : open,
      placement,
      popperOptions,
      popperRef
    }, other, {
      style: _extends$3({
        position: "fixed",
        top: 0,
        left: 0,
        display: !open && keepMounted && (!transition || exited) ? "none" : null
      }, style2),
      TransitionProps: transition ? {
        in: open,
        onEnter: handleEnter,
        onExited: handleExited
      } : null,
      children
    }))
  });
});
var Popper$1 = Popper;
const _excluded$T = ["onChange", "maxRows", "minRows", "style", "value"];
function getStyleValue(computedStyle, property) {
  return parseInt(computedStyle[property], 10) || 0;
}
const styles$3 = {
  shadow: {
    visibility: "hidden",
    position: "absolute",
    overflow: "hidden",
    height: 0,
    top: 0,
    left: 0,
    transform: "translateZ(0)"
  }
};
const TextareaAutosize = /* @__PURE__ */ react.exports.forwardRef(function TextareaAutosize2(props, ref) {
  const {
    onChange,
    maxRows,
    minRows = 1,
    style: style2,
    value
  } = props, other = _objectWithoutPropertiesLoose$1(props, _excluded$T);
  const {
    current: isControlled
  } = react.exports.useRef(value != null);
  const inputRef = react.exports.useRef(null);
  const handleRef = useForkRef(ref, inputRef);
  const shadowRef = react.exports.useRef(null);
  const renders = react.exports.useRef(0);
  const [state, setState2] = react.exports.useState({});
  const syncHeight = react.exports.useCallback(() => {
    const input = inputRef.current;
    const containerWindow = ownerWindow(input);
    const computedStyle = containerWindow.getComputedStyle(input);
    if (computedStyle.width === "0px") {
      return;
    }
    const inputShallow = shadowRef.current;
    inputShallow.style.width = computedStyle.width;
    inputShallow.value = input.value || props.placeholder || "x";
    if (inputShallow.value.slice(-1) === "\n") {
      inputShallow.value += " ";
    }
    const boxSizing = computedStyle["box-sizing"];
    const padding = getStyleValue(computedStyle, "padding-bottom") + getStyleValue(computedStyle, "padding-top");
    const border = getStyleValue(computedStyle, "border-bottom-width") + getStyleValue(computedStyle, "border-top-width");
    const innerHeight = inputShallow.scrollHeight;
    inputShallow.value = "x";
    const singleRowHeight = inputShallow.scrollHeight;
    let outerHeight = innerHeight;
    if (minRows) {
      outerHeight = Math.max(Number(minRows) * singleRowHeight, outerHeight);
    }
    if (maxRows) {
      outerHeight = Math.min(Number(maxRows) * singleRowHeight, outerHeight);
    }
    outerHeight = Math.max(outerHeight, singleRowHeight);
    const outerHeightStyle = outerHeight + (boxSizing === "border-box" ? padding + border : 0);
    const overflow = Math.abs(outerHeight - innerHeight) <= 1;
    setState2((prevState) => {
      if (renders.current < 20 && (outerHeightStyle > 0 && Math.abs((prevState.outerHeightStyle || 0) - outerHeightStyle) > 1 || prevState.overflow !== overflow)) {
        renders.current += 1;
        return {
          overflow,
          outerHeightStyle
        };
      }
      return prevState;
    });
  }, [maxRows, minRows, props.placeholder]);
  react.exports.useEffect(() => {
    const handleResize = debounce$1(() => {
      renders.current = 0;
      syncHeight();
    });
    const containerWindow = ownerWindow(inputRef.current);
    containerWindow.addEventListener("resize", handleResize);
    let resizeObserver;
    if (typeof ResizeObserver !== "undefined") {
      resizeObserver = new ResizeObserver(handleResize);
      resizeObserver.observe(inputRef.current);
    }
    return () => {
      handleResize.clear();
      containerWindow.removeEventListener("resize", handleResize);
      if (resizeObserver) {
        resizeObserver.disconnect();
      }
    };
  }, [syncHeight]);
  useEnhancedEffect$1(() => {
    syncHeight();
  });
  react.exports.useEffect(() => {
    renders.current = 0;
  }, [value]);
  const handleChange = (event) => {
    renders.current = 0;
    if (!isControlled) {
      syncHeight();
    }
    if (onChange) {
      onChange(event);
    }
  };
  return /* @__PURE__ */ jsxs(react.exports.Fragment, {
    children: [/* @__PURE__ */ jsx("textarea", _extends$3({
      value,
      onChange: handleChange,
      ref: handleRef,
      rows: minRows,
      style: _extends$3({
        height: state.outerHeightStyle,
        overflow: state.overflow ? "hidden" : null
      }, style2)
    }, other)), /* @__PURE__ */ jsx("textarea", {
      "aria-hidden": true,
      className: props.className,
      readOnly: true,
      ref: shadowRef,
      tabIndex: -1,
      style: _extends$3({}, styles$3.shadow, style2, {
        padding: 0
      })
    })]
  });
});
var TextareaAutosize$1 = TextareaAutosize;
function useTheme() {
  const theme2 = useTheme$2(defaultTheme$1);
  return theme2;
}
var r$1, B$1 = r$1 || (r$1 = {});
B$1.Pop = "POP";
B$1.Push = "PUSH";
B$1.Replace = "REPLACE";
var C$1 = function(b2) {
  return b2;
};
function E$1(b2) {
  b2.preventDefault();
  b2.returnValue = "";
}
function F$1() {
  var b2 = [];
  return { get length() {
    return b2.length;
  }, push: function(h2) {
    b2.push(h2);
    return function() {
      b2 = b2.filter(function(k2) {
        return k2 !== h2;
      });
    };
  }, call: function(h2) {
    b2.forEach(function(k2) {
      return k2 && k2(h2);
    });
  } };
}
function H$1() {
  return Math.random().toString(36).substr(2, 8);
}
function I$1(b2) {
  var h2 = b2.pathname, k2 = b2.search;
  b2 = b2.hash;
  return (h2 === void 0 ? "/" : h2) + (k2 === void 0 ? "" : k2) + (b2 === void 0 ? "" : b2);
}
function J(b2) {
  var h2 = {};
  if (b2) {
    var k2 = b2.indexOf("#");
    0 <= k2 && (h2.hash = b2.substr(k2), b2 = b2.substr(0, k2));
    k2 = b2.indexOf("?");
    0 <= k2 && (h2.search = b2.substr(k2), b2 = b2.substr(0, k2));
    b2 && (h2.pathname = b2);
  }
  return h2;
}
function createHashHistory(b2) {
  function h2() {
    var a = J(m2.location.hash.substr(1)), e2 = a.pathname, l2 = a.search;
    a = a.hash;
    var g2 = u2.state || {};
    return [g2.idx, C$1({ pathname: e2 === void 0 ? "/" : e2, search: l2 === void 0 ? "" : l2, hash: a === void 0 ? "" : a, state: g2.usr || null, key: g2.key || "default" })];
  }
  function k2() {
    if (t2)
      c2.call(t2), t2 = null;
    else {
      var a = r$1.Pop, e2 = h2(), l2 = e2[0];
      e2 = e2[1];
      if (c2.length)
        if (l2 != null) {
          var g2 = q2 - l2;
          g2 && (t2 = { action: a, location: e2, retry: function() {
            p2(-1 * g2);
          } }, p2(g2));
        } else
          ;
      else
        A2(a);
    }
  }
  function x(a) {
    var e2 = document.querySelector("base"), l2 = "";
    e2 && e2.getAttribute("href") && (e2 = m2.location.href, l2 = e2.indexOf("#"), l2 = l2 === -1 ? e2 : e2.slice(0, l2));
    return l2 + "#" + (typeof a === "string" ? a : I$1(a));
  }
  function z2(a, e2) {
    e2 === void 0 && (e2 = null);
    return C$1(_extends$3({ pathname: d2.pathname, hash: "", search: "" }, typeof a === "string" ? J(a) : a, { state: e2, key: H$1() }));
  }
  function A2(a) {
    v2 = a;
    a = h2();
    q2 = a[0];
    d2 = a[1];
    f2.call({ action: v2, location: d2 });
  }
  function y2(a, e2) {
    function l2() {
      y2(a, e2);
    }
    var g2 = r$1.Push, n2 = z2(a, e2);
    if (!c2.length || (c2.call({ action: g2, location: n2, retry: l2 }), false)) {
      var G2 = [{ usr: n2.state, key: n2.key, idx: q2 + 1 }, x(n2)];
      n2 = G2[0];
      G2 = G2[1];
      try {
        u2.pushState(n2, "", G2);
      } catch (K) {
        m2.location.assign(G2);
      }
      A2(g2);
    }
  }
  function w2(a, e2) {
    function l2() {
      w2(a, e2);
    }
    var g2 = r$1.Replace, n2 = z2(a, e2);
    c2.length && (c2.call({ action: g2, location: n2, retry: l2 }), 1) || (n2 = [{ usr: n2.state, key: n2.key, idx: q2 }, x(n2)], u2.replaceState(n2[0], "", n2[1]), A2(g2));
  }
  function p2(a) {
    u2.go(a);
  }
  b2 === void 0 && (b2 = {});
  b2 = b2.window;
  var m2 = b2 === void 0 ? document.defaultView : b2, u2 = m2.history, t2 = null;
  m2.addEventListener("popstate", k2);
  m2.addEventListener("hashchange", function() {
    var a = h2()[1];
    I$1(a) !== I$1(d2) && k2();
  });
  var v2 = r$1.Pop;
  b2 = h2();
  var q2 = b2[0], d2 = b2[1], f2 = F$1(), c2 = F$1();
  q2 == null && (q2 = 0, u2.replaceState(_extends$3({}, u2.state, { idx: q2 }), ""));
  return {
    get action() {
      return v2;
    },
    get location() {
      return d2;
    },
    createHref: x,
    push: y2,
    replace: w2,
    go: p2,
    back: function() {
      p2(-1);
    },
    forward: function() {
      p2(1);
    },
    listen: function(a) {
      return f2.push(a);
    },
    block: function(a) {
      var e2 = c2.push(a);
      c2.length === 1 && m2.addEventListener("beforeunload", E$1);
      return function() {
        e2();
        c2.length || m2.removeEventListener("beforeunload", E$1);
      };
    }
  };
}
/**
 * React Router v6.0.1
 *
 * Copyright (c) Remix Software Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.md file in the root directory of this source tree.
 *
 * @license MIT
 */
function invariant(cond, message) {
  if (!cond)
    throw new Error(message);
}
const NavigationContext = /* @__PURE__ */ react.exports.createContext(null);
const LocationContext = /* @__PURE__ */ react.exports.createContext(null);
const RouteContext = /* @__PURE__ */ react.exports.createContext({
  outlet: null,
  matches: []
});
function Outlet(_props) {
  return useOutlet();
}
function Route(_props) {
  invariant(false);
}
function Router(_ref3) {
  let {
    basename: basenameProp = "/",
    children = null,
    location: locationProp,
    navigationType = r$1.Pop,
    navigator: navigator2,
    static: staticProp = false
  } = _ref3;
  !!useInRouterContext() ? invariant(false) : void 0;
  let basename = normalizePathname(basenameProp);
  let navigationContext = react.exports.useMemo(() => ({
    basename,
    navigator: navigator2,
    static: staticProp
  }), [basename, navigator2, staticProp]);
  if (typeof locationProp === "string") {
    locationProp = J(locationProp);
  }
  let {
    pathname = "/",
    search = "",
    hash: hash2 = "",
    state = null,
    key = "default"
  } = locationProp;
  let location = react.exports.useMemo(() => {
    let trailingPathname = stripBasename(pathname, basename);
    if (trailingPathname == null) {
      return null;
    }
    return {
      pathname: trailingPathname,
      search,
      hash: hash2,
      state,
      key
    };
  }, [basename, pathname, search, hash2, state, key]);
  if (location == null) {
    return null;
  }
  return /* @__PURE__ */ react.exports.createElement(NavigationContext.Provider, {
    value: navigationContext
  }, /* @__PURE__ */ react.exports.createElement(LocationContext.Provider, {
    children,
    value: {
      location,
      navigationType
    }
  }));
}
function Routes(_ref4) {
  let {
    children,
    location
  } = _ref4;
  return useRoutes(createRoutesFromChildren(children), location);
}
function useHref(to) {
  !useInRouterContext() ? invariant(false) : void 0;
  let {
    basename,
    navigator: navigator2
  } = react.exports.useContext(NavigationContext);
  let {
    hash: hash2,
    pathname,
    search
  } = useResolvedPath(to);
  let joinedPathname = pathname;
  if (basename !== "/") {
    let toPathname = getToPathname(to);
    let endsWithSlash = toPathname != null && toPathname.endsWith("/");
    joinedPathname = pathname === "/" ? basename + (endsWithSlash ? "/" : "") : joinPaths([basename, pathname]);
  }
  return navigator2.createHref({
    pathname: joinedPathname,
    search,
    hash: hash2
  });
}
function useInRouterContext() {
  return react.exports.useContext(LocationContext) != null;
}
function useLocation() {
  !useInRouterContext() ? invariant(false) : void 0;
  return react.exports.useContext(LocationContext).location;
}
function useNavigate() {
  !useInRouterContext() ? invariant(false) : void 0;
  let {
    basename,
    navigator: navigator2
  } = react.exports.useContext(NavigationContext);
  let {
    matches
  } = react.exports.useContext(RouteContext);
  let {
    pathname: locationPathname
  } = useLocation();
  let routePathnamesJson = JSON.stringify(matches.map((match) => match.pathnameBase));
  let activeRef = react.exports.useRef(false);
  react.exports.useEffect(() => {
    activeRef.current = true;
  });
  let navigate = react.exports.useCallback(function(to, options) {
    if (options === void 0) {
      options = {};
    }
    if (!activeRef.current)
      return;
    if (typeof to === "number") {
      navigator2.go(to);
      return;
    }
    let path = resolveTo(to, JSON.parse(routePathnamesJson), locationPathname);
    if (basename !== "/") {
      path.pathname = joinPaths([basename, path.pathname]);
    }
    (!!options.replace ? navigator2.replace : navigator2.push)(path, options.state);
  }, [basename, navigator2, routePathnamesJson, locationPathname]);
  return navigate;
}
function useOutlet() {
  return react.exports.useContext(RouteContext).outlet;
}
function useParams() {
  let {
    matches
  } = react.exports.useContext(RouteContext);
  let routeMatch = matches[matches.length - 1];
  return routeMatch ? routeMatch.params : {};
}
function useResolvedPath(to) {
  let {
    matches
  } = react.exports.useContext(RouteContext);
  let {
    pathname: locationPathname
  } = useLocation();
  let routePathnamesJson = JSON.stringify(matches.map((match) => match.pathnameBase));
  return react.exports.useMemo(() => resolveTo(to, JSON.parse(routePathnamesJson), locationPathname), [to, routePathnamesJson, locationPathname]);
}
function useRoutes(routes, locationArg) {
  !useInRouterContext() ? invariant(false) : void 0;
  let {
    matches: parentMatches
  } = react.exports.useContext(RouteContext);
  let routeMatch = parentMatches[parentMatches.length - 1];
  let parentParams = routeMatch ? routeMatch.params : {};
  routeMatch ? routeMatch.pathname : "/";
  let parentPathnameBase = routeMatch ? routeMatch.pathnameBase : "/";
  routeMatch && routeMatch.route;
  let locationFromContext = useLocation();
  let location;
  if (locationArg) {
    var _parsedLocationArg$pa;
    let parsedLocationArg = typeof locationArg === "string" ? J(locationArg) : locationArg;
    !(parentPathnameBase === "/" || ((_parsedLocationArg$pa = parsedLocationArg.pathname) == null ? void 0 : _parsedLocationArg$pa.startsWith(parentPathnameBase))) ? invariant(false) : void 0;
    location = parsedLocationArg;
  } else {
    location = locationFromContext;
  }
  let pathname = location.pathname || "/";
  let remainingPathname = parentPathnameBase === "/" ? pathname : pathname.slice(parentPathnameBase.length) || "/";
  let matches = matchRoutes(routes, {
    pathname: remainingPathname
  });
  return _renderMatches(matches && matches.map((match) => Object.assign({}, match, {
    params: Object.assign({}, parentParams, match.params),
    pathname: joinPaths([parentPathnameBase, match.pathname]),
    pathnameBase: match.pathnameBase === "/" ? parentPathnameBase : joinPaths([parentPathnameBase, match.pathnameBase])
  })), parentMatches);
}
function createRoutesFromChildren(children) {
  let routes = [];
  react.exports.Children.forEach(children, (element) => {
    if (!/* @__PURE__ */ react.exports.isValidElement(element)) {
      return;
    }
    if (element.type === react.exports.Fragment) {
      routes.push.apply(routes, createRoutesFromChildren(element.props.children));
      return;
    }
    !(element.type === Route) ? invariant(false) : void 0;
    let route = {
      caseSensitive: element.props.caseSensitive,
      element: element.props.element,
      index: element.props.index,
      path: element.props.path
    };
    if (element.props.children) {
      route.children = createRoutesFromChildren(element.props.children);
    }
    routes.push(route);
  });
  return routes;
}
function matchRoutes(routes, locationArg, basename) {
  if (basename === void 0) {
    basename = "/";
  }
  let location = typeof locationArg === "string" ? J(locationArg) : locationArg;
  let pathname = stripBasename(location.pathname || "/", basename);
  if (pathname == null) {
    return null;
  }
  let branches = flattenRoutes(routes);
  rankRouteBranches(branches);
  let matches = null;
  for (let i = 0; matches == null && i < branches.length; ++i) {
    matches = matchRouteBranch(branches[i], routes, pathname);
  }
  return matches;
}
function flattenRoutes(routes, branches, parentsMeta, parentPath) {
  if (branches === void 0) {
    branches = [];
  }
  if (parentsMeta === void 0) {
    parentsMeta = [];
  }
  if (parentPath === void 0) {
    parentPath = "";
  }
  routes.forEach((route, index2) => {
    let meta = {
      relativePath: route.path || "",
      caseSensitive: route.caseSensitive === true,
      childrenIndex: index2
    };
    if (meta.relativePath.startsWith("/")) {
      !meta.relativePath.startsWith(parentPath) ? invariant(false) : void 0;
      meta.relativePath = meta.relativePath.slice(parentPath.length);
    }
    let path = joinPaths([parentPath, meta.relativePath]);
    let routesMeta = parentsMeta.concat(meta);
    if (route.children && route.children.length > 0) {
      !(route.index !== true) ? invariant(false) : void 0;
      flattenRoutes(route.children, branches, routesMeta, path);
    }
    if (route.path == null && !route.index) {
      return;
    }
    branches.push({
      path,
      score: computeScore(path, route.index),
      routesMeta
    });
  });
  return branches;
}
function rankRouteBranches(branches) {
  branches.sort((a, b2) => a.score !== b2.score ? b2.score - a.score : compareIndexes(a.routesMeta.map((meta) => meta.childrenIndex), b2.routesMeta.map((meta) => meta.childrenIndex)));
}
const paramRe = /^:\w+$/;
const dynamicSegmentValue = 3;
const indexRouteValue = 2;
const emptySegmentValue = 1;
const staticSegmentValue = 10;
const splatPenalty = -2;
const isSplat = (s) => s === "*";
function computeScore(path, index2) {
  let segments = path.split("/");
  let initialScore = segments.length;
  if (segments.some(isSplat)) {
    initialScore += splatPenalty;
  }
  if (index2) {
    initialScore += indexRouteValue;
  }
  return segments.filter((s) => !isSplat(s)).reduce((score, segment) => score + (paramRe.test(segment) ? dynamicSegmentValue : segment === "" ? emptySegmentValue : staticSegmentValue), initialScore);
}
function compareIndexes(a, b2) {
  let siblings = a.length === b2.length && a.slice(0, -1).every((n2, i) => n2 === b2[i]);
  return siblings ? a[a.length - 1] - b2[b2.length - 1] : 0;
}
function matchRouteBranch(branch, routesArg, pathname) {
  let routes = routesArg;
  let {
    routesMeta
  } = branch;
  let matchedParams = {};
  let matchedPathname = "/";
  let matches = [];
  for (let i = 0; i < routesMeta.length; ++i) {
    let meta = routesMeta[i];
    let end2 = i === routesMeta.length - 1;
    let remainingPathname = matchedPathname === "/" ? pathname : pathname.slice(matchedPathname.length) || "/";
    let match = matchPath({
      path: meta.relativePath,
      caseSensitive: meta.caseSensitive,
      end: end2
    }, remainingPathname);
    if (!match)
      return null;
    Object.assign(matchedParams, match.params);
    let route = routes[meta.childrenIndex];
    matches.push({
      params: matchedParams,
      pathname: joinPaths([matchedPathname, match.pathname]),
      pathnameBase: joinPaths([matchedPathname, match.pathnameBase]),
      route
    });
    if (match.pathnameBase !== "/") {
      matchedPathname = joinPaths([matchedPathname, match.pathnameBase]);
    }
    routes = route.children;
  }
  return matches;
}
function _renderMatches(matches, parentMatches) {
  if (parentMatches === void 0) {
    parentMatches = [];
  }
  if (matches == null)
    return null;
  return matches.reduceRight((outlet, match, index2) => {
    return /* @__PURE__ */ react.exports.createElement(RouteContext.Provider, {
      children: match.route.element !== void 0 ? match.route.element : /* @__PURE__ */ react.exports.createElement(Outlet, null),
      value: {
        outlet,
        matches: parentMatches.concat(matches.slice(0, index2 + 1))
      }
    });
  }, null);
}
function matchPath(pattern, pathname) {
  if (typeof pattern === "string") {
    pattern = {
      path: pattern,
      caseSensitive: false,
      end: true
    };
  }
  let [matcher, paramNames] = compilePath(pattern.path, pattern.caseSensitive, pattern.end);
  let match = pathname.match(matcher);
  if (!match)
    return null;
  let matchedPathname = match[0];
  let pathnameBase = matchedPathname.replace(/(.)\/+$/, "$1");
  let captureGroups = match.slice(1);
  let params = paramNames.reduce((memo, paramName, index2) => {
    if (paramName === "*") {
      let splatValue = captureGroups[index2] || "";
      pathnameBase = matchedPathname.slice(0, matchedPathname.length - splatValue.length).replace(/(.)\/+$/, "$1");
    }
    memo[paramName] = safelyDecodeURIComponent(captureGroups[index2] || "");
    return memo;
  }, {});
  return {
    params,
    pathname: matchedPathname,
    pathnameBase,
    pattern
  };
}
function compilePath(path, caseSensitive, end2) {
  if (caseSensitive === void 0) {
    caseSensitive = false;
  }
  if (end2 === void 0) {
    end2 = true;
  }
  let paramNames = [];
  let regexpSource = "^" + path.replace(/\/*\*?$/, "").replace(/^\/*/, "/").replace(/[\\.*+^$?{}|()[\]]/g, "\\$&").replace(/:(\w+)/g, (_2, paramName) => {
    paramNames.push(paramName);
    return "([^\\/]+)";
  });
  if (path.endsWith("*")) {
    paramNames.push("*");
    regexpSource += path === "*" || path === "/*" ? "(.*)$" : "(?:\\/(.+)|\\/*)$";
  } else {
    regexpSource += end2 ? "\\/*$" : "(?:\\b|$)";
  }
  let matcher = new RegExp(regexpSource, caseSensitive ? void 0 : "i");
  return [matcher, paramNames];
}
function safelyDecodeURIComponent(value, paramName) {
  try {
    return decodeURIComponent(value);
  } catch (error) {
    return value;
  }
}
function resolvePath(to, fromPathname) {
  if (fromPathname === void 0) {
    fromPathname = "/";
  }
  let {
    pathname: toPathname,
    search = "",
    hash: hash2 = ""
  } = typeof to === "string" ? J(to) : to;
  let pathname = toPathname ? toPathname.startsWith("/") ? toPathname : resolvePathname(toPathname, fromPathname) : fromPathname;
  return {
    pathname,
    search: normalizeSearch(search),
    hash: normalizeHash(hash2)
  };
}
function resolvePathname(relativePath, fromPathname) {
  let segments = fromPathname.replace(/\/+$/, "").split("/");
  let relativeSegments = relativePath.split("/");
  relativeSegments.forEach((segment) => {
    if (segment === "..") {
      if (segments.length > 1)
        segments.pop();
    } else if (segment !== ".") {
      segments.push(segment);
    }
  });
  return segments.length > 1 ? segments.join("/") : "/";
}
function resolveTo(toArg, routePathnames, locationPathname) {
  let to = typeof toArg === "string" ? J(toArg) : toArg;
  let toPathname = toArg === "" || to.pathname === "" ? "/" : to.pathname;
  let from2;
  if (toPathname == null) {
    from2 = locationPathname;
  } else {
    let routePathnameIndex = routePathnames.length - 1;
    if (toPathname.startsWith("..")) {
      let toSegments = toPathname.split("/");
      while (toSegments[0] === "..") {
        toSegments.shift();
        routePathnameIndex -= 1;
      }
      to.pathname = toSegments.join("/");
    }
    from2 = routePathnameIndex >= 0 ? routePathnames[routePathnameIndex] : "/";
  }
  let path = resolvePath(to, from2);
  if (toPathname && toPathname !== "/" && toPathname.endsWith("/") && !path.pathname.endsWith("/")) {
    path.pathname += "/";
  }
  return path;
}
function getToPathname(to) {
  return to === "" || to.pathname === "" ? "/" : typeof to === "string" ? J(to).pathname : to.pathname;
}
function stripBasename(pathname, basename) {
  if (basename === "/")
    return pathname;
  if (!pathname.toLowerCase().startsWith(basename.toLowerCase())) {
    return null;
  }
  let nextChar = pathname.charAt(basename.length);
  if (nextChar && nextChar !== "/") {
    return null;
  }
  return pathname.slice(basename.length) || "/";
}
const joinPaths = (paths) => paths.join("/").replace(/\/\/+/g, "/");
const normalizePathname = (pathname) => pathname.replace(/\/+$/, "").replace(/^\/*/, "/");
const normalizeSearch = (search) => !search || search === "?" ? "" : search.startsWith("?") ? search : "?" + search;
const normalizeHash = (hash2) => !hash2 || hash2 === "#" ? "" : hash2.startsWith("#") ? hash2 : "#" + hash2;
/**
 * React Router DOM v6.0.1
 *
 * Copyright (c) Remix Software Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.md file in the root directory of this source tree.
 *
 * @license MIT
 */
function _extends$2() {
  _extends$2 = Object.assign || function(target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];
      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }
    return target;
  };
  return _extends$2.apply(this, arguments);
}
function _objectWithoutPropertiesLoose(source, excluded) {
  if (source == null)
    return {};
  var target = {};
  var sourceKeys = Object.keys(source);
  var key, i;
  for (i = 0; i < sourceKeys.length; i++) {
    key = sourceKeys[i];
    if (excluded.indexOf(key) >= 0)
      continue;
    target[key] = source[key];
  }
  return target;
}
const _excluded$S = ["onClick", "replace", "state", "target", "to"];
function HashRouter(_ref2) {
  let {
    basename,
    children,
    window: window2
  } = _ref2;
  let historyRef = react.exports.useRef();
  if (historyRef.current == null) {
    historyRef.current = createHashHistory({
      window: window2
    });
  }
  let history = historyRef.current;
  let [state, setState2] = react.exports.useState({
    action: history.action,
    location: history.location
  });
  react.exports.useLayoutEffect(() => history.listen(setState2), [history]);
  return /* @__PURE__ */ react.exports.createElement(Router, {
    basename,
    children,
    location: state.location,
    navigationType: state.action,
    navigator: history
  });
}
function isModifiedEvent(event) {
  return !!(event.metaKey || event.altKey || event.ctrlKey || event.shiftKey);
}
const Link = /* @__PURE__ */ react.exports.forwardRef(function LinkWithRef(_ref3, ref) {
  let {
    onClick,
    replace = false,
    state,
    target,
    to
  } = _ref3, rest = _objectWithoutPropertiesLoose(_ref3, _excluded$S);
  let href = useHref(to);
  let internalOnClick = useLinkClickHandler(to, {
    replace,
    state,
    target
  });
  function handleClick(event) {
    if (onClick)
      onClick(event);
    if (!event.defaultPrevented) {
      internalOnClick(event);
    }
  }
  return /* @__PURE__ */ react.exports.createElement("a", _extends$2({}, rest, {
    href,
    onClick: handleClick,
    ref,
    target
  }));
});
function useLinkClickHandler(to, _temp) {
  let {
    target,
    replace: replaceProp,
    state
  } = _temp === void 0 ? {} : _temp;
  let navigate = useNavigate();
  let location = useLocation();
  let path = useResolvedPath(to);
  return react.exports.useCallback((event) => {
    if (event.button === 0 && (!target || target === "_self") && !isModifiedEvent(event)) {
      event.preventDefault();
      let replace = !!replaceProp || I$1(location) === I$1(path);
      navigate(to, {
        replace,
        state
      });
    }
  }, [location, navigate, path, replaceProp, state, target, to]);
}
const theme = createTheme$2({
  palette: {
    primary: {
      main: "#0d47a1"
    },
    secondary: {
      main: "#ad1457"
    }
  }
});
const docOptionsContext = react.exports.createContext(void 0);
const {
  Provider
} = docOptionsContext;
const DocOptionsContextProvider = (props) => {
  return /* @__PURE__ */ jsx(Provider, {
    value: props.options,
    children: props.children
  });
};
const useDocOptions = () => react.exports.useContext(docOptionsContext);
function getContainerUtilityClass(slot) {
  return generateUtilityClass("MuiContainer", slot);
}
generateUtilityClasses("MuiContainer", ["root", "disableGutters", "fixed", "maxWidthXs", "maxWidthSm", "maxWidthMd", "maxWidthLg", "maxWidthXl"]);
const _excluded$R = ["className", "component", "disableGutters", "fixed", "maxWidth"];
const useUtilityClasses$G = (ownerState) => {
  const {
    classes,
    fixed,
    disableGutters,
    maxWidth
  } = ownerState;
  const slots = {
    root: ["root", maxWidth && `maxWidth${capitalize(String(maxWidth))}`, fixed && "fixed", disableGutters && "disableGutters"]
  };
  return composeClasses(slots, getContainerUtilityClass, classes);
};
const ContainerRoot = styled$3("div", {
  name: "MuiContainer",
  slot: "Root",
  overridesResolver: (props, styles2) => {
    const {
      ownerState
    } = props;
    return [styles2.root, styles2[`maxWidth${capitalize(String(ownerState.maxWidth))}`], ownerState.fixed && styles2.fixed, ownerState.disableGutters && styles2.disableGutters];
  }
})(({
  theme: theme2,
  ownerState
}) => _extends$3({
  width: "100%",
  marginLeft: "auto",
  boxSizing: "border-box",
  marginRight: "auto",
  display: "block"
}, !ownerState.disableGutters && {
  paddingLeft: theme2.spacing(2),
  paddingRight: theme2.spacing(2),
  [theme2.breakpoints.up("sm")]: {
    paddingLeft: theme2.spacing(3),
    paddingRight: theme2.spacing(3)
  }
}), ({
  theme: theme2,
  ownerState
}) => ownerState.fixed && Object.keys(theme2.breakpoints.values).reduce((acc, breakpoint) => {
  const value = theme2.breakpoints.values[breakpoint];
  if (value !== 0) {
    acc[theme2.breakpoints.up(breakpoint)] = {
      maxWidth: `${value}${theme2.breakpoints.unit}`
    };
  }
  return acc;
}, {}), ({
  theme: theme2,
  ownerState
}) => _extends$3({}, ownerState.maxWidth === "xs" && {
  [theme2.breakpoints.up("xs")]: {
    maxWidth: Math.max(theme2.breakpoints.values.xs, 444)
  }
}, ownerState.maxWidth && ownerState.maxWidth !== "xs" && {
  [theme2.breakpoints.up(ownerState.maxWidth)]: {
    maxWidth: `${theme2.breakpoints.values[ownerState.maxWidth]}${theme2.breakpoints.unit}`
  }
}));
const Container = /* @__PURE__ */ react.exports.forwardRef(function Container2(inProps, ref) {
  const props = useThemeProps({
    props: inProps,
    name: "MuiContainer"
  });
  const {
    className,
    component = "div",
    disableGutters = false,
    fixed = false,
    maxWidth = "lg"
  } = props, other = _objectWithoutPropertiesLoose$1(props, _excluded$R);
  const ownerState = _extends$3({}, props, {
    component,
    disableGutters,
    fixed,
    maxWidth
  });
  const classes = useUtilityClasses$G(ownerState);
  return /* @__PURE__ */ jsx(ContainerRoot, _extends$3({
    as: component,
    ownerState,
    className: clsx(classes.root, className),
    ref
  }, other));
});
var Container$1 = Container;
const GridContext = /* @__PURE__ */ react.exports.createContext();
var GridContext$1 = GridContext;
function getGridUtilityClass(slot) {
  return generateUtilityClass("MuiGrid", slot);
}
const SPACINGS = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
const DIRECTIONS = ["column-reverse", "column", "row-reverse", "row"];
const WRAPS = ["nowrap", "wrap-reverse", "wrap"];
const GRID_SIZES = ["auto", true, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
const gridClasses = generateUtilityClasses("MuiGrid", [
  "root",
  "container",
  "item",
  "zeroMinWidth",
  ...SPACINGS.map((spacing) => `spacing-xs-${spacing}`),
  ...DIRECTIONS.map((direction) => `direction-xs-${direction}`),
  ...WRAPS.map((wrap) => `wrap-xs-${wrap}`),
  ...GRID_SIZES.map((size) => `grid-xs-${size}`),
  ...GRID_SIZES.map((size) => `grid-sm-${size}`),
  ...GRID_SIZES.map((size) => `grid-md-${size}`),
  ...GRID_SIZES.map((size) => `grid-lg-${size}`),
  ...GRID_SIZES.map((size) => `grid-xl-${size}`)
]);
const _excluded$Q = ["className", "columns", "columnSpacing", "component", "container", "direction", "item", "lg", "md", "rowSpacing", "sm", "spacing", "wrap", "xl", "xs", "zeroMinWidth"];
function getOffset(val) {
  const parse = parseFloat(val);
  return `${parse}${String(val).replace(String(parse), "") || "px"}`;
}
function generateGrid(globalStyles, theme2, breakpoint, ownerState) {
  const size = ownerState[breakpoint];
  if (!size) {
    return;
  }
  let styles2 = {};
  if (size === true) {
    styles2 = {
      flexBasis: 0,
      flexGrow: 1,
      maxWidth: "100%"
    };
  } else if (size === "auto") {
    styles2 = {
      flexBasis: "auto",
      flexGrow: 0,
      flexShrink: 0,
      maxWidth: "none",
      width: "auto"
    };
  } else {
    const columnsBreakpointValues = resolveBreakpointValues({
      values: ownerState.columns,
      base: theme2.breakpoints.values
    });
    const width = `${Math.round(size / columnsBreakpointValues[breakpoint] * 1e8) / 1e6}%`;
    let more = {};
    if (ownerState.container && ownerState.item && ownerState.columnSpacing !== 0) {
      const themeSpacing = theme2.spacing(ownerState.columnSpacing);
      if (themeSpacing !== "0px") {
        const fullWidth = `calc(${width} + ${getOffset(themeSpacing)})`;
        more = {
          flexBasis: fullWidth,
          maxWidth: fullWidth
        };
      }
    }
    styles2 = _extends$3({
      flexBasis: width,
      flexGrow: 0,
      maxWidth: width
    }, more);
  }
  if (theme2.breakpoints.values[breakpoint] === 0) {
    Object.assign(globalStyles, styles2);
  } else {
    globalStyles[theme2.breakpoints.up(breakpoint)] = styles2;
  }
}
function generateDirection({
  theme: theme2,
  ownerState
}) {
  return handleBreakpoints({
    theme: theme2
  }, ownerState.direction, (propValue) => {
    const output = {
      flexDirection: propValue
    };
    if (propValue.indexOf("column") === 0) {
      output[`& > .${gridClasses.item}`] = {
        maxWidth: "none"
      };
    }
    return output;
  });
}
function generateRowGap({
  theme: theme2,
  ownerState
}) {
  const {
    container,
    rowSpacing
  } = ownerState;
  let styles2 = {};
  if (container && rowSpacing !== 0) {
    styles2 = handleBreakpoints({
      theme: theme2
    }, rowSpacing, (propValue) => {
      const themeSpacing = theme2.spacing(propValue);
      if (themeSpacing !== "0px") {
        return {
          marginTop: `-${getOffset(themeSpacing)}`,
          [`& > .${gridClasses.item}`]: {
            paddingTop: getOffset(themeSpacing)
          }
        };
      }
      return {};
    });
  }
  return styles2;
}
function generateColumnGap({
  theme: theme2,
  ownerState
}) {
  const {
    container,
    columnSpacing
  } = ownerState;
  let styles2 = {};
  if (container && columnSpacing !== 0) {
    styles2 = handleBreakpoints({
      theme: theme2
    }, columnSpacing, (propValue) => {
      const themeSpacing = theme2.spacing(propValue);
      if (themeSpacing !== "0px") {
        return {
          width: `calc(100% + ${getOffset(themeSpacing)})`,
          marginLeft: `-${getOffset(themeSpacing)}`,
          [`& > .${gridClasses.item}`]: {
            paddingLeft: getOffset(themeSpacing)
          }
        };
      }
      return {};
    });
  }
  return styles2;
}
const GridRoot = styled$3("div", {
  name: "MuiGrid",
  slot: "Root",
  overridesResolver: (props, styles2) => {
    const {
      container,
      direction,
      item,
      lg,
      md,
      sm,
      spacing,
      wrap,
      xl,
      xs,
      zeroMinWidth
    } = props.ownerState;
    return [styles2.root, container && styles2.container, item && styles2.item, zeroMinWidth && styles2.zeroMinWidth, container && spacing !== 0 && styles2[`spacing-xs-${String(spacing)}`], direction !== "row" && styles2[`direction-xs-${String(direction)}`], wrap !== "wrap" && styles2[`wrap-xs-${String(wrap)}`], xs !== false && styles2[`grid-xs-${String(xs)}`], sm !== false && styles2[`grid-sm-${String(sm)}`], md !== false && styles2[`grid-md-${String(md)}`], lg !== false && styles2[`grid-lg-${String(lg)}`], xl !== false && styles2[`grid-xl-${String(xl)}`]];
  }
})(({
  ownerState
}) => _extends$3({
  boxSizing: "border-box"
}, ownerState.container && {
  display: "flex",
  flexWrap: "wrap",
  width: "100%"
}, ownerState.item && {
  margin: 0
}, ownerState.zeroMinWidth && {
  minWidth: 0
}, ownerState.wrap === "nowrap" && {
  flexWrap: "nowrap"
}, ownerState.wrap === "reverse" && {
  flexWrap: "wrap-reverse"
}), generateDirection, generateRowGap, generateColumnGap, ({
  theme: theme2,
  ownerState
}) => theme2.breakpoints.keys.reduce((globalStyles, breakpoint) => {
  generateGrid(globalStyles, theme2, breakpoint, ownerState);
  return globalStyles;
}, {}));
const useUtilityClasses$F = (ownerState) => {
  const {
    classes,
    container,
    direction,
    item,
    lg,
    md,
    sm,
    spacing,
    wrap,
    xl,
    xs,
    zeroMinWidth
  } = ownerState;
  const slots = {
    root: ["root", container && "container", item && "item", zeroMinWidth && "zeroMinWidth", container && spacing !== 0 && `spacing-xs-${String(spacing)}`, direction !== "row" && `direction-xs-${String(direction)}`, wrap !== "wrap" && `wrap-xs-${String(wrap)}`, xs !== false && `grid-xs-${String(xs)}`, sm !== false && `grid-sm-${String(sm)}`, md !== false && `grid-md-${String(md)}`, lg !== false && `grid-lg-${String(lg)}`, xl !== false && `grid-xl-${String(xl)}`]
  };
  return composeClasses(slots, getGridUtilityClass, classes);
};
const Grid = /* @__PURE__ */ react.exports.forwardRef(function Grid2(inProps, ref) {
  const themeProps = useThemeProps({
    props: inProps,
    name: "MuiGrid"
  });
  const props = extendSxProp(themeProps);
  const {
    className,
    columns: columnsProp,
    columnSpacing: columnSpacingProp,
    component = "div",
    container = false,
    direction = "row",
    item = false,
    lg = false,
    md = false,
    rowSpacing: rowSpacingProp,
    sm = false,
    spacing = 0,
    wrap = "wrap",
    xl = false,
    xs = false,
    zeroMinWidth = false
  } = props, other = _objectWithoutPropertiesLoose$1(props, _excluded$Q);
  const rowSpacing = rowSpacingProp || spacing;
  const columnSpacing = columnSpacingProp || spacing;
  const columnsContext = react.exports.useContext(GridContext$1);
  const columns = columnsProp || columnsContext || 12;
  const ownerState = _extends$3({}, props, {
    columns,
    container,
    direction,
    item,
    lg,
    md,
    sm,
    rowSpacing,
    columnSpacing,
    wrap,
    xl,
    xs,
    zeroMinWidth
  });
  const classes = useUtilityClasses$F(ownerState);
  const wrapChild = (element) => columns !== 12 ? /* @__PURE__ */ jsx(GridContext$1.Provider, {
    value: columns,
    children: element
  }) : element;
  return wrapChild(/* @__PURE__ */ jsx(GridRoot, _extends$3({
    ownerState,
    className: clsx(classes.root, className),
    as: component,
    ref
  }, other)));
});
var Grid$1 = Grid;
function getEmptySubject() {
  return new Subject();
}
function useRefFn(init2) {
  var firstRef = react.exports.useRef(true);
  var ref = react.exports.useRef(null);
  if (firstRef.current) {
    firstRef.current = false;
    ref.current = init2();
  }
  return ref;
}
function useForceUpdate() {
  var updateState2 = react.exports.useState(0)[1];
  return react.exports.useRef(function() {
    return updateState2(increment);
  }).current;
}
function increment(n2) {
  return (n2 + 1) % 1e6;
}
var useIsomorphicLayoutEffect = typeof window !== "undefined" && typeof window.document !== "undefined" && typeof window.document.createElement !== "undefined" ? react.exports.useLayoutEffect : react.exports.useEffect;
function useObservableInternal(useCustomEffect, init2, inputs) {
  if (!inputs) {
    return useRefFn(init2).current;
  }
  var inputs$Ref = useRefFn(function() {
    return new BehaviorSubject(inputs);
  });
  var source$Ref = useRefFn(function() {
    return init2(inputs$Ref.current);
  });
  var firstEffectRef = react.exports.useRef(true);
  useCustomEffect(function() {
    if (firstEffectRef.current) {
      firstEffectRef.current = false;
      return;
    }
    inputs$Ref.current.next(inputs);
  }, inputs);
  return source$Ref.current;
}
function useObservable(init2, inputs) {
  return useObservableInternal(react.exports.useEffect, init2, inputs);
}
function useSubscriptionInternal(useCustomEffect, args) {
  var forceUpdate = useForceUpdate();
  var argsRef = react.exports.useRef(args);
  var errorRef = react.exports.useRef();
  var subscriptionRef = react.exports.useRef();
  useIsomorphicLayoutEffect(function() {
    argsRef.current = args;
  });
  useCustomEffect(function() {
    errorRef.current = null;
    var input$ = argsRef.current[0];
    var subscription = input$.subscribe({
      next: function(value) {
        var _a2;
        if (input$ !== argsRef.current[0]) {
          return;
        }
        var nextObserver = ((_a2 = argsRef.current[1]) === null || _a2 === void 0 ? void 0 : _a2.next) || argsRef.current[1];
        if (nextObserver) {
          return nextObserver(value);
        }
      },
      error: function(error) {
        var _a2;
        if (input$ !== argsRef.current[0]) {
          return;
        }
        var errorObserver = ((_a2 = argsRef.current[1]) === null || _a2 === void 0 ? void 0 : _a2.error) || argsRef.current[2];
        if (errorObserver) {
          errorRef.current = null;
          return errorObserver(error);
        }
        errorRef.current = error;
        forceUpdate();
      },
      complete: function() {
        var _a2;
        if (input$ !== argsRef.current[0]) {
          return;
        }
        var completeObserver = ((_a2 = argsRef.current[1]) === null || _a2 === void 0 ? void 0 : _a2.complete) || argsRef.current[3];
        if (completeObserver) {
          return completeObserver();
        }
      }
    });
    subscriptionRef.current = subscription;
    return function() {
      subscription.unsubscribe();
    };
  }, [args[0]]);
  if (errorRef.current) {
    throw errorRef.current;
  }
  return subscriptionRef;
}
function useSubscription(input$, observerOrNext$, error, complete) {
  return useSubscriptionInternal(react.exports.useEffect, [
    input$,
    observerOrNext$,
    error,
    complete
  ]);
}
function useLayoutSubscription(input$, observerOrNext$, error, complete) {
  return useSubscriptionInternal(useIsomorphicLayoutEffect, [
    input$,
    observerOrNext$,
    error,
    complete
  ]);
}
function useObservableStateInternal(useSubscription2, state$OrInit, initialState) {
  if (isObservable(state$OrInit)) {
    var state$_1 = state$OrInit;
    var _a2 = react.exports.useState(function() {
      if (state$_1 instanceof BehaviorSubject || state$_1.value !== void 0) {
        return state$_1.value;
      }
      if (typeof initialState === "function") {
        return initialState();
      }
      return initialState;
    }), state = _a2[0], setState2 = _a2[1];
    useSubscription2(state$_1, setState2);
    react.exports.useDebugValue(state);
    return state;
  } else {
    var init_1 = state$OrInit;
    var _b = react.exports.useState(initialState), state_1 = _b[0], setState2 = _b[1];
    var input$Ref_1 = useRefFn(getEmptySubject);
    var state$ = useRefFn(function() {
      return init_1(input$Ref_1.current, state_1);
    }).current;
    var callback = react.exports.useRef(function(state2) {
      return input$Ref_1.current.next(state2);
    }).current;
    useSubscription2(state$, setState2);
    react.exports.useDebugValue(state_1);
    return [state_1, callback];
  }
}
function useObservableState(state$OrInit, initialState) {
  return useObservableStateInternal(useSubscription, state$OrInit, initialState);
}
function useLayoutObservableState(state$OrInit, initialState) {
  return useObservableStateInternal(useLayoutSubscription, state$OrInit, initialState);
}
var Favorite = {};
var interopRequireDefault = { exports: {} };
(function(module) {
  function _interopRequireDefault2(obj) {
    return obj && obj.__esModule ? obj : {
      "default": obj
    };
  }
  module.exports = _interopRequireDefault2;
  module.exports["default"] = module.exports, module.exports.__esModule = true;
})(interopRequireDefault);
var createSvgIcon$1 = {};
function getSvgIconUtilityClass(slot) {
  return generateUtilityClass("MuiSvgIcon", slot);
}
generateUtilityClasses("MuiSvgIcon", ["root", "colorPrimary", "colorSecondary", "colorAction", "colorError", "colorDisabled", "fontSizeInherit", "fontSizeSmall", "fontSizeMedium", "fontSizeLarge"]);
const _excluded$P = ["children", "className", "color", "component", "fontSize", "htmlColor", "titleAccess", "viewBox"];
const useUtilityClasses$E = (ownerState) => {
  const {
    color,
    fontSize,
    classes
  } = ownerState;
  const slots = {
    root: ["root", color !== "inherit" && `color${capitalize(color)}`, `fontSize${capitalize(fontSize)}`]
  };
  return composeClasses(slots, getSvgIconUtilityClass, classes);
};
const SvgIconRoot = styled$3("svg", {
  name: "MuiSvgIcon",
  slot: "Root",
  overridesResolver: (props, styles2) => {
    const {
      ownerState
    } = props;
    return [styles2.root, ownerState.color !== "inherit" && styles2[`color${capitalize(ownerState.color)}`], styles2[`fontSize${capitalize(ownerState.fontSize)}`]];
  }
})(({
  theme: theme2,
  ownerState
}) => {
  var _theme$palette$ownerS, _theme$palette$ownerS2;
  return {
    userSelect: "none",
    width: "1em",
    height: "1em",
    display: "inline-block",
    fill: "currentColor",
    flexShrink: 0,
    transition: theme2.transitions.create("fill", {
      duration: theme2.transitions.duration.shorter
    }),
    fontSize: {
      inherit: "inherit",
      small: theme2.typography.pxToRem(20),
      medium: theme2.typography.pxToRem(24),
      large: theme2.typography.pxToRem(35)
    }[ownerState.fontSize],
    color: (_theme$palette$ownerS = (_theme$palette$ownerS2 = theme2.palette[ownerState.color]) == null ? void 0 : _theme$palette$ownerS2.main) != null ? _theme$palette$ownerS : {
      action: theme2.palette.action.active,
      disabled: theme2.palette.action.disabled,
      inherit: void 0
    }[ownerState.color]
  };
});
const SvgIcon = /* @__PURE__ */ react.exports.forwardRef(function SvgIcon2(inProps, ref) {
  const props = useThemeProps({
    props: inProps,
    name: "MuiSvgIcon"
  });
  const {
    children,
    className,
    color = "inherit",
    component = "svg",
    fontSize = "medium",
    htmlColor,
    titleAccess,
    viewBox = "0 0 24 24"
  } = props, other = _objectWithoutPropertiesLoose$1(props, _excluded$P);
  const ownerState = _extends$3({}, props, {
    color,
    component,
    fontSize,
    viewBox
  });
  const classes = useUtilityClasses$E(ownerState);
  return /* @__PURE__ */ jsxs(SvgIconRoot, _extends$3({
    as: component,
    className: clsx(classes.root, className),
    ownerState,
    focusable: "false",
    viewBox,
    color: htmlColor,
    "aria-hidden": titleAccess ? void 0 : true,
    role: titleAccess ? "img" : void 0,
    ref
  }, other, {
    children: [children, titleAccess ? /* @__PURE__ */ jsx("title", {
      children: titleAccess
    }) : null]
  }));
});
SvgIcon.muiName = "SvgIcon";
var SvgIcon$1 = SvgIcon;
function createSvgIcon(path, displayName) {
  const Component = (props, ref) => /* @__PURE__ */ jsx(SvgIcon$1, _extends$3({
    "data-testid": `${displayName}Icon`,
    ref
  }, props, {
    children: path
  }));
  Component.muiName = SvgIcon$1.muiName;
  return /* @__PURE__ */ react.exports.memo(/* @__PURE__ */ react.exports.forwardRef(Component));
}
var utils = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  [Symbol.toStringTag]: "Module",
  capitalize,
  createChainedFunction,
  createSvgIcon,
  debounce: debounce$1,
  deprecatedPropType,
  isMuiElement,
  ownerDocument,
  ownerWindow,
  requirePropFactory,
  setRef,
  unstable_useEnhancedEffect: useEnhancedEffect$1,
  unstable_useId: useId,
  unsupportedProp,
  useControlled,
  useEventCallback,
  useForkRef,
  useIsFocusVisible,
  unstable_ClassNameGenerator: ClassNameGenerator
});
var require$$0 = /* @__PURE__ */ getAugmentedNamespace(utils);
(function(exports) {
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, "default", {
    enumerable: true,
    get: function() {
      return _utils2.createSvgIcon;
    }
  });
  var _utils2 = require$$0;
})(createSvgIcon$1);
var require$$2 = /* @__PURE__ */ getAugmentedNamespace(jsxRuntime);
var _interopRequireDefault$h = interopRequireDefault.exports;
Object.defineProperty(Favorite, "__esModule", {
  value: true
});
var default_1$f = Favorite.default = void 0;
var _createSvgIcon$e = _interopRequireDefault$h(createSvgIcon$1);
var _jsxRuntime$e = require$$2;
var _default$f = (0, _createSvgIcon$e.default)(/* @__PURE__ */ (0, _jsxRuntime$e.jsx)("path", {
  d: "m12 21.35-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
}), "Favorite");
default_1$f = Favorite.default = _default$f;
function getPaperUtilityClass(slot) {
  return generateUtilityClass("MuiPaper", slot);
}
generateUtilityClasses("MuiPaper", ["root", "rounded", "outlined", "elevation", "elevation0", "elevation1", "elevation2", "elevation3", "elevation4", "elevation5", "elevation6", "elevation7", "elevation8", "elevation9", "elevation10", "elevation11", "elevation12", "elevation13", "elevation14", "elevation15", "elevation16", "elevation17", "elevation18", "elevation19", "elevation20", "elevation21", "elevation22", "elevation23", "elevation24"]);
const _excluded$O = ["className", "component", "elevation", "square", "variant"];
const getOverlayAlpha = (elevation) => {
  let alphaValue;
  if (elevation < 1) {
    alphaValue = 5.11916 * elevation ** 2;
  } else {
    alphaValue = 4.5 * Math.log(elevation + 1) + 2;
  }
  return (alphaValue / 100).toFixed(2);
};
const useUtilityClasses$D = (ownerState) => {
  const {
    square,
    elevation,
    variant,
    classes
  } = ownerState;
  const slots = {
    root: ["root", variant, !square && "rounded", variant === "elevation" && `elevation${elevation}`]
  };
  return composeClasses(slots, getPaperUtilityClass, classes);
};
const PaperRoot = styled$3("div", {
  name: "MuiPaper",
  slot: "Root",
  overridesResolver: (props, styles2) => {
    const {
      ownerState
    } = props;
    return [styles2.root, styles2[ownerState.variant], !ownerState.square && styles2.rounded, ownerState.variant === "elevation" && styles2[`elevation${ownerState.elevation}`]];
  }
})(({
  theme: theme2,
  ownerState
}) => _extends$3({
  backgroundColor: theme2.palette.background.paper,
  color: theme2.palette.text.primary,
  transition: theme2.transitions.create("box-shadow")
}, !ownerState.square && {
  borderRadius: theme2.shape.borderRadius
}, ownerState.variant === "outlined" && {
  border: `1px solid ${theme2.palette.divider}`
}, ownerState.variant === "elevation" && _extends$3({
  boxShadow: theme2.shadows[ownerState.elevation]
}, theme2.palette.mode === "dark" && {
  backgroundImage: `linear-gradient(${alpha("#fff", getOverlayAlpha(ownerState.elevation))}, ${alpha("#fff", getOverlayAlpha(ownerState.elevation))})`
})));
const Paper = /* @__PURE__ */ react.exports.forwardRef(function Paper2(inProps, ref) {
  const props = useThemeProps({
    props: inProps,
    name: "MuiPaper"
  });
  const {
    className,
    component = "div",
    elevation = 1,
    square = false,
    variant = "elevation"
  } = props, other = _objectWithoutPropertiesLoose$1(props, _excluded$O);
  const ownerState = _extends$3({}, props, {
    component,
    elevation,
    square,
    variant
  });
  const classes = useUtilityClasses$D(ownerState);
  return /* @__PURE__ */ jsx(PaperRoot, _extends$3({
    as: component,
    ownerState,
    className: clsx(classes.root, className),
    ref
  }, other));
});
var Paper$1 = Paper;
function getCardUtilityClass(slot) {
  return generateUtilityClass("MuiCard", slot);
}
generateUtilityClasses("MuiCard", ["root"]);
const _excluded$N = ["className", "raised"];
const useUtilityClasses$C = (ownerState) => {
  const {
    classes
  } = ownerState;
  const slots = {
    root: ["root"]
  };
  return composeClasses(slots, getCardUtilityClass, classes);
};
const CardRoot = styled$3(Paper$1, {
  name: "MuiCard",
  slot: "Root",
  overridesResolver: (props, styles2) => styles2.root
})(() => {
  return {
    overflow: "hidden"
  };
});
const Card = /* @__PURE__ */ react.exports.forwardRef(function Card2(inProps, ref) {
  const props = useThemeProps({
    props: inProps,
    name: "MuiCard"
  });
  const {
    className,
    raised = false
  } = props, other = _objectWithoutPropertiesLoose$1(props, _excluded$N);
  const ownerState = _extends$3({}, props, {
    raised
  });
  const classes = useUtilityClasses$C(ownerState);
  return /* @__PURE__ */ jsx(CardRoot, _extends$3({
    className: clsx(classes.root, className),
    elevation: raised ? 8 : void 0,
    ref,
    ownerState
  }, other));
});
var Card$1 = Card;
function getCardContentUtilityClass(slot) {
  return generateUtilityClass("MuiCardContent", slot);
}
generateUtilityClasses("MuiCardContent", ["root"]);
const _excluded$M = ["className", "component"];
const useUtilityClasses$B = (ownerState) => {
  const {
    classes
  } = ownerState;
  const slots = {
    root: ["root"]
  };
  return composeClasses(slots, getCardContentUtilityClass, classes);
};
const CardContentRoot = styled$3("div", {
  name: "MuiCardContent",
  slot: "Root",
  overridesResolver: (props, styles2) => styles2.root
})(() => {
  return {
    padding: 16,
    "&:last-child": {
      paddingBottom: 24
    }
  };
});
const CardContent = /* @__PURE__ */ react.exports.forwardRef(function CardContent2(inProps, ref) {
  const props = useThemeProps({
    props: inProps,
    name: "MuiCardContent"
  });
  const {
    className,
    component = "div"
  } = props, other = _objectWithoutPropertiesLoose$1(props, _excluded$M);
  const ownerState = _extends$3({}, props, {
    component
  });
  const classes = useUtilityClasses$B(ownerState);
  return /* @__PURE__ */ jsx(CardContentRoot, _extends$3({
    as: component,
    className: clsx(classes.root, className),
    ownerState,
    ref
  }, other));
});
var CardContent$1 = CardContent;
function getTypographyUtilityClass(slot) {
  return generateUtilityClass("MuiTypography", slot);
}
generateUtilityClasses("MuiTypography", ["root", "h1", "h2", "h3", "h4", "h5", "h6", "subtitle1", "subtitle2", "body1", "body2", "inherit", "button", "caption", "overline", "alignLeft", "alignRight", "alignCenter", "alignJustify", "noWrap", "gutterBottom", "paragraph"]);
const _excluded$L = ["align", "className", "component", "gutterBottom", "noWrap", "paragraph", "variant", "variantMapping"];
const useUtilityClasses$A = (ownerState) => {
  const {
    align,
    gutterBottom,
    noWrap,
    paragraph,
    variant,
    classes
  } = ownerState;
  const slots = {
    root: ["root", variant, ownerState.align !== "inherit" && `align${capitalize(align)}`, gutterBottom && "gutterBottom", noWrap && "noWrap", paragraph && "paragraph"]
  };
  return composeClasses(slots, getTypographyUtilityClass, classes);
};
const TypographyRoot = styled$3("span", {
  name: "MuiTypography",
  slot: "Root",
  overridesResolver: (props, styles2) => {
    const {
      ownerState
    } = props;
    return [styles2.root, ownerState.variant && styles2[ownerState.variant], ownerState.align !== "inherit" && styles2[`align${capitalize(ownerState.align)}`], ownerState.noWrap && styles2.noWrap, ownerState.gutterBottom && styles2.gutterBottom, ownerState.paragraph && styles2.paragraph];
  }
})(({
  theme: theme2,
  ownerState
}) => _extends$3({
  margin: 0
}, ownerState.variant && theme2.typography[ownerState.variant], ownerState.align !== "inherit" && {
  textAlign: ownerState.align
}, ownerState.noWrap && {
  overflow: "hidden",
  textOverflow: "ellipsis",
  whiteSpace: "nowrap"
}, ownerState.gutterBottom && {
  marginBottom: "0.35em"
}, ownerState.paragraph && {
  marginBottom: 16
}));
const defaultVariantMapping = {
  h1: "h1",
  h2: "h2",
  h3: "h3",
  h4: "h4",
  h5: "h5",
  h6: "h6",
  subtitle1: "h6",
  subtitle2: "h6",
  body1: "p",
  body2: "p",
  inherit: "p"
};
const colorTransformations = {
  primary: "primary.main",
  textPrimary: "text.primary",
  secondary: "secondary.main",
  textSecondary: "text.secondary",
  error: "error.main"
};
const transformDeprecatedColors = (color) => {
  return colorTransformations[color] || color;
};
const Typography = /* @__PURE__ */ react.exports.forwardRef(function Typography2(inProps, ref) {
  const themeProps = useThemeProps({
    props: inProps,
    name: "MuiTypography"
  });
  const color = transformDeprecatedColors(themeProps.color);
  const props = extendSxProp(_extends$3({}, themeProps, {
    color
  }));
  const {
    align = "inherit",
    className,
    component,
    gutterBottom = false,
    noWrap = false,
    paragraph = false,
    variant = "body1",
    variantMapping = defaultVariantMapping
  } = props, other = _objectWithoutPropertiesLoose$1(props, _excluded$L);
  const ownerState = _extends$3({}, props, {
    align,
    color,
    className,
    component,
    gutterBottom,
    noWrap,
    paragraph,
    variant,
    variantMapping
  });
  const Component = component || (paragraph ? "p" : variantMapping[variant] || defaultVariantMapping[variant]) || "span";
  const classes = useUtilityClasses$A(ownerState);
  return /* @__PURE__ */ jsx(TypographyRoot, _extends$3({
    as: Component,
    ref,
    ownerState,
    className: clsx(classes.root, className)
  }, other));
});
var Typography$1 = Typography;
function getCardHeaderUtilityClass(slot) {
  return generateUtilityClass("MuiCardHeader", slot);
}
const cardHeaderClasses = generateUtilityClasses("MuiCardHeader", ["root", "avatar", "action", "content", "title", "subheader"]);
var cardHeaderClasses$1 = cardHeaderClasses;
const _excluded$K = ["action", "avatar", "className", "component", "disableTypography", "subheader", "subheaderTypographyProps", "title", "titleTypographyProps"];
const useUtilityClasses$z = (ownerState) => {
  const {
    classes
  } = ownerState;
  const slots = {
    root: ["root"],
    avatar: ["avatar"],
    action: ["action"],
    content: ["content"],
    title: ["title"],
    subheader: ["subheader"]
  };
  return composeClasses(slots, getCardHeaderUtilityClass, classes);
};
const CardHeaderRoot = styled$3("div", {
  name: "MuiCardHeader",
  slot: "Root",
  overridesResolver: (props, styles2) => _extends$3({
    [`& .${cardHeaderClasses$1.title}`]: styles2.title,
    [`& .${cardHeaderClasses$1.subheader}`]: styles2.subheader
  }, styles2.root)
})({
  display: "flex",
  alignItems: "center",
  padding: 16
});
const CardHeaderAvatar = styled$3("div", {
  name: "MuiCardHeader",
  slot: "Avatar",
  overridesResolver: (props, styles2) => styles2.avatar
})({
  display: "flex",
  flex: "0 0 auto",
  marginRight: 16
});
const CardHeaderAction = styled$3("div", {
  name: "MuiCardHeader",
  slot: "Action",
  overridesResolver: (props, styles2) => styles2.action
})({
  flex: "0 0 auto",
  alignSelf: "flex-start",
  marginTop: -4,
  marginRight: -8,
  marginBottom: -4
});
const CardHeaderContent = styled$3("div", {
  name: "MuiCardHeader",
  slot: "Content",
  overridesResolver: (props, styles2) => styles2.content
})({
  flex: "1 1 auto"
});
const CardHeader = /* @__PURE__ */ react.exports.forwardRef(function CardHeader2(inProps, ref) {
  const props = useThemeProps({
    props: inProps,
    name: "MuiCardHeader"
  });
  const {
    action,
    avatar,
    className,
    component = "div",
    disableTypography = false,
    subheader: subheaderProp,
    subheaderTypographyProps,
    title: titleProp,
    titleTypographyProps
  } = props, other = _objectWithoutPropertiesLoose$1(props, _excluded$K);
  const ownerState = _extends$3({}, props, {
    component,
    disableTypography
  });
  const classes = useUtilityClasses$z(ownerState);
  let title = titleProp;
  if (title != null && title.type !== Typography$1 && !disableTypography) {
    title = /* @__PURE__ */ jsx(Typography$1, _extends$3({
      variant: avatar ? "body2" : "h5",
      className: classes.title,
      component: "span",
      display: "block"
    }, titleTypographyProps, {
      children: title
    }));
  }
  let subheader = subheaderProp;
  if (subheader != null && subheader.type !== Typography$1 && !disableTypography) {
    subheader = /* @__PURE__ */ jsx(Typography$1, _extends$3({
      variant: avatar ? "body2" : "body1",
      className: classes.subheader,
      color: "text.secondary",
      component: "span",
      display: "block"
    }, subheaderTypographyProps, {
      children: subheader
    }));
  }
  return /* @__PURE__ */ jsxs(CardHeaderRoot, _extends$3({
    className: clsx(classes.root, className),
    as: component,
    ref,
    ownerState
  }, other, {
    children: [avatar && /* @__PURE__ */ jsx(CardHeaderAvatar, {
      className: classes.avatar,
      ownerState,
      children: avatar
    }), /* @__PURE__ */ jsxs(CardHeaderContent, {
      className: classes.content,
      ownerState,
      children: [title, subheader]
    }), action && /* @__PURE__ */ jsx(CardHeaderAction, {
      className: classes.action,
      ownerState,
      children: action
    })]
  }));
});
var CardHeader$1 = CardHeader;
function _setPrototypeOf(o, p2) {
  _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf2(o2, p3) {
    o2.__proto__ = p3;
    return o2;
  };
  return _setPrototypeOf(o, p2);
}
function _inheritsLoose(subClass, superClass) {
  subClass.prototype = Object.create(superClass.prototype);
  subClass.prototype.constructor = subClass;
  _setPrototypeOf(subClass, superClass);
}
var config$2 = {
  disabled: false
};
var TransitionGroupContext = React.createContext(null);
var UNMOUNTED = "unmounted";
var EXITED = "exited";
var ENTERING = "entering";
var ENTERED = "entered";
var EXITING = "exiting";
var Transition = /* @__PURE__ */ function(_React$Component) {
  _inheritsLoose(Transition2, _React$Component);
  function Transition2(props, context) {
    var _this;
    _this = _React$Component.call(this, props, context) || this;
    var parentGroup = context;
    var appear = parentGroup && !parentGroup.isMounting ? props.enter : props.appear;
    var initialStatus;
    _this.appearStatus = null;
    if (props.in) {
      if (appear) {
        initialStatus = EXITED;
        _this.appearStatus = ENTERING;
      } else {
        initialStatus = ENTERED;
      }
    } else {
      if (props.unmountOnExit || props.mountOnEnter) {
        initialStatus = UNMOUNTED;
      } else {
        initialStatus = EXITED;
      }
    }
    _this.state = {
      status: initialStatus
    };
    _this.nextCallback = null;
    return _this;
  }
  Transition2.getDerivedStateFromProps = function getDerivedStateFromProps(_ref, prevState) {
    var nextIn = _ref.in;
    if (nextIn && prevState.status === UNMOUNTED) {
      return {
        status: EXITED
      };
    }
    return null;
  };
  var _proto = Transition2.prototype;
  _proto.componentDidMount = function componentDidMount() {
    this.updateStatus(true, this.appearStatus);
  };
  _proto.componentDidUpdate = function componentDidUpdate(prevProps) {
    var nextStatus = null;
    if (prevProps !== this.props) {
      var status = this.state.status;
      if (this.props.in) {
        if (status !== ENTERING && status !== ENTERED) {
          nextStatus = ENTERING;
        }
      } else {
        if (status === ENTERING || status === ENTERED) {
          nextStatus = EXITING;
        }
      }
    }
    this.updateStatus(false, nextStatus);
  };
  _proto.componentWillUnmount = function componentWillUnmount() {
    this.cancelNextCallback();
  };
  _proto.getTimeouts = function getTimeouts() {
    var timeout = this.props.timeout;
    var exit, enter, appear;
    exit = enter = appear = timeout;
    if (timeout != null && typeof timeout !== "number") {
      exit = timeout.exit;
      enter = timeout.enter;
      appear = timeout.appear !== void 0 ? timeout.appear : enter;
    }
    return {
      exit,
      enter,
      appear
    };
  };
  _proto.updateStatus = function updateStatus(mounting, nextStatus) {
    if (mounting === void 0) {
      mounting = false;
    }
    if (nextStatus !== null) {
      this.cancelNextCallback();
      if (nextStatus === ENTERING) {
        this.performEnter(mounting);
      } else {
        this.performExit();
      }
    } else if (this.props.unmountOnExit && this.state.status === EXITED) {
      this.setState({
        status: UNMOUNTED
      });
    }
  };
  _proto.performEnter = function performEnter(mounting) {
    var _this2 = this;
    var enter = this.props.enter;
    var appearing = this.context ? this.context.isMounting : mounting;
    var _ref2 = this.props.nodeRef ? [appearing] : [ReactDOM.findDOMNode(this), appearing], maybeNode = _ref2[0], maybeAppearing = _ref2[1];
    var timeouts = this.getTimeouts();
    var enterTimeout = appearing ? timeouts.appear : timeouts.enter;
    if (!mounting && !enter || config$2.disabled) {
      this.safeSetState({
        status: ENTERED
      }, function() {
        _this2.props.onEntered(maybeNode);
      });
      return;
    }
    this.props.onEnter(maybeNode, maybeAppearing);
    this.safeSetState({
      status: ENTERING
    }, function() {
      _this2.props.onEntering(maybeNode, maybeAppearing);
      _this2.onTransitionEnd(enterTimeout, function() {
        _this2.safeSetState({
          status: ENTERED
        }, function() {
          _this2.props.onEntered(maybeNode, maybeAppearing);
        });
      });
    });
  };
  _proto.performExit = function performExit() {
    var _this3 = this;
    var exit = this.props.exit;
    var timeouts = this.getTimeouts();
    var maybeNode = this.props.nodeRef ? void 0 : ReactDOM.findDOMNode(this);
    if (!exit || config$2.disabled) {
      this.safeSetState({
        status: EXITED
      }, function() {
        _this3.props.onExited(maybeNode);
      });
      return;
    }
    this.props.onExit(maybeNode);
    this.safeSetState({
      status: EXITING
    }, function() {
      _this3.props.onExiting(maybeNode);
      _this3.onTransitionEnd(timeouts.exit, function() {
        _this3.safeSetState({
          status: EXITED
        }, function() {
          _this3.props.onExited(maybeNode);
        });
      });
    });
  };
  _proto.cancelNextCallback = function cancelNextCallback() {
    if (this.nextCallback !== null) {
      this.nextCallback.cancel();
      this.nextCallback = null;
    }
  };
  _proto.safeSetState = function safeSetState(nextState, callback) {
    callback = this.setNextCallback(callback);
    this.setState(nextState, callback);
  };
  _proto.setNextCallback = function setNextCallback(callback) {
    var _this4 = this;
    var active = true;
    this.nextCallback = function(event) {
      if (active) {
        active = false;
        _this4.nextCallback = null;
        callback(event);
      }
    };
    this.nextCallback.cancel = function() {
      active = false;
    };
    return this.nextCallback;
  };
  _proto.onTransitionEnd = function onTransitionEnd(timeout, handler) {
    this.setNextCallback(handler);
    var node = this.props.nodeRef ? this.props.nodeRef.current : ReactDOM.findDOMNode(this);
    var doesNotHaveTimeoutOrListener = timeout == null && !this.props.addEndListener;
    if (!node || doesNotHaveTimeoutOrListener) {
      setTimeout(this.nextCallback, 0);
      return;
    }
    if (this.props.addEndListener) {
      var _ref3 = this.props.nodeRef ? [this.nextCallback] : [node, this.nextCallback], maybeNode = _ref3[0], maybeNextCallback = _ref3[1];
      this.props.addEndListener(maybeNode, maybeNextCallback);
    }
    if (timeout != null) {
      setTimeout(this.nextCallback, timeout);
    }
  };
  _proto.render = function render() {
    var status = this.state.status;
    if (status === UNMOUNTED) {
      return null;
    }
    var _this$props = this.props, children = _this$props.children;
    _this$props.in;
    _this$props.mountOnEnter;
    _this$props.unmountOnExit;
    _this$props.appear;
    _this$props.enter;
    _this$props.exit;
    _this$props.timeout;
    _this$props.addEndListener;
    _this$props.onEnter;
    _this$props.onEntering;
    _this$props.onEntered;
    _this$props.onExit;
    _this$props.onExiting;
    _this$props.onExited;
    _this$props.nodeRef;
    var childProps = _objectWithoutPropertiesLoose$1(_this$props, ["children", "in", "mountOnEnter", "unmountOnExit", "appear", "enter", "exit", "timeout", "addEndListener", "onEnter", "onEntering", "onEntered", "onExit", "onExiting", "onExited", "nodeRef"]);
    return /* @__PURE__ */ React.createElement(TransitionGroupContext.Provider, {
      value: null
    }, typeof children === "function" ? children(status, childProps) : React.cloneElement(React.Children.only(children), childProps));
  };
  return Transition2;
}(React.Component);
Transition.contextType = TransitionGroupContext;
Transition.propTypes = {};
function noop$2() {
}
Transition.defaultProps = {
  in: false,
  mountOnEnter: false,
  unmountOnExit: false,
  appear: false,
  enter: true,
  exit: true,
  onEnter: noop$2,
  onEntering: noop$2,
  onEntered: noop$2,
  onExit: noop$2,
  onExiting: noop$2,
  onExited: noop$2
};
Transition.UNMOUNTED = UNMOUNTED;
Transition.EXITED = EXITED;
Transition.ENTERING = ENTERING;
Transition.ENTERED = ENTERED;
Transition.EXITING = EXITING;
var Transition$1 = Transition;
function _assertThisInitialized(self2) {
  if (self2 === void 0) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }
  return self2;
}
function getChildMapping(children, mapFn) {
  var mapper = function mapper2(child) {
    return mapFn && react.exports.isValidElement(child) ? mapFn(child) : child;
  };
  var result = Object.create(null);
  if (children)
    react.exports.Children.map(children, function(c2) {
      return c2;
    }).forEach(function(child) {
      result[child.key] = mapper(child);
    });
  return result;
}
function mergeChildMappings(prev, next) {
  prev = prev || {};
  next = next || {};
  function getValueForKey(key) {
    return key in next ? next[key] : prev[key];
  }
  var nextKeysPending = Object.create(null);
  var pendingKeys = [];
  for (var prevKey in prev) {
    if (prevKey in next) {
      if (pendingKeys.length) {
        nextKeysPending[prevKey] = pendingKeys;
        pendingKeys = [];
      }
    } else {
      pendingKeys.push(prevKey);
    }
  }
  var i;
  var childMapping = {};
  for (var nextKey in next) {
    if (nextKeysPending[nextKey]) {
      for (i = 0; i < nextKeysPending[nextKey].length; i++) {
        var pendingNextKey = nextKeysPending[nextKey][i];
        childMapping[nextKeysPending[nextKey][i]] = getValueForKey(pendingNextKey);
      }
    }
    childMapping[nextKey] = getValueForKey(nextKey);
  }
  for (i = 0; i < pendingKeys.length; i++) {
    childMapping[pendingKeys[i]] = getValueForKey(pendingKeys[i]);
  }
  return childMapping;
}
function getProp(child, prop, props) {
  return props[prop] != null ? props[prop] : child.props[prop];
}
function getInitialChildMapping(props, onExited) {
  return getChildMapping(props.children, function(child) {
    return react.exports.cloneElement(child, {
      onExited: onExited.bind(null, child),
      in: true,
      appear: getProp(child, "appear", props),
      enter: getProp(child, "enter", props),
      exit: getProp(child, "exit", props)
    });
  });
}
function getNextChildMapping(nextProps, prevChildMapping, onExited) {
  var nextChildMapping = getChildMapping(nextProps.children);
  var children = mergeChildMappings(prevChildMapping, nextChildMapping);
  Object.keys(children).forEach(function(key) {
    var child = children[key];
    if (!react.exports.isValidElement(child))
      return;
    var hasPrev = key in prevChildMapping;
    var hasNext = key in nextChildMapping;
    var prevChild = prevChildMapping[key];
    var isLeaving = react.exports.isValidElement(prevChild) && !prevChild.props.in;
    if (hasNext && (!hasPrev || isLeaving)) {
      children[key] = react.exports.cloneElement(child, {
        onExited: onExited.bind(null, child),
        in: true,
        exit: getProp(child, "exit", nextProps),
        enter: getProp(child, "enter", nextProps)
      });
    } else if (!hasNext && hasPrev && !isLeaving) {
      children[key] = react.exports.cloneElement(child, {
        in: false
      });
    } else if (hasNext && hasPrev && react.exports.isValidElement(prevChild)) {
      children[key] = react.exports.cloneElement(child, {
        onExited: onExited.bind(null, child),
        in: prevChild.props.in,
        exit: getProp(child, "exit", nextProps),
        enter: getProp(child, "enter", nextProps)
      });
    }
  });
  return children;
}
var values = Object.values || function(obj) {
  return Object.keys(obj).map(function(k2) {
    return obj[k2];
  });
};
var defaultProps = {
  component: "div",
  childFactory: function childFactory(child) {
    return child;
  }
};
var TransitionGroup = /* @__PURE__ */ function(_React$Component) {
  _inheritsLoose(TransitionGroup2, _React$Component);
  function TransitionGroup2(props, context) {
    var _this;
    _this = _React$Component.call(this, props, context) || this;
    var handleExited = _this.handleExited.bind(_assertThisInitialized(_this));
    _this.state = {
      contextValue: {
        isMounting: true
      },
      handleExited,
      firstRender: true
    };
    return _this;
  }
  var _proto = TransitionGroup2.prototype;
  _proto.componentDidMount = function componentDidMount() {
    this.mounted = true;
    this.setState({
      contextValue: {
        isMounting: false
      }
    });
  };
  _proto.componentWillUnmount = function componentWillUnmount() {
    this.mounted = false;
  };
  TransitionGroup2.getDerivedStateFromProps = function getDerivedStateFromProps(nextProps, _ref) {
    var prevChildMapping = _ref.children, handleExited = _ref.handleExited, firstRender = _ref.firstRender;
    return {
      children: firstRender ? getInitialChildMapping(nextProps, handleExited) : getNextChildMapping(nextProps, prevChildMapping, handleExited),
      firstRender: false
    };
  };
  _proto.handleExited = function handleExited(child, node) {
    var currentChildMapping = getChildMapping(this.props.children);
    if (child.key in currentChildMapping)
      return;
    if (child.props.onExited) {
      child.props.onExited(node);
    }
    if (this.mounted) {
      this.setState(function(state) {
        var children = _extends$3({}, state.children);
        delete children[child.key];
        return {
          children
        };
      });
    }
  };
  _proto.render = function render() {
    var _this$props = this.props, Component = _this$props.component, childFactory2 = _this$props.childFactory, props = _objectWithoutPropertiesLoose$1(_this$props, ["component", "childFactory"]);
    var contextValue = this.state.contextValue;
    var children = values(this.state.children).map(childFactory2);
    delete props.appear;
    delete props.enter;
    delete props.exit;
    if (Component === null) {
      return /* @__PURE__ */ React.createElement(TransitionGroupContext.Provider, {
        value: contextValue
      }, children);
    }
    return /* @__PURE__ */ React.createElement(TransitionGroupContext.Provider, {
      value: contextValue
    }, /* @__PURE__ */ React.createElement(Component, props, children));
  };
  return TransitionGroup2;
}(React.Component);
TransitionGroup.propTypes = {};
TransitionGroup.defaultProps = defaultProps;
var TransitionGroup$1 = TransitionGroup;
function Ripple(props) {
  const {
    className,
    classes,
    pulsate = false,
    rippleX,
    rippleY,
    rippleSize,
    in: inProp,
    onExited,
    timeout
  } = props;
  const [leaving, setLeaving] = react.exports.useState(false);
  const rippleClassName = clsx(className, classes.ripple, classes.rippleVisible, pulsate && classes.ripplePulsate);
  const rippleStyles = {
    width: rippleSize,
    height: rippleSize,
    top: -(rippleSize / 2) + rippleY,
    left: -(rippleSize / 2) + rippleX
  };
  const childClassName = clsx(classes.child, leaving && classes.childLeaving, pulsate && classes.childPulsate);
  if (!inProp && !leaving) {
    setLeaving(true);
  }
  react.exports.useEffect(() => {
    if (!inProp && onExited != null) {
      const timeoutId = setTimeout(onExited, timeout);
      return () => {
        clearTimeout(timeoutId);
      };
    }
    return void 0;
  }, [onExited, inProp, timeout]);
  return /* @__PURE__ */ jsx("span", {
    className: rippleClassName,
    style: rippleStyles,
    children: /* @__PURE__ */ jsx("span", {
      className: childClassName
    })
  });
}
const touchRippleClasses = generateUtilityClasses("MuiTouchRipple", ["root", "ripple", "rippleVisible", "ripplePulsate", "child", "childLeaving", "childPulsate"]);
var touchRippleClasses$1 = touchRippleClasses;
const _excluded$J = ["center", "classes", "className"];
let _$1 = (t2) => t2, _t$1, _t2$1, _t3$1, _t4$1;
const DURATION = 550;
const DELAY_RIPPLE = 80;
const enterKeyframe = keyframes(_t$1 || (_t$1 = _$1`
  0% {
    transform: scale(0);
    opacity: 0.1;
  }

  100% {
    transform: scale(1);
    opacity: 0.3;
  }
`));
const exitKeyframe = keyframes(_t2$1 || (_t2$1 = _$1`
  0% {
    opacity: 1;
  }

  100% {
    opacity: 0;
  }
`));
const pulsateKeyframe = keyframes(_t3$1 || (_t3$1 = _$1`
  0% {
    transform: scale(1);
  }

  50% {
    transform: scale(0.92);
  }

  100% {
    transform: scale(1);
  }
`));
const TouchRippleRoot = styled$3("span", {
  name: "MuiTouchRipple",
  slot: "Root",
  skipSx: true
})({
  overflow: "hidden",
  pointerEvents: "none",
  position: "absolute",
  zIndex: 0,
  top: 0,
  right: 0,
  bottom: 0,
  left: 0,
  borderRadius: "inherit"
});
const TouchRippleRipple = styled$3(Ripple, {
  name: "MuiTouchRipple",
  slot: "Ripple"
})(_t4$1 || (_t4$1 = _$1`
  opacity: 0;
  position: absolute;

  &.${0} {
    opacity: 0.3;
    transform: scale(1);
    animation-name: ${0};
    animation-duration: ${0}ms;
    animation-timing-function: ${0};
  }

  &.${0} {
    animation-duration: ${0}ms;
  }

  & .${0} {
    opacity: 1;
    display: block;
    width: 100%;
    height: 100%;
    border-radius: 50%;
    background-color: currentColor;
  }

  & .${0} {
    opacity: 0;
    animation-name: ${0};
    animation-duration: ${0}ms;
    animation-timing-function: ${0};
  }

  & .${0} {
    position: absolute;
    /* @noflip */
    left: 0px;
    top: 0;
    animation-name: ${0};
    animation-duration: 2500ms;
    animation-timing-function: ${0};
    animation-iteration-count: infinite;
    animation-delay: 200ms;
  }
`), touchRippleClasses$1.rippleVisible, enterKeyframe, DURATION, ({
  theme: theme2
}) => theme2.transitions.easing.easeInOut, touchRippleClasses$1.ripplePulsate, ({
  theme: theme2
}) => theme2.transitions.duration.shorter, touchRippleClasses$1.child, touchRippleClasses$1.childLeaving, exitKeyframe, DURATION, ({
  theme: theme2
}) => theme2.transitions.easing.easeInOut, touchRippleClasses$1.childPulsate, pulsateKeyframe, ({
  theme: theme2
}) => theme2.transitions.easing.easeInOut);
const TouchRipple = /* @__PURE__ */ react.exports.forwardRef(function TouchRipple2(inProps, ref) {
  const props = useThemeProps({
    props: inProps,
    name: "MuiTouchRipple"
  });
  const {
    center: centerProp = false,
    classes = {},
    className
  } = props, other = _objectWithoutPropertiesLoose$1(props, _excluded$J);
  const [ripples, setRipples] = react.exports.useState([]);
  const nextKey = react.exports.useRef(0);
  const rippleCallback = react.exports.useRef(null);
  react.exports.useEffect(() => {
    if (rippleCallback.current) {
      rippleCallback.current();
      rippleCallback.current = null;
    }
  }, [ripples]);
  const ignoringMouseDown = react.exports.useRef(false);
  const startTimer = react.exports.useRef(null);
  const startTimerCommit = react.exports.useRef(null);
  const container = react.exports.useRef(null);
  react.exports.useEffect(() => {
    return () => {
      clearTimeout(startTimer.current);
    };
  }, []);
  const startCommit = react.exports.useCallback((params) => {
    const {
      pulsate: pulsate2,
      rippleX,
      rippleY,
      rippleSize,
      cb
    } = params;
    setRipples((oldRipples) => [...oldRipples, /* @__PURE__ */ jsx(TouchRippleRipple, {
      classes: {
        ripple: clsx(classes.ripple, touchRippleClasses$1.ripple),
        rippleVisible: clsx(classes.rippleVisible, touchRippleClasses$1.rippleVisible),
        ripplePulsate: clsx(classes.ripplePulsate, touchRippleClasses$1.ripplePulsate),
        child: clsx(classes.child, touchRippleClasses$1.child),
        childLeaving: clsx(classes.childLeaving, touchRippleClasses$1.childLeaving),
        childPulsate: clsx(classes.childPulsate, touchRippleClasses$1.childPulsate)
      },
      timeout: DURATION,
      pulsate: pulsate2,
      rippleX,
      rippleY,
      rippleSize
    }, nextKey.current)]);
    nextKey.current += 1;
    rippleCallback.current = cb;
  }, [classes]);
  const start2 = react.exports.useCallback((event = {}, options = {}, cb) => {
    const {
      pulsate: pulsate2 = false,
      center = centerProp || options.pulsate,
      fakeElement = false
    } = options;
    if (event.type === "mousedown" && ignoringMouseDown.current) {
      ignoringMouseDown.current = false;
      return;
    }
    if (event.type === "touchstart") {
      ignoringMouseDown.current = true;
    }
    const element = fakeElement ? null : container.current;
    const rect = element ? element.getBoundingClientRect() : {
      width: 0,
      height: 0,
      left: 0,
      top: 0
    };
    let rippleX;
    let rippleY;
    let rippleSize;
    if (center || event.clientX === 0 && event.clientY === 0 || !event.clientX && !event.touches) {
      rippleX = Math.round(rect.width / 2);
      rippleY = Math.round(rect.height / 2);
    } else {
      const {
        clientX,
        clientY
      } = event.touches ? event.touches[0] : event;
      rippleX = Math.round(clientX - rect.left);
      rippleY = Math.round(clientY - rect.top);
    }
    if (center) {
      rippleSize = Math.sqrt((2 * rect.width ** 2 + rect.height ** 2) / 3);
      if (rippleSize % 2 === 0) {
        rippleSize += 1;
      }
    } else {
      const sizeX = Math.max(Math.abs((element ? element.clientWidth : 0) - rippleX), rippleX) * 2 + 2;
      const sizeY = Math.max(Math.abs((element ? element.clientHeight : 0) - rippleY), rippleY) * 2 + 2;
      rippleSize = Math.sqrt(sizeX ** 2 + sizeY ** 2);
    }
    if (event.touches) {
      if (startTimerCommit.current === null) {
        startTimerCommit.current = () => {
          startCommit({
            pulsate: pulsate2,
            rippleX,
            rippleY,
            rippleSize,
            cb
          });
        };
        startTimer.current = setTimeout(() => {
          if (startTimerCommit.current) {
            startTimerCommit.current();
            startTimerCommit.current = null;
          }
        }, DELAY_RIPPLE);
      }
    } else {
      startCommit({
        pulsate: pulsate2,
        rippleX,
        rippleY,
        rippleSize,
        cb
      });
    }
  }, [centerProp, startCommit]);
  const pulsate = react.exports.useCallback(() => {
    start2({}, {
      pulsate: true
    });
  }, [start2]);
  const stop = react.exports.useCallback((event, cb) => {
    clearTimeout(startTimer.current);
    if (event.type === "touchend" && startTimerCommit.current) {
      startTimerCommit.current();
      startTimerCommit.current = null;
      startTimer.current = setTimeout(() => {
        stop(event, cb);
      });
      return;
    }
    startTimerCommit.current = null;
    setRipples((oldRipples) => {
      if (oldRipples.length > 0) {
        return oldRipples.slice(1);
      }
      return oldRipples;
    });
    rippleCallback.current = cb;
  }, []);
  react.exports.useImperativeHandle(ref, () => ({
    pulsate,
    start: start2,
    stop
  }), [pulsate, start2, stop]);
  return /* @__PURE__ */ jsx(TouchRippleRoot, _extends$3({
    className: clsx(classes.root, touchRippleClasses$1.root, className),
    ref: container
  }, other, {
    children: /* @__PURE__ */ jsx(TransitionGroup$1, {
      component: null,
      exit: true,
      children: ripples
    })
  }));
});
var TouchRipple$1 = TouchRipple;
function getButtonBaseUtilityClass(slot) {
  return generateUtilityClass("MuiButtonBase", slot);
}
const buttonBaseClasses = generateUtilityClasses("MuiButtonBase", ["root", "disabled", "focusVisible"]);
var buttonBaseClasses$1 = buttonBaseClasses;
const _excluded$I = ["action", "centerRipple", "children", "className", "component", "disabled", "disableRipple", "disableTouchRipple", "focusRipple", "focusVisibleClassName", "LinkComponent", "onBlur", "onClick", "onContextMenu", "onDragLeave", "onFocus", "onFocusVisible", "onKeyDown", "onKeyUp", "onMouseDown", "onMouseLeave", "onMouseUp", "onTouchEnd", "onTouchMove", "onTouchStart", "tabIndex", "TouchRippleProps", "type"];
const useUtilityClasses$y = (ownerState) => {
  const {
    disabled,
    focusVisible,
    focusVisibleClassName,
    classes
  } = ownerState;
  const slots = {
    root: ["root", disabled && "disabled", focusVisible && "focusVisible"]
  };
  const composedClasses = composeClasses(slots, getButtonBaseUtilityClass, classes);
  if (focusVisible && focusVisibleClassName) {
    composedClasses.root += ` ${focusVisibleClassName}`;
  }
  return composedClasses;
};
const ButtonBaseRoot = styled$3("button", {
  name: "MuiButtonBase",
  slot: "Root",
  overridesResolver: (props, styles2) => styles2.root
})({
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  position: "relative",
  boxSizing: "border-box",
  WebkitTapHighlightColor: "transparent",
  backgroundColor: "transparent",
  outline: 0,
  border: 0,
  margin: 0,
  borderRadius: 0,
  padding: 0,
  cursor: "pointer",
  userSelect: "none",
  verticalAlign: "middle",
  MozAppearance: "none",
  WebkitAppearance: "none",
  textDecoration: "none",
  color: "inherit",
  "&::-moz-focus-inner": {
    borderStyle: "none"
  },
  [`&.${buttonBaseClasses$1.disabled}`]: {
    pointerEvents: "none",
    cursor: "default"
  },
  "@media print": {
    colorAdjust: "exact"
  }
});
const ButtonBase = /* @__PURE__ */ react.exports.forwardRef(function ButtonBase2(inProps, ref) {
  const props = useThemeProps({
    props: inProps,
    name: "MuiButtonBase"
  });
  const {
    action,
    centerRipple = false,
    children,
    className,
    component = "button",
    disabled = false,
    disableRipple = false,
    disableTouchRipple = false,
    focusRipple = false,
    LinkComponent = "a",
    onBlur,
    onClick,
    onContextMenu,
    onDragLeave,
    onFocus,
    onFocusVisible,
    onKeyDown,
    onKeyUp,
    onMouseDown,
    onMouseLeave,
    onMouseUp,
    onTouchEnd,
    onTouchMove,
    onTouchStart,
    tabIndex = 0,
    TouchRippleProps,
    type
  } = props, other = _objectWithoutPropertiesLoose$1(props, _excluded$I);
  const buttonRef = react.exports.useRef(null);
  const rippleRef = react.exports.useRef(null);
  const {
    isFocusVisibleRef,
    onFocus: handleFocusVisible,
    onBlur: handleBlurVisible,
    ref: focusVisibleRef
  } = useIsFocusVisible();
  const [focusVisible, setFocusVisible] = react.exports.useState(false);
  if (disabled && focusVisible) {
    setFocusVisible(false);
  }
  react.exports.useImperativeHandle(action, () => ({
    focusVisible: () => {
      setFocusVisible(true);
      buttonRef.current.focus();
    }
  }), []);
  react.exports.useEffect(() => {
    if (focusVisible && focusRipple && !disableRipple) {
      rippleRef.current.pulsate();
    }
  }, [disableRipple, focusRipple, focusVisible]);
  function useRippleHandler(rippleAction, eventCallback, skipRippleAction = disableTouchRipple) {
    return useEventCallback((event) => {
      if (eventCallback) {
        eventCallback(event);
      }
      const ignore = skipRippleAction;
      if (!ignore && rippleRef.current) {
        rippleRef.current[rippleAction](event);
      }
      return true;
    });
  }
  const handleMouseDown = useRippleHandler("start", onMouseDown);
  const handleContextMenu = useRippleHandler("stop", onContextMenu);
  const handleDragLeave = useRippleHandler("stop", onDragLeave);
  const handleMouseUp = useRippleHandler("stop", onMouseUp);
  const handleMouseLeave = useRippleHandler("stop", (event) => {
    if (focusVisible) {
      event.preventDefault();
    }
    if (onMouseLeave) {
      onMouseLeave(event);
    }
  });
  const handleTouchStart = useRippleHandler("start", onTouchStart);
  const handleTouchEnd = useRippleHandler("stop", onTouchEnd);
  const handleTouchMove = useRippleHandler("stop", onTouchMove);
  const handleBlur = useRippleHandler("stop", (event) => {
    handleBlurVisible(event);
    if (isFocusVisibleRef.current === false) {
      setFocusVisible(false);
    }
    if (onBlur) {
      onBlur(event);
    }
  }, false);
  const handleFocus = useEventCallback((event) => {
    if (!buttonRef.current) {
      buttonRef.current = event.currentTarget;
    }
    handleFocusVisible(event);
    if (isFocusVisibleRef.current === true) {
      setFocusVisible(true);
      if (onFocusVisible) {
        onFocusVisible(event);
      }
    }
    if (onFocus) {
      onFocus(event);
    }
  });
  const isNonNativeButton = () => {
    const button = buttonRef.current;
    return component && component !== "button" && !(button.tagName === "A" && button.href);
  };
  const keydownRef = react.exports.useRef(false);
  const handleKeyDown2 = useEventCallback((event) => {
    if (focusRipple && !keydownRef.current && focusVisible && rippleRef.current && event.key === " ") {
      keydownRef.current = true;
      rippleRef.current.stop(event, () => {
        rippleRef.current.start(event);
      });
    }
    if (event.target === event.currentTarget && isNonNativeButton() && event.key === " ") {
      event.preventDefault();
    }
    if (onKeyDown) {
      onKeyDown(event);
    }
    if (event.target === event.currentTarget && isNonNativeButton() && event.key === "Enter" && !disabled) {
      event.preventDefault();
      if (onClick) {
        onClick(event);
      }
    }
  });
  const handleKeyUp = useEventCallback((event) => {
    if (focusRipple && event.key === " " && rippleRef.current && focusVisible && !event.defaultPrevented) {
      keydownRef.current = false;
      rippleRef.current.stop(event, () => {
        rippleRef.current.pulsate(event);
      });
    }
    if (onKeyUp) {
      onKeyUp(event);
    }
    if (onClick && event.target === event.currentTarget && isNonNativeButton() && event.key === " " && !event.defaultPrevented) {
      onClick(event);
    }
  });
  let ComponentProp = component;
  if (ComponentProp === "button" && (other.href || other.to)) {
    ComponentProp = LinkComponent;
  }
  const buttonProps = {};
  if (ComponentProp === "button") {
    buttonProps.type = type === void 0 ? "button" : type;
    buttonProps.disabled = disabled;
  } else {
    if (!other.href && !other.to) {
      buttonProps.role = "button";
    }
    if (disabled) {
      buttonProps["aria-disabled"] = disabled;
    }
  }
  const handleOwnRef = useForkRef(focusVisibleRef, buttonRef);
  const handleRef = useForkRef(ref, handleOwnRef);
  const [mountedState, setMountedState] = react.exports.useState(false);
  react.exports.useEffect(() => {
    setMountedState(true);
  }, []);
  const enableTouchRipple = mountedState && !disableRipple && !disabled;
  const ownerState = _extends$3({}, props, {
    centerRipple,
    component,
    disabled,
    disableRipple,
    disableTouchRipple,
    focusRipple,
    tabIndex,
    focusVisible
  });
  const classes = useUtilityClasses$y(ownerState);
  return /* @__PURE__ */ jsxs(ButtonBaseRoot, _extends$3({
    as: ComponentProp,
    className: clsx(classes.root, className),
    ownerState,
    onBlur: handleBlur,
    onClick,
    onContextMenu: handleContextMenu,
    onFocus: handleFocus,
    onKeyDown: handleKeyDown2,
    onKeyUp: handleKeyUp,
    onMouseDown: handleMouseDown,
    onMouseLeave: handleMouseLeave,
    onMouseUp: handleMouseUp,
    onDragLeave: handleDragLeave,
    onTouchEnd: handleTouchEnd,
    onTouchMove: handleTouchMove,
    onTouchStart: handleTouchStart,
    ref: handleRef,
    tabIndex: disabled ? -1 : tabIndex,
    type
  }, buttonProps, other, {
    children: [children, enableTouchRipple ? /* @__PURE__ */ jsx(TouchRipple$1, _extends$3({
      ref: rippleRef,
      center: centerRipple
    }, TouchRippleProps)) : null]
  }));
});
var ButtonBase$1 = ButtonBase;
function getIconButtonUtilityClass(slot) {
  return generateUtilityClass("MuiIconButton", slot);
}
const iconButtonClasses = generateUtilityClasses("MuiIconButton", ["root", "disabled", "colorInherit", "colorPrimary", "colorSecondary", "edgeStart", "edgeEnd", "sizeSmall", "sizeMedium", "sizeLarge"]);
var iconButtonClasses$1 = iconButtonClasses;
const _excluded$H = ["edge", "children", "className", "color", "disabled", "disableFocusRipple", "size"];
const useUtilityClasses$x = (ownerState) => {
  const {
    classes,
    disabled,
    color,
    edge,
    size
  } = ownerState;
  const slots = {
    root: ["root", disabled && "disabled", color !== "default" && `color${capitalize(color)}`, edge && `edge${capitalize(edge)}`, `size${capitalize(size)}`]
  };
  return composeClasses(slots, getIconButtonUtilityClass, classes);
};
const IconButtonRoot = styled$3(ButtonBase$1, {
  name: "MuiIconButton",
  slot: "Root",
  overridesResolver: (props, styles2) => {
    const {
      ownerState
    } = props;
    return [styles2.root, ownerState.color !== "default" && styles2[`color${capitalize(ownerState.color)}`], ownerState.edge && styles2[`edge${capitalize(ownerState.edge)}`], styles2[`size${capitalize(ownerState.size)}`]];
  }
})(({
  theme: theme2,
  ownerState
}) => _extends$3({
  textAlign: "center",
  flex: "0 0 auto",
  fontSize: theme2.typography.pxToRem(24),
  padding: 8,
  borderRadius: "50%",
  overflow: "visible",
  color: theme2.palette.action.active,
  transition: theme2.transitions.create("background-color", {
    duration: theme2.transitions.duration.shortest
  }),
  "&:hover": {
    backgroundColor: alpha(theme2.palette.action.active, theme2.palette.action.hoverOpacity),
    "@media (hover: none)": {
      backgroundColor: "transparent"
    }
  }
}, ownerState.edge === "start" && {
  marginLeft: ownerState.size === "small" ? -3 : -12
}, ownerState.edge === "end" && {
  marginRight: ownerState.size === "small" ? -3 : -12
}), ({
  theme: theme2,
  ownerState
}) => _extends$3({}, ownerState.color === "inherit" && {
  color: "inherit"
}, ownerState.color !== "inherit" && ownerState.color !== "default" && {
  color: theme2.palette[ownerState.color].main,
  "&:hover": {
    backgroundColor: alpha(theme2.palette[ownerState.color].main, theme2.palette.action.hoverOpacity),
    "@media (hover: none)": {
      backgroundColor: "transparent"
    }
  }
}, ownerState.size === "small" && {
  padding: 5,
  fontSize: theme2.typography.pxToRem(18)
}, ownerState.size === "large" && {
  padding: 12,
  fontSize: theme2.typography.pxToRem(28)
}, {
  [`&.${iconButtonClasses$1.disabled}`]: {
    backgroundColor: "transparent",
    color: theme2.palette.action.disabled
  }
}));
const IconButton = /* @__PURE__ */ react.exports.forwardRef(function IconButton2(inProps, ref) {
  const props = useThemeProps({
    props: inProps,
    name: "MuiIconButton"
  });
  const {
    edge = false,
    children,
    className,
    color = "default",
    disabled = false,
    disableFocusRipple = false,
    size = "medium"
  } = props, other = _objectWithoutPropertiesLoose$1(props, _excluded$H);
  const ownerState = _extends$3({}, props, {
    edge,
    color,
    disabled,
    disableFocusRipple,
    size
  });
  const classes = useUtilityClasses$x(ownerState);
  return /* @__PURE__ */ jsx(IconButtonRoot, _extends$3({
    className: clsx(classes.root, className),
    centerRipple: true,
    focusRipple: !disableFocusRipple,
    disabled,
    ref,
    ownerState
  }, other, {
    children
  }));
});
var IconButton$1 = IconButton;
var styled$1 = {};
var createStyled$1 = {};
var _extends$1 = { exports: {} };
(function(module) {
  function _extends3() {
    module.exports = _extends3 = Object.assign || function(target) {
      for (var i = 1; i < arguments.length; i++) {
        var source = arguments[i];
        for (var key in source) {
          if (Object.prototype.hasOwnProperty.call(source, key)) {
            target[key] = source[key];
          }
        }
      }
      return target;
    };
    module.exports["default"] = module.exports, module.exports.__esModule = true;
    return _extends3.apply(this, arguments);
  }
  module.exports = _extends3;
  module.exports["default"] = module.exports, module.exports.__esModule = true;
})(_extends$1);
var objectWithoutPropertiesLoose = { exports: {} };
(function(module) {
  function _objectWithoutPropertiesLoose3(source, excluded) {
    if (source == null)
      return {};
    var target = {};
    var sourceKeys = Object.keys(source);
    var key, i;
    for (i = 0; i < sourceKeys.length; i++) {
      key = sourceKeys[i];
      if (excluded.indexOf(key) >= 0)
        continue;
      target[key] = source[key];
    }
    return target;
  }
  module.exports = _objectWithoutPropertiesLoose3;
  module.exports["default"] = module.exports, module.exports.__esModule = true;
})(objectWithoutPropertiesLoose);
var require$$3 = /* @__PURE__ */ getAugmentedNamespace(styledEngine);
var require$$4 = /* @__PURE__ */ getAugmentedNamespace(esm);
var require$$5 = /* @__PURE__ */ getAugmentedNamespace(createTheme);
var require$$6 = /* @__PURE__ */ getAugmentedNamespace(styleFunctionSx);
var propsToClassKey$1 = {};
var _interopRequireDefault$g = interopRequireDefault.exports;
Object.defineProperty(propsToClassKey$1, "__esModule", {
  value: true
});
propsToClassKey$1.default = propsToClassKey;
var _objectWithoutPropertiesLoose2$1 = _interopRequireDefault$g(objectWithoutPropertiesLoose.exports);
var _utils = require$$4;
const _excluded$G = ["variant"];
function isEmpty$3(string) {
  return string.length === 0;
}
function propsToClassKey(props) {
  const {
    variant
  } = props, other = (0, _objectWithoutPropertiesLoose2$1.default)(props, _excluded$G);
  let classKey = variant || "";
  Object.keys(other).sort().forEach((key) => {
    if (key === "color") {
      classKey += isEmpty$3(classKey) ? props[key] : (0, _utils.unstable_capitalize)(props[key]);
    } else {
      classKey += `${isEmpty$3(classKey) ? key : (0, _utils.unstable_capitalize)(key)}${(0, _utils.unstable_capitalize)(props[key].toString())}`;
    }
  });
  return classKey;
}
var _interopRequireDefault$f = interopRequireDefault.exports;
Object.defineProperty(createStyled$1, "__esModule", {
  value: true
});
createStyled$1.default = createStyled;
createStyled$1.shouldForwardProp = shouldForwardProp;
createStyled$1.systemDefaultTheme = void 0;
var _extends2 = _interopRequireDefault$f(_extends$1.exports);
var _objectWithoutPropertiesLoose2 = _interopRequireDefault$f(objectWithoutPropertiesLoose.exports);
var _styledEngine = _interopRequireDefault$f(require$$3);
var _createTheme = _interopRequireDefault$f(require$$5);
var _styleFunctionSx = _interopRequireDefault$f(require$$6);
var _propsToClassKey = _interopRequireDefault$f(propsToClassKey$1);
const _excluded$F = ["name", "slot", "skipVariantsResolver", "skipSx", "overridesResolver"], _excluded2$4 = ["theme"], _excluded3 = ["theme"];
function isEmpty$2(obj) {
  return Object.keys(obj).length === 0;
}
const getStyleOverrides = (name, theme2) => {
  if (theme2.components && theme2.components[name] && theme2.components[name].styleOverrides) {
    return theme2.components[name].styleOverrides;
  }
  return null;
};
const getVariantStyles = (name, theme2) => {
  let variants = [];
  if (theme2 && theme2.components && theme2.components[name] && theme2.components[name].variants) {
    variants = theme2.components[name].variants;
  }
  const variantsStyles = {};
  variants.forEach((definition) => {
    const key = (0, _propsToClassKey.default)(definition.props);
    variantsStyles[key] = definition.style;
  });
  return variantsStyles;
};
const variantsResolver = (props, styles2, theme2, name) => {
  var _theme$components, _theme$components$nam;
  const {
    ownerState = {}
  } = props;
  const variantsStyles = [];
  const themeVariants = theme2 == null ? void 0 : (_theme$components = theme2.components) == null ? void 0 : (_theme$components$nam = _theme$components[name]) == null ? void 0 : _theme$components$nam.variants;
  if (themeVariants) {
    themeVariants.forEach((themeVariant) => {
      let isMatch = true;
      Object.keys(themeVariant.props).forEach((key) => {
        if (ownerState[key] !== themeVariant.props[key] && props[key] !== themeVariant.props[key]) {
          isMatch = false;
        }
      });
      if (isMatch) {
        variantsStyles.push(styles2[(0, _propsToClassKey.default)(themeVariant.props)]);
      }
    });
  }
  return variantsStyles;
};
function shouldForwardProp(prop) {
  return prop !== "ownerState" && prop !== "theme" && prop !== "sx" && prop !== "as";
}
const systemDefaultTheme = (0, _createTheme.default)();
createStyled$1.systemDefaultTheme = systemDefaultTheme;
function createStyled(input = {}) {
  const {
    defaultTheme: defaultTheme2 = systemDefaultTheme,
    rootShouldForwardProp: rootShouldForwardProp2 = shouldForwardProp,
    slotShouldForwardProp: slotShouldForwardProp2 = shouldForwardProp
  } = input;
  return (tag, inputOptions = {}) => {
    const {
      name: componentName,
      slot: componentSlot,
      skipVariantsResolver: inputSkipVariantsResolver,
      skipSx: inputSkipSx,
      overridesResolver: overridesResolver2
    } = inputOptions, options = (0, _objectWithoutPropertiesLoose2.default)(inputOptions, _excluded$F);
    const skipVariantsResolver = inputSkipVariantsResolver !== void 0 ? inputSkipVariantsResolver : componentSlot && componentSlot !== "Root" || false;
    const skipSx = inputSkipSx || false;
    let label;
    let shouldForwardPropOption = shouldForwardProp;
    if (componentSlot === "Root") {
      shouldForwardPropOption = rootShouldForwardProp2;
    } else if (componentSlot) {
      shouldForwardPropOption = slotShouldForwardProp2;
    }
    const defaultStyledResolver = (0, _styledEngine.default)(tag, (0, _extends2.default)({
      shouldForwardProp: shouldForwardPropOption,
      label
    }, options));
    const muiStyledResolver = (styleArg, ...expressions) => {
      const expressionsWithDefaultTheme = expressions ? expressions.map((stylesArg) => {
        return typeof stylesArg === "function" && stylesArg.__emotion_real !== stylesArg ? (_ref) => {
          let {
            theme: themeInput
          } = _ref, other = (0, _objectWithoutPropertiesLoose2.default)(_ref, _excluded2$4);
          return stylesArg((0, _extends2.default)({
            theme: isEmpty$2(themeInput) ? defaultTheme2 : themeInput
          }, other));
        } : stylesArg;
      }) : [];
      let transformedStyleArg = styleArg;
      if (componentName && overridesResolver2) {
        expressionsWithDefaultTheme.push((props) => {
          const theme2 = isEmpty$2(props.theme) ? defaultTheme2 : props.theme;
          const styleOverrides = getStyleOverrides(componentName, theme2);
          if (styleOverrides) {
            return overridesResolver2(props, styleOverrides);
          }
          return null;
        });
      }
      if (componentName && !skipVariantsResolver) {
        expressionsWithDefaultTheme.push((props) => {
          const theme2 = isEmpty$2(props.theme) ? defaultTheme2 : props.theme;
          return variantsResolver(props, getVariantStyles(componentName, theme2), theme2, componentName);
        });
      }
      if (!skipSx) {
        expressionsWithDefaultTheme.push((props) => {
          const theme2 = isEmpty$2(props.theme) ? defaultTheme2 : props.theme;
          return (0, _styleFunctionSx.default)((0, _extends2.default)({}, props, {
            theme: theme2
          }));
        });
      }
      const numOfCustomFnsApplied = expressionsWithDefaultTheme.length - expressions.length;
      if (Array.isArray(styleArg) && numOfCustomFnsApplied > 0) {
        const placeholders = new Array(numOfCustomFnsApplied).fill("");
        transformedStyleArg = [...styleArg, ...placeholders];
        transformedStyleArg.raw = [...styleArg.raw, ...placeholders];
      } else if (typeof styleArg === "function") {
        transformedStyleArg = (_ref2) => {
          let {
            theme: themeInput
          } = _ref2, other = (0, _objectWithoutPropertiesLoose2.default)(_ref2, _excluded3);
          return styleArg((0, _extends2.default)({
            theme: isEmpty$2(themeInput) ? defaultTheme2 : themeInput
          }, other));
        };
      }
      const Component = defaultStyledResolver(transformedStyleArg, ...expressionsWithDefaultTheme);
      return Component;
    };
    return muiStyledResolver;
  };
}
var _interopRequireDefault$e = interopRequireDefault.exports;
Object.defineProperty(styled$1, "__esModule", {
  value: true
});
var default_1$e = styled$1.default = void 0;
var _createStyled = _interopRequireDefault$e(createStyled$1);
const styled = (0, _createStyled.default)();
var _default$e = styled;
default_1$e = styled$1.default = _default$e;
var dist = { exports: {} };
var entities$1 = {};
Object.defineProperty(entities$1, "__esModule", { value: true });
var entities = {
  Aacute: "\xC1",
  aacute: "\xE1",
  Abreve: "\u0102",
  abreve: "\u0103",
  ac: "\u223E",
  acd: "\u223F",
  acE: "\u223E\u0333",
  Acirc: "\xC2",
  acirc: "\xE2",
  acute: "\xB4",
  Acy: "\u0410",
  acy: "\u0430",
  AElig: "\xC6",
  aelig: "\xE6",
  af: "\u2061",
  Afr: "\u{1D504}",
  afr: "\u{1D51E}",
  Agrave: "\xC0",
  agrave: "\xE0",
  alefsym: "\u2135",
  aleph: "\u2135",
  Alpha: "\u0391",
  alpha: "\u03B1",
  Amacr: "\u0100",
  amacr: "\u0101",
  amalg: "\u2A3F",
  amp: "&",
  AMP: "&",
  andand: "\u2A55",
  And: "\u2A53",
  and: "\u2227",
  andd: "\u2A5C",
  andslope: "\u2A58",
  andv: "\u2A5A",
  ang: "\u2220",
  ange: "\u29A4",
  angle: "\u2220",
  angmsdaa: "\u29A8",
  angmsdab: "\u29A9",
  angmsdac: "\u29AA",
  angmsdad: "\u29AB",
  angmsdae: "\u29AC",
  angmsdaf: "\u29AD",
  angmsdag: "\u29AE",
  angmsdah: "\u29AF",
  angmsd: "\u2221",
  angrt: "\u221F",
  angrtvb: "\u22BE",
  angrtvbd: "\u299D",
  angsph: "\u2222",
  angst: "\xC5",
  angzarr: "\u237C",
  Aogon: "\u0104",
  aogon: "\u0105",
  Aopf: "\u{1D538}",
  aopf: "\u{1D552}",
  apacir: "\u2A6F",
  ap: "\u2248",
  apE: "\u2A70",
  ape: "\u224A",
  apid: "\u224B",
  apos: "'",
  ApplyFunction: "\u2061",
  approx: "\u2248",
  approxeq: "\u224A",
  Aring: "\xC5",
  aring: "\xE5",
  Ascr: "\u{1D49C}",
  ascr: "\u{1D4B6}",
  Assign: "\u2254",
  ast: "*",
  asymp: "\u2248",
  asympeq: "\u224D",
  Atilde: "\xC3",
  atilde: "\xE3",
  Auml: "\xC4",
  auml: "\xE4",
  awconint: "\u2233",
  awint: "\u2A11",
  backcong: "\u224C",
  backepsilon: "\u03F6",
  backprime: "\u2035",
  backsim: "\u223D",
  backsimeq: "\u22CD",
  Backslash: "\u2216",
  Barv: "\u2AE7",
  barvee: "\u22BD",
  barwed: "\u2305",
  Barwed: "\u2306",
  barwedge: "\u2305",
  bbrk: "\u23B5",
  bbrktbrk: "\u23B6",
  bcong: "\u224C",
  Bcy: "\u0411",
  bcy: "\u0431",
  bdquo: "\u201E",
  becaus: "\u2235",
  because: "\u2235",
  Because: "\u2235",
  bemptyv: "\u29B0",
  bepsi: "\u03F6",
  bernou: "\u212C",
  Bernoullis: "\u212C",
  Beta: "\u0392",
  beta: "\u03B2",
  beth: "\u2136",
  between: "\u226C",
  Bfr: "\u{1D505}",
  bfr: "\u{1D51F}",
  bigcap: "\u22C2",
  bigcirc: "\u25EF",
  bigcup: "\u22C3",
  bigodot: "\u2A00",
  bigoplus: "\u2A01",
  bigotimes: "\u2A02",
  bigsqcup: "\u2A06",
  bigstar: "\u2605",
  bigtriangledown: "\u25BD",
  bigtriangleup: "\u25B3",
  biguplus: "\u2A04",
  bigvee: "\u22C1",
  bigwedge: "\u22C0",
  bkarow: "\u290D",
  blacklozenge: "\u29EB",
  blacksquare: "\u25AA",
  blacktriangle: "\u25B4",
  blacktriangledown: "\u25BE",
  blacktriangleleft: "\u25C2",
  blacktriangleright: "\u25B8",
  blank: "\u2423",
  blk12: "\u2592",
  blk14: "\u2591",
  blk34: "\u2593",
  block: "\u2588",
  bne: "=\u20E5",
  bnequiv: "\u2261\u20E5",
  bNot: "\u2AED",
  bnot: "\u2310",
  Bopf: "\u{1D539}",
  bopf: "\u{1D553}",
  bot: "\u22A5",
  bottom: "\u22A5",
  bowtie: "\u22C8",
  boxbox: "\u29C9",
  boxdl: "\u2510",
  boxdL: "\u2555",
  boxDl: "\u2556",
  boxDL: "\u2557",
  boxdr: "\u250C",
  boxdR: "\u2552",
  boxDr: "\u2553",
  boxDR: "\u2554",
  boxh: "\u2500",
  boxH: "\u2550",
  boxhd: "\u252C",
  boxHd: "\u2564",
  boxhD: "\u2565",
  boxHD: "\u2566",
  boxhu: "\u2534",
  boxHu: "\u2567",
  boxhU: "\u2568",
  boxHU: "\u2569",
  boxminus: "\u229F",
  boxplus: "\u229E",
  boxtimes: "\u22A0",
  boxul: "\u2518",
  boxuL: "\u255B",
  boxUl: "\u255C",
  boxUL: "\u255D",
  boxur: "\u2514",
  boxuR: "\u2558",
  boxUr: "\u2559",
  boxUR: "\u255A",
  boxv: "\u2502",
  boxV: "\u2551",
  boxvh: "\u253C",
  boxvH: "\u256A",
  boxVh: "\u256B",
  boxVH: "\u256C",
  boxvl: "\u2524",
  boxvL: "\u2561",
  boxVl: "\u2562",
  boxVL: "\u2563",
  boxvr: "\u251C",
  boxvR: "\u255E",
  boxVr: "\u255F",
  boxVR: "\u2560",
  bprime: "\u2035",
  breve: "\u02D8",
  Breve: "\u02D8",
  brvbar: "\xA6",
  bscr: "\u{1D4B7}",
  Bscr: "\u212C",
  bsemi: "\u204F",
  bsim: "\u223D",
  bsime: "\u22CD",
  bsolb: "\u29C5",
  bsol: "\\",
  bsolhsub: "\u27C8",
  bull: "\u2022",
  bullet: "\u2022",
  bump: "\u224E",
  bumpE: "\u2AAE",
  bumpe: "\u224F",
  Bumpeq: "\u224E",
  bumpeq: "\u224F",
  Cacute: "\u0106",
  cacute: "\u0107",
  capand: "\u2A44",
  capbrcup: "\u2A49",
  capcap: "\u2A4B",
  cap: "\u2229",
  Cap: "\u22D2",
  capcup: "\u2A47",
  capdot: "\u2A40",
  CapitalDifferentialD: "\u2145",
  caps: "\u2229\uFE00",
  caret: "\u2041",
  caron: "\u02C7",
  Cayleys: "\u212D",
  ccaps: "\u2A4D",
  Ccaron: "\u010C",
  ccaron: "\u010D",
  Ccedil: "\xC7",
  ccedil: "\xE7",
  Ccirc: "\u0108",
  ccirc: "\u0109",
  Cconint: "\u2230",
  ccups: "\u2A4C",
  ccupssm: "\u2A50",
  Cdot: "\u010A",
  cdot: "\u010B",
  cedil: "\xB8",
  Cedilla: "\xB8",
  cemptyv: "\u29B2",
  cent: "\xA2",
  centerdot: "\xB7",
  CenterDot: "\xB7",
  cfr: "\u{1D520}",
  Cfr: "\u212D",
  CHcy: "\u0427",
  chcy: "\u0447",
  check: "\u2713",
  checkmark: "\u2713",
  Chi: "\u03A7",
  chi: "\u03C7",
  circ: "\u02C6",
  circeq: "\u2257",
  circlearrowleft: "\u21BA",
  circlearrowright: "\u21BB",
  circledast: "\u229B",
  circledcirc: "\u229A",
  circleddash: "\u229D",
  CircleDot: "\u2299",
  circledR: "\xAE",
  circledS: "\u24C8",
  CircleMinus: "\u2296",
  CirclePlus: "\u2295",
  CircleTimes: "\u2297",
  cir: "\u25CB",
  cirE: "\u29C3",
  cire: "\u2257",
  cirfnint: "\u2A10",
  cirmid: "\u2AEF",
  cirscir: "\u29C2",
  ClockwiseContourIntegral: "\u2232",
  CloseCurlyDoubleQuote: "\u201D",
  CloseCurlyQuote: "\u2019",
  clubs: "\u2663",
  clubsuit: "\u2663",
  colon: ":",
  Colon: "\u2237",
  Colone: "\u2A74",
  colone: "\u2254",
  coloneq: "\u2254",
  comma: ",",
  commat: "@",
  comp: "\u2201",
  compfn: "\u2218",
  complement: "\u2201",
  complexes: "\u2102",
  cong: "\u2245",
  congdot: "\u2A6D",
  Congruent: "\u2261",
  conint: "\u222E",
  Conint: "\u222F",
  ContourIntegral: "\u222E",
  copf: "\u{1D554}",
  Copf: "\u2102",
  coprod: "\u2210",
  Coproduct: "\u2210",
  copy: "\xA9",
  COPY: "\xA9",
  copysr: "\u2117",
  CounterClockwiseContourIntegral: "\u2233",
  crarr: "\u21B5",
  cross: "\u2717",
  Cross: "\u2A2F",
  Cscr: "\u{1D49E}",
  cscr: "\u{1D4B8}",
  csub: "\u2ACF",
  csube: "\u2AD1",
  csup: "\u2AD0",
  csupe: "\u2AD2",
  ctdot: "\u22EF",
  cudarrl: "\u2938",
  cudarrr: "\u2935",
  cuepr: "\u22DE",
  cuesc: "\u22DF",
  cularr: "\u21B6",
  cularrp: "\u293D",
  cupbrcap: "\u2A48",
  cupcap: "\u2A46",
  CupCap: "\u224D",
  cup: "\u222A",
  Cup: "\u22D3",
  cupcup: "\u2A4A",
  cupdot: "\u228D",
  cupor: "\u2A45",
  cups: "\u222A\uFE00",
  curarr: "\u21B7",
  curarrm: "\u293C",
  curlyeqprec: "\u22DE",
  curlyeqsucc: "\u22DF",
  curlyvee: "\u22CE",
  curlywedge: "\u22CF",
  curren: "\xA4",
  curvearrowleft: "\u21B6",
  curvearrowright: "\u21B7",
  cuvee: "\u22CE",
  cuwed: "\u22CF",
  cwconint: "\u2232",
  cwint: "\u2231",
  cylcty: "\u232D",
  dagger: "\u2020",
  Dagger: "\u2021",
  daleth: "\u2138",
  darr: "\u2193",
  Darr: "\u21A1",
  dArr: "\u21D3",
  dash: "\u2010",
  Dashv: "\u2AE4",
  dashv: "\u22A3",
  dbkarow: "\u290F",
  dblac: "\u02DD",
  Dcaron: "\u010E",
  dcaron: "\u010F",
  Dcy: "\u0414",
  dcy: "\u0434",
  ddagger: "\u2021",
  ddarr: "\u21CA",
  DD: "\u2145",
  dd: "\u2146",
  DDotrahd: "\u2911",
  ddotseq: "\u2A77",
  deg: "\xB0",
  Del: "\u2207",
  Delta: "\u0394",
  delta: "\u03B4",
  demptyv: "\u29B1",
  dfisht: "\u297F",
  Dfr: "\u{1D507}",
  dfr: "\u{1D521}",
  dHar: "\u2965",
  dharl: "\u21C3",
  dharr: "\u21C2",
  DiacriticalAcute: "\xB4",
  DiacriticalDot: "\u02D9",
  DiacriticalDoubleAcute: "\u02DD",
  DiacriticalGrave: "`",
  DiacriticalTilde: "\u02DC",
  diam: "\u22C4",
  diamond: "\u22C4",
  Diamond: "\u22C4",
  diamondsuit: "\u2666",
  diams: "\u2666",
  die: "\xA8",
  DifferentialD: "\u2146",
  digamma: "\u03DD",
  disin: "\u22F2",
  div: "\xF7",
  divide: "\xF7",
  divideontimes: "\u22C7",
  divonx: "\u22C7",
  DJcy: "\u0402",
  djcy: "\u0452",
  dlcorn: "\u231E",
  dlcrop: "\u230D",
  dollar: "$",
  Dopf: "\u{1D53B}",
  dopf: "\u{1D555}",
  Dot: "\xA8",
  dot: "\u02D9",
  DotDot: "\u20DC",
  doteq: "\u2250",
  doteqdot: "\u2251",
  DotEqual: "\u2250",
  dotminus: "\u2238",
  dotplus: "\u2214",
  dotsquare: "\u22A1",
  doublebarwedge: "\u2306",
  DoubleContourIntegral: "\u222F",
  DoubleDot: "\xA8",
  DoubleDownArrow: "\u21D3",
  DoubleLeftArrow: "\u21D0",
  DoubleLeftRightArrow: "\u21D4",
  DoubleLeftTee: "\u2AE4",
  DoubleLongLeftArrow: "\u27F8",
  DoubleLongLeftRightArrow: "\u27FA",
  DoubleLongRightArrow: "\u27F9",
  DoubleRightArrow: "\u21D2",
  DoubleRightTee: "\u22A8",
  DoubleUpArrow: "\u21D1",
  DoubleUpDownArrow: "\u21D5",
  DoubleVerticalBar: "\u2225",
  DownArrowBar: "\u2913",
  downarrow: "\u2193",
  DownArrow: "\u2193",
  Downarrow: "\u21D3",
  DownArrowUpArrow: "\u21F5",
  DownBreve: "\u0311",
  downdownarrows: "\u21CA",
  downharpoonleft: "\u21C3",
  downharpoonright: "\u21C2",
  DownLeftRightVector: "\u2950",
  DownLeftTeeVector: "\u295E",
  DownLeftVectorBar: "\u2956",
  DownLeftVector: "\u21BD",
  DownRightTeeVector: "\u295F",
  DownRightVectorBar: "\u2957",
  DownRightVector: "\u21C1",
  DownTeeArrow: "\u21A7",
  DownTee: "\u22A4",
  drbkarow: "\u2910",
  drcorn: "\u231F",
  drcrop: "\u230C",
  Dscr: "\u{1D49F}",
  dscr: "\u{1D4B9}",
  DScy: "\u0405",
  dscy: "\u0455",
  dsol: "\u29F6",
  Dstrok: "\u0110",
  dstrok: "\u0111",
  dtdot: "\u22F1",
  dtri: "\u25BF",
  dtrif: "\u25BE",
  duarr: "\u21F5",
  duhar: "\u296F",
  dwangle: "\u29A6",
  DZcy: "\u040F",
  dzcy: "\u045F",
  dzigrarr: "\u27FF",
  Eacute: "\xC9",
  eacute: "\xE9",
  easter: "\u2A6E",
  Ecaron: "\u011A",
  ecaron: "\u011B",
  Ecirc: "\xCA",
  ecirc: "\xEA",
  ecir: "\u2256",
  ecolon: "\u2255",
  Ecy: "\u042D",
  ecy: "\u044D",
  eDDot: "\u2A77",
  Edot: "\u0116",
  edot: "\u0117",
  eDot: "\u2251",
  ee: "\u2147",
  efDot: "\u2252",
  Efr: "\u{1D508}",
  efr: "\u{1D522}",
  eg: "\u2A9A",
  Egrave: "\xC8",
  egrave: "\xE8",
  egs: "\u2A96",
  egsdot: "\u2A98",
  el: "\u2A99",
  Element: "\u2208",
  elinters: "\u23E7",
  ell: "\u2113",
  els: "\u2A95",
  elsdot: "\u2A97",
  Emacr: "\u0112",
  emacr: "\u0113",
  empty: "\u2205",
  emptyset: "\u2205",
  EmptySmallSquare: "\u25FB",
  emptyv: "\u2205",
  EmptyVerySmallSquare: "\u25AB",
  emsp13: "\u2004",
  emsp14: "\u2005",
  emsp: "\u2003",
  ENG: "\u014A",
  eng: "\u014B",
  ensp: "\u2002",
  Eogon: "\u0118",
  eogon: "\u0119",
  Eopf: "\u{1D53C}",
  eopf: "\u{1D556}",
  epar: "\u22D5",
  eparsl: "\u29E3",
  eplus: "\u2A71",
  epsi: "\u03B5",
  Epsilon: "\u0395",
  epsilon: "\u03B5",
  epsiv: "\u03F5",
  eqcirc: "\u2256",
  eqcolon: "\u2255",
  eqsim: "\u2242",
  eqslantgtr: "\u2A96",
  eqslantless: "\u2A95",
  Equal: "\u2A75",
  equals: "=",
  EqualTilde: "\u2242",
  equest: "\u225F",
  Equilibrium: "\u21CC",
  equiv: "\u2261",
  equivDD: "\u2A78",
  eqvparsl: "\u29E5",
  erarr: "\u2971",
  erDot: "\u2253",
  escr: "\u212F",
  Escr: "\u2130",
  esdot: "\u2250",
  Esim: "\u2A73",
  esim: "\u2242",
  Eta: "\u0397",
  eta: "\u03B7",
  ETH: "\xD0",
  eth: "\xF0",
  Euml: "\xCB",
  euml: "\xEB",
  euro: "\u20AC",
  excl: "!",
  exist: "\u2203",
  Exists: "\u2203",
  expectation: "\u2130",
  exponentiale: "\u2147",
  ExponentialE: "\u2147",
  fallingdotseq: "\u2252",
  Fcy: "\u0424",
  fcy: "\u0444",
  female: "\u2640",
  ffilig: "\uFB03",
  fflig: "\uFB00",
  ffllig: "\uFB04",
  Ffr: "\u{1D509}",
  ffr: "\u{1D523}",
  filig: "\uFB01",
  FilledSmallSquare: "\u25FC",
  FilledVerySmallSquare: "\u25AA",
  fjlig: "fj",
  flat: "\u266D",
  fllig: "\uFB02",
  fltns: "\u25B1",
  fnof: "\u0192",
  Fopf: "\u{1D53D}",
  fopf: "\u{1D557}",
  forall: "\u2200",
  ForAll: "\u2200",
  fork: "\u22D4",
  forkv: "\u2AD9",
  Fouriertrf: "\u2131",
  fpartint: "\u2A0D",
  frac12: "\xBD",
  frac13: "\u2153",
  frac14: "\xBC",
  frac15: "\u2155",
  frac16: "\u2159",
  frac18: "\u215B",
  frac23: "\u2154",
  frac25: "\u2156",
  frac34: "\xBE",
  frac35: "\u2157",
  frac38: "\u215C",
  frac45: "\u2158",
  frac56: "\u215A",
  frac58: "\u215D",
  frac78: "\u215E",
  frasl: "\u2044",
  frown: "\u2322",
  fscr: "\u{1D4BB}",
  Fscr: "\u2131",
  gacute: "\u01F5",
  Gamma: "\u0393",
  gamma: "\u03B3",
  Gammad: "\u03DC",
  gammad: "\u03DD",
  gap: "\u2A86",
  Gbreve: "\u011E",
  gbreve: "\u011F",
  Gcedil: "\u0122",
  Gcirc: "\u011C",
  gcirc: "\u011D",
  Gcy: "\u0413",
  gcy: "\u0433",
  Gdot: "\u0120",
  gdot: "\u0121",
  ge: "\u2265",
  gE: "\u2267",
  gEl: "\u2A8C",
  gel: "\u22DB",
  geq: "\u2265",
  geqq: "\u2267",
  geqslant: "\u2A7E",
  gescc: "\u2AA9",
  ges: "\u2A7E",
  gesdot: "\u2A80",
  gesdoto: "\u2A82",
  gesdotol: "\u2A84",
  gesl: "\u22DB\uFE00",
  gesles: "\u2A94",
  Gfr: "\u{1D50A}",
  gfr: "\u{1D524}",
  gg: "\u226B",
  Gg: "\u22D9",
  ggg: "\u22D9",
  gimel: "\u2137",
  GJcy: "\u0403",
  gjcy: "\u0453",
  gla: "\u2AA5",
  gl: "\u2277",
  glE: "\u2A92",
  glj: "\u2AA4",
  gnap: "\u2A8A",
  gnapprox: "\u2A8A",
  gne: "\u2A88",
  gnE: "\u2269",
  gneq: "\u2A88",
  gneqq: "\u2269",
  gnsim: "\u22E7",
  Gopf: "\u{1D53E}",
  gopf: "\u{1D558}",
  grave: "`",
  GreaterEqual: "\u2265",
  GreaterEqualLess: "\u22DB",
  GreaterFullEqual: "\u2267",
  GreaterGreater: "\u2AA2",
  GreaterLess: "\u2277",
  GreaterSlantEqual: "\u2A7E",
  GreaterTilde: "\u2273",
  Gscr: "\u{1D4A2}",
  gscr: "\u210A",
  gsim: "\u2273",
  gsime: "\u2A8E",
  gsiml: "\u2A90",
  gtcc: "\u2AA7",
  gtcir: "\u2A7A",
  gt: ">",
  GT: ">",
  Gt: "\u226B",
  gtdot: "\u22D7",
  gtlPar: "\u2995",
  gtquest: "\u2A7C",
  gtrapprox: "\u2A86",
  gtrarr: "\u2978",
  gtrdot: "\u22D7",
  gtreqless: "\u22DB",
  gtreqqless: "\u2A8C",
  gtrless: "\u2277",
  gtrsim: "\u2273",
  gvertneqq: "\u2269\uFE00",
  gvnE: "\u2269\uFE00",
  Hacek: "\u02C7",
  hairsp: "\u200A",
  half: "\xBD",
  hamilt: "\u210B",
  HARDcy: "\u042A",
  hardcy: "\u044A",
  harrcir: "\u2948",
  harr: "\u2194",
  hArr: "\u21D4",
  harrw: "\u21AD",
  Hat: "^",
  hbar: "\u210F",
  Hcirc: "\u0124",
  hcirc: "\u0125",
  hearts: "\u2665",
  heartsuit: "\u2665",
  hellip: "\u2026",
  hercon: "\u22B9",
  hfr: "\u{1D525}",
  Hfr: "\u210C",
  HilbertSpace: "\u210B",
  hksearow: "\u2925",
  hkswarow: "\u2926",
  hoarr: "\u21FF",
  homtht: "\u223B",
  hookleftarrow: "\u21A9",
  hookrightarrow: "\u21AA",
  hopf: "\u{1D559}",
  Hopf: "\u210D",
  horbar: "\u2015",
  HorizontalLine: "\u2500",
  hscr: "\u{1D4BD}",
  Hscr: "\u210B",
  hslash: "\u210F",
  Hstrok: "\u0126",
  hstrok: "\u0127",
  HumpDownHump: "\u224E",
  HumpEqual: "\u224F",
  hybull: "\u2043",
  hyphen: "\u2010",
  Iacute: "\xCD",
  iacute: "\xED",
  ic: "\u2063",
  Icirc: "\xCE",
  icirc: "\xEE",
  Icy: "\u0418",
  icy: "\u0438",
  Idot: "\u0130",
  IEcy: "\u0415",
  iecy: "\u0435",
  iexcl: "\xA1",
  iff: "\u21D4",
  ifr: "\u{1D526}",
  Ifr: "\u2111",
  Igrave: "\xCC",
  igrave: "\xEC",
  ii: "\u2148",
  iiiint: "\u2A0C",
  iiint: "\u222D",
  iinfin: "\u29DC",
  iiota: "\u2129",
  IJlig: "\u0132",
  ijlig: "\u0133",
  Imacr: "\u012A",
  imacr: "\u012B",
  image: "\u2111",
  ImaginaryI: "\u2148",
  imagline: "\u2110",
  imagpart: "\u2111",
  imath: "\u0131",
  Im: "\u2111",
  imof: "\u22B7",
  imped: "\u01B5",
  Implies: "\u21D2",
  incare: "\u2105",
  in: "\u2208",
  infin: "\u221E",
  infintie: "\u29DD",
  inodot: "\u0131",
  intcal: "\u22BA",
  int: "\u222B",
  Int: "\u222C",
  integers: "\u2124",
  Integral: "\u222B",
  intercal: "\u22BA",
  Intersection: "\u22C2",
  intlarhk: "\u2A17",
  intprod: "\u2A3C",
  InvisibleComma: "\u2063",
  InvisibleTimes: "\u2062",
  IOcy: "\u0401",
  iocy: "\u0451",
  Iogon: "\u012E",
  iogon: "\u012F",
  Iopf: "\u{1D540}",
  iopf: "\u{1D55A}",
  Iota: "\u0399",
  iota: "\u03B9",
  iprod: "\u2A3C",
  iquest: "\xBF",
  iscr: "\u{1D4BE}",
  Iscr: "\u2110",
  isin: "\u2208",
  isindot: "\u22F5",
  isinE: "\u22F9",
  isins: "\u22F4",
  isinsv: "\u22F3",
  isinv: "\u2208",
  it: "\u2062",
  Itilde: "\u0128",
  itilde: "\u0129",
  Iukcy: "\u0406",
  iukcy: "\u0456",
  Iuml: "\xCF",
  iuml: "\xEF",
  Jcirc: "\u0134",
  jcirc: "\u0135",
  Jcy: "\u0419",
  jcy: "\u0439",
  Jfr: "\u{1D50D}",
  jfr: "\u{1D527}",
  jmath: "\u0237",
  Jopf: "\u{1D541}",
  jopf: "\u{1D55B}",
  Jscr: "\u{1D4A5}",
  jscr: "\u{1D4BF}",
  Jsercy: "\u0408",
  jsercy: "\u0458",
  Jukcy: "\u0404",
  jukcy: "\u0454",
  Kappa: "\u039A",
  kappa: "\u03BA",
  kappav: "\u03F0",
  Kcedil: "\u0136",
  kcedil: "\u0137",
  Kcy: "\u041A",
  kcy: "\u043A",
  Kfr: "\u{1D50E}",
  kfr: "\u{1D528}",
  kgreen: "\u0138",
  KHcy: "\u0425",
  khcy: "\u0445",
  KJcy: "\u040C",
  kjcy: "\u045C",
  Kopf: "\u{1D542}",
  kopf: "\u{1D55C}",
  Kscr: "\u{1D4A6}",
  kscr: "\u{1D4C0}",
  lAarr: "\u21DA",
  Lacute: "\u0139",
  lacute: "\u013A",
  laemptyv: "\u29B4",
  lagran: "\u2112",
  Lambda: "\u039B",
  lambda: "\u03BB",
  lang: "\u27E8",
  Lang: "\u27EA",
  langd: "\u2991",
  langle: "\u27E8",
  lap: "\u2A85",
  Laplacetrf: "\u2112",
  laquo: "\xAB",
  larrb: "\u21E4",
  larrbfs: "\u291F",
  larr: "\u2190",
  Larr: "\u219E",
  lArr: "\u21D0",
  larrfs: "\u291D",
  larrhk: "\u21A9",
  larrlp: "\u21AB",
  larrpl: "\u2939",
  larrsim: "\u2973",
  larrtl: "\u21A2",
  latail: "\u2919",
  lAtail: "\u291B",
  lat: "\u2AAB",
  late: "\u2AAD",
  lates: "\u2AAD\uFE00",
  lbarr: "\u290C",
  lBarr: "\u290E",
  lbbrk: "\u2772",
  lbrace: "{",
  lbrack: "[",
  lbrke: "\u298B",
  lbrksld: "\u298F",
  lbrkslu: "\u298D",
  Lcaron: "\u013D",
  lcaron: "\u013E",
  Lcedil: "\u013B",
  lcedil: "\u013C",
  lceil: "\u2308",
  lcub: "{",
  Lcy: "\u041B",
  lcy: "\u043B",
  ldca: "\u2936",
  ldquo: "\u201C",
  ldquor: "\u201E",
  ldrdhar: "\u2967",
  ldrushar: "\u294B",
  ldsh: "\u21B2",
  le: "\u2264",
  lE: "\u2266",
  LeftAngleBracket: "\u27E8",
  LeftArrowBar: "\u21E4",
  leftarrow: "\u2190",
  LeftArrow: "\u2190",
  Leftarrow: "\u21D0",
  LeftArrowRightArrow: "\u21C6",
  leftarrowtail: "\u21A2",
  LeftCeiling: "\u2308",
  LeftDoubleBracket: "\u27E6",
  LeftDownTeeVector: "\u2961",
  LeftDownVectorBar: "\u2959",
  LeftDownVector: "\u21C3",
  LeftFloor: "\u230A",
  leftharpoondown: "\u21BD",
  leftharpoonup: "\u21BC",
  leftleftarrows: "\u21C7",
  leftrightarrow: "\u2194",
  LeftRightArrow: "\u2194",
  Leftrightarrow: "\u21D4",
  leftrightarrows: "\u21C6",
  leftrightharpoons: "\u21CB",
  leftrightsquigarrow: "\u21AD",
  LeftRightVector: "\u294E",
  LeftTeeArrow: "\u21A4",
  LeftTee: "\u22A3",
  LeftTeeVector: "\u295A",
  leftthreetimes: "\u22CB",
  LeftTriangleBar: "\u29CF",
  LeftTriangle: "\u22B2",
  LeftTriangleEqual: "\u22B4",
  LeftUpDownVector: "\u2951",
  LeftUpTeeVector: "\u2960",
  LeftUpVectorBar: "\u2958",
  LeftUpVector: "\u21BF",
  LeftVectorBar: "\u2952",
  LeftVector: "\u21BC",
  lEg: "\u2A8B",
  leg: "\u22DA",
  leq: "\u2264",
  leqq: "\u2266",
  leqslant: "\u2A7D",
  lescc: "\u2AA8",
  les: "\u2A7D",
  lesdot: "\u2A7F",
  lesdoto: "\u2A81",
  lesdotor: "\u2A83",
  lesg: "\u22DA\uFE00",
  lesges: "\u2A93",
  lessapprox: "\u2A85",
  lessdot: "\u22D6",
  lesseqgtr: "\u22DA",
  lesseqqgtr: "\u2A8B",
  LessEqualGreater: "\u22DA",
  LessFullEqual: "\u2266",
  LessGreater: "\u2276",
  lessgtr: "\u2276",
  LessLess: "\u2AA1",
  lesssim: "\u2272",
  LessSlantEqual: "\u2A7D",
  LessTilde: "\u2272",
  lfisht: "\u297C",
  lfloor: "\u230A",
  Lfr: "\u{1D50F}",
  lfr: "\u{1D529}",
  lg: "\u2276",
  lgE: "\u2A91",
  lHar: "\u2962",
  lhard: "\u21BD",
  lharu: "\u21BC",
  lharul: "\u296A",
  lhblk: "\u2584",
  LJcy: "\u0409",
  ljcy: "\u0459",
  llarr: "\u21C7",
  ll: "\u226A",
  Ll: "\u22D8",
  llcorner: "\u231E",
  Lleftarrow: "\u21DA",
  llhard: "\u296B",
  lltri: "\u25FA",
  Lmidot: "\u013F",
  lmidot: "\u0140",
  lmoustache: "\u23B0",
  lmoust: "\u23B0",
  lnap: "\u2A89",
  lnapprox: "\u2A89",
  lne: "\u2A87",
  lnE: "\u2268",
  lneq: "\u2A87",
  lneqq: "\u2268",
  lnsim: "\u22E6",
  loang: "\u27EC",
  loarr: "\u21FD",
  lobrk: "\u27E6",
  longleftarrow: "\u27F5",
  LongLeftArrow: "\u27F5",
  Longleftarrow: "\u27F8",
  longleftrightarrow: "\u27F7",
  LongLeftRightArrow: "\u27F7",
  Longleftrightarrow: "\u27FA",
  longmapsto: "\u27FC",
  longrightarrow: "\u27F6",
  LongRightArrow: "\u27F6",
  Longrightarrow: "\u27F9",
  looparrowleft: "\u21AB",
  looparrowright: "\u21AC",
  lopar: "\u2985",
  Lopf: "\u{1D543}",
  lopf: "\u{1D55D}",
  loplus: "\u2A2D",
  lotimes: "\u2A34",
  lowast: "\u2217",
  lowbar: "_",
  LowerLeftArrow: "\u2199",
  LowerRightArrow: "\u2198",
  loz: "\u25CA",
  lozenge: "\u25CA",
  lozf: "\u29EB",
  lpar: "(",
  lparlt: "\u2993",
  lrarr: "\u21C6",
  lrcorner: "\u231F",
  lrhar: "\u21CB",
  lrhard: "\u296D",
  lrm: "\u200E",
  lrtri: "\u22BF",
  lsaquo: "\u2039",
  lscr: "\u{1D4C1}",
  Lscr: "\u2112",
  lsh: "\u21B0",
  Lsh: "\u21B0",
  lsim: "\u2272",
  lsime: "\u2A8D",
  lsimg: "\u2A8F",
  lsqb: "[",
  lsquo: "\u2018",
  lsquor: "\u201A",
  Lstrok: "\u0141",
  lstrok: "\u0142",
  ltcc: "\u2AA6",
  ltcir: "\u2A79",
  lt: "<",
  LT: "<",
  Lt: "\u226A",
  ltdot: "\u22D6",
  lthree: "\u22CB",
  ltimes: "\u22C9",
  ltlarr: "\u2976",
  ltquest: "\u2A7B",
  ltri: "\u25C3",
  ltrie: "\u22B4",
  ltrif: "\u25C2",
  ltrPar: "\u2996",
  lurdshar: "\u294A",
  luruhar: "\u2966",
  lvertneqq: "\u2268\uFE00",
  lvnE: "\u2268\uFE00",
  macr: "\xAF",
  male: "\u2642",
  malt: "\u2720",
  maltese: "\u2720",
  Map: "\u2905",
  map: "\u21A6",
  mapsto: "\u21A6",
  mapstodown: "\u21A7",
  mapstoleft: "\u21A4",
  mapstoup: "\u21A5",
  marker: "\u25AE",
  mcomma: "\u2A29",
  Mcy: "\u041C",
  mcy: "\u043C",
  mdash: "\u2014",
  mDDot: "\u223A",
  measuredangle: "\u2221",
  MediumSpace: "\u205F",
  Mellintrf: "\u2133",
  Mfr: "\u{1D510}",
  mfr: "\u{1D52A}",
  mho: "\u2127",
  micro: "\xB5",
  midast: "*",
  midcir: "\u2AF0",
  mid: "\u2223",
  middot: "\xB7",
  minusb: "\u229F",
  minus: "\u2212",
  minusd: "\u2238",
  minusdu: "\u2A2A",
  MinusPlus: "\u2213",
  mlcp: "\u2ADB",
  mldr: "\u2026",
  mnplus: "\u2213",
  models: "\u22A7",
  Mopf: "\u{1D544}",
  mopf: "\u{1D55E}",
  mp: "\u2213",
  mscr: "\u{1D4C2}",
  Mscr: "\u2133",
  mstpos: "\u223E",
  Mu: "\u039C",
  mu: "\u03BC",
  multimap: "\u22B8",
  mumap: "\u22B8",
  nabla: "\u2207",
  Nacute: "\u0143",
  nacute: "\u0144",
  nang: "\u2220\u20D2",
  nap: "\u2249",
  napE: "\u2A70\u0338",
  napid: "\u224B\u0338",
  napos: "\u0149",
  napprox: "\u2249",
  natural: "\u266E",
  naturals: "\u2115",
  natur: "\u266E",
  nbsp: "\xA0",
  nbump: "\u224E\u0338",
  nbumpe: "\u224F\u0338",
  ncap: "\u2A43",
  Ncaron: "\u0147",
  ncaron: "\u0148",
  Ncedil: "\u0145",
  ncedil: "\u0146",
  ncong: "\u2247",
  ncongdot: "\u2A6D\u0338",
  ncup: "\u2A42",
  Ncy: "\u041D",
  ncy: "\u043D",
  ndash: "\u2013",
  nearhk: "\u2924",
  nearr: "\u2197",
  neArr: "\u21D7",
  nearrow: "\u2197",
  ne: "\u2260",
  nedot: "\u2250\u0338",
  NegativeMediumSpace: "\u200B",
  NegativeThickSpace: "\u200B",
  NegativeThinSpace: "\u200B",
  NegativeVeryThinSpace: "\u200B",
  nequiv: "\u2262",
  nesear: "\u2928",
  nesim: "\u2242\u0338",
  NestedGreaterGreater: "\u226B",
  NestedLessLess: "\u226A",
  NewLine: "\n",
  nexist: "\u2204",
  nexists: "\u2204",
  Nfr: "\u{1D511}",
  nfr: "\u{1D52B}",
  ngE: "\u2267\u0338",
  nge: "\u2271",
  ngeq: "\u2271",
  ngeqq: "\u2267\u0338",
  ngeqslant: "\u2A7E\u0338",
  nges: "\u2A7E\u0338",
  nGg: "\u22D9\u0338",
  ngsim: "\u2275",
  nGt: "\u226B\u20D2",
  ngt: "\u226F",
  ngtr: "\u226F",
  nGtv: "\u226B\u0338",
  nharr: "\u21AE",
  nhArr: "\u21CE",
  nhpar: "\u2AF2",
  ni: "\u220B",
  nis: "\u22FC",
  nisd: "\u22FA",
  niv: "\u220B",
  NJcy: "\u040A",
  njcy: "\u045A",
  nlarr: "\u219A",
  nlArr: "\u21CD",
  nldr: "\u2025",
  nlE: "\u2266\u0338",
  nle: "\u2270",
  nleftarrow: "\u219A",
  nLeftarrow: "\u21CD",
  nleftrightarrow: "\u21AE",
  nLeftrightarrow: "\u21CE",
  nleq: "\u2270",
  nleqq: "\u2266\u0338",
  nleqslant: "\u2A7D\u0338",
  nles: "\u2A7D\u0338",
  nless: "\u226E",
  nLl: "\u22D8\u0338",
  nlsim: "\u2274",
  nLt: "\u226A\u20D2",
  nlt: "\u226E",
  nltri: "\u22EA",
  nltrie: "\u22EC",
  nLtv: "\u226A\u0338",
  nmid: "\u2224",
  NoBreak: "\u2060",
  NonBreakingSpace: "\xA0",
  nopf: "\u{1D55F}",
  Nopf: "\u2115",
  Not: "\u2AEC",
  not: "\xAC",
  NotCongruent: "\u2262",
  NotCupCap: "\u226D",
  NotDoubleVerticalBar: "\u2226",
  NotElement: "\u2209",
  NotEqual: "\u2260",
  NotEqualTilde: "\u2242\u0338",
  NotExists: "\u2204",
  NotGreater: "\u226F",
  NotGreaterEqual: "\u2271",
  NotGreaterFullEqual: "\u2267\u0338",
  NotGreaterGreater: "\u226B\u0338",
  NotGreaterLess: "\u2279",
  NotGreaterSlantEqual: "\u2A7E\u0338",
  NotGreaterTilde: "\u2275",
  NotHumpDownHump: "\u224E\u0338",
  NotHumpEqual: "\u224F\u0338",
  notin: "\u2209",
  notindot: "\u22F5\u0338",
  notinE: "\u22F9\u0338",
  notinva: "\u2209",
  notinvb: "\u22F7",
  notinvc: "\u22F6",
  NotLeftTriangleBar: "\u29CF\u0338",
  NotLeftTriangle: "\u22EA",
  NotLeftTriangleEqual: "\u22EC",
  NotLess: "\u226E",
  NotLessEqual: "\u2270",
  NotLessGreater: "\u2278",
  NotLessLess: "\u226A\u0338",
  NotLessSlantEqual: "\u2A7D\u0338",
  NotLessTilde: "\u2274",
  NotNestedGreaterGreater: "\u2AA2\u0338",
  NotNestedLessLess: "\u2AA1\u0338",
  notni: "\u220C",
  notniva: "\u220C",
  notnivb: "\u22FE",
  notnivc: "\u22FD",
  NotPrecedes: "\u2280",
  NotPrecedesEqual: "\u2AAF\u0338",
  NotPrecedesSlantEqual: "\u22E0",
  NotReverseElement: "\u220C",
  NotRightTriangleBar: "\u29D0\u0338",
  NotRightTriangle: "\u22EB",
  NotRightTriangleEqual: "\u22ED",
  NotSquareSubset: "\u228F\u0338",
  NotSquareSubsetEqual: "\u22E2",
  NotSquareSuperset: "\u2290\u0338",
  NotSquareSupersetEqual: "\u22E3",
  NotSubset: "\u2282\u20D2",
  NotSubsetEqual: "\u2288",
  NotSucceeds: "\u2281",
  NotSucceedsEqual: "\u2AB0\u0338",
  NotSucceedsSlantEqual: "\u22E1",
  NotSucceedsTilde: "\u227F\u0338",
  NotSuperset: "\u2283\u20D2",
  NotSupersetEqual: "\u2289",
  NotTilde: "\u2241",
  NotTildeEqual: "\u2244",
  NotTildeFullEqual: "\u2247",
  NotTildeTilde: "\u2249",
  NotVerticalBar: "\u2224",
  nparallel: "\u2226",
  npar: "\u2226",
  nparsl: "\u2AFD\u20E5",
  npart: "\u2202\u0338",
  npolint: "\u2A14",
  npr: "\u2280",
  nprcue: "\u22E0",
  nprec: "\u2280",
  npreceq: "\u2AAF\u0338",
  npre: "\u2AAF\u0338",
  nrarrc: "\u2933\u0338",
  nrarr: "\u219B",
  nrArr: "\u21CF",
  nrarrw: "\u219D\u0338",
  nrightarrow: "\u219B",
  nRightarrow: "\u21CF",
  nrtri: "\u22EB",
  nrtrie: "\u22ED",
  nsc: "\u2281",
  nsccue: "\u22E1",
  nsce: "\u2AB0\u0338",
  Nscr: "\u{1D4A9}",
  nscr: "\u{1D4C3}",
  nshortmid: "\u2224",
  nshortparallel: "\u2226",
  nsim: "\u2241",
  nsime: "\u2244",
  nsimeq: "\u2244",
  nsmid: "\u2224",
  nspar: "\u2226",
  nsqsube: "\u22E2",
  nsqsupe: "\u22E3",
  nsub: "\u2284",
  nsubE: "\u2AC5\u0338",
  nsube: "\u2288",
  nsubset: "\u2282\u20D2",
  nsubseteq: "\u2288",
  nsubseteqq: "\u2AC5\u0338",
  nsucc: "\u2281",
  nsucceq: "\u2AB0\u0338",
  nsup: "\u2285",
  nsupE: "\u2AC6\u0338",
  nsupe: "\u2289",
  nsupset: "\u2283\u20D2",
  nsupseteq: "\u2289",
  nsupseteqq: "\u2AC6\u0338",
  ntgl: "\u2279",
  Ntilde: "\xD1",
  ntilde: "\xF1",
  ntlg: "\u2278",
  ntriangleleft: "\u22EA",
  ntrianglelefteq: "\u22EC",
  ntriangleright: "\u22EB",
  ntrianglerighteq: "\u22ED",
  Nu: "\u039D",
  nu: "\u03BD",
  num: "#",
  numero: "\u2116",
  numsp: "\u2007",
  nvap: "\u224D\u20D2",
  nvdash: "\u22AC",
  nvDash: "\u22AD",
  nVdash: "\u22AE",
  nVDash: "\u22AF",
  nvge: "\u2265\u20D2",
  nvgt: ">\u20D2",
  nvHarr: "\u2904",
  nvinfin: "\u29DE",
  nvlArr: "\u2902",
  nvle: "\u2264\u20D2",
  nvlt: "<\u20D2",
  nvltrie: "\u22B4\u20D2",
  nvrArr: "\u2903",
  nvrtrie: "\u22B5\u20D2",
  nvsim: "\u223C\u20D2",
  nwarhk: "\u2923",
  nwarr: "\u2196",
  nwArr: "\u21D6",
  nwarrow: "\u2196",
  nwnear: "\u2927",
  Oacute: "\xD3",
  oacute: "\xF3",
  oast: "\u229B",
  Ocirc: "\xD4",
  ocirc: "\xF4",
  ocir: "\u229A",
  Ocy: "\u041E",
  ocy: "\u043E",
  odash: "\u229D",
  Odblac: "\u0150",
  odblac: "\u0151",
  odiv: "\u2A38",
  odot: "\u2299",
  odsold: "\u29BC",
  OElig: "\u0152",
  oelig: "\u0153",
  ofcir: "\u29BF",
  Ofr: "\u{1D512}",
  ofr: "\u{1D52C}",
  ogon: "\u02DB",
  Ograve: "\xD2",
  ograve: "\xF2",
  ogt: "\u29C1",
  ohbar: "\u29B5",
  ohm: "\u03A9",
  oint: "\u222E",
  olarr: "\u21BA",
  olcir: "\u29BE",
  olcross: "\u29BB",
  oline: "\u203E",
  olt: "\u29C0",
  Omacr: "\u014C",
  omacr: "\u014D",
  Omega: "\u03A9",
  omega: "\u03C9",
  Omicron: "\u039F",
  omicron: "\u03BF",
  omid: "\u29B6",
  ominus: "\u2296",
  Oopf: "\u{1D546}",
  oopf: "\u{1D560}",
  opar: "\u29B7",
  OpenCurlyDoubleQuote: "\u201C",
  OpenCurlyQuote: "\u2018",
  operp: "\u29B9",
  oplus: "\u2295",
  orarr: "\u21BB",
  Or: "\u2A54",
  or: "\u2228",
  ord: "\u2A5D",
  order: "\u2134",
  orderof: "\u2134",
  ordf: "\xAA",
  ordm: "\xBA",
  origof: "\u22B6",
  oror: "\u2A56",
  orslope: "\u2A57",
  orv: "\u2A5B",
  oS: "\u24C8",
  Oscr: "\u{1D4AA}",
  oscr: "\u2134",
  Oslash: "\xD8",
  oslash: "\xF8",
  osol: "\u2298",
  Otilde: "\xD5",
  otilde: "\xF5",
  otimesas: "\u2A36",
  Otimes: "\u2A37",
  otimes: "\u2297",
  Ouml: "\xD6",
  ouml: "\xF6",
  ovbar: "\u233D",
  OverBar: "\u203E",
  OverBrace: "\u23DE",
  OverBracket: "\u23B4",
  OverParenthesis: "\u23DC",
  para: "\xB6",
  parallel: "\u2225",
  par: "\u2225",
  parsim: "\u2AF3",
  parsl: "\u2AFD",
  part: "\u2202",
  PartialD: "\u2202",
  Pcy: "\u041F",
  pcy: "\u043F",
  percnt: "%",
  period: ".",
  permil: "\u2030",
  perp: "\u22A5",
  pertenk: "\u2031",
  Pfr: "\u{1D513}",
  pfr: "\u{1D52D}",
  Phi: "\u03A6",
  phi: "\u03C6",
  phiv: "\u03D5",
  phmmat: "\u2133",
  phone: "\u260E",
  Pi: "\u03A0",
  pi: "\u03C0",
  pitchfork: "\u22D4",
  piv: "\u03D6",
  planck: "\u210F",
  planckh: "\u210E",
  plankv: "\u210F",
  plusacir: "\u2A23",
  plusb: "\u229E",
  pluscir: "\u2A22",
  plus: "+",
  plusdo: "\u2214",
  plusdu: "\u2A25",
  pluse: "\u2A72",
  PlusMinus: "\xB1",
  plusmn: "\xB1",
  plussim: "\u2A26",
  plustwo: "\u2A27",
  pm: "\xB1",
  Poincareplane: "\u210C",
  pointint: "\u2A15",
  popf: "\u{1D561}",
  Popf: "\u2119",
  pound: "\xA3",
  prap: "\u2AB7",
  Pr: "\u2ABB",
  pr: "\u227A",
  prcue: "\u227C",
  precapprox: "\u2AB7",
  prec: "\u227A",
  preccurlyeq: "\u227C",
  Precedes: "\u227A",
  PrecedesEqual: "\u2AAF",
  PrecedesSlantEqual: "\u227C",
  PrecedesTilde: "\u227E",
  preceq: "\u2AAF",
  precnapprox: "\u2AB9",
  precneqq: "\u2AB5",
  precnsim: "\u22E8",
  pre: "\u2AAF",
  prE: "\u2AB3",
  precsim: "\u227E",
  prime: "\u2032",
  Prime: "\u2033",
  primes: "\u2119",
  prnap: "\u2AB9",
  prnE: "\u2AB5",
  prnsim: "\u22E8",
  prod: "\u220F",
  Product: "\u220F",
  profalar: "\u232E",
  profline: "\u2312",
  profsurf: "\u2313",
  prop: "\u221D",
  Proportional: "\u221D",
  Proportion: "\u2237",
  propto: "\u221D",
  prsim: "\u227E",
  prurel: "\u22B0",
  Pscr: "\u{1D4AB}",
  pscr: "\u{1D4C5}",
  Psi: "\u03A8",
  psi: "\u03C8",
  puncsp: "\u2008",
  Qfr: "\u{1D514}",
  qfr: "\u{1D52E}",
  qint: "\u2A0C",
  qopf: "\u{1D562}",
  Qopf: "\u211A",
  qprime: "\u2057",
  Qscr: "\u{1D4AC}",
  qscr: "\u{1D4C6}",
  quaternions: "\u210D",
  quatint: "\u2A16",
  quest: "?",
  questeq: "\u225F",
  quot: '"',
  QUOT: '"',
  rAarr: "\u21DB",
  race: "\u223D\u0331",
  Racute: "\u0154",
  racute: "\u0155",
  radic: "\u221A",
  raemptyv: "\u29B3",
  rang: "\u27E9",
  Rang: "\u27EB",
  rangd: "\u2992",
  range: "\u29A5",
  rangle: "\u27E9",
  raquo: "\xBB",
  rarrap: "\u2975",
  rarrb: "\u21E5",
  rarrbfs: "\u2920",
  rarrc: "\u2933",
  rarr: "\u2192",
  Rarr: "\u21A0",
  rArr: "\u21D2",
  rarrfs: "\u291E",
  rarrhk: "\u21AA",
  rarrlp: "\u21AC",
  rarrpl: "\u2945",
  rarrsim: "\u2974",
  Rarrtl: "\u2916",
  rarrtl: "\u21A3",
  rarrw: "\u219D",
  ratail: "\u291A",
  rAtail: "\u291C",
  ratio: "\u2236",
  rationals: "\u211A",
  rbarr: "\u290D",
  rBarr: "\u290F",
  RBarr: "\u2910",
  rbbrk: "\u2773",
  rbrace: "}",
  rbrack: "]",
  rbrke: "\u298C",
  rbrksld: "\u298E",
  rbrkslu: "\u2990",
  Rcaron: "\u0158",
  rcaron: "\u0159",
  Rcedil: "\u0156",
  rcedil: "\u0157",
  rceil: "\u2309",
  rcub: "}",
  Rcy: "\u0420",
  rcy: "\u0440",
  rdca: "\u2937",
  rdldhar: "\u2969",
  rdquo: "\u201D",
  rdquor: "\u201D",
  rdsh: "\u21B3",
  real: "\u211C",
  realine: "\u211B",
  realpart: "\u211C",
  reals: "\u211D",
  Re: "\u211C",
  rect: "\u25AD",
  reg: "\xAE",
  REG: "\xAE",
  ReverseElement: "\u220B",
  ReverseEquilibrium: "\u21CB",
  ReverseUpEquilibrium: "\u296F",
  rfisht: "\u297D",
  rfloor: "\u230B",
  rfr: "\u{1D52F}",
  Rfr: "\u211C",
  rHar: "\u2964",
  rhard: "\u21C1",
  rharu: "\u21C0",
  rharul: "\u296C",
  Rho: "\u03A1",
  rho: "\u03C1",
  rhov: "\u03F1",
  RightAngleBracket: "\u27E9",
  RightArrowBar: "\u21E5",
  rightarrow: "\u2192",
  RightArrow: "\u2192",
  Rightarrow: "\u21D2",
  RightArrowLeftArrow: "\u21C4",
  rightarrowtail: "\u21A3",
  RightCeiling: "\u2309",
  RightDoubleBracket: "\u27E7",
  RightDownTeeVector: "\u295D",
  RightDownVectorBar: "\u2955",
  RightDownVector: "\u21C2",
  RightFloor: "\u230B",
  rightharpoondown: "\u21C1",
  rightharpoonup: "\u21C0",
  rightleftarrows: "\u21C4",
  rightleftharpoons: "\u21CC",
  rightrightarrows: "\u21C9",
  rightsquigarrow: "\u219D",
  RightTeeArrow: "\u21A6",
  RightTee: "\u22A2",
  RightTeeVector: "\u295B",
  rightthreetimes: "\u22CC",
  RightTriangleBar: "\u29D0",
  RightTriangle: "\u22B3",
  RightTriangleEqual: "\u22B5",
  RightUpDownVector: "\u294F",
  RightUpTeeVector: "\u295C",
  RightUpVectorBar: "\u2954",
  RightUpVector: "\u21BE",
  RightVectorBar: "\u2953",
  RightVector: "\u21C0",
  ring: "\u02DA",
  risingdotseq: "\u2253",
  rlarr: "\u21C4",
  rlhar: "\u21CC",
  rlm: "\u200F",
  rmoustache: "\u23B1",
  rmoust: "\u23B1",
  rnmid: "\u2AEE",
  roang: "\u27ED",
  roarr: "\u21FE",
  robrk: "\u27E7",
  ropar: "\u2986",
  ropf: "\u{1D563}",
  Ropf: "\u211D",
  roplus: "\u2A2E",
  rotimes: "\u2A35",
  RoundImplies: "\u2970",
  rpar: ")",
  rpargt: "\u2994",
  rppolint: "\u2A12",
  rrarr: "\u21C9",
  Rrightarrow: "\u21DB",
  rsaquo: "\u203A",
  rscr: "\u{1D4C7}",
  Rscr: "\u211B",
  rsh: "\u21B1",
  Rsh: "\u21B1",
  rsqb: "]",
  rsquo: "\u2019",
  rsquor: "\u2019",
  rthree: "\u22CC",
  rtimes: "\u22CA",
  rtri: "\u25B9",
  rtrie: "\u22B5",
  rtrif: "\u25B8",
  rtriltri: "\u29CE",
  RuleDelayed: "\u29F4",
  ruluhar: "\u2968",
  rx: "\u211E",
  Sacute: "\u015A",
  sacute: "\u015B",
  sbquo: "\u201A",
  scap: "\u2AB8",
  Scaron: "\u0160",
  scaron: "\u0161",
  Sc: "\u2ABC",
  sc: "\u227B",
  sccue: "\u227D",
  sce: "\u2AB0",
  scE: "\u2AB4",
  Scedil: "\u015E",
  scedil: "\u015F",
  Scirc: "\u015C",
  scirc: "\u015D",
  scnap: "\u2ABA",
  scnE: "\u2AB6",
  scnsim: "\u22E9",
  scpolint: "\u2A13",
  scsim: "\u227F",
  Scy: "\u0421",
  scy: "\u0441",
  sdotb: "\u22A1",
  sdot: "\u22C5",
  sdote: "\u2A66",
  searhk: "\u2925",
  searr: "\u2198",
  seArr: "\u21D8",
  searrow: "\u2198",
  sect: "\xA7",
  semi: ";",
  seswar: "\u2929",
  setminus: "\u2216",
  setmn: "\u2216",
  sext: "\u2736",
  Sfr: "\u{1D516}",
  sfr: "\u{1D530}",
  sfrown: "\u2322",
  sharp: "\u266F",
  SHCHcy: "\u0429",
  shchcy: "\u0449",
  SHcy: "\u0428",
  shcy: "\u0448",
  ShortDownArrow: "\u2193",
  ShortLeftArrow: "\u2190",
  shortmid: "\u2223",
  shortparallel: "\u2225",
  ShortRightArrow: "\u2192",
  ShortUpArrow: "\u2191",
  shy: "\xAD",
  Sigma: "\u03A3",
  sigma: "\u03C3",
  sigmaf: "\u03C2",
  sigmav: "\u03C2",
  sim: "\u223C",
  simdot: "\u2A6A",
  sime: "\u2243",
  simeq: "\u2243",
  simg: "\u2A9E",
  simgE: "\u2AA0",
  siml: "\u2A9D",
  simlE: "\u2A9F",
  simne: "\u2246",
  simplus: "\u2A24",
  simrarr: "\u2972",
  slarr: "\u2190",
  SmallCircle: "\u2218",
  smallsetminus: "\u2216",
  smashp: "\u2A33",
  smeparsl: "\u29E4",
  smid: "\u2223",
  smile: "\u2323",
  smt: "\u2AAA",
  smte: "\u2AAC",
  smtes: "\u2AAC\uFE00",
  SOFTcy: "\u042C",
  softcy: "\u044C",
  solbar: "\u233F",
  solb: "\u29C4",
  sol: "/",
  Sopf: "\u{1D54A}",
  sopf: "\u{1D564}",
  spades: "\u2660",
  spadesuit: "\u2660",
  spar: "\u2225",
  sqcap: "\u2293",
  sqcaps: "\u2293\uFE00",
  sqcup: "\u2294",
  sqcups: "\u2294\uFE00",
  Sqrt: "\u221A",
  sqsub: "\u228F",
  sqsube: "\u2291",
  sqsubset: "\u228F",
  sqsubseteq: "\u2291",
  sqsup: "\u2290",
  sqsupe: "\u2292",
  sqsupset: "\u2290",
  sqsupseteq: "\u2292",
  square: "\u25A1",
  Square: "\u25A1",
  SquareIntersection: "\u2293",
  SquareSubset: "\u228F",
  SquareSubsetEqual: "\u2291",
  SquareSuperset: "\u2290",
  SquareSupersetEqual: "\u2292",
  SquareUnion: "\u2294",
  squarf: "\u25AA",
  squ: "\u25A1",
  squf: "\u25AA",
  srarr: "\u2192",
  Sscr: "\u{1D4AE}",
  sscr: "\u{1D4C8}",
  ssetmn: "\u2216",
  ssmile: "\u2323",
  sstarf: "\u22C6",
  Star: "\u22C6",
  star: "\u2606",
  starf: "\u2605",
  straightepsilon: "\u03F5",
  straightphi: "\u03D5",
  strns: "\xAF",
  sub: "\u2282",
  Sub: "\u22D0",
  subdot: "\u2ABD",
  subE: "\u2AC5",
  sube: "\u2286",
  subedot: "\u2AC3",
  submult: "\u2AC1",
  subnE: "\u2ACB",
  subne: "\u228A",
  subplus: "\u2ABF",
  subrarr: "\u2979",
  subset: "\u2282",
  Subset: "\u22D0",
  subseteq: "\u2286",
  subseteqq: "\u2AC5",
  SubsetEqual: "\u2286",
  subsetneq: "\u228A",
  subsetneqq: "\u2ACB",
  subsim: "\u2AC7",
  subsub: "\u2AD5",
  subsup: "\u2AD3",
  succapprox: "\u2AB8",
  succ: "\u227B",
  succcurlyeq: "\u227D",
  Succeeds: "\u227B",
  SucceedsEqual: "\u2AB0",
  SucceedsSlantEqual: "\u227D",
  SucceedsTilde: "\u227F",
  succeq: "\u2AB0",
  succnapprox: "\u2ABA",
  succneqq: "\u2AB6",
  succnsim: "\u22E9",
  succsim: "\u227F",
  SuchThat: "\u220B",
  sum: "\u2211",
  Sum: "\u2211",
  sung: "\u266A",
  sup1: "\xB9",
  sup2: "\xB2",
  sup3: "\xB3",
  sup: "\u2283",
  Sup: "\u22D1",
  supdot: "\u2ABE",
  supdsub: "\u2AD8",
  supE: "\u2AC6",
  supe: "\u2287",
  supedot: "\u2AC4",
  Superset: "\u2283",
  SupersetEqual: "\u2287",
  suphsol: "\u27C9",
  suphsub: "\u2AD7",
  suplarr: "\u297B",
  supmult: "\u2AC2",
  supnE: "\u2ACC",
  supne: "\u228B",
  supplus: "\u2AC0",
  supset: "\u2283",
  Supset: "\u22D1",
  supseteq: "\u2287",
  supseteqq: "\u2AC6",
  supsetneq: "\u228B",
  supsetneqq: "\u2ACC",
  supsim: "\u2AC8",
  supsub: "\u2AD4",
  supsup: "\u2AD6",
  swarhk: "\u2926",
  swarr: "\u2199",
  swArr: "\u21D9",
  swarrow: "\u2199",
  swnwar: "\u292A",
  szlig: "\xDF",
  Tab: "	",
  target: "\u2316",
  Tau: "\u03A4",
  tau: "\u03C4",
  tbrk: "\u23B4",
  Tcaron: "\u0164",
  tcaron: "\u0165",
  Tcedil: "\u0162",
  tcedil: "\u0163",
  Tcy: "\u0422",
  tcy: "\u0442",
  tdot: "\u20DB",
  telrec: "\u2315",
  Tfr: "\u{1D517}",
  tfr: "\u{1D531}",
  there4: "\u2234",
  therefore: "\u2234",
  Therefore: "\u2234",
  Theta: "\u0398",
  theta: "\u03B8",
  thetasym: "\u03D1",
  thetav: "\u03D1",
  thickapprox: "\u2248",
  thicksim: "\u223C",
  ThickSpace: "\u205F\u200A",
  ThinSpace: "\u2009",
  thinsp: "\u2009",
  thkap: "\u2248",
  thksim: "\u223C",
  THORN: "\xDE",
  thorn: "\xFE",
  tilde: "\u02DC",
  Tilde: "\u223C",
  TildeEqual: "\u2243",
  TildeFullEqual: "\u2245",
  TildeTilde: "\u2248",
  timesbar: "\u2A31",
  timesb: "\u22A0",
  times: "\xD7",
  timesd: "\u2A30",
  tint: "\u222D",
  toea: "\u2928",
  topbot: "\u2336",
  topcir: "\u2AF1",
  top: "\u22A4",
  Topf: "\u{1D54B}",
  topf: "\u{1D565}",
  topfork: "\u2ADA",
  tosa: "\u2929",
  tprime: "\u2034",
  trade: "\u2122",
  TRADE: "\u2122",
  triangle: "\u25B5",
  triangledown: "\u25BF",
  triangleleft: "\u25C3",
  trianglelefteq: "\u22B4",
  triangleq: "\u225C",
  triangleright: "\u25B9",
  trianglerighteq: "\u22B5",
  tridot: "\u25EC",
  trie: "\u225C",
  triminus: "\u2A3A",
  TripleDot: "\u20DB",
  triplus: "\u2A39",
  trisb: "\u29CD",
  tritime: "\u2A3B",
  trpezium: "\u23E2",
  Tscr: "\u{1D4AF}",
  tscr: "\u{1D4C9}",
  TScy: "\u0426",
  tscy: "\u0446",
  TSHcy: "\u040B",
  tshcy: "\u045B",
  Tstrok: "\u0166",
  tstrok: "\u0167",
  twixt: "\u226C",
  twoheadleftarrow: "\u219E",
  twoheadrightarrow: "\u21A0",
  Uacute: "\xDA",
  uacute: "\xFA",
  uarr: "\u2191",
  Uarr: "\u219F",
  uArr: "\u21D1",
  Uarrocir: "\u2949",
  Ubrcy: "\u040E",
  ubrcy: "\u045E",
  Ubreve: "\u016C",
  ubreve: "\u016D",
  Ucirc: "\xDB",
  ucirc: "\xFB",
  Ucy: "\u0423",
  ucy: "\u0443",
  udarr: "\u21C5",
  Udblac: "\u0170",
  udblac: "\u0171",
  udhar: "\u296E",
  ufisht: "\u297E",
  Ufr: "\u{1D518}",
  ufr: "\u{1D532}",
  Ugrave: "\xD9",
  ugrave: "\xF9",
  uHar: "\u2963",
  uharl: "\u21BF",
  uharr: "\u21BE",
  uhblk: "\u2580",
  ulcorn: "\u231C",
  ulcorner: "\u231C",
  ulcrop: "\u230F",
  ultri: "\u25F8",
  Umacr: "\u016A",
  umacr: "\u016B",
  uml: "\xA8",
  UnderBar: "_",
  UnderBrace: "\u23DF",
  UnderBracket: "\u23B5",
  UnderParenthesis: "\u23DD",
  Union: "\u22C3",
  UnionPlus: "\u228E",
  Uogon: "\u0172",
  uogon: "\u0173",
  Uopf: "\u{1D54C}",
  uopf: "\u{1D566}",
  UpArrowBar: "\u2912",
  uparrow: "\u2191",
  UpArrow: "\u2191",
  Uparrow: "\u21D1",
  UpArrowDownArrow: "\u21C5",
  updownarrow: "\u2195",
  UpDownArrow: "\u2195",
  Updownarrow: "\u21D5",
  UpEquilibrium: "\u296E",
  upharpoonleft: "\u21BF",
  upharpoonright: "\u21BE",
  uplus: "\u228E",
  UpperLeftArrow: "\u2196",
  UpperRightArrow: "\u2197",
  upsi: "\u03C5",
  Upsi: "\u03D2",
  upsih: "\u03D2",
  Upsilon: "\u03A5",
  upsilon: "\u03C5",
  UpTeeArrow: "\u21A5",
  UpTee: "\u22A5",
  upuparrows: "\u21C8",
  urcorn: "\u231D",
  urcorner: "\u231D",
  urcrop: "\u230E",
  Uring: "\u016E",
  uring: "\u016F",
  urtri: "\u25F9",
  Uscr: "\u{1D4B0}",
  uscr: "\u{1D4CA}",
  utdot: "\u22F0",
  Utilde: "\u0168",
  utilde: "\u0169",
  utri: "\u25B5",
  utrif: "\u25B4",
  uuarr: "\u21C8",
  Uuml: "\xDC",
  uuml: "\xFC",
  uwangle: "\u29A7",
  vangrt: "\u299C",
  varepsilon: "\u03F5",
  varkappa: "\u03F0",
  varnothing: "\u2205",
  varphi: "\u03D5",
  varpi: "\u03D6",
  varpropto: "\u221D",
  varr: "\u2195",
  vArr: "\u21D5",
  varrho: "\u03F1",
  varsigma: "\u03C2",
  varsubsetneq: "\u228A\uFE00",
  varsubsetneqq: "\u2ACB\uFE00",
  varsupsetneq: "\u228B\uFE00",
  varsupsetneqq: "\u2ACC\uFE00",
  vartheta: "\u03D1",
  vartriangleleft: "\u22B2",
  vartriangleright: "\u22B3",
  vBar: "\u2AE8",
  Vbar: "\u2AEB",
  vBarv: "\u2AE9",
  Vcy: "\u0412",
  vcy: "\u0432",
  vdash: "\u22A2",
  vDash: "\u22A8",
  Vdash: "\u22A9",
  VDash: "\u22AB",
  Vdashl: "\u2AE6",
  veebar: "\u22BB",
  vee: "\u2228",
  Vee: "\u22C1",
  veeeq: "\u225A",
  vellip: "\u22EE",
  verbar: "|",
  Verbar: "\u2016",
  vert: "|",
  Vert: "\u2016",
  VerticalBar: "\u2223",
  VerticalLine: "|",
  VerticalSeparator: "\u2758",
  VerticalTilde: "\u2240",
  VeryThinSpace: "\u200A",
  Vfr: "\u{1D519}",
  vfr: "\u{1D533}",
  vltri: "\u22B2",
  vnsub: "\u2282\u20D2",
  vnsup: "\u2283\u20D2",
  Vopf: "\u{1D54D}",
  vopf: "\u{1D567}",
  vprop: "\u221D",
  vrtri: "\u22B3",
  Vscr: "\u{1D4B1}",
  vscr: "\u{1D4CB}",
  vsubnE: "\u2ACB\uFE00",
  vsubne: "\u228A\uFE00",
  vsupnE: "\u2ACC\uFE00",
  vsupne: "\u228B\uFE00",
  Vvdash: "\u22AA",
  vzigzag: "\u299A",
  Wcirc: "\u0174",
  wcirc: "\u0175",
  wedbar: "\u2A5F",
  wedge: "\u2227",
  Wedge: "\u22C0",
  wedgeq: "\u2259",
  weierp: "\u2118",
  Wfr: "\u{1D51A}",
  wfr: "\u{1D534}",
  Wopf: "\u{1D54E}",
  wopf: "\u{1D568}",
  wp: "\u2118",
  wr: "\u2240",
  wreath: "\u2240",
  Wscr: "\u{1D4B2}",
  wscr: "\u{1D4CC}",
  xcap: "\u22C2",
  xcirc: "\u25EF",
  xcup: "\u22C3",
  xdtri: "\u25BD",
  Xfr: "\u{1D51B}",
  xfr: "\u{1D535}",
  xharr: "\u27F7",
  xhArr: "\u27FA",
  Xi: "\u039E",
  xi: "\u03BE",
  xlarr: "\u27F5",
  xlArr: "\u27F8",
  xmap: "\u27FC",
  xnis: "\u22FB",
  xodot: "\u2A00",
  Xopf: "\u{1D54F}",
  xopf: "\u{1D569}",
  xoplus: "\u2A01",
  xotime: "\u2A02",
  xrarr: "\u27F6",
  xrArr: "\u27F9",
  Xscr: "\u{1D4B3}",
  xscr: "\u{1D4CD}",
  xsqcup: "\u2A06",
  xuplus: "\u2A04",
  xutri: "\u25B3",
  xvee: "\u22C1",
  xwedge: "\u22C0",
  Yacute: "\xDD",
  yacute: "\xFD",
  YAcy: "\u042F",
  yacy: "\u044F",
  Ycirc: "\u0176",
  ycirc: "\u0177",
  Ycy: "\u042B",
  ycy: "\u044B",
  yen: "\xA5",
  Yfr: "\u{1D51C}",
  yfr: "\u{1D536}",
  YIcy: "\u0407",
  yicy: "\u0457",
  Yopf: "\u{1D550}",
  yopf: "\u{1D56A}",
  Yscr: "\u{1D4B4}",
  yscr: "\u{1D4CE}",
  YUcy: "\u042E",
  yucy: "\u044E",
  yuml: "\xFF",
  Yuml: "\u0178",
  Zacute: "\u0179",
  zacute: "\u017A",
  Zcaron: "\u017D",
  zcaron: "\u017E",
  Zcy: "\u0417",
  zcy: "\u0437",
  Zdot: "\u017B",
  zdot: "\u017C",
  zeetrf: "\u2128",
  ZeroWidthSpace: "\u200B",
  Zeta: "\u0396",
  zeta: "\u03B6",
  zfr: "\u{1D537}",
  Zfr: "\u2128",
  ZHcy: "\u0416",
  zhcy: "\u0436",
  zigrarr: "\u21DD",
  zopf: "\u{1D56B}",
  Zopf: "\u2124",
  Zscr: "\u{1D4B5}",
  zscr: "\u{1D4CF}",
  zwj: "\u200D",
  zwnj: "\u200C"
};
entities$1.default = entities;
var entities_1 = entities$1;
var re = /&(?:([a-zA-Z0-9]+)|#([0-9]{1,6})|#[xX]([a-fA-F0-9]{1,6}));/g;
function decode(str) {
  return str.replace(re, function(match, $1, $2, $3) {
    if ($1)
      return entities_1.default[$1] || match;
    if ($2)
      return String.fromCodePoint(parseInt($2));
    return String.fromCodePoint(parseInt($3, 16));
  });
}
dist.exports = decode;
dist.exports.default = decode;
Object.defineProperty(dist.exports, "__esModule", { value: true });
var decode$1 = /* @__PURE__ */ getDefaultExportFromCjs(dist.exports);
var esmEntry$1 = { exports: {} };
var defaults$5 = { exports: {} };
function getDefaults$1() {
  return {
    baseUrl: null,
    breaks: false,
    extensions: null,
    gfm: true,
    headerIds: true,
    headerPrefix: "",
    highlight: null,
    langPrefix: "language-",
    mangle: true,
    pedantic: false,
    renderer: null,
    sanitize: false,
    sanitizer: null,
    silent: false,
    smartLists: false,
    smartypants: false,
    tokenizer: null,
    walkTokens: null,
    xhtml: false
  };
}
function changeDefaults$1(newDefaults) {
  defaults$5.exports.defaults = newDefaults;
}
defaults$5.exports = {
  defaults: getDefaults$1(),
  getDefaults: getDefaults$1,
  changeDefaults: changeDefaults$1
};
const escapeTest = /[&<>"']/;
const escapeReplace = /[&<>"']/g;
const escapeTestNoEncode = /[<>"']|&(?!#?\w+;)/;
const escapeReplaceNoEncode = /[<>"']|&(?!#?\w+;)/g;
const escapeReplacements = {
  "&": "&amp;",
  "<": "&lt;",
  ">": "&gt;",
  '"': "&quot;",
  "'": "&#39;"
};
const getEscapeReplacement = (ch) => escapeReplacements[ch];
function escape$3(html2, encode) {
  if (encode) {
    if (escapeTest.test(html2)) {
      return html2.replace(escapeReplace, getEscapeReplacement);
    }
  } else {
    if (escapeTestNoEncode.test(html2)) {
      return html2.replace(escapeReplaceNoEncode, getEscapeReplacement);
    }
  }
  return html2;
}
const unescapeTest = /&(#(?:\d+)|(?:#x[0-9A-Fa-f]+)|(?:\w+));?/ig;
function unescape$1(html2) {
  return html2.replace(unescapeTest, (_2, n2) => {
    n2 = n2.toLowerCase();
    if (n2 === "colon")
      return ":";
    if (n2.charAt(0) === "#") {
      return n2.charAt(1) === "x" ? String.fromCharCode(parseInt(n2.substring(2), 16)) : String.fromCharCode(+n2.substring(1));
    }
    return "";
  });
}
const caret = /(^|[^\[])\^/g;
function edit$1(regex, opt) {
  regex = regex.source || regex;
  opt = opt || "";
  const obj = {
    replace: (name, val) => {
      val = val.source || val;
      val = val.replace(caret, "$1");
      regex = regex.replace(name, val);
      return obj;
    },
    getRegex: () => {
      return new RegExp(regex, opt);
    }
  };
  return obj;
}
const nonWordAndColonTest = /[^\w:]/g;
const originIndependentUrl = /^$|^[a-z][a-z0-9+.-]*:|^[?#]/i;
function cleanUrl$1(sanitize, base, href) {
  if (sanitize) {
    let prot;
    try {
      prot = decodeURIComponent(unescape$1(href)).replace(nonWordAndColonTest, "").toLowerCase();
    } catch (e2) {
      return null;
    }
    if (prot.indexOf("javascript:") === 0 || prot.indexOf("vbscript:") === 0 || prot.indexOf("data:") === 0) {
      return null;
    }
  }
  if (base && !originIndependentUrl.test(href)) {
    href = resolveUrl(base, href);
  }
  try {
    href = encodeURI(href).replace(/%25/g, "%");
  } catch (e2) {
    return null;
  }
  return href;
}
const baseUrls = {};
const justDomain = /^[^:]+:\/*[^/]*$/;
const protocol = /^([^:]+:)[\s\S]*$/;
const domain = /^([^:]+:\/*[^/]*)[\s\S]*$/;
function resolveUrl(base, href) {
  if (!baseUrls[" " + base]) {
    if (justDomain.test(base)) {
      baseUrls[" " + base] = base + "/";
    } else {
      baseUrls[" " + base] = rtrim$1(base, "/", true);
    }
  }
  base = baseUrls[" " + base];
  const relativeBase = base.indexOf(":") === -1;
  if (href.substring(0, 2) === "//") {
    if (relativeBase) {
      return href;
    }
    return base.replace(protocol, "$1") + href;
  } else if (href.charAt(0) === "/") {
    if (relativeBase) {
      return href;
    }
    return base.replace(domain, "$1") + href;
  } else {
    return base + href;
  }
}
const noopTest$1 = { exec: function noopTest() {
} };
function merge$2(obj) {
  let i = 1, target, key;
  for (; i < arguments.length; i++) {
    target = arguments[i];
    for (key in target) {
      if (Object.prototype.hasOwnProperty.call(target, key)) {
        obj[key] = target[key];
      }
    }
  }
  return obj;
}
function splitCells$1(tableRow, count) {
  const row = tableRow.replace(/\|/g, (match, offset2, str) => {
    let escaped = false, curr = offset2;
    while (--curr >= 0 && str[curr] === "\\")
      escaped = !escaped;
    if (escaped) {
      return "|";
    } else {
      return " |";
    }
  }), cells = row.split(/ \|/);
  let i = 0;
  if (!cells[0].trim()) {
    cells.shift();
  }
  if (!cells[cells.length - 1].trim()) {
    cells.pop();
  }
  if (cells.length > count) {
    cells.splice(count);
  } else {
    while (cells.length < count)
      cells.push("");
  }
  for (; i < cells.length; i++) {
    cells[i] = cells[i].trim().replace(/\\\|/g, "|");
  }
  return cells;
}
function rtrim$1(str, c2, invert) {
  const l2 = str.length;
  if (l2 === 0) {
    return "";
  }
  let suffLen = 0;
  while (suffLen < l2) {
    const currChar = str.charAt(l2 - suffLen - 1);
    if (currChar === c2 && !invert) {
      suffLen++;
    } else if (currChar !== c2 && invert) {
      suffLen++;
    } else {
      break;
    }
  }
  return str.substr(0, l2 - suffLen);
}
function findClosingBracket$1(str, b2) {
  if (str.indexOf(b2[1]) === -1) {
    return -1;
  }
  const l2 = str.length;
  let level = 0, i = 0;
  for (; i < l2; i++) {
    if (str[i] === "\\") {
      i++;
    } else if (str[i] === b2[0]) {
      level++;
    } else if (str[i] === b2[1]) {
      level--;
      if (level < 0) {
        return i;
      }
    }
  }
  return -1;
}
function checkSanitizeDeprecation$1(opt) {
  if (opt && opt.sanitize && !opt.silent) {
    console.warn("marked(): sanitize and sanitizer parameters are deprecated since version 0.7.0, should not be used and will be removed in the future. Read more here: https://marked.js.org/#/USING_ADVANCED.md#options");
  }
}
function repeatString$1(pattern, count) {
  if (count < 1) {
    return "";
  }
  let result = "";
  while (count > 1) {
    if (count & 1) {
      result += pattern;
    }
    count >>= 1;
    pattern += pattern;
  }
  return result + pattern;
}
var helpers = {
  escape: escape$3,
  unescape: unescape$1,
  edit: edit$1,
  cleanUrl: cleanUrl$1,
  resolveUrl,
  noopTest: noopTest$1,
  merge: merge$2,
  splitCells: splitCells$1,
  rtrim: rtrim$1,
  findClosingBracket: findClosingBracket$1,
  checkSanitizeDeprecation: checkSanitizeDeprecation$1,
  repeatString: repeatString$1
};
const { defaults: defaults$4 } = defaults$5.exports;
const {
  rtrim,
  splitCells,
  escape: escape$2,
  findClosingBracket
} = helpers;
function outputLink(cap, link, raw, lexer) {
  const href = link.href;
  const title = link.title ? escape$2(link.title) : null;
  const text = cap[1].replace(/\\([\[\]])/g, "$1");
  if (cap[0].charAt(0) !== "!") {
    lexer.state.inLink = true;
    const token = {
      type: "link",
      raw,
      href,
      title,
      text,
      tokens: lexer.inlineTokens(text, [])
    };
    lexer.state.inLink = false;
    return token;
  } else {
    return {
      type: "image",
      raw,
      href,
      title,
      text: escape$2(text)
    };
  }
}
function indentCodeCompensation(raw, text) {
  const matchIndentToCode = raw.match(/^(\s+)(?:```)/);
  if (matchIndentToCode === null) {
    return text;
  }
  const indentToCode = matchIndentToCode[1];
  return text.split("\n").map((node) => {
    const matchIndentInNode = node.match(/^\s+/);
    if (matchIndentInNode === null) {
      return node;
    }
    const [indentInNode] = matchIndentInNode;
    if (indentInNode.length >= indentToCode.length) {
      return node.slice(indentToCode.length);
    }
    return node;
  }).join("\n");
}
var Tokenizer_1$1 = class Tokenizer {
  constructor(options) {
    this.options = options || defaults$4;
  }
  space(src) {
    const cap = this.rules.block.newline.exec(src);
    if (cap) {
      if (cap[0].length > 1) {
        return {
          type: "space",
          raw: cap[0]
        };
      }
      return { raw: "\n" };
    }
  }
  code(src) {
    const cap = this.rules.block.code.exec(src);
    if (cap) {
      const text = cap[0].replace(/^ {1,4}/gm, "");
      return {
        type: "code",
        raw: cap[0],
        codeBlockStyle: "indented",
        text: !this.options.pedantic ? rtrim(text, "\n") : text
      };
    }
  }
  fences(src) {
    const cap = this.rules.block.fences.exec(src);
    if (cap) {
      const raw = cap[0];
      const text = indentCodeCompensation(raw, cap[3] || "");
      return {
        type: "code",
        raw,
        lang: cap[2] ? cap[2].trim() : cap[2],
        text
      };
    }
  }
  heading(src) {
    const cap = this.rules.block.heading.exec(src);
    if (cap) {
      let text = cap[2].trim();
      if (/#$/.test(text)) {
        const trimmed = rtrim(text, "#");
        if (this.options.pedantic) {
          text = trimmed.trim();
        } else if (!trimmed || / $/.test(trimmed)) {
          text = trimmed.trim();
        }
      }
      const token = {
        type: "heading",
        raw: cap[0],
        depth: cap[1].length,
        text,
        tokens: []
      };
      this.lexer.inline(token.text, token.tokens);
      return token;
    }
  }
  hr(src) {
    const cap = this.rules.block.hr.exec(src);
    if (cap) {
      return {
        type: "hr",
        raw: cap[0]
      };
    }
  }
  blockquote(src) {
    const cap = this.rules.block.blockquote.exec(src);
    if (cap) {
      const text = cap[0].replace(/^ *> ?/gm, "");
      return {
        type: "blockquote",
        raw: cap[0],
        tokens: this.lexer.blockTokens(text, []),
        text
      };
    }
  }
  list(src) {
    let cap = this.rules.block.list.exec(src);
    if (cap) {
      let raw, istask, ischecked, indent, i, blankLine, endsWithBlankLine, line, lines, itemContents;
      let bull = cap[1].trim();
      const isordered = bull.length > 1;
      const list = {
        type: "list",
        raw: "",
        ordered: isordered,
        start: isordered ? +bull.slice(0, -1) : "",
        loose: false,
        items: []
      };
      bull = isordered ? `\\d{1,9}\\${bull.slice(-1)}` : `\\${bull}`;
      if (this.options.pedantic) {
        bull = isordered ? bull : "[*+-]";
      }
      const itemRegex = new RegExp(`^( {0,3}${bull})((?: [^\\n]*| *)(?:\\n[^\\n]*)*(?:\\n|$))`);
      while (src) {
        if (this.rules.block.hr.test(src)) {
          break;
        }
        if (!(cap = itemRegex.exec(src))) {
          break;
        }
        lines = cap[2].split("\n");
        if (this.options.pedantic) {
          indent = 2;
          itemContents = lines[0].trimLeft();
        } else {
          indent = cap[2].search(/[^ ]/);
          indent = cap[1].length + (indent > 4 ? 1 : indent);
          itemContents = lines[0].slice(indent - cap[1].length);
        }
        blankLine = false;
        raw = cap[0];
        if (!lines[0] && /^ *$/.test(lines[1])) {
          raw = cap[1] + lines.slice(0, 2).join("\n") + "\n";
          list.loose = true;
          lines = [];
        }
        const nextBulletRegex = new RegExp(`^ {0,${Math.min(3, indent - 1)}}(?:[*+-]|\\d{1,9}[.)])`);
        for (i = 1; i < lines.length; i++) {
          line = lines[i];
          if (this.options.pedantic) {
            line = line.replace(/^ {1,4}(?=( {4})*[^ ])/g, "  ");
          }
          if (nextBulletRegex.test(line)) {
            raw = cap[1] + lines.slice(0, i).join("\n") + "\n";
            break;
          }
          if (!blankLine) {
            if (!line.trim()) {
              blankLine = true;
            }
            if (line.search(/[^ ]/) >= indent) {
              itemContents += "\n" + line.slice(indent);
            } else {
              itemContents += "\n" + line;
            }
            continue;
          }
          if (line.search(/[^ ]/) >= indent || !line.trim()) {
            itemContents += "\n" + line.slice(indent);
            continue;
          } else {
            raw = cap[1] + lines.slice(0, i).join("\n") + "\n";
            break;
          }
        }
        if (!list.loose) {
          if (endsWithBlankLine) {
            list.loose = true;
          } else if (/\n *\n *$/.test(raw)) {
            endsWithBlankLine = true;
          }
        }
        if (this.options.gfm) {
          istask = /^\[[ xX]\] /.exec(itemContents);
          if (istask) {
            ischecked = istask[0] !== "[ ] ";
            itemContents = itemContents.replace(/^\[[ xX]\] +/, "");
          }
        }
        list.items.push({
          type: "list_item",
          raw,
          task: !!istask,
          checked: ischecked,
          loose: false,
          text: itemContents
        });
        list.raw += raw;
        src = src.slice(raw.length);
      }
      list.items[list.items.length - 1].raw = raw.trimRight();
      list.items[list.items.length - 1].text = itemContents.trimRight();
      list.raw = list.raw.trimRight();
      const l2 = list.items.length;
      for (i = 0; i < l2; i++) {
        this.lexer.state.top = false;
        list.items[i].tokens = this.lexer.blockTokens(list.items[i].text, []);
        if (list.items[i].tokens.some((t2) => t2.type === "space")) {
          list.loose = true;
          list.items[i].loose = true;
        }
      }
      return list;
    }
  }
  html(src) {
    const cap = this.rules.block.html.exec(src);
    if (cap) {
      const token = {
        type: "html",
        raw: cap[0],
        pre: !this.options.sanitizer && (cap[1] === "pre" || cap[1] === "script" || cap[1] === "style"),
        text: cap[0]
      };
      if (this.options.sanitize) {
        token.type = "paragraph";
        token.text = this.options.sanitizer ? this.options.sanitizer(cap[0]) : escape$2(cap[0]);
        token.tokens = [];
        this.lexer.inline(token.text, token.tokens);
      }
      return token;
    }
  }
  def(src) {
    const cap = this.rules.block.def.exec(src);
    if (cap) {
      if (cap[3])
        cap[3] = cap[3].substring(1, cap[3].length - 1);
      const tag = cap[1].toLowerCase().replace(/\s+/g, " ");
      return {
        type: "def",
        tag,
        raw: cap[0],
        href: cap[2],
        title: cap[3]
      };
    }
  }
  table(src) {
    const cap = this.rules.block.table.exec(src);
    if (cap) {
      const item = {
        type: "table",
        header: splitCells(cap[1]).map((c2) => {
          return { text: c2 };
        }),
        align: cap[2].replace(/^ *|\| *$/g, "").split(/ *\| */),
        rows: cap[3] ? cap[3].replace(/\n$/, "").split("\n") : []
      };
      if (item.header.length === item.align.length) {
        item.raw = cap[0];
        let l2 = item.align.length;
        let i, j, k2, row;
        for (i = 0; i < l2; i++) {
          if (/^ *-+: *$/.test(item.align[i])) {
            item.align[i] = "right";
          } else if (/^ *:-+: *$/.test(item.align[i])) {
            item.align[i] = "center";
          } else if (/^ *:-+ *$/.test(item.align[i])) {
            item.align[i] = "left";
          } else {
            item.align[i] = null;
          }
        }
        l2 = item.rows.length;
        for (i = 0; i < l2; i++) {
          item.rows[i] = splitCells(item.rows[i], item.header.length).map((c2) => {
            return { text: c2 };
          });
        }
        l2 = item.header.length;
        for (j = 0; j < l2; j++) {
          item.header[j].tokens = [];
          this.lexer.inlineTokens(item.header[j].text, item.header[j].tokens);
        }
        l2 = item.rows.length;
        for (j = 0; j < l2; j++) {
          row = item.rows[j];
          for (k2 = 0; k2 < row.length; k2++) {
            row[k2].tokens = [];
            this.lexer.inlineTokens(row[k2].text, row[k2].tokens);
          }
        }
        return item;
      }
    }
  }
  lheading(src) {
    const cap = this.rules.block.lheading.exec(src);
    if (cap) {
      const token = {
        type: "heading",
        raw: cap[0],
        depth: cap[2].charAt(0) === "=" ? 1 : 2,
        text: cap[1],
        tokens: []
      };
      this.lexer.inline(token.text, token.tokens);
      return token;
    }
  }
  paragraph(src) {
    const cap = this.rules.block.paragraph.exec(src);
    if (cap) {
      const token = {
        type: "paragraph",
        raw: cap[0],
        text: cap[1].charAt(cap[1].length - 1) === "\n" ? cap[1].slice(0, -1) : cap[1],
        tokens: []
      };
      this.lexer.inline(token.text, token.tokens);
      return token;
    }
  }
  text(src) {
    const cap = this.rules.block.text.exec(src);
    if (cap) {
      const token = {
        type: "text",
        raw: cap[0],
        text: cap[0],
        tokens: []
      };
      this.lexer.inline(token.text, token.tokens);
      return token;
    }
  }
  escape(src) {
    const cap = this.rules.inline.escape.exec(src);
    if (cap) {
      return {
        type: "escape",
        raw: cap[0],
        text: escape$2(cap[1])
      };
    }
  }
  tag(src) {
    const cap = this.rules.inline.tag.exec(src);
    if (cap) {
      if (!this.lexer.state.inLink && /^<a /i.test(cap[0])) {
        this.lexer.state.inLink = true;
      } else if (this.lexer.state.inLink && /^<\/a>/i.test(cap[0])) {
        this.lexer.state.inLink = false;
      }
      if (!this.lexer.state.inRawBlock && /^<(pre|code|kbd|script)(\s|>)/i.test(cap[0])) {
        this.lexer.state.inRawBlock = true;
      } else if (this.lexer.state.inRawBlock && /^<\/(pre|code|kbd|script)(\s|>)/i.test(cap[0])) {
        this.lexer.state.inRawBlock = false;
      }
      return {
        type: this.options.sanitize ? "text" : "html",
        raw: cap[0],
        inLink: this.lexer.state.inLink,
        inRawBlock: this.lexer.state.inRawBlock,
        text: this.options.sanitize ? this.options.sanitizer ? this.options.sanitizer(cap[0]) : escape$2(cap[0]) : cap[0]
      };
    }
  }
  link(src) {
    const cap = this.rules.inline.link.exec(src);
    if (cap) {
      const trimmedUrl = cap[2].trim();
      if (!this.options.pedantic && /^</.test(trimmedUrl)) {
        if (!/>$/.test(trimmedUrl)) {
          return;
        }
        const rtrimSlash = rtrim(trimmedUrl.slice(0, -1), "\\");
        if ((trimmedUrl.length - rtrimSlash.length) % 2 === 0) {
          return;
        }
      } else {
        const lastParenIndex = findClosingBracket(cap[2], "()");
        if (lastParenIndex > -1) {
          const start2 = cap[0].indexOf("!") === 0 ? 5 : 4;
          const linkLen = start2 + cap[1].length + lastParenIndex;
          cap[2] = cap[2].substring(0, lastParenIndex);
          cap[0] = cap[0].substring(0, linkLen).trim();
          cap[3] = "";
        }
      }
      let href = cap[2];
      let title = "";
      if (this.options.pedantic) {
        const link = /^([^'"]*[^\s])\s+(['"])(.*)\2/.exec(href);
        if (link) {
          href = link[1];
          title = link[3];
        }
      } else {
        title = cap[3] ? cap[3].slice(1, -1) : "";
      }
      href = href.trim();
      if (/^</.test(href)) {
        if (this.options.pedantic && !/>$/.test(trimmedUrl)) {
          href = href.slice(1);
        } else {
          href = href.slice(1, -1);
        }
      }
      return outputLink(cap, {
        href: href ? href.replace(this.rules.inline._escapes, "$1") : href,
        title: title ? title.replace(this.rules.inline._escapes, "$1") : title
      }, cap[0], this.lexer);
    }
  }
  reflink(src, links) {
    let cap;
    if ((cap = this.rules.inline.reflink.exec(src)) || (cap = this.rules.inline.nolink.exec(src))) {
      let link = (cap[2] || cap[1]).replace(/\s+/g, " ");
      link = links[link.toLowerCase()];
      if (!link || !link.href) {
        const text = cap[0].charAt(0);
        return {
          type: "text",
          raw: text,
          text
        };
      }
      return outputLink(cap, link, cap[0], this.lexer);
    }
  }
  emStrong(src, maskedSrc, prevChar = "") {
    let match = this.rules.inline.emStrong.lDelim.exec(src);
    if (!match)
      return;
    if (match[3] && prevChar.match(/[\p{L}\p{N}]/u))
      return;
    const nextChar = match[1] || match[2] || "";
    if (!nextChar || nextChar && (prevChar === "" || this.rules.inline.punctuation.exec(prevChar))) {
      const lLength = match[0].length - 1;
      let rDelim, rLength, delimTotal = lLength, midDelimTotal = 0;
      const endReg = match[0][0] === "*" ? this.rules.inline.emStrong.rDelimAst : this.rules.inline.emStrong.rDelimUnd;
      endReg.lastIndex = 0;
      maskedSrc = maskedSrc.slice(-1 * src.length + lLength);
      while ((match = endReg.exec(maskedSrc)) != null) {
        rDelim = match[1] || match[2] || match[3] || match[4] || match[5] || match[6];
        if (!rDelim)
          continue;
        rLength = rDelim.length;
        if (match[3] || match[4]) {
          delimTotal += rLength;
          continue;
        } else if (match[5] || match[6]) {
          if (lLength % 3 && !((lLength + rLength) % 3)) {
            midDelimTotal += rLength;
            continue;
          }
        }
        delimTotal -= rLength;
        if (delimTotal > 0)
          continue;
        rLength = Math.min(rLength, rLength + delimTotal + midDelimTotal);
        if (Math.min(lLength, rLength) % 2) {
          const text2 = src.slice(1, lLength + match.index + rLength);
          return {
            type: "em",
            raw: src.slice(0, lLength + match.index + rLength + 1),
            text: text2,
            tokens: this.lexer.inlineTokens(text2, [])
          };
        }
        const text = src.slice(2, lLength + match.index + rLength - 1);
        return {
          type: "strong",
          raw: src.slice(0, lLength + match.index + rLength + 1),
          text,
          tokens: this.lexer.inlineTokens(text, [])
        };
      }
    }
  }
  codespan(src) {
    const cap = this.rules.inline.code.exec(src);
    if (cap) {
      let text = cap[2].replace(/\n/g, " ");
      const hasNonSpaceChars = /[^ ]/.test(text);
      const hasSpaceCharsOnBothEnds = /^ /.test(text) && / $/.test(text);
      if (hasNonSpaceChars && hasSpaceCharsOnBothEnds) {
        text = text.substring(1, text.length - 1);
      }
      text = escape$2(text, true);
      return {
        type: "codespan",
        raw: cap[0],
        text
      };
    }
  }
  br(src) {
    const cap = this.rules.inline.br.exec(src);
    if (cap) {
      return {
        type: "br",
        raw: cap[0]
      };
    }
  }
  del(src) {
    const cap = this.rules.inline.del.exec(src);
    if (cap) {
      return {
        type: "del",
        raw: cap[0],
        text: cap[2],
        tokens: this.lexer.inlineTokens(cap[2], [])
      };
    }
  }
  autolink(src, mangle2) {
    const cap = this.rules.inline.autolink.exec(src);
    if (cap) {
      let text, href;
      if (cap[2] === "@") {
        text = escape$2(this.options.mangle ? mangle2(cap[1]) : cap[1]);
        href = "mailto:" + text;
      } else {
        text = escape$2(cap[1]);
        href = text;
      }
      return {
        type: "link",
        raw: cap[0],
        text,
        href,
        tokens: [
          {
            type: "text",
            raw: text,
            text
          }
        ]
      };
    }
  }
  url(src, mangle2) {
    let cap;
    if (cap = this.rules.inline.url.exec(src)) {
      let text, href;
      if (cap[2] === "@") {
        text = escape$2(this.options.mangle ? mangle2(cap[0]) : cap[0]);
        href = "mailto:" + text;
      } else {
        let prevCapZero;
        do {
          prevCapZero = cap[0];
          cap[0] = this.rules.inline._backpedal.exec(cap[0])[0];
        } while (prevCapZero !== cap[0]);
        text = escape$2(cap[0]);
        if (cap[1] === "www.") {
          href = "http://" + text;
        } else {
          href = text;
        }
      }
      return {
        type: "link",
        raw: cap[0],
        text,
        href,
        tokens: [
          {
            type: "text",
            raw: text,
            text
          }
        ]
      };
    }
  }
  inlineText(src, smartypants2) {
    const cap = this.rules.inline.text.exec(src);
    if (cap) {
      let text;
      if (this.lexer.state.inRawBlock) {
        text = this.options.sanitize ? this.options.sanitizer ? this.options.sanitizer(cap[0]) : escape$2(cap[0]) : cap[0];
      } else {
        text = escape$2(this.options.smartypants ? smartypants2(cap[0]) : cap[0]);
      }
      return {
        type: "text",
        raw: cap[0],
        text
      };
    }
  }
};
const {
  noopTest: noopTest2,
  edit,
  merge: merge$1
} = helpers;
const block$1 = {
  newline: /^(?: *(?:\n|$))+/,
  code: /^( {4}[^\n]+(?:\n(?: *(?:\n|$))*)?)+/,
  fences: /^ {0,3}(`{3,}(?=[^`\n]*\n)|~{3,})([^\n]*)\n(?:|([\s\S]*?)\n)(?: {0,3}\1[~`]* *(?=\n|$)|$)/,
  hr: /^ {0,3}((?:- *){3,}|(?:_ *){3,}|(?:\* *){3,})(?:\n+|$)/,
  heading: /^ {0,3}(#{1,6})(?=\s|$)(.*)(?:\n+|$)/,
  blockquote: /^( {0,3}> ?(paragraph|[^\n]*)(?:\n|$))+/,
  list: /^( {0,3}bull)( [^\n]+?)?(?:\n|$)/,
  html: "^ {0,3}(?:<(script|pre|style|textarea)[\\s>][\\s\\S]*?(?:</\\1>[^\\n]*\\n+|$)|comment[^\\n]*(\\n+|$)|<\\?[\\s\\S]*?(?:\\?>\\n*|$)|<![A-Z][\\s\\S]*?(?:>\\n*|$)|<!\\[CDATA\\[[\\s\\S]*?(?:\\]\\]>\\n*|$)|</?(tag)(?: +|\\n|/?>)[\\s\\S]*?(?:(?:\\n *)+\\n|$)|<(?!script|pre|style|textarea)([a-z][\\w-]*)(?:attribute)*? */?>(?=[ \\t]*(?:\\n|$))[\\s\\S]*?(?:(?:\\n *)+\\n|$)|</(?!script|pre|style|textarea)[a-z][\\w-]*\\s*>(?=[ \\t]*(?:\\n|$))[\\s\\S]*?(?:(?:\\n *)+\\n|$))",
  def: /^ {0,3}\[(label)\]: *\n? *<?([^\s>]+)>?(?:(?: +\n? *| *\n *)(title))? *(?:\n+|$)/,
  table: noopTest2,
  lheading: /^([^\n]+)\n {0,3}(=+|-+) *(?:\n+|$)/,
  _paragraph: /^([^\n]+(?:\n(?!hr|heading|lheading|blockquote|fences|list|html| +\n)[^\n]+)*)/,
  text: /^[^\n]+/
};
block$1._label = /(?!\s*\])(?:\\[\[\]]|[^\[\]])+/;
block$1._title = /(?:"(?:\\"?|[^"\\])*"|'[^'\n]*(?:\n[^'\n]+)*\n?'|\([^()]*\))/;
block$1.def = edit(block$1.def).replace("label", block$1._label).replace("title", block$1._title).getRegex();
block$1.bullet = /(?:[*+-]|\d{1,9}[.)])/;
block$1.listItemStart = edit(/^( *)(bull) */).replace("bull", block$1.bullet).getRegex();
block$1.list = edit(block$1.list).replace(/bull/g, block$1.bullet).replace("hr", "\\n+(?=\\1?(?:(?:- *){3,}|(?:_ *){3,}|(?:\\* *){3,})(?:\\n+|$))").replace("def", "\\n+(?=" + block$1.def.source + ")").getRegex();
block$1._tag = "address|article|aside|base|basefont|blockquote|body|caption|center|col|colgroup|dd|details|dialog|dir|div|dl|dt|fieldset|figcaption|figure|footer|form|frame|frameset|h[1-6]|head|header|hr|html|iframe|legend|li|link|main|menu|menuitem|meta|nav|noframes|ol|optgroup|option|p|param|section|source|summary|table|tbody|td|tfoot|th|thead|title|tr|track|ul";
block$1._comment = /<!--(?!-?>)[\s\S]*?(?:-->|$)/;
block$1.html = edit(block$1.html, "i").replace("comment", block$1._comment).replace("tag", block$1._tag).replace("attribute", / +[a-zA-Z:_][\w.:-]*(?: *= *"[^"\n]*"| *= *'[^'\n]*'| *= *[^\s"'=<>`]+)?/).getRegex();
block$1.paragraph = edit(block$1._paragraph).replace("hr", block$1.hr).replace("heading", " {0,3}#{1,6} ").replace("|lheading", "").replace("blockquote", " {0,3}>").replace("fences", " {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list", " {0,3}(?:[*+-]|1[.)]) ").replace("html", "</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag", block$1._tag).getRegex();
block$1.blockquote = edit(block$1.blockquote).replace("paragraph", block$1.paragraph).getRegex();
block$1.normal = merge$1({}, block$1);
block$1.gfm = merge$1({}, block$1.normal, {
  table: "^ *([^\\n ].*\\|.*)\\n {0,3}(?:\\| *)?(:?-+:? *(?:\\| *:?-+:? *)*)(?:\\| *)?(?:\\n((?:(?! *\\n|hr|heading|blockquote|code|fences|list|html).*(?:\\n|$))*)\\n*|$)"
});
block$1.gfm.table = edit(block$1.gfm.table).replace("hr", block$1.hr).replace("heading", " {0,3}#{1,6} ").replace("blockquote", " {0,3}>").replace("code", " {4}[^\\n]").replace("fences", " {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list", " {0,3}(?:[*+-]|1[.)]) ").replace("html", "</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag", block$1._tag).getRegex();
block$1.pedantic = merge$1({}, block$1.normal, {
  html: edit(`^ *(?:comment *(?:\\n|\\s*$)|<(tag)[\\s\\S]+?</\\1> *(?:\\n{2,}|\\s*$)|<tag(?:"[^"]*"|'[^']*'|\\s[^'"/>\\s]*)*?/?> *(?:\\n{2,}|\\s*$))`).replace("comment", block$1._comment).replace(/tag/g, "(?!(?:a|em|strong|small|s|cite|q|dfn|abbr|data|time|code|var|samp|kbd|sub|sup|i|b|u|mark|ruby|rt|rp|bdi|bdo|span|br|wbr|ins|del|img)\\b)\\w+(?!:|[^\\w\\s@]*@)\\b").getRegex(),
  def: /^ *\[([^\]]+)\]: *<?([^\s>]+)>?(?: +(["(][^\n]+[")]))? *(?:\n+|$)/,
  heading: /^(#{1,6})(.*)(?:\n+|$)/,
  fences: noopTest2,
  paragraph: edit(block$1.normal._paragraph).replace("hr", block$1.hr).replace("heading", " *#{1,6} *[^\n]").replace("lheading", block$1.lheading).replace("blockquote", " {0,3}>").replace("|fences", "").replace("|list", "").replace("|html", "").getRegex()
});
const inline$1 = {
  escape: /^\\([!"#$%&'()*+,\-./:;<=>?@\[\]\\^_`{|}~])/,
  autolink: /^<(scheme:[^\s\x00-\x1f<>]*|email)>/,
  url: noopTest2,
  tag: "^comment|^</[a-zA-Z][\\w:-]*\\s*>|^<[a-zA-Z][\\w-]*(?:attribute)*?\\s*/?>|^<\\?[\\s\\S]*?\\?>|^<![a-zA-Z]+\\s[\\s\\S]*?>|^<!\\[CDATA\\[[\\s\\S]*?\\]\\]>",
  link: /^!?\[(label)\]\(\s*(href)(?:\s+(title))?\s*\)/,
  reflink: /^!?\[(label)\]\[(?!\s*\])((?:\\[\[\]]?|[^\[\]\\])+)\]/,
  nolink: /^!?\[(?!\s*\])((?:\[[^\[\]]*\]|\\[\[\]]|[^\[\]])*)\](?:\[\])?/,
  reflinkSearch: "reflink|nolink(?!\\()",
  emStrong: {
    lDelim: /^(?:\*+(?:([punct_])|[^\s*]))|^_+(?:([punct*])|([^\s_]))/,
    rDelimAst: /^[^_*]*?\_\_[^_*]*?\*[^_*]*?(?=\_\_)|[punct_](\*+)(?=[\s]|$)|[^punct*_\s](\*+)(?=[punct_\s]|$)|[punct_\s](\*+)(?=[^punct*_\s])|[\s](\*+)(?=[punct_])|[punct_](\*+)(?=[punct_])|[^punct*_\s](\*+)(?=[^punct*_\s])/,
    rDelimUnd: /^[^_*]*?\*\*[^_*]*?\_[^_*]*?(?=\*\*)|[punct*](\_+)(?=[\s]|$)|[^punct*_\s](\_+)(?=[punct*\s]|$)|[punct*\s](\_+)(?=[^punct*_\s])|[\s](\_+)(?=[punct*])|[punct*](\_+)(?=[punct*])/
  },
  code: /^(`+)([^`]|[^`][\s\S]*?[^`])\1(?!`)/,
  br: /^( {2,}|\\)\n(?!\s*$)/,
  del: noopTest2,
  text: /^(`+|[^`])(?:(?= {2,}\n)|[\s\S]*?(?:(?=[\\<!\[`*_]|\b_|$)|[^ ](?= {2,}\n)))/,
  punctuation: /^([\spunctuation])/
};
inline$1._punctuation = "!\"#$%&'()+\\-.,/:;<=>?@\\[\\]`^{|}~";
inline$1.punctuation = edit(inline$1.punctuation).replace(/punctuation/g, inline$1._punctuation).getRegex();
inline$1.blockSkip = /\[[^\]]*?\]\([^\)]*?\)|`[^`]*?`|<[^>]*?>/g;
inline$1.escapedEmSt = /\\\*|\\_/g;
inline$1._comment = edit(block$1._comment).replace("(?:-->|$)", "-->").getRegex();
inline$1.emStrong.lDelim = edit(inline$1.emStrong.lDelim).replace(/punct/g, inline$1._punctuation).getRegex();
inline$1.emStrong.rDelimAst = edit(inline$1.emStrong.rDelimAst, "g").replace(/punct/g, inline$1._punctuation).getRegex();
inline$1.emStrong.rDelimUnd = edit(inline$1.emStrong.rDelimUnd, "g").replace(/punct/g, inline$1._punctuation).getRegex();
inline$1._escapes = /\\([!"#$%&'()*+,\-./:;<=>?@\[\]\\^_`{|}~])/g;
inline$1._scheme = /[a-zA-Z][a-zA-Z0-9+.-]{1,31}/;
inline$1._email = /[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+(@)[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+(?![-_])/;
inline$1.autolink = edit(inline$1.autolink).replace("scheme", inline$1._scheme).replace("email", inline$1._email).getRegex();
inline$1._attribute = /\s+[a-zA-Z:_][\w.:-]*(?:\s*=\s*"[^"]*"|\s*=\s*'[^']*'|\s*=\s*[^\s"'=<>`]+)?/;
inline$1.tag = edit(inline$1.tag).replace("comment", inline$1._comment).replace("attribute", inline$1._attribute).getRegex();
inline$1._label = /(?:\[(?:\\.|[^\[\]\\])*\]|\\.|`[^`]*`|[^\[\]\\`])*?/;
inline$1._href = /<(?:\\.|[^\n<>\\])+>|[^\s\x00-\x1f]*/;
inline$1._title = /"(?:\\"?|[^"\\])*"|'(?:\\'?|[^'\\])*'|\((?:\\\)?|[^)\\])*\)/;
inline$1.link = edit(inline$1.link).replace("label", inline$1._label).replace("href", inline$1._href).replace("title", inline$1._title).getRegex();
inline$1.reflink = edit(inline$1.reflink).replace("label", inline$1._label).getRegex();
inline$1.reflinkSearch = edit(inline$1.reflinkSearch, "g").replace("reflink", inline$1.reflink).replace("nolink", inline$1.nolink).getRegex();
inline$1.normal = merge$1({}, inline$1);
inline$1.pedantic = merge$1({}, inline$1.normal, {
  strong: {
    start: /^__|\*\*/,
    middle: /^__(?=\S)([\s\S]*?\S)__(?!_)|^\*\*(?=\S)([\s\S]*?\S)\*\*(?!\*)/,
    endAst: /\*\*(?!\*)/g,
    endUnd: /__(?!_)/g
  },
  em: {
    start: /^_|\*/,
    middle: /^()\*(?=\S)([\s\S]*?\S)\*(?!\*)|^_(?=\S)([\s\S]*?\S)_(?!_)/,
    endAst: /\*(?!\*)/g,
    endUnd: /_(?!_)/g
  },
  link: edit(/^!?\[(label)\]\((.*?)\)/).replace("label", inline$1._label).getRegex(),
  reflink: edit(/^!?\[(label)\]\s*\[([^\]]*)\]/).replace("label", inline$1._label).getRegex()
});
inline$1.gfm = merge$1({}, inline$1.normal, {
  escape: edit(inline$1.escape).replace("])", "~|])").getRegex(),
  _extended_email: /[A-Za-z0-9._+-]+(@)[a-zA-Z0-9-_]+(?:\.[a-zA-Z0-9-_]*[a-zA-Z0-9])+(?![-_])/,
  url: /^((?:ftp|https?):\/\/|www\.)(?:[a-zA-Z0-9\-]+\.?)+[^\s<]*|^email/,
  _backpedal: /(?:[^?!.,:;*_~()&]+|\([^)]*\)|&(?![a-zA-Z0-9]+;$)|[?!.,:;*_~)]+(?!$))+/,
  del: /^(~~?)(?=[^\s~])([\s\S]*?[^\s~])\1(?=[^~]|$)/,
  text: /^([`~]+|[^`~])(?:(?= {2,}\n)|(?=[a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-]+@)|[\s\S]*?(?:(?=[\\<!\[`*~_]|\b_|https?:\/\/|ftp:\/\/|www\.|$)|[^ ](?= {2,}\n)|[^a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-](?=[a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-]+@)))/
});
inline$1.gfm.url = edit(inline$1.gfm.url, "i").replace("email", inline$1.gfm._extended_email).getRegex();
inline$1.breaks = merge$1({}, inline$1.gfm, {
  br: edit(inline$1.br).replace("{2,}", "*").getRegex(),
  text: edit(inline$1.gfm.text).replace("\\b_", "\\b_| {2,}\\n").replace(/\{2,\}/g, "*").getRegex()
});
var rules = {
  block: block$1,
  inline: inline$1
};
const Tokenizer$2 = Tokenizer_1$1;
const { defaults: defaults$3 } = defaults$5.exports;
const { block, inline } = rules;
const { repeatString } = helpers;
function smartypants(text) {
  return text.replace(/---/g, "\u2014").replace(/--/g, "\u2013").replace(/(^|[-\u2014/(\[{"\s])'/g, "$1\u2018").replace(/'/g, "\u2019").replace(/(^|[-\u2014/(\[{\u2018\s])"/g, "$1\u201C").replace(/"/g, "\u201D").replace(/\.{3}/g, "\u2026");
}
function mangle(text) {
  let out = "", i, ch;
  const l2 = text.length;
  for (i = 0; i < l2; i++) {
    ch = text.charCodeAt(i);
    if (Math.random() > 0.5) {
      ch = "x" + ch.toString(16);
    }
    out += "&#" + ch + ";";
  }
  return out;
}
var Lexer_1$1 = class Lexer {
  constructor(options) {
    this.tokens = [];
    this.tokens.links = Object.create(null);
    this.options = options || defaults$3;
    this.options.tokenizer = this.options.tokenizer || new Tokenizer$2();
    this.tokenizer = this.options.tokenizer;
    this.tokenizer.options = this.options;
    this.tokenizer.lexer = this;
    this.inlineQueue = [];
    this.state = {
      inLink: false,
      inRawBlock: false,
      top: true
    };
    const rules2 = {
      block: block.normal,
      inline: inline.normal
    };
    if (this.options.pedantic) {
      rules2.block = block.pedantic;
      rules2.inline = inline.pedantic;
    } else if (this.options.gfm) {
      rules2.block = block.gfm;
      if (this.options.breaks) {
        rules2.inline = inline.breaks;
      } else {
        rules2.inline = inline.gfm;
      }
    }
    this.tokenizer.rules = rules2;
  }
  static get rules() {
    return {
      block,
      inline
    };
  }
  static lex(src, options) {
    const lexer = new Lexer(options);
    return lexer.lex(src);
  }
  static lexInline(src, options) {
    const lexer = new Lexer(options);
    return lexer.inlineTokens(src);
  }
  lex(src) {
    src = src.replace(/\r\n|\r/g, "\n").replace(/\t/g, "    ");
    this.blockTokens(src, this.tokens);
    let next;
    while (next = this.inlineQueue.shift()) {
      this.inlineTokens(next.src, next.tokens);
    }
    return this.tokens;
  }
  blockTokens(src, tokens = []) {
    if (this.options.pedantic) {
      src = src.replace(/^ +$/gm, "");
    }
    let token, lastToken, cutSrc, lastParagraphClipped;
    while (src) {
      if (this.options.extensions && this.options.extensions.block && this.options.extensions.block.some((extTokenizer) => {
        if (token = extTokenizer.call({ lexer: this }, src, tokens)) {
          src = src.substring(token.raw.length);
          tokens.push(token);
          return true;
        }
        return false;
      })) {
        continue;
      }
      if (token = this.tokenizer.space(src)) {
        src = src.substring(token.raw.length);
        if (token.type) {
          tokens.push(token);
        }
        continue;
      }
      if (token = this.tokenizer.code(src)) {
        src = src.substring(token.raw.length);
        lastToken = tokens[tokens.length - 1];
        if (lastToken && (lastToken.type === "paragraph" || lastToken.type === "text")) {
          lastToken.raw += "\n" + token.raw;
          lastToken.text += "\n" + token.text;
          this.inlineQueue[this.inlineQueue.length - 1].src = lastToken.text;
        } else {
          tokens.push(token);
        }
        continue;
      }
      if (token = this.tokenizer.fences(src)) {
        src = src.substring(token.raw.length);
        tokens.push(token);
        continue;
      }
      if (token = this.tokenizer.heading(src)) {
        src = src.substring(token.raw.length);
        tokens.push(token);
        continue;
      }
      if (token = this.tokenizer.hr(src)) {
        src = src.substring(token.raw.length);
        tokens.push(token);
        continue;
      }
      if (token = this.tokenizer.blockquote(src)) {
        src = src.substring(token.raw.length);
        tokens.push(token);
        continue;
      }
      if (token = this.tokenizer.list(src)) {
        src = src.substring(token.raw.length);
        tokens.push(token);
        continue;
      }
      if (token = this.tokenizer.html(src)) {
        src = src.substring(token.raw.length);
        tokens.push(token);
        continue;
      }
      if (token = this.tokenizer.def(src)) {
        src = src.substring(token.raw.length);
        lastToken = tokens[tokens.length - 1];
        if (lastToken && (lastToken.type === "paragraph" || lastToken.type === "text")) {
          lastToken.raw += "\n" + token.raw;
          lastToken.text += "\n" + token.raw;
          this.inlineQueue[this.inlineQueue.length - 1].src = lastToken.text;
        } else if (!this.tokens.links[token.tag]) {
          this.tokens.links[token.tag] = {
            href: token.href,
            title: token.title
          };
        }
        continue;
      }
      if (token = this.tokenizer.table(src)) {
        src = src.substring(token.raw.length);
        tokens.push(token);
        continue;
      }
      if (token = this.tokenizer.lheading(src)) {
        src = src.substring(token.raw.length);
        tokens.push(token);
        continue;
      }
      cutSrc = src;
      if (this.options.extensions && this.options.extensions.startBlock) {
        let startIndex = Infinity;
        const tempSrc = src.slice(1);
        let tempStart;
        this.options.extensions.startBlock.forEach(function(getStartIndex) {
          tempStart = getStartIndex.call({ lexer: this }, tempSrc);
          if (typeof tempStart === "number" && tempStart >= 0) {
            startIndex = Math.min(startIndex, tempStart);
          }
        });
        if (startIndex < Infinity && startIndex >= 0) {
          cutSrc = src.substring(0, startIndex + 1);
        }
      }
      if (this.state.top && (token = this.tokenizer.paragraph(cutSrc))) {
        lastToken = tokens[tokens.length - 1];
        if (lastParagraphClipped && lastToken.type === "paragraph") {
          lastToken.raw += "\n" + token.raw;
          lastToken.text += "\n" + token.text;
          this.inlineQueue.pop();
          this.inlineQueue[this.inlineQueue.length - 1].src = lastToken.text;
        } else {
          tokens.push(token);
        }
        lastParagraphClipped = cutSrc.length !== src.length;
        src = src.substring(token.raw.length);
        continue;
      }
      if (token = this.tokenizer.text(src)) {
        src = src.substring(token.raw.length);
        lastToken = tokens[tokens.length - 1];
        if (lastToken && lastToken.type === "text") {
          lastToken.raw += "\n" + token.raw;
          lastToken.text += "\n" + token.text;
          this.inlineQueue.pop();
          this.inlineQueue[this.inlineQueue.length - 1].src = lastToken.text;
        } else {
          tokens.push(token);
        }
        continue;
      }
      if (src) {
        const errMsg = "Infinite loop on byte: " + src.charCodeAt(0);
        if (this.options.silent) {
          console.error(errMsg);
          break;
        } else {
          throw new Error(errMsg);
        }
      }
    }
    this.state.top = true;
    return tokens;
  }
  inline(src, tokens) {
    this.inlineQueue.push({ src, tokens });
  }
  inlineTokens(src, tokens = []) {
    let token, lastToken, cutSrc;
    let maskedSrc = src;
    let match;
    let keepPrevChar, prevChar;
    if (this.tokens.links) {
      const links = Object.keys(this.tokens.links);
      if (links.length > 0) {
        while ((match = this.tokenizer.rules.inline.reflinkSearch.exec(maskedSrc)) != null) {
          if (links.includes(match[0].slice(match[0].lastIndexOf("[") + 1, -1))) {
            maskedSrc = maskedSrc.slice(0, match.index) + "[" + repeatString("a", match[0].length - 2) + "]" + maskedSrc.slice(this.tokenizer.rules.inline.reflinkSearch.lastIndex);
          }
        }
      }
    }
    while ((match = this.tokenizer.rules.inline.blockSkip.exec(maskedSrc)) != null) {
      maskedSrc = maskedSrc.slice(0, match.index) + "[" + repeatString("a", match[0].length - 2) + "]" + maskedSrc.slice(this.tokenizer.rules.inline.blockSkip.lastIndex);
    }
    while ((match = this.tokenizer.rules.inline.escapedEmSt.exec(maskedSrc)) != null) {
      maskedSrc = maskedSrc.slice(0, match.index) + "++" + maskedSrc.slice(this.tokenizer.rules.inline.escapedEmSt.lastIndex);
    }
    while (src) {
      if (!keepPrevChar) {
        prevChar = "";
      }
      keepPrevChar = false;
      if (this.options.extensions && this.options.extensions.inline && this.options.extensions.inline.some((extTokenizer) => {
        if (token = extTokenizer.call({ lexer: this }, src, tokens)) {
          src = src.substring(token.raw.length);
          tokens.push(token);
          return true;
        }
        return false;
      })) {
        continue;
      }
      if (token = this.tokenizer.escape(src)) {
        src = src.substring(token.raw.length);
        tokens.push(token);
        continue;
      }
      if (token = this.tokenizer.tag(src)) {
        src = src.substring(token.raw.length);
        lastToken = tokens[tokens.length - 1];
        if (lastToken && token.type === "text" && lastToken.type === "text") {
          lastToken.raw += token.raw;
          lastToken.text += token.text;
        } else {
          tokens.push(token);
        }
        continue;
      }
      if (token = this.tokenizer.link(src)) {
        src = src.substring(token.raw.length);
        tokens.push(token);
        continue;
      }
      if (token = this.tokenizer.reflink(src, this.tokens.links)) {
        src = src.substring(token.raw.length);
        lastToken = tokens[tokens.length - 1];
        if (lastToken && token.type === "text" && lastToken.type === "text") {
          lastToken.raw += token.raw;
          lastToken.text += token.text;
        } else {
          tokens.push(token);
        }
        continue;
      }
      if (token = this.tokenizer.emStrong(src, maskedSrc, prevChar)) {
        src = src.substring(token.raw.length);
        tokens.push(token);
        continue;
      }
      if (token = this.tokenizer.codespan(src)) {
        src = src.substring(token.raw.length);
        tokens.push(token);
        continue;
      }
      if (token = this.tokenizer.br(src)) {
        src = src.substring(token.raw.length);
        tokens.push(token);
        continue;
      }
      if (token = this.tokenizer.del(src)) {
        src = src.substring(token.raw.length);
        tokens.push(token);
        continue;
      }
      if (token = this.tokenizer.autolink(src, mangle)) {
        src = src.substring(token.raw.length);
        tokens.push(token);
        continue;
      }
      if (!this.state.inLink && (token = this.tokenizer.url(src, mangle))) {
        src = src.substring(token.raw.length);
        tokens.push(token);
        continue;
      }
      cutSrc = src;
      if (this.options.extensions && this.options.extensions.startInline) {
        let startIndex = Infinity;
        const tempSrc = src.slice(1);
        let tempStart;
        this.options.extensions.startInline.forEach(function(getStartIndex) {
          tempStart = getStartIndex.call({ lexer: this }, tempSrc);
          if (typeof tempStart === "number" && tempStart >= 0) {
            startIndex = Math.min(startIndex, tempStart);
          }
        });
        if (startIndex < Infinity && startIndex >= 0) {
          cutSrc = src.substring(0, startIndex + 1);
        }
      }
      if (token = this.tokenizer.inlineText(cutSrc, smartypants)) {
        src = src.substring(token.raw.length);
        if (token.raw.slice(-1) !== "_") {
          prevChar = token.raw.slice(-1);
        }
        keepPrevChar = true;
        lastToken = tokens[tokens.length - 1];
        if (lastToken && lastToken.type === "text") {
          lastToken.raw += token.raw;
          lastToken.text += token.text;
        } else {
          tokens.push(token);
        }
        continue;
      }
      if (src) {
        const errMsg = "Infinite loop on byte: " + src.charCodeAt(0);
        if (this.options.silent) {
          console.error(errMsg);
          break;
        } else {
          throw new Error(errMsg);
        }
      }
    }
    return tokens;
  }
};
const { defaults: defaults$2 } = defaults$5.exports;
const {
  cleanUrl,
  escape: escape$1
} = helpers;
var Renderer_1$1 = class Renderer {
  constructor(options) {
    this.options = options || defaults$2;
  }
  code(code, infostring, escaped) {
    const lang = (infostring || "").match(/\S*/)[0];
    if (this.options.highlight) {
      const out = this.options.highlight(code, lang);
      if (out != null && out !== code) {
        escaped = true;
        code = out;
      }
    }
    code = code.replace(/\n$/, "") + "\n";
    if (!lang) {
      return "<pre><code>" + (escaped ? code : escape$1(code, true)) + "</code></pre>\n";
    }
    return '<pre><code class="' + this.options.langPrefix + escape$1(lang, true) + '">' + (escaped ? code : escape$1(code, true)) + "</code></pre>\n";
  }
  blockquote(quote) {
    return "<blockquote>\n" + quote + "</blockquote>\n";
  }
  html(html2) {
    return html2;
  }
  heading(text, level, raw, slugger) {
    if (this.options.headerIds) {
      return "<h" + level + ' id="' + this.options.headerPrefix + slugger.slug(raw) + '">' + text + "</h" + level + ">\n";
    }
    return "<h" + level + ">" + text + "</h" + level + ">\n";
  }
  hr() {
    return this.options.xhtml ? "<hr/>\n" : "<hr>\n";
  }
  list(body, ordered, start2) {
    const type = ordered ? "ol" : "ul", startatt = ordered && start2 !== 1 ? ' start="' + start2 + '"' : "";
    return "<" + type + startatt + ">\n" + body + "</" + type + ">\n";
  }
  listitem(text) {
    return "<li>" + text + "</li>\n";
  }
  checkbox(checked) {
    return "<input " + (checked ? 'checked="" ' : "") + 'disabled="" type="checkbox"' + (this.options.xhtml ? " /" : "") + "> ";
  }
  paragraph(text) {
    return "<p>" + text + "</p>\n";
  }
  table(header, body) {
    if (body)
      body = "<tbody>" + body + "</tbody>";
    return "<table>\n<thead>\n" + header + "</thead>\n" + body + "</table>\n";
  }
  tablerow(content) {
    return "<tr>\n" + content + "</tr>\n";
  }
  tablecell(content, flags) {
    const type = flags.header ? "th" : "td";
    const tag = flags.align ? "<" + type + ' align="' + flags.align + '">' : "<" + type + ">";
    return tag + content + "</" + type + ">\n";
  }
  strong(text) {
    return "<strong>" + text + "</strong>";
  }
  em(text) {
    return "<em>" + text + "</em>";
  }
  codespan(text) {
    return "<code>" + text + "</code>";
  }
  br() {
    return this.options.xhtml ? "<br/>" : "<br>";
  }
  del(text) {
    return "<del>" + text + "</del>";
  }
  link(href, title, text) {
    href = cleanUrl(this.options.sanitize, this.options.baseUrl, href);
    if (href === null) {
      return text;
    }
    let out = '<a href="' + escape$1(href) + '"';
    if (title) {
      out += ' title="' + title + '"';
    }
    out += ">" + text + "</a>";
    return out;
  }
  image(href, title, text) {
    href = cleanUrl(this.options.sanitize, this.options.baseUrl, href);
    if (href === null) {
      return text;
    }
    let out = '<img src="' + href + '" alt="' + text + '"';
    if (title) {
      out += ' title="' + title + '"';
    }
    out += this.options.xhtml ? "/>" : ">";
    return out;
  }
  text(text) {
    return text;
  }
};
var TextRenderer_1$1 = class TextRenderer {
  strong(text) {
    return text;
  }
  em(text) {
    return text;
  }
  codespan(text) {
    return text;
  }
  del(text) {
    return text;
  }
  html(text) {
    return text;
  }
  text(text) {
    return text;
  }
  link(href, title, text) {
    return "" + text;
  }
  image(href, title, text) {
    return "" + text;
  }
  br() {
    return "";
  }
};
var Slugger_1$1 = class Slugger {
  constructor() {
    this.seen = {};
  }
  serialize(value) {
    return value.toLowerCase().trim().replace(/<[!\/a-z].*?>/ig, "").replace(/[\u2000-\u206F\u2E00-\u2E7F\\'!"#$%&()*+,./:;<=>?@[\]^`{|}~]/g, "").replace(/\s/g, "-");
  }
  getNextSafeSlug(originalSlug, isDryRun) {
    let slug = originalSlug;
    let occurenceAccumulator = 0;
    if (this.seen.hasOwnProperty(slug)) {
      occurenceAccumulator = this.seen[originalSlug];
      do {
        occurenceAccumulator++;
        slug = originalSlug + "-" + occurenceAccumulator;
      } while (this.seen.hasOwnProperty(slug));
    }
    if (!isDryRun) {
      this.seen[originalSlug] = occurenceAccumulator;
      this.seen[slug] = 0;
    }
    return slug;
  }
  slug(value, options = {}) {
    const slug = this.serialize(value);
    return this.getNextSafeSlug(slug, options.dryrun);
  }
};
const Renderer$2 = Renderer_1$1;
const TextRenderer$2 = TextRenderer_1$1;
const Slugger$2 = Slugger_1$1;
const { defaults: defaults$1 } = defaults$5.exports;
const {
  unescape
} = helpers;
var Parser_1$1 = class Parser {
  constructor(options) {
    this.options = options || defaults$1;
    this.options.renderer = this.options.renderer || new Renderer$2();
    this.renderer = this.options.renderer;
    this.renderer.options = this.options;
    this.textRenderer = new TextRenderer$2();
    this.slugger = new Slugger$2();
  }
  static parse(tokens, options) {
    const parser = new Parser(options);
    return parser.parse(tokens);
  }
  static parseInline(tokens, options) {
    const parser = new Parser(options);
    return parser.parseInline(tokens);
  }
  parse(tokens, top2 = true) {
    let out = "", i, j, k2, l2, l3, row, cell, header, body, token, ordered, start2, loose, itemBody, item, checked, task, checkbox, ret;
    const l4 = tokens.length;
    for (i = 0; i < l4; i++) {
      token = tokens[i];
      if (this.options.extensions && this.options.extensions.renderers && this.options.extensions.renderers[token.type]) {
        ret = this.options.extensions.renderers[token.type].call({ parser: this }, token);
        if (ret !== false || !["space", "hr", "heading", "code", "table", "blockquote", "list", "html", "paragraph", "text"].includes(token.type)) {
          out += ret || "";
          continue;
        }
      }
      switch (token.type) {
        case "space": {
          continue;
        }
        case "hr": {
          out += this.renderer.hr();
          continue;
        }
        case "heading": {
          out += this.renderer.heading(this.parseInline(token.tokens), token.depth, unescape(this.parseInline(token.tokens, this.textRenderer)), this.slugger);
          continue;
        }
        case "code": {
          out += this.renderer.code(token.text, token.lang, token.escaped);
          continue;
        }
        case "table": {
          header = "";
          cell = "";
          l2 = token.header.length;
          for (j = 0; j < l2; j++) {
            cell += this.renderer.tablecell(this.parseInline(token.header[j].tokens), { header: true, align: token.align[j] });
          }
          header += this.renderer.tablerow(cell);
          body = "";
          l2 = token.rows.length;
          for (j = 0; j < l2; j++) {
            row = token.rows[j];
            cell = "";
            l3 = row.length;
            for (k2 = 0; k2 < l3; k2++) {
              cell += this.renderer.tablecell(this.parseInline(row[k2].tokens), { header: false, align: token.align[k2] });
            }
            body += this.renderer.tablerow(cell);
          }
          out += this.renderer.table(header, body);
          continue;
        }
        case "blockquote": {
          body = this.parse(token.tokens);
          out += this.renderer.blockquote(body);
          continue;
        }
        case "list": {
          ordered = token.ordered;
          start2 = token.start;
          loose = token.loose;
          l2 = token.items.length;
          body = "";
          for (j = 0; j < l2; j++) {
            item = token.items[j];
            checked = item.checked;
            task = item.task;
            itemBody = "";
            if (item.task) {
              checkbox = this.renderer.checkbox(checked);
              if (loose) {
                if (item.tokens.length > 0 && item.tokens[0].type === "paragraph") {
                  item.tokens[0].text = checkbox + " " + item.tokens[0].text;
                  if (item.tokens[0].tokens && item.tokens[0].tokens.length > 0 && item.tokens[0].tokens[0].type === "text") {
                    item.tokens[0].tokens[0].text = checkbox + " " + item.tokens[0].tokens[0].text;
                  }
                } else {
                  item.tokens.unshift({
                    type: "text",
                    text: checkbox
                  });
                }
              } else {
                itemBody += checkbox;
              }
            }
            itemBody += this.parse(item.tokens, loose);
            body += this.renderer.listitem(itemBody, task, checked);
          }
          out += this.renderer.list(body, ordered, start2);
          continue;
        }
        case "html": {
          out += this.renderer.html(token.text);
          continue;
        }
        case "paragraph": {
          out += this.renderer.paragraph(this.parseInline(token.tokens));
          continue;
        }
        case "text": {
          body = token.tokens ? this.parseInline(token.tokens) : token.text;
          while (i + 1 < l4 && tokens[i + 1].type === "text") {
            token = tokens[++i];
            body += "\n" + (token.tokens ? this.parseInline(token.tokens) : token.text);
          }
          out += top2 ? this.renderer.paragraph(body) : body;
          continue;
        }
        default: {
          const errMsg = 'Token with "' + token.type + '" type was not found.';
          if (this.options.silent) {
            console.error(errMsg);
            return;
          } else {
            throw new Error(errMsg);
          }
        }
      }
    }
    return out;
  }
  parseInline(tokens, renderer) {
    renderer = renderer || this.renderer;
    let out = "", i, token, ret;
    const l2 = tokens.length;
    for (i = 0; i < l2; i++) {
      token = tokens[i];
      if (this.options.extensions && this.options.extensions.renderers && this.options.extensions.renderers[token.type]) {
        ret = this.options.extensions.renderers[token.type].call({ parser: this }, token);
        if (ret !== false || !["escape", "html", "link", "image", "strong", "em", "codespan", "br", "del", "text"].includes(token.type)) {
          out += ret || "";
          continue;
        }
      }
      switch (token.type) {
        case "escape": {
          out += renderer.text(token.text);
          break;
        }
        case "html": {
          out += renderer.html(token.text);
          break;
        }
        case "link": {
          out += renderer.link(token.href, token.title, this.parseInline(token.tokens, renderer));
          break;
        }
        case "image": {
          out += renderer.image(token.href, token.title, token.text);
          break;
        }
        case "strong": {
          out += renderer.strong(this.parseInline(token.tokens, renderer));
          break;
        }
        case "em": {
          out += renderer.em(this.parseInline(token.tokens, renderer));
          break;
        }
        case "codespan": {
          out += renderer.codespan(token.text);
          break;
        }
        case "br": {
          out += renderer.br();
          break;
        }
        case "del": {
          out += renderer.del(this.parseInline(token.tokens, renderer));
          break;
        }
        case "text": {
          out += renderer.text(token.text);
          break;
        }
        default: {
          const errMsg = 'Token with "' + token.type + '" type was not found.';
          if (this.options.silent) {
            console.error(errMsg);
            return;
          } else {
            throw new Error(errMsg);
          }
        }
      }
    }
    return out;
  }
};
const Lexer$1 = Lexer_1$1;
const Parser$1 = Parser_1$1;
const Tokenizer$1 = Tokenizer_1$1;
const Renderer$1 = Renderer_1$1;
const TextRenderer$1 = TextRenderer_1$1;
const Slugger$1 = Slugger_1$1;
const {
  merge: merge$3,
  checkSanitizeDeprecation,
  escape
} = helpers;
const {
  getDefaults,
  changeDefaults,
  defaults
} = defaults$5.exports;
function marked$1(src, opt, callback) {
  if (typeof src === "undefined" || src === null) {
    throw new Error("marked(): input parameter is undefined or null");
  }
  if (typeof src !== "string") {
    throw new Error("marked(): input parameter is of type " + Object.prototype.toString.call(src) + ", string expected");
  }
  if (typeof opt === "function") {
    callback = opt;
    opt = null;
  }
  opt = merge$3({}, marked$1.defaults, opt || {});
  checkSanitizeDeprecation(opt);
  if (callback) {
    const highlight = opt.highlight;
    let tokens;
    try {
      tokens = Lexer$1.lex(src, opt);
    } catch (e2) {
      return callback(e2);
    }
    const done = function(err) {
      let out;
      if (!err) {
        try {
          if (opt.walkTokens) {
            marked$1.walkTokens(tokens, opt.walkTokens);
          }
          out = Parser$1.parse(tokens, opt);
        } catch (e2) {
          err = e2;
        }
      }
      opt.highlight = highlight;
      return err ? callback(err) : callback(null, out);
    };
    if (!highlight || highlight.length < 3) {
      return done();
    }
    delete opt.highlight;
    if (!tokens.length)
      return done();
    let pending = 0;
    marked$1.walkTokens(tokens, function(token) {
      if (token.type === "code") {
        pending++;
        setTimeout(() => {
          highlight(token.text, token.lang, function(err, code) {
            if (err) {
              return done(err);
            }
            if (code != null && code !== token.text) {
              token.text = code;
              token.escaped = true;
            }
            pending--;
            if (pending === 0) {
              done();
            }
          });
        }, 0);
      }
    });
    if (pending === 0) {
      done();
    }
    return;
  }
  try {
    const tokens = Lexer$1.lex(src, opt);
    if (opt.walkTokens) {
      marked$1.walkTokens(tokens, opt.walkTokens);
    }
    return Parser$1.parse(tokens, opt);
  } catch (e2) {
    e2.message += "\nPlease report this to https://github.com/markedjs/marked.";
    if (opt.silent) {
      return "<p>An error occurred:</p><pre>" + escape(e2.message + "", true) + "</pre>";
    }
    throw e2;
  }
}
marked$1.options = marked$1.setOptions = function(opt) {
  merge$3(marked$1.defaults, opt);
  changeDefaults(marked$1.defaults);
  return marked$1;
};
marked$1.getDefaults = getDefaults;
marked$1.defaults = defaults;
marked$1.use = function(...args) {
  const opts = merge$3({}, ...args);
  const extensions = marked$1.defaults.extensions || { renderers: {}, childTokens: {} };
  let hasExtensions;
  args.forEach((pack) => {
    if (pack.extensions) {
      hasExtensions = true;
      pack.extensions.forEach((ext) => {
        if (!ext.name) {
          throw new Error("extension name required");
        }
        if (ext.renderer) {
          const prevRenderer = extensions.renderers ? extensions.renderers[ext.name] : null;
          if (prevRenderer) {
            extensions.renderers[ext.name] = function(...args2) {
              let ret = ext.renderer.apply(this, args2);
              if (ret === false) {
                ret = prevRenderer.apply(this, args2);
              }
              return ret;
            };
          } else {
            extensions.renderers[ext.name] = ext.renderer;
          }
        }
        if (ext.tokenizer) {
          if (!ext.level || ext.level !== "block" && ext.level !== "inline") {
            throw new Error("extension level must be 'block' or 'inline'");
          }
          if (extensions[ext.level]) {
            extensions[ext.level].unshift(ext.tokenizer);
          } else {
            extensions[ext.level] = [ext.tokenizer];
          }
          if (ext.start) {
            if (ext.level === "block") {
              if (extensions.startBlock) {
                extensions.startBlock.push(ext.start);
              } else {
                extensions.startBlock = [ext.start];
              }
            } else if (ext.level === "inline") {
              if (extensions.startInline) {
                extensions.startInline.push(ext.start);
              } else {
                extensions.startInline = [ext.start];
              }
            }
          }
        }
        if (ext.childTokens) {
          extensions.childTokens[ext.name] = ext.childTokens;
        }
      });
    }
    if (pack.renderer) {
      const renderer = marked$1.defaults.renderer || new Renderer$1();
      for (const prop in pack.renderer) {
        const prevRenderer = renderer[prop];
        renderer[prop] = (...args2) => {
          let ret = pack.renderer[prop].apply(renderer, args2);
          if (ret === false) {
            ret = prevRenderer.apply(renderer, args2);
          }
          return ret;
        };
      }
      opts.renderer = renderer;
    }
    if (pack.tokenizer) {
      const tokenizer = marked$1.defaults.tokenizer || new Tokenizer$1();
      for (const prop in pack.tokenizer) {
        const prevTokenizer = tokenizer[prop];
        tokenizer[prop] = (...args2) => {
          let ret = pack.tokenizer[prop].apply(tokenizer, args2);
          if (ret === false) {
            ret = prevTokenizer.apply(tokenizer, args2);
          }
          return ret;
        };
      }
      opts.tokenizer = tokenizer;
    }
    if (pack.walkTokens) {
      const walkTokens = marked$1.defaults.walkTokens;
      opts.walkTokens = function(token) {
        pack.walkTokens.call(this, token);
        if (walkTokens) {
          walkTokens.call(this, token);
        }
      };
    }
    if (hasExtensions) {
      opts.extensions = extensions;
    }
    marked$1.setOptions(opts);
  });
};
marked$1.walkTokens = function(tokens, callback) {
  for (const token of tokens) {
    callback.call(marked$1, token);
    switch (token.type) {
      case "table": {
        for (const cell of token.header) {
          marked$1.walkTokens(cell.tokens, callback);
        }
        for (const row of token.rows) {
          for (const cell of row) {
            marked$1.walkTokens(cell.tokens, callback);
          }
        }
        break;
      }
      case "list": {
        marked$1.walkTokens(token.items, callback);
        break;
      }
      default: {
        if (marked$1.defaults.extensions && marked$1.defaults.extensions.childTokens && marked$1.defaults.extensions.childTokens[token.type]) {
          marked$1.defaults.extensions.childTokens[token.type].forEach(function(childTokens) {
            marked$1.walkTokens(token[childTokens], callback);
          });
        } else if (token.tokens) {
          marked$1.walkTokens(token.tokens, callback);
        }
      }
    }
  }
};
marked$1.parseInline = function(src, opt) {
  if (typeof src === "undefined" || src === null) {
    throw new Error("marked.parseInline(): input parameter is undefined or null");
  }
  if (typeof src !== "string") {
    throw new Error("marked.parseInline(): input parameter is of type " + Object.prototype.toString.call(src) + ", string expected");
  }
  opt = merge$3({}, marked$1.defaults, opt || {});
  checkSanitizeDeprecation(opt);
  try {
    const tokens = Lexer$1.lexInline(src, opt);
    if (opt.walkTokens) {
      marked$1.walkTokens(tokens, opt.walkTokens);
    }
    return Parser$1.parseInline(tokens, opt);
  } catch (e2) {
    e2.message += "\nPlease report this to https://github.com/markedjs/marked.";
    if (opt.silent) {
      return "<p>An error occurred:</p><pre>" + escape(e2.message + "", true) + "</pre>";
    }
    throw e2;
  }
};
marked$1.Parser = Parser$1;
marked$1.parser = Parser$1.parse;
marked$1.Renderer = Renderer$1;
marked$1.TextRenderer = TextRenderer$1;
marked$1.Lexer = Lexer$1;
marked$1.lexer = Lexer$1.lex;
marked$1.Tokenizer = Tokenizer$1;
marked$1.Slugger = Slugger$1;
marked$1.parse = marked$1;
var marked_1 = marked$1;
const marked = marked_1;
const Lexer2 = Lexer_1$1;
const Parser2 = Parser_1$1;
const Tokenizer2 = Tokenizer_1$1;
const Renderer2 = Renderer_1$1;
const TextRenderer2 = TextRenderer_1$1;
const Slugger2 = Slugger_1$1;
esmEntry$1.exports = marked;
esmEntry$1.exports.parse = marked;
esmEntry$1.exports.Parser = Parser2;
esmEntry$1.exports.parser = Parser2.parse;
esmEntry$1.exports.Renderer = Renderer2;
esmEntry$1.exports.TextRenderer = TextRenderer2;
esmEntry$1.exports.Lexer = Lexer2;
esmEntry$1.exports.lexer = Lexer2.lex;
esmEntry$1.exports.Tokenizer = Tokenizer2;
esmEntry$1.exports.Slugger = Slugger2;
var esmEntry = esmEntry$1.exports;
var n$1 = function(t2, s, r2, e2) {
  var u2;
  s[0] = 0;
  for (var h2 = 1; h2 < s.length; h2++) {
    var p2 = s[h2++], a = s[h2] ? (s[0] |= p2 ? 1 : 2, r2[s[h2++]]) : s[++h2];
    p2 === 3 ? e2[0] = a : p2 === 4 ? e2[1] = Object.assign(e2[1] || {}, a) : p2 === 5 ? (e2[1] = e2[1] || {})[s[++h2]] = a : p2 === 6 ? e2[1][s[++h2]] += a + "" : p2 ? (u2 = t2.apply(a, n$1(t2, a, r2, ["", null])), e2.push(u2), a[0] ? s[0] |= 2 : (s[h2 - 2] = 0, s[h2] = u2)) : e2.push(a);
  }
  return e2;
}, t = new Map();
function htm(s) {
  var r2 = t.get(this);
  return r2 || (r2 = new Map(), t.set(this, r2)), (r2 = n$1(this, r2.get(s) || (r2.set(s, r2 = function(n2) {
    for (var t2, s2, r3 = 1, e2 = "", u2 = "", h2 = [0], p2 = function(n3) {
      r3 === 1 && (n3 || (e2 = e2.replace(/^\s*\n\s*|\s*\n\s*$/g, ""))) ? h2.push(0, n3, e2) : r3 === 3 && (n3 || e2) ? (h2.push(3, n3, e2), r3 = 2) : r3 === 2 && e2 === "..." && n3 ? h2.push(4, n3, 0) : r3 === 2 && e2 && !n3 ? h2.push(5, 0, true, e2) : r3 >= 5 && ((e2 || !n3 && r3 === 5) && (h2.push(r3, 0, e2, s2), r3 = 6), n3 && (h2.push(r3, n3, 0, s2), r3 = 6)), e2 = "";
    }, a = 0; a < n2.length; a++) {
      a && (r3 === 1 && p2(), p2(a));
      for (var l2 = 0; l2 < n2[a].length; l2++)
        t2 = n2[a][l2], r3 === 1 ? t2 === "<" ? (p2(), h2 = [h2], r3 = 3) : e2 += t2 : r3 === 4 ? e2 === "--" && t2 === ">" ? (r3 = 1, e2 = "") : e2 = t2 + e2[0] : u2 ? t2 === u2 ? u2 = "" : e2 += t2 : t2 === '"' || t2 === "'" ? u2 = t2 : t2 === ">" ? (p2(), r3 = 1) : r3 && (t2 === "=" ? (r3 = 5, s2 = e2, e2 = "") : t2 === "/" && (r3 < 5 || n2[a][l2 + 1] === ">") ? (p2(), r3 === 3 && (h2 = h2[0]), r3 = h2, (h2 = h2[0]).push(2, 0, r3), r3 = 0) : t2 === " " || t2 === "	" || t2 === "\n" || t2 === "\r" ? (p2(), r3 = 2) : e2 += t2), r3 === 3 && e2 === "!--" && (r3 = 4, h2 = h2[0]);
    }
    return p2(), h2;
  }(s)), r2), arguments, [])).length > 1 ? r2 : r2[0];
}
function _unsupportedIterableToArray$1(o, minLen) {
  if (!o)
    return;
  if (typeof o === "string")
    return _arrayLikeToArray$1(o, minLen);
  var n2 = Object.prototype.toString.call(o).slice(8, -1);
  if (n2 === "Object" && o.constructor)
    n2 = o.constructor.name;
  if (n2 === "Map" || n2 === "Set")
    return Array.from(o);
  if (n2 === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n2))
    return _arrayLikeToArray$1(o, minLen);
}
function _arrayLikeToArray$1(arr, len) {
  if (len == null || len > arr.length)
    len = arr.length;
  for (var i = 0, arr2 = new Array(len); i < len; i++)
    arr2[i] = arr[i];
  return arr2;
}
function _createForOfIteratorHelperLoose(o, allowArrayLike) {
  var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"];
  if (it)
    return (it = it.call(o)).next.bind(it);
  if (Array.isArray(o) || (it = _unsupportedIterableToArray$1(o)) || allowArrayLike && o && typeof o.length === "number") {
    if (it)
      o = it;
    var i = 0;
    return function() {
      if (i >= o.length)
        return {
          done: true
        };
      return {
        done: false,
        value: o[i++]
      };
    };
  }
  throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
var currentHTMLContext = {
  currentFactory: function currentFactory(type, props) {
    for (var _len = arguments.length, children = new Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
      children[_key - 2] = arguments[_key];
    }
    return {
      type,
      props,
      children
    };
  },
  jsxTransforms: []
};
function setHTMLContext(context) {
  currentHTMLContext = context;
}
function applyTransforms(type, props, children) {
  var _currentHTMLContext;
  var args = [type, props, children];
  for (var _iterator = _createForOfIteratorHelperLoose(currentHTMLContext.jsxTransforms), _step; !(_step = _iterator()).done; ) {
    var transform = _step.value;
    args = transform(args[0], args[1], args[2]);
  }
  return (_currentHTMLContext = currentHTMLContext).currentFactory.apply(_currentHTMLContext, [args[0], args[1]].concat(args[2]));
}
var html = /* @__PURE__ */ htm.bind(function(type, props) {
  for (var _len2 = arguments.length, children = new Array(_len2 > 2 ? _len2 - 2 : 0), _key2 = 2; _key2 < _len2; _key2++) {
    children[_key2 - 2] = arguments[_key2];
  }
  return applyTransforms(type, props, children);
});
var classNameTransform = function classNameTransform2(type, props, children) {
  if (props != null && "class" in props) {
    props.className = props["class"];
    delete props["class"];
  }
  return [type, props, children];
};
var getComponentTransform = function getComponentTransform2(components) {
  return function(type, props, children) {
    if (typeof type === "string" && components[type]) {
      type = components[type];
    }
    return [type, props, children];
  };
};
function performTransFormJSXToHTM(m2) {
  return m2.replace(/(```+)[\s\S]*?\2|={/g, function(str, fence) {
    return fence ? str : "=${";
  });
}
function markedToReact(m2, h2, options) {
  var _options$components = options.components, components = _options$components === void 0 ? {} : _options$components, _options$thisValue = options.thisValue, thisValue = _options$thisValue === void 0 ? {} : _options$thisValue, _options$transformCla = options.transformClassToClassname, transformClassToClassname = _options$transformCla === void 0 ? true : _options$transformCla, _options$jsxTransform = options.jsxTransforms, jsxTransforms = _options$jsxTransform === void 0 ? [] : _options$jsxTransform;
  m2 = decodeHTML(m2);
  if (transformClassToClassname) {
    jsxTransforms.push(function(type, props, children) {
      if (children && typeof children[0] === "string") {
        children[0] = decode$1(children[0]);
      }
      return [type, props, children];
    });
    jsxTransforms.push(classNameTransform);
  }
  jsxTransforms.push(getComponentTransform(components));
  setHTMLContext({
    currentFactory: h2,
    jsxTransforms
  });
  return new Function("html", "return html`" + m2.replace(/`/g, "\\`") + "`").call(thisValue, html);
}
function decodeHTML(m2) {
  m2.split(/(<code+)[\s\S]*?(<\/code>+)/).forEach(function(str) {
    m2 = m2.replace(str, decode$1(str));
  });
  return m2;
}
function htmdx(m2, h2, options) {
  if (options === void 0) {
    options = {};
  }
  var _options = options, _options$transformJSX = _options.transformJSXToHTM, transformJSXToHTM = _options$transformJSX === void 0 ? true : _options$transformJSX, configureMarked = _options.configureMarked, _options$mdxTransform = _options.mdxTransforms, mdxTransforms = _options$mdxTransform === void 0 ? [] : _options$mdxTransform;
  esmEntry.setOptions({
    xhtml: true
  });
  if (configureMarked) {
    configureMarked(esmEntry);
  }
  if (transformJSXToHTM) {
    mdxTransforms.push(performTransFormJSXToHTM);
  }
  mdxTransforms.forEach(function(t2) {
    m2 = t2(m2);
  });
  return markedToReact(esmEntry(m2), h2, options);
}
const CodeSyntaxHighlighter = react.exports.lazy(() => import("./syntax_highlighter.js"));
const SYNTAX_KEY = "SYNTAX";
const codeTheme$ = new ValueSubject((_a = localStorage.getItem(SYNTAX_KEY)) != null ? _a : "atomOneDark");
codeTheme$.subscribe((theme2) => {
  localStorage.setItem(SYNTAX_KEY, theme2);
});
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hasError: false,
      error: ""
    };
  }
  componentDidCatch(error, errorInfo) {
    this.props.onError();
  }
  static getDerivedStateFromError(error) {
    console.log("ERROR");
    return {
      hasError: true,
      error: error.message
    };
  }
  render() {
    if (this.state.hasError) {
      console.error("mdx error", this.state.error);
      return /* @__PURE__ */ jsxs(Fragment, {
        children: [/* @__PURE__ */ jsx("h1", {
          children: "MDX error:"
        }), /* @__PURE__ */ jsx("div", {
          children: this.state.error
        })]
      });
    }
    return this.props.children;
  }
}
const voidElements = ["br", "hr", "img", "area", "base", "col", "embed", "link", "meta", "param", "source", "track", "wbr"];
const removeVoidElements = (mdx) => {
  if (!mdx) {
    return void 0;
  }
  voidElements.forEach((el) => {
    mdx = mdx.replace(new RegExp(`</${el}.*>`, "ig"), ``);
    mdx = mdx.replace(new RegExp(`<${el}.*>`, "ig"), `<${el} />`);
  });
  return mdx;
};
const MDX = react.exports.memo(({
  mdx,
  onSaveMDX
}) => {
  let i = 0;
  const [theme2] = useObservableState(() => codeTheme$);
  const params = useParams();
  const document2 = useObservableState(useObservable((input$) => {
    return combineLatest([input$, documents$]).pipe(map(([input, documents]) => {
      return documents.get(input[0].contentSlug);
    }));
  }, [params]));
  const getPath = react.exports.useCallback((src) => {
    if (src.includes("http") || !document2) {
      return src;
    }
    return pathBrowserify.join(projects$.value.get(document2.projectSlug).root, document2.path.split("/").slice(0, -1).join("/"), src);
  }, [document2, params]);
  const sanitizedMDX = react.exports.useMemo(() => removeVoidElements(mdx), [mdx]);
  react.exports.useEffect(() => {
    onSaveMDX(mdx);
  }, [mdx]);
  return /* @__PURE__ */ jsx(Fragment, {
    children: mdx !== void 0 ? htmdx(sanitizedMDX, React.createElement, {
      components: {
        code: (props) => {
          var _a2;
          return /* @__PURE__ */ jsx(react.exports.Suspense, {
            fallback: props.children,
            children: /* @__PURE__ */ jsx(CodeSyntaxHighlighter, {
              theme: theme2,
              language: (_a2 = props == null ? void 0 : props.className) == null ? void 0 : _a2.replace("language-", ""),
              children: props.children
            })
          });
        },
        img: (props) => {
          if (props.src) {
            props = __spreadProps(__spreadValues({}, props), {
              src: getPath(props.src)
            });
          }
          return /* @__PURE__ */ jsx("img", __spreadValues({}, props));
        }
      },
      jsxTransforms: [(type, props, children) => {
        if (!props) {
          props = {};
        }
        props.key = i++;
        return [type, props, children];
      }]
    }) : /* @__PURE__ */ jsx(CircularProgress, {
      sx: {
        marginLeft: "calc(50% - 20px)"
      }
    })
  });
});
const Wrapper = default_1$e(Box$3)(({
  theme: theme2
}) => __spreadValues({}, theme2.typography.body1));
const MarkdownRenderer = ({
  mdx,
  isEditor
}) => {
  const currentMDX$ = useObservable(() => new ValueSubject(mdx));
  const [debouncedMDX] = useObservableState(() => isEditor ? currentMDX$.pipe(debounceTime(300, void 0)) : currentMDX$);
  react.exports.useLayoutEffect(() => {
    currentMDX$.next(mdx);
  }, [mdx]);
  const saveMDXRef = react.exports.useRef("");
  const mdxIdRef = react.exports.useRef(0);
  return /* @__PURE__ */ jsx(Wrapper, {
    sx: {
      textAlign: "justify"
    },
    children: /* @__PURE__ */ jsx(ErrorBoundary, {
      onError: () => {
        mdxIdRef.current++;
        if (isEditor) {
          currentMDX$.next(saveMDXRef.current);
        }
      },
      children: /* @__PURE__ */ jsx(MDX, {
        mdx: debouncedMDX,
        onSaveMDX: (saveMDX) => {
          saveMDXRef.current = saveMDX;
        }
      })
    }, "mdx-" + mdxIdRef.current)
  });
};
const ContentWrapper = default_1$e(Grid$1)(({
  theme: theme2
}) => ({
  [theme2.breakpoints.down("sm")]: {
    maxWidth: "100%",
    flexBasis: "initial"
  }
}));
const Content = () => {
  const params = useParams();
  const document2 = useObservableState(useObservable((input$) => {
    return combineLatest(input$, documents$).pipe(map(([input, documents]) => {
      return documents.get(input[0].contentSlug);
    }));
  }, [params]));
  const toggleFav = react.exports.useCallback(() => {
    modifyDocument(__spreadProps(__spreadValues({}, document2), {
      isFavourite: !document2.isFavourite
    }));
  }, [document2]);
  return /* @__PURE__ */ jsx(ContentWrapper, {
    item: true,
    xs: 9,
    children: /* @__PURE__ */ jsxs(Card$1, {
      elevation: 2,
      sx: {
        padding: 2,
        textAlign: "justify",
        overflowX: "auto"
      },
      children: [document2 && /* @__PURE__ */ jsx(CardHeader$1, {
        action: /* @__PURE__ */ jsx(IconButton$1, {
          "aria-label": "favourite",
          onClick: toggleFav,
          children: /* @__PURE__ */ jsx(default_1$f, {
            sx: {
              color: document2.isFavourite && "red"
            }
          })
        }),
        title: document2.name,
        subheader: document2.lastModified
      }), /* @__PURE__ */ jsx(CardContent$1, {
        sx: {
          display: "block",
          overflow: "auto"
        },
        children: /* @__PURE__ */ jsx(MarkdownRenderer, {
          mdx: document2 == null ? void 0 : document2.mdx
        })
      })]
    })
  });
};
function getButtonUtilityClass(slot) {
  return generateUtilityClass("MuiButton", slot);
}
const buttonClasses = generateUtilityClasses("MuiButton", ["root", "text", "textInherit", "textPrimary", "textSecondary", "outlined", "outlinedInherit", "outlinedPrimary", "outlinedSecondary", "contained", "containedInherit", "containedPrimary", "containedSecondary", "disableElevation", "focusVisible", "disabled", "colorInherit", "textSizeSmall", "textSizeMedium", "textSizeLarge", "outlinedSizeSmall", "outlinedSizeMedium", "outlinedSizeLarge", "containedSizeSmall", "containedSizeMedium", "containedSizeLarge", "sizeMedium", "sizeSmall", "sizeLarge", "fullWidth", "startIcon", "endIcon", "iconSizeSmall", "iconSizeMedium", "iconSizeLarge"]);
var buttonClasses$1 = buttonClasses;
const _excluded$E = ["children", "color", "component", "disabled", "disableElevation", "disableFocusRipple", "endIcon", "focusVisibleClassName", "fullWidth", "size", "startIcon", "type", "variant"];
const useUtilityClasses$w = (ownerState) => {
  const {
    color,
    disableElevation,
    fullWidth,
    size,
    variant,
    classes
  } = ownerState;
  const slots = {
    root: ["root", variant, `${variant}${capitalize(color)}`, `size${capitalize(size)}`, `${variant}Size${capitalize(size)}`, color === "inherit" && "colorInherit", disableElevation && "disableElevation", fullWidth && "fullWidth"],
    label: ["label"],
    startIcon: ["startIcon", `iconSize${capitalize(size)}`],
    endIcon: ["endIcon", `iconSize${capitalize(size)}`]
  };
  const composedClasses = composeClasses(slots, getButtonUtilityClass, classes);
  return _extends$3({}, classes, composedClasses);
};
const commonIconStyles = (ownerState) => _extends$3({}, ownerState.size === "small" && {
  "& > *:nth-of-type(1)": {
    fontSize: 18
  }
}, ownerState.size === "medium" && {
  "& > *:nth-of-type(1)": {
    fontSize: 20
  }
}, ownerState.size === "large" && {
  "& > *:nth-of-type(1)": {
    fontSize: 22
  }
});
const ButtonRoot = styled$3(ButtonBase$1, {
  shouldForwardProp: (prop) => rootShouldForwardProp(prop) || prop === "classes",
  name: "MuiButton",
  slot: "Root",
  overridesResolver: (props, styles2) => {
    const {
      ownerState
    } = props;
    return [styles2.root, styles2[ownerState.variant], styles2[`${ownerState.variant}${capitalize(ownerState.color)}`], styles2[`size${capitalize(ownerState.size)}`], styles2[`${ownerState.variant}Size${capitalize(ownerState.size)}`], ownerState.color === "inherit" && styles2.colorInherit, ownerState.disableElevation && styles2.disableElevation, ownerState.fullWidth && styles2.fullWidth];
  }
})(({
  theme: theme2,
  ownerState
}) => _extends$3({}, theme2.typography.button, {
  minWidth: 64,
  padding: "6px 16px",
  borderRadius: theme2.shape.borderRadius,
  transition: theme2.transitions.create(["background-color", "box-shadow", "border-color", "color"], {
    duration: theme2.transitions.duration.short
  }),
  "&:hover": _extends$3({
    textDecoration: "none",
    backgroundColor: alpha(theme2.palette.text.primary, theme2.palette.action.hoverOpacity),
    "@media (hover: none)": {
      backgroundColor: "transparent"
    }
  }, ownerState.variant === "text" && ownerState.color !== "inherit" && {
    backgroundColor: alpha(theme2.palette[ownerState.color].main, theme2.palette.action.hoverOpacity),
    "@media (hover: none)": {
      backgroundColor: "transparent"
    }
  }, ownerState.variant === "outlined" && ownerState.color !== "inherit" && {
    border: `1px solid ${theme2.palette[ownerState.color].main}`,
    backgroundColor: alpha(theme2.palette[ownerState.color].main, theme2.palette.action.hoverOpacity),
    "@media (hover: none)": {
      backgroundColor: "transparent"
    }
  }, ownerState.variant === "contained" && {
    backgroundColor: theme2.palette.grey.A100,
    boxShadow: theme2.shadows[4],
    "@media (hover: none)": {
      boxShadow: theme2.shadows[2],
      backgroundColor: theme2.palette.grey[300]
    }
  }, ownerState.variant === "contained" && ownerState.color !== "inherit" && {
    backgroundColor: theme2.palette[ownerState.color].dark,
    "@media (hover: none)": {
      backgroundColor: theme2.palette[ownerState.color].main
    }
  }),
  "&:active": _extends$3({}, ownerState.variant === "contained" && {
    boxShadow: theme2.shadows[8]
  }),
  [`&.${buttonClasses$1.focusVisible}`]: _extends$3({}, ownerState.variant === "contained" && {
    boxShadow: theme2.shadows[6]
  }),
  [`&.${buttonClasses$1.disabled}`]: _extends$3({
    color: theme2.palette.action.disabled
  }, ownerState.variant === "outlined" && {
    border: `1px solid ${theme2.palette.action.disabledBackground}`
  }, ownerState.variant === "outlined" && ownerState.color === "secondary" && {
    border: `1px solid ${theme2.palette.action.disabled}`
  }, ownerState.variant === "contained" && {
    color: theme2.palette.action.disabled,
    boxShadow: theme2.shadows[0],
    backgroundColor: theme2.palette.action.disabledBackground
  })
}, ownerState.variant === "text" && {
  padding: "6px 8px"
}, ownerState.variant === "text" && ownerState.color !== "inherit" && {
  color: theme2.palette[ownerState.color].main
}, ownerState.variant === "outlined" && {
  padding: "5px 15px",
  border: `1px solid ${theme2.palette.mode === "light" ? "rgba(0, 0, 0, 0.23)" : "rgba(255, 255, 255, 0.23)"}`
}, ownerState.variant === "outlined" && ownerState.color !== "inherit" && {
  color: theme2.palette[ownerState.color].main,
  border: `1px solid ${alpha(theme2.palette[ownerState.color].main, 0.5)}`
}, ownerState.variant === "contained" && {
  color: theme2.palette.getContrastText(theme2.palette.grey[300]),
  backgroundColor: theme2.palette.grey[300],
  boxShadow: theme2.shadows[2]
}, ownerState.variant === "contained" && ownerState.color !== "inherit" && {
  color: theme2.palette[ownerState.color].contrastText,
  backgroundColor: theme2.palette[ownerState.color].main
}, ownerState.color === "inherit" && {
  color: "inherit",
  borderColor: "currentColor"
}, ownerState.size === "small" && ownerState.variant === "text" && {
  padding: "4px 5px",
  fontSize: theme2.typography.pxToRem(13)
}, ownerState.size === "large" && ownerState.variant === "text" && {
  padding: "8px 11px",
  fontSize: theme2.typography.pxToRem(15)
}, ownerState.size === "small" && ownerState.variant === "outlined" && {
  padding: "3px 9px",
  fontSize: theme2.typography.pxToRem(13)
}, ownerState.size === "large" && ownerState.variant === "outlined" && {
  padding: "7px 21px",
  fontSize: theme2.typography.pxToRem(15)
}, ownerState.size === "small" && ownerState.variant === "contained" && {
  padding: "4px 10px",
  fontSize: theme2.typography.pxToRem(13)
}, ownerState.size === "large" && ownerState.variant === "contained" && {
  padding: "8px 22px",
  fontSize: theme2.typography.pxToRem(15)
}, ownerState.fullWidth && {
  width: "100%"
}), ({
  ownerState
}) => ownerState.disableElevation && {
  boxShadow: "none",
  "&:hover": {
    boxShadow: "none"
  },
  [`&.${buttonClasses$1.focusVisible}`]: {
    boxShadow: "none"
  },
  "&:active": {
    boxShadow: "none"
  },
  [`&.${buttonClasses$1.disabled}`]: {
    boxShadow: "none"
  }
});
const ButtonStartIcon = styled$3("span", {
  name: "MuiButton",
  slot: "StartIcon",
  overridesResolver: (props, styles2) => {
    const {
      ownerState
    } = props;
    return [styles2.startIcon, styles2[`iconSize${capitalize(ownerState.size)}`]];
  }
})(({
  ownerState
}) => _extends$3({
  display: "inherit",
  marginRight: 8,
  marginLeft: -4
}, ownerState.size === "small" && {
  marginLeft: -2
}, commonIconStyles(ownerState)));
const ButtonEndIcon = styled$3("span", {
  name: "MuiButton",
  slot: "EndIcon",
  overridesResolver: (props, styles2) => {
    const {
      ownerState
    } = props;
    return [styles2.endIcon, styles2[`iconSize${capitalize(ownerState.size)}`]];
  }
})(({
  ownerState
}) => _extends$3({
  display: "inherit",
  marginRight: -4,
  marginLeft: 8
}, ownerState.size === "small" && {
  marginRight: -2
}, commonIconStyles(ownerState)));
const Button = /* @__PURE__ */ react.exports.forwardRef(function Button2(inProps, ref) {
  const props = useThemeProps({
    props: inProps,
    name: "MuiButton"
  });
  const {
    children,
    color = "primary",
    component = "button",
    disabled = false,
    disableElevation = false,
    disableFocusRipple = false,
    endIcon: endIconProp,
    focusVisibleClassName,
    fullWidth = false,
    size = "medium",
    startIcon: startIconProp,
    type,
    variant = "text"
  } = props, other = _objectWithoutPropertiesLoose$1(props, _excluded$E);
  const ownerState = _extends$3({}, props, {
    color,
    component,
    disabled,
    disableElevation,
    disableFocusRipple,
    fullWidth,
    size,
    type,
    variant
  });
  const classes = useUtilityClasses$w(ownerState);
  const startIcon = startIconProp && /* @__PURE__ */ jsx(ButtonStartIcon, {
    className: classes.startIcon,
    ownerState,
    children: startIconProp
  });
  const endIcon = endIconProp && /* @__PURE__ */ jsx(ButtonEndIcon, {
    className: classes.endIcon,
    ownerState,
    children: endIconProp
  });
  return /* @__PURE__ */ jsxs(ButtonRoot, _extends$3({
    ownerState,
    component,
    disabled,
    focusRipple: !disableFocusRipple,
    focusVisibleClassName: clsx(classes.focusVisible, focusVisibleClassName),
    ref,
    type
  }, other, {
    classes,
    children: [startIcon, children, endIcon]
  }));
});
var Button$1 = Button;
var KeyboardArrowUp = {};
var _interopRequireDefault$d = interopRequireDefault.exports;
Object.defineProperty(KeyboardArrowUp, "__esModule", {
  value: true
});
var default_1$d = KeyboardArrowUp.default = void 0;
var _createSvgIcon$d = _interopRequireDefault$d(createSvgIcon$1);
var _jsxRuntime$d = require$$2;
var _default$d = (0, _createSvgIcon$d.default)(/* @__PURE__ */ (0, _jsxRuntime$d.jsx)("path", {
  d: "M7.41 15.41 12 10.83l4.59 4.58L18 14l-6-6-6 6z"
}), "KeyboardArrowUp");
default_1$d = KeyboardArrowUp.default = _default$d;
const StyledFooter = default_1$e("footer")(({
  theme: theme2
}) => ({
  background: theme2.palette.primary.light,
  padding: 20,
  display: "flex",
  justifyContent: "flex-end"
}));
const UpButton = default_1$e(Button$1)(({
  theme: theme2
}) => ({
  color: theme2.palette.primary.dark
}));
const Footer = () => {
  return /* @__PURE__ */ jsx(StyledFooter, {
    children: /* @__PURE__ */ jsxs(UpButton, {
      onClick: () => {
        window.scrollTo(0, 0);
      },
      children: [/* @__PURE__ */ jsx(default_1$d, {}), "up"]
    })
  });
};
var Code = {};
var _interopRequireDefault$c = interopRequireDefault.exports;
Object.defineProperty(Code, "__esModule", {
  value: true
});
var default_1$c = Code.default = void 0;
var _createSvgIcon$c = _interopRequireDefault$c(createSvgIcon$1);
var _jsxRuntime$c = require$$2;
var _default$c = (0, _createSvgIcon$c.default)(/* @__PURE__ */ (0, _jsxRuntime$c.jsx)("path", {
  d: "M9.4 16.6 4.8 12l4.6-4.6L8 6l-6 6 6 6 1.4-1.4zm5.2 0 4.6-4.6-4.6-4.6L16 6l6 6-6 6-1.4-1.4z"
}), "Code");
default_1$c = Code.default = _default$c;
var Edit = {};
var _interopRequireDefault$b = interopRequireDefault.exports;
Object.defineProperty(Edit, "__esModule", {
  value: true
});
var default_1$b = Edit.default = void 0;
var _createSvgIcon$b = _interopRequireDefault$b(createSvgIcon$1);
var _jsxRuntime$b = require$$2;
var _default$b = (0, _createSvgIcon$b.default)(/* @__PURE__ */ (0, _jsxRuntime$b.jsx)("path", {
  d: "M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34a.9959.9959 0 0 0-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"
}), "Edit");
default_1$b = Edit.default = _default$b;
var PostAdd = {};
var _interopRequireDefault$a = interopRequireDefault.exports;
Object.defineProperty(PostAdd, "__esModule", {
  value: true
});
var default_1$a = PostAdd.default = void 0;
var _createSvgIcon$a = _interopRequireDefault$a(createSvgIcon$1);
var _jsxRuntime$a = require$$2;
var _default$a = (0, _createSvgIcon$a.default)([/* @__PURE__ */ (0, _jsxRuntime$a.jsx)("path", {
  d: "M17 19.22H5V7h7V5H5c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2v-7h-2v7.22z"
}, "0"), /* @__PURE__ */ (0, _jsxRuntime$a.jsx)("path", {
  d: "M19 2h-2v3h-3c.01.01 0 2 0 2h3v2.99c.01.01 2 0 2 0V7h3V5h-3V2zM7 9h8v2H7zm0 3v2h8v-2h-3zm0 3h8v2H7z"
}, "1")], "PostAdd");
default_1$a = PostAdd.default = _default$a;
var Search = {};
var _interopRequireDefault$9 = interopRequireDefault.exports;
Object.defineProperty(Search, "__esModule", {
  value: true
});
var default_1$9 = Search.default = void 0;
var _createSvgIcon$9 = _interopRequireDefault$9(createSvgIcon$1);
var _jsxRuntime$9 = require$$2;
var _default$9 = (0, _createSvgIcon$9.default)(/* @__PURE__ */ (0, _jsxRuntime$9.jsx)("path", {
  d: "M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"
}), "Search");
default_1$9 = Search.default = _default$9;
function getLinearProgressUtilityClass(slot) {
  return generateUtilityClass("MuiLinearProgress", slot);
}
generateUtilityClasses("MuiLinearProgress", ["root", "colorPrimary", "colorSecondary", "determinate", "indeterminate", "buffer", "query", "dashed", "dashedColorPrimary", "dashedColorSecondary", "bar", "barColorPrimary", "barColorSecondary", "bar1Indeterminate", "bar1Determinate", "bar1Buffer", "bar2Indeterminate", "bar2Buffer"]);
const _excluded$D = ["className", "color", "value", "valueBuffer", "variant"];
let _ = (t2) => t2, _t, _t2, _t3, _t4, _t5, _t6;
const TRANSITION_DURATION = 4;
const indeterminate1Keyframe = keyframes(_t || (_t = _`
  0% {
    left: -35%;
    right: 100%;
  }

  60% {
    left: 100%;
    right: -90%;
  }

  100% {
    left: 100%;
    right: -90%;
  }
`));
const indeterminate2Keyframe = keyframes(_t2 || (_t2 = _`
  0% {
    left: -200%;
    right: 100%;
  }

  60% {
    left: 107%;
    right: -8%;
  }

  100% {
    left: 107%;
    right: -8%;
  }
`));
const bufferKeyframe = keyframes(_t3 || (_t3 = _`
  0% {
    opacity: 1;
    background-position: 0 -23px;
  }

  60% {
    opacity: 0;
    background-position: 0 -23px;
  }

  100% {
    opacity: 1;
    background-position: -200px -23px;
  }
`));
const useUtilityClasses$v = (ownerState) => {
  const {
    classes,
    variant,
    color
  } = ownerState;
  const slots = {
    root: ["root", `color${capitalize(color)}`, variant],
    dashed: ["dashed", `dashedColor${capitalize(color)}`],
    bar1: ["bar", `barColor${capitalize(color)}`, (variant === "indeterminate" || variant === "query") && "bar1Indeterminate", variant === "determinate" && "bar1Determinate", variant === "buffer" && "bar1Buffer"],
    bar2: ["bar", variant !== "buffer" && `barColor${capitalize(color)}`, variant === "buffer" && `color${capitalize(color)}`, (variant === "indeterminate" || variant === "query") && "bar2Indeterminate", variant === "buffer" && "bar2Buffer"]
  };
  return composeClasses(slots, getLinearProgressUtilityClass, classes);
};
const getColorShade = (theme2, color) => {
  if (color === "inherit") {
    return "currentColor";
  }
  return theme2.palette.mode === "light" ? lighten(theme2.palette[color].main, 0.62) : darken(theme2.palette[color].main, 0.5);
};
const LinearProgressRoot = styled$3("span", {
  name: "MuiLinearProgress",
  slot: "Root",
  overridesResolver: (props, styles2) => {
    const {
      ownerState
    } = props;
    return [styles2.root, styles2[`color${capitalize(ownerState.color)}`], styles2[ownerState.variant]];
  }
})(({
  ownerState,
  theme: theme2
}) => _extends$3({
  position: "relative",
  overflow: "hidden",
  display: "block",
  height: 4,
  zIndex: 0,
  "@media print": {
    colorAdjust: "exact"
  },
  backgroundColor: getColorShade(theme2, ownerState.color)
}, ownerState.color === "inherit" && ownerState.variant !== "buffer" && {
  backgroundColor: "none",
  "&::before": {
    content: '""',
    position: "absolute",
    left: 0,
    top: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "currentColor",
    opacity: 0.3
  }
}, ownerState.variant === "buffer" && {
  backgroundColor: "transparent"
}, ownerState.variant === "query" && {
  transform: "rotate(180deg)"
}));
const LinearProgressDashed = styled$3("span", {
  name: "MuiLinearProgress",
  slot: "Dashed",
  overridesResolver: (props, styles2) => {
    const {
      ownerState
    } = props;
    return [styles2.dashed, styles2[`dashedColor${capitalize(ownerState.color)}`]];
  }
})(({
  ownerState,
  theme: theme2
}) => {
  const backgroundColor = getColorShade(theme2, ownerState.color);
  return _extends$3({
    position: "absolute",
    marginTop: 0,
    height: "100%",
    width: "100%"
  }, ownerState.color === "inherit" && {
    opacity: 0.3
  }, {
    backgroundImage: `radial-gradient(${backgroundColor} 0%, ${backgroundColor} 16%, transparent 42%)`,
    backgroundSize: "10px 10px",
    backgroundPosition: "0 -23px"
  });
}, css(_t4 || (_t4 = _`
    animation: ${0} 3s infinite linear;
  `), bufferKeyframe));
const LinearProgressBar1 = styled$3("span", {
  name: "MuiLinearProgress",
  slot: "Bar1",
  overridesResolver: (props, styles2) => {
    const {
      ownerState
    } = props;
    return [styles2.bar, styles2[`barColor${capitalize(ownerState.color)}`], (ownerState.variant === "indeterminate" || ownerState.variant === "query") && styles2.bar1Indeterminate, ownerState.variant === "determinate" && styles2.bar1Determinate, ownerState.variant === "buffer" && styles2.bar1Buffer];
  }
})(({
  ownerState,
  theme: theme2
}) => _extends$3({
  width: "100%",
  position: "absolute",
  left: 0,
  bottom: 0,
  top: 0,
  transition: "transform 0.2s linear",
  transformOrigin: "left",
  backgroundColor: ownerState.color === "inherit" ? "currentColor" : theme2.palette[ownerState.color].main
}, ownerState.variant === "determinate" && {
  transition: `transform .${TRANSITION_DURATION}s linear`
}, ownerState.variant === "buffer" && {
  zIndex: 1,
  transition: `transform .${TRANSITION_DURATION}s linear`
}), ({
  ownerState
}) => (ownerState.variant === "indeterminate" || ownerState.variant === "query") && css(_t5 || (_t5 = _`
      width: auto;
      animation: ${0} 2.1s cubic-bezier(0.65, 0.815, 0.735, 0.395) infinite;
    `), indeterminate1Keyframe));
const LinearProgressBar2 = styled$3("span", {
  name: "MuiLinearProgress",
  slot: "Bar2",
  overridesResolver: (props, styles2) => {
    const {
      ownerState
    } = props;
    return [styles2.bar, styles2[`barColor${capitalize(ownerState.color)}`], (ownerState.variant === "indeterminate" || ownerState.variant === "query") && styles2.bar2Indeterminate, ownerState.variant === "buffer" && styles2.bar2Buffer];
  }
})(({
  ownerState,
  theme: theme2
}) => _extends$3({
  width: "100%",
  position: "absolute",
  left: 0,
  bottom: 0,
  top: 0,
  transition: "transform 0.2s linear",
  transformOrigin: "left"
}, ownerState.variant !== "buffer" && {
  backgroundColor: ownerState.color === "inherit" ? "currentColor" : theme2.palette[ownerState.color].main
}, ownerState.color === "inherit" && {
  opacity: 0.3
}, ownerState.variant === "buffer" && {
  backgroundColor: getColorShade(theme2, ownerState.color),
  transition: `transform .${TRANSITION_DURATION}s linear`
}), ({
  ownerState
}) => (ownerState.variant === "indeterminate" || ownerState.variant === "query") && css(_t6 || (_t6 = _`
      width: auto;
      animation: ${0} 2.1s cubic-bezier(0.165, 0.84, 0.44, 1) 1.15s infinite;
    `), indeterminate2Keyframe));
const LinearProgress = /* @__PURE__ */ react.exports.forwardRef(function LinearProgress2(inProps, ref) {
  const props = useThemeProps({
    props: inProps,
    name: "MuiLinearProgress"
  });
  const {
    className,
    color = "primary",
    value,
    valueBuffer,
    variant = "indeterminate"
  } = props, other = _objectWithoutPropertiesLoose$1(props, _excluded$D);
  const ownerState = _extends$3({}, props, {
    color,
    variant
  });
  const classes = useUtilityClasses$v(ownerState);
  const theme2 = useTheme();
  const rootProps = {};
  const inlineStyles = {
    bar1: {},
    bar2: {}
  };
  if (variant === "determinate" || variant === "buffer") {
    if (value !== void 0) {
      rootProps["aria-valuenow"] = Math.round(value);
      rootProps["aria-valuemin"] = 0;
      rootProps["aria-valuemax"] = 100;
      let transform = value - 100;
      if (theme2.direction === "rtl") {
        transform = -transform;
      }
      inlineStyles.bar1.transform = `translateX(${transform}%)`;
    }
  }
  if (variant === "buffer") {
    if (valueBuffer !== void 0) {
      let transform = (valueBuffer || 0) - 100;
      if (theme2.direction === "rtl") {
        transform = -transform;
      }
      inlineStyles.bar2.transform = `translateX(${transform}%)`;
    }
  }
  return /* @__PURE__ */ jsxs(LinearProgressRoot, _extends$3({
    className: clsx(classes.root, className),
    ownerState,
    role: "progressbar"
  }, rootProps, {
    ref
  }, other, {
    children: [variant === "buffer" ? /* @__PURE__ */ jsx(LinearProgressDashed, {
      className: classes.dashed,
      ownerState
    }) : null, /* @__PURE__ */ jsx(LinearProgressBar1, {
      className: classes.bar1,
      ownerState,
      style: inlineStyles.bar1
    }), variant === "determinate" ? null : /* @__PURE__ */ jsx(LinearProgressBar2, {
      className: classes.bar2,
      ownerState,
      style: inlineStyles.bar2
    })]
  }));
});
var LinearProgress$1 = LinearProgress;
var reactIs_production_min = {};
/** @license React v17.0.2
 * react-is.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var b = 60103, c = 60106, d = 60107, e = 60108, f = 60114, g = 60109, h = 60110, k = 60112, l = 60113, m = 60120, n = 60115, p = 60116, q = 60121, r = 60122, u = 60117, v = 60129, w = 60131;
if (typeof Symbol === "function" && Symbol.for) {
  var x = Symbol.for;
  b = x("react.element");
  c = x("react.portal");
  d = x("react.fragment");
  e = x("react.strict_mode");
  f = x("react.profiler");
  g = x("react.provider");
  h = x("react.context");
  k = x("react.forward_ref");
  l = x("react.suspense");
  m = x("react.suspense_list");
  n = x("react.memo");
  p = x("react.lazy");
  q = x("react.block");
  r = x("react.server.block");
  u = x("react.fundamental");
  v = x("react.debug_trace_mode");
  w = x("react.legacy_hidden");
}
function y(a) {
  if (typeof a === "object" && a !== null) {
    var t2 = a.$$typeof;
    switch (t2) {
      case b:
        switch (a = a.type, a) {
          case d:
          case f:
          case e:
          case l:
          case m:
            return a;
          default:
            switch (a = a && a.$$typeof, a) {
              case h:
              case k:
              case p:
              case n:
              case g:
                return a;
              default:
                return t2;
            }
        }
      case c:
        return t2;
    }
  }
}
var z = g, A = b, B = k, C = d, D = p, E = n, F = c, G = f, H = e, I = l;
reactIs_production_min.ContextConsumer = h;
reactIs_production_min.ContextProvider = z;
reactIs_production_min.Element = A;
reactIs_production_min.ForwardRef = B;
reactIs_production_min.Fragment = C;
reactIs_production_min.Lazy = D;
reactIs_production_min.Memo = E;
reactIs_production_min.Portal = F;
reactIs_production_min.Profiler = G;
reactIs_production_min.StrictMode = H;
reactIs_production_min.Suspense = I;
reactIs_production_min.isAsyncMode = function() {
  return false;
};
reactIs_production_min.isConcurrentMode = function() {
  return false;
};
reactIs_production_min.isContextConsumer = function(a) {
  return y(a) === h;
};
reactIs_production_min.isContextProvider = function(a) {
  return y(a) === g;
};
reactIs_production_min.isElement = function(a) {
  return typeof a === "object" && a !== null && a.$$typeof === b;
};
reactIs_production_min.isForwardRef = function(a) {
  return y(a) === k;
};
reactIs_production_min.isFragment = function(a) {
  return y(a) === d;
};
reactIs_production_min.isLazy = function(a) {
  return y(a) === p;
};
reactIs_production_min.isMemo = function(a) {
  return y(a) === n;
};
reactIs_production_min.isPortal = function(a) {
  return y(a) === c;
};
reactIs_production_min.isProfiler = function(a) {
  return y(a) === f;
};
reactIs_production_min.isStrictMode = function(a) {
  return y(a) === e;
};
reactIs_production_min.isSuspense = function(a) {
  return y(a) === l;
};
reactIs_production_min.isValidElementType = function(a) {
  return typeof a === "string" || typeof a === "function" || a === d || a === f || a === v || a === e || a === l || a === m || a === w || typeof a === "object" && a !== null && (a.$$typeof === p || a.$$typeof === n || a.$$typeof === g || a.$$typeof === h || a.$$typeof === k || a.$$typeof === u || a.$$typeof === q || a[0] === r) ? true : false;
};
reactIs_production_min.typeOf = y;
const ListContext = /* @__PURE__ */ react.exports.createContext({});
var ListContext$1 = ListContext;
function getListUtilityClass(slot) {
  return generateUtilityClass("MuiList", slot);
}
generateUtilityClasses("MuiList", ["root", "padding", "dense", "subheader"]);
const _excluded$C = ["children", "className", "component", "dense", "disablePadding", "subheader"];
const useUtilityClasses$u = (ownerState) => {
  const {
    classes,
    disablePadding,
    dense,
    subheader
  } = ownerState;
  const slots = {
    root: ["root", !disablePadding && "padding", dense && "dense", subheader && "subheader"]
  };
  return composeClasses(slots, getListUtilityClass, classes);
};
const ListRoot = styled$3("ul", {
  name: "MuiList",
  slot: "Root",
  overridesResolver: (props, styles2) => {
    const {
      ownerState
    } = props;
    return [styles2.root, !ownerState.disablePadding && styles2.padding, ownerState.dense && styles2.dense, ownerState.subheader && styles2.subheader];
  }
})(({
  ownerState
}) => _extends$3({
  listStyle: "none",
  margin: 0,
  padding: 0,
  position: "relative"
}, !ownerState.disablePadding && {
  paddingTop: 8,
  paddingBottom: 8
}, ownerState.subheader && {
  paddingTop: 0
}));
const List = /* @__PURE__ */ react.exports.forwardRef(function List2(inProps, ref) {
  const props = useThemeProps({
    props: inProps,
    name: "MuiList"
  });
  const {
    children,
    className,
    component = "ul",
    dense = false,
    disablePadding = false,
    subheader
  } = props, other = _objectWithoutPropertiesLoose$1(props, _excluded$C);
  const context = react.exports.useMemo(() => ({
    dense
  }), [dense]);
  const ownerState = _extends$3({}, props, {
    component,
    dense,
    disablePadding
  });
  const classes = useUtilityClasses$u(ownerState);
  return /* @__PURE__ */ jsx(ListContext$1.Provider, {
    value: context,
    children: /* @__PURE__ */ jsxs(ListRoot, _extends$3({
      as: component,
      className: clsx(classes.root, className),
      ref,
      ownerState
    }, other, {
      children: [subheader, children]
    }))
  });
});
var List$1 = List;
const _excluded$B = ["actions", "autoFocus", "autoFocusItem", "children", "className", "disabledItemsFocusable", "disableListWrap", "onKeyDown", "variant"];
function nextItem(list, item, disableListWrap) {
  if (list === item) {
    return list.firstChild;
  }
  if (item && item.nextElementSibling) {
    return item.nextElementSibling;
  }
  return disableListWrap ? null : list.firstChild;
}
function previousItem(list, item, disableListWrap) {
  if (list === item) {
    return disableListWrap ? list.firstChild : list.lastChild;
  }
  if (item && item.previousElementSibling) {
    return item.previousElementSibling;
  }
  return disableListWrap ? null : list.lastChild;
}
function textCriteriaMatches(nextFocus, textCriteria) {
  if (textCriteria === void 0) {
    return true;
  }
  let text = nextFocus.innerText;
  if (text === void 0) {
    text = nextFocus.textContent;
  }
  text = text.trim().toLowerCase();
  if (text.length === 0) {
    return false;
  }
  if (textCriteria.repeating) {
    return text[0] === textCriteria.keys[0];
  }
  return text.indexOf(textCriteria.keys.join("")) === 0;
}
function moveFocus(list, currentFocus, disableListWrap, disabledItemsFocusable, traversalFunction, textCriteria) {
  let wrappedOnce = false;
  let nextFocus = traversalFunction(list, currentFocus, currentFocus ? disableListWrap : false);
  while (nextFocus) {
    if (nextFocus === list.firstChild) {
      if (wrappedOnce) {
        return false;
      }
      wrappedOnce = true;
    }
    const nextFocusDisabled = disabledItemsFocusable ? false : nextFocus.disabled || nextFocus.getAttribute("aria-disabled") === "true";
    if (!nextFocus.hasAttribute("tabindex") || !textCriteriaMatches(nextFocus, textCriteria) || nextFocusDisabled) {
      nextFocus = traversalFunction(list, nextFocus, disableListWrap);
    } else {
      nextFocus.focus();
      return true;
    }
  }
  return false;
}
const MenuList = /* @__PURE__ */ react.exports.forwardRef(function MenuList2(props, ref) {
  const {
    actions,
    autoFocus = false,
    autoFocusItem = false,
    children,
    className,
    disabledItemsFocusable = false,
    disableListWrap = false,
    onKeyDown,
    variant = "selectedMenu"
  } = props, other = _objectWithoutPropertiesLoose$1(props, _excluded$B);
  const listRef = react.exports.useRef(null);
  const textCriteriaRef = react.exports.useRef({
    keys: [],
    repeating: true,
    previousKeyMatched: true,
    lastTime: null
  });
  useEnhancedEffect$1(() => {
    if (autoFocus) {
      listRef.current.focus();
    }
  }, [autoFocus]);
  react.exports.useImperativeHandle(actions, () => ({
    adjustStyleForScrollbar: (containerElement, theme2) => {
      const noExplicitWidth = !listRef.current.style.width;
      if (containerElement.clientHeight < listRef.current.clientHeight && noExplicitWidth) {
        const scrollbarSize = `${getScrollbarSize(ownerDocument(containerElement))}px`;
        listRef.current.style[theme2.direction === "rtl" ? "paddingLeft" : "paddingRight"] = scrollbarSize;
        listRef.current.style.width = `calc(100% + ${scrollbarSize})`;
      }
      return listRef.current;
    }
  }), []);
  const handleKeyDown2 = (event) => {
    const list = listRef.current;
    const key = event.key;
    const currentFocus = ownerDocument(list).activeElement;
    if (key === "ArrowDown") {
      event.preventDefault();
      moveFocus(list, currentFocus, disableListWrap, disabledItemsFocusable, nextItem);
    } else if (key === "ArrowUp") {
      event.preventDefault();
      moveFocus(list, currentFocus, disableListWrap, disabledItemsFocusable, previousItem);
    } else if (key === "Home") {
      event.preventDefault();
      moveFocus(list, null, disableListWrap, disabledItemsFocusable, nextItem);
    } else if (key === "End") {
      event.preventDefault();
      moveFocus(list, null, disableListWrap, disabledItemsFocusable, previousItem);
    } else if (key.length === 1) {
      const criteria = textCriteriaRef.current;
      const lowerKey = key.toLowerCase();
      const currTime = performance.now();
      if (criteria.keys.length > 0) {
        if (currTime - criteria.lastTime > 500) {
          criteria.keys = [];
          criteria.repeating = true;
          criteria.previousKeyMatched = true;
        } else if (criteria.repeating && lowerKey !== criteria.keys[0]) {
          criteria.repeating = false;
        }
      }
      criteria.lastTime = currTime;
      criteria.keys.push(lowerKey);
      const keepFocusOnCurrent = currentFocus && !criteria.repeating && textCriteriaMatches(currentFocus, criteria);
      if (criteria.previousKeyMatched && (keepFocusOnCurrent || moveFocus(list, currentFocus, false, disabledItemsFocusable, nextItem, criteria))) {
        event.preventDefault();
      } else {
        criteria.previousKeyMatched = false;
      }
    }
    if (onKeyDown) {
      onKeyDown(event);
    }
  };
  const handleRef = useForkRef(listRef, ref);
  let activeItemIndex = -1;
  react.exports.Children.forEach(children, (child, index2) => {
    if (!/* @__PURE__ */ react.exports.isValidElement(child)) {
      return;
    }
    if (!child.props.disabled) {
      if (variant === "selectedMenu" && child.props.selected) {
        activeItemIndex = index2;
      } else if (activeItemIndex === -1) {
        activeItemIndex = index2;
      }
    }
  });
  const items = react.exports.Children.map(children, (child, index2) => {
    if (index2 === activeItemIndex) {
      const newChildProps = {};
      if (autoFocusItem) {
        newChildProps.autoFocus = true;
      }
      if (child.props.tabIndex === void 0 && variant === "selectedMenu") {
        newChildProps.tabIndex = 0;
      }
      return /* @__PURE__ */ react.exports.cloneElement(child, newChildProps);
    }
    return child;
  });
  return /* @__PURE__ */ jsx(List$1, _extends$3({
    role: "menu",
    ref: handleRef,
    className,
    onKeyDown: handleKeyDown2,
    tabIndex: autoFocus ? 0 : -1
  }, other, {
    children: items
  }));
});
var MenuList$1 = MenuList;
const reflow = (node) => node.scrollTop;
function getTransitionProps(props, options) {
  var _style$transitionDura, _style$transitionTimi;
  const {
    timeout,
    easing,
    style: style2 = {}
  } = props;
  return {
    duration: (_style$transitionDura = style2.transitionDuration) != null ? _style$transitionDura : typeof timeout === "number" ? timeout : timeout[options.mode] || 0,
    easing: (_style$transitionTimi = style2.transitionTimingFunction) != null ? _style$transitionTimi : typeof easing === "object" ? easing[options.mode] : easing,
    delay: style2.transitionDelay
  };
}
const _excluded$A = ["addEndListener", "appear", "children", "easing", "in", "onEnter", "onEntered", "onEntering", "onExit", "onExited", "onExiting", "style", "timeout", "TransitionComponent"];
function getScale(value) {
  return `scale(${value}, ${value ** 2})`;
}
const styles$2 = {
  entering: {
    opacity: 1,
    transform: getScale(1)
  },
  entered: {
    opacity: 1,
    transform: "none"
  }
};
const Grow = /* @__PURE__ */ react.exports.forwardRef(function Grow2(props, ref) {
  const {
    addEndListener,
    appear = true,
    children,
    easing,
    in: inProp,
    onEnter,
    onEntered,
    onEntering,
    onExit,
    onExited,
    onExiting,
    style: style2,
    timeout = "auto",
    TransitionComponent = Transition$1
  } = props, other = _objectWithoutPropertiesLoose$1(props, _excluded$A);
  const timer = react.exports.useRef();
  const autoTimeout = react.exports.useRef();
  const theme2 = useTheme();
  const nodeRef = react.exports.useRef(null);
  const foreignRef = useForkRef(children.ref, ref);
  const handleRef = useForkRef(nodeRef, foreignRef);
  const normalizedTransitionCallback = (callback) => (maybeIsAppearing) => {
    if (callback) {
      const node = nodeRef.current;
      if (maybeIsAppearing === void 0) {
        callback(node);
      } else {
        callback(node, maybeIsAppearing);
      }
    }
  };
  const handleEntering = normalizedTransitionCallback(onEntering);
  const handleEnter = normalizedTransitionCallback((node, isAppearing) => {
    reflow(node);
    const {
      duration: transitionDuration,
      delay,
      easing: transitionTimingFunction
    } = getTransitionProps({
      style: style2,
      timeout,
      easing
    }, {
      mode: "enter"
    });
    let duration2;
    if (timeout === "auto") {
      duration2 = theme2.transitions.getAutoHeightDuration(node.clientHeight);
      autoTimeout.current = duration2;
    } else {
      duration2 = transitionDuration;
    }
    node.style.transition = [theme2.transitions.create("opacity", {
      duration: duration2,
      delay
    }), theme2.transitions.create("transform", {
      duration: duration2 * 0.666,
      delay,
      easing: transitionTimingFunction
    })].join(",");
    if (onEnter) {
      onEnter(node, isAppearing);
    }
  });
  const handleEntered = normalizedTransitionCallback(onEntered);
  const handleExiting = normalizedTransitionCallback(onExiting);
  const handleExit = normalizedTransitionCallback((node) => {
    const {
      duration: transitionDuration,
      delay,
      easing: transitionTimingFunction
    } = getTransitionProps({
      style: style2,
      timeout,
      easing
    }, {
      mode: "exit"
    });
    let duration2;
    if (timeout === "auto") {
      duration2 = theme2.transitions.getAutoHeightDuration(node.clientHeight);
      autoTimeout.current = duration2;
    } else {
      duration2 = transitionDuration;
    }
    node.style.transition = [theme2.transitions.create("opacity", {
      duration: duration2,
      delay
    }), theme2.transitions.create("transform", {
      duration: duration2 * 0.666,
      delay: delay || duration2 * 0.333,
      easing: transitionTimingFunction
    })].join(",");
    node.style.opacity = "0";
    node.style.transform = getScale(0.75);
    if (onExit) {
      onExit(node);
    }
  });
  const handleExited = normalizedTransitionCallback(onExited);
  const handleAddEndListener = (next) => {
    if (timeout === "auto") {
      timer.current = setTimeout(next, autoTimeout.current || 0);
    }
    if (addEndListener) {
      addEndListener(nodeRef.current, next);
    }
  };
  react.exports.useEffect(() => {
    return () => {
      clearTimeout(timer.current);
    };
  }, []);
  return /* @__PURE__ */ jsx(TransitionComponent, _extends$3({
    appear,
    in: inProp,
    nodeRef,
    onEnter: handleEnter,
    onEntered: handleEntered,
    onEntering: handleEntering,
    onExit: handleExit,
    onExited: handleExited,
    onExiting: handleExiting,
    addEndListener: handleAddEndListener,
    timeout: timeout === "auto" ? null : timeout
  }, other, {
    children: (state, childProps) => {
      return /* @__PURE__ */ react.exports.cloneElement(children, _extends$3({
        style: _extends$3({
          opacity: 0,
          transform: getScale(0.75),
          visibility: state === "exited" && !inProp ? "hidden" : void 0
        }, styles$2[state], style2, children.props.style),
        ref: handleRef
      }, childProps));
    }
  }));
});
Grow.muiSupportAuto = true;
var Grow$1 = Grow;
const _excluded$z = ["addEndListener", "appear", "children", "easing", "in", "onEnter", "onEntered", "onEntering", "onExit", "onExited", "onExiting", "style", "timeout", "TransitionComponent"];
const styles$1 = {
  entering: {
    opacity: 1
  },
  entered: {
    opacity: 1
  }
};
const defaultTimeout = {
  enter: duration.enteringScreen,
  exit: duration.leavingScreen
};
const Fade = /* @__PURE__ */ react.exports.forwardRef(function Fade2(props, ref) {
  const {
    addEndListener,
    appear = true,
    children,
    easing,
    in: inProp,
    onEnter,
    onEntered,
    onEntering,
    onExit,
    onExited,
    onExiting,
    style: style2,
    timeout = defaultTimeout,
    TransitionComponent = Transition$1
  } = props, other = _objectWithoutPropertiesLoose$1(props, _excluded$z);
  const theme2 = useTheme();
  const nodeRef = react.exports.useRef(null);
  const foreignRef = useForkRef(children.ref, ref);
  const handleRef = useForkRef(nodeRef, foreignRef);
  const normalizedTransitionCallback = (callback) => (maybeIsAppearing) => {
    if (callback) {
      const node = nodeRef.current;
      if (maybeIsAppearing === void 0) {
        callback(node);
      } else {
        callback(node, maybeIsAppearing);
      }
    }
  };
  const handleEntering = normalizedTransitionCallback(onEntering);
  const handleEnter = normalizedTransitionCallback((node, isAppearing) => {
    reflow(node);
    const transitionProps = getTransitionProps({
      style: style2,
      timeout,
      easing
    }, {
      mode: "enter"
    });
    node.style.webkitTransition = theme2.transitions.create("opacity", transitionProps);
    node.style.transition = theme2.transitions.create("opacity", transitionProps);
    if (onEnter) {
      onEnter(node, isAppearing);
    }
  });
  const handleEntered = normalizedTransitionCallback(onEntered);
  const handleExiting = normalizedTransitionCallback(onExiting);
  const handleExit = normalizedTransitionCallback((node) => {
    const transitionProps = getTransitionProps({
      style: style2,
      timeout,
      easing
    }, {
      mode: "exit"
    });
    node.style.webkitTransition = theme2.transitions.create("opacity", transitionProps);
    node.style.transition = theme2.transitions.create("opacity", transitionProps);
    if (onExit) {
      onExit(node);
    }
  });
  const handleExited = normalizedTransitionCallback(onExited);
  const handleAddEndListener = (next) => {
    if (addEndListener) {
      addEndListener(nodeRef.current, next);
    }
  };
  return /* @__PURE__ */ jsx(TransitionComponent, _extends$3({
    appear,
    in: inProp,
    nodeRef,
    onEnter: handleEnter,
    onEntered: handleEntered,
    onEntering: handleEntering,
    onExit: handleExit,
    onExited: handleExited,
    onExiting: handleExiting,
    addEndListener: handleAddEndListener,
    timeout
  }, other, {
    children: (state, childProps) => {
      return /* @__PURE__ */ react.exports.cloneElement(children, _extends$3({
        style: _extends$3({
          opacity: 0,
          visibility: state === "exited" && !inProp ? "hidden" : void 0
        }, styles$1[state], style2, children.props.style),
        ref: handleRef
      }, childProps));
    }
  }));
});
var Fade$1 = Fade;
const _excluded$y = ["children", "components", "componentsProps", "className", "invisible", "open", "transitionDuration", "TransitionComponent"];
const extendUtilityClasses$1 = (ownerState) => {
  const {
    classes
  } = ownerState;
  return classes;
};
const BackdropRoot = styled$3("div", {
  name: "MuiBackdrop",
  slot: "Root",
  overridesResolver: (props, styles2) => {
    const {
      ownerState
    } = props;
    return [styles2.root, ownerState.invisible && styles2.invisible];
  }
})(({
  ownerState
}) => _extends$3({
  position: "fixed",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  right: 0,
  bottom: 0,
  top: 0,
  left: 0,
  backgroundColor: "rgba(0, 0, 0, 0.5)",
  WebkitTapHighlightColor: "transparent"
}, ownerState.invisible && {
  backgroundColor: "transparent"
}));
const Backdrop = /* @__PURE__ */ react.exports.forwardRef(function Backdrop2(inProps, ref) {
  var _componentsProps$root;
  const props = useThemeProps({
    props: inProps,
    name: "MuiBackdrop"
  });
  const {
    children,
    components = {},
    componentsProps = {},
    className,
    invisible = false,
    open,
    transitionDuration,
    TransitionComponent = Fade$1
  } = props, other = _objectWithoutPropertiesLoose$1(props, _excluded$y);
  const ownerState = _extends$3({}, props, {
    invisible
  });
  const classes = extendUtilityClasses$1(ownerState);
  return /* @__PURE__ */ jsx(TransitionComponent, _extends$3({
    in: open,
    timeout: transitionDuration
  }, other, {
    children: /* @__PURE__ */ jsx(BackdropUnstyled$1, {
      className,
      invisible,
      components: _extends$3({
        Root: BackdropRoot
      }, components),
      componentsProps: {
        root: _extends$3({}, componentsProps.root, (!components.Root || !isHostComponent(components.Root)) && {
          ownerState: _extends$3({}, (_componentsProps$root = componentsProps.root) == null ? void 0 : _componentsProps$root.ownerState)
        })
      },
      classes,
      ref,
      children
    })
  }));
});
var Backdrop$1 = Backdrop;
const _excluded$x = ["BackdropComponent", "closeAfterTransition", "children", "components", "componentsProps", "disableAutoFocus", "disableEnforceFocus", "disableEscapeKeyDown", "disablePortal", "disableRestoreFocus", "disableScrollLock", "hideBackdrop", "keepMounted"];
const extendUtilityClasses = (ownerState) => {
  return ownerState.classes;
};
const ModalRoot = styled$3("div", {
  name: "MuiModal",
  slot: "Root",
  overridesResolver: (props, styles2) => {
    const {
      ownerState
    } = props;
    return [styles2.root, !ownerState.open && ownerState.exited && styles2.hidden];
  }
})(({
  theme: theme2,
  ownerState
}) => _extends$3({
  position: "fixed",
  zIndex: theme2.zIndex.modal,
  right: 0,
  bottom: 0,
  top: 0,
  left: 0
}, !ownerState.open && ownerState.exited && {
  visibility: "hidden"
}));
const ModalBackdrop = styled$3(Backdrop$1, {
  name: "MuiModal",
  slot: "Backdrop",
  overridesResolver: (props, styles2) => {
    return styles2.backdrop;
  }
})({
  zIndex: -1
});
const Modal = /* @__PURE__ */ react.exports.forwardRef(function Modal2(inProps, ref) {
  var _componentsProps$root;
  const props = useThemeProps({
    name: "MuiModal",
    props: inProps
  });
  const {
    BackdropComponent = ModalBackdrop,
    closeAfterTransition = false,
    children,
    components = {},
    componentsProps = {},
    disableAutoFocus = false,
    disableEnforceFocus = false,
    disableEscapeKeyDown = false,
    disablePortal = false,
    disableRestoreFocus = false,
    disableScrollLock = false,
    hideBackdrop = false,
    keepMounted = false
  } = props, other = _objectWithoutPropertiesLoose$1(props, _excluded$x);
  const [exited, setExited] = react.exports.useState(true);
  const commonProps = {
    closeAfterTransition,
    disableAutoFocus,
    disableEnforceFocus,
    disableEscapeKeyDown,
    disablePortal,
    disableRestoreFocus,
    disableScrollLock,
    hideBackdrop,
    keepMounted
  };
  const ownerState = _extends$3({}, props, commonProps, {
    exited
  });
  const classes = extendUtilityClasses(ownerState);
  return /* @__PURE__ */ jsx(ModalUnstyled$1, _extends$3({
    components: _extends$3({
      Root: ModalRoot
    }, components),
    componentsProps: {
      root: _extends$3({}, componentsProps.root, (!components.Root || !isHostComponent(components.Root)) && {
        ownerState: _extends$3({}, (_componentsProps$root = componentsProps.root) == null ? void 0 : _componentsProps$root.ownerState)
      })
    },
    BackdropComponent,
    onTransitionEnter: () => setExited(false),
    onTransitionExited: () => setExited(true),
    ref
  }, other, {
    classes
  }, commonProps, {
    children
  }));
});
var Modal$1 = Modal;
function getPopoverUtilityClass(slot) {
  return generateUtilityClass("MuiPopover", slot);
}
generateUtilityClasses("MuiPopover", ["root", "paper"]);
const _excluded$w = ["onEntering"], _excluded2$3 = ["action", "anchorEl", "anchorOrigin", "anchorPosition", "anchorReference", "children", "className", "container", "elevation", "marginThreshold", "open", "PaperProps", "transformOrigin", "TransitionComponent", "transitionDuration", "TransitionProps"];
function getOffsetTop(rect, vertical) {
  let offset2 = 0;
  if (typeof vertical === "number") {
    offset2 = vertical;
  } else if (vertical === "center") {
    offset2 = rect.height / 2;
  } else if (vertical === "bottom") {
    offset2 = rect.height;
  }
  return offset2;
}
function getOffsetLeft(rect, horizontal) {
  let offset2 = 0;
  if (typeof horizontal === "number") {
    offset2 = horizontal;
  } else if (horizontal === "center") {
    offset2 = rect.width / 2;
  } else if (horizontal === "right") {
    offset2 = rect.width;
  }
  return offset2;
}
function getTransformOriginValue(transformOrigin) {
  return [transformOrigin.horizontal, transformOrigin.vertical].map((n2) => typeof n2 === "number" ? `${n2}px` : n2).join(" ");
}
function resolveAnchorEl(anchorEl) {
  return typeof anchorEl === "function" ? anchorEl() : anchorEl;
}
const useUtilityClasses$t = (ownerState) => {
  const {
    classes
  } = ownerState;
  const slots = {
    root: ["root"],
    paper: ["paper"]
  };
  return composeClasses(slots, getPopoverUtilityClass, classes);
};
const PopoverRoot = styled$3(Modal$1, {
  name: "MuiPopover",
  slot: "Root",
  overridesResolver: (props, styles2) => styles2.root
})({});
const PopoverPaper = styled$3(Paper$1, {
  name: "MuiPopover",
  slot: "Paper",
  overridesResolver: (props, styles2) => styles2.paper
})({
  position: "absolute",
  overflowY: "auto",
  overflowX: "hidden",
  minWidth: 16,
  minHeight: 16,
  maxWidth: "calc(100% - 32px)",
  maxHeight: "calc(100% - 32px)",
  outline: 0
});
const Popover = /* @__PURE__ */ react.exports.forwardRef(function Popover2(inProps, ref) {
  const props = useThemeProps({
    props: inProps,
    name: "MuiPopover"
  });
  const {
    action,
    anchorEl,
    anchorOrigin = {
      vertical: "top",
      horizontal: "left"
    },
    anchorPosition,
    anchorReference = "anchorEl",
    children,
    className,
    container: containerProp,
    elevation = 8,
    marginThreshold = 16,
    open,
    PaperProps = {},
    transformOrigin = {
      vertical: "top",
      horizontal: "left"
    },
    TransitionComponent = Grow$1,
    transitionDuration: transitionDurationProp = "auto",
    TransitionProps: {
      onEntering
    } = {}
  } = props, TransitionProps = _objectWithoutPropertiesLoose$1(props.TransitionProps, _excluded$w), other = _objectWithoutPropertiesLoose$1(props, _excluded2$3);
  const paperRef = react.exports.useRef();
  const handlePaperRef = useForkRef(paperRef, PaperProps.ref);
  const ownerState = _extends$3({}, props, {
    anchorOrigin,
    anchorReference,
    elevation,
    marginThreshold,
    PaperProps,
    transformOrigin,
    TransitionComponent,
    transitionDuration: transitionDurationProp,
    TransitionProps
  });
  const classes = useUtilityClasses$t(ownerState);
  const getAnchorOffset = react.exports.useCallback(() => {
    if (anchorReference === "anchorPosition") {
      return anchorPosition;
    }
    const resolvedAnchorEl = resolveAnchorEl(anchorEl);
    const anchorElement = resolvedAnchorEl && resolvedAnchorEl.nodeType === 1 ? resolvedAnchorEl : ownerDocument(paperRef.current).body;
    const anchorRect = anchorElement.getBoundingClientRect();
    return {
      top: anchorRect.top + getOffsetTop(anchorRect, anchorOrigin.vertical),
      left: anchorRect.left + getOffsetLeft(anchorRect, anchorOrigin.horizontal)
    };
  }, [anchorEl, anchorOrigin.horizontal, anchorOrigin.vertical, anchorPosition, anchorReference]);
  const getTransformOrigin = react.exports.useCallback((elemRect) => {
    return {
      vertical: getOffsetTop(elemRect, transformOrigin.vertical),
      horizontal: getOffsetLeft(elemRect, transformOrigin.horizontal)
    };
  }, [transformOrigin.horizontal, transformOrigin.vertical]);
  const getPositioningStyle = react.exports.useCallback((element) => {
    const elemRect = {
      width: element.offsetWidth,
      height: element.offsetHeight
    };
    const elemTransformOrigin = getTransformOrigin(elemRect);
    if (anchorReference === "none") {
      return {
        top: null,
        left: null,
        transformOrigin: getTransformOriginValue(elemTransformOrigin)
      };
    }
    const anchorOffset = getAnchorOffset();
    let top2 = anchorOffset.top - elemTransformOrigin.vertical;
    let left2 = anchorOffset.left - elemTransformOrigin.horizontal;
    const bottom2 = top2 + elemRect.height;
    const right2 = left2 + elemRect.width;
    const containerWindow = ownerWindow(resolveAnchorEl(anchorEl));
    const heightThreshold = containerWindow.innerHeight - marginThreshold;
    const widthThreshold = containerWindow.innerWidth - marginThreshold;
    if (top2 < marginThreshold) {
      const diff = top2 - marginThreshold;
      top2 -= diff;
      elemTransformOrigin.vertical += diff;
    } else if (bottom2 > heightThreshold) {
      const diff = bottom2 - heightThreshold;
      top2 -= diff;
      elemTransformOrigin.vertical += diff;
    }
    if (left2 < marginThreshold) {
      const diff = left2 - marginThreshold;
      left2 -= diff;
      elemTransformOrigin.horizontal += diff;
    } else if (right2 > widthThreshold) {
      const diff = right2 - widthThreshold;
      left2 -= diff;
      elemTransformOrigin.horizontal += diff;
    }
    return {
      top: `${Math.round(top2)}px`,
      left: `${Math.round(left2)}px`,
      transformOrigin: getTransformOriginValue(elemTransformOrigin)
    };
  }, [anchorEl, anchorReference, getAnchorOffset, getTransformOrigin, marginThreshold]);
  const setPositioningStyles = react.exports.useCallback(() => {
    const element = paperRef.current;
    if (!element) {
      return;
    }
    const positioning = getPositioningStyle(element);
    if (positioning.top !== null) {
      element.style.top = positioning.top;
    }
    if (positioning.left !== null) {
      element.style.left = positioning.left;
    }
    element.style.transformOrigin = positioning.transformOrigin;
  }, [getPositioningStyle]);
  const handleEntering = (element, isAppearing) => {
    if (onEntering) {
      onEntering(element, isAppearing);
    }
    setPositioningStyles();
  };
  react.exports.useEffect(() => {
    if (open) {
      setPositioningStyles();
    }
  });
  react.exports.useImperativeHandle(action, () => open ? {
    updatePosition: () => {
      setPositioningStyles();
    }
  } : null, [open, setPositioningStyles]);
  react.exports.useEffect(() => {
    if (!open) {
      return void 0;
    }
    const handleResize = debounce$1(() => {
      setPositioningStyles();
    });
    const containerWindow = ownerWindow(anchorEl);
    containerWindow.addEventListener("resize", handleResize);
    return () => {
      handleResize.clear();
      containerWindow.removeEventListener("resize", handleResize);
    };
  }, [anchorEl, open, setPositioningStyles]);
  let transitionDuration = transitionDurationProp;
  if (transitionDurationProp === "auto" && !TransitionComponent.muiSupportAuto) {
    transitionDuration = void 0;
  }
  const container = containerProp || (anchorEl ? ownerDocument(resolveAnchorEl(anchorEl)).body : void 0);
  return /* @__PURE__ */ jsx(PopoverRoot, _extends$3({
    BackdropProps: {
      invisible: true
    },
    className: clsx(classes.root, className),
    container,
    open,
    ref,
    ownerState
  }, other, {
    children: /* @__PURE__ */ jsx(TransitionComponent, _extends$3({
      appear: true,
      in: open,
      onEntering: handleEntering,
      timeout: transitionDuration
    }, TransitionProps, {
      children: /* @__PURE__ */ jsx(PopoverPaper, _extends$3({
        elevation
      }, PaperProps, {
        ref: handlePaperRef,
        className: clsx(classes.paper, PaperProps.className),
        children
      }))
    }))
  }));
});
var Popover$1 = Popover;
function getMenuUtilityClass(slot) {
  return generateUtilityClass("MuiMenu", slot);
}
generateUtilityClasses("MuiMenu", ["root", "paper", "list"]);
const _excluded$v = ["onEntering"], _excluded2$2 = ["autoFocus", "children", "disableAutoFocusItem", "MenuListProps", "onClose", "open", "PaperProps", "PopoverClasses", "transitionDuration", "TransitionProps", "variant"];
const RTL_ORIGIN = {
  vertical: "top",
  horizontal: "right"
};
const LTR_ORIGIN = {
  vertical: "top",
  horizontal: "left"
};
const useUtilityClasses$s = (ownerState) => {
  const {
    classes
  } = ownerState;
  const slots = {
    root: ["root"],
    paper: ["paper"],
    list: ["list"]
  };
  return composeClasses(slots, getMenuUtilityClass, classes);
};
const MenuRoot = styled$3(Popover$1, {
  shouldForwardProp: (prop) => rootShouldForwardProp(prop) || prop === "classes",
  name: "MuiMenu",
  slot: "Root",
  overridesResolver: (props, styles2) => styles2.root
})({});
const MenuPaper = styled$3(Paper$1, {
  name: "MuiMenu",
  slot: "Paper",
  overridesResolver: (props, styles2) => styles2.paper
})({
  maxHeight: "calc(100% - 96px)",
  WebkitOverflowScrolling: "touch"
});
const MenuMenuList = styled$3(MenuList$1, {
  name: "MuiMenu",
  slot: "List",
  overridesResolver: (props, styles2) => styles2.list
})({
  outline: 0
});
const Menu$1 = /* @__PURE__ */ react.exports.forwardRef(function Menu(inProps, ref) {
  const props = useThemeProps({
    props: inProps,
    name: "MuiMenu"
  });
  const {
    autoFocus = true,
    children,
    disableAutoFocusItem = false,
    MenuListProps = {},
    onClose,
    open,
    PaperProps = {},
    PopoverClasses,
    transitionDuration = "auto",
    TransitionProps: {
      onEntering
    } = {},
    variant = "selectedMenu"
  } = props, TransitionProps = _objectWithoutPropertiesLoose$1(props.TransitionProps, _excluded$v), other = _objectWithoutPropertiesLoose$1(props, _excluded2$2);
  const theme2 = useTheme();
  const isRtl = theme2.direction === "rtl";
  const ownerState = _extends$3({}, props, {
    autoFocus,
    disableAutoFocusItem,
    MenuListProps,
    onEntering,
    PaperProps,
    transitionDuration,
    TransitionProps,
    variant
  });
  const classes = useUtilityClasses$s(ownerState);
  const autoFocusItem = autoFocus && !disableAutoFocusItem && open;
  const menuListActionsRef = react.exports.useRef(null);
  const handleEntering = (element, isAppearing) => {
    if (menuListActionsRef.current) {
      menuListActionsRef.current.adjustStyleForScrollbar(element, theme2);
    }
    if (onEntering) {
      onEntering(element, isAppearing);
    }
  };
  const handleListKeyDown = (event) => {
    if (event.key === "Tab") {
      event.preventDefault();
      if (onClose) {
        onClose(event, "tabKeyDown");
      }
    }
  };
  let activeItemIndex = -1;
  react.exports.Children.map(children, (child, index2) => {
    if (!/* @__PURE__ */ react.exports.isValidElement(child)) {
      return;
    }
    if (!child.props.disabled) {
      if (variant === "selectedMenu" && child.props.selected) {
        activeItemIndex = index2;
      } else if (activeItemIndex === -1) {
        activeItemIndex = index2;
      }
    }
  });
  return /* @__PURE__ */ jsx(MenuRoot, _extends$3({
    classes: PopoverClasses,
    onClose,
    anchorOrigin: {
      vertical: "bottom",
      horizontal: isRtl ? "right" : "left"
    },
    transformOrigin: isRtl ? RTL_ORIGIN : LTR_ORIGIN,
    PaperProps: _extends$3({
      component: MenuPaper
    }, PaperProps, {
      classes: _extends$3({}, PaperProps.classes, {
        root: classes.paper
      })
    }),
    className: classes.root,
    open,
    ref,
    transitionDuration,
    TransitionProps: _extends$3({
      onEntering: handleEntering
    }, TransitionProps),
    ownerState
  }, other, {
    children: /* @__PURE__ */ jsx(MenuMenuList, _extends$3({
      onKeyDown: handleListKeyDown,
      actions: menuListActionsRef,
      autoFocus: autoFocus && (activeItemIndex === -1 || disableAutoFocusItem),
      autoFocusItem,
      variant
    }, MenuListProps, {
      className: clsx(classes.list, MenuListProps.className),
      children
    }))
  }));
});
var Menu$2 = Menu$1;
const dividerClasses = generateUtilityClasses("MuiDivider", ["root", "absolute", "fullWidth", "inset", "middle", "flexItem", "light", "vertical", "withChildren", "withChildrenVertical", "textAlignRight", "textAlignLeft", "wrapper", "wrapperVertical"]);
var dividerClasses$1 = dividerClasses;
const listItemIconClasses = generateUtilityClasses("MuiListItemIcon", ["root", "alignItemsFlexStart"]);
var listItemIconClasses$1 = listItemIconClasses;
const listItemTextClasses = generateUtilityClasses("MuiListItemText", ["root", "multiline", "dense", "inset", "primary", "secondary"]);
var listItemTextClasses$1 = listItemTextClasses;
function getMenuItemUtilityClass(slot) {
  return generateUtilityClass("MuiMenuItem", slot);
}
const menuItemClasses = generateUtilityClasses("MuiMenuItem", ["root", "focusVisible", "dense", "disabled", "divider", "gutters", "selected"]);
var menuItemClasses$1 = menuItemClasses;
const _excluded$u = ["autoFocus", "component", "dense", "divider", "disableGutters", "focusVisibleClassName", "role", "tabIndex"];
const overridesResolver = (props, styles2) => {
  const {
    ownerState
  } = props;
  return [styles2.root, ownerState.dense && styles2.dense, ownerState.divider && styles2.divider, !ownerState.disableGutters && styles2.gutters];
};
const useUtilityClasses$r = (ownerState) => {
  const {
    disabled,
    dense,
    divider,
    disableGutters,
    selected,
    classes
  } = ownerState;
  const slots = {
    root: ["root", dense && "dense", disabled && "disabled", !disableGutters && "gutters", divider && "divider", selected && "selected"]
  };
  const composedClasses = composeClasses(slots, getMenuItemUtilityClass, classes);
  return _extends$3({}, classes, composedClasses);
};
const MenuItemRoot = styled$3(ButtonBase$1, {
  shouldForwardProp: (prop) => rootShouldForwardProp(prop) || prop === "classes",
  name: "MuiMenuItem",
  slot: "Root",
  overridesResolver
})(({
  theme: theme2,
  ownerState
}) => _extends$3({}, theme2.typography.body1, {
  display: "flex",
  justifyContent: "flex-start",
  alignItems: "center",
  position: "relative",
  textDecoration: "none",
  minHeight: 48,
  paddingTop: 6,
  paddingBottom: 6,
  boxSizing: "border-box",
  whiteSpace: "nowrap"
}, !ownerState.disableGutters && {
  paddingLeft: 16,
  paddingRight: 16
}, ownerState.divider && {
  borderBottom: `1px solid ${theme2.palette.divider}`,
  backgroundClip: "padding-box"
}, {
  "&:hover": {
    textDecoration: "none",
    backgroundColor: theme2.palette.action.hover,
    "@media (hover: none)": {
      backgroundColor: "transparent"
    }
  },
  [`&.${menuItemClasses$1.selected}`]: {
    backgroundColor: alpha(theme2.palette.primary.main, theme2.palette.action.selectedOpacity),
    [`&.${menuItemClasses$1.focusVisible}`]: {
      backgroundColor: alpha(theme2.palette.primary.main, theme2.palette.action.selectedOpacity + theme2.palette.action.focusOpacity)
    }
  },
  [`&.${menuItemClasses$1.selected}:hover`]: {
    backgroundColor: alpha(theme2.palette.primary.main, theme2.palette.action.selectedOpacity + theme2.palette.action.hoverOpacity),
    "@media (hover: none)": {
      backgroundColor: alpha(theme2.palette.primary.main, theme2.palette.action.selectedOpacity)
    }
  },
  [`&.${menuItemClasses$1.focusVisible}`]: {
    backgroundColor: theme2.palette.action.focus
  },
  [`&.${menuItemClasses$1.disabled}`]: {
    opacity: theme2.palette.action.disabledOpacity
  },
  [`& + .${dividerClasses$1.root}`]: {
    marginTop: theme2.spacing(1),
    marginBottom: theme2.spacing(1)
  },
  [`& + .${dividerClasses$1.inset}`]: {
    marginLeft: 52
  },
  [`& .${listItemTextClasses$1.root}`]: {
    marginTop: 0,
    marginBottom: 0
  },
  [`& .${listItemTextClasses$1.inset}`]: {
    paddingLeft: 36
  },
  [`& .${listItemIconClasses$1.root}`]: {
    minWidth: 36
  }
}, !ownerState.dense && {
  [theme2.breakpoints.up("sm")]: {
    minHeight: "auto"
  }
}, ownerState.dense && _extends$3({
  minHeight: 32,
  paddingTop: 4,
  paddingBottom: 4
}, theme2.typography.body2, {
  [`& .${listItemIconClasses$1.root} svg`]: {
    fontSize: "1.25rem"
  }
})));
const MenuItem = /* @__PURE__ */ react.exports.forwardRef(function MenuItem2(inProps, ref) {
  const props = useThemeProps({
    props: inProps,
    name: "MuiMenuItem"
  });
  const {
    autoFocus = false,
    component = "li",
    dense = false,
    divider = false,
    disableGutters = false,
    focusVisibleClassName,
    role = "menuitem",
    tabIndex: tabIndexProp
  } = props, other = _objectWithoutPropertiesLoose$1(props, _excluded$u);
  const context = react.exports.useContext(ListContext$1);
  const childContext = {
    dense: dense || context.dense || false,
    disableGutters
  };
  const menuItemRef = react.exports.useRef(null);
  useEnhancedEffect$1(() => {
    if (autoFocus) {
      if (menuItemRef.current) {
        menuItemRef.current.focus();
      }
    }
  }, [autoFocus]);
  const ownerState = _extends$3({}, props, {
    dense: childContext.dense,
    divider,
    disableGutters
  });
  const classes = useUtilityClasses$r(props);
  const handleRef = useForkRef(menuItemRef, ref);
  let tabIndex;
  if (!props.disabled) {
    tabIndex = tabIndexProp !== void 0 ? tabIndexProp : -1;
  }
  return /* @__PURE__ */ jsx(ListContext$1.Provider, {
    value: childContext,
    children: /* @__PURE__ */ jsx(MenuItemRoot, _extends$3({
      ref: handleRef,
      role,
      tabIndex,
      component,
      focusVisibleClassName: clsx(classes.focusVisible, focusVisibleClassName)
    }, other, {
      ownerState,
      classes
    }))
  });
});
var MenuItem$1 = MenuItem;
function getTooltipUtilityClass(slot) {
  return generateUtilityClass("MuiTooltip", slot);
}
const tooltipClasses = generateUtilityClasses("MuiTooltip", ["popper", "popperInteractive", "popperArrow", "popperClose", "tooltip", "tooltipArrow", "touch", "tooltipPlacementLeft", "tooltipPlacementRight", "tooltipPlacementTop", "tooltipPlacementBottom", "arrow"]);
var tooltipClasses$1 = tooltipClasses;
const _excluded$t = ["arrow", "children", "classes", "components", "componentsProps", "describeChild", "disableFocusListener", "disableHoverListener", "disableInteractive", "disableTouchListener", "enterDelay", "enterNextDelay", "enterTouchDelay", "followCursor", "id", "leaveDelay", "leaveTouchDelay", "onClose", "onOpen", "open", "placement", "PopperComponent", "PopperProps", "title", "TransitionComponent", "TransitionProps"];
function round(value) {
  return Math.round(value * 1e5) / 1e5;
}
const useUtilityClasses$q = (ownerState) => {
  const {
    classes,
    disableInteractive,
    arrow: arrow2,
    touch,
    placement
  } = ownerState;
  const slots = {
    popper: ["popper", !disableInteractive && "popperInteractive", arrow2 && "popperArrow"],
    tooltip: ["tooltip", arrow2 && "tooltipArrow", touch && "touch", `tooltipPlacement${capitalize(placement.split("-")[0])}`],
    arrow: ["arrow"]
  };
  return composeClasses(slots, getTooltipUtilityClass, classes);
};
const TooltipPopper = styled$3(Popper$1, {
  name: "MuiTooltip",
  slot: "Popper",
  overridesResolver: (props, styles2) => {
    const {
      ownerState
    } = props;
    return [styles2.popper, !ownerState.disableInteractive && styles2.popperInteractive, ownerState.arrow && styles2.popperArrow, !ownerState.open && styles2.popperClose];
  }
})(({
  theme: theme2,
  ownerState,
  open
}) => _extends$3({
  zIndex: theme2.zIndex.tooltip,
  pointerEvents: "none"
}, !ownerState.disableInteractive && {
  pointerEvents: "auto"
}, !open && {
  pointerEvents: "none"
}, ownerState.arrow && {
  [`&[data-popper-placement*="bottom"] .${tooltipClasses$1.arrow}`]: {
    top: 0,
    marginTop: "-0.71em",
    "&::before": {
      transformOrigin: "0 100%"
    }
  },
  [`&[data-popper-placement*="top"] .${tooltipClasses$1.arrow}`]: {
    bottom: 0,
    marginBottom: "-0.71em",
    "&::before": {
      transformOrigin: "100% 0"
    }
  },
  [`&[data-popper-placement*="right"] .${tooltipClasses$1.arrow}`]: _extends$3({}, !ownerState.isRtl ? {
    left: 0,
    marginLeft: "-0.71em"
  } : {
    right: 0,
    marginRight: "-0.71em"
  }, {
    height: "1em",
    width: "0.71em",
    "&::before": {
      transformOrigin: "100% 100%"
    }
  }),
  [`&[data-popper-placement*="left"] .${tooltipClasses$1.arrow}`]: _extends$3({}, !ownerState.isRtl ? {
    right: 0,
    marginRight: "-0.71em"
  } : {
    left: 0,
    marginLeft: "-0.71em"
  }, {
    height: "1em",
    width: "0.71em",
    "&::before": {
      transformOrigin: "0 0"
    }
  })
}));
const TooltipTooltip = styled$3("div", {
  name: "MuiTooltip",
  slot: "Tooltip",
  overridesResolver: (props, styles2) => {
    const {
      ownerState
    } = props;
    return [styles2.tooltip, ownerState.touch && styles2.touch, ownerState.arrow && styles2.tooltipArrow, styles2[`tooltipPlacement${capitalize(ownerState.placement.split("-")[0])}`]];
  }
})(({
  theme: theme2,
  ownerState
}) => _extends$3({
  backgroundColor: alpha(theme2.palette.grey[700], 0.92),
  borderRadius: theme2.shape.borderRadius,
  color: theme2.palette.common.white,
  fontFamily: theme2.typography.fontFamily,
  padding: "4px 8px",
  fontSize: theme2.typography.pxToRem(11),
  maxWidth: 300,
  margin: 2,
  wordWrap: "break-word",
  fontWeight: theme2.typography.fontWeightMedium
}, ownerState.arrow && {
  position: "relative",
  margin: 0
}, ownerState.touch && {
  padding: "8px 16px",
  fontSize: theme2.typography.pxToRem(14),
  lineHeight: `${round(16 / 14)}em`,
  fontWeight: theme2.typography.fontWeightRegular
}, {
  [`.${tooltipClasses$1.popper}[data-popper-placement*="left"] &`]: _extends$3({
    transformOrigin: "right center"
  }, !ownerState.isRtl ? _extends$3({
    marginRight: "14px"
  }, ownerState.touch && {
    marginRight: "24px"
  }) : _extends$3({
    marginLeft: "14px"
  }, ownerState.touch && {
    marginLeft: "24px"
  })),
  [`.${tooltipClasses$1.popper}[data-popper-placement*="right"] &`]: _extends$3({
    transformOrigin: "left center"
  }, !ownerState.isRtl ? _extends$3({
    marginLeft: "14px"
  }, ownerState.touch && {
    marginLeft: "24px"
  }) : _extends$3({
    marginRight: "14px"
  }, ownerState.touch && {
    marginRight: "24px"
  })),
  [`.${tooltipClasses$1.popper}[data-popper-placement*="top"] &`]: _extends$3({
    transformOrigin: "center bottom",
    marginBottom: "14px"
  }, ownerState.touch && {
    marginBottom: "24px"
  }),
  [`.${tooltipClasses$1.popper}[data-popper-placement*="bottom"] &`]: _extends$3({
    transformOrigin: "center top",
    marginTop: "14px"
  }, ownerState.touch && {
    marginTop: "24px"
  })
}));
const TooltipArrow = styled$3("span", {
  name: "MuiTooltip",
  slot: "Arrow",
  overridesResolver: (props, styles2) => styles2.arrow
})(({
  theme: theme2
}) => ({
  overflow: "hidden",
  position: "absolute",
  width: "1em",
  height: "0.71em",
  boxSizing: "border-box",
  color: alpha(theme2.palette.grey[700], 0.9),
  "&::before": {
    content: '""',
    margin: "auto",
    display: "block",
    width: "100%",
    height: "100%",
    backgroundColor: "currentColor",
    transform: "rotate(45deg)"
  }
}));
let hystersisOpen = false;
let hystersisTimer = null;
function composeEventHandler(handler, eventHandler) {
  return (event) => {
    if (eventHandler) {
      eventHandler(event);
    }
    handler(event);
  };
}
const Tooltip = /* @__PURE__ */ react.exports.forwardRef(function Tooltip2(inProps, ref) {
  var _components$Popper, _ref, _components$Transitio, _components$Tooltip, _components$Arrow, _componentsProps$popp;
  const props = useThemeProps({
    props: inProps,
    name: "MuiTooltip"
  });
  const {
    arrow: arrow2 = false,
    children,
    components = {},
    componentsProps = {},
    describeChild = false,
    disableFocusListener = false,
    disableHoverListener = false,
    disableInteractive: disableInteractiveProp = false,
    disableTouchListener = false,
    enterDelay = 100,
    enterNextDelay = 0,
    enterTouchDelay = 700,
    followCursor = false,
    id: idProp,
    leaveDelay = 0,
    leaveTouchDelay = 1500,
    onClose,
    onOpen,
    open: openProp,
    placement = "bottom",
    PopperComponent: PopperComponentProp,
    PopperProps = {},
    title,
    TransitionComponent: TransitionComponentProp = Grow$1,
    TransitionProps
  } = props, other = _objectWithoutPropertiesLoose$1(props, _excluded$t);
  const theme2 = useTheme();
  const isRtl = theme2.direction === "rtl";
  const [childNode, setChildNode] = react.exports.useState();
  const [arrowRef, setArrowRef] = react.exports.useState(null);
  const ignoreNonTouchEvents = react.exports.useRef(false);
  const disableInteractive = disableInteractiveProp || followCursor;
  const closeTimer = react.exports.useRef();
  const enterTimer = react.exports.useRef();
  const leaveTimer = react.exports.useRef();
  const touchTimer = react.exports.useRef();
  const [openState, setOpenState] = useControlled({
    controlled: openProp,
    default: false,
    name: "Tooltip",
    state: "open"
  });
  let open = openState;
  const id = useId(idProp);
  const prevUserSelect = react.exports.useRef();
  const stopTouchInteraction = react.exports.useCallback(() => {
    if (prevUserSelect.current !== void 0) {
      document.body.style.WebkitUserSelect = prevUserSelect.current;
      prevUserSelect.current = void 0;
    }
    clearTimeout(touchTimer.current);
  }, []);
  react.exports.useEffect(() => {
    return () => {
      clearTimeout(closeTimer.current);
      clearTimeout(enterTimer.current);
      clearTimeout(leaveTimer.current);
      stopTouchInteraction();
    };
  }, [stopTouchInteraction]);
  const handleOpen = (event) => {
    clearTimeout(hystersisTimer);
    hystersisOpen = true;
    setOpenState(true);
    if (onOpen && !open) {
      onOpen(event);
    }
  };
  const handleClose = useEventCallback((event) => {
    clearTimeout(hystersisTimer);
    hystersisTimer = setTimeout(() => {
      hystersisOpen = false;
    }, 800 + leaveDelay);
    setOpenState(false);
    if (onClose && open) {
      onClose(event);
    }
    clearTimeout(closeTimer.current);
    closeTimer.current = setTimeout(() => {
      ignoreNonTouchEvents.current = false;
    }, theme2.transitions.duration.shortest);
  });
  const handleEnter = (event) => {
    if (ignoreNonTouchEvents.current && event.type !== "touchstart") {
      return;
    }
    if (childNode) {
      childNode.removeAttribute("title");
    }
    clearTimeout(enterTimer.current);
    clearTimeout(leaveTimer.current);
    if (enterDelay || hystersisOpen && enterNextDelay) {
      enterTimer.current = setTimeout(() => {
        handleOpen(event);
      }, hystersisOpen ? enterNextDelay : enterDelay);
    } else {
      handleOpen(event);
    }
  };
  const handleLeave = (event) => {
    clearTimeout(enterTimer.current);
    clearTimeout(leaveTimer.current);
    leaveTimer.current = setTimeout(() => {
      handleClose(event);
    }, leaveDelay);
  };
  const {
    isFocusVisibleRef,
    onBlur: handleBlurVisible,
    onFocus: handleFocusVisible,
    ref: focusVisibleRef
  } = useIsFocusVisible();
  const [, setChildIsFocusVisible] = react.exports.useState(false);
  const handleBlur = (event) => {
    handleBlurVisible(event);
    if (isFocusVisibleRef.current === false) {
      setChildIsFocusVisible(false);
      handleLeave(event);
    }
  };
  const handleFocus = (event) => {
    if (!childNode) {
      setChildNode(event.currentTarget);
    }
    handleFocusVisible(event);
    if (isFocusVisibleRef.current === true) {
      setChildIsFocusVisible(true);
      handleEnter(event);
    }
  };
  const detectTouchStart = (event) => {
    ignoreNonTouchEvents.current = true;
    const childrenProps2 = children.props;
    if (childrenProps2.onTouchStart) {
      childrenProps2.onTouchStart(event);
    }
  };
  const handleMouseOver = handleEnter;
  const handleMouseLeave = handleLeave;
  const handleTouchStart = (event) => {
    detectTouchStart(event);
    clearTimeout(leaveTimer.current);
    clearTimeout(closeTimer.current);
    stopTouchInteraction();
    prevUserSelect.current = document.body.style.WebkitUserSelect;
    document.body.style.WebkitUserSelect = "none";
    touchTimer.current = setTimeout(() => {
      document.body.style.WebkitUserSelect = prevUserSelect.current;
      handleEnter(event);
    }, enterTouchDelay);
  };
  const handleTouchEnd = (event) => {
    if (children.props.onTouchEnd) {
      children.props.onTouchEnd(event);
    }
    stopTouchInteraction();
    clearTimeout(leaveTimer.current);
    leaveTimer.current = setTimeout(() => {
      handleClose(event);
    }, leaveTouchDelay);
  };
  react.exports.useEffect(() => {
    if (!open) {
      return void 0;
    }
    function handleKeyDown2(nativeEvent) {
      if (nativeEvent.key === "Escape" || nativeEvent.key === "Esc") {
        handleClose(nativeEvent);
      }
    }
    document.addEventListener("keydown", handleKeyDown2);
    return () => {
      document.removeEventListener("keydown", handleKeyDown2);
    };
  }, [handleClose, open]);
  const handleUseRef = useForkRef(setChildNode, ref);
  const handleFocusRef = useForkRef(focusVisibleRef, handleUseRef);
  const handleRef = useForkRef(children.ref, handleFocusRef);
  if (title === "") {
    open = false;
  }
  const positionRef = react.exports.useRef({
    x: 0,
    y: 0
  });
  const popperRef = react.exports.useRef();
  const handleMouseMove = (event) => {
    const childrenProps2 = children.props;
    if (childrenProps2.onMouseMove) {
      childrenProps2.onMouseMove(event);
    }
    positionRef.current = {
      x: event.clientX,
      y: event.clientY
    };
    if (popperRef.current) {
      popperRef.current.update();
    }
  };
  const nameOrDescProps = {};
  const titleIsString = typeof title === "string";
  if (describeChild) {
    nameOrDescProps.title = !open && titleIsString && !disableHoverListener ? title : null;
    nameOrDescProps["aria-describedby"] = open ? id : null;
  } else {
    nameOrDescProps["aria-label"] = titleIsString ? title : null;
    nameOrDescProps["aria-labelledby"] = open && !titleIsString ? id : null;
  }
  const childrenProps = _extends$3({}, nameOrDescProps, other, children.props, {
    className: clsx(other.className, children.props.className),
    onTouchStart: detectTouchStart,
    ref: handleRef
  }, followCursor ? {
    onMouseMove: handleMouseMove
  } : {});
  const interactiveWrapperListeners = {};
  if (!disableTouchListener) {
    childrenProps.onTouchStart = handleTouchStart;
    childrenProps.onTouchEnd = handleTouchEnd;
  }
  if (!disableHoverListener) {
    childrenProps.onMouseOver = composeEventHandler(handleMouseOver, childrenProps.onMouseOver);
    childrenProps.onMouseLeave = composeEventHandler(handleMouseLeave, childrenProps.onMouseLeave);
    if (!disableInteractive) {
      interactiveWrapperListeners.onMouseOver = handleMouseOver;
      interactiveWrapperListeners.onMouseLeave = handleMouseLeave;
    }
  }
  if (!disableFocusListener) {
    childrenProps.onFocus = composeEventHandler(handleFocus, childrenProps.onFocus);
    childrenProps.onBlur = composeEventHandler(handleBlur, childrenProps.onBlur);
    if (!disableInteractive) {
      interactiveWrapperListeners.onFocus = handleFocus;
      interactiveWrapperListeners.onBlur = handleBlur;
    }
  }
  const popperOptions = react.exports.useMemo(() => {
    var _PopperProps$popperOp;
    let tooltipModifiers = [{
      name: "arrow",
      enabled: Boolean(arrowRef),
      options: {
        element: arrowRef,
        padding: 4
      }
    }];
    if ((_PopperProps$popperOp = PopperProps.popperOptions) != null && _PopperProps$popperOp.modifiers) {
      tooltipModifiers = tooltipModifiers.concat(PopperProps.popperOptions.modifiers);
    }
    return _extends$3({}, PopperProps.popperOptions, {
      modifiers: tooltipModifiers
    });
  }, [arrowRef, PopperProps]);
  const ownerState = _extends$3({}, props, {
    isRtl,
    arrow: arrow2,
    disableInteractive,
    placement,
    PopperComponentProp,
    touch: ignoreNonTouchEvents.current
  });
  const classes = useUtilityClasses$q(ownerState);
  const PopperComponent2 = (_components$Popper = components.Popper) != null ? _components$Popper : TooltipPopper;
  const TransitionComponent = (_ref = (_components$Transitio = components.Transition) != null ? _components$Transitio : TransitionComponentProp) != null ? _ref : Grow$1;
  const TooltipComponent = (_components$Tooltip = components.Tooltip) != null ? _components$Tooltip : TooltipTooltip;
  const ArrowComponent = (_components$Arrow = components.Arrow) != null ? _components$Arrow : TooltipArrow;
  const popperProps = appendOwnerState(PopperComponent2, _extends$3({}, PopperProps, componentsProps.popper), ownerState);
  const transitionProps = appendOwnerState(TransitionComponent, _extends$3({}, TransitionProps, componentsProps.transition), ownerState);
  const tooltipProps = appendOwnerState(TooltipComponent, _extends$3({}, componentsProps.tooltip), ownerState);
  const tooltipArrowProps = appendOwnerState(ArrowComponent, _extends$3({}, componentsProps.arrow), ownerState);
  return /* @__PURE__ */ jsxs(react.exports.Fragment, {
    children: [/* @__PURE__ */ react.exports.cloneElement(children, childrenProps), /* @__PURE__ */ jsx(PopperComponent2, _extends$3({
      as: PopperComponentProp != null ? PopperComponentProp : Popper$1,
      placement,
      anchorEl: followCursor ? {
        getBoundingClientRect: () => ({
          top: positionRef.current.y,
          left: positionRef.current.x,
          right: positionRef.current.x,
          bottom: positionRef.current.y,
          width: 0,
          height: 0
        })
      } : childNode,
      popperRef,
      open: childNode ? open : false,
      id,
      transition: true
    }, interactiveWrapperListeners, popperProps, {
      className: clsx(classes.popper, (_componentsProps$popp = componentsProps.popper) == null ? void 0 : _componentsProps$popp.className),
      popperOptions,
      children: ({
        TransitionProps: TransitionPropsInner
      }) => {
        var _componentsProps$tool, _componentsProps$arro;
        return /* @__PURE__ */ jsx(TransitionComponent, _extends$3({
          timeout: theme2.transitions.duration.shorter
        }, TransitionPropsInner, transitionProps, {
          children: /* @__PURE__ */ jsxs(TooltipComponent, _extends$3({}, tooltipProps, {
            className: clsx(classes.tooltip, (_componentsProps$tool = componentsProps.tooltip) == null ? void 0 : _componentsProps$tool.className),
            children: [title, arrow2 ? /* @__PURE__ */ jsx(ArrowComponent, _extends$3({}, tooltipArrowProps, {
              className: clsx(classes.arrow, (_componentsProps$arro = componentsProps.arrow) == null ? void 0 : _componentsProps$arro.className),
              ref: setArrowRef
            })) : null]
          }))
        }));
      }
    }))]
  });
});
var Tooltip$1 = Tooltip;
function getAppBarUtilityClass(slot) {
  return generateUtilityClass("MuiAppBar", slot);
}
generateUtilityClasses("MuiAppBar", ["root", "positionFixed", "positionAbsolute", "positionSticky", "positionStatic", "positionRelative", "colorDefault", "colorPrimary", "colorSecondary", "colorInherit", "colorTransparent"]);
const _excluded$s = ["className", "color", "enableColorOnDark", "position"];
const useUtilityClasses$p = (ownerState) => {
  const {
    color,
    position,
    classes
  } = ownerState;
  const slots = {
    root: ["root", `color${capitalize(color)}`, `position${capitalize(position)}`]
  };
  return composeClasses(slots, getAppBarUtilityClass, classes);
};
const AppBarRoot = styled$3(Paper$1, {
  name: "MuiAppBar",
  slot: "Root",
  overridesResolver: (props, styles2) => {
    const {
      ownerState
    } = props;
    return [styles2.root, styles2[`position${capitalize(ownerState.position)}`], styles2[`color${capitalize(ownerState.color)}`]];
  }
})(({
  theme: theme2,
  ownerState
}) => {
  const backgroundColorDefault = theme2.palette.mode === "light" ? theme2.palette.grey[100] : theme2.palette.grey[900];
  return _extends$3({
    display: "flex",
    flexDirection: "column",
    width: "100%",
    boxSizing: "border-box",
    flexShrink: 0
  }, ownerState.position === "fixed" && {
    position: "fixed",
    zIndex: theme2.zIndex.appBar,
    top: 0,
    left: "auto",
    right: 0,
    "@media print": {
      position: "absolute"
    }
  }, ownerState.position === "absolute" && {
    position: "absolute",
    zIndex: theme2.zIndex.appBar,
    top: 0,
    left: "auto",
    right: 0
  }, ownerState.position === "sticky" && {
    position: "sticky",
    zIndex: theme2.zIndex.appBar,
    top: 0,
    left: "auto",
    right: 0
  }, ownerState.position === "static" && {
    position: "static"
  }, ownerState.position === "relative" && {
    position: "relative"
  }, ownerState.color === "default" && {
    backgroundColor: backgroundColorDefault,
    color: theme2.palette.getContrastText(backgroundColorDefault)
  }, ownerState.color && ownerState.color !== "default" && ownerState.color !== "inherit" && ownerState.color !== "transparent" && {
    backgroundColor: theme2.palette[ownerState.color].main,
    color: theme2.palette[ownerState.color].contrastText
  }, ownerState.color === "inherit" && {
    color: "inherit"
  }, theme2.palette.mode === "dark" && !ownerState.enableColorOnDark && {
    backgroundColor: null,
    color: null
  }, ownerState.color === "transparent" && _extends$3({
    backgroundColor: "transparent",
    color: "inherit"
  }, theme2.palette.mode === "dark" && {
    backgroundImage: "none"
  }));
});
const AppBar = /* @__PURE__ */ react.exports.forwardRef(function AppBar2(inProps, ref) {
  const props = useThemeProps({
    props: inProps,
    name: "MuiAppBar"
  });
  const {
    className,
    color = "primary",
    enableColorOnDark = false,
    position = "fixed"
  } = props, other = _objectWithoutPropertiesLoose$1(props, _excluded$s);
  const ownerState = _extends$3({}, props, {
    color,
    position,
    enableColorOnDark
  });
  const classes = useUtilityClasses$p(ownerState);
  return /* @__PURE__ */ jsx(AppBarRoot, _extends$3({
    square: true,
    component: "header",
    ownerState,
    elevation: 4,
    className: clsx(classes.root, className, position === "fixed" && "mui-fixed"),
    ref
  }, other));
});
var AppBar$1 = AppBar;
const defaultTheme = createTheme$2();
const Box = createBox({
  defaultTheme
});
var Box$1 = Box;
function formControlState({
  props,
  states,
  muiFormControl
}) {
  return states.reduce((acc, state) => {
    acc[state] = props[state];
    if (muiFormControl) {
      if (typeof props[state] === "undefined") {
        acc[state] = muiFormControl[state];
      }
    }
    return acc;
  }, {});
}
const FormControlContext = /* @__PURE__ */ react.exports.createContext();
var FormControlContext$1 = FormControlContext;
function useFormControl() {
  return react.exports.useContext(FormControlContext$1);
}
function GlobalStyles(props) {
  return /* @__PURE__ */ jsx(GlobalStyles$1, _extends$3({}, props, {
    defaultTheme: defaultTheme$1
  }));
}
function hasValue(value) {
  return value != null && !(Array.isArray(value) && value.length === 0);
}
function isFilled(obj, SSR = false) {
  return obj && (hasValue(obj.value) && obj.value !== "" || SSR && hasValue(obj.defaultValue) && obj.defaultValue !== "");
}
function isAdornedStart(obj) {
  return obj.startAdornment;
}
function getInputBaseUtilityClass(slot) {
  return generateUtilityClass("MuiInputBase", slot);
}
const inputBaseClasses = generateUtilityClasses("MuiInputBase", ["root", "formControl", "focused", "disabled", "adornedStart", "adornedEnd", "error", "sizeSmall", "multiline", "colorSecondary", "fullWidth", "hiddenLabel", "input", "inputSizeSmall", "inputMultiline", "inputTypeSearch", "inputAdornedStart", "inputAdornedEnd", "inputHiddenLabel"]);
var inputBaseClasses$1 = inputBaseClasses;
const _excluded$r = ["aria-describedby", "autoComplete", "autoFocus", "className", "color", "components", "componentsProps", "defaultValue", "disabled", "endAdornment", "error", "fullWidth", "id", "inputComponent", "inputProps", "inputRef", "margin", "maxRows", "minRows", "multiline", "name", "onBlur", "onChange", "onClick", "onFocus", "onKeyDown", "onKeyUp", "placeholder", "readOnly", "renderSuffix", "rows", "size", "startAdornment", "type", "value"];
const rootOverridesResolver = (props, styles2) => {
  const {
    ownerState
  } = props;
  return [styles2.root, ownerState.formControl && styles2.formControl, ownerState.startAdornment && styles2.adornedStart, ownerState.endAdornment && styles2.adornedEnd, ownerState.error && styles2.error, ownerState.size === "small" && styles2.sizeSmall, ownerState.multiline && styles2.multiline, ownerState.color && styles2[`color${capitalize(ownerState.color)}`], ownerState.fullWidth && styles2.fullWidth, ownerState.hiddenLabel && styles2.hiddenLabel];
};
const inputOverridesResolver = (props, styles2) => {
  const {
    ownerState
  } = props;
  return [styles2.input, ownerState.size === "small" && styles2.inputSizeSmall, ownerState.multiline && styles2.inputMultiline, ownerState.type === "search" && styles2.inputTypeSearch, ownerState.startAdornment && styles2.inputAdornedStart, ownerState.endAdornment && styles2.inputAdornedEnd, ownerState.hiddenLabel && styles2.inputHiddenLabel];
};
const useUtilityClasses$o = (ownerState) => {
  const {
    classes,
    color,
    disabled,
    error,
    endAdornment,
    focused,
    formControl,
    fullWidth,
    hiddenLabel,
    multiline,
    size,
    startAdornment,
    type
  } = ownerState;
  const slots = {
    root: ["root", `color${capitalize(color)}`, disabled && "disabled", error && "error", fullWidth && "fullWidth", focused && "focused", formControl && "formControl", size === "small" && "sizeSmall", multiline && "multiline", startAdornment && "adornedStart", endAdornment && "adornedEnd", hiddenLabel && "hiddenLabel"],
    input: ["input", disabled && "disabled", type === "search" && "inputTypeSearch", multiline && "inputMultiline", size === "small" && "inputSizeSmall", hiddenLabel && "inputHiddenLabel", startAdornment && "inputAdornedStart", endAdornment && "inputAdornedEnd"]
  };
  return composeClasses(slots, getInputBaseUtilityClass, classes);
};
const InputBaseRoot = styled$3("div", {
  name: "MuiInputBase",
  slot: "Root",
  overridesResolver: rootOverridesResolver
})(({
  theme: theme2,
  ownerState
}) => _extends$3({}, theme2.typography.body1, {
  color: theme2.palette.text.primary,
  lineHeight: "1.4375em",
  boxSizing: "border-box",
  position: "relative",
  cursor: "text",
  display: "inline-flex",
  alignItems: "center",
  [`&.${inputBaseClasses$1.disabled}`]: {
    color: theme2.palette.text.disabled,
    cursor: "default"
  }
}, ownerState.multiline && _extends$3({
  padding: "4px 0 5px"
}, ownerState.size === "small" && {
  paddingTop: 1
}), ownerState.fullWidth && {
  width: "100%"
}));
const InputBaseComponent = styled$3("input", {
  name: "MuiInputBase",
  slot: "Input",
  overridesResolver: inputOverridesResolver
})(({
  theme: theme2,
  ownerState
}) => {
  const light = theme2.palette.mode === "light";
  const placeholder = {
    color: "currentColor",
    opacity: light ? 0.42 : 0.5,
    transition: theme2.transitions.create("opacity", {
      duration: theme2.transitions.duration.shorter
    })
  };
  const placeholderHidden = {
    opacity: "0 !important"
  };
  const placeholderVisible = {
    opacity: light ? 0.42 : 0.5
  };
  return _extends$3({
    font: "inherit",
    letterSpacing: "inherit",
    color: "currentColor",
    padding: "4px 0 5px",
    border: 0,
    boxSizing: "content-box",
    background: "none",
    height: "1.4375em",
    margin: 0,
    WebkitTapHighlightColor: "transparent",
    display: "block",
    minWidth: 0,
    width: "100%",
    animationName: "mui-auto-fill-cancel",
    animationDuration: "10ms",
    "&::-webkit-input-placeholder": placeholder,
    "&::-moz-placeholder": placeholder,
    "&:-ms-input-placeholder": placeholder,
    "&::-ms-input-placeholder": placeholder,
    "&:focus": {
      outline: 0
    },
    "&:invalid": {
      boxShadow: "none"
    },
    "&::-webkit-search-decoration": {
      WebkitAppearance: "none"
    },
    [`label[data-shrink=false] + .${inputBaseClasses$1.formControl} &`]: {
      "&::-webkit-input-placeholder": placeholderHidden,
      "&::-moz-placeholder": placeholderHidden,
      "&:-ms-input-placeholder": placeholderHidden,
      "&::-ms-input-placeholder": placeholderHidden,
      "&:focus::-webkit-input-placeholder": placeholderVisible,
      "&:focus::-moz-placeholder": placeholderVisible,
      "&:focus:-ms-input-placeholder": placeholderVisible,
      "&:focus::-ms-input-placeholder": placeholderVisible
    },
    [`&.${inputBaseClasses$1.disabled}`]: {
      opacity: 1,
      WebkitTextFillColor: theme2.palette.text.disabled
    },
    "&:-webkit-autofill": {
      animationDuration: "5000s",
      animationName: "mui-auto-fill"
    }
  }, ownerState.size === "small" && {
    paddingTop: 1
  }, ownerState.multiline && {
    height: "auto",
    resize: "none",
    padding: 0,
    paddingTop: 0
  }, ownerState.type === "search" && {
    MozAppearance: "textfield",
    WebkitAppearance: "textfield"
  });
});
const inputGlobalStyles = /* @__PURE__ */ jsx(GlobalStyles, {
  styles: {
    "@keyframes mui-auto-fill": {
      from: {
        display: "block"
      }
    },
    "@keyframes mui-auto-fill-cancel": {
      from: {
        display: "block"
      }
    }
  }
});
const InputBase = /* @__PURE__ */ react.exports.forwardRef(function InputBase2(inProps, ref) {
  const props = useThemeProps({
    props: inProps,
    name: "MuiInputBase"
  });
  const {
    "aria-describedby": ariaDescribedby,
    autoComplete,
    autoFocus,
    className,
    components = {},
    componentsProps = {},
    defaultValue,
    disabled,
    endAdornment,
    fullWidth = false,
    id,
    inputComponent = "input",
    inputProps: inputPropsProp = {},
    inputRef: inputRefProp,
    maxRows,
    minRows,
    multiline = false,
    name,
    onBlur,
    onChange,
    onClick,
    onFocus,
    onKeyDown,
    onKeyUp,
    placeholder,
    readOnly,
    renderSuffix,
    rows,
    startAdornment,
    type = "text",
    value: valueProp
  } = props, other = _objectWithoutPropertiesLoose$1(props, _excluded$r);
  const value = inputPropsProp.value != null ? inputPropsProp.value : valueProp;
  const {
    current: isControlled
  } = react.exports.useRef(value != null);
  const inputRef = react.exports.useRef();
  const handleInputRefWarning = react.exports.useCallback((instance) => {
  }, []);
  const handleInputPropsRefProp = useForkRef(inputPropsProp.ref, handleInputRefWarning);
  const handleInputRefProp = useForkRef(inputRefProp, handleInputPropsRefProp);
  const handleInputRef = useForkRef(inputRef, handleInputRefProp);
  const [focused, setFocused] = react.exports.useState(false);
  const muiFormControl = useFormControl();
  const fcs = formControlState({
    props,
    muiFormControl,
    states: ["color", "disabled", "error", "hiddenLabel", "size", "required", "filled"]
  });
  fcs.focused = muiFormControl ? muiFormControl.focused : focused;
  react.exports.useEffect(() => {
    if (!muiFormControl && disabled && focused) {
      setFocused(false);
      if (onBlur) {
        onBlur();
      }
    }
  }, [muiFormControl, disabled, focused, onBlur]);
  const onFilled = muiFormControl && muiFormControl.onFilled;
  const onEmpty = muiFormControl && muiFormControl.onEmpty;
  const checkDirty = react.exports.useCallback((obj) => {
    if (isFilled(obj)) {
      if (onFilled) {
        onFilled();
      }
    } else if (onEmpty) {
      onEmpty();
    }
  }, [onFilled, onEmpty]);
  useEnhancedEffect$1(() => {
    if (isControlled) {
      checkDirty({
        value
      });
    }
  }, [value, checkDirty, isControlled]);
  const handleFocus = (event) => {
    if (fcs.disabled) {
      event.stopPropagation();
      return;
    }
    if (onFocus) {
      onFocus(event);
    }
    if (inputPropsProp.onFocus) {
      inputPropsProp.onFocus(event);
    }
    if (muiFormControl && muiFormControl.onFocus) {
      muiFormControl.onFocus(event);
    } else {
      setFocused(true);
    }
  };
  const handleBlur = (event) => {
    if (onBlur) {
      onBlur(event);
    }
    if (inputPropsProp.onBlur) {
      inputPropsProp.onBlur(event);
    }
    if (muiFormControl && muiFormControl.onBlur) {
      muiFormControl.onBlur(event);
    } else {
      setFocused(false);
    }
  };
  const handleChange = (event, ...args) => {
    if (!isControlled) {
      const element = event.target || inputRef.current;
      if (element == null) {
        throw new Error(formatMuiErrorMessage(1));
      }
      checkDirty({
        value: element.value
      });
    }
    if (inputPropsProp.onChange) {
      inputPropsProp.onChange(event, ...args);
    }
    if (onChange) {
      onChange(event, ...args);
    }
  };
  react.exports.useEffect(() => {
    checkDirty(inputRef.current);
  }, []);
  const handleClick = (event) => {
    if (inputRef.current && event.currentTarget === event.target) {
      inputRef.current.focus();
    }
    if (onClick) {
      onClick(event);
    }
  };
  let InputComponent = inputComponent;
  let inputProps = inputPropsProp;
  if (multiline && InputComponent === "input") {
    if (rows) {
      inputProps = _extends$3({
        type: void 0,
        minRows: rows,
        maxRows: rows
      }, inputProps);
    } else {
      inputProps = _extends$3({
        type: void 0,
        maxRows,
        minRows
      }, inputProps);
    }
    InputComponent = TextareaAutosize$1;
  }
  const handleAutoFill = (event) => {
    checkDirty(event.animationName === "mui-auto-fill-cancel" ? inputRef.current : {
      value: "x"
    });
  };
  react.exports.useEffect(() => {
    if (muiFormControl) {
      muiFormControl.setAdornedStart(Boolean(startAdornment));
    }
  }, [muiFormControl, startAdornment]);
  const ownerState = _extends$3({}, props, {
    color: fcs.color || "primary",
    disabled: fcs.disabled,
    endAdornment,
    error: fcs.error,
    focused: fcs.focused,
    formControl: muiFormControl,
    fullWidth,
    hiddenLabel: fcs.hiddenLabel,
    multiline,
    size: fcs.size,
    startAdornment,
    type
  });
  const classes = useUtilityClasses$o(ownerState);
  const Root = components.Root || InputBaseRoot;
  const rootProps = componentsProps.root || {};
  const Input3 = components.Input || InputBaseComponent;
  inputProps = _extends$3({}, inputProps, componentsProps.input);
  return /* @__PURE__ */ jsxs(react.exports.Fragment, {
    children: [inputGlobalStyles, /* @__PURE__ */ jsxs(Root, _extends$3({}, rootProps, !isHostComponent(Root) && {
      ownerState: _extends$3({}, ownerState, rootProps.ownerState)
    }, {
      ref,
      onClick: handleClick
    }, other, {
      className: clsx(classes.root, rootProps.className, className),
      children: [startAdornment, /* @__PURE__ */ jsx(FormControlContext$1.Provider, {
        value: null,
        children: /* @__PURE__ */ jsx(Input3, _extends$3({
          ownerState,
          "aria-invalid": fcs.error,
          "aria-describedby": ariaDescribedby,
          autoComplete,
          autoFocus,
          defaultValue,
          disabled: fcs.disabled,
          id,
          onAnimationStart: handleAutoFill,
          name,
          placeholder,
          readOnly,
          required: fcs.required,
          rows,
          value,
          onKeyDown,
          onKeyUp,
          type
        }, inputProps, !isHostComponent(Input3) && {
          as: InputComponent,
          ownerState: _extends$3({}, ownerState, inputProps.ownerState)
        }, {
          ref: handleInputRef,
          className: clsx(classes.input, inputProps.className, inputPropsProp.className),
          onBlur: handleBlur,
          onChange: handleChange,
          onFocus: handleFocus
        }))
      }), endAdornment, renderSuffix ? renderSuffix(_extends$3({}, fcs, {
        startAdornment
      })) : null]
    }))]
  });
});
var InputBase$1 = InputBase;
function getToolbarUtilityClass(slot) {
  return generateUtilityClass("MuiToolbar", slot);
}
generateUtilityClasses("MuiToolbar", ["root", "gutters", "regular", "dense"]);
const _excluded$q = ["className", "component", "disableGutters", "variant"];
const useUtilityClasses$n = (ownerState) => {
  const {
    classes,
    disableGutters,
    variant
  } = ownerState;
  const slots = {
    root: ["root", !disableGutters && "gutters", variant]
  };
  return composeClasses(slots, getToolbarUtilityClass, classes);
};
const ToolbarRoot = styled$3("div", {
  name: "MuiToolbar",
  slot: "Root",
  overridesResolver: (props, styles2) => {
    const {
      ownerState
    } = props;
    return [styles2.root, !ownerState.disableGutters && styles2.gutters, styles2[ownerState.variant]];
  }
})(({
  theme: theme2,
  ownerState
}) => _extends$3({
  position: "relative",
  display: "flex",
  alignItems: "center"
}, !ownerState.disableGutters && {
  paddingLeft: theme2.spacing(2),
  paddingRight: theme2.spacing(2),
  [theme2.breakpoints.up("sm")]: {
    paddingLeft: theme2.spacing(3),
    paddingRight: theme2.spacing(3)
  }
}, ownerState.variant === "dense" && {
  minHeight: 48
}), ({
  theme: theme2,
  ownerState
}) => ownerState.variant === "regular" && theme2.mixins.toolbar);
const Toolbar = /* @__PURE__ */ react.exports.forwardRef(function Toolbar2(inProps, ref) {
  const props = useThemeProps({
    props: inProps,
    name: "MuiToolbar"
  });
  const {
    className,
    component = "div",
    disableGutters = false,
    variant = "regular"
  } = props, other = _objectWithoutPropertiesLoose$1(props, _excluded$q);
  const ownerState = _extends$3({}, props, {
    component,
    disableGutters,
    variant
  });
  const classes = useUtilityClasses$n(ownerState);
  return /* @__PURE__ */ jsx(ToolbarRoot, _extends$3({
    as: component,
    className: clsx(classes.root, className),
    ref,
    ownerState
  }, other));
});
var Toolbar$1 = Toolbar;
function useObservableAndState(init2, inputs) {
  const observable$ = useObservable(init2, inputs);
  return [useObservableState(observable$), observable$];
}
function getListSubheaderUtilityClass(slot) {
  return generateUtilityClass("MuiListSubheader", slot);
}
generateUtilityClasses("MuiListSubheader", ["root", "colorPrimary", "colorInherit", "gutters", "inset", "sticky"]);
const _excluded$p = ["className", "color", "component", "disableGutters", "disableSticky", "inset"];
const useUtilityClasses$m = (ownerState) => {
  const {
    classes,
    color,
    disableGutters,
    inset,
    disableSticky
  } = ownerState;
  const slots = {
    root: ["root", color !== "default" && `color${capitalize(color)}`, !disableGutters && "gutters", inset && "inset", !disableSticky && "sticky"]
  };
  return composeClasses(slots, getListSubheaderUtilityClass, classes);
};
const ListSubheaderRoot = styled$3("li", {
  name: "MuiListSubheader",
  slot: "Root",
  overridesResolver: (props, styles2) => {
    const {
      ownerState
    } = props;
    return [styles2.root, ownerState.color !== "default" && styles2[`color${capitalize(ownerState.color)}`], !ownerState.disableGutters && styles2.gutters, ownerState.inset && styles2.inset, !ownerState.disableSticky && styles2.sticky];
  }
})(({
  theme: theme2,
  ownerState
}) => _extends$3({
  boxSizing: "border-box",
  lineHeight: "48px",
  listStyle: "none",
  color: theme2.palette.text.secondary,
  fontFamily: theme2.typography.fontFamily,
  fontWeight: theme2.typography.fontWeightMedium,
  fontSize: theme2.typography.pxToRem(14)
}, ownerState.color === "primary" && {
  color: theme2.palette.primary.main
}, ownerState.color === "inherit" && {
  color: "inherit"
}, !ownerState.disableGutters && {
  paddingLeft: 16,
  paddingRight: 16
}, ownerState.inset && {
  paddingLeft: 72
}, !ownerState.disableSticky && {
  position: "sticky",
  top: 0,
  zIndex: 1,
  backgroundColor: theme2.palette.background.paper
}));
const ListSubheader = /* @__PURE__ */ react.exports.forwardRef(function ListSubheader2(inProps, ref) {
  const props = useThemeProps({
    props: inProps,
    name: "MuiListSubheader"
  });
  const {
    className,
    color = "default",
    component = "li",
    disableGutters = false,
    disableSticky = false,
    inset = false
  } = props, other = _objectWithoutPropertiesLoose$1(props, _excluded$p);
  const ownerState = _extends$3({}, props, {
    color,
    component,
    disableGutters,
    disableSticky,
    inset
  });
  const classes = useUtilityClasses$m(ownerState);
  return /* @__PURE__ */ jsx(ListSubheaderRoot, _extends$3({
    as: component,
    className: clsx(classes.root, className),
    ref,
    ownerState
  }, other));
});
var ListSubheader$1 = ListSubheader;
var CancelIcon = createSvgIcon(/* @__PURE__ */ jsx("path", {
  d: "M12 2C6.47 2 2 6.47 2 12s4.47 10 10 10 10-4.47 10-10S17.53 2 12 2zm5 13.59L15.59 17 12 13.41 8.41 17 7 15.59 10.59 12 7 8.41 8.41 7 12 10.59 15.59 7 17 8.41 13.41 12 17 15.59z"
}), "Cancel");
function getChipUtilityClass(slot) {
  return generateUtilityClass("MuiChip", slot);
}
const chipClasses = generateUtilityClasses("MuiChip", ["root", "sizeSmall", "sizeMedium", "colorPrimary", "colorSecondary", "disabled", "clickable", "clickableColorPrimary", "clickableColorSecondary", "deletable", "deletableColorPrimary", "deletableColorSecondary", "outlined", "filled", "outlinedPrimary", "outlinedSecondary", "avatar", "avatarSmall", "avatarMedium", "avatarColorPrimary", "avatarColorSecondary", "icon", "iconSmall", "iconMedium", "iconColorPrimary", "iconColorSecondary", "label", "labelSmall", "labelMedium", "deleteIcon", "deleteIconSmall", "deleteIconMedium", "deleteIconColorPrimary", "deleteIconColorSecondary", "deleteIconOutlinedColorPrimary", "deleteIconOutlinedColorSecondary", "focusVisible"]);
var chipClasses$1 = chipClasses;
const _excluded$o = ["avatar", "className", "clickable", "color", "component", "deleteIcon", "disabled", "icon", "label", "onClick", "onDelete", "onKeyDown", "onKeyUp", "size", "variant"];
const useUtilityClasses$l = (ownerState) => {
  const {
    classes,
    disabled,
    size,
    color,
    onDelete,
    clickable,
    variant
  } = ownerState;
  const slots = {
    root: ["root", variant, disabled && "disabled", `size${capitalize(size)}`, `color${capitalize(color)}`, clickable && "clickable", clickable && `clickableColor${capitalize(color)}`, onDelete && "deletable", onDelete && `deletableColor${capitalize(color)}`, `${variant}${capitalize(color)}`],
    label: ["label", `label${capitalize(size)}`],
    avatar: ["avatar", `avatar${capitalize(size)}`, `avatarColor${capitalize(color)}`],
    icon: ["icon", `icon${capitalize(size)}`, `iconColor${capitalize(color)}`],
    deleteIcon: ["deleteIcon", `deleteIcon${capitalize(size)}`, `deleteIconColor${capitalize(color)}`, `deleteIconOutlinedColor${capitalize(color)}`]
  };
  return composeClasses(slots, getChipUtilityClass, classes);
};
const ChipRoot = styled$3("div", {
  name: "MuiChip",
  slot: "Root",
  overridesResolver: (props, styles2) => {
    const {
      ownerState
    } = props;
    const {
      color,
      clickable,
      onDelete,
      size,
      variant
    } = ownerState;
    return [{
      [`& .${chipClasses$1.avatar}`]: styles2.avatar
    }, {
      [`& .${chipClasses$1.avatar}`]: styles2[`avatar${capitalize(size)}`]
    }, {
      [`& .${chipClasses$1.avatar}`]: styles2[`avatarColor${capitalize(color)}`]
    }, {
      [`& .${chipClasses$1.icon}`]: styles2.icon
    }, {
      [`& .${chipClasses$1.icon}`]: styles2[`icon${capitalize(size)}`]
    }, {
      [`& .${chipClasses$1.icon}`]: styles2[`iconColor${capitalize(color)}`]
    }, {
      [`& .${chipClasses$1.deleteIcon}`]: styles2.deleteIcon
    }, {
      [`& .${chipClasses$1.deleteIcon}`]: styles2[`deleteIcon${capitalize(size)}`]
    }, {
      [`& .${chipClasses$1.deleteIcon}`]: styles2[`deleteIconColor${capitalize(color)}`]
    }, {
      [`& .${chipClasses$1.deleteIcon}`]: styles2[`deleteIconOutlinedColor${capitalize(color)}`]
    }, styles2.root, styles2[`size${capitalize(size)}`], styles2[`color${capitalize(color)}`], clickable && styles2.clickable, clickable && color !== "default" && styles2[`clickableColor${capitalize(color)})`], onDelete && styles2.deletable, onDelete && color !== "default" && styles2[`deletableColor${capitalize(color)}`], styles2[variant], variant === "outlined" && styles2[`outlined${capitalize(color)}`]];
  }
})(({
  theme: theme2,
  ownerState
}) => {
  const deleteIconColor = alpha(theme2.palette.text.primary, 0.26);
  return _extends$3({
    fontFamily: theme2.typography.fontFamily,
    fontSize: theme2.typography.pxToRem(13),
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    height: 32,
    color: theme2.palette.text.primary,
    backgroundColor: theme2.palette.action.selected,
    borderRadius: 32 / 2,
    whiteSpace: "nowrap",
    transition: theme2.transitions.create(["background-color", "box-shadow"]),
    cursor: "default",
    outline: 0,
    textDecoration: "none",
    border: 0,
    padding: 0,
    verticalAlign: "middle",
    boxSizing: "border-box",
    [`&.${chipClasses$1.disabled}`]: {
      opacity: theme2.palette.action.disabledOpacity,
      pointerEvents: "none"
    },
    [`& .${chipClasses$1.avatar}`]: {
      marginLeft: 5,
      marginRight: -6,
      width: 24,
      height: 24,
      color: theme2.palette.mode === "light" ? theme2.palette.grey[700] : theme2.palette.grey[300],
      fontSize: theme2.typography.pxToRem(12)
    },
    [`& .${chipClasses$1.avatarColorPrimary}`]: {
      color: theme2.palette.primary.contrastText,
      backgroundColor: theme2.palette.primary.dark
    },
    [`& .${chipClasses$1.avatarColorSecondary}`]: {
      color: theme2.palette.secondary.contrastText,
      backgroundColor: theme2.palette.secondary.dark
    },
    [`& .${chipClasses$1.avatarSmall}`]: {
      marginLeft: 4,
      marginRight: -4,
      width: 18,
      height: 18,
      fontSize: theme2.typography.pxToRem(10)
    },
    [`& .${chipClasses$1.icon}`]: _extends$3({
      color: theme2.palette.mode === "light" ? theme2.palette.grey[700] : theme2.palette.grey[300],
      marginLeft: 5,
      marginRight: -6
    }, ownerState.size === "small" && {
      fontSize: 18,
      marginLeft: 4,
      marginRight: -4
    }, ownerState.color !== "default" && {
      color: "inherit"
    }),
    [`& .${chipClasses$1.deleteIcon}`]: _extends$3({
      WebkitTapHighlightColor: "transparent",
      color: deleteIconColor,
      fontSize: 22,
      cursor: "pointer",
      margin: "0 5px 0 -6px",
      "&:hover": {
        color: alpha(deleteIconColor, 0.4)
      }
    }, ownerState.size === "small" && {
      fontSize: 16,
      marginRight: 4,
      marginLeft: -4
    }, ownerState.color !== "default" && {
      color: alpha(theme2.palette[ownerState.color].contrastText, 0.7),
      "&:hover, &:active": {
        color: theme2.palette[ownerState.color].contrastText
      }
    })
  }, ownerState.size === "small" && {
    height: 24
  }, ownerState.color !== "default" && {
    backgroundColor: theme2.palette[ownerState.color].main,
    color: theme2.palette[ownerState.color].contrastText
  }, ownerState.onDelete && {
    [`&.${chipClasses$1.focusVisible}`]: {
      backgroundColor: alpha(theme2.palette.action.selected, theme2.palette.action.selectedOpacity + theme2.palette.action.focusOpacity)
    }
  }, ownerState.onDelete && ownerState.color !== "default" && {
    [`&.${chipClasses$1.focusVisible}`]: {
      backgroundColor: theme2.palette[ownerState.color].dark
    }
  });
}, ({
  theme: theme2,
  ownerState
}) => _extends$3({}, ownerState.clickable && {
  userSelect: "none",
  WebkitTapHighlightColor: "transparent",
  cursor: "pointer",
  "&:hover": {
    backgroundColor: alpha(theme2.palette.action.selected, theme2.palette.action.selectedOpacity + theme2.palette.action.hoverOpacity)
  },
  [`&.${chipClasses$1.focusVisible}`]: {
    backgroundColor: alpha(theme2.palette.action.selected, theme2.palette.action.selectedOpacity + theme2.palette.action.focusOpacity)
  },
  "&:active": {
    boxShadow: theme2.shadows[1]
  }
}, ownerState.clickable && ownerState.color !== "default" && {
  [`&:hover, &.${chipClasses$1.focusVisible}`]: {
    backgroundColor: theme2.palette[ownerState.color].dark
  }
}), ({
  theme: theme2,
  ownerState
}) => _extends$3({}, ownerState.variant === "outlined" && {
  backgroundColor: "transparent",
  border: `1px solid ${theme2.palette.mode === "light" ? theme2.palette.grey[400] : theme2.palette.grey[700]}`,
  [`&.${chipClasses$1.clickable}:hover`]: {
    backgroundColor: theme2.palette.action.hover
  },
  [`&.${chipClasses$1.focusVisible}`]: {
    backgroundColor: theme2.palette.action.focus
  },
  [`& .${chipClasses$1.avatar}`]: {
    marginLeft: 4
  },
  [`& .${chipClasses$1.avatarSmall}`]: {
    marginLeft: 2
  },
  [`& .${chipClasses$1.icon}`]: {
    marginLeft: 4
  },
  [`& .${chipClasses$1.iconSmall}`]: {
    marginLeft: 2
  },
  [`& .${chipClasses$1.deleteIcon}`]: {
    marginRight: 5
  },
  [`& .${chipClasses$1.deleteIconSmall}`]: {
    marginRight: 3
  }
}, ownerState.variant === "outlined" && ownerState.color !== "default" && {
  color: theme2.palette[ownerState.color].main,
  border: `1px solid ${alpha(theme2.palette[ownerState.color].main, 0.7)}`,
  [`&.${chipClasses$1.clickable}:hover`]: {
    backgroundColor: alpha(theme2.palette[ownerState.color].main, theme2.palette.action.hoverOpacity)
  },
  [`&.${chipClasses$1.focusVisible}`]: {
    backgroundColor: alpha(theme2.palette[ownerState.color].main, theme2.palette.action.focusOpacity)
  },
  [`& .${chipClasses$1.deleteIcon}`]: {
    color: alpha(theme2.palette[ownerState.color].main, 0.7),
    "&:hover, &:active": {
      color: theme2.palette[ownerState.color].main
    }
  }
}));
const ChipLabel = styled$3("span", {
  name: "MuiChip",
  slot: "Label",
  overridesResolver: (props, styles2) => {
    const {
      ownerState
    } = props;
    const {
      size
    } = ownerState;
    return [styles2.label, styles2[`label${capitalize(size)}`]];
  }
})(({
  ownerState
}) => _extends$3({
  overflow: "hidden",
  textOverflow: "ellipsis",
  paddingLeft: 12,
  paddingRight: 12,
  whiteSpace: "nowrap"
}, ownerState.size === "small" && {
  paddingLeft: 8,
  paddingRight: 8
}));
function isDeleteKeyboardEvent(keyboardEvent) {
  return keyboardEvent.key === "Backspace" || keyboardEvent.key === "Delete";
}
const Chip = /* @__PURE__ */ react.exports.forwardRef(function Chip2(inProps, ref) {
  const props = useThemeProps({
    props: inProps,
    name: "MuiChip"
  });
  const {
    avatar: avatarProp,
    className,
    clickable: clickableProp,
    color = "default",
    component: ComponentProp,
    deleteIcon: deleteIconProp,
    disabled = false,
    icon: iconProp,
    label,
    onClick,
    onDelete,
    onKeyDown,
    onKeyUp,
    size = "medium",
    variant = "filled"
  } = props, other = _objectWithoutPropertiesLoose$1(props, _excluded$o);
  const chipRef = react.exports.useRef(null);
  const handleRef = useForkRef(chipRef, ref);
  const handleDeleteIconClick = (event) => {
    event.stopPropagation();
    if (onDelete) {
      onDelete(event);
    }
  };
  const handleKeyDown2 = (event) => {
    if (event.currentTarget === event.target && isDeleteKeyboardEvent(event)) {
      event.preventDefault();
    }
    if (onKeyDown) {
      onKeyDown(event);
    }
  };
  const handleKeyUp = (event) => {
    if (event.currentTarget === event.target) {
      if (onDelete && isDeleteKeyboardEvent(event)) {
        onDelete(event);
      } else if (event.key === "Escape" && chipRef.current) {
        chipRef.current.blur();
      }
    }
    if (onKeyUp) {
      onKeyUp(event);
    }
  };
  const clickable = clickableProp !== false && onClick ? true : clickableProp;
  const small = size === "small";
  const component = clickable || onDelete ? ButtonBase$1 : ComponentProp || "div";
  const ownerState = _extends$3({}, props, {
    component,
    disabled,
    size,
    color,
    onDelete: !!onDelete,
    clickable,
    variant
  });
  const classes = useUtilityClasses$l(ownerState);
  const moreProps = component === ButtonBase$1 ? _extends$3({
    component: ComponentProp || "div",
    focusVisibleClassName: classes.focusVisible
  }, onDelete && {
    disableRipple: true
  }) : {};
  let deleteIcon = null;
  if (onDelete) {
    const customClasses = clsx(color !== "default" && (variant === "outlined" ? classes[`deleteIconOutlinedColor${capitalize(color)}`] : classes[`deleteIconColor${capitalize(color)}`]), small && classes.deleteIconSmall);
    deleteIcon = deleteIconProp && /* @__PURE__ */ react.exports.isValidElement(deleteIconProp) ? /* @__PURE__ */ react.exports.cloneElement(deleteIconProp, {
      className: clsx(deleteIconProp.props.className, classes.deleteIcon, customClasses),
      onClick: handleDeleteIconClick
    }) : /* @__PURE__ */ jsx(CancelIcon, {
      className: clsx(classes.deleteIcon, customClasses),
      onClick: handleDeleteIconClick
    });
  }
  let avatar = null;
  if (avatarProp && /* @__PURE__ */ react.exports.isValidElement(avatarProp)) {
    avatar = /* @__PURE__ */ react.exports.cloneElement(avatarProp, {
      className: clsx(classes.avatar, avatarProp.props.className)
    });
  }
  let icon = null;
  if (iconProp && /* @__PURE__ */ react.exports.isValidElement(iconProp)) {
    icon = /* @__PURE__ */ react.exports.cloneElement(iconProp, {
      className: clsx(classes.icon, iconProp.props.className)
    });
  }
  return /* @__PURE__ */ jsxs(ChipRoot, _extends$3({
    as: component,
    className: clsx(classes.root, className),
    disabled: clickable && disabled ? true : void 0,
    onClick,
    onKeyDown: handleKeyDown2,
    onKeyUp: handleKeyUp,
    ref: handleRef,
    ownerState
  }, moreProps, other, {
    children: [avatar || icon, /* @__PURE__ */ jsx(ChipLabel, {
      className: clsx(classes.label),
      ownerState,
      children: label
    }), deleteIcon]
  }));
});
var Chip$1 = Chip;
function getInputUtilityClass(slot) {
  return generateUtilityClass("MuiInput", slot);
}
const inputClasses = generateUtilityClasses("MuiInput", ["root", "formControl", "focused", "disabled", "colorSecondary", "underline", "error", "sizeSmall", "multiline", "fullWidth", "input", "inputSizeSmall", "inputMultiline", "inputTypeSearch"]);
var inputClasses$1 = inputClasses;
function getOutlinedInputUtilityClass(slot) {
  return generateUtilityClass("MuiOutlinedInput", slot);
}
const outlinedInputClasses = generateUtilityClasses("MuiOutlinedInput", ["root", "colorSecondary", "focused", "disabled", "adornedStart", "adornedEnd", "error", "sizeSmall", "multiline", "notchedOutline", "input", "inputSizeSmall", "inputMultiline", "inputAdornedStart", "inputAdornedEnd"]);
var outlinedInputClasses$1 = outlinedInputClasses;
function getFilledInputUtilityClass(slot) {
  return generateUtilityClass("MuiFilledInput", slot);
}
const filledInputClasses = generateUtilityClasses("MuiFilledInput", ["root", "colorSecondary", "underline", "focused", "disabled", "adornedStart", "adornedEnd", "error", "sizeSmall", "multiline", "hiddenLabel", "input", "inputSizeSmall", "inputHiddenLabel", "inputMultiline", "inputAdornedStart", "inputAdornedEnd"]);
var filledInputClasses$1 = filledInputClasses;
var ClearIcon = createSvgIcon(/* @__PURE__ */ jsx("path", {
  d: "M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"
}), "Close");
var ArrowDropDownIcon = createSvgIcon(/* @__PURE__ */ jsx("path", {
  d: "M7 10l5 5 5-5z"
}), "ArrowDropDown");
function getAutocompleteUtilityClass(slot) {
  return generateUtilityClass("MuiAutocomplete", slot);
}
const autocompleteClasses = generateUtilityClasses("MuiAutocomplete", ["root", "fullWidth", "focused", "focusVisible", "tag", "tagSizeSmall", "tagSizeMedium", "hasPopupIcon", "hasClearIcon", "inputRoot", "input", "inputFocused", "endAdornment", "clearIndicator", "popupIndicator", "popupIndicatorOpen", "popper", "popperDisablePortal", "paper", "listbox", "loading", "noOptions", "option", "groupLabel", "groupUl"]);
var autocompleteClasses$1 = autocompleteClasses;
var _ClearIcon, _ArrowDropDownIcon;
const _excluded$n = ["autoComplete", "autoHighlight", "autoSelect", "blurOnSelect", "ChipProps", "className", "clearIcon", "clearOnBlur", "clearOnEscape", "clearText", "closeText", "componentsProps", "defaultValue", "disableClearable", "disableCloseOnSelect", "disabled", "disabledItemsFocusable", "disableListWrap", "disablePortal", "filterOptions", "filterSelectedOptions", "forcePopupIcon", "freeSolo", "fullWidth", "getLimitTagsText", "getOptionDisabled", "getOptionLabel", "isOptionEqualToValue", "groupBy", "handleHomeEndKeys", "id", "includeInputInList", "inputValue", "limitTags", "ListboxComponent", "ListboxProps", "loading", "loadingText", "multiple", "noOptionsText", "onChange", "onClose", "onHighlightChange", "onInputChange", "onOpen", "open", "openOnFocus", "openText", "options", "PaperComponent", "PopperComponent", "popupIcon", "renderGroup", "renderInput", "renderOption", "renderTags", "selectOnFocus", "size", "value"];
const useUtilityClasses$k = (ownerState) => {
  const {
    classes,
    disablePortal,
    focused,
    fullWidth,
    hasClearIcon,
    hasPopupIcon,
    inputFocused,
    popupOpen,
    size
  } = ownerState;
  const slots = {
    root: ["root", focused && "focused", fullWidth && "fullWidth", hasClearIcon && "hasClearIcon", hasPopupIcon && "hasPopupIcon"],
    inputRoot: ["inputRoot"],
    input: ["input", inputFocused && "inputFocused"],
    tag: ["tag", `tagSize${capitalize(size)}`],
    endAdornment: ["endAdornment"],
    clearIndicator: ["clearIndicator"],
    popupIndicator: ["popupIndicator", popupOpen && "popupIndicatorOpen"],
    popper: ["popper", disablePortal && "popperDisablePortal"],
    paper: ["paper"],
    listbox: ["listbox"],
    loading: ["loading"],
    noOptions: ["noOptions"],
    option: ["option"],
    groupLabel: ["groupLabel"],
    groupUl: ["groupUl"]
  };
  return composeClasses(slots, getAutocompleteUtilityClass, classes);
};
const AutocompleteRoot = styled$3("div", {
  name: "MuiAutocomplete",
  slot: "Root",
  overridesResolver: (props, styles2) => {
    const {
      ownerState
    } = props;
    const {
      fullWidth,
      hasClearIcon,
      hasPopupIcon,
      inputFocused,
      size
    } = ownerState;
    return [{
      [`& .${autocompleteClasses$1.tag}`]: styles2.tag
    }, {
      [`& .${autocompleteClasses$1.tag}`]: styles2[`tagSize${capitalize(size)}`]
    }, {
      [`& .${autocompleteClasses$1.inputRoot}`]: styles2.inputRoot
    }, {
      [`& .${autocompleteClasses$1.input}`]: styles2.input
    }, {
      [`& .${autocompleteClasses$1.input}`]: inputFocused && styles2.inputFocused
    }, styles2.root, fullWidth && styles2.fullWidth, hasPopupIcon && styles2.hasPopupIcon, hasClearIcon && styles2.hasClearIcon];
  }
})(({
  ownerState
}) => _extends$3({
  [`&.${autocompleteClasses$1.focused} .${autocompleteClasses$1.clearIndicator}`]: {
    visibility: "visible"
  },
  "@media (pointer: fine)": {
    [`&:hover .${autocompleteClasses$1.clearIndicator}`]: {
      visibility: "visible"
    }
  }
}, ownerState.fullWidth && {
  width: "100%"
}, {
  [`& .${autocompleteClasses$1.tag}`]: _extends$3({
    margin: 3,
    maxWidth: "calc(100% - 6px)"
  }, ownerState.size === "small" && {
    margin: 2,
    maxWidth: "calc(100% - 4px)"
  }),
  [`& .${autocompleteClasses$1.inputRoot}`]: {
    flexWrap: "wrap",
    [`.${autocompleteClasses$1.hasPopupIcon}&, .${autocompleteClasses$1.hasClearIcon}&`]: {
      paddingRight: 26 + 4
    },
    [`.${autocompleteClasses$1.hasPopupIcon}.${autocompleteClasses$1.hasClearIcon}&`]: {
      paddingRight: 52 + 4
    },
    [`& .${autocompleteClasses$1.input}`]: {
      width: 0,
      minWidth: 30
    }
  },
  [`& .${inputClasses$1.root}`]: {
    paddingBottom: 1,
    "& .MuiInput-input": {
      padding: "4px 4px 4px 0px"
    }
  },
  [`& .${inputClasses$1.root}.${inputBaseClasses$1.sizeSmall}`]: {
    [`& .${inputClasses$1.input}`]: {
      padding: "2px 4px 3px 0"
    }
  },
  [`& .${outlinedInputClasses$1.root}`]: {
    padding: 9,
    [`.${autocompleteClasses$1.hasPopupIcon}&, .${autocompleteClasses$1.hasClearIcon}&`]: {
      paddingRight: 26 + 4 + 9
    },
    [`.${autocompleteClasses$1.hasPopupIcon}.${autocompleteClasses$1.hasClearIcon}&`]: {
      paddingRight: 52 + 4 + 9
    },
    [`& .${autocompleteClasses$1.input}`]: {
      padding: "7.5px 4px 7.5px 6px"
    },
    [`& .${autocompleteClasses$1.endAdornment}`]: {
      right: 9
    }
  },
  [`& .${outlinedInputClasses$1.root}.${inputBaseClasses$1.sizeSmall}`]: {
    padding: 6,
    [`& .${autocompleteClasses$1.input}`]: {
      padding: "2.5px 4px 2.5px 6px"
    }
  },
  [`& .${filledInputClasses$1.root}`]: {
    paddingTop: 19,
    paddingLeft: 8,
    [`.${autocompleteClasses$1.hasPopupIcon}&, .${autocompleteClasses$1.hasClearIcon}&`]: {
      paddingRight: 26 + 4 + 9
    },
    [`.${autocompleteClasses$1.hasPopupIcon}.${autocompleteClasses$1.hasClearIcon}&`]: {
      paddingRight: 52 + 4 + 9
    },
    [`& .${filledInputClasses$1.input}`]: {
      padding: "7px 4px"
    },
    [`& .${autocompleteClasses$1.endAdornment}`]: {
      right: 9
    }
  },
  [`& .${filledInputClasses$1.root}.${inputBaseClasses$1.sizeSmall}`]: {
    paddingBottom: 1,
    [`& .${filledInputClasses$1.input}`]: {
      padding: "2.5px 4px"
    }
  },
  [`& .${autocompleteClasses$1.input}`]: _extends$3({
    flexGrow: 1,
    textOverflow: "ellipsis",
    opacity: 0
  }, ownerState.inputFocused && {
    opacity: 1
  })
}));
const AutocompleteEndAdornment = styled$3("div", {
  name: "MuiAutocomplete",
  slot: "EndAdornment",
  overridesResolver: (props, styles2) => styles2.endAdornment
})({
  position: "absolute",
  right: 0,
  top: "calc(50% - 14px)"
});
const AutocompleteClearIndicator = styled$3(IconButton$1, {
  name: "MuiAutocomplete",
  slot: "ClearIndicator",
  overridesResolver: (props, styles2) => styles2.clearIndicator
})({
  marginRight: -2,
  padding: 4,
  visibility: "hidden"
});
const AutocompletePopupIndicator = styled$3(IconButton$1, {
  name: "MuiAutocomplete",
  slot: "PopupIndicator",
  overridesResolver: ({
    ownerState
  }, styles2) => _extends$3({}, styles2.popupIndicator, ownerState.popupOpen && styles2.popupIndicatorOpen)
})(({
  ownerState
}) => _extends$3({
  padding: 2,
  marginRight: -2
}, ownerState.popupOpen && {
  transform: "rotate(180deg)"
}));
const AutocompletePopper = styled$3(Popper$1, {
  name: "MuiAutocomplete",
  slot: "Popper",
  overridesResolver: (props, styles2) => {
    const {
      ownerState
    } = props;
    return [{
      [`& .${autocompleteClasses$1.option}`]: styles2.option
    }, styles2.popper, ownerState.disablePortal && styles2.popperDisablePortal];
  }
})(({
  theme: theme2,
  ownerState
}) => _extends$3({
  zIndex: theme2.zIndex.modal
}, ownerState.disablePortal && {
  position: "absolute"
}));
const AutocompletePaper = styled$3(Paper$1, {
  name: "MuiAutocomplete",
  slot: "Paper",
  overridesResolver: (props, styles2) => styles2.paper
})(({
  theme: theme2
}) => _extends$3({}, theme2.typography.body1, {
  overflow: "auto"
}));
const AutocompleteLoading = styled$3("div", {
  name: "MuiAutocomplete",
  slot: "Loading",
  overridesResolver: (props, styles2) => styles2.loading
})(({
  theme: theme2
}) => ({
  color: theme2.palette.text.secondary,
  padding: "14px 16px"
}));
const AutocompleteNoOptions = styled$3("div", {
  name: "MuiAutocomplete",
  slot: "NoOptions",
  overridesResolver: (props, styles2) => styles2.noOptions
})(({
  theme: theme2
}) => ({
  color: theme2.palette.text.secondary,
  padding: "14px 16px"
}));
const AutocompleteListbox = styled$3("div", {
  name: "MuiAutocomplete",
  slot: "Listbox",
  overridesResolver: (props, styles2) => styles2.listbox
})(({
  theme: theme2
}) => ({
  listStyle: "none",
  margin: 0,
  padding: "8px 0",
  maxHeight: "40vh",
  overflow: "auto",
  [`& .${autocompleteClasses$1.option}`]: {
    minHeight: 48,
    display: "flex",
    overflow: "hidden",
    justifyContent: "flex-start",
    alignItems: "center",
    cursor: "pointer",
    paddingTop: 6,
    boxSizing: "border-box",
    outline: "0",
    WebkitTapHighlightColor: "transparent",
    paddingBottom: 6,
    paddingLeft: 16,
    paddingRight: 16,
    [theme2.breakpoints.up("sm")]: {
      minHeight: "auto"
    },
    [`&.${autocompleteClasses$1.focused}`]: {
      backgroundColor: theme2.palette.action.hover,
      "@media (hover: none)": {
        backgroundColor: "transparent"
      }
    },
    '&[aria-disabled="true"]': {
      opacity: theme2.palette.action.disabledOpacity,
      pointerEvents: "none"
    },
    [`&.${autocompleteClasses$1.focusVisible}`]: {
      backgroundColor: theme2.palette.action.focus
    },
    '&[aria-selected="true"]': {
      backgroundColor: alpha(theme2.palette.primary.main, theme2.palette.action.selectedOpacity),
      [`&.${autocompleteClasses$1.focused}`]: {
        backgroundColor: alpha(theme2.palette.primary.main, theme2.palette.action.selectedOpacity + theme2.palette.action.hoverOpacity),
        "@media (hover: none)": {
          backgroundColor: theme2.palette.action.selected
        }
      },
      [`&.${autocompleteClasses$1.focusVisible}`]: {
        backgroundColor: alpha(theme2.palette.primary.main, theme2.palette.action.selectedOpacity + theme2.palette.action.focusOpacity)
      }
    }
  }
}));
const AutocompleteGroupLabel = styled$3(ListSubheader$1, {
  name: "MuiAutocomplete",
  slot: "GroupLabel",
  overridesResolver: (props, styles2) => styles2.groupLabel
})(({
  theme: theme2
}) => ({
  backgroundColor: theme2.palette.background.paper,
  top: -8
}));
const AutocompleteGroupUl = styled$3("ul", {
  name: "MuiAutocomplete",
  slot: "GroupUl",
  overridesResolver: (props, styles2) => styles2.groupUl
})({
  padding: 0,
  [`& .${autocompleteClasses$1.option}`]: {
    paddingLeft: 24
  }
});
const Autocomplete = /* @__PURE__ */ react.exports.forwardRef(function Autocomplete2(inProps, ref) {
  var _componentsProps$clea;
  const props = useThemeProps({
    props: inProps,
    name: "MuiAutocomplete"
  });
  const {
    autoComplete = false,
    autoHighlight = false,
    autoSelect = false,
    blurOnSelect = false,
    ChipProps,
    className,
    clearIcon = _ClearIcon || (_ClearIcon = /* @__PURE__ */ jsx(ClearIcon, {
      fontSize: "small"
    })),
    clearOnBlur = !props.freeSolo,
    clearOnEscape = false,
    clearText = "Clear",
    closeText = "Close",
    componentsProps = {},
    defaultValue = props.multiple ? [] : null,
    disableClearable = false,
    disableCloseOnSelect = false,
    disabled = false,
    disabledItemsFocusable = false,
    disableListWrap = false,
    disablePortal = false,
    filterSelectedOptions = false,
    forcePopupIcon = "auto",
    freeSolo = false,
    fullWidth = false,
    getLimitTagsText = (more) => `+${more}`,
    getOptionLabel = (option) => {
      var _option$label;
      return (_option$label = option.label) != null ? _option$label : option;
    },
    groupBy,
    handleHomeEndKeys = !props.freeSolo,
    includeInputInList = false,
    limitTags = -1,
    ListboxComponent = "ul",
    ListboxProps,
    loading = false,
    loadingText = "Loading\u2026",
    multiple = false,
    noOptionsText = "No options",
    openOnFocus = false,
    openText = "Open",
    PaperComponent = Paper$1,
    PopperComponent: PopperComponent2 = Popper$1,
    popupIcon = _ArrowDropDownIcon || (_ArrowDropDownIcon = /* @__PURE__ */ jsx(ArrowDropDownIcon, {})),
    renderGroup: renderGroupProp,
    renderInput,
    renderOption: renderOptionProp,
    renderTags,
    selectOnFocus = !props.freeSolo,
    size = "medium"
  } = props, other = _objectWithoutPropertiesLoose$1(props, _excluded$n);
  const {
    getRootProps,
    getInputProps,
    getInputLabelProps,
    getPopupIndicatorProps,
    getClearProps,
    getTagProps,
    getListboxProps,
    getOptionProps,
    value,
    dirty,
    id,
    popupOpen,
    focused,
    focusedTag,
    anchorEl,
    setAnchorEl,
    inputValue,
    groupedOptions
  } = useAutocomplete(_extends$3({}, props, {
    componentName: "Autocomplete"
  }));
  const hasClearIcon = !disableClearable && !disabled && dirty;
  const hasPopupIcon = (!freeSolo || forcePopupIcon === true) && forcePopupIcon !== false;
  const ownerState = _extends$3({}, props, {
    disablePortal,
    focused,
    fullWidth,
    hasClearIcon,
    hasPopupIcon,
    inputFocused: focusedTag === -1,
    popupOpen,
    size
  });
  const classes = useUtilityClasses$k(ownerState);
  let startAdornment;
  if (multiple && value.length > 0) {
    const getCustomizedTagProps = (params) => _extends$3({
      className: clsx(classes.tag),
      disabled
    }, getTagProps(params));
    if (renderTags) {
      startAdornment = renderTags(value, getCustomizedTagProps);
    } else {
      startAdornment = value.map((option, index2) => /* @__PURE__ */ jsx(Chip$1, _extends$3({
        label: getOptionLabel(option),
        size
      }, getCustomizedTagProps({
        index: index2
      }), ChipProps)));
    }
  }
  if (limitTags > -1 && Array.isArray(startAdornment)) {
    const more = startAdornment.length - limitTags;
    if (!focused && more > 0) {
      startAdornment = startAdornment.splice(0, limitTags);
      startAdornment.push(/* @__PURE__ */ jsx("span", {
        className: classes.tag,
        children: getLimitTagsText(more)
      }, startAdornment.length));
    }
  }
  const defaultRenderGroup = (params) => /* @__PURE__ */ jsxs("li", {
    children: [/* @__PURE__ */ jsx(AutocompleteGroupLabel, {
      className: classes.groupLabel,
      ownerState,
      component: "div",
      children: params.group
    }), /* @__PURE__ */ jsx(AutocompleteGroupUl, {
      className: classes.groupUl,
      ownerState,
      children: params.children
    })]
  }, params.key);
  const renderGroup = renderGroupProp || defaultRenderGroup;
  const defaultRenderOption = (props2, option) => /* @__PURE__ */ jsx("li", _extends$3({}, props2, {
    children: getOptionLabel(option)
  }));
  const renderOption = renderOptionProp || defaultRenderOption;
  const renderListOption = (option, index2) => {
    const optionProps = getOptionProps({
      option,
      index: index2
    });
    return renderOption(_extends$3({}, optionProps, {
      className: classes.option
    }), option, {
      selected: optionProps["aria-selected"],
      inputValue
    });
  };
  return /* @__PURE__ */ jsxs(react.exports.Fragment, {
    children: [/* @__PURE__ */ jsx(AutocompleteRoot, _extends$3({
      ref,
      className: clsx(classes.root, className),
      ownerState
    }, getRootProps(other), {
      children: renderInput({
        id,
        disabled,
        fullWidth: true,
        size: size === "small" ? "small" : void 0,
        InputLabelProps: getInputLabelProps(),
        InputProps: {
          ref: setAnchorEl,
          className: classes.inputRoot,
          startAdornment,
          endAdornment: /* @__PURE__ */ jsxs(AutocompleteEndAdornment, {
            className: classes.endAdornment,
            ownerState,
            children: [hasClearIcon ? /* @__PURE__ */ jsx(AutocompleteClearIndicator, _extends$3({}, getClearProps(), {
              "aria-label": clearText,
              title: clearText,
              ownerState
            }, componentsProps.clearIndicator, {
              className: clsx(classes.clearIndicator, (_componentsProps$clea = componentsProps.clearIndicator) == null ? void 0 : _componentsProps$clea.className),
              children: clearIcon
            })) : null, hasPopupIcon ? /* @__PURE__ */ jsx(AutocompletePopupIndicator, _extends$3({}, getPopupIndicatorProps(), {
              disabled,
              "aria-label": popupOpen ? closeText : openText,
              title: popupOpen ? closeText : openText,
              className: clsx(classes.popupIndicator),
              ownerState,
              children: popupIcon
            })) : null]
          })
        },
        inputProps: _extends$3({
          className: clsx(classes.input),
          disabled
        }, getInputProps())
      })
    })), popupOpen && anchorEl ? /* @__PURE__ */ jsx(AutocompletePopper, {
      as: PopperComponent2,
      className: clsx(classes.popper),
      disablePortal,
      style: {
        width: anchorEl ? anchorEl.clientWidth : null
      },
      ownerState,
      role: "presentation",
      anchorEl,
      open: true,
      children: /* @__PURE__ */ jsxs(AutocompletePaper, {
        as: PaperComponent,
        className: classes.paper,
        ownerState,
        children: [loading && groupedOptions.length === 0 ? /* @__PURE__ */ jsx(AutocompleteLoading, {
          className: classes.loading,
          ownerState,
          children: loadingText
        }) : null, groupedOptions.length === 0 && !freeSolo && !loading ? /* @__PURE__ */ jsx(AutocompleteNoOptions, {
          className: classes.noOptions,
          ownerState,
          role: "presentation",
          onMouseDown: (event) => {
            event.preventDefault();
          },
          children: noOptionsText
        }) : null, groupedOptions.length > 0 ? /* @__PURE__ */ jsx(AutocompleteListbox, _extends$3({
          as: ListboxComponent,
          className: classes.listbox,
          ownerState
        }, getListboxProps(), ListboxProps, {
          children: groupedOptions.map((option, index2) => {
            if (groupBy) {
              return renderGroup({
                key: option.key,
                group: option.group,
                children: option.options.map((option2, index22) => renderListOption(option2, option.index + index22))
              });
            }
            return renderListOption(option, index2);
          })
        })) : null]
      })
    }) : null]
  });
});
var Autocomplete$1 = Autocomplete;
function getFormControlUtilityClasses(slot) {
  return generateUtilityClass("MuiFormControl", slot);
}
generateUtilityClasses("MuiFormControl", ["root", "marginNone", "marginNormal", "marginDense", "fullWidth", "disabled"]);
const _excluded$m = ["children", "className", "color", "component", "disabled", "error", "focused", "fullWidth", "hiddenLabel", "margin", "required", "size", "variant"];
const useUtilityClasses$j = (ownerState) => {
  const {
    classes,
    margin,
    fullWidth
  } = ownerState;
  const slots = {
    root: ["root", margin !== "none" && `margin${capitalize(margin)}`, fullWidth && "fullWidth"]
  };
  return composeClasses(slots, getFormControlUtilityClasses, classes);
};
const FormControlRoot = styled$3("div", {
  name: "MuiFormControl",
  slot: "Root",
  overridesResolver: ({
    ownerState
  }, styles2) => {
    return _extends$3({}, styles2.root, styles2[`margin${capitalize(ownerState.margin)}`], ownerState.fullWidth && styles2.fullWidth);
  }
})(({
  ownerState
}) => _extends$3({
  display: "inline-flex",
  flexDirection: "column",
  position: "relative",
  minWidth: 0,
  padding: 0,
  margin: 0,
  border: 0,
  verticalAlign: "top"
}, ownerState.margin === "normal" && {
  marginTop: 16,
  marginBottom: 8
}, ownerState.margin === "dense" && {
  marginTop: 8,
  marginBottom: 4
}, ownerState.fullWidth && {
  width: "100%"
}));
const FormControl = /* @__PURE__ */ react.exports.forwardRef(function FormControl2(inProps, ref) {
  const props = useThemeProps({
    props: inProps,
    name: "MuiFormControl"
  });
  const {
    children,
    className,
    color = "primary",
    component = "div",
    disabled = false,
    error = false,
    focused: visuallyFocused,
    fullWidth = false,
    hiddenLabel = false,
    margin = "none",
    required = false,
    size = "medium",
    variant = "outlined"
  } = props, other = _objectWithoutPropertiesLoose$1(props, _excluded$m);
  const ownerState = _extends$3({}, props, {
    color,
    component,
    disabled,
    error,
    fullWidth,
    hiddenLabel,
    margin,
    required,
    size,
    variant
  });
  const classes = useUtilityClasses$j(ownerState);
  const [adornedStart, setAdornedStart] = react.exports.useState(() => {
    let initialAdornedStart = false;
    if (children) {
      react.exports.Children.forEach(children, (child) => {
        if (!isMuiElement(child, ["Input", "Select"])) {
          return;
        }
        const input = isMuiElement(child, ["Select"]) ? child.props.input : child;
        if (input && isAdornedStart(input.props)) {
          initialAdornedStart = true;
        }
      });
    }
    return initialAdornedStart;
  });
  const [filled, setFilled] = react.exports.useState(() => {
    let initialFilled = false;
    if (children) {
      react.exports.Children.forEach(children, (child) => {
        if (!isMuiElement(child, ["Input", "Select"])) {
          return;
        }
        if (isFilled(child.props, true)) {
          initialFilled = true;
        }
      });
    }
    return initialFilled;
  });
  const [focusedState, setFocused] = react.exports.useState(false);
  if (disabled && focusedState) {
    setFocused(false);
  }
  const focused = visuallyFocused !== void 0 && !disabled ? visuallyFocused : focusedState;
  let registerEffect;
  const onFilled = react.exports.useCallback(() => {
    setFilled(true);
  }, []);
  const onEmpty = react.exports.useCallback(() => {
    setFilled(false);
  }, []);
  const childContext = {
    adornedStart,
    setAdornedStart,
    color,
    disabled,
    error,
    filled,
    focused,
    fullWidth,
    hiddenLabel,
    size,
    onBlur: () => {
      setFocused(false);
    },
    onEmpty,
    onFilled,
    onFocus: () => {
      setFocused(true);
    },
    registerEffect,
    required,
    variant
  };
  return /* @__PURE__ */ jsx(FormControlContext$1.Provider, {
    value: childContext,
    children: /* @__PURE__ */ jsx(FormControlRoot, _extends$3({
      as: component,
      ownerState,
      className: clsx(classes.root, className),
      ref
    }, other, {
      children
    }))
  });
});
var FormControl$1 = FormControl;
function getFormControlLabelUtilityClasses(slot) {
  return generateUtilityClass("MuiFormControlLabel", slot);
}
const formControlLabelClasses = generateUtilityClasses("MuiFormControlLabel", ["root", "labelPlacementStart", "labelPlacementTop", "labelPlacementBottom", "disabled", "label"]);
var formControlLabelClasses$1 = formControlLabelClasses;
const _excluded$l = ["checked", "className", "componentsProps", "control", "disabled", "disableTypography", "inputRef", "label", "labelPlacement", "name", "onChange", "value"];
const useUtilityClasses$i = (ownerState) => {
  const {
    classes,
    disabled,
    labelPlacement
  } = ownerState;
  const slots = {
    root: ["root", disabled && "disabled", `labelPlacement${capitalize(labelPlacement)}`],
    label: ["label", disabled && "disabled"]
  };
  return composeClasses(slots, getFormControlLabelUtilityClasses, classes);
};
const FormControlLabelRoot = styled$3("label", {
  name: "MuiFormControlLabel",
  slot: "Root",
  overridesResolver: (props, styles2) => {
    const {
      ownerState
    } = props;
    return [{
      [`& .${formControlLabelClasses$1.label}`]: styles2.label
    }, styles2.root, styles2[`labelPlacement${capitalize(ownerState.labelPlacement)}`]];
  }
})(({
  theme: theme2,
  ownerState
}) => _extends$3({
  display: "inline-flex",
  alignItems: "center",
  cursor: "pointer",
  verticalAlign: "middle",
  WebkitTapHighlightColor: "transparent",
  marginLeft: -11,
  marginRight: 16,
  [`&.${formControlLabelClasses$1.disabled}`]: {
    cursor: "default"
  }
}, ownerState.labelPlacement === "start" && {
  flexDirection: "row-reverse",
  marginLeft: 16,
  marginRight: -11
}, ownerState.labelPlacement === "top" && {
  flexDirection: "column-reverse",
  marginLeft: 16
}, ownerState.labelPlacement === "bottom" && {
  flexDirection: "column",
  marginLeft: 16
}, {
  [`& .${formControlLabelClasses$1.label}`]: {
    [`&.${formControlLabelClasses$1.disabled}`]: {
      color: theme2.palette.text.disabled
    }
  }
}));
const FormControlLabel = /* @__PURE__ */ react.exports.forwardRef(function FormControlLabel2(inProps, ref) {
  const props = useThemeProps({
    props: inProps,
    name: "MuiFormControlLabel"
  });
  const {
    className,
    componentsProps = {},
    control,
    disabled: disabledProp,
    disableTypography,
    label,
    labelPlacement = "end"
  } = props, other = _objectWithoutPropertiesLoose$1(props, _excluded$l);
  const muiFormControl = useFormControl();
  let disabled = disabledProp;
  if (typeof disabled === "undefined" && typeof control.props.disabled !== "undefined") {
    disabled = control.props.disabled;
  }
  if (typeof disabled === "undefined" && muiFormControl) {
    disabled = muiFormControl.disabled;
  }
  const controlProps = {
    disabled
  };
  ["checked", "name", "onChange", "value", "inputRef"].forEach((key) => {
    if (typeof control.props[key] === "undefined" && typeof props[key] !== "undefined") {
      controlProps[key] = props[key];
    }
  });
  const ownerState = _extends$3({}, props, {
    disabled,
    label,
    labelPlacement
  });
  const classes = useUtilityClasses$i(ownerState);
  return /* @__PURE__ */ jsxs(FormControlLabelRoot, _extends$3({
    className: clsx(classes.root, className),
    ownerState,
    ref
  }, other, {
    children: [/* @__PURE__ */ react.exports.cloneElement(control, controlProps), label.type === Typography$1 || disableTypography ? label : /* @__PURE__ */ jsx(Typography$1, _extends$3({
      component: "span",
      className: classes.label
    }, componentsProps.typography, {
      children: label
    }))]
  }));
});
var FormControlLabel$1 = FormControlLabel;
function getFormGroupUtilityClass(slot) {
  return generateUtilityClass("MuiFormGroup", slot);
}
generateUtilityClasses("MuiFormGroup", ["root", "row"]);
const _excluded$k = ["className", "row"];
const useUtilityClasses$h = (ownerState) => {
  const {
    classes,
    row
  } = ownerState;
  const slots = {
    root: ["root", row && "row"]
  };
  return composeClasses(slots, getFormGroupUtilityClass, classes);
};
const FormGroupRoot = styled$3("div", {
  name: "MuiFormGroup",
  slot: "Root",
  overridesResolver: (props, styles2) => {
    const {
      ownerState
    } = props;
    return [styles2.root, ownerState.row && styles2.row];
  }
})(({
  ownerState
}) => _extends$3({
  display: "flex",
  flexDirection: "column",
  flexWrap: "wrap"
}, ownerState.row && {
  flexDirection: "row"
}));
const FormGroup = /* @__PURE__ */ react.exports.forwardRef(function FormGroup2(inProps, ref) {
  const props = useThemeProps({
    props: inProps,
    name: "MuiFormGroup"
  });
  const {
    className,
    row = false
  } = props, other = _objectWithoutPropertiesLoose$1(props, _excluded$k);
  const ownerState = _extends$3({}, props, {
    row
  });
  const classes = useUtilityClasses$h(ownerState);
  return /* @__PURE__ */ jsx(FormGroupRoot, _extends$3({
    className: clsx(classes.root, className),
    ownerState,
    ref
  }, other));
});
var FormGroup$1 = FormGroup;
function getSwitchBaseUtilityClass(slot) {
  return generateUtilityClass("PrivateSwitchBase", slot);
}
generateUtilityClasses("PrivateSwitchBase", ["root", "checked", "disabled", "input", "edgeStart", "edgeEnd"]);
const _excluded$j = ["autoFocus", "checked", "checkedIcon", "className", "defaultChecked", "disabled", "disableFocusRipple", "edge", "icon", "id", "inputProps", "inputRef", "name", "onBlur", "onChange", "onFocus", "readOnly", "required", "tabIndex", "type", "value"];
const useUtilityClasses$g = (ownerState) => {
  const {
    classes,
    checked,
    disabled,
    edge
  } = ownerState;
  const slots = {
    root: ["root", checked && "checked", disabled && "disabled", edge && `edge${capitalize(edge)}`],
    input: ["input"]
  };
  return composeClasses(slots, getSwitchBaseUtilityClass, classes);
};
const SwitchBaseRoot = styled$3(ButtonBase$1, {
  skipSx: true
})(({
  ownerState
}) => _extends$3({
  padding: 9,
  borderRadius: "50%"
}, ownerState.edge === "start" && {
  marginLeft: ownerState.size === "small" ? -3 : -12
}, ownerState.edge === "end" && {
  marginRight: ownerState.size === "small" ? -3 : -12
}));
const SwitchBaseInput = styled$3("input", {
  skipSx: true
})({
  cursor: "inherit",
  position: "absolute",
  opacity: 0,
  width: "100%",
  height: "100%",
  top: 0,
  left: 0,
  margin: 0,
  padding: 0,
  zIndex: 1
});
const SwitchBase = /* @__PURE__ */ react.exports.forwardRef(function SwitchBase2(props, ref) {
  const {
    autoFocus,
    checked: checkedProp,
    checkedIcon,
    className,
    defaultChecked,
    disabled: disabledProp,
    disableFocusRipple = false,
    edge = false,
    icon,
    id,
    inputProps,
    inputRef,
    name,
    onBlur,
    onChange,
    onFocus,
    readOnly,
    required,
    tabIndex,
    type,
    value
  } = props, other = _objectWithoutPropertiesLoose$1(props, _excluded$j);
  const [checked, setCheckedState] = useControlled({
    controlled: checkedProp,
    default: Boolean(defaultChecked),
    name: "SwitchBase",
    state: "checked"
  });
  const muiFormControl = useFormControl();
  const handleFocus = (event) => {
    if (onFocus) {
      onFocus(event);
    }
    if (muiFormControl && muiFormControl.onFocus) {
      muiFormControl.onFocus(event);
    }
  };
  const handleBlur = (event) => {
    if (onBlur) {
      onBlur(event);
    }
    if (muiFormControl && muiFormControl.onBlur) {
      muiFormControl.onBlur(event);
    }
  };
  const handleInputChange = (event) => {
    if (event.nativeEvent.defaultPrevented) {
      return;
    }
    const newChecked = event.target.checked;
    setCheckedState(newChecked);
    if (onChange) {
      onChange(event, newChecked);
    }
  };
  let disabled = disabledProp;
  if (muiFormControl) {
    if (typeof disabled === "undefined") {
      disabled = muiFormControl.disabled;
    }
  }
  const hasLabelFor = type === "checkbox" || type === "radio";
  const ownerState = _extends$3({}, props, {
    checked,
    disabled,
    disableFocusRipple,
    edge
  });
  const classes = useUtilityClasses$g(ownerState);
  return /* @__PURE__ */ jsxs(SwitchBaseRoot, _extends$3({
    component: "span",
    className: clsx(classes.root, className),
    centerRipple: true,
    focusRipple: !disableFocusRipple,
    disabled,
    tabIndex: null,
    role: void 0,
    onFocus: handleFocus,
    onBlur: handleBlur,
    ownerState,
    ref
  }, other, {
    children: [/* @__PURE__ */ jsx(SwitchBaseInput, _extends$3({
      autoFocus,
      checked: checkedProp,
      defaultChecked,
      className: classes.input,
      disabled,
      id: hasLabelFor && id,
      name,
      onChange: handleInputChange,
      readOnly,
      ref: inputRef,
      required,
      ownerState,
      tabIndex,
      type
    }, type === "checkbox" && value === void 0 ? {} : {
      value
    }, inputProps)), checked ? checkedIcon : icon]
  }));
});
var SwitchBase$1 = SwitchBase;
function getSwitchUtilityClass(slot) {
  return generateUtilityClass("MuiSwitch", slot);
}
const switchClasses = generateUtilityClasses("MuiSwitch", ["root", "edgeStart", "edgeEnd", "switchBase", "colorPrimary", "colorSecondary", "sizeSmall", "sizeMedium", "checked", "disabled", "input", "thumb", "track"]);
var switchClasses$1 = switchClasses;
const _excluded$i = ["className", "color", "edge", "size", "sx"];
const useUtilityClasses$f = (ownerState) => {
  const {
    classes,
    edge,
    size,
    color,
    checked,
    disabled
  } = ownerState;
  const slots = {
    root: ["root", edge && `edge${capitalize(edge)}`, `size${capitalize(size)}`],
    switchBase: ["switchBase", `color${capitalize(color)}`, checked && "checked", disabled && "disabled"],
    thumb: ["thumb"],
    track: ["track"],
    input: ["input"]
  };
  const composedClasses = composeClasses(slots, getSwitchUtilityClass, classes);
  return _extends$3({}, classes, composedClasses);
};
const SwitchRoot = styled$3("span", {
  name: "MuiSwitch",
  slot: "Root",
  overridesResolver: (props, styles2) => {
    const {
      ownerState
    } = props;
    return [styles2.root, ownerState.edge && styles2[`edge${capitalize(ownerState.edge)}`], styles2[`size${capitalize(ownerState.size)}`]];
  }
})(({
  ownerState
}) => _extends$3({
  display: "inline-flex",
  width: 34 + 12 * 2,
  height: 14 + 12 * 2,
  overflow: "hidden",
  padding: 12,
  boxSizing: "border-box",
  position: "relative",
  flexShrink: 0,
  zIndex: 0,
  verticalAlign: "middle",
  "@media print": {
    colorAdjust: "exact"
  }
}, ownerState.edge === "start" && {
  marginLeft: -8
}, ownerState.edge === "end" && {
  marginRight: -8
}, ownerState.size === "small" && {
  width: 40,
  height: 24,
  padding: 7,
  [`& .${switchClasses$1.thumb}`]: {
    width: 16,
    height: 16
  },
  [`& .${switchClasses$1.switchBase}`]: {
    padding: 4,
    [`&.${switchClasses$1.checked}`]: {
      transform: "translateX(16px)"
    }
  }
}));
const SwitchSwitchBase = styled$3(SwitchBase$1, {
  name: "MuiSwitch",
  slot: "SwitchBase",
  overridesResolver: (props, styles2) => {
    const {
      ownerState
    } = props;
    return [styles2.switchBase, {
      [`& .${switchClasses$1.input}`]: styles2.input
    }, ownerState.color !== "default" && styles2[`color${capitalize(ownerState.color)}`]];
  }
})(({
  theme: theme2
}) => ({
  position: "absolute",
  top: 0,
  left: 0,
  zIndex: 1,
  color: theme2.palette.mode === "light" ? theme2.palette.common.white : theme2.palette.grey[300],
  transition: theme2.transitions.create(["left", "transform"], {
    duration: theme2.transitions.duration.shortest
  }),
  [`&.${switchClasses$1.checked}`]: {
    transform: "translateX(20px)"
  },
  [`&.${switchClasses$1.disabled}`]: {
    color: theme2.palette.mode === "light" ? theme2.palette.grey[100] : theme2.palette.grey[600]
  },
  [`&.${switchClasses$1.checked} + .${switchClasses$1.track}`]: {
    opacity: 0.5
  },
  [`&.${switchClasses$1.disabled} + .${switchClasses$1.track}`]: {
    opacity: theme2.palette.mode === "light" ? 0.12 : 0.2
  },
  [`& .${switchClasses$1.input}`]: {
    left: "-100%",
    width: "300%"
  }
}), ({
  theme: theme2,
  ownerState
}) => _extends$3({
  "&:hover": {
    backgroundColor: alpha(theme2.palette.action.active, theme2.palette.action.hoverOpacity),
    "@media (hover: none)": {
      backgroundColor: "transparent"
    }
  }
}, ownerState.color !== "default" && {
  [`&.${switchClasses$1.checked}`]: {
    color: theme2.palette[ownerState.color].main,
    "&:hover": {
      backgroundColor: alpha(theme2.palette[ownerState.color].main, theme2.palette.action.hoverOpacity),
      "@media (hover: none)": {
        backgroundColor: "transparent"
      }
    },
    [`&.${switchClasses$1.disabled}`]: {
      color: theme2.palette.mode === "light" ? lighten(theme2.palette[ownerState.color].main, 0.62) : darken(theme2.palette[ownerState.color].main, 0.55)
    }
  },
  [`&.${switchClasses$1.checked} + .${switchClasses$1.track}`]: {
    backgroundColor: theme2.palette[ownerState.color].main
  }
}));
const SwitchTrack = styled$3("span", {
  name: "MuiSwitch",
  slot: "Track",
  overridesResolver: (props, styles2) => styles2.track
})(({
  theme: theme2
}) => ({
  height: "100%",
  width: "100%",
  borderRadius: 14 / 2,
  zIndex: -1,
  transition: theme2.transitions.create(["opacity", "background-color"], {
    duration: theme2.transitions.duration.shortest
  }),
  backgroundColor: theme2.palette.mode === "light" ? theme2.palette.common.black : theme2.palette.common.white,
  opacity: theme2.palette.mode === "light" ? 0.38 : 0.3
}));
const SwitchThumb = styled$3("span", {
  name: "MuiSwitch",
  slot: "Thumb",
  overridesResolver: (props, styles2) => styles2.thumb
})(({
  theme: theme2
}) => ({
  boxShadow: theme2.shadows[1],
  backgroundColor: "currentColor",
  width: 20,
  height: 20,
  borderRadius: "50%"
}));
const Switch = /* @__PURE__ */ react.exports.forwardRef(function Switch2(inProps, ref) {
  const props = useThemeProps({
    props: inProps,
    name: "MuiSwitch"
  });
  const {
    className,
    color = "primary",
    edge = false,
    size = "medium",
    sx
  } = props, other = _objectWithoutPropertiesLoose$1(props, _excluded$i);
  const ownerState = _extends$3({}, props, {
    color,
    edge,
    size
  });
  const classes = useUtilityClasses$f(ownerState);
  const icon = /* @__PURE__ */ jsx(SwitchThumb, {
    className: classes.thumb,
    ownerState
  });
  return /* @__PURE__ */ jsxs(SwitchRoot, {
    className: clsx(classes.root, className),
    sx,
    ownerState,
    children: [/* @__PURE__ */ jsx(SwitchSwitchBase, _extends$3({
      type: "checkbox",
      icon,
      checkedIcon: icon,
      ref,
      ownerState
    }, other, {
      classes: _extends$3({}, classes, {
        root: classes.switchBase
      })
    })), /* @__PURE__ */ jsx(SwitchTrack, {
      className: classes.track,
      ownerState
    })]
  });
});
var Switch$1 = Switch;
const _excluded$h = ["disableUnderline", "components", "componentsProps", "fullWidth", "inputComponent", "multiline", "type"];
const useUtilityClasses$e = (ownerState) => {
  const {
    classes,
    disableUnderline
  } = ownerState;
  const slots = {
    root: ["root", !disableUnderline && "underline"],
    input: ["input"]
  };
  const composedClasses = composeClasses(slots, getInputUtilityClass, classes);
  return _extends$3({}, classes, composedClasses);
};
const InputRoot = styled$3(InputBaseRoot, {
  shouldForwardProp: (prop) => rootShouldForwardProp(prop) || prop === "classes",
  name: "MuiInput",
  slot: "Root",
  overridesResolver: (props, styles2) => {
    const {
      ownerState
    } = props;
    return [...rootOverridesResolver(props, styles2), !ownerState.disableUnderline && styles2.underline];
  }
})(({
  theme: theme2,
  ownerState
}) => {
  const light = theme2.palette.mode === "light";
  const bottomLineColor = light ? "rgba(0, 0, 0, 0.42)" : "rgba(255, 255, 255, 0.7)";
  return _extends$3({
    position: "relative"
  }, ownerState.formControl && {
    "label + &": {
      marginTop: 16
    }
  }, !ownerState.disableUnderline && {
    "&:after": {
      borderBottom: `2px solid ${theme2.palette[ownerState.color].main}`,
      left: 0,
      bottom: 0,
      content: '""',
      position: "absolute",
      right: 0,
      transform: "scaleX(0)",
      transition: theme2.transitions.create("transform", {
        duration: theme2.transitions.duration.shorter,
        easing: theme2.transitions.easing.easeOut
      }),
      pointerEvents: "none"
    },
    [`&.${inputClasses$1.focused}:after`]: {
      transform: "scaleX(1)"
    },
    [`&.${inputClasses$1.error}:after`]: {
      borderBottomColor: theme2.palette.error.main,
      transform: "scaleX(1)"
    },
    "&:before": {
      borderBottom: `1px solid ${bottomLineColor}`,
      left: 0,
      bottom: 0,
      content: '"\\00a0"',
      position: "absolute",
      right: 0,
      transition: theme2.transitions.create("border-bottom-color", {
        duration: theme2.transitions.duration.shorter
      }),
      pointerEvents: "none"
    },
    [`&:hover:not(.${inputClasses$1.disabled}):before`]: {
      borderBottom: `2px solid ${theme2.palette.text.primary}`,
      "@media (hover: none)": {
        borderBottom: `1px solid ${bottomLineColor}`
      }
    },
    [`&.${inputClasses$1.disabled}:before`]: {
      borderBottomStyle: "dotted"
    }
  });
});
const InputInput = styled$3(InputBaseComponent, {
  name: "MuiInput",
  slot: "Input",
  overridesResolver: inputOverridesResolver
})({});
const Input = /* @__PURE__ */ react.exports.forwardRef(function Input2(inProps, ref) {
  const props = useThemeProps({
    props: inProps,
    name: "MuiInput"
  });
  const {
    disableUnderline,
    components = {},
    componentsProps: componentsPropsProp,
    fullWidth = false,
    inputComponent = "input",
    multiline = false,
    type = "text"
  } = props, other = _objectWithoutPropertiesLoose$1(props, _excluded$h);
  const classes = useUtilityClasses$e(props);
  const ownerState = {
    disableUnderline
  };
  const inputComponentsProps = {
    root: {
      ownerState
    }
  };
  const componentsProps = componentsPropsProp ? deepmerge(componentsPropsProp, inputComponentsProps) : inputComponentsProps;
  return /* @__PURE__ */ jsx(InputBase$1, _extends$3({
    components: _extends$3({
      Root: InputRoot,
      Input: InputInput
    }, components),
    componentsProps,
    fullWidth,
    inputComponent,
    multiline,
    ref,
    type
  }, other, {
    classes
  }));
});
Input.muiName = "Input";
var Input$1 = Input;
const _excluded$g = ["disableUnderline", "components", "componentsProps", "fullWidth", "hiddenLabel", "inputComponent", "multiline", "type"];
const useUtilityClasses$d = (ownerState) => {
  const {
    classes,
    disableUnderline
  } = ownerState;
  const slots = {
    root: ["root", !disableUnderline && "underline"],
    input: ["input"]
  };
  const composedClasses = composeClasses(slots, getFilledInputUtilityClass, classes);
  return _extends$3({}, classes, composedClasses);
};
const FilledInputRoot = styled$3(InputBaseRoot, {
  shouldForwardProp: (prop) => rootShouldForwardProp(prop) || prop === "classes",
  name: "MuiFilledInput",
  slot: "Root",
  overridesResolver: (props, styles2) => {
    const {
      ownerState
    } = props;
    return [...rootOverridesResolver(props, styles2), !ownerState.disableUnderline && styles2.underline];
  }
})(({
  theme: theme2,
  ownerState
}) => {
  const light = theme2.palette.mode === "light";
  const bottomLineColor = light ? "rgba(0, 0, 0, 0.42)" : "rgba(255, 255, 255, 0.7)";
  const backgroundColor = light ? "rgba(0, 0, 0, 0.06)" : "rgba(255, 255, 255, 0.09)";
  return _extends$3({
    position: "relative",
    backgroundColor,
    borderTopLeftRadius: theme2.shape.borderRadius,
    borderTopRightRadius: theme2.shape.borderRadius,
    transition: theme2.transitions.create("background-color", {
      duration: theme2.transitions.duration.shorter,
      easing: theme2.transitions.easing.easeOut
    }),
    "&:hover": {
      backgroundColor: light ? "rgba(0, 0, 0, 0.09)" : "rgba(255, 255, 255, 0.13)",
      "@media (hover: none)": {
        backgroundColor
      }
    },
    [`&.${filledInputClasses$1.focused}`]: {
      backgroundColor
    },
    [`&.${filledInputClasses$1.disabled}`]: {
      backgroundColor: light ? "rgba(0, 0, 0, 0.12)" : "rgba(255, 255, 255, 0.12)"
    }
  }, !ownerState.disableUnderline && {
    "&:after": {
      borderBottom: `2px solid ${theme2.palette[ownerState.color].main}`,
      left: 0,
      bottom: 0,
      content: '""',
      position: "absolute",
      right: 0,
      transform: "scaleX(0)",
      transition: theme2.transitions.create("transform", {
        duration: theme2.transitions.duration.shorter,
        easing: theme2.transitions.easing.easeOut
      }),
      pointerEvents: "none"
    },
    [`&.${filledInputClasses$1.focused}:after`]: {
      transform: "scaleX(1)"
    },
    [`&.${filledInputClasses$1.error}:after`]: {
      borderBottomColor: theme2.palette.error.main,
      transform: "scaleX(1)"
    },
    "&:before": {
      borderBottom: `1px solid ${bottomLineColor}`,
      left: 0,
      bottom: 0,
      content: '"\\00a0"',
      position: "absolute",
      right: 0,
      transition: theme2.transitions.create("border-bottom-color", {
        duration: theme2.transitions.duration.shorter
      }),
      pointerEvents: "none"
    },
    [`&:hover:not(.${filledInputClasses$1.disabled}):before`]: {
      borderBottom: `1px solid ${theme2.palette.text.primary}`
    },
    [`&.${filledInputClasses$1.disabled}:before`]: {
      borderBottomStyle: "dotted"
    }
  }, ownerState.startAdornment && {
    paddingLeft: 12
  }, ownerState.endAdornment && {
    paddingRight: 12
  }, ownerState.multiline && _extends$3({
    padding: "25px 12px 8px"
  }, ownerState.size === "small" && {
    paddingTop: 21,
    paddingBottom: 4
  }, ownerState.hiddenLabel && {
    paddingTop: 16,
    paddingBottom: 17
  }));
});
const FilledInputInput = styled$3(InputBaseComponent, {
  name: "MuiFilledInput",
  slot: "Input",
  overridesResolver: inputOverridesResolver
})(({
  theme: theme2,
  ownerState
}) => _extends$3({
  paddingTop: 25,
  paddingRight: 12,
  paddingBottom: 8,
  paddingLeft: 12,
  "&:-webkit-autofill": {
    WebkitBoxShadow: theme2.palette.mode === "light" ? null : "0 0 0 100px #266798 inset",
    WebkitTextFillColor: theme2.palette.mode === "light" ? null : "#fff",
    caretColor: theme2.palette.mode === "light" ? null : "#fff",
    borderTopLeftRadius: "inherit",
    borderTopRightRadius: "inherit"
  }
}, ownerState.size === "small" && {
  paddingTop: 21,
  paddingBottom: 4
}, ownerState.hiddenLabel && {
  paddingTop: 16,
  paddingBottom: 17
}, ownerState.multiline && {
  paddingTop: 0,
  paddingBottom: 0,
  paddingLeft: 0,
  paddingRight: 0
}, ownerState.startAdornment && {
  paddingLeft: 0
}, ownerState.endAdornment && {
  paddingRight: 0
}, ownerState.hiddenLabel && ownerState.size === "small" && {
  paddingTop: 8,
  paddingBottom: 9
}));
const FilledInput = /* @__PURE__ */ react.exports.forwardRef(function FilledInput2(inProps, ref) {
  const props = useThemeProps({
    props: inProps,
    name: "MuiFilledInput"
  });
  const {
    components = {},
    componentsProps: componentsPropsProp,
    fullWidth = false,
    inputComponent = "input",
    multiline = false,
    type = "text"
  } = props, other = _objectWithoutPropertiesLoose$1(props, _excluded$g);
  const ownerState = _extends$3({}, props, {
    fullWidth,
    inputComponent,
    multiline,
    type
  });
  const classes = useUtilityClasses$d(props);
  const filledInputComponentsProps = {
    root: {
      ownerState
    },
    input: {
      ownerState
    }
  };
  const componentsProps = componentsPropsProp ? deepmerge(componentsPropsProp, filledInputComponentsProps) : filledInputComponentsProps;
  return /* @__PURE__ */ jsx(InputBase$1, _extends$3({
    components: _extends$3({
      Root: FilledInputRoot,
      Input: FilledInputInput
    }, components),
    componentsProps,
    fullWidth,
    inputComponent,
    multiline,
    ref,
    type
  }, other, {
    classes
  }));
});
FilledInput.muiName = "Input";
var FilledInput$1 = FilledInput;
const _excluded$f = ["children", "classes", "className", "label", "notched"];
const NotchedOutlineRoot$1 = styled$3("fieldset")({
  textAlign: "left",
  position: "absolute",
  bottom: 0,
  right: 0,
  top: -5,
  left: 0,
  margin: 0,
  padding: "0 8px",
  pointerEvents: "none",
  borderRadius: "inherit",
  borderStyle: "solid",
  borderWidth: 1,
  overflow: "hidden",
  minWidth: "0%"
});
const NotchedOutlineLegend = styled$3("legend", {
  skipSx: true
})(({
  ownerState,
  theme: theme2
}) => _extends$3({}, ownerState.label === void 0 && {
  padding: 0,
  lineHeight: "11px",
  transition: theme2.transitions.create("width", {
    duration: 150,
    easing: theme2.transitions.easing.easeOut
  })
}, ownerState.label !== void 0 && _extends$3({
  display: "block",
  width: "auto",
  padding: 0,
  height: 11,
  fontSize: "0.75em",
  visibility: "hidden",
  maxWidth: 0.01,
  transition: theme2.transitions.create("max-width", {
    duration: 50,
    easing: theme2.transitions.easing.easeOut
  }),
  "& > span": {
    paddingLeft: 5,
    paddingRight: 5,
    display: "inline-block"
  }
}, ownerState.notched && {
  maxWidth: "100%",
  transition: theme2.transitions.create("max-width", {
    duration: 100,
    easing: theme2.transitions.easing.easeOut,
    delay: 50
  })
})));
function NotchedOutline(props) {
  const {
    className,
    label,
    notched
  } = props, other = _objectWithoutPropertiesLoose$1(props, _excluded$f);
  const ownerState = _extends$3({}, props, {
    notched,
    label
  });
  return /* @__PURE__ */ jsx(NotchedOutlineRoot$1, _extends$3({
    "aria-hidden": true,
    className,
    ownerState
  }, other, {
    children: /* @__PURE__ */ jsx(NotchedOutlineLegend, {
      ownerState,
      children: label ? /* @__PURE__ */ jsx("span", {
        children: label
      }) : /* @__PURE__ */ jsx("span", {
        className: "notranslate",
        dangerouslySetInnerHTML: {
          __html: "&#8203;"
        }
      })
    })
  }));
}
const _excluded$e = ["components", "fullWidth", "inputComponent", "label", "multiline", "notched", "type"];
const useUtilityClasses$c = (ownerState) => {
  const {
    classes
  } = ownerState;
  const slots = {
    root: ["root"],
    notchedOutline: ["notchedOutline"],
    input: ["input"]
  };
  const composedClasses = composeClasses(slots, getOutlinedInputUtilityClass, classes);
  return _extends$3({}, classes, composedClasses);
};
const OutlinedInputRoot = styled$3(InputBaseRoot, {
  shouldForwardProp: (prop) => rootShouldForwardProp(prop) || prop === "classes",
  name: "MuiOutlinedInput",
  slot: "Root",
  overridesResolver: rootOverridesResolver
})(({
  theme: theme2,
  ownerState
}) => {
  const borderColor = theme2.palette.mode === "light" ? "rgba(0, 0, 0, 0.23)" : "rgba(255, 255, 255, 0.23)";
  return _extends$3({
    position: "relative",
    borderRadius: theme2.shape.borderRadius,
    [`&:hover .${outlinedInputClasses$1.notchedOutline}`]: {
      borderColor: theme2.palette.text.primary
    },
    "@media (hover: none)": {
      [`&:hover .${outlinedInputClasses$1.notchedOutline}`]: {
        borderColor
      }
    },
    [`&.${outlinedInputClasses$1.focused} .${outlinedInputClasses$1.notchedOutline}`]: {
      borderColor: theme2.palette[ownerState.color].main,
      borderWidth: 2
    },
    [`&.${outlinedInputClasses$1.error} .${outlinedInputClasses$1.notchedOutline}`]: {
      borderColor: theme2.palette.error.main
    },
    [`&.${outlinedInputClasses$1.disabled} .${outlinedInputClasses$1.notchedOutline}`]: {
      borderColor: theme2.palette.action.disabled
    }
  }, ownerState.startAdornment && {
    paddingLeft: 14
  }, ownerState.endAdornment && {
    paddingRight: 14
  }, ownerState.multiline && _extends$3({
    padding: "16.5px 14px"
  }, ownerState.size === "small" && {
    padding: "8.5px 14px"
  }));
});
const NotchedOutlineRoot = styled$3(NotchedOutline, {
  name: "MuiOutlinedInput",
  slot: "NotchedOutline",
  overridesResolver: (props, styles2) => styles2.notchedOutline
})(({
  theme: theme2
}) => ({
  borderColor: theme2.palette.mode === "light" ? "rgba(0, 0, 0, 0.23)" : "rgba(255, 255, 255, 0.23)"
}));
const OutlinedInputInput = styled$3(InputBaseComponent, {
  name: "MuiOutlinedInput",
  slot: "Input",
  overridesResolver: inputOverridesResolver
})(({
  theme: theme2,
  ownerState
}) => _extends$3({
  padding: "16.5px 14px",
  "&:-webkit-autofill": {
    WebkitBoxShadow: theme2.palette.mode === "light" ? null : "0 0 0 100px #266798 inset",
    WebkitTextFillColor: theme2.palette.mode === "light" ? null : "#fff",
    caretColor: theme2.palette.mode === "light" ? null : "#fff",
    borderRadius: "inherit"
  }
}, ownerState.size === "small" && {
  padding: "8.5px 14px"
}, ownerState.multiline && {
  padding: 0
}, ownerState.startAdornment && {
  paddingLeft: 0
}, ownerState.endAdornment && {
  paddingRight: 0
}));
const OutlinedInput = /* @__PURE__ */ react.exports.forwardRef(function OutlinedInput2(inProps, ref) {
  const props = useThemeProps({
    props: inProps,
    name: "MuiOutlinedInput"
  });
  const {
    components = {},
    fullWidth = false,
    inputComponent = "input",
    label,
    multiline = false,
    notched,
    type = "text"
  } = props, other = _objectWithoutPropertiesLoose$1(props, _excluded$e);
  const classes = useUtilityClasses$c(props);
  return /* @__PURE__ */ jsx(InputBase$1, _extends$3({
    components: _extends$3({
      Root: OutlinedInputRoot,
      Input: OutlinedInputInput
    }, components),
    renderSuffix: (state) => /* @__PURE__ */ jsx(NotchedOutlineRoot, {
      className: classes.notchedOutline,
      label,
      notched: typeof notched !== "undefined" ? notched : Boolean(state.startAdornment || state.filled || state.focused)
    }),
    fullWidth,
    inputComponent,
    multiline,
    ref,
    type
  }, other, {
    classes: _extends$3({}, classes, {
      notchedOutline: null
    })
  }));
});
OutlinedInput.muiName = "Input";
var OutlinedInput$1 = OutlinedInput;
function getFormLabelUtilityClasses(slot) {
  return generateUtilityClass("MuiFormLabel", slot);
}
const formLabelClasses = generateUtilityClasses("MuiFormLabel", ["root", "colorSecondary", "focused", "disabled", "error", "filled", "required", "asterisk"]);
var formLabelClasses$1 = formLabelClasses;
const _excluded$d = ["children", "className", "color", "component", "disabled", "error", "filled", "focused", "required"];
const useUtilityClasses$b = (ownerState) => {
  const {
    classes,
    color,
    focused,
    disabled,
    error,
    filled,
    required
  } = ownerState;
  const slots = {
    root: ["root", `color${capitalize(color)}`, disabled && "disabled", error && "error", filled && "filled", focused && "focused", required && "required"],
    asterisk: ["asterisk", error && "error"]
  };
  return composeClasses(slots, getFormLabelUtilityClasses, classes);
};
const FormLabelRoot = styled$3("label", {
  name: "MuiFormLabel",
  slot: "Root",
  overridesResolver: ({
    ownerState
  }, styles2) => {
    return _extends$3({}, styles2.root, ownerState.color === "secondary" && styles2.colorSecondary, ownerState.filled && styles2.filled);
  }
})(({
  theme: theme2,
  ownerState
}) => _extends$3({
  color: theme2.palette.text.secondary
}, theme2.typography.body1, {
  lineHeight: "1.4375em",
  padding: 0,
  position: "relative",
  [`&.${formLabelClasses$1.focused}`]: {
    color: theme2.palette[ownerState.color].main
  },
  [`&.${formLabelClasses$1.disabled}`]: {
    color: theme2.palette.text.disabled
  },
  [`&.${formLabelClasses$1.error}`]: {
    color: theme2.palette.error.main
  }
}));
const AsteriskComponent = styled$3("span", {
  name: "MuiFormLabel",
  slot: "Asterisk",
  overridesResolver: (props, styles2) => styles2.asterisk
})(({
  theme: theme2
}) => ({
  [`&.${formLabelClasses$1.error}`]: {
    color: theme2.palette.error.main
  }
}));
const FormLabel = /* @__PURE__ */ react.exports.forwardRef(function FormLabel2(inProps, ref) {
  const props = useThemeProps({
    props: inProps,
    name: "MuiFormLabel"
  });
  const {
    children,
    className,
    component = "label"
  } = props, other = _objectWithoutPropertiesLoose$1(props, _excluded$d);
  const muiFormControl = useFormControl();
  const fcs = formControlState({
    props,
    muiFormControl,
    states: ["color", "required", "focused", "disabled", "error", "filled"]
  });
  const ownerState = _extends$3({}, props, {
    color: fcs.color || "primary",
    component,
    disabled: fcs.disabled,
    error: fcs.error,
    filled: fcs.filled,
    focused: fcs.focused,
    required: fcs.required
  });
  const classes = useUtilityClasses$b(ownerState);
  return /* @__PURE__ */ jsxs(FormLabelRoot, _extends$3({
    as: component,
    ownerState,
    className: clsx(classes.root, className),
    ref
  }, other, {
    children: [children, fcs.required && /* @__PURE__ */ jsxs(AsteriskComponent, {
      ownerState,
      "aria-hidden": true,
      className: classes.asterisk,
      children: ["\u2009", "*"]
    })]
  }));
});
var FormLabel$1 = FormLabel;
function getInputLabelUtilityClasses(slot) {
  return generateUtilityClass("MuiInputLabel", slot);
}
generateUtilityClasses("MuiInputLabel", ["root", "focused", "disabled", "error", "required", "asterisk", "formControl", "sizeSmall", "shrink", "animated", "standard", "filled", "outlined"]);
const _excluded$c = ["disableAnimation", "margin", "shrink", "variant"];
const useUtilityClasses$a = (ownerState) => {
  const {
    classes,
    formControl,
    size,
    shrink,
    disableAnimation,
    variant,
    required
  } = ownerState;
  const slots = {
    root: ["root", formControl && "formControl", !disableAnimation && "animated", shrink && "shrink", size === "small" && "sizeSmall", variant],
    asterisk: [required && "asterisk"]
  };
  const composedClasses = composeClasses(slots, getInputLabelUtilityClasses, classes);
  return _extends$3({}, classes, composedClasses);
};
const InputLabelRoot = styled$3(FormLabel$1, {
  shouldForwardProp: (prop) => rootShouldForwardProp(prop) || prop === "classes",
  name: "MuiInputLabel",
  slot: "Root",
  overridesResolver: (props, styles2) => {
    const {
      ownerState
    } = props;
    return [{
      [`& .${formLabelClasses$1.asterisk}`]: styles2.asterisk
    }, styles2.root, ownerState.formControl && styles2.formControl, ownerState.size === "small" && styles2.sizeSmall, ownerState.shrink && styles2.shrink, !ownerState.disableAnimation && styles2.animated, styles2[ownerState.variant]];
  }
})(({
  theme: theme2,
  ownerState
}) => _extends$3({
  display: "block",
  transformOrigin: "top left",
  whiteSpace: "nowrap",
  overflow: "hidden",
  textOverflow: "ellipsis",
  maxWidth: "100%"
}, ownerState.formControl && {
  position: "absolute",
  left: 0,
  top: 0,
  transform: "translate(0, 20px) scale(1)"
}, ownerState.size === "small" && {
  transform: "translate(0, 17px) scale(1)"
}, ownerState.shrink && {
  transform: "translate(0, -1.5px) scale(0.75)",
  transformOrigin: "top left",
  maxWidth: "133%"
}, !ownerState.disableAnimation && {
  transition: theme2.transitions.create(["color", "transform", "max-width"], {
    duration: theme2.transitions.duration.shorter,
    easing: theme2.transitions.easing.easeOut
  })
}, ownerState.variant === "filled" && _extends$3({
  zIndex: 1,
  pointerEvents: "none",
  transform: "translate(12px, 16px) scale(1)",
  maxWidth: "calc(100% - 24px)"
}, ownerState.size === "small" && {
  transform: "translate(12px, 13px) scale(1)"
}, ownerState.shrink && _extends$3({
  transform: "translate(12px, 7px) scale(0.75)",
  maxWidth: "calc(133% - 24px)"
}, ownerState.size === "small" && {
  transform: "translate(12px, 4px) scale(0.75)"
})), ownerState.variant === "outlined" && _extends$3({
  zIndex: 1,
  pointerEvents: "none",
  transform: "translate(14px, 16px) scale(1)",
  maxWidth: "calc(100% - 24px)"
}, ownerState.size === "small" && {
  transform: "translate(14px, 9px) scale(1)"
}, ownerState.shrink && {
  maxWidth: "calc(133% - 24px)",
  transform: "translate(14px, -9px) scale(0.75)"
})));
const InputLabel = /* @__PURE__ */ react.exports.forwardRef(function InputLabel2(inProps, ref) {
  const props = useThemeProps({
    name: "MuiInputLabel",
    props: inProps
  });
  const {
    disableAnimation = false,
    shrink: shrinkProp
  } = props, other = _objectWithoutPropertiesLoose$1(props, _excluded$c);
  const muiFormControl = useFormControl();
  let shrink = shrinkProp;
  if (typeof shrink === "undefined" && muiFormControl) {
    shrink = muiFormControl.filled || muiFormControl.focused || muiFormControl.adornedStart;
  }
  const fcs = formControlState({
    props,
    muiFormControl,
    states: ["size", "variant", "required"]
  });
  const ownerState = _extends$3({}, props, {
    disableAnimation,
    formControl: muiFormControl,
    shrink,
    size: fcs.size,
    variant: fcs.variant,
    required: fcs.required
  });
  const classes = useUtilityClasses$a(ownerState);
  return /* @__PURE__ */ jsx(InputLabelRoot, _extends$3({
    "data-shrink": shrink,
    ownerState,
    ref
  }, other, {
    classes
  }));
});
var InputLabel$1 = InputLabel;
function getFormHelperTextUtilityClasses(slot) {
  return generateUtilityClass("MuiFormHelperText", slot);
}
const formHelperTextClasses = generateUtilityClasses("MuiFormHelperText", ["root", "error", "disabled", "sizeSmall", "sizeMedium", "contained", "focused", "filled", "required"]);
var formHelperTextClasses$1 = formHelperTextClasses;
const _excluded$b = ["children", "className", "component", "disabled", "error", "filled", "focused", "margin", "required", "variant"];
const useUtilityClasses$9 = (ownerState) => {
  const {
    classes,
    contained,
    size,
    disabled,
    error,
    filled,
    focused,
    required
  } = ownerState;
  const slots = {
    root: ["root", disabled && "disabled", error && "error", size && `size${capitalize(size)}`, contained && "contained", focused && "focused", filled && "filled", required && "required"]
  };
  return composeClasses(slots, getFormHelperTextUtilityClasses, classes);
};
const FormHelperTextRoot = styled$3("p", {
  name: "MuiFormHelperText",
  slot: "Root",
  overridesResolver: (props, styles2) => {
    const {
      ownerState
    } = props;
    return [styles2.root, ownerState.size && styles2[`size${capitalize(ownerState.size)}`], ownerState.contained && styles2.contained, ownerState.filled && styles2.filled];
  }
})(({
  theme: theme2,
  ownerState
}) => _extends$3({
  color: theme2.palette.text.secondary
}, theme2.typography.caption, {
  textAlign: "left",
  marginTop: 3,
  marginRight: 0,
  marginBottom: 0,
  marginLeft: 0,
  [`&.${formHelperTextClasses$1.disabled}`]: {
    color: theme2.palette.text.disabled
  },
  [`&.${formHelperTextClasses$1.error}`]: {
    color: theme2.palette.error.main
  }
}, ownerState.size === "small" && {
  marginTop: 4
}, ownerState.contained && {
  marginLeft: 14,
  marginRight: 14
}));
const FormHelperText = /* @__PURE__ */ react.exports.forwardRef(function FormHelperText2(inProps, ref) {
  const props = useThemeProps({
    props: inProps,
    name: "MuiFormHelperText"
  });
  const {
    children,
    className,
    component = "p"
  } = props, other = _objectWithoutPropertiesLoose$1(props, _excluded$b);
  const muiFormControl = useFormControl();
  const fcs = formControlState({
    props,
    muiFormControl,
    states: ["variant", "size", "disabled", "error", "filled", "focused", "required"]
  });
  const ownerState = _extends$3({}, props, {
    component,
    contained: fcs.variant === "filled" || fcs.variant === "outlined",
    variant: fcs.variant,
    size: fcs.size,
    disabled: fcs.disabled,
    error: fcs.error,
    filled: fcs.filled,
    focused: fcs.focused,
    required: fcs.required
  });
  const classes = useUtilityClasses$9(ownerState);
  return /* @__PURE__ */ jsx(FormHelperTextRoot, _extends$3({
    as: component,
    ownerState,
    className: clsx(classes.root, className),
    ref
  }, other, {
    children: children === " " ? /* @__PURE__ */ jsx("span", {
      className: "notranslate",
      dangerouslySetInnerHTML: {
        __html: "&#8203;"
      }
    }) : children
  }));
});
var FormHelperText$1 = FormHelperText;
function getNativeSelectUtilityClasses(slot) {
  return generateUtilityClass("MuiNativeSelect", slot);
}
const nativeSelectClasses = generateUtilityClasses("MuiNativeSelect", ["root", "select", "filled", "outlined", "standard", "disabled", "icon", "iconOpen", "iconFilled", "iconOutlined", "iconStandard", "nativeInput"]);
const _excluded$a = ["className", "disabled", "IconComponent", "inputRef", "variant"];
const useUtilityClasses$8 = (ownerState) => {
  const {
    classes,
    variant,
    disabled,
    open
  } = ownerState;
  const slots = {
    select: ["select", variant, disabled && "disabled"],
    icon: ["icon", `icon${capitalize(variant)}`, open && "iconOpen", disabled && "disabled"]
  };
  return composeClasses(slots, getNativeSelectUtilityClasses, classes);
};
const nativeSelectSelectStyles = ({
  ownerState,
  theme: theme2
}) => _extends$3({
  MozAppearance: "none",
  WebkitAppearance: "none",
  userSelect: "none",
  borderRadius: 0,
  cursor: "pointer",
  "&:focus": {
    backgroundColor: theme2.palette.mode === "light" ? "rgba(0, 0, 0, 0.05)" : "rgba(255, 255, 255, 0.05)",
    borderRadius: 0
  },
  "&::-ms-expand": {
    display: "none"
  },
  [`&.${nativeSelectClasses.disabled}`]: {
    cursor: "default"
  },
  "&[multiple]": {
    height: "auto"
  },
  "&:not([multiple]) option, &:not([multiple]) optgroup": {
    backgroundColor: theme2.palette.background.paper
  },
  "&&&": {
    paddingRight: 24,
    minWidth: 16
  }
}, ownerState.variant === "filled" && {
  "&&&": {
    paddingRight: 32
  }
}, ownerState.variant === "outlined" && {
  borderRadius: theme2.shape.borderRadius,
  "&:focus": {
    borderRadius: theme2.shape.borderRadius
  },
  "&&&": {
    paddingRight: 32
  }
});
const NativeSelectSelect = styled$3("select", {
  name: "MuiNativeSelect",
  slot: "Select",
  shouldForwardProp: rootShouldForwardProp,
  overridesResolver: (props, styles2) => {
    const {
      ownerState
    } = props;
    return [styles2.select, styles2[ownerState.variant]];
  }
})(nativeSelectSelectStyles);
const nativeSelectIconStyles = ({
  ownerState,
  theme: theme2
}) => _extends$3({
  position: "absolute",
  right: 0,
  top: "calc(50% - .5em)",
  pointerEvents: "none",
  color: theme2.palette.action.active,
  [`&.${nativeSelectClasses.disabled}`]: {
    color: theme2.palette.action.disabled
  }
}, ownerState.open && {
  transform: "rotate(180deg)"
}, ownerState.variant === "filled" && {
  right: 7
}, ownerState.variant === "outlined" && {
  right: 7
});
const NativeSelectIcon = styled$3("svg", {
  name: "MuiNativeSelect",
  slot: "Icon",
  overridesResolver: (props, styles2) => {
    const {
      ownerState
    } = props;
    return [styles2.icon, ownerState.variant && styles2[`icon${capitalize(ownerState.variant)}`], ownerState.open && styles2.iconOpen];
  }
})(nativeSelectIconStyles);
const NativeSelectInput = /* @__PURE__ */ react.exports.forwardRef(function NativeSelectInput2(props, ref) {
  const {
    className,
    disabled,
    IconComponent,
    inputRef,
    variant = "standard"
  } = props, other = _objectWithoutPropertiesLoose$1(props, _excluded$a);
  const ownerState = _extends$3({}, props, {
    disabled,
    variant
  });
  const classes = useUtilityClasses$8(ownerState);
  return /* @__PURE__ */ jsxs(react.exports.Fragment, {
    children: [/* @__PURE__ */ jsx(NativeSelectSelect, _extends$3({
      ownerState,
      className: clsx(classes.select, className),
      disabled,
      ref: inputRef || ref
    }, other)), props.multiple ? null : /* @__PURE__ */ jsx(NativeSelectIcon, {
      as: IconComponent,
      ownerState,
      className: classes.icon
    })]
  });
});
var NativeSelectInput$1 = NativeSelectInput;
function getSelectUtilityClasses(slot) {
  return generateUtilityClass("MuiSelect", slot);
}
const selectClasses = generateUtilityClasses("MuiSelect", ["root", "select", "filled", "outlined", "standard", "disabled", "focused", "icon", "iconOpen", "iconFilled", "iconOutlined", "iconStandard", "nativeInput"]);
const _excluded$9 = ["aria-describedby", "aria-label", "autoFocus", "autoWidth", "children", "className", "defaultValue", "disabled", "displayEmpty", "IconComponent", "inputRef", "labelId", "MenuProps", "multiple", "name", "onBlur", "onChange", "onClose", "onFocus", "onOpen", "open", "readOnly", "renderValue", "SelectDisplayProps", "tabIndex", "type", "value", "variant"];
const SelectSelect = styled$3("div", {
  name: "MuiSelect",
  slot: "Select",
  overridesResolver: (props, styles2) => {
    const {
      ownerState
    } = props;
    return [
      {
        [`&.${selectClasses.select}`]: styles2.select
      },
      {
        [`&.${selectClasses.select}`]: styles2[ownerState.variant]
      }
    ];
  }
})(nativeSelectSelectStyles, {
  [`&.${selectClasses.select}`]: {
    height: "auto",
    minHeight: "1.4375em",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
    overflow: "hidden"
  }
});
const SelectIcon = styled$3("svg", {
  name: "MuiSelect",
  slot: "Icon",
  overridesResolver: (props, styles2) => {
    const {
      ownerState
    } = props;
    return [styles2.icon, ownerState.variant && styles2[`icon${capitalize(ownerState.variant)}`], ownerState.open && styles2.iconOpen];
  }
})(nativeSelectIconStyles);
const SelectNativeInput = styled$3("input", {
  shouldForwardProp: (prop) => slotShouldForwardProp(prop) && prop !== "classes",
  name: "MuiSelect",
  slot: "NativeInput",
  overridesResolver: (props, styles2) => styles2.nativeInput
})({
  bottom: 0,
  left: 0,
  position: "absolute",
  opacity: 0,
  pointerEvents: "none",
  width: "100%",
  boxSizing: "border-box"
});
function areEqualValues(a, b2) {
  if (typeof b2 === "object" && b2 !== null) {
    return a === b2;
  }
  return String(a) === String(b2);
}
function isEmpty$1(display) {
  return display == null || typeof display === "string" && !display.trim();
}
const useUtilityClasses$7 = (ownerState) => {
  const {
    classes,
    variant,
    disabled,
    open
  } = ownerState;
  const slots = {
    select: ["select", variant, disabled && "disabled"],
    icon: ["icon", `icon${capitalize(variant)}`, open && "iconOpen", disabled && "disabled"],
    nativeInput: ["nativeInput"]
  };
  return composeClasses(slots, getSelectUtilityClasses, classes);
};
const SelectInput = /* @__PURE__ */ react.exports.forwardRef(function SelectInput2(props, ref) {
  const {
    "aria-describedby": ariaDescribedby,
    "aria-label": ariaLabel,
    autoFocus,
    autoWidth,
    children,
    className,
    defaultValue,
    disabled,
    displayEmpty,
    IconComponent,
    inputRef: inputRefProp,
    labelId,
    MenuProps = {},
    multiple,
    name,
    onBlur,
    onChange,
    onClose,
    onFocus,
    onOpen,
    open: openProp,
    readOnly,
    renderValue,
    SelectDisplayProps = {},
    tabIndex: tabIndexProp,
    value: valueProp,
    variant = "standard"
  } = props, other = _objectWithoutPropertiesLoose$1(props, _excluded$9);
  const [value, setValueState] = useControlled({
    controlled: valueProp,
    default: defaultValue,
    name: "Select"
  });
  const inputRef = react.exports.useRef(null);
  const displayRef = react.exports.useRef(null);
  const [displayNode, setDisplayNode] = react.exports.useState(null);
  const {
    current: isOpenControlled
  } = react.exports.useRef(openProp != null);
  const [menuMinWidthState, setMenuMinWidthState] = react.exports.useState();
  const [openState, setOpenState] = react.exports.useState(false);
  const handleRef = useForkRef(ref, inputRefProp);
  const handleDisplayRef = react.exports.useCallback((node) => {
    displayRef.current = node;
    if (node) {
      setDisplayNode(node);
    }
  }, []);
  react.exports.useImperativeHandle(handleRef, () => ({
    focus: () => {
      displayRef.current.focus();
    },
    node: inputRef.current,
    value
  }), [value]);
  react.exports.useEffect(() => {
    if (autoFocus) {
      displayRef.current.focus();
    }
  }, [autoFocus]);
  react.exports.useEffect(() => {
    const label = ownerDocument(displayRef.current).getElementById(labelId);
    if (label) {
      const handler = () => {
        if (getSelection().isCollapsed) {
          displayRef.current.focus();
        }
      };
      label.addEventListener("click", handler);
      return () => {
        label.removeEventListener("click", handler);
      };
    }
    return void 0;
  }, [labelId]);
  const update = (open2, event) => {
    if (open2) {
      if (onOpen) {
        onOpen(event);
      }
    } else if (onClose) {
      onClose(event);
    }
    if (!isOpenControlled) {
      setMenuMinWidthState(autoWidth ? null : displayNode.clientWidth);
      setOpenState(open2);
    }
  };
  const handleMouseDown = (event) => {
    if (event.button !== 0) {
      return;
    }
    event.preventDefault();
    displayRef.current.focus();
    update(true, event);
  };
  const handleClose = (event) => {
    update(false, event);
  };
  const childrenArray = react.exports.Children.toArray(children);
  const handleChange = (event) => {
    const index2 = childrenArray.map((child2) => child2.props.value).indexOf(event.target.value);
    if (index2 === -1) {
      return;
    }
    const child = childrenArray[index2];
    setValueState(child.props.value);
    if (onChange) {
      onChange(event, child);
    }
  };
  const handleItemClick = (child) => (event) => {
    let newValue;
    if (!event.currentTarget.hasAttribute("tabindex")) {
      return;
    }
    if (multiple) {
      newValue = Array.isArray(value) ? value.slice() : [];
      const itemIndex = value.indexOf(child.props.value);
      if (itemIndex === -1) {
        newValue.push(child.props.value);
      } else {
        newValue.splice(itemIndex, 1);
      }
    } else {
      newValue = child.props.value;
    }
    if (child.props.onClick) {
      child.props.onClick(event);
    }
    if (value !== newValue) {
      setValueState(newValue);
      if (onChange) {
        const nativeEvent = event.nativeEvent || event;
        const clonedEvent = new nativeEvent.constructor(nativeEvent.type, nativeEvent);
        Object.defineProperty(clonedEvent, "target", {
          writable: true,
          value: {
            value: newValue,
            name
          }
        });
        onChange(clonedEvent, child);
      }
    }
    if (!multiple) {
      update(false, event);
    }
  };
  const handleKeyDown2 = (event) => {
    if (!readOnly) {
      const validKeys = [
        " ",
        "ArrowUp",
        "ArrowDown",
        "Enter"
      ];
      if (validKeys.indexOf(event.key) !== -1) {
        event.preventDefault();
        update(true, event);
      }
    }
  };
  const open = displayNode !== null && (isOpenControlled ? openProp : openState);
  const handleBlur = (event) => {
    if (!open && onBlur) {
      Object.defineProperty(event, "target", {
        writable: true,
        value: {
          value,
          name
        }
      });
      onBlur(event);
    }
  };
  delete other["aria-invalid"];
  let display;
  let displaySingle;
  const displayMultiple = [];
  let computeDisplay = false;
  if (isFilled({
    value
  }) || displayEmpty) {
    if (renderValue) {
      display = renderValue(value);
    } else {
      computeDisplay = true;
    }
  }
  const items = childrenArray.map((child) => {
    if (!/* @__PURE__ */ react.exports.isValidElement(child)) {
      return null;
    }
    let selected;
    if (multiple) {
      if (!Array.isArray(value)) {
        throw new Error(formatMuiErrorMessage(2));
      }
      selected = value.some((v2) => areEqualValues(v2, child.props.value));
      if (selected && computeDisplay) {
        displayMultiple.push(child.props.children);
      }
    } else {
      selected = areEqualValues(value, child.props.value);
      if (selected && computeDisplay) {
        displaySingle = child.props.children;
      }
    }
    return /* @__PURE__ */ react.exports.cloneElement(child, {
      "aria-selected": selected ? "true" : void 0,
      onClick: handleItemClick(child),
      onKeyUp: (event) => {
        if (event.key === " ") {
          event.preventDefault();
        }
        if (child.props.onKeyUp) {
          child.props.onKeyUp(event);
        }
      },
      role: "option",
      selected,
      value: void 0,
      "data-value": child.props.value
    });
  });
  if (computeDisplay) {
    display = multiple ? displayMultiple.join(", ") : displaySingle;
  }
  let menuMinWidth = menuMinWidthState;
  if (!autoWidth && isOpenControlled && displayNode) {
    menuMinWidth = displayNode.clientWidth;
  }
  let tabIndex;
  if (typeof tabIndexProp !== "undefined") {
    tabIndex = tabIndexProp;
  } else {
    tabIndex = disabled ? null : 0;
  }
  const buttonId = SelectDisplayProps.id || (name ? `mui-component-select-${name}` : void 0);
  const ownerState = _extends$3({}, props, {
    variant,
    value,
    open
  });
  const classes = useUtilityClasses$7(ownerState);
  return /* @__PURE__ */ jsxs(react.exports.Fragment, {
    children: [/* @__PURE__ */ jsx(SelectSelect, _extends$3({
      ref: handleDisplayRef,
      tabIndex,
      role: "button",
      "aria-disabled": disabled ? "true" : void 0,
      "aria-expanded": open ? "true" : "false",
      "aria-haspopup": "listbox",
      "aria-label": ariaLabel,
      "aria-labelledby": [labelId, buttonId].filter(Boolean).join(" ") || void 0,
      "aria-describedby": ariaDescribedby,
      onKeyDown: handleKeyDown2,
      onMouseDown: disabled || readOnly ? null : handleMouseDown,
      onBlur: handleBlur,
      onFocus
    }, SelectDisplayProps, {
      ownerState,
      className: clsx(classes.select, className, SelectDisplayProps.className),
      id: buttonId,
      children: isEmpty$1(display) ? /* @__PURE__ */ jsx("span", {
        className: "notranslate",
        dangerouslySetInnerHTML: {
          __html: "&#8203;"
        }
      }) : display
    })), /* @__PURE__ */ jsx(SelectNativeInput, _extends$3({
      value: Array.isArray(value) ? value.join(",") : value,
      name,
      ref: inputRef,
      "aria-hidden": true,
      onChange: handleChange,
      tabIndex: -1,
      disabled,
      className: classes.nativeInput,
      autoFocus,
      ownerState
    }, other)), /* @__PURE__ */ jsx(SelectIcon, {
      as: IconComponent,
      className: classes.icon,
      ownerState
    }), /* @__PURE__ */ jsx(Menu$2, _extends$3({
      id: `menu-${name || ""}`,
      anchorEl: displayNode,
      open,
      onClose: handleClose,
      anchorOrigin: {
        vertical: "bottom",
        horizontal: "center"
      },
      transformOrigin: {
        vertical: "top",
        horizontal: "center"
      }
    }, MenuProps, {
      MenuListProps: _extends$3({
        "aria-labelledby": labelId,
        role: "listbox",
        disableListWrap: true
      }, MenuProps.MenuListProps),
      PaperProps: _extends$3({}, MenuProps.PaperProps, {
        style: _extends$3({
          minWidth: menuMinWidth
        }, MenuProps.PaperProps != null ? MenuProps.PaperProps.style : null)
      }),
      children: items
    }))]
  });
});
var SelectInput$1 = SelectInput;
var _Input, _FilledInput;
const _excluded$8 = ["autoWidth", "children", "classes", "className", "displayEmpty", "IconComponent", "id", "input", "inputProps", "label", "labelId", "MenuProps", "multiple", "native", "onClose", "onOpen", "open", "renderValue", "SelectDisplayProps", "variant"], _excluded2$1 = ["root"];
const useUtilityClasses$6 = (ownerState) => {
  const {
    classes
  } = ownerState;
  const slots = {
    root: ["root"]
  };
  return composeClasses(slots, getSelectUtilityClasses, classes);
};
const Select = /* @__PURE__ */ react.exports.forwardRef(function Select2(inProps, ref) {
  const props = useThemeProps({
    name: "MuiSelect",
    props: inProps
  });
  const {
    autoWidth = false,
    children,
    classes: classesProp = {},
    className,
    displayEmpty = false,
    IconComponent = ArrowDropDownIcon,
    id,
    input,
    inputProps,
    label,
    labelId,
    MenuProps,
    multiple = false,
    native = false,
    onClose,
    onOpen,
    open,
    renderValue,
    SelectDisplayProps,
    variant: variantProps = "outlined"
  } = props, other = _objectWithoutPropertiesLoose$1(props, _excluded$8);
  const inputComponent = native ? NativeSelectInput$1 : SelectInput$1;
  const muiFormControl = useFormControl();
  const fcs = formControlState({
    props,
    muiFormControl,
    states: ["variant"]
  });
  const variant = fcs.variant || variantProps;
  const InputComponent = input || {
    standard: _Input || (_Input = /* @__PURE__ */ jsx(Input$1, {})),
    outlined: /* @__PURE__ */ jsx(OutlinedInput$1, {
      label
    }),
    filled: _FilledInput || (_FilledInput = /* @__PURE__ */ jsx(FilledInput$1, {}))
  }[variant];
  const ownerState = _extends$3({}, props, {
    classes: classesProp
  });
  const classes = useUtilityClasses$6(ownerState);
  const otherClasses = _objectWithoutPropertiesLoose$1(classesProp, _excluded2$1);
  const inputComponentRef = useForkRef(ref, InputComponent.ref);
  return /* @__PURE__ */ react.exports.cloneElement(InputComponent, _extends$3({
    inputComponent,
    inputProps: _extends$3({
      children,
      IconComponent,
      variant,
      type: void 0,
      multiple
    }, native ? {
      id
    } : {
      autoWidth,
      displayEmpty,
      labelId,
      MenuProps,
      onClose,
      onOpen,
      open,
      renderValue,
      SelectDisplayProps: _extends$3({
        id
      }, SelectDisplayProps)
    }, inputProps, {
      classes: inputProps ? deepmerge(otherClasses, inputProps.classes) : otherClasses
    }, input ? input.props.inputProps : {})
  }, multiple && native && variant === "outlined" ? {
    notched: true
  } : {}, {
    ref: inputComponentRef,
    className: clsx(classes.root, InputComponent.props.className, className)
  }, other));
});
Select.muiName = "Select";
var Select$1 = Select;
function getTextFieldUtilityClass(slot) {
  return generateUtilityClass("MuiTextField", slot);
}
generateUtilityClasses("MuiTextField", ["root"]);
const _excluded$7 = ["autoComplete", "autoFocus", "children", "className", "color", "defaultValue", "disabled", "error", "FormHelperTextProps", "fullWidth", "helperText", "id", "InputLabelProps", "inputProps", "InputProps", "inputRef", "label", "maxRows", "minRows", "multiline", "name", "onBlur", "onChange", "onFocus", "placeholder", "required", "rows", "select", "SelectProps", "type", "value", "variant"];
const variantComponent = {
  standard: Input$1,
  filled: FilledInput$1,
  outlined: OutlinedInput$1
};
const useUtilityClasses$5 = (ownerState) => {
  const {
    classes
  } = ownerState;
  const slots = {
    root: ["root"]
  };
  return composeClasses(slots, getTextFieldUtilityClass, classes);
};
const TextFieldRoot = styled$3(FormControl$1, {
  name: "MuiTextField",
  slot: "Root",
  overridesResolver: (props, styles2) => styles2.root
})({});
const TextField = /* @__PURE__ */ react.exports.forwardRef(function TextField2(inProps, ref) {
  const props = useThemeProps({
    props: inProps,
    name: "MuiTextField"
  });
  const {
    autoComplete,
    autoFocus = false,
    children,
    className,
    color = "primary",
    defaultValue,
    disabled = false,
    error = false,
    FormHelperTextProps,
    fullWidth = false,
    helperText,
    id,
    InputLabelProps,
    inputProps,
    InputProps,
    inputRef,
    label,
    maxRows,
    minRows,
    multiline = false,
    name,
    onBlur,
    onChange,
    onFocus,
    placeholder,
    required = false,
    rows,
    select = false,
    SelectProps,
    type,
    value,
    variant = "outlined"
  } = props, other = _objectWithoutPropertiesLoose$1(props, _excluded$7);
  const ownerState = _extends$3({}, props, {
    autoFocus,
    color,
    disabled,
    error,
    fullWidth,
    multiline,
    required,
    select,
    variant
  });
  const classes = useUtilityClasses$5(ownerState);
  const InputMore = {};
  if (variant === "outlined") {
    if (InputLabelProps && typeof InputLabelProps.shrink !== "undefined") {
      InputMore.notched = InputLabelProps.shrink;
    }
    if (label) {
      var _InputLabelProps$requ;
      const displayRequired = (_InputLabelProps$requ = InputLabelProps == null ? void 0 : InputLabelProps.required) != null ? _InputLabelProps$requ : required;
      InputMore.label = /* @__PURE__ */ jsxs(react.exports.Fragment, {
        children: [label, displayRequired && "\xA0*"]
      });
    }
  }
  if (select) {
    if (!SelectProps || !SelectProps.native) {
      InputMore.id = void 0;
    }
    InputMore["aria-describedby"] = void 0;
  }
  const helperTextId = helperText && id ? `${id}-helper-text` : void 0;
  const inputLabelId = label && id ? `${id}-label` : void 0;
  const InputComponent = variantComponent[variant];
  const InputElement = /* @__PURE__ */ jsx(InputComponent, _extends$3({
    "aria-describedby": helperTextId,
    autoComplete,
    autoFocus,
    defaultValue,
    fullWidth,
    multiline,
    name,
    rows,
    maxRows,
    minRows,
    type,
    value,
    id,
    inputRef,
    onBlur,
    onChange,
    onFocus,
    placeholder,
    inputProps
  }, InputMore, InputProps));
  return /* @__PURE__ */ jsxs(TextFieldRoot, _extends$3({
    className: clsx(classes.root, className),
    disabled,
    error,
    fullWidth,
    ref,
    required,
    color,
    variant,
    ownerState
  }, other, {
    children: [label && /* @__PURE__ */ jsx(InputLabel$1, _extends$3({
      htmlFor: id,
      id: inputLabelId
    }, InputLabelProps, {
      children: label
    })), select ? /* @__PURE__ */ jsx(Select$1, _extends$3({
      "aria-describedby": helperTextId,
      id,
      labelId: inputLabelId,
      value,
      input: InputElement
    }, SelectProps, {
      children
    })) : InputElement, helperText && /* @__PURE__ */ jsx(FormHelperText$1, _extends$3({
      id: helperTextId
    }, FormHelperTextProps, {
      children: helperText
    }))]
  }));
});
var TextField$1 = TextField;
var main = { exports: {} };
(function(module) {
  module.exports = function(modules) {
    var installedModules = {};
    function __webpack_require__(moduleId) {
      if (installedModules[moduleId])
        return installedModules[moduleId].exports;
      var module2 = installedModules[moduleId] = {
        exports: {},
        id: moduleId,
        loaded: false
      };
      modules[moduleId].call(module2.exports, module2, module2.exports, __webpack_require__);
      module2.loaded = true;
      return module2.exports;
    }
    __webpack_require__.m = modules;
    __webpack_require__.c = installedModules;
    __webpack_require__.p = "";
    return __webpack_require__(0);
  }([
    function(module2, exports, __webpack_require__) {
      module2.exports = __webpack_require__(1);
    },
    function(module2, exports, __webpack_require__) {
      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      function _interopRequireDefault2(obj) {
        return obj && obj.__esModule ? obj : { "default": obj };
      }
      var _Highlighter = __webpack_require__(2);
      var _Highlighter2 = _interopRequireDefault2(_Highlighter);
      exports["default"] = _Highlighter2["default"];
      module2.exports = exports["default"];
    },
    function(module2, exports, __webpack_require__) {
      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      var _extends3 = Object.assign || function(target) {
        for (var i = 1; i < arguments.length; i++) {
          var source = arguments[i];
          for (var key in source) {
            if (Object.prototype.hasOwnProperty.call(source, key)) {
              target[key] = source[key];
            }
          }
        }
        return target;
      };
      exports["default"] = Highlighter2;
      function _interopRequireDefault2(obj) {
        return obj && obj.__esModule ? obj : { "default": obj };
      }
      function _objectWithoutProperties(obj, keys) {
        var target = {};
        for (var i in obj) {
          if (keys.indexOf(i) >= 0)
            continue;
          if (!Object.prototype.hasOwnProperty.call(obj, i))
            continue;
          target[i] = obj[i];
        }
        return target;
      }
      var _highlightWordsCore = __webpack_require__(3);
      var _propTypes = __webpack_require__(4);
      var _propTypes2 = _interopRequireDefault2(_propTypes);
      var _react = __webpack_require__(14);
      var _memoizeOne = __webpack_require__(15);
      var _memoizeOne2 = _interopRequireDefault2(_memoizeOne);
      Highlighter2.propTypes = {
        activeClassName: _propTypes2["default"].string,
        activeIndex: _propTypes2["default"].number,
        activeStyle: _propTypes2["default"].object,
        autoEscape: _propTypes2["default"].bool,
        className: _propTypes2["default"].string,
        findChunks: _propTypes2["default"].func,
        highlightClassName: _propTypes2["default"].oneOfType([_propTypes2["default"].object, _propTypes2["default"].string]),
        highlightStyle: _propTypes2["default"].object,
        highlightTag: _propTypes2["default"].oneOfType([_propTypes2["default"].node, _propTypes2["default"].func, _propTypes2["default"].string]),
        sanitize: _propTypes2["default"].func,
        searchWords: _propTypes2["default"].arrayOf(_propTypes2["default"].oneOfType([_propTypes2["default"].string, _propTypes2["default"].instanceOf(RegExp)])).isRequired,
        textToHighlight: _propTypes2["default"].string.isRequired,
        unhighlightClassName: _propTypes2["default"].string,
        unhighlightStyle: _propTypes2["default"].object
      };
      function Highlighter2(_ref) {
        var _ref$activeClassName = _ref.activeClassName;
        var activeClassName = _ref$activeClassName === void 0 ? "" : _ref$activeClassName;
        var _ref$activeIndex = _ref.activeIndex;
        var activeIndex = _ref$activeIndex === void 0 ? -1 : _ref$activeIndex;
        var activeStyle = _ref.activeStyle;
        var autoEscape = _ref.autoEscape;
        var _ref$caseSensitive = _ref.caseSensitive;
        var caseSensitive = _ref$caseSensitive === void 0 ? false : _ref$caseSensitive;
        var className = _ref.className;
        var findChunks = _ref.findChunks;
        var _ref$highlightClassName = _ref.highlightClassName;
        var highlightClassName = _ref$highlightClassName === void 0 ? "" : _ref$highlightClassName;
        var _ref$highlightStyle = _ref.highlightStyle;
        var highlightStyle = _ref$highlightStyle === void 0 ? {} : _ref$highlightStyle;
        var _ref$highlightTag = _ref.highlightTag;
        var highlightTag = _ref$highlightTag === void 0 ? "mark" : _ref$highlightTag;
        var sanitize = _ref.sanitize;
        var searchWords = _ref.searchWords;
        var textToHighlight = _ref.textToHighlight;
        var _ref$unhighlightClassName = _ref.unhighlightClassName;
        var unhighlightClassName = _ref$unhighlightClassName === void 0 ? "" : _ref$unhighlightClassName;
        var unhighlightStyle = _ref.unhighlightStyle;
        var rest = _objectWithoutProperties(_ref, ["activeClassName", "activeIndex", "activeStyle", "autoEscape", "caseSensitive", "className", "findChunks", "highlightClassName", "highlightStyle", "highlightTag", "sanitize", "searchWords", "textToHighlight", "unhighlightClassName", "unhighlightStyle"]);
        var chunks = (0, _highlightWordsCore.findAll)({
          autoEscape,
          caseSensitive,
          findChunks,
          sanitize,
          searchWords,
          textToHighlight
        });
        var HighlightTag = highlightTag;
        var highlightIndex = -1;
        var highlightClassNames = "";
        var highlightStyles = void 0;
        var lowercaseProps = function lowercaseProps2(object) {
          var mapped = {};
          for (var key in object) {
            mapped[key.toLowerCase()] = object[key];
          }
          return mapped;
        };
        var memoizedLowercaseProps = (0, _memoizeOne2["default"])(lowercaseProps);
        return (0, _react.createElement)("span", _extends3({
          className
        }, rest, {
          children: chunks.map(function(chunk, index2) {
            var text = textToHighlight.substr(chunk.start, chunk.end - chunk.start);
            if (chunk.highlight) {
              highlightIndex++;
              var highlightClass = void 0;
              if (typeof highlightClassName === "object") {
                if (!caseSensitive) {
                  highlightClassName = memoizedLowercaseProps(highlightClassName);
                  highlightClass = highlightClassName[text.toLowerCase()];
                } else {
                  highlightClass = highlightClassName[text];
                }
              } else {
                highlightClass = highlightClassName;
              }
              var isActive = highlightIndex === +activeIndex;
              highlightClassNames = highlightClass + " " + (isActive ? activeClassName : "");
              highlightStyles = isActive === true && activeStyle != null ? Object.assign({}, highlightStyle, activeStyle) : highlightStyle;
              var props = {
                children: text,
                className: highlightClassNames,
                key: index2,
                style: highlightStyles
              };
              if (typeof HighlightTag !== "string") {
                props.highlightIndex = highlightIndex;
              }
              return (0, _react.createElement)(HighlightTag, props);
            } else {
              return (0, _react.createElement)("span", {
                children: text,
                className: unhighlightClassName,
                key: index2,
                style: unhighlightStyle
              });
            }
          })
        }));
      }
      module2.exports = exports["default"];
    },
    function(module2, exports) {
      module2.exports = function(modules) {
        var installedModules = {};
        function __webpack_require__(moduleId) {
          if (installedModules[moduleId])
            return installedModules[moduleId].exports;
          var module3 = installedModules[moduleId] = {
            exports: {},
            id: moduleId,
            loaded: false
          };
          modules[moduleId].call(module3.exports, module3, module3.exports, __webpack_require__);
          module3.loaded = true;
          return module3.exports;
        }
        __webpack_require__.m = modules;
        __webpack_require__.c = installedModules;
        __webpack_require__.p = "";
        return __webpack_require__(0);
      }([
        function(module3, exports2, __webpack_require__) {
          module3.exports = __webpack_require__(1);
        },
        function(module3, exports2, __webpack_require__) {
          Object.defineProperty(exports2, "__esModule", {
            value: true
          });
          var _utils2 = __webpack_require__(2);
          Object.defineProperty(exports2, "combineChunks", {
            enumerable: true,
            get: function get() {
              return _utils2.combineChunks;
            }
          });
          Object.defineProperty(exports2, "fillInChunks", {
            enumerable: true,
            get: function get() {
              return _utils2.fillInChunks;
            }
          });
          Object.defineProperty(exports2, "findAll", {
            enumerable: true,
            get: function get() {
              return _utils2.findAll;
            }
          });
          Object.defineProperty(exports2, "findChunks", {
            enumerable: true,
            get: function get() {
              return _utils2.findChunks;
            }
          });
        },
        function(module3, exports2) {
          Object.defineProperty(exports2, "__esModule", {
            value: true
          });
          exports2.findAll = function findAll(_ref) {
            var autoEscape = _ref.autoEscape, _ref$caseSensitive = _ref.caseSensitive, caseSensitive = _ref$caseSensitive === void 0 ? false : _ref$caseSensitive, _ref$findChunks = _ref.findChunks, findChunks = _ref$findChunks === void 0 ? defaultFindChunks : _ref$findChunks, sanitize = _ref.sanitize, searchWords = _ref.searchWords, textToHighlight = _ref.textToHighlight;
            return fillInChunks({
              chunksToHighlight: combineChunks({
                chunks: findChunks({
                  autoEscape,
                  caseSensitive,
                  sanitize,
                  searchWords,
                  textToHighlight
                })
              }),
              totalLength: textToHighlight ? textToHighlight.length : 0
            });
          };
          var combineChunks = exports2.combineChunks = function combineChunks2(_ref2) {
            var chunks = _ref2.chunks;
            chunks = chunks.sort(function(first, second) {
              return first.start - second.start;
            }).reduce(function(processedChunks, nextChunk) {
              if (processedChunks.length === 0) {
                return [nextChunk];
              } else {
                var prevChunk = processedChunks.pop();
                if (nextChunk.start <= prevChunk.end) {
                  var endIndex = Math.max(prevChunk.end, nextChunk.end);
                  processedChunks.push({ start: prevChunk.start, end: endIndex });
                } else {
                  processedChunks.push(prevChunk, nextChunk);
                }
                return processedChunks;
              }
            }, []);
            return chunks;
          };
          var defaultFindChunks = function defaultFindChunks2(_ref3) {
            var autoEscape = _ref3.autoEscape, caseSensitive = _ref3.caseSensitive, _ref3$sanitize = _ref3.sanitize, sanitize = _ref3$sanitize === void 0 ? identity2 : _ref3$sanitize, searchWords = _ref3.searchWords, textToHighlight = _ref3.textToHighlight;
            textToHighlight = sanitize(textToHighlight);
            return searchWords.filter(function(searchWord) {
              return searchWord;
            }).reduce(function(chunks, searchWord) {
              searchWord = sanitize(searchWord);
              if (autoEscape) {
                searchWord = escapeRegExpFn(searchWord);
              }
              var regex = new RegExp(searchWord, caseSensitive ? "g" : "gi");
              var match = void 0;
              while (match = regex.exec(textToHighlight)) {
                var start2 = match.index;
                var end2 = regex.lastIndex;
                if (end2 > start2) {
                  chunks.push({ start: start2, end: end2 });
                }
                if (match.index == regex.lastIndex) {
                  regex.lastIndex++;
                }
              }
              return chunks;
            }, []);
          };
          exports2.findChunks = defaultFindChunks;
          var fillInChunks = exports2.fillInChunks = function fillInChunks2(_ref4) {
            var chunksToHighlight = _ref4.chunksToHighlight, totalLength = _ref4.totalLength;
            var allChunks = [];
            var append = function append2(start2, end2, highlight) {
              if (end2 - start2 > 0) {
                allChunks.push({
                  start: start2,
                  end: end2,
                  highlight
                });
              }
            };
            if (chunksToHighlight.length === 0) {
              append(0, totalLength, false);
            } else {
              var lastIndex = 0;
              chunksToHighlight.forEach(function(chunk) {
                append(lastIndex, chunk.start, false);
                append(chunk.start, chunk.end, true);
                lastIndex = chunk.end;
              });
              append(lastIndex, totalLength, false);
            }
            return allChunks;
          };
          function identity2(value) {
            return value;
          }
          function escapeRegExpFn(str) {
            return str.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, "\\$&");
          }
        }
      ]);
    },
    function(module2, exports, __webpack_require__) {
      (function(process2) {
        {
          module2.exports = __webpack_require__(13)();
        }
      }).call(exports, __webpack_require__(5));
    },
    function(module2, exports) {
      var process2 = module2.exports = {};
      var cachedSetTimeout;
      var cachedClearTimeout;
      function defaultSetTimout() {
        throw new Error("setTimeout has not been defined");
      }
      function defaultClearTimeout() {
        throw new Error("clearTimeout has not been defined");
      }
      (function() {
        try {
          if (typeof setTimeout === "function") {
            cachedSetTimeout = setTimeout;
          } else {
            cachedSetTimeout = defaultSetTimout;
          }
        } catch (e2) {
          cachedSetTimeout = defaultSetTimout;
        }
        try {
          if (typeof clearTimeout === "function") {
            cachedClearTimeout = clearTimeout;
          } else {
            cachedClearTimeout = defaultClearTimeout;
          }
        } catch (e2) {
          cachedClearTimeout = defaultClearTimeout;
        }
      })();
      function runTimeout(fun) {
        if (cachedSetTimeout === setTimeout) {
          return setTimeout(fun, 0);
        }
        if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
          cachedSetTimeout = setTimeout;
          return setTimeout(fun, 0);
        }
        try {
          return cachedSetTimeout(fun, 0);
        } catch (e2) {
          try {
            return cachedSetTimeout.call(null, fun, 0);
          } catch (e3) {
            return cachedSetTimeout.call(this, fun, 0);
          }
        }
      }
      function runClearTimeout(marker) {
        if (cachedClearTimeout === clearTimeout) {
          return clearTimeout(marker);
        }
        if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
          cachedClearTimeout = clearTimeout;
          return clearTimeout(marker);
        }
        try {
          return cachedClearTimeout(marker);
        } catch (e2) {
          try {
            return cachedClearTimeout.call(null, marker);
          } catch (e3) {
            return cachedClearTimeout.call(this, marker);
          }
        }
      }
      var queue = [];
      var draining = false;
      var currentQueue;
      var queueIndex = -1;
      function cleanUpNextTick() {
        if (!draining || !currentQueue) {
          return;
        }
        draining = false;
        if (currentQueue.length) {
          queue = currentQueue.concat(queue);
        } else {
          queueIndex = -1;
        }
        if (queue.length) {
          drainQueue();
        }
      }
      function drainQueue() {
        if (draining) {
          return;
        }
        var timeout = runTimeout(cleanUpNextTick);
        draining = true;
        var len = queue.length;
        while (len) {
          currentQueue = queue;
          queue = [];
          while (++queueIndex < len) {
            if (currentQueue) {
              currentQueue[queueIndex].run();
            }
          }
          queueIndex = -1;
          len = queue.length;
        }
        currentQueue = null;
        draining = false;
        runClearTimeout(timeout);
      }
      process2.nextTick = function(fun) {
        var args = new Array(arguments.length - 1);
        if (arguments.length > 1) {
          for (var i = 1; i < arguments.length; i++) {
            args[i - 1] = arguments[i];
          }
        }
        queue.push(new Item(fun, args));
        if (queue.length === 1 && !draining) {
          runTimeout(drainQueue);
        }
      };
      function Item(fun, array) {
        this.fun = fun;
        this.array = array;
      }
      Item.prototype.run = function() {
        this.fun.apply(null, this.array);
      };
      process2.title = "browser";
      process2.browser = true;
      process2.env = {};
      process2.argv = [];
      process2.version = "";
      process2.versions = {};
      function noop2() {
      }
      process2.on = noop2;
      process2.addListener = noop2;
      process2.once = noop2;
      process2.off = noop2;
      process2.removeListener = noop2;
      process2.removeAllListeners = noop2;
      process2.emit = noop2;
      process2.prependListener = noop2;
      process2.prependOnceListener = noop2;
      process2.listeners = function(name) {
        return [];
      };
      process2.binding = function(name) {
        throw new Error("process.binding is not supported");
      };
      process2.cwd = function() {
        return "/";
      };
      process2.chdir = function(dir) {
        throw new Error("process.chdir is not supported");
      };
      process2.umask = function() {
        return 0;
      };
    },
    function(module2, exports, __webpack_require__) {
      (function(process2) {
        var emptyFunction = __webpack_require__(7);
        var invariant2 = __webpack_require__(8);
        var warning = __webpack_require__(9);
        var assign = __webpack_require__(10);
        var ReactPropTypesSecret = __webpack_require__(11);
        var checkPropTypes = __webpack_require__(12);
        module2.exports = function(isValidElement, throwOnDirectAccess) {
          var ITERATOR_SYMBOL = typeof Symbol === "function" && Symbol.iterator;
          var FAUX_ITERATOR_SYMBOL = "@@iterator";
          function getIteratorFn(maybeIterable) {
            var iteratorFn = maybeIterable && (ITERATOR_SYMBOL && maybeIterable[ITERATOR_SYMBOL] || maybeIterable[FAUX_ITERATOR_SYMBOL]);
            if (typeof iteratorFn === "function") {
              return iteratorFn;
            }
          }
          var ANONYMOUS = "<<anonymous>>";
          var ReactPropTypes = {
            array: createPrimitiveTypeChecker("array"),
            bool: createPrimitiveTypeChecker("boolean"),
            func: createPrimitiveTypeChecker("function"),
            number: createPrimitiveTypeChecker("number"),
            object: createPrimitiveTypeChecker("object"),
            string: createPrimitiveTypeChecker("string"),
            symbol: createPrimitiveTypeChecker("symbol"),
            any: createAnyTypeChecker(),
            arrayOf: createArrayOfTypeChecker,
            element: createElementTypeChecker(),
            instanceOf: createInstanceTypeChecker,
            node: createNodeChecker(),
            objectOf: createObjectOfTypeChecker,
            oneOf: createEnumTypeChecker,
            oneOfType: createUnionTypeChecker,
            shape: createShapeTypeChecker,
            exact: createStrictShapeTypeChecker
          };
          function is(x, y2) {
            if (x === y2) {
              return x !== 0 || 1 / x === 1 / y2;
            } else {
              return x !== x && y2 !== y2;
            }
          }
          function PropTypeError(message) {
            this.message = message;
            this.stack = "";
          }
          PropTypeError.prototype = Error.prototype;
          function createChainableTypeChecker(validate) {
            function checkType(isRequired, props, propName, componentName, location, propFullName, secret) {
              componentName = componentName || ANONYMOUS;
              propFullName = propFullName || propName;
              if (secret !== ReactPropTypesSecret) {
                if (throwOnDirectAccess) {
                  invariant2(false, "Calling PropTypes validators directly is not supported by the `prop-types` package. Use `PropTypes.checkPropTypes()` to call them. Read more at http://fb.me/use-check-prop-types");
                }
              }
              if (props[propName] == null) {
                if (isRequired) {
                  if (props[propName] === null) {
                    return new PropTypeError("The " + location + " `" + propFullName + "` is marked as required " + ("in `" + componentName + "`, but its value is `null`."));
                  }
                  return new PropTypeError("The " + location + " `" + propFullName + "` is marked as required in " + ("`" + componentName + "`, but its value is `undefined`."));
                }
                return null;
              } else {
                return validate(props, propName, componentName, location, propFullName);
              }
            }
            var chainedCheckType = checkType.bind(null, false);
            chainedCheckType.isRequired = checkType.bind(null, true);
            return chainedCheckType;
          }
          function createPrimitiveTypeChecker(expectedType) {
            function validate(props, propName, componentName, location, propFullName, secret) {
              var propValue = props[propName];
              var propType = getPropType(propValue);
              if (propType !== expectedType) {
                var preciseType = getPreciseType(propValue);
                return new PropTypeError("Invalid " + location + " `" + propFullName + "` of type " + ("`" + preciseType + "` supplied to `" + componentName + "`, expected ") + ("`" + expectedType + "`."));
              }
              return null;
            }
            return createChainableTypeChecker(validate);
          }
          function createAnyTypeChecker() {
            return createChainableTypeChecker(emptyFunction.thatReturnsNull);
          }
          function createArrayOfTypeChecker(typeChecker) {
            function validate(props, propName, componentName, location, propFullName) {
              if (typeof typeChecker !== "function") {
                return new PropTypeError("Property `" + propFullName + "` of component `" + componentName + "` has invalid PropType notation inside arrayOf.");
              }
              var propValue = props[propName];
              if (!Array.isArray(propValue)) {
                var propType = getPropType(propValue);
                return new PropTypeError("Invalid " + location + " `" + propFullName + "` of type " + ("`" + propType + "` supplied to `" + componentName + "`, expected an array."));
              }
              for (var i = 0; i < propValue.length; i++) {
                var error = typeChecker(propValue, i, componentName, location, propFullName + "[" + i + "]", ReactPropTypesSecret);
                if (error instanceof Error) {
                  return error;
                }
              }
              return null;
            }
            return createChainableTypeChecker(validate);
          }
          function createElementTypeChecker() {
            function validate(props, propName, componentName, location, propFullName) {
              var propValue = props[propName];
              if (!isValidElement(propValue)) {
                var propType = getPropType(propValue);
                return new PropTypeError("Invalid " + location + " `" + propFullName + "` of type " + ("`" + propType + "` supplied to `" + componentName + "`, expected a single ReactElement."));
              }
              return null;
            }
            return createChainableTypeChecker(validate);
          }
          function createInstanceTypeChecker(expectedClass) {
            function validate(props, propName, componentName, location, propFullName) {
              if (!(props[propName] instanceof expectedClass)) {
                var expectedClassName = expectedClass.name || ANONYMOUS;
                var actualClassName = getClassName(props[propName]);
                return new PropTypeError("Invalid " + location + " `" + propFullName + "` of type " + ("`" + actualClassName + "` supplied to `" + componentName + "`, expected ") + ("instance of `" + expectedClassName + "`."));
              }
              return null;
            }
            return createChainableTypeChecker(validate);
          }
          function createEnumTypeChecker(expectedValues) {
            if (!Array.isArray(expectedValues)) {
              return emptyFunction.thatReturnsNull;
            }
            function validate(props, propName, componentName, location, propFullName) {
              var propValue = props[propName];
              for (var i = 0; i < expectedValues.length; i++) {
                if (is(propValue, expectedValues[i])) {
                  return null;
                }
              }
              var valuesString = JSON.stringify(expectedValues);
              return new PropTypeError("Invalid " + location + " `" + propFullName + "` of value `" + propValue + "` " + ("supplied to `" + componentName + "`, expected one of " + valuesString + "."));
            }
            return createChainableTypeChecker(validate);
          }
          function createObjectOfTypeChecker(typeChecker) {
            function validate(props, propName, componentName, location, propFullName) {
              if (typeof typeChecker !== "function") {
                return new PropTypeError("Property `" + propFullName + "` of component `" + componentName + "` has invalid PropType notation inside objectOf.");
              }
              var propValue = props[propName];
              var propType = getPropType(propValue);
              if (propType !== "object") {
                return new PropTypeError("Invalid " + location + " `" + propFullName + "` of type " + ("`" + propType + "` supplied to `" + componentName + "`, expected an object."));
              }
              for (var key in propValue) {
                if (propValue.hasOwnProperty(key)) {
                  var error = typeChecker(propValue, key, componentName, location, propFullName + "." + key, ReactPropTypesSecret);
                  if (error instanceof Error) {
                    return error;
                  }
                }
              }
              return null;
            }
            return createChainableTypeChecker(validate);
          }
          function createUnionTypeChecker(arrayOfTypeCheckers) {
            if (!Array.isArray(arrayOfTypeCheckers)) {
              return emptyFunction.thatReturnsNull;
            }
            for (var i = 0; i < arrayOfTypeCheckers.length; i++) {
              var checker = arrayOfTypeCheckers[i];
              if (typeof checker !== "function") {
                warning(false, "Invalid argument supplied to oneOfType. Expected an array of check functions, but received %s at index %s.", getPostfixForTypeWarning(checker), i);
                return emptyFunction.thatReturnsNull;
              }
            }
            function validate(props, propName, componentName, location, propFullName) {
              for (var i2 = 0; i2 < arrayOfTypeCheckers.length; i2++) {
                var checker2 = arrayOfTypeCheckers[i2];
                if (checker2(props, propName, componentName, location, propFullName, ReactPropTypesSecret) == null) {
                  return null;
                }
              }
              return new PropTypeError("Invalid " + location + " `" + propFullName + "` supplied to " + ("`" + componentName + "`."));
            }
            return createChainableTypeChecker(validate);
          }
          function createNodeChecker() {
            function validate(props, propName, componentName, location, propFullName) {
              if (!isNode(props[propName])) {
                return new PropTypeError("Invalid " + location + " `" + propFullName + "` supplied to " + ("`" + componentName + "`, expected a ReactNode."));
              }
              return null;
            }
            return createChainableTypeChecker(validate);
          }
          function createShapeTypeChecker(shapeTypes) {
            function validate(props, propName, componentName, location, propFullName) {
              var propValue = props[propName];
              var propType = getPropType(propValue);
              if (propType !== "object") {
                return new PropTypeError("Invalid " + location + " `" + propFullName + "` of type `" + propType + "` " + ("supplied to `" + componentName + "`, expected `object`."));
              }
              for (var key in shapeTypes) {
                var checker = shapeTypes[key];
                if (!checker) {
                  continue;
                }
                var error = checker(propValue, key, componentName, location, propFullName + "." + key, ReactPropTypesSecret);
                if (error) {
                  return error;
                }
              }
              return null;
            }
            return createChainableTypeChecker(validate);
          }
          function createStrictShapeTypeChecker(shapeTypes) {
            function validate(props, propName, componentName, location, propFullName) {
              var propValue = props[propName];
              var propType = getPropType(propValue);
              if (propType !== "object") {
                return new PropTypeError("Invalid " + location + " `" + propFullName + "` of type `" + propType + "` " + ("supplied to `" + componentName + "`, expected `object`."));
              }
              var allKeys = assign({}, props[propName], shapeTypes);
              for (var key in allKeys) {
                var checker = shapeTypes[key];
                if (!checker) {
                  return new PropTypeError("Invalid " + location + " `" + propFullName + "` key `" + key + "` supplied to `" + componentName + "`.\nBad object: " + JSON.stringify(props[propName], null, "  ") + "\nValid keys: " + JSON.stringify(Object.keys(shapeTypes), null, "  "));
                }
                var error = checker(propValue, key, componentName, location, propFullName + "." + key, ReactPropTypesSecret);
                if (error) {
                  return error;
                }
              }
              return null;
            }
            return createChainableTypeChecker(validate);
          }
          function isNode(propValue) {
            switch (typeof propValue) {
              case "number":
              case "string":
              case "undefined":
                return true;
              case "boolean":
                return !propValue;
              case "object":
                if (Array.isArray(propValue)) {
                  return propValue.every(isNode);
                }
                if (propValue === null || isValidElement(propValue)) {
                  return true;
                }
                var iteratorFn = getIteratorFn(propValue);
                if (iteratorFn) {
                  var iterator2 = iteratorFn.call(propValue);
                  var step;
                  if (iteratorFn !== propValue.entries) {
                    while (!(step = iterator2.next()).done) {
                      if (!isNode(step.value)) {
                        return false;
                      }
                    }
                  } else {
                    while (!(step = iterator2.next()).done) {
                      var entry = step.value;
                      if (entry) {
                        if (!isNode(entry[1])) {
                          return false;
                        }
                      }
                    }
                  }
                } else {
                  return false;
                }
                return true;
              default:
                return false;
            }
          }
          function isSymbol(propType, propValue) {
            if (propType === "symbol") {
              return true;
            }
            if (propValue["@@toStringTag"] === "Symbol") {
              return true;
            }
            if (typeof Symbol === "function" && propValue instanceof Symbol) {
              return true;
            }
            return false;
          }
          function getPropType(propValue) {
            var propType = typeof propValue;
            if (Array.isArray(propValue)) {
              return "array";
            }
            if (propValue instanceof RegExp) {
              return "object";
            }
            if (isSymbol(propType, propValue)) {
              return "symbol";
            }
            return propType;
          }
          function getPreciseType(propValue) {
            if (typeof propValue === "undefined" || propValue === null) {
              return "" + propValue;
            }
            var propType = getPropType(propValue);
            if (propType === "object") {
              if (propValue instanceof Date) {
                return "date";
              } else if (propValue instanceof RegExp) {
                return "regexp";
              }
            }
            return propType;
          }
          function getPostfixForTypeWarning(value) {
            var type = getPreciseType(value);
            switch (type) {
              case "array":
              case "object":
                return "an " + type;
              case "boolean":
              case "date":
              case "regexp":
                return "a " + type;
              default:
                return type;
            }
          }
          function getClassName(propValue) {
            if (!propValue.constructor || !propValue.constructor.name) {
              return ANONYMOUS;
            }
            return propValue.constructor.name;
          }
          ReactPropTypes.checkPropTypes = checkPropTypes;
          ReactPropTypes.PropTypes = ReactPropTypes;
          return ReactPropTypes;
        };
      }).call(exports, __webpack_require__(5));
    },
    function(module2, exports) {
      function makeEmptyFunction(arg) {
        return function() {
          return arg;
        };
      }
      var emptyFunction = function emptyFunction2() {
      };
      emptyFunction.thatReturns = makeEmptyFunction;
      emptyFunction.thatReturnsFalse = makeEmptyFunction(false);
      emptyFunction.thatReturnsTrue = makeEmptyFunction(true);
      emptyFunction.thatReturnsNull = makeEmptyFunction(null);
      emptyFunction.thatReturnsThis = function() {
        return this;
      };
      emptyFunction.thatReturnsArgument = function(arg) {
        return arg;
      };
      module2.exports = emptyFunction;
    },
    function(module2, exports, __webpack_require__) {
      (function(process2) {
        function invariant2(condition, format, a, b2, c2, d2, e2, f2) {
          if (!condition) {
            var error;
            if (format === void 0) {
              error = new Error("Minified exception occurred; use the non-minified dev environment for the full error message and additional helpful warnings.");
            } else {
              var args = [a, b2, c2, d2, e2, f2];
              var argIndex = 0;
              error = new Error(format.replace(/%s/g, function() {
                return args[argIndex++];
              }));
              error.name = "Invariant Violation";
            }
            error.framesToPop = 1;
            throw error;
          }
        }
        module2.exports = invariant2;
      }).call(exports, __webpack_require__(5));
    },
    function(module2, exports, __webpack_require__) {
      (function(process2) {
        var emptyFunction = __webpack_require__(7);
        var warning = emptyFunction;
        module2.exports = warning;
      }).call(exports, __webpack_require__(5));
    },
    function(module2, exports) {
      var getOwnPropertySymbols = Object.getOwnPropertySymbols;
      var hasOwnProperty2 = Object.prototype.hasOwnProperty;
      var propIsEnumerable = Object.prototype.propertyIsEnumerable;
      function toObject(val) {
        if (val === null || val === void 0) {
          throw new TypeError("Object.assign cannot be called with null or undefined");
        }
        return Object(val);
      }
      function shouldUseNative() {
        try {
          if (!Object.assign) {
            return false;
          }
          var test1 = new String("abc");
          test1[5] = "de";
          if (Object.getOwnPropertyNames(test1)[0] === "5") {
            return false;
          }
          var test2 = {};
          for (var i = 0; i < 10; i++) {
            test2["_" + String.fromCharCode(i)] = i;
          }
          var order2 = Object.getOwnPropertyNames(test2).map(function(n2) {
            return test2[n2];
          });
          if (order2.join("") !== "0123456789") {
            return false;
          }
          var test3 = {};
          "abcdefghijklmnopqrst".split("").forEach(function(letter) {
            test3[letter] = letter;
          });
          if (Object.keys(Object.assign({}, test3)).join("") !== "abcdefghijklmnopqrst") {
            return false;
          }
          return true;
        } catch (err) {
          return false;
        }
      }
      module2.exports = shouldUseNative() ? Object.assign : function(target, source) {
        var from2;
        var to = toObject(target);
        var symbols;
        for (var s = 1; s < arguments.length; s++) {
          from2 = Object(arguments[s]);
          for (var key in from2) {
            if (hasOwnProperty2.call(from2, key)) {
              to[key] = from2[key];
            }
          }
          if (getOwnPropertySymbols) {
            symbols = getOwnPropertySymbols(from2);
            for (var i = 0; i < symbols.length; i++) {
              if (propIsEnumerable.call(from2, symbols[i])) {
                to[symbols[i]] = from2[symbols[i]];
              }
            }
          }
        }
        return to;
      };
    },
    function(module2, exports) {
      var ReactPropTypesSecret = "SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED";
      module2.exports = ReactPropTypesSecret;
    },
    function(module2, exports, __webpack_require__) {
      (function(process2) {
        function checkPropTypes(typeSpecs, values2, location, componentName, getStack) {
        }
        module2.exports = checkPropTypes;
      }).call(exports, __webpack_require__(5));
    },
    function(module2, exports, __webpack_require__) {
      var emptyFunction = __webpack_require__(7);
      var invariant2 = __webpack_require__(8);
      var ReactPropTypesSecret = __webpack_require__(11);
      module2.exports = function() {
        function shim(props, propName, componentName, location, propFullName, secret) {
          if (secret === ReactPropTypesSecret) {
            return;
          }
          invariant2(false, "Calling PropTypes validators directly is not supported by the `prop-types` package. Use PropTypes.checkPropTypes() to call them. Read more at http://fb.me/use-check-prop-types");
        }
        shim.isRequired = shim;
        function getShim() {
          return shim;
        }
        var ReactPropTypes = {
          array: shim,
          bool: shim,
          func: shim,
          number: shim,
          object: shim,
          string: shim,
          symbol: shim,
          any: shim,
          arrayOf: getShim,
          element: shim,
          instanceOf: getShim,
          node: shim,
          objectOf: getShim,
          oneOf: getShim,
          oneOfType: getShim,
          shape: getShim,
          exact: getShim
        };
        ReactPropTypes.checkPropTypes = emptyFunction;
        ReactPropTypes.PropTypes = ReactPropTypes;
        return ReactPropTypes;
      };
    },
    function(module2, exports) {
      module2.exports = react.exports;
    },
    function(module2, exports) {
      var simpleIsEqual = function simpleIsEqual2(a, b2) {
        return a === b2;
      };
      function index2(resultFn) {
        var isEqual = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : simpleIsEqual;
        var lastThis = void 0;
        var lastArgs = [];
        var lastResult = void 0;
        var calledOnce = false;
        var isNewArgEqualToLast = function isNewArgEqualToLast2(newArg, index3) {
          return isEqual(newArg, lastArgs[index3]);
        };
        var result = function result2() {
          for (var _len = arguments.length, newArgs = Array(_len), _key = 0; _key < _len; _key++) {
            newArgs[_key] = arguments[_key];
          }
          if (calledOnce && lastThis === this && newArgs.length === lastArgs.length && newArgs.every(isNewArgEqualToLast)) {
            return lastResult;
          }
          calledOnce = true;
          lastThis = this;
          lastArgs = newArgs;
          lastResult = resultFn.apply(this, newArgs);
          return lastResult;
        };
        return result;
      }
      module2.exports = index2;
    }
  ]);
})(main);
var Highlighter = /* @__PURE__ */ getDefaultExportFromCjs(main.exports);
var lunr$1 = { exports: {} };
/**
 * lunr - http://lunrjs.com - A bit like Solr, but much smaller and not as bright - 2.3.9
 * Copyright (C) 2020 Oliver Nightingale
 * @license MIT
 */
(function(module, exports) {
  (function() {
    var lunr2 = function(config2) {
      var builder = new lunr2.Builder();
      builder.pipeline.add(lunr2.trimmer, lunr2.stopWordFilter, lunr2.stemmer);
      builder.searchPipeline.add(lunr2.stemmer);
      config2.call(builder, builder);
      return builder.build();
    };
    lunr2.version = "2.3.9";
    /*!
     * lunr.utils
     * Copyright (C) 2020 Oliver Nightingale
     */
    lunr2.utils = {};
    lunr2.utils.warn = function(global) {
      return function(message) {
        if (global.console && console.warn) {
          console.warn(message);
        }
      };
    }(this);
    lunr2.utils.asString = function(obj) {
      if (obj === void 0 || obj === null) {
        return "";
      } else {
        return obj.toString();
      }
    };
    lunr2.utils.clone = function(obj) {
      if (obj === null || obj === void 0) {
        return obj;
      }
      var clone = Object.create(null), keys = Object.keys(obj);
      for (var i = 0; i < keys.length; i++) {
        var key = keys[i], val = obj[key];
        if (Array.isArray(val)) {
          clone[key] = val.slice();
          continue;
        }
        if (typeof val === "string" || typeof val === "number" || typeof val === "boolean") {
          clone[key] = val;
          continue;
        }
        throw new TypeError("clone is not deep and does not support nested objects");
      }
      return clone;
    };
    lunr2.FieldRef = function(docRef, fieldName, stringValue) {
      this.docRef = docRef;
      this.fieldName = fieldName;
      this._stringValue = stringValue;
    };
    lunr2.FieldRef.joiner = "/";
    lunr2.FieldRef.fromString = function(s) {
      var n2 = s.indexOf(lunr2.FieldRef.joiner);
      if (n2 === -1) {
        throw "malformed field ref string";
      }
      var fieldRef = s.slice(0, n2), docRef = s.slice(n2 + 1);
      return new lunr2.FieldRef(docRef, fieldRef, s);
    };
    lunr2.FieldRef.prototype.toString = function() {
      if (this._stringValue == void 0) {
        this._stringValue = this.fieldName + lunr2.FieldRef.joiner + this.docRef;
      }
      return this._stringValue;
    };
    /*!
     * lunr.Set
     * Copyright (C) 2020 Oliver Nightingale
     */
    lunr2.Set = function(elements) {
      this.elements = Object.create(null);
      if (elements) {
        this.length = elements.length;
        for (var i = 0; i < this.length; i++) {
          this.elements[elements[i]] = true;
        }
      } else {
        this.length = 0;
      }
    };
    lunr2.Set.complete = {
      intersect: function(other) {
        return other;
      },
      union: function() {
        return this;
      },
      contains: function() {
        return true;
      }
    };
    lunr2.Set.empty = {
      intersect: function() {
        return this;
      },
      union: function(other) {
        return other;
      },
      contains: function() {
        return false;
      }
    };
    lunr2.Set.prototype.contains = function(object) {
      return !!this.elements[object];
    };
    lunr2.Set.prototype.intersect = function(other) {
      var a, b2, elements, intersection = [];
      if (other === lunr2.Set.complete) {
        return this;
      }
      if (other === lunr2.Set.empty) {
        return other;
      }
      if (this.length < other.length) {
        a = this;
        b2 = other;
      } else {
        a = other;
        b2 = this;
      }
      elements = Object.keys(a.elements);
      for (var i = 0; i < elements.length; i++) {
        var element = elements[i];
        if (element in b2.elements) {
          intersection.push(element);
        }
      }
      return new lunr2.Set(intersection);
    };
    lunr2.Set.prototype.union = function(other) {
      if (other === lunr2.Set.complete) {
        return lunr2.Set.complete;
      }
      if (other === lunr2.Set.empty) {
        return this;
      }
      return new lunr2.Set(Object.keys(this.elements).concat(Object.keys(other.elements)));
    };
    lunr2.idf = function(posting, documentCount) {
      var documentsWithTerm = 0;
      for (var fieldName in posting) {
        if (fieldName == "_index")
          continue;
        documentsWithTerm += Object.keys(posting[fieldName]).length;
      }
      var x = (documentCount - documentsWithTerm + 0.5) / (documentsWithTerm + 0.5);
      return Math.log(1 + Math.abs(x));
    };
    lunr2.Token = function(str, metadata) {
      this.str = str || "";
      this.metadata = metadata || {};
    };
    lunr2.Token.prototype.toString = function() {
      return this.str;
    };
    lunr2.Token.prototype.update = function(fn2) {
      this.str = fn2(this.str, this.metadata);
      return this;
    };
    lunr2.Token.prototype.clone = function(fn2) {
      fn2 = fn2 || function(s) {
        return s;
      };
      return new lunr2.Token(fn2(this.str, this.metadata), this.metadata);
    };
    /*!
     * lunr.tokenizer
     * Copyright (C) 2020 Oliver Nightingale
     */
    lunr2.tokenizer = function(obj, metadata) {
      if (obj == null || obj == void 0) {
        return [];
      }
      if (Array.isArray(obj)) {
        return obj.map(function(t2) {
          return new lunr2.Token(lunr2.utils.asString(t2).toLowerCase(), lunr2.utils.clone(metadata));
        });
      }
      var str = obj.toString().toLowerCase(), len = str.length, tokens = [];
      for (var sliceEnd = 0, sliceStart = 0; sliceEnd <= len; sliceEnd++) {
        var char = str.charAt(sliceEnd), sliceLength = sliceEnd - sliceStart;
        if (char.match(lunr2.tokenizer.separator) || sliceEnd == len) {
          if (sliceLength > 0) {
            var tokenMetadata = lunr2.utils.clone(metadata) || {};
            tokenMetadata["position"] = [sliceStart, sliceLength];
            tokenMetadata["index"] = tokens.length;
            tokens.push(new lunr2.Token(str.slice(sliceStart, sliceEnd), tokenMetadata));
          }
          sliceStart = sliceEnd + 1;
        }
      }
      return tokens;
    };
    lunr2.tokenizer.separator = /[\s\-]+/;
    /*!
     * lunr.Pipeline
     * Copyright (C) 2020 Oliver Nightingale
     */
    lunr2.Pipeline = function() {
      this._stack = [];
    };
    lunr2.Pipeline.registeredFunctions = Object.create(null);
    lunr2.Pipeline.registerFunction = function(fn2, label) {
      if (label in this.registeredFunctions) {
        lunr2.utils.warn("Overwriting existing registered function: " + label);
      }
      fn2.label = label;
      lunr2.Pipeline.registeredFunctions[fn2.label] = fn2;
    };
    lunr2.Pipeline.warnIfFunctionNotRegistered = function(fn2) {
      var isRegistered = fn2.label && fn2.label in this.registeredFunctions;
      if (!isRegistered) {
        lunr2.utils.warn("Function is not registered with pipeline. This may cause problems when serialising the index.\n", fn2);
      }
    };
    lunr2.Pipeline.load = function(serialised) {
      var pipeline = new lunr2.Pipeline();
      serialised.forEach(function(fnName) {
        var fn2 = lunr2.Pipeline.registeredFunctions[fnName];
        if (fn2) {
          pipeline.add(fn2);
        } else {
          throw new Error("Cannot load unregistered function: " + fnName);
        }
      });
      return pipeline;
    };
    lunr2.Pipeline.prototype.add = function() {
      var fns = Array.prototype.slice.call(arguments);
      fns.forEach(function(fn2) {
        lunr2.Pipeline.warnIfFunctionNotRegistered(fn2);
        this._stack.push(fn2);
      }, this);
    };
    lunr2.Pipeline.prototype.after = function(existingFn, newFn) {
      lunr2.Pipeline.warnIfFunctionNotRegistered(newFn);
      var pos = this._stack.indexOf(existingFn);
      if (pos == -1) {
        throw new Error("Cannot find existingFn");
      }
      pos = pos + 1;
      this._stack.splice(pos, 0, newFn);
    };
    lunr2.Pipeline.prototype.before = function(existingFn, newFn) {
      lunr2.Pipeline.warnIfFunctionNotRegistered(newFn);
      var pos = this._stack.indexOf(existingFn);
      if (pos == -1) {
        throw new Error("Cannot find existingFn");
      }
      this._stack.splice(pos, 0, newFn);
    };
    lunr2.Pipeline.prototype.remove = function(fn2) {
      var pos = this._stack.indexOf(fn2);
      if (pos == -1) {
        return;
      }
      this._stack.splice(pos, 1);
    };
    lunr2.Pipeline.prototype.run = function(tokens) {
      var stackLength = this._stack.length;
      for (var i = 0; i < stackLength; i++) {
        var fn2 = this._stack[i];
        var memo = [];
        for (var j = 0; j < tokens.length; j++) {
          var result = fn2(tokens[j], j, tokens);
          if (result === null || result === void 0 || result === "")
            continue;
          if (Array.isArray(result)) {
            for (var k2 = 0; k2 < result.length; k2++) {
              memo.push(result[k2]);
            }
          } else {
            memo.push(result);
          }
        }
        tokens = memo;
      }
      return tokens;
    };
    lunr2.Pipeline.prototype.runString = function(str, metadata) {
      var token = new lunr2.Token(str, metadata);
      return this.run([token]).map(function(t2) {
        return t2.toString();
      });
    };
    lunr2.Pipeline.prototype.reset = function() {
      this._stack = [];
    };
    lunr2.Pipeline.prototype.toJSON = function() {
      return this._stack.map(function(fn2) {
        lunr2.Pipeline.warnIfFunctionNotRegistered(fn2);
        return fn2.label;
      });
    };
    /*!
     * lunr.Vector
     * Copyright (C) 2020 Oliver Nightingale
     */
    lunr2.Vector = function(elements) {
      this._magnitude = 0;
      this.elements = elements || [];
    };
    lunr2.Vector.prototype.positionForIndex = function(index2) {
      if (this.elements.length == 0) {
        return 0;
      }
      var start2 = 0, end2 = this.elements.length / 2, sliceLength = end2 - start2, pivotPoint = Math.floor(sliceLength / 2), pivotIndex = this.elements[pivotPoint * 2];
      while (sliceLength > 1) {
        if (pivotIndex < index2) {
          start2 = pivotPoint;
        }
        if (pivotIndex > index2) {
          end2 = pivotPoint;
        }
        if (pivotIndex == index2) {
          break;
        }
        sliceLength = end2 - start2;
        pivotPoint = start2 + Math.floor(sliceLength / 2);
        pivotIndex = this.elements[pivotPoint * 2];
      }
      if (pivotIndex == index2) {
        return pivotPoint * 2;
      }
      if (pivotIndex > index2) {
        return pivotPoint * 2;
      }
      if (pivotIndex < index2) {
        return (pivotPoint + 1) * 2;
      }
    };
    lunr2.Vector.prototype.insert = function(insertIdx, val) {
      this.upsert(insertIdx, val, function() {
        throw "duplicate index";
      });
    };
    lunr2.Vector.prototype.upsert = function(insertIdx, val, fn2) {
      this._magnitude = 0;
      var position = this.positionForIndex(insertIdx);
      if (this.elements[position] == insertIdx) {
        this.elements[position + 1] = fn2(this.elements[position + 1], val);
      } else {
        this.elements.splice(position, 0, insertIdx, val);
      }
    };
    lunr2.Vector.prototype.magnitude = function() {
      if (this._magnitude)
        return this._magnitude;
      var sumOfSquares = 0, elementsLength = this.elements.length;
      for (var i = 1; i < elementsLength; i += 2) {
        var val = this.elements[i];
        sumOfSquares += val * val;
      }
      return this._magnitude = Math.sqrt(sumOfSquares);
    };
    lunr2.Vector.prototype.dot = function(otherVector) {
      var dotProduct = 0, a = this.elements, b2 = otherVector.elements, aLen = a.length, bLen = b2.length, aVal = 0, bVal = 0, i = 0, j = 0;
      while (i < aLen && j < bLen) {
        aVal = a[i], bVal = b2[j];
        if (aVal < bVal) {
          i += 2;
        } else if (aVal > bVal) {
          j += 2;
        } else if (aVal == bVal) {
          dotProduct += a[i + 1] * b2[j + 1];
          i += 2;
          j += 2;
        }
      }
      return dotProduct;
    };
    lunr2.Vector.prototype.similarity = function(otherVector) {
      return this.dot(otherVector) / this.magnitude() || 0;
    };
    lunr2.Vector.prototype.toArray = function() {
      var output = new Array(this.elements.length / 2);
      for (var i = 1, j = 0; i < this.elements.length; i += 2, j++) {
        output[j] = this.elements[i];
      }
      return output;
    };
    lunr2.Vector.prototype.toJSON = function() {
      return this.elements;
    };
    /*!
     * lunr.stemmer
     * Copyright (C) 2020 Oliver Nightingale
     * Includes code from - http://tartarus.org/~martin/PorterStemmer/js.txt
     */
    lunr2.stemmer = function() {
      var step2list = {
        "ational": "ate",
        "tional": "tion",
        "enci": "ence",
        "anci": "ance",
        "izer": "ize",
        "bli": "ble",
        "alli": "al",
        "entli": "ent",
        "eli": "e",
        "ousli": "ous",
        "ization": "ize",
        "ation": "ate",
        "ator": "ate",
        "alism": "al",
        "iveness": "ive",
        "fulness": "ful",
        "ousness": "ous",
        "aliti": "al",
        "iviti": "ive",
        "biliti": "ble",
        "logi": "log"
      }, step3list = {
        "icate": "ic",
        "ative": "",
        "alize": "al",
        "iciti": "ic",
        "ical": "ic",
        "ful": "",
        "ness": ""
      }, c2 = "[^aeiou]", v2 = "[aeiouy]", C2 = c2 + "[^aeiouy]*", V = v2 + "[aeiou]*", mgr0 = "^(" + C2 + ")?" + V + C2, meq1 = "^(" + C2 + ")?" + V + C2 + "(" + V + ")?$", mgr1 = "^(" + C2 + ")?" + V + C2 + V + C2, s_v = "^(" + C2 + ")?" + v2;
      var re_mgr0 = new RegExp(mgr0);
      var re_mgr1 = new RegExp(mgr1);
      var re_meq1 = new RegExp(meq1);
      var re_s_v = new RegExp(s_v);
      var re_1a = /^(.+?)(ss|i)es$/;
      var re2_1a = /^(.+?)([^s])s$/;
      var re_1b = /^(.+?)eed$/;
      var re2_1b = /^(.+?)(ed|ing)$/;
      var re_1b_2 = /.$/;
      var re2_1b_2 = /(at|bl|iz)$/;
      var re3_1b_2 = new RegExp("([^aeiouylsz])\\1$");
      var re4_1b_2 = new RegExp("^" + C2 + v2 + "[^aeiouwxy]$");
      var re_1c = /^(.+?[^aeiou])y$/;
      var re_2 = /^(.+?)(ational|tional|enci|anci|izer|bli|alli|entli|eli|ousli|ization|ation|ator|alism|iveness|fulness|ousness|aliti|iviti|biliti|logi)$/;
      var re_3 = /^(.+?)(icate|ative|alize|iciti|ical|ful|ness)$/;
      var re_4 = /^(.+?)(al|ance|ence|er|ic|able|ible|ant|ement|ment|ent|ou|ism|ate|iti|ous|ive|ize)$/;
      var re2_4 = /^(.+?)(s|t)(ion)$/;
      var re_5 = /^(.+?)e$/;
      var re_5_1 = /ll$/;
      var re3_5 = new RegExp("^" + C2 + v2 + "[^aeiouwxy]$");
      var porterStemmer = function porterStemmer2(w2) {
        var stem, suffix, firstch, re2, re22, re3, re4;
        if (w2.length < 3) {
          return w2;
        }
        firstch = w2.substr(0, 1);
        if (firstch == "y") {
          w2 = firstch.toUpperCase() + w2.substr(1);
        }
        re2 = re_1a;
        re22 = re2_1a;
        if (re2.test(w2)) {
          w2 = w2.replace(re2, "$1$2");
        } else if (re22.test(w2)) {
          w2 = w2.replace(re22, "$1$2");
        }
        re2 = re_1b;
        re22 = re2_1b;
        if (re2.test(w2)) {
          var fp = re2.exec(w2);
          re2 = re_mgr0;
          if (re2.test(fp[1])) {
            re2 = re_1b_2;
            w2 = w2.replace(re2, "");
          }
        } else if (re22.test(w2)) {
          var fp = re22.exec(w2);
          stem = fp[1];
          re22 = re_s_v;
          if (re22.test(stem)) {
            w2 = stem;
            re22 = re2_1b_2;
            re3 = re3_1b_2;
            re4 = re4_1b_2;
            if (re22.test(w2)) {
              w2 = w2 + "e";
            } else if (re3.test(w2)) {
              re2 = re_1b_2;
              w2 = w2.replace(re2, "");
            } else if (re4.test(w2)) {
              w2 = w2 + "e";
            }
          }
        }
        re2 = re_1c;
        if (re2.test(w2)) {
          var fp = re2.exec(w2);
          stem = fp[1];
          w2 = stem + "i";
        }
        re2 = re_2;
        if (re2.test(w2)) {
          var fp = re2.exec(w2);
          stem = fp[1];
          suffix = fp[2];
          re2 = re_mgr0;
          if (re2.test(stem)) {
            w2 = stem + step2list[suffix];
          }
        }
        re2 = re_3;
        if (re2.test(w2)) {
          var fp = re2.exec(w2);
          stem = fp[1];
          suffix = fp[2];
          re2 = re_mgr0;
          if (re2.test(stem)) {
            w2 = stem + step3list[suffix];
          }
        }
        re2 = re_4;
        re22 = re2_4;
        if (re2.test(w2)) {
          var fp = re2.exec(w2);
          stem = fp[1];
          re2 = re_mgr1;
          if (re2.test(stem)) {
            w2 = stem;
          }
        } else if (re22.test(w2)) {
          var fp = re22.exec(w2);
          stem = fp[1] + fp[2];
          re22 = re_mgr1;
          if (re22.test(stem)) {
            w2 = stem;
          }
        }
        re2 = re_5;
        if (re2.test(w2)) {
          var fp = re2.exec(w2);
          stem = fp[1];
          re2 = re_mgr1;
          re22 = re_meq1;
          re3 = re3_5;
          if (re2.test(stem) || re22.test(stem) && !re3.test(stem)) {
            w2 = stem;
          }
        }
        re2 = re_5_1;
        re22 = re_mgr1;
        if (re2.test(w2) && re22.test(w2)) {
          re2 = re_1b_2;
          w2 = w2.replace(re2, "");
        }
        if (firstch == "y") {
          w2 = firstch.toLowerCase() + w2.substr(1);
        }
        return w2;
      };
      return function(token) {
        return token.update(porterStemmer);
      };
    }();
    lunr2.Pipeline.registerFunction(lunr2.stemmer, "stemmer");
    /*!
     * lunr.stopWordFilter
     * Copyright (C) 2020 Oliver Nightingale
     */
    lunr2.generateStopWordFilter = function(stopWords) {
      var words = stopWords.reduce(function(memo, stopWord) {
        memo[stopWord] = stopWord;
        return memo;
      }, {});
      return function(token) {
        if (token && words[token.toString()] !== token.toString())
          return token;
      };
    };
    lunr2.stopWordFilter = lunr2.generateStopWordFilter([
      "a",
      "able",
      "about",
      "across",
      "after",
      "all",
      "almost",
      "also",
      "am",
      "among",
      "an",
      "and",
      "any",
      "are",
      "as",
      "at",
      "be",
      "because",
      "been",
      "but",
      "by",
      "can",
      "cannot",
      "could",
      "dear",
      "did",
      "do",
      "does",
      "either",
      "else",
      "ever",
      "every",
      "for",
      "from",
      "get",
      "got",
      "had",
      "has",
      "have",
      "he",
      "her",
      "hers",
      "him",
      "his",
      "how",
      "however",
      "i",
      "if",
      "in",
      "into",
      "is",
      "it",
      "its",
      "just",
      "least",
      "let",
      "like",
      "likely",
      "may",
      "me",
      "might",
      "most",
      "must",
      "my",
      "neither",
      "no",
      "nor",
      "not",
      "of",
      "off",
      "often",
      "on",
      "only",
      "or",
      "other",
      "our",
      "own",
      "rather",
      "said",
      "say",
      "says",
      "she",
      "should",
      "since",
      "so",
      "some",
      "than",
      "that",
      "the",
      "their",
      "them",
      "then",
      "there",
      "these",
      "they",
      "this",
      "tis",
      "to",
      "too",
      "twas",
      "us",
      "wants",
      "was",
      "we",
      "were",
      "what",
      "when",
      "where",
      "which",
      "while",
      "who",
      "whom",
      "why",
      "will",
      "with",
      "would",
      "yet",
      "you",
      "your"
    ]);
    lunr2.Pipeline.registerFunction(lunr2.stopWordFilter, "stopWordFilter");
    /*!
     * lunr.trimmer
     * Copyright (C) 2020 Oliver Nightingale
     */
    lunr2.trimmer = function(token) {
      return token.update(function(s) {
        return s.replace(/^\W+/, "").replace(/\W+$/, "");
      });
    };
    lunr2.Pipeline.registerFunction(lunr2.trimmer, "trimmer");
    /*!
     * lunr.TokenSet
     * Copyright (C) 2020 Oliver Nightingale
     */
    lunr2.TokenSet = function() {
      this.final = false;
      this.edges = {};
      this.id = lunr2.TokenSet._nextId;
      lunr2.TokenSet._nextId += 1;
    };
    lunr2.TokenSet._nextId = 1;
    lunr2.TokenSet.fromArray = function(arr) {
      var builder = new lunr2.TokenSet.Builder();
      for (var i = 0, len = arr.length; i < len; i++) {
        builder.insert(arr[i]);
      }
      builder.finish();
      return builder.root;
    };
    lunr2.TokenSet.fromClause = function(clause) {
      if ("editDistance" in clause) {
        return lunr2.TokenSet.fromFuzzyString(clause.term, clause.editDistance);
      } else {
        return lunr2.TokenSet.fromString(clause.term);
      }
    };
    lunr2.TokenSet.fromFuzzyString = function(str, editDistance) {
      var root = new lunr2.TokenSet();
      var stack = [{
        node: root,
        editsRemaining: editDistance,
        str
      }];
      while (stack.length) {
        var frame = stack.pop();
        if (frame.str.length > 0) {
          var char = frame.str.charAt(0), noEditNode;
          if (char in frame.node.edges) {
            noEditNode = frame.node.edges[char];
          } else {
            noEditNode = new lunr2.TokenSet();
            frame.node.edges[char] = noEditNode;
          }
          if (frame.str.length == 1) {
            noEditNode.final = true;
          }
          stack.push({
            node: noEditNode,
            editsRemaining: frame.editsRemaining,
            str: frame.str.slice(1)
          });
        }
        if (frame.editsRemaining == 0) {
          continue;
        }
        if ("*" in frame.node.edges) {
          var insertionNode = frame.node.edges["*"];
        } else {
          var insertionNode = new lunr2.TokenSet();
          frame.node.edges["*"] = insertionNode;
        }
        if (frame.str.length == 0) {
          insertionNode.final = true;
        }
        stack.push({
          node: insertionNode,
          editsRemaining: frame.editsRemaining - 1,
          str: frame.str
        });
        if (frame.str.length > 1) {
          stack.push({
            node: frame.node,
            editsRemaining: frame.editsRemaining - 1,
            str: frame.str.slice(1)
          });
        }
        if (frame.str.length == 1) {
          frame.node.final = true;
        }
        if (frame.str.length >= 1) {
          if ("*" in frame.node.edges) {
            var substitutionNode = frame.node.edges["*"];
          } else {
            var substitutionNode = new lunr2.TokenSet();
            frame.node.edges["*"] = substitutionNode;
          }
          if (frame.str.length == 1) {
            substitutionNode.final = true;
          }
          stack.push({
            node: substitutionNode,
            editsRemaining: frame.editsRemaining - 1,
            str: frame.str.slice(1)
          });
        }
        if (frame.str.length > 1) {
          var charA = frame.str.charAt(0), charB = frame.str.charAt(1), transposeNode;
          if (charB in frame.node.edges) {
            transposeNode = frame.node.edges[charB];
          } else {
            transposeNode = new lunr2.TokenSet();
            frame.node.edges[charB] = transposeNode;
          }
          if (frame.str.length == 1) {
            transposeNode.final = true;
          }
          stack.push({
            node: transposeNode,
            editsRemaining: frame.editsRemaining - 1,
            str: charA + frame.str.slice(2)
          });
        }
      }
      return root;
    };
    lunr2.TokenSet.fromString = function(str) {
      var node = new lunr2.TokenSet(), root = node;
      for (var i = 0, len = str.length; i < len; i++) {
        var char = str[i], final = i == len - 1;
        if (char == "*") {
          node.edges[char] = node;
          node.final = final;
        } else {
          var next = new lunr2.TokenSet();
          next.final = final;
          node.edges[char] = next;
          node = next;
        }
      }
      return root;
    };
    lunr2.TokenSet.prototype.toArray = function() {
      var words = [];
      var stack = [{
        prefix: "",
        node: this
      }];
      while (stack.length) {
        var frame = stack.pop(), edges = Object.keys(frame.node.edges), len = edges.length;
        if (frame.node.final) {
          frame.prefix.charAt(0);
          words.push(frame.prefix);
        }
        for (var i = 0; i < len; i++) {
          var edge = edges[i];
          stack.push({
            prefix: frame.prefix.concat(edge),
            node: frame.node.edges[edge]
          });
        }
      }
      return words;
    };
    lunr2.TokenSet.prototype.toString = function() {
      if (this._str) {
        return this._str;
      }
      var str = this.final ? "1" : "0", labels = Object.keys(this.edges).sort(), len = labels.length;
      for (var i = 0; i < len; i++) {
        var label = labels[i], node = this.edges[label];
        str = str + label + node.id;
      }
      return str;
    };
    lunr2.TokenSet.prototype.intersect = function(b2) {
      var output = new lunr2.TokenSet(), frame = void 0;
      var stack = [{
        qNode: b2,
        output,
        node: this
      }];
      while (stack.length) {
        frame = stack.pop();
        var qEdges = Object.keys(frame.qNode.edges), qLen = qEdges.length, nEdges = Object.keys(frame.node.edges), nLen = nEdges.length;
        for (var q2 = 0; q2 < qLen; q2++) {
          var qEdge = qEdges[q2];
          for (var n2 = 0; n2 < nLen; n2++) {
            var nEdge = nEdges[n2];
            if (nEdge == qEdge || qEdge == "*") {
              var node = frame.node.edges[nEdge], qNode = frame.qNode.edges[qEdge], final = node.final && qNode.final, next = void 0;
              if (nEdge in frame.output.edges) {
                next = frame.output.edges[nEdge];
                next.final = next.final || final;
              } else {
                next = new lunr2.TokenSet();
                next.final = final;
                frame.output.edges[nEdge] = next;
              }
              stack.push({
                qNode,
                output: next,
                node
              });
            }
          }
        }
      }
      return output;
    };
    lunr2.TokenSet.Builder = function() {
      this.previousWord = "";
      this.root = new lunr2.TokenSet();
      this.uncheckedNodes = [];
      this.minimizedNodes = {};
    };
    lunr2.TokenSet.Builder.prototype.insert = function(word) {
      var node, commonPrefix = 0;
      if (word < this.previousWord) {
        throw new Error("Out of order word insertion");
      }
      for (var i = 0; i < word.length && i < this.previousWord.length; i++) {
        if (word[i] != this.previousWord[i])
          break;
        commonPrefix++;
      }
      this.minimize(commonPrefix);
      if (this.uncheckedNodes.length == 0) {
        node = this.root;
      } else {
        node = this.uncheckedNodes[this.uncheckedNodes.length - 1].child;
      }
      for (var i = commonPrefix; i < word.length; i++) {
        var nextNode = new lunr2.TokenSet(), char = word[i];
        node.edges[char] = nextNode;
        this.uncheckedNodes.push({
          parent: node,
          char,
          child: nextNode
        });
        node = nextNode;
      }
      node.final = true;
      this.previousWord = word;
    };
    lunr2.TokenSet.Builder.prototype.finish = function() {
      this.minimize(0);
    };
    lunr2.TokenSet.Builder.prototype.minimize = function(downTo) {
      for (var i = this.uncheckedNodes.length - 1; i >= downTo; i--) {
        var node = this.uncheckedNodes[i], childKey = node.child.toString();
        if (childKey in this.minimizedNodes) {
          node.parent.edges[node.char] = this.minimizedNodes[childKey];
        } else {
          node.child._str = childKey;
          this.minimizedNodes[childKey] = node.child;
        }
        this.uncheckedNodes.pop();
      }
    };
    /*!
     * lunr.Index
     * Copyright (C) 2020 Oliver Nightingale
     */
    lunr2.Index = function(attrs) {
      this.invertedIndex = attrs.invertedIndex;
      this.fieldVectors = attrs.fieldVectors;
      this.tokenSet = attrs.tokenSet;
      this.fields = attrs.fields;
      this.pipeline = attrs.pipeline;
    };
    lunr2.Index.prototype.search = function(queryString) {
      return this.query(function(query) {
        var parser = new lunr2.QueryParser(queryString, query);
        parser.parse();
      });
    };
    lunr2.Index.prototype.query = function(fn2) {
      var query = new lunr2.Query(this.fields), matchingFields = Object.create(null), queryVectors = Object.create(null), termFieldCache = Object.create(null), requiredMatches = Object.create(null), prohibitedMatches = Object.create(null);
      for (var i = 0; i < this.fields.length; i++) {
        queryVectors[this.fields[i]] = new lunr2.Vector();
      }
      fn2.call(query, query);
      for (var i = 0; i < query.clauses.length; i++) {
        var clause = query.clauses[i], terms = null, clauseMatches = lunr2.Set.empty;
        if (clause.usePipeline) {
          terms = this.pipeline.runString(clause.term, {
            fields: clause.fields
          });
        } else {
          terms = [clause.term];
        }
        for (var m2 = 0; m2 < terms.length; m2++) {
          var term = terms[m2];
          clause.term = term;
          var termTokenSet = lunr2.TokenSet.fromClause(clause), expandedTerms = this.tokenSet.intersect(termTokenSet).toArray();
          if (expandedTerms.length === 0 && clause.presence === lunr2.Query.presence.REQUIRED) {
            for (var k2 = 0; k2 < clause.fields.length; k2++) {
              var field = clause.fields[k2];
              requiredMatches[field] = lunr2.Set.empty;
            }
            break;
          }
          for (var j = 0; j < expandedTerms.length; j++) {
            var expandedTerm = expandedTerms[j], posting = this.invertedIndex[expandedTerm], termIndex = posting._index;
            for (var k2 = 0; k2 < clause.fields.length; k2++) {
              var field = clause.fields[k2], fieldPosting = posting[field], matchingDocumentRefs = Object.keys(fieldPosting), termField = expandedTerm + "/" + field, matchingDocumentsSet = new lunr2.Set(matchingDocumentRefs);
              if (clause.presence == lunr2.Query.presence.REQUIRED) {
                clauseMatches = clauseMatches.union(matchingDocumentsSet);
                if (requiredMatches[field] === void 0) {
                  requiredMatches[field] = lunr2.Set.complete;
                }
              }
              if (clause.presence == lunr2.Query.presence.PROHIBITED) {
                if (prohibitedMatches[field] === void 0) {
                  prohibitedMatches[field] = lunr2.Set.empty;
                }
                prohibitedMatches[field] = prohibitedMatches[field].union(matchingDocumentsSet);
                continue;
              }
              queryVectors[field].upsert(termIndex, clause.boost, function(a, b2) {
                return a + b2;
              });
              if (termFieldCache[termField]) {
                continue;
              }
              for (var l2 = 0; l2 < matchingDocumentRefs.length; l2++) {
                var matchingDocumentRef = matchingDocumentRefs[l2], matchingFieldRef = new lunr2.FieldRef(matchingDocumentRef, field), metadata = fieldPosting[matchingDocumentRef], fieldMatch;
                if ((fieldMatch = matchingFields[matchingFieldRef]) === void 0) {
                  matchingFields[matchingFieldRef] = new lunr2.MatchData(expandedTerm, field, metadata);
                } else {
                  fieldMatch.add(expandedTerm, field, metadata);
                }
              }
              termFieldCache[termField] = true;
            }
          }
        }
        if (clause.presence === lunr2.Query.presence.REQUIRED) {
          for (var k2 = 0; k2 < clause.fields.length; k2++) {
            var field = clause.fields[k2];
            requiredMatches[field] = requiredMatches[field].intersect(clauseMatches);
          }
        }
      }
      var allRequiredMatches = lunr2.Set.complete, allProhibitedMatches = lunr2.Set.empty;
      for (var i = 0; i < this.fields.length; i++) {
        var field = this.fields[i];
        if (requiredMatches[field]) {
          allRequiredMatches = allRequiredMatches.intersect(requiredMatches[field]);
        }
        if (prohibitedMatches[field]) {
          allProhibitedMatches = allProhibitedMatches.union(prohibitedMatches[field]);
        }
      }
      var matchingFieldRefs = Object.keys(matchingFields), results = [], matches = Object.create(null);
      if (query.isNegated()) {
        matchingFieldRefs = Object.keys(this.fieldVectors);
        for (var i = 0; i < matchingFieldRefs.length; i++) {
          var matchingFieldRef = matchingFieldRefs[i];
          var fieldRef = lunr2.FieldRef.fromString(matchingFieldRef);
          matchingFields[matchingFieldRef] = new lunr2.MatchData();
        }
      }
      for (var i = 0; i < matchingFieldRefs.length; i++) {
        var fieldRef = lunr2.FieldRef.fromString(matchingFieldRefs[i]), docRef = fieldRef.docRef;
        if (!allRequiredMatches.contains(docRef)) {
          continue;
        }
        if (allProhibitedMatches.contains(docRef)) {
          continue;
        }
        var fieldVector = this.fieldVectors[fieldRef], score = queryVectors[fieldRef.fieldName].similarity(fieldVector), docMatch;
        if ((docMatch = matches[docRef]) !== void 0) {
          docMatch.score += score;
          docMatch.matchData.combine(matchingFields[fieldRef]);
        } else {
          var match = {
            ref: docRef,
            score,
            matchData: matchingFields[fieldRef]
          };
          matches[docRef] = match;
          results.push(match);
        }
      }
      return results.sort(function(a, b2) {
        return b2.score - a.score;
      });
    };
    lunr2.Index.prototype.toJSON = function() {
      var invertedIndex = Object.keys(this.invertedIndex).sort().map(function(term) {
        return [term, this.invertedIndex[term]];
      }, this);
      var fieldVectors = Object.keys(this.fieldVectors).map(function(ref) {
        return [ref, this.fieldVectors[ref].toJSON()];
      }, this);
      return {
        version: lunr2.version,
        fields: this.fields,
        fieldVectors,
        invertedIndex,
        pipeline: this.pipeline.toJSON()
      };
    };
    lunr2.Index.load = function(serializedIndex) {
      var attrs = {}, fieldVectors = {}, serializedVectors = serializedIndex.fieldVectors, invertedIndex = Object.create(null), serializedInvertedIndex = serializedIndex.invertedIndex, tokenSetBuilder = new lunr2.TokenSet.Builder(), pipeline = lunr2.Pipeline.load(serializedIndex.pipeline);
      if (serializedIndex.version != lunr2.version) {
        lunr2.utils.warn("Version mismatch when loading serialised index. Current version of lunr '" + lunr2.version + "' does not match serialized index '" + serializedIndex.version + "'");
      }
      for (var i = 0; i < serializedVectors.length; i++) {
        var tuple = serializedVectors[i], ref = tuple[0], elements = tuple[1];
        fieldVectors[ref] = new lunr2.Vector(elements);
      }
      for (var i = 0; i < serializedInvertedIndex.length; i++) {
        var tuple = serializedInvertedIndex[i], term = tuple[0], posting = tuple[1];
        tokenSetBuilder.insert(term);
        invertedIndex[term] = posting;
      }
      tokenSetBuilder.finish();
      attrs.fields = serializedIndex.fields;
      attrs.fieldVectors = fieldVectors;
      attrs.invertedIndex = invertedIndex;
      attrs.tokenSet = tokenSetBuilder.root;
      attrs.pipeline = pipeline;
      return new lunr2.Index(attrs);
    };
    /*!
     * lunr.Builder
     * Copyright (C) 2020 Oliver Nightingale
     */
    lunr2.Builder = function() {
      this._ref = "id";
      this._fields = Object.create(null);
      this._documents = Object.create(null);
      this.invertedIndex = Object.create(null);
      this.fieldTermFrequencies = {};
      this.fieldLengths = {};
      this.tokenizer = lunr2.tokenizer;
      this.pipeline = new lunr2.Pipeline();
      this.searchPipeline = new lunr2.Pipeline();
      this.documentCount = 0;
      this._b = 0.75;
      this._k1 = 1.2;
      this.termIndex = 0;
      this.metadataWhitelist = [];
    };
    lunr2.Builder.prototype.ref = function(ref) {
      this._ref = ref;
    };
    lunr2.Builder.prototype.field = function(fieldName, attributes) {
      if (/\//.test(fieldName)) {
        throw new RangeError("Field '" + fieldName + "' contains illegal character '/'");
      }
      this._fields[fieldName] = attributes || {};
    };
    lunr2.Builder.prototype.b = function(number) {
      if (number < 0) {
        this._b = 0;
      } else if (number > 1) {
        this._b = 1;
      } else {
        this._b = number;
      }
    };
    lunr2.Builder.prototype.k1 = function(number) {
      this._k1 = number;
    };
    lunr2.Builder.prototype.add = function(doc, attributes) {
      var docRef = doc[this._ref], fields = Object.keys(this._fields);
      this._documents[docRef] = attributes || {};
      this.documentCount += 1;
      for (var i = 0; i < fields.length; i++) {
        var fieldName = fields[i], extractor = this._fields[fieldName].extractor, field = extractor ? extractor(doc) : doc[fieldName], tokens = this.tokenizer(field, {
          fields: [fieldName]
        }), terms = this.pipeline.run(tokens), fieldRef = new lunr2.FieldRef(docRef, fieldName), fieldTerms = Object.create(null);
        this.fieldTermFrequencies[fieldRef] = fieldTerms;
        this.fieldLengths[fieldRef] = 0;
        this.fieldLengths[fieldRef] += terms.length;
        for (var j = 0; j < terms.length; j++) {
          var term = terms[j];
          if (fieldTerms[term] == void 0) {
            fieldTerms[term] = 0;
          }
          fieldTerms[term] += 1;
          if (this.invertedIndex[term] == void 0) {
            var posting = Object.create(null);
            posting["_index"] = this.termIndex;
            this.termIndex += 1;
            for (var k2 = 0; k2 < fields.length; k2++) {
              posting[fields[k2]] = Object.create(null);
            }
            this.invertedIndex[term] = posting;
          }
          if (this.invertedIndex[term][fieldName][docRef] == void 0) {
            this.invertedIndex[term][fieldName][docRef] = Object.create(null);
          }
          for (var l2 = 0; l2 < this.metadataWhitelist.length; l2++) {
            var metadataKey = this.metadataWhitelist[l2], metadata = term.metadata[metadataKey];
            if (this.invertedIndex[term][fieldName][docRef][metadataKey] == void 0) {
              this.invertedIndex[term][fieldName][docRef][metadataKey] = [];
            }
            this.invertedIndex[term][fieldName][docRef][metadataKey].push(metadata);
          }
        }
      }
    };
    lunr2.Builder.prototype.calculateAverageFieldLengths = function() {
      var fieldRefs = Object.keys(this.fieldLengths), numberOfFields = fieldRefs.length, accumulator = {}, documentsWithField = {};
      for (var i = 0; i < numberOfFields; i++) {
        var fieldRef = lunr2.FieldRef.fromString(fieldRefs[i]), field = fieldRef.fieldName;
        documentsWithField[field] || (documentsWithField[field] = 0);
        documentsWithField[field] += 1;
        accumulator[field] || (accumulator[field] = 0);
        accumulator[field] += this.fieldLengths[fieldRef];
      }
      var fields = Object.keys(this._fields);
      for (var i = 0; i < fields.length; i++) {
        var fieldName = fields[i];
        accumulator[fieldName] = accumulator[fieldName] / documentsWithField[fieldName];
      }
      this.averageFieldLength = accumulator;
    };
    lunr2.Builder.prototype.createFieldVectors = function() {
      var fieldVectors = {}, fieldRefs = Object.keys(this.fieldTermFrequencies), fieldRefsLength = fieldRefs.length, termIdfCache = Object.create(null);
      for (var i = 0; i < fieldRefsLength; i++) {
        var fieldRef = lunr2.FieldRef.fromString(fieldRefs[i]), fieldName = fieldRef.fieldName, fieldLength = this.fieldLengths[fieldRef], fieldVector = new lunr2.Vector(), termFrequencies = this.fieldTermFrequencies[fieldRef], terms = Object.keys(termFrequencies), termsLength = terms.length;
        var fieldBoost = this._fields[fieldName].boost || 1, docBoost = this._documents[fieldRef.docRef].boost || 1;
        for (var j = 0; j < termsLength; j++) {
          var term = terms[j], tf = termFrequencies[term], termIndex = this.invertedIndex[term]._index, idf, score, scoreWithPrecision;
          if (termIdfCache[term] === void 0) {
            idf = lunr2.idf(this.invertedIndex[term], this.documentCount);
            termIdfCache[term] = idf;
          } else {
            idf = termIdfCache[term];
          }
          score = idf * ((this._k1 + 1) * tf) / (this._k1 * (1 - this._b + this._b * (fieldLength / this.averageFieldLength[fieldName])) + tf);
          score *= fieldBoost;
          score *= docBoost;
          scoreWithPrecision = Math.round(score * 1e3) / 1e3;
          fieldVector.insert(termIndex, scoreWithPrecision);
        }
        fieldVectors[fieldRef] = fieldVector;
      }
      this.fieldVectors = fieldVectors;
    };
    lunr2.Builder.prototype.createTokenSet = function() {
      this.tokenSet = lunr2.TokenSet.fromArray(Object.keys(this.invertedIndex).sort());
    };
    lunr2.Builder.prototype.build = function() {
      this.calculateAverageFieldLengths();
      this.createFieldVectors();
      this.createTokenSet();
      return new lunr2.Index({
        invertedIndex: this.invertedIndex,
        fieldVectors: this.fieldVectors,
        tokenSet: this.tokenSet,
        fields: Object.keys(this._fields),
        pipeline: this.searchPipeline
      });
    };
    lunr2.Builder.prototype.use = function(fn2) {
      var args = Array.prototype.slice.call(arguments, 1);
      args.unshift(this);
      fn2.apply(this, args);
    };
    lunr2.MatchData = function(term, field, metadata) {
      var clonedMetadata = Object.create(null), metadataKeys = Object.keys(metadata || {});
      for (var i = 0; i < metadataKeys.length; i++) {
        var key = metadataKeys[i];
        clonedMetadata[key] = metadata[key].slice();
      }
      this.metadata = Object.create(null);
      if (term !== void 0) {
        this.metadata[term] = Object.create(null);
        this.metadata[term][field] = clonedMetadata;
      }
    };
    lunr2.MatchData.prototype.combine = function(otherMatchData) {
      var terms = Object.keys(otherMatchData.metadata);
      for (var i = 0; i < terms.length; i++) {
        var term = terms[i], fields = Object.keys(otherMatchData.metadata[term]);
        if (this.metadata[term] == void 0) {
          this.metadata[term] = Object.create(null);
        }
        for (var j = 0; j < fields.length; j++) {
          var field = fields[j], keys = Object.keys(otherMatchData.metadata[term][field]);
          if (this.metadata[term][field] == void 0) {
            this.metadata[term][field] = Object.create(null);
          }
          for (var k2 = 0; k2 < keys.length; k2++) {
            var key = keys[k2];
            if (this.metadata[term][field][key] == void 0) {
              this.metadata[term][field][key] = otherMatchData.metadata[term][field][key];
            } else {
              this.metadata[term][field][key] = this.metadata[term][field][key].concat(otherMatchData.metadata[term][field][key]);
            }
          }
        }
      }
    };
    lunr2.MatchData.prototype.add = function(term, field, metadata) {
      if (!(term in this.metadata)) {
        this.metadata[term] = Object.create(null);
        this.metadata[term][field] = metadata;
        return;
      }
      if (!(field in this.metadata[term])) {
        this.metadata[term][field] = metadata;
        return;
      }
      var metadataKeys = Object.keys(metadata);
      for (var i = 0; i < metadataKeys.length; i++) {
        var key = metadataKeys[i];
        if (key in this.metadata[term][field]) {
          this.metadata[term][field][key] = this.metadata[term][field][key].concat(metadata[key]);
        } else {
          this.metadata[term][field][key] = metadata[key];
        }
      }
    };
    lunr2.Query = function(allFields) {
      this.clauses = [];
      this.allFields = allFields;
    };
    lunr2.Query.wildcard = new String("*");
    lunr2.Query.wildcard.NONE = 0;
    lunr2.Query.wildcard.LEADING = 1;
    lunr2.Query.wildcard.TRAILING = 2;
    lunr2.Query.presence = {
      OPTIONAL: 1,
      REQUIRED: 2,
      PROHIBITED: 3
    };
    lunr2.Query.prototype.clause = function(clause) {
      if (!("fields" in clause)) {
        clause.fields = this.allFields;
      }
      if (!("boost" in clause)) {
        clause.boost = 1;
      }
      if (!("usePipeline" in clause)) {
        clause.usePipeline = true;
      }
      if (!("wildcard" in clause)) {
        clause.wildcard = lunr2.Query.wildcard.NONE;
      }
      if (clause.wildcard & lunr2.Query.wildcard.LEADING && clause.term.charAt(0) != lunr2.Query.wildcard) {
        clause.term = "*" + clause.term;
      }
      if (clause.wildcard & lunr2.Query.wildcard.TRAILING && clause.term.slice(-1) != lunr2.Query.wildcard) {
        clause.term = "" + clause.term + "*";
      }
      if (!("presence" in clause)) {
        clause.presence = lunr2.Query.presence.OPTIONAL;
      }
      this.clauses.push(clause);
      return this;
    };
    lunr2.Query.prototype.isNegated = function() {
      for (var i = 0; i < this.clauses.length; i++) {
        if (this.clauses[i].presence != lunr2.Query.presence.PROHIBITED) {
          return false;
        }
      }
      return true;
    };
    lunr2.Query.prototype.term = function(term, options) {
      if (Array.isArray(term)) {
        term.forEach(function(t2) {
          this.term(t2, lunr2.utils.clone(options));
        }, this);
        return this;
      }
      var clause = options || {};
      clause.term = term.toString();
      this.clause(clause);
      return this;
    };
    lunr2.QueryParseError = function(message, start2, end2) {
      this.name = "QueryParseError";
      this.message = message;
      this.start = start2;
      this.end = end2;
    };
    lunr2.QueryParseError.prototype = new Error();
    lunr2.QueryLexer = function(str) {
      this.lexemes = [];
      this.str = str;
      this.length = str.length;
      this.pos = 0;
      this.start = 0;
      this.escapeCharPositions = [];
    };
    lunr2.QueryLexer.prototype.run = function() {
      var state = lunr2.QueryLexer.lexText;
      while (state) {
        state = state(this);
      }
    };
    lunr2.QueryLexer.prototype.sliceString = function() {
      var subSlices = [], sliceStart = this.start, sliceEnd = this.pos;
      for (var i = 0; i < this.escapeCharPositions.length; i++) {
        sliceEnd = this.escapeCharPositions[i];
        subSlices.push(this.str.slice(sliceStart, sliceEnd));
        sliceStart = sliceEnd + 1;
      }
      subSlices.push(this.str.slice(sliceStart, this.pos));
      this.escapeCharPositions.length = 0;
      return subSlices.join("");
    };
    lunr2.QueryLexer.prototype.emit = function(type) {
      this.lexemes.push({
        type,
        str: this.sliceString(),
        start: this.start,
        end: this.pos
      });
      this.start = this.pos;
    };
    lunr2.QueryLexer.prototype.escapeCharacter = function() {
      this.escapeCharPositions.push(this.pos - 1);
      this.pos += 1;
    };
    lunr2.QueryLexer.prototype.next = function() {
      if (this.pos >= this.length) {
        return lunr2.QueryLexer.EOS;
      }
      var char = this.str.charAt(this.pos);
      this.pos += 1;
      return char;
    };
    lunr2.QueryLexer.prototype.width = function() {
      return this.pos - this.start;
    };
    lunr2.QueryLexer.prototype.ignore = function() {
      if (this.start == this.pos) {
        this.pos += 1;
      }
      this.start = this.pos;
    };
    lunr2.QueryLexer.prototype.backup = function() {
      this.pos -= 1;
    };
    lunr2.QueryLexer.prototype.acceptDigitRun = function() {
      var char, charCode;
      do {
        char = this.next();
        charCode = char.charCodeAt(0);
      } while (charCode > 47 && charCode < 58);
      if (char != lunr2.QueryLexer.EOS) {
        this.backup();
      }
    };
    lunr2.QueryLexer.prototype.more = function() {
      return this.pos < this.length;
    };
    lunr2.QueryLexer.EOS = "EOS";
    lunr2.QueryLexer.FIELD = "FIELD";
    lunr2.QueryLexer.TERM = "TERM";
    lunr2.QueryLexer.EDIT_DISTANCE = "EDIT_DISTANCE";
    lunr2.QueryLexer.BOOST = "BOOST";
    lunr2.QueryLexer.PRESENCE = "PRESENCE";
    lunr2.QueryLexer.lexField = function(lexer) {
      lexer.backup();
      lexer.emit(lunr2.QueryLexer.FIELD);
      lexer.ignore();
      return lunr2.QueryLexer.lexText;
    };
    lunr2.QueryLexer.lexTerm = function(lexer) {
      if (lexer.width() > 1) {
        lexer.backup();
        lexer.emit(lunr2.QueryLexer.TERM);
      }
      lexer.ignore();
      if (lexer.more()) {
        return lunr2.QueryLexer.lexText;
      }
    };
    lunr2.QueryLexer.lexEditDistance = function(lexer) {
      lexer.ignore();
      lexer.acceptDigitRun();
      lexer.emit(lunr2.QueryLexer.EDIT_DISTANCE);
      return lunr2.QueryLexer.lexText;
    };
    lunr2.QueryLexer.lexBoost = function(lexer) {
      lexer.ignore();
      lexer.acceptDigitRun();
      lexer.emit(lunr2.QueryLexer.BOOST);
      return lunr2.QueryLexer.lexText;
    };
    lunr2.QueryLexer.lexEOS = function(lexer) {
      if (lexer.width() > 0) {
        lexer.emit(lunr2.QueryLexer.TERM);
      }
    };
    lunr2.QueryLexer.termSeparator = lunr2.tokenizer.separator;
    lunr2.QueryLexer.lexText = function(lexer) {
      while (true) {
        var char = lexer.next();
        if (char == lunr2.QueryLexer.EOS) {
          return lunr2.QueryLexer.lexEOS;
        }
        if (char.charCodeAt(0) == 92) {
          lexer.escapeCharacter();
          continue;
        }
        if (char == ":") {
          return lunr2.QueryLexer.lexField;
        }
        if (char == "~") {
          lexer.backup();
          if (lexer.width() > 0) {
            lexer.emit(lunr2.QueryLexer.TERM);
          }
          return lunr2.QueryLexer.lexEditDistance;
        }
        if (char == "^") {
          lexer.backup();
          if (lexer.width() > 0) {
            lexer.emit(lunr2.QueryLexer.TERM);
          }
          return lunr2.QueryLexer.lexBoost;
        }
        if (char == "+" && lexer.width() === 1) {
          lexer.emit(lunr2.QueryLexer.PRESENCE);
          return lunr2.QueryLexer.lexText;
        }
        if (char == "-" && lexer.width() === 1) {
          lexer.emit(lunr2.QueryLexer.PRESENCE);
          return lunr2.QueryLexer.lexText;
        }
        if (char.match(lunr2.QueryLexer.termSeparator)) {
          return lunr2.QueryLexer.lexTerm;
        }
      }
    };
    lunr2.QueryParser = function(str, query) {
      this.lexer = new lunr2.QueryLexer(str);
      this.query = query;
      this.currentClause = {};
      this.lexemeIdx = 0;
    };
    lunr2.QueryParser.prototype.parse = function() {
      this.lexer.run();
      this.lexemes = this.lexer.lexemes;
      var state = lunr2.QueryParser.parseClause;
      while (state) {
        state = state(this);
      }
      return this.query;
    };
    lunr2.QueryParser.prototype.peekLexeme = function() {
      return this.lexemes[this.lexemeIdx];
    };
    lunr2.QueryParser.prototype.consumeLexeme = function() {
      var lexeme = this.peekLexeme();
      this.lexemeIdx += 1;
      return lexeme;
    };
    lunr2.QueryParser.prototype.nextClause = function() {
      var completedClause = this.currentClause;
      this.query.clause(completedClause);
      this.currentClause = {};
    };
    lunr2.QueryParser.parseClause = function(parser) {
      var lexeme = parser.peekLexeme();
      if (lexeme == void 0) {
        return;
      }
      switch (lexeme.type) {
        case lunr2.QueryLexer.PRESENCE:
          return lunr2.QueryParser.parsePresence;
        case lunr2.QueryLexer.FIELD:
          return lunr2.QueryParser.parseField;
        case lunr2.QueryLexer.TERM:
          return lunr2.QueryParser.parseTerm;
        default:
          var errorMessage = "expected either a field or a term, found " + lexeme.type;
          if (lexeme.str.length >= 1) {
            errorMessage += " with value '" + lexeme.str + "'";
          }
          throw new lunr2.QueryParseError(errorMessage, lexeme.start, lexeme.end);
      }
    };
    lunr2.QueryParser.parsePresence = function(parser) {
      var lexeme = parser.consumeLexeme();
      if (lexeme == void 0) {
        return;
      }
      switch (lexeme.str) {
        case "-":
          parser.currentClause.presence = lunr2.Query.presence.PROHIBITED;
          break;
        case "+":
          parser.currentClause.presence = lunr2.Query.presence.REQUIRED;
          break;
        default:
          var errorMessage = "unrecognised presence operator'" + lexeme.str + "'";
          throw new lunr2.QueryParseError(errorMessage, lexeme.start, lexeme.end);
      }
      var nextLexeme = parser.peekLexeme();
      if (nextLexeme == void 0) {
        var errorMessage = "expecting term or field, found nothing";
        throw new lunr2.QueryParseError(errorMessage, lexeme.start, lexeme.end);
      }
      switch (nextLexeme.type) {
        case lunr2.QueryLexer.FIELD:
          return lunr2.QueryParser.parseField;
        case lunr2.QueryLexer.TERM:
          return lunr2.QueryParser.parseTerm;
        default:
          var errorMessage = "expecting term or field, found '" + nextLexeme.type + "'";
          throw new lunr2.QueryParseError(errorMessage, nextLexeme.start, nextLexeme.end);
      }
    };
    lunr2.QueryParser.parseField = function(parser) {
      var lexeme = parser.consumeLexeme();
      if (lexeme == void 0) {
        return;
      }
      if (parser.query.allFields.indexOf(lexeme.str) == -1) {
        var possibleFields = parser.query.allFields.map(function(f2) {
          return "'" + f2 + "'";
        }).join(", "), errorMessage = "unrecognised field '" + lexeme.str + "', possible fields: " + possibleFields;
        throw new lunr2.QueryParseError(errorMessage, lexeme.start, lexeme.end);
      }
      parser.currentClause.fields = [lexeme.str];
      var nextLexeme = parser.peekLexeme();
      if (nextLexeme == void 0) {
        var errorMessage = "expecting term, found nothing";
        throw new lunr2.QueryParseError(errorMessage, lexeme.start, lexeme.end);
      }
      switch (nextLexeme.type) {
        case lunr2.QueryLexer.TERM:
          return lunr2.QueryParser.parseTerm;
        default:
          var errorMessage = "expecting term, found '" + nextLexeme.type + "'";
          throw new lunr2.QueryParseError(errorMessage, nextLexeme.start, nextLexeme.end);
      }
    };
    lunr2.QueryParser.parseTerm = function(parser) {
      var lexeme = parser.consumeLexeme();
      if (lexeme == void 0) {
        return;
      }
      parser.currentClause.term = lexeme.str.toLowerCase();
      if (lexeme.str.indexOf("*") != -1) {
        parser.currentClause.usePipeline = false;
      }
      var nextLexeme = parser.peekLexeme();
      if (nextLexeme == void 0) {
        parser.nextClause();
        return;
      }
      switch (nextLexeme.type) {
        case lunr2.QueryLexer.TERM:
          parser.nextClause();
          return lunr2.QueryParser.parseTerm;
        case lunr2.QueryLexer.FIELD:
          parser.nextClause();
          return lunr2.QueryParser.parseField;
        case lunr2.QueryLexer.EDIT_DISTANCE:
          return lunr2.QueryParser.parseEditDistance;
        case lunr2.QueryLexer.BOOST:
          return lunr2.QueryParser.parseBoost;
        case lunr2.QueryLexer.PRESENCE:
          parser.nextClause();
          return lunr2.QueryParser.parsePresence;
        default:
          var errorMessage = "Unexpected lexeme type '" + nextLexeme.type + "'";
          throw new lunr2.QueryParseError(errorMessage, nextLexeme.start, nextLexeme.end);
      }
    };
    lunr2.QueryParser.parseEditDistance = function(parser) {
      var lexeme = parser.consumeLexeme();
      if (lexeme == void 0) {
        return;
      }
      var editDistance = parseInt(lexeme.str, 10);
      if (isNaN(editDistance)) {
        var errorMessage = "edit distance must be numeric";
        throw new lunr2.QueryParseError(errorMessage, lexeme.start, lexeme.end);
      }
      parser.currentClause.editDistance = editDistance;
      var nextLexeme = parser.peekLexeme();
      if (nextLexeme == void 0) {
        parser.nextClause();
        return;
      }
      switch (nextLexeme.type) {
        case lunr2.QueryLexer.TERM:
          parser.nextClause();
          return lunr2.QueryParser.parseTerm;
        case lunr2.QueryLexer.FIELD:
          parser.nextClause();
          return lunr2.QueryParser.parseField;
        case lunr2.QueryLexer.EDIT_DISTANCE:
          return lunr2.QueryParser.parseEditDistance;
        case lunr2.QueryLexer.BOOST:
          return lunr2.QueryParser.parseBoost;
        case lunr2.QueryLexer.PRESENCE:
          parser.nextClause();
          return lunr2.QueryParser.parsePresence;
        default:
          var errorMessage = "Unexpected lexeme type '" + nextLexeme.type + "'";
          throw new lunr2.QueryParseError(errorMessage, nextLexeme.start, nextLexeme.end);
      }
    };
    lunr2.QueryParser.parseBoost = function(parser) {
      var lexeme = parser.consumeLexeme();
      if (lexeme == void 0) {
        return;
      }
      var boost = parseInt(lexeme.str, 10);
      if (isNaN(boost)) {
        var errorMessage = "boost must be numeric";
        throw new lunr2.QueryParseError(errorMessage, lexeme.start, lexeme.end);
      }
      parser.currentClause.boost = boost;
      var nextLexeme = parser.peekLexeme();
      if (nextLexeme == void 0) {
        parser.nextClause();
        return;
      }
      switch (nextLexeme.type) {
        case lunr2.QueryLexer.TERM:
          parser.nextClause();
          return lunr2.QueryParser.parseTerm;
        case lunr2.QueryLexer.FIELD:
          parser.nextClause();
          return lunr2.QueryParser.parseField;
        case lunr2.QueryLexer.EDIT_DISTANCE:
          return lunr2.QueryParser.parseEditDistance;
        case lunr2.QueryLexer.BOOST:
          return lunr2.QueryParser.parseBoost;
        case lunr2.QueryLexer.PRESENCE:
          parser.nextClause();
          return lunr2.QueryParser.parsePresence;
        default:
          var errorMessage = "Unexpected lexeme type '" + nextLexeme.type + "'";
          throw new lunr2.QueryParseError(errorMessage, nextLexeme.start, nextLexeme.end);
      }
    };
    (function(root, factory) {
      {
        module.exports = factory();
      }
    })(this, function() {
      return lunr2;
    });
  })();
})(lunr$1);
var lunr = lunr$1.exports;
let index$2;
const projectIndizes = new Map();
documents$.subscribe(() => {
  index$2 = void 0;
});
const createIndex = () => {
  if (index$2) {
    return;
  }
  const documentsByProject = new Map();
  index$2 = lunr(function() {
    this.ref("slug");
    this.field("content");
    documents$.value.forEach((document2) => {
      this.add({
        slug: document2.slug,
        content: document2.mdx + " " + document2.plain
      });
      if (!documentsByProject.has(document2.projectSlug)) {
        documentsByProject.set(document2.projectSlug, []);
      }
      documentsByProject.get(document2.projectSlug).push(document2);
    });
  });
  projectIndizes.clear();
  documentsByProject.forEach((documents, projectSlug) => {
    projectIndizes.set(projectSlug, lunr(function() {
      this.ref("slug");
      this.field("content");
      documents.forEach((document2) => {
        this.add({
          slug: document2.slug,
          content: document2.mdx + " " + document2.plain
        });
      });
    }));
  });
};
const searchDocuments = (query, projectSlug) => {
  createIndex();
  const indexToSeach = projectSlug ? projectIndizes.get(projectSlug) : index$2;
  if (indexToSeach && query.length > 2) {
    const result = indexToSeach.search(query).map((result2) => {
      return documents$.value.get(result2.ref);
    });
    return result;
  }
  return [];
};
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "100%",
  maxWidth: 900,
  minHeight: "60vh",
  maxHeight: "80vh",
  padding: 2,
  ["& > div"]: {
    bgcolor: "background.paper",
    border: "2px solid background.paper",
    borderRadius: "5px",
    boxShadow: 24,
    p: 2
  }
};
const StyledAutocompletePopper = default_1$e("div")(({
  theme: theme2
}) => ({
  [`& .${autocompleteClasses$1.paper}`]: {
    boxShadow: "none",
    margin: 0,
    color: "inherit",
    fontSize: 13,
    overflow: "visible"
  },
  [`& .${autocompleteClasses$1.listbox}`]: {
    backgroundColor: theme2.palette.mode === "light" ? "#fff" : "#1c2128",
    padding: 0,
    maxHeight: "70vh",
    [`& .${autocompleteClasses$1.option}`]: {
      minHeight: "auto",
      alignItems: "flex-start",
      padding: 8,
      borderBottom: `1px solid  ${theme2.palette.mode === "light" ? " #eaecef" : "#30363d"}`,
      border: "2px solid " + theme2.palette.primary.light,
      borderRadius: "4px",
      marginTop: "5px",
      marginBottom: "5px",
      h1: {
        fontSize: "1.5em",
        margin: "0px"
      },
      h2: {
        fontSize: "1.2em",
        margin: "0px"
      },
      '&[aria-selected="true"]': {
        backgroundColor: "transparent"
      },
      '&[data-focus="true"], &[data-focus="true"][aria-selected="true"]': {
        backgroundColor: theme2.palette.primary.light
      }
    }
  },
  [`&.${autocompleteClasses$1.popperDisablePortal}`]: {
    position: "relative"
  },
  [".meta"]: {
    backgroundColor: theme2.palette.primary.light,
    padding: "8px",
    borderRadius: "4px",
    width: "100%",
    color: theme2.palette.getContrastText(theme2.palette.primary.light)
  },
  [".hit"]: {
    backgroundColor: theme2.palette.action.hover,
    padding: "4px",
    borderRadius: "4px",
    width: "100%"
  }
}));
const ProjectToggle = default_1$e(FormGroup$1)(({
  theme: theme2
}) => ({
  display: "flex",
  alignItems: "flex-end",
  marginTop: -10,
  marginRight: -10,
  color: "primary"
}));
function PopperComponent(props) {
  const _a2 = props, {
    disablePortal,
    anchorEl,
    open
  } = _a2, other = __objRest(_a2, [
    "disablePortal",
    "anchorEl",
    "open"
  ]);
  return /* @__PURE__ */ jsx(StyledAutocompletePopper, __spreadValues({}, other));
}
const excerptCache = new Map();
const getExcerpts = (text, query) => {
  var _a2;
  const cacheId = text + query;
  if (excerptCache.has(cacheId)) {
    return excerptCache.get(cacheId);
  }
  const queryRegExp = new RegExp(query.split(" ").join("|"), "g");
  const hits = [];
  let prevSentences = [];
  let lastSeenHitIndex = 0;
  let lastHit;
  const maxHits = 3;
  for (const sentence of text.replace(/([.?!])\s*(?=[A-Z])/g, "$1|").split("|")) {
    if (((_a2 = sentence.match(queryRegExp)) == null ? void 0 : _a2.length) > 0) {
      lastHit = prevSentences.join("") + sentence;
      prevSentences = [];
      lastSeenHitIndex = 0;
      hits.push(lastHit);
      continue;
    } else if (lastHit && lastSeenHitIndex < 3) {
      lastHit += sentence;
      lastSeenHitIndex++;
    } else if (hits.length >= maxHits) {
      break;
    }
    if (prevSentences.length < 3) {
      prevSentences.push(sentence);
    }
  }
  excerptCache.set(cacheId, hits);
  return hits;
};
const SearchOverlay = ({
  show$
}) => {
  const show = useLayoutObservableState(show$);
  const handleClose = () => show$.next(false);
  const inputRef = react.exports.useRef();
  const navigate = useNavigate();
  const params = useParams();
  const [searchAll, searchAll$] = useObservableAndState(() => new ValueSubject(true));
  const query$ = useObservable(() => new ValueSubject(""));
  const searchProject$ = useObservable((inputs$) => combineLatest([inputs$, searchAll$]).pipe(map(([inputs, searchAll2]) => !searchAll2 ? inputs[0].projectSlug : void 0)), [params]);
  const [hits] = useObservableState((input$) => combineLatest([query$, searchProject$]).pipe(debounceTime(300), map(([query, searchProject]) => searchDocuments(query, searchProject)), startWith([])));
  react.exports.useEffect(() => {
    if (show$.value !== false) {
      show$.next(false);
    }
  }, [params]);
  const onChange = react.exports.useCallback((e2, option) => {
    if (option instanceof Object) {
      navigate(`/docs/${option.projectSlug}/${option.slug}`, {
        replace: true
      });
    }
    inputRef.current.value = "";
    show$.next(false);
  }, [params]);
  const renderSearch = () => {
    return /* @__PURE__ */ jsx(Box$1, {
      sx: __spreadProps(__spreadValues({}, style), {
        width: "100%"
      }),
      children: /* @__PURE__ */ jsx("div", {
        children: /* @__PURE__ */ jsx(Autocomplete$1, {
          id: "search-input",
          freeSolo: true,
          filterOptions: (x) => x,
          onInputChange: (event, newInputValue) => {
            query$.next(newInputValue.split(" ").filter((q2) => q2.length > 2).join(" "));
          },
          onChange,
          PopperComponent,
          options: hits,
          getOptionLabel: (option) => {
            var _a2;
            return (_a2 = option == null ? void 0 : option.name) != null ? _a2 : "";
          },
          renderOption: (props, option, {
            selected
          }) => /* @__PURE__ */ jsx("li", __spreadProps(__spreadValues({}, props), {
            children: /* @__PURE__ */ jsxs(Box$1, {
              children: [/* @__PURE__ */ jsxs("div", {
                className: "meta",
                children: [/* @__PURE__ */ jsx("h1", {
                  children: option.name
                }), /* @__PURE__ */ jsxs("h2", {
                  children: ["path: ", option.path]
                })]
              }), getExcerpts(option.plain, query$.value).map((hit) => /* @__PURE__ */ jsxs("p", {
                className: "hit",
                children: [/* @__PURE__ */ jsx("span", {
                  children: "[...] "
                }), /* @__PURE__ */ jsx(Highlighter, {
                  highlightClassName: "highlight",
                  searchWords: query$.value.split(" "),
                  autoEscape: true,
                  textToHighlight: hit
                }), /* @__PURE__ */ jsx("span", {
                  children: " [...]"
                })]
              }, hit))]
            })
          })),
          renderInput: (params2) => /* @__PURE__ */ jsxs(Box$1, {
            children: [/* @__PURE__ */ jsx(ProjectToggle, {
              children: /* @__PURE__ */ jsx(FormControlLabel$1, {
                control: /* @__PURE__ */ jsx(Switch$1, {
                  checked: searchAll,
                  onClick: () => {
                    searchAll$.next(!searchAll$.value);
                  }
                }),
                label: "search all projects"
              })
            }), /* @__PURE__ */ jsx(TextField$1, __spreadProps(__spreadValues({}, params2), {
              label: "Type to search...",
              inputRef,
              autoFocus: true
            }))]
          })
        })
      })
    });
  };
  return /* @__PURE__ */ jsx("div", {
    children: /* @__PURE__ */ jsx(Modal$1, {
      open: show,
      onClose: handleClose,
      closeAfterTransition: true,
      BackdropComponent: Backdrop$1,
      BackdropProps: {
        timeout: 500
      },
      children: show ? renderSearch() : /* @__PURE__ */ jsx(Fragment, {})
    })
  });
};
const syntaxThemes = ["a11yDark", "a11yLight", "agate", "anOldHope", "androidstudio", "arduinoLight", "arta", "ascetic", "atelierCaveDark", "atelierCaveLight", "atelierDuneDark", "atelierDuneLight", "atelierEstuaryDark", "atelierEstuaryLight", "atelierForestDark", "atelierForestLight", "atelierHeathDark", "atelierHeathLight", "atelierLakesideDark", "atelierLakesideLight", "atelierPlateauDark", "atelierPlateauLight", "atelierSavannaDark", "atelierSavannaLight", "atelierSeasideDark", "atelierSeasideLight", "atelierSulphurpoolDark", "atelierSulphurpoolLight", "atomOneDark", "atomOneDarkReasonable", "atomOneLight", "brownPaper", "codepenEmbed", "colorBrewer", "darcula", "dark", "defaultStyle", "docco", "dracula", "far", "foundation", "github", "githubGist", "gml", "googlecode", "gradientDark", "gradientLight", "grayscale", "gruvboxDark", "gruvboxLight", "hopscotch", "hybrid", "idea", "irBlack", "isblEditorDark", "isblEditorLight", "kimbieDark", "kimbieLight", "lightfair", "lioshi", "magula", "monoBlue", "monokai", "monokaiSublime", "nightOwl", "nnfx", "nnfxDark", "nord", "obsidian", "ocean", "paraisoDark", "paraisoLight", "pojoaque", "purebasic", "qtcreatorDark", "qtcreatorLight", "railscasts", "rainbow", "routeros", "schoolBook", "shadesOfPurple", "solarizedDark", "solarizedLight", "srcery", "stackoverflowDark", "stackoverflowLight", "sunburst", "tomorrow", "tomorrowNight", "tomorrowNightBlue", "tomorrowNightBright", "tomorrowNightEighties", "vs", "vs2015", "xcode", "xt256", "zenburn"];
const SearchInputWrapper = styled$3("div")(({
  theme: theme2
}) => ({
  position: "relative",
  borderRadius: theme2.shape.borderRadius,
  backgroundColor: alpha(theme2.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme2.palette.common.white, 0.25)
  },
  marginLeft: 0,
  width: "100%",
  [theme2.breakpoints.up("sm")]: {
    marginLeft: theme2.spacing(1),
    width: "auto"
  }
}));
const SearchIconWrapper = styled$3("div")(({
  theme: theme2
}) => ({
  padding: theme2.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center"
}));
const StyledInputBase = styled$3(InputBase$1)(({
  theme: theme2
}) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme2.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme2.spacing(4)})`,
    transition: theme2.transitions.create("width"),
    width: "100%",
    [theme2.breakpoints.up("sm")]: {
      width: "12ch"
    }
  }
}));
const Progress = styled$3(LinearProgress$1)(({
  theme: theme2
}) => ({
  position: "fixed",
  top: 0,
  right: 0,
  left: 0
}));
const showSearch$ = new ValueSubject(false);
const FavButton = styled$3(default_1$f)(({
  theme: theme2
}) => ({
  color: theme2.palette.getContrastText(theme2.palette.primary.main),
  "&:hover": {
    color: "red"
  }
}));
const NavButton = styled$3(IconButton$1)(({
  theme: theme2
}) => ({
  color: theme2.palette.getContrastText(theme2.palette.primary.main),
  "&:hover": {
    color: theme2.palette.primary.dark
  }
}));
const NavMenu = ({
  items,
  children,
  tooltip
}) => {
  const [anchorEl, setAnchorEl] = react.exports.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.target);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  return (items == null ? void 0 : items.length) > 0 ? /* @__PURE__ */ jsxs(react.exports.Fragment, {
    children: [/* @__PURE__ */ jsx(Tooltip$1, {
      title: tooltip,
      children: /* @__PURE__ */ jsx(NavButton, {
        "aria-label": tooltip,
        onClick: handleClick,
        children
      })
    }), /* @__PURE__ */ jsx(Menu$2, {
      id: "fav-menu",
      anchorEl,
      open,
      onClose: handleClose,
      PaperProps: {
        style: {
          maxHeight: "80vh",
          width: "100%",
          maxWidth: "200px"
        }
      },
      anchorOrigin: {
        vertical: "bottom",
        horizontal: "right"
      },
      transformOrigin: {
        vertical: "top",
        horizontal: "right"
      },
      children: items.map(({
        onClick,
        label,
        key
      }) => /* @__PURE__ */ jsx(MenuItem$1, {
        onClick: () => {
          onClick();
          handleClose();
        },
        children: label
      }, key))
    })]
  }) : /* @__PURE__ */ jsx(Fragment, {});
};
const FavMenu = () => {
  var _a2;
  const [favDocs] = useObservableState(() => documents$.pipe(map((docs) => Array.from(docs.values()).filter((doc) => doc.isFavourite))));
  const navigate = useNavigate();
  const onFavClicked = (doc) => {
    navigate(`/docs/${doc.projectSlug}/${doc.slug}`, {
      replace: true
    });
  };
  return /* @__PURE__ */ jsx(NavMenu, {
    tooltip: "Favourites",
    items: (_a2 = favDocs == null ? void 0 : favDocs.map((doc) => ({
      key: doc.slug,
      label: doc.name,
      onClick: () => onFavClicked(doc)
    }))) != null ? _a2 : [],
    children: /* @__PURE__ */ jsx(FavButton, {})
  });
};
const SyntaxMenu = () => {
  var _a2;
  return /* @__PURE__ */ jsx(NavMenu, {
    tooltip: "Syntax theme",
    items: (_a2 = syntaxThemes.map((theme2) => {
      return {
        key: theme2,
        label: theme2,
        onClick: () => {
          codeTheme$.next(theme2);
        }
      };
    })) != null ? _a2 : [],
    children: /* @__PURE__ */ jsx(default_1$c, {})
  });
};
const NavAppBar = styled$3(AppBar$1)(({
  theme: theme2
}) => ({
  "a, a:link, a:visited, a:hover, a:active": {
    color: theme2.palette.getContrastText(theme2.palette.primary.main),
    textDecoration: "none"
  },
  "a:hover": {
    textDecoration: "underline"
  }
}));
function Navbar() {
  const [hasDocumentsFetching] = useObservableAndState(() => combineLatest(queuedDocuments$, fetchingDocuments$).pipe(map(([queuedDocuments, fetchingDocuments]) => queuedDocuments.docs.size > 0 || fetchingDocuments.size > 0)));
  const {
    title = "documentation"
  } = useDocOptions();
  const params = useParams();
  const location = useLocation();
  return /* @__PURE__ */ jsxs(Box$1, {
    sx: {
      flex: 0,
      position: "sticky",
      top: 0,
      zIndex: 1e3
    },
    children: [hasDocumentsFetching && /* @__PURE__ */ jsx(Progress, {}), /* @__PURE__ */ jsx(NavAppBar, {
      position: "static",
      children: /* @__PURE__ */ jsxs(Toolbar$1, {
        children: [/* @__PURE__ */ jsx(Typography$1, {
          variant: "h6",
          noWrap: true,
          component: "div",
          sx: {
            flexGrow: 1,
            display: {
              xs: "none",
              sm: "block"
            }
          },
          children: /* @__PURE__ */ jsx(Link, {
            to: "/docs/",
            children: title
          })
        }), params.contentSlug && location.pathname.startsWith("/docs") && /* @__PURE__ */ jsx(Tooltip$1, {
          title: "edit current document",
          children: /* @__PURE__ */ jsx(Link, {
            to: `/editor/${params.projectSlug}/${params.contentSlug}`,
            children: /* @__PURE__ */ jsx(NavButton, {
              "aria-label": "editor",
              children: /* @__PURE__ */ jsx(default_1$b, {})
            })
          })
        }), /* @__PURE__ */ jsx(Tooltip$1, {
          title: "create document",
          children: /* @__PURE__ */ jsx(Link, {
            to: "/editor/" + params.projectSlug,
            children: /* @__PURE__ */ jsx(NavButton, {
              "aria-label": "editor",
              children: /* @__PURE__ */ jsx(default_1$a, {})
            })
          })
        }), /* @__PURE__ */ jsx(SyntaxMenu, {}), /* @__PURE__ */ jsx(FavMenu, {}), /* @__PURE__ */ jsxs(SearchInputWrapper, {
          sx: {
            cursor: "text"
          },
          onClick: (e2) => {
            e2.currentTarget.blur();
            showSearch$.next(true);
          },
          children: [/* @__PURE__ */ jsx(SearchIconWrapper, {
            children: /* @__PURE__ */ jsx(default_1$9, {})
          }), /* @__PURE__ */ jsx(StyledInputBase, {
            onFocus: (e2) => {
              e2.target.blur();
              showSearch$.next(true);
            },
            placeholder: "Search\u2026",
            inputProps: {
              "aria-label": "search"
            }
          })]
        })]
      })
    }), /* @__PURE__ */ jsx(SearchOverlay, {
      show$: showSearch$
    })]
  });
}
var ChevronRight = {};
var _interopRequireDefault$8 = interopRequireDefault.exports;
Object.defineProperty(ChevronRight, "__esModule", {
  value: true
});
var default_1$8 = ChevronRight.default = void 0;
var _createSvgIcon$8 = _interopRequireDefault$8(createSvgIcon$1);
var _jsxRuntime$8 = require$$2;
var _default$8 = (0, _createSvgIcon$8.default)(/* @__PURE__ */ (0, _jsxRuntime$8.jsx)("path", {
  d: "M10 6 8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z"
}), "ChevronRight");
default_1$8 = ChevronRight.default = _default$8;
var Close = {};
var _interopRequireDefault$7 = interopRequireDefault.exports;
Object.defineProperty(Close, "__esModule", {
  value: true
});
var default_1$7 = Close.default = void 0;
var _createSvgIcon$7 = _interopRequireDefault$7(createSvgIcon$1);
var _jsxRuntime$7 = require$$2;
var _default$7 = (0, _createSvgIcon$7.default)(/* @__PURE__ */ (0, _jsxRuntime$7.jsx)("path", {
  d: "M19 6.41 17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"
}), "Close");
default_1$7 = Close.default = _default$7;
var ExpandMore = {};
var _interopRequireDefault$6 = interopRequireDefault.exports;
Object.defineProperty(ExpandMore, "__esModule", {
  value: true
});
var default_1$6 = ExpandMore.default = void 0;
var _createSvgIcon$6 = _interopRequireDefault$6(createSvgIcon$1);
var _jsxRuntime$6 = require$$2;
var _default$6 = (0, _createSvgIcon$6.default)(/* @__PURE__ */ (0, _jsxRuntime$6.jsx)("path", {
  d: "M16.59 8.59 12 13.17 7.41 8.59 6 10l6 6 6-6z"
}), "ExpandMore");
default_1$6 = ExpandMore.default = _default$6;
var Menu2 = {};
var _interopRequireDefault$5 = interopRequireDefault.exports;
Object.defineProperty(Menu2, "__esModule", {
  value: true
});
var default_1$5 = Menu2.default = void 0;
var _createSvgIcon$5 = _interopRequireDefault$5(createSvgIcon$1);
var _jsxRuntime$5 = require$$2;
var _default$5 = (0, _createSvgIcon$5.default)(/* @__PURE__ */ (0, _jsxRuntime$5.jsx)("path", {
  d: "M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z"
}), "Menu");
default_1$5 = Menu2.default = _default$5;
function getCollapseUtilityClass(slot) {
  return generateUtilityClass("MuiCollapse", slot);
}
generateUtilityClasses("MuiCollapse", ["root", "horizontal", "vertical", "entered", "hidden", "wrapper", "wrapperInner"]);
const _excluded$6 = ["addEndListener", "children", "className", "collapsedSize", "component", "easing", "in", "onEnter", "onEntered", "onEntering", "onExit", "onExited", "onExiting", "orientation", "style", "timeout", "TransitionComponent"];
const useUtilityClasses$4 = (ownerState) => {
  const {
    orientation,
    classes
  } = ownerState;
  const slots = {
    root: ["root", `${orientation}`],
    entered: ["entered"],
    hidden: ["hidden"],
    wrapper: ["wrapper", `${orientation}`],
    wrapperInner: ["wrapperInner", `${orientation}`]
  };
  return composeClasses(slots, getCollapseUtilityClass, classes);
};
const CollapseRoot = styled$3("div", {
  name: "MuiCollapse",
  slot: "Root",
  overridesResolver: (props, styles2) => {
    const {
      ownerState
    } = props;
    return [styles2.root, styles2[ownerState.orientation], ownerState.state === "entered" && styles2.entered, ownerState.state === "exited" && !ownerState.in && ownerState.collapsedSize === "0px" && styles2.hidden];
  }
})(({
  theme: theme2,
  ownerState
}) => _extends$3({
  height: 0,
  overflow: "hidden",
  transition: theme2.transitions.create("height")
}, ownerState.orientation === "horizontal" && {
  height: "auto",
  width: 0,
  transition: theme2.transitions.create("width")
}, ownerState.state === "entered" && _extends$3({
  height: "auto",
  overflow: "visible"
}, ownerState.orientation === "horizontal" && {
  width: "auto"
}), ownerState.state === "exited" && !ownerState.in && ownerState.collapsedSize === "0px" && {
  visibility: "hidden"
}));
const CollapseWrapper = styled$3("div", {
  name: "MuiCollapse",
  slot: "Wrapper",
  overridesResolver: (props, styles2) => styles2.wrapper
})(({
  ownerState
}) => _extends$3({
  display: "flex",
  width: "100%"
}, ownerState.orientation === "horizontal" && {
  width: "auto",
  height: "100%"
}));
const CollapseWrapperInner = styled$3("div", {
  name: "MuiCollapse",
  slot: "WrapperInner",
  overridesResolver: (props, styles2) => styles2.wrapperInner
})(({
  ownerState
}) => _extends$3({
  width: "100%"
}, ownerState.orientation === "horizontal" && {
  width: "auto",
  height: "100%"
}));
const Collapse = /* @__PURE__ */ react.exports.forwardRef(function Collapse2(inProps, ref) {
  const props = useThemeProps({
    props: inProps,
    name: "MuiCollapse"
  });
  const {
    addEndListener,
    children,
    className,
    collapsedSize: collapsedSizeProp = "0px",
    component,
    easing,
    in: inProp,
    onEnter,
    onEntered,
    onEntering,
    onExit,
    onExited,
    onExiting,
    orientation = "vertical",
    style: style2,
    timeout = duration.standard,
    TransitionComponent = Transition$1
  } = props, other = _objectWithoutPropertiesLoose$1(props, _excluded$6);
  const ownerState = _extends$3({}, props, {
    orientation,
    collapsedSize: collapsedSizeProp
  });
  const classes = useUtilityClasses$4(ownerState);
  const theme2 = useTheme();
  const timer = react.exports.useRef();
  const wrapperRef = react.exports.useRef(null);
  const autoTransitionDuration = react.exports.useRef();
  const collapsedSize = typeof collapsedSizeProp === "number" ? `${collapsedSizeProp}px` : collapsedSizeProp;
  const isHorizontal = orientation === "horizontal";
  const size = isHorizontal ? "width" : "height";
  react.exports.useEffect(() => {
    return () => {
      clearTimeout(timer.current);
    };
  }, []);
  const nodeRef = react.exports.useRef(null);
  const handleRef = useForkRef(ref, nodeRef);
  const normalizedTransitionCallback = (callback) => (maybeIsAppearing) => {
    if (callback) {
      const node = nodeRef.current;
      if (maybeIsAppearing === void 0) {
        callback(node);
      } else {
        callback(node, maybeIsAppearing);
      }
    }
  };
  const getWrapperSize = () => wrapperRef.current ? wrapperRef.current[isHorizontal ? "clientWidth" : "clientHeight"] : 0;
  const handleEnter = normalizedTransitionCallback((node, isAppearing) => {
    if (wrapperRef.current && isHorizontal) {
      wrapperRef.current.style.position = "absolute";
    }
    node.style[size] = collapsedSize;
    if (onEnter) {
      onEnter(node, isAppearing);
    }
  });
  const handleEntering = normalizedTransitionCallback((node, isAppearing) => {
    const wrapperSize = getWrapperSize();
    if (wrapperRef.current && isHorizontal) {
      wrapperRef.current.style.position = "";
    }
    const {
      duration: transitionDuration,
      easing: transitionTimingFunction
    } = getTransitionProps({
      style: style2,
      timeout,
      easing
    }, {
      mode: "enter"
    });
    if (timeout === "auto") {
      const duration2 = theme2.transitions.getAutoHeightDuration(wrapperSize);
      node.style.transitionDuration = `${duration2}ms`;
      autoTransitionDuration.current = duration2;
    } else {
      node.style.transitionDuration = typeof transitionDuration === "string" ? transitionDuration : `${transitionDuration}ms`;
    }
    node.style[size] = `${wrapperSize}px`;
    node.style.transitionTimingFunction = transitionTimingFunction;
    if (onEntering) {
      onEntering(node, isAppearing);
    }
  });
  const handleEntered = normalizedTransitionCallback((node, isAppearing) => {
    node.style[size] = "auto";
    if (onEntered) {
      onEntered(node, isAppearing);
    }
  });
  const handleExit = normalizedTransitionCallback((node) => {
    node.style[size] = `${getWrapperSize()}px`;
    if (onExit) {
      onExit(node);
    }
  });
  const handleExited = normalizedTransitionCallback(onExited);
  const handleExiting = normalizedTransitionCallback((node) => {
    const wrapperSize = getWrapperSize();
    const {
      duration: transitionDuration,
      easing: transitionTimingFunction
    } = getTransitionProps({
      style: style2,
      timeout,
      easing
    }, {
      mode: "exit"
    });
    if (timeout === "auto") {
      const duration2 = theme2.transitions.getAutoHeightDuration(wrapperSize);
      node.style.transitionDuration = `${duration2}ms`;
      autoTransitionDuration.current = duration2;
    } else {
      node.style.transitionDuration = typeof transitionDuration === "string" ? transitionDuration : `${transitionDuration}ms`;
    }
    node.style[size] = collapsedSize;
    node.style.transitionTimingFunction = transitionTimingFunction;
    if (onExiting) {
      onExiting(node);
    }
  });
  const handleAddEndListener = (next) => {
    if (timeout === "auto") {
      timer.current = setTimeout(next, autoTransitionDuration.current || 0);
    }
    if (addEndListener) {
      addEndListener(nodeRef.current, next);
    }
  };
  return /* @__PURE__ */ jsx(TransitionComponent, _extends$3({
    in: inProp,
    onEnter: handleEnter,
    onEntered: handleEntered,
    onEntering: handleEntering,
    onExit: handleExit,
    onExited: handleExited,
    onExiting: handleExiting,
    addEndListener: handleAddEndListener,
    nodeRef,
    timeout: timeout === "auto" ? null : timeout
  }, other, {
    children: (state, childProps) => /* @__PURE__ */ jsx(CollapseRoot, _extends$3({
      as: component,
      className: clsx(classes.root, className, {
        "entered": classes.entered,
        "exited": !inProp && collapsedSize === "0px" && classes.hidden
      }[state]),
      style: _extends$3({
        [isHorizontal ? "minWidth" : "minHeight"]: collapsedSize
      }, style2),
      ownerState: _extends$3({}, ownerState, {
        state
      }),
      ref: handleRef
    }, childProps, {
      children: /* @__PURE__ */ jsx(CollapseWrapper, {
        ownerState: _extends$3({}, ownerState, {
          state
        }),
        className: classes.wrapper,
        ref: wrapperRef,
        children: /* @__PURE__ */ jsx(CollapseWrapperInner, {
          ownerState: _extends$3({}, ownerState, {
            state
          }),
          className: classes.wrapperInner,
          children
        })
      })
    }))
  }));
});
Collapse.muiSupportAuto = true;
var Collapse$1 = Collapse;
const TreeViewContext = /* @__PURE__ */ react.exports.createContext({});
var TreeViewContext$1 = TreeViewContext;
const _excluded$5 = ["element"];
function findIndex(array, comp) {
  for (let i = 0; i < array.length; i += 1) {
    if (comp(array[i])) {
      return i;
    }
  }
  return -1;
}
function binaryFindElement(array, element) {
  let start2 = 0;
  let end2 = array.length - 1;
  while (start2 <= end2) {
    const middle = Math.floor((start2 + end2) / 2);
    if (array[middle].element === element) {
      return middle;
    }
    if (array[middle].element.compareDocumentPosition(element) & Node.DOCUMENT_POSITION_PRECEDING) {
      end2 = middle - 1;
    } else {
      start2 = middle + 1;
    }
  }
  return start2;
}
const DescendantContext = /* @__PURE__ */ react.exports.createContext({});
function usePrevious$1(value) {
  const ref = react.exports.useRef(null);
  react.exports.useEffect(() => {
    ref.current = value;
  }, [value]);
  return ref.current;
}
const noop$1 = () => {
};
function useDescendant(descendant) {
  const [, forceUpdate] = react.exports.useState();
  const {
    registerDescendant = noop$1,
    unregisterDescendant = noop$1,
    descendants = [],
    parentId = null
  } = react.exports.useContext(DescendantContext);
  const index2 = findIndex(descendants, (item) => item.element === descendant.element);
  const previousDescendants = usePrevious$1(descendants);
  const someDescendantsHaveChanged = descendants.some((newDescendant, position) => {
    return previousDescendants && previousDescendants[position] && previousDescendants[position].element !== newDescendant.element;
  });
  useEnhancedEffect$1(() => {
    if (descendant.element) {
      registerDescendant(_extends$3({}, descendant, {
        index: index2
      }));
      return () => {
        unregisterDescendant(descendant.element);
      };
    }
    forceUpdate({});
    return void 0;
  }, [registerDescendant, unregisterDescendant, index2, someDescendantsHaveChanged, descendant]);
  return {
    parentId,
    index: index2
  };
}
function DescendantProvider(props) {
  const {
    children,
    id
  } = props;
  const [items, set] = react.exports.useState([]);
  const registerDescendant = react.exports.useCallback((_ref) => {
    let {
      element
    } = _ref, other = _objectWithoutPropertiesLoose$1(_ref, _excluded$5);
    set((oldItems) => {
      let newItems;
      if (oldItems.length === 0) {
        return [_extends$3({}, other, {
          element,
          index: 0
        })];
      }
      const index2 = binaryFindElement(oldItems, element);
      if (oldItems[index2] && oldItems[index2].element === element) {
        newItems = oldItems;
      } else {
        const newItem = _extends$3({}, other, {
          element,
          index: index2
        });
        newItems = oldItems.slice();
        newItems.splice(index2, 0, newItem);
      }
      newItems.forEach((item, position) => {
        item.index = position;
      });
      return newItems;
    });
  }, []);
  const unregisterDescendant = react.exports.useCallback((element) => {
    set((oldItems) => oldItems.filter((item) => element !== item.element));
  }, []);
  const value = react.exports.useMemo(() => ({
    descendants: items,
    registerDescendant,
    unregisterDescendant,
    parentId: id
  }), [items, registerDescendant, unregisterDescendant, id]);
  return /* @__PURE__ */ jsx(DescendantContext.Provider, {
    value,
    children
  });
}
function useTreeItem(nodeId) {
  const {
    focus,
    isExpanded,
    isExpandable,
    isFocused,
    isDisabled,
    isSelected,
    multiSelect,
    selectNode,
    selectRange,
    toggleExpansion
  } = react.exports.useContext(TreeViewContext$1);
  const expandable = isExpandable ? isExpandable(nodeId) : false;
  const expanded = isExpanded ? isExpanded(nodeId) : false;
  const focused = isFocused ? isFocused(nodeId) : false;
  const disabled = isDisabled ? isDisabled(nodeId) : false;
  const selected = isSelected ? isSelected(nodeId) : false;
  const handleExpansion = (event) => {
    if (!disabled) {
      if (!focused) {
        focus(event, nodeId);
      }
      const multiple = multiSelect && (event.shiftKey || event.ctrlKey || event.metaKey);
      if (expandable && !(multiple && isExpanded(nodeId))) {
        toggleExpansion(event, nodeId);
      }
    }
  };
  const handleSelection = (event) => {
    if (!disabled) {
      if (!focused) {
        focus(event, nodeId);
      }
      const multiple = multiSelect && (event.shiftKey || event.ctrlKey || event.metaKey);
      if (multiple) {
        if (event.shiftKey) {
          selectRange(event, {
            end: nodeId
          });
        } else {
          selectNode(event, nodeId, true);
        }
      } else {
        selectNode(event, nodeId);
      }
    }
  };
  const preventSelection = (event) => {
    if (event.shiftKey || event.ctrlKey || event.metaKey || disabled) {
      event.preventDefault();
    }
  };
  return {
    disabled,
    expanded,
    selected,
    focused,
    handleExpansion,
    handleSelection,
    preventSelection
  };
}
const _excluded$4 = ["classes", "className", "displayIcon", "expansionIcon", "icon", "label", "nodeId", "onClick", "onMouseDown"];
const TreeItemContent = /* @__PURE__ */ react.exports.forwardRef(function TreeItemContent2(props, ref) {
  const {
    classes,
    className,
    displayIcon,
    expansionIcon,
    icon: iconProp,
    label,
    nodeId,
    onClick,
    onMouseDown
  } = props, other = _objectWithoutPropertiesLoose$1(props, _excluded$4);
  const {
    disabled,
    expanded,
    selected,
    focused,
    handleExpansion,
    handleSelection,
    preventSelection
  } = useTreeItem(nodeId);
  const icon = iconProp || expansionIcon || displayIcon;
  const handleMouseDown = (event) => {
    preventSelection(event);
    if (onMouseDown) {
      onMouseDown(event);
    }
  };
  const handleClick = (event) => {
    handleExpansion(event);
    handleSelection(event);
    if (onClick) {
      onClick(event);
    }
  };
  return /* @__PURE__ */ jsxs("div", _extends$3({
    className: clsx(className, classes.root, expanded && classes.expanded, selected && classes.selected, focused && classes.focused, disabled && classes.disabled),
    onClick: handleClick,
    onMouseDown: handleMouseDown,
    ref
  }, other, {
    children: [/* @__PURE__ */ jsx("div", {
      className: classes.iconContainer,
      children: icon
    }), /* @__PURE__ */ jsx("div", {
      className: classes.label,
      children: label
    })]
  }));
});
var TreeItemContent$1 = TreeItemContent;
function getTreeItemUtilityClass(slot) {
  return generateUtilityClass("MuiTreeItem", slot);
}
const treeItemClasses = generateUtilityClasses("MuiTreeItem", ["root", "group", "content", "expanded", "selected", "focused", "disabled", "iconContainer", "label"]);
var treeItemClasses$1 = treeItemClasses;
const _excluded$3 = ["children", "className", "collapseIcon", "ContentComponent", "ContentProps", "endIcon", "expandIcon", "disabled", "icon", "id", "label", "nodeId", "onClick", "onMouseDown", "TransitionComponent", "TransitionProps"];
const useUtilityClasses$3 = (ownerState) => {
  const {
    classes
  } = ownerState;
  const slots = {
    root: ["root"],
    content: ["content"],
    expanded: ["expanded"],
    selected: ["selected"],
    focused: ["focused"],
    disabled: ["disabled"],
    iconContainer: ["iconContainer"],
    label: ["label"],
    group: ["group"]
  };
  return composeClasses(slots, getTreeItemUtilityClass, classes);
};
const TreeItemRoot = styled$3("li", {
  name: "MuiTreeItem",
  slot: "Root",
  overridesResolver: (props, styles2) => styles2.root
})({
  listStyle: "none",
  margin: 0,
  padding: 0,
  outline: 0
});
const StyledTreeItemContent = styled$3(TreeItemContent$1, {
  name: "MuiTreeItem",
  slot: "Content",
  overridesResolver: (props, styles2) => {
    return [styles2.content, styles2.iconContainer && {
      [`& .${treeItemClasses$1.iconContainer}`]: styles2.iconContainer
    }, styles2.label && {
      [`& .${treeItemClasses$1.label}`]: styles2.label
    }];
  }
})(({
  theme: theme2
}) => ({
  padding: "0 8px",
  width: "100%",
  display: "flex",
  alignItems: "center",
  cursor: "pointer",
  WebkitTapHighlightColor: "transparent",
  "&:hover": {
    backgroundColor: theme2.palette.action.hover,
    "@media (hover: none)": {
      backgroundColor: "transparent"
    }
  },
  [`&.${treeItemClasses$1.disabled}`]: {
    opacity: theme2.palette.action.disabledOpacity,
    backgroundColor: "transparent"
  },
  [`&.${treeItemClasses$1.focused}`]: {
    backgroundColor: theme2.palette.action.focus
  },
  [`&.${treeItemClasses$1.selected}`]: {
    backgroundColor: alpha(theme2.palette.primary.main, theme2.palette.action.selectedOpacity),
    "&:hover": {
      backgroundColor: alpha(theme2.palette.primary.main, theme2.palette.action.selectedOpacity + theme2.palette.action.hoverOpacity),
      "@media (hover: none)": {
        backgroundColor: alpha(theme2.palette.primary.main, theme2.palette.action.selectedOpacity)
      }
    },
    [`&.${treeItemClasses$1.focused}`]: {
      backgroundColor: alpha(theme2.palette.primary.main, theme2.palette.action.selectedOpacity + theme2.palette.action.focusOpacity)
    }
  },
  [`& .${treeItemClasses$1.iconContainer}`]: {
    marginRight: 4,
    width: 15,
    display: "flex",
    flexShrink: 0,
    justifyContent: "center",
    "& svg": {
      fontSize: 18
    }
  },
  [`& .${treeItemClasses$1.label}`]: _extends$3({
    width: "100%",
    minWidth: 0,
    paddingLeft: 4,
    position: "relative"
  }, theme2.typography.body1)
}));
const TreeItemGroup = styled$3(Collapse$1, {
  name: "MuiTreeItem",
  slot: "Group",
  overridesResolver: (props, styles2) => styles2.group
})({
  margin: 0,
  padding: 0,
  marginLeft: 17
});
const TreeItem = /* @__PURE__ */ react.exports.forwardRef(function TreeItem2(inProps, ref) {
  const props = useThemeProps({
    props: inProps,
    name: "MuiTreeItem"
  });
  const {
    children,
    className,
    collapseIcon,
    ContentComponent = TreeItemContent$1,
    ContentProps,
    endIcon,
    expandIcon,
    disabled: disabledProp,
    icon,
    id: idProp,
    label,
    nodeId,
    onClick,
    onMouseDown,
    TransitionComponent = Collapse$1,
    TransitionProps
  } = props, other = _objectWithoutPropertiesLoose$1(props, _excluded$3);
  const {
    icons: contextIcons = {},
    focus,
    isExpanded,
    isFocused,
    isSelected,
    isDisabled,
    multiSelect,
    disabledItemsFocusable,
    mapFirstChar,
    unMapFirstChar,
    registerNode,
    unregisterNode,
    treeId
  } = react.exports.useContext(TreeViewContext$1);
  let id = null;
  if (idProp != null) {
    id = idProp;
  } else if (treeId && nodeId) {
    id = `${treeId}-${nodeId}`;
  }
  const [treeitemElement, setTreeitemElement] = react.exports.useState(null);
  const contentRef = react.exports.useRef(null);
  const handleRef = useForkRef(setTreeitemElement, ref);
  const descendant = react.exports.useMemo(() => ({
    element: treeitemElement,
    id: nodeId
  }), [nodeId, treeitemElement]);
  const {
    index: index2,
    parentId
  } = useDescendant(descendant);
  const expandable = Boolean(Array.isArray(children) ? children.length : children);
  const expanded = isExpanded ? isExpanded(nodeId) : false;
  const focused = isFocused ? isFocused(nodeId) : false;
  const selected = isSelected ? isSelected(nodeId) : false;
  const disabled = isDisabled ? isDisabled(nodeId) : false;
  const ownerState = _extends$3({}, props, {
    expanded,
    focused,
    selected,
    disabled
  });
  const classes = useUtilityClasses$3(ownerState);
  let displayIcon;
  let expansionIcon;
  if (expandable) {
    if (!expanded) {
      expansionIcon = expandIcon || contextIcons.defaultExpandIcon;
    } else {
      expansionIcon = collapseIcon || contextIcons.defaultCollapseIcon;
    }
  }
  if (expandable) {
    displayIcon = contextIcons.defaultParentIcon;
  } else {
    displayIcon = endIcon || contextIcons.defaultEndIcon;
  }
  react.exports.useEffect(() => {
    if (registerNode && unregisterNode && index2 !== -1) {
      registerNode({
        id: nodeId,
        idAttribute: id,
        index: index2,
        parentId,
        expandable,
        disabled: disabledProp
      });
      return () => {
        unregisterNode(nodeId);
      };
    }
    return void 0;
  }, [registerNode, unregisterNode, parentId, index2, nodeId, expandable, disabledProp, id]);
  react.exports.useEffect(() => {
    if (mapFirstChar && unMapFirstChar && label) {
      mapFirstChar(nodeId, contentRef.current.textContent.substring(0, 1).toLowerCase());
      return () => {
        unMapFirstChar(nodeId);
      };
    }
    return void 0;
  }, [mapFirstChar, unMapFirstChar, nodeId, label]);
  let ariaSelected;
  if (multiSelect) {
    ariaSelected = selected;
  } else if (selected) {
    ariaSelected = true;
  }
  function handleFocus(event) {
    if (event.target === event.currentTarget) {
      ownerDocument(event.target).getElementById(treeId).focus({
        preventScroll: true
      });
    }
    const unfocusable = !disabledItemsFocusable && disabled;
    if (!focused && event.currentTarget === event.target && !unfocusable) {
      focus(event, nodeId);
    }
  }
  return /* @__PURE__ */ jsxs(TreeItemRoot, _extends$3({
    className: clsx(classes.root, className),
    role: "treeitem",
    "aria-expanded": expandable ? expanded : null,
    "aria-selected": ariaSelected,
    "aria-disabled": disabled || null,
    ref: handleRef,
    id,
    tabIndex: -1
  }, other, {
    ownerState,
    onFocus: handleFocus,
    children: [/* @__PURE__ */ jsx(StyledTreeItemContent, _extends$3({
      as: ContentComponent,
      ref: contentRef,
      classes: {
        root: classes.content,
        expanded: classes.expanded,
        selected: classes.selected,
        focused: classes.focused,
        disabled: classes.disabled,
        iconContainer: classes.iconContainer,
        label: classes.label
      },
      label,
      nodeId,
      onClick,
      onMouseDown,
      icon,
      expansionIcon,
      displayIcon,
      ownerState
    }, ContentProps)), children && /* @__PURE__ */ jsx(DescendantProvider, {
      id: nodeId,
      children: /* @__PURE__ */ jsx(TreeItemGroup, _extends$3({
        as: TransitionComponent,
        unmountOnExit: true,
        className: classes.group,
        in: expanded,
        component: "ul",
        role: "group"
      }, TransitionProps, {
        children
      }))
    })]
  }));
});
var TreeItem$1 = TreeItem;
function getTreeViewUtilityClass(slot) {
  return generateUtilityClass("MuiTreeView", slot);
}
generateUtilityClasses("MuiTreeView", ["root"]);
const _excluded$2 = ["children", "className", "defaultCollapseIcon", "defaultEndIcon", "defaultExpanded", "defaultExpandIcon", "defaultParentIcon", "defaultSelected", "disabledItemsFocusable", "disableSelection", "expanded", "id", "multiSelect", "onBlur", "onFocus", "onKeyDown", "onNodeFocus", "onNodeSelect", "onNodeToggle", "selected"];
const useUtilityClasses$2 = (ownerState) => {
  const {
    classes
  } = ownerState;
  const slots = {
    root: ["root"]
  };
  return composeClasses(slots, getTreeViewUtilityClass, classes);
};
const TreeViewRoot = styled$3("ul", {
  name: "MuiTreeView",
  slot: "Root",
  overridesResolver: (props, styles2) => styles2.root
})({
  padding: 0,
  margin: 0,
  listStyle: "none",
  outline: 0
});
function isPrintableCharacter(string) {
  return string && string.length === 1 && string.match(/\S/);
}
function findNextFirstChar(firstChars, startIndex, char) {
  for (let i = startIndex; i < firstChars.length; i += 1) {
    if (char === firstChars[i]) {
      return i;
    }
  }
  return -1;
}
function noopSelection() {
  return false;
}
const defaultDefaultExpanded = [];
const defaultDefaultSelected = [];
const TreeView = /* @__PURE__ */ react.exports.forwardRef(function TreeView2(inProps, ref) {
  const props = useThemeProps({
    props: inProps,
    name: "MuiTreeView"
  });
  const {
    children,
    className,
    defaultCollapseIcon,
    defaultEndIcon,
    defaultExpanded = defaultDefaultExpanded,
    defaultExpandIcon,
    defaultParentIcon,
    defaultSelected = defaultDefaultSelected,
    disabledItemsFocusable = false,
    disableSelection = false,
    expanded: expandedProp,
    id: idProp,
    multiSelect = false,
    onBlur,
    onFocus,
    onKeyDown,
    onNodeFocus,
    onNodeSelect,
    onNodeToggle,
    selected: selectedProp
  } = props, other = _objectWithoutPropertiesLoose$1(props, _excluded$2);
  const theme2 = useTheme();
  const isRtl = theme2.direction === "rtl";
  const ownerState = _extends$3({}, props, {
    defaultExpanded,
    defaultSelected,
    disabledItemsFocusable,
    disableSelection,
    multiSelect
  });
  const classes = useUtilityClasses$2(ownerState);
  const treeId = useId(idProp);
  const treeRef = react.exports.useRef(null);
  const handleRef = useForkRef(treeRef, ref);
  const [focusedNodeId, setFocusedNodeId] = react.exports.useState(null);
  const nodeMap = react.exports.useRef({});
  const firstCharMap = react.exports.useRef({});
  const [expanded, setExpandedState] = useControlled({
    controlled: expandedProp,
    default: defaultExpanded,
    name: "TreeView",
    state: "expanded"
  });
  const [selected, setSelectedState] = useControlled({
    controlled: selectedProp,
    default: defaultSelected,
    name: "TreeView",
    state: "selected"
  });
  const isExpanded = react.exports.useCallback((id) => Array.isArray(expanded) ? expanded.indexOf(id) !== -1 : false, [expanded]);
  const isExpandable = react.exports.useCallback((id) => nodeMap.current[id] && nodeMap.current[id].expandable, []);
  const isSelected = react.exports.useCallback((id) => Array.isArray(selected) ? selected.indexOf(id) !== -1 : selected === id, [selected]);
  const isDisabled = react.exports.useCallback((id) => {
    let node = nodeMap.current[id];
    if (!node) {
      return false;
    }
    if (node.disabled) {
      return true;
    }
    while (node.parentId != null) {
      node = nodeMap.current[node.parentId];
      if (node.disabled) {
        return true;
      }
    }
    return false;
  }, []);
  const isFocused = (id) => focusedNodeId === id;
  const getChildrenIds = (id) => Object.keys(nodeMap.current).map((key) => {
    return nodeMap.current[key];
  }).filter((node) => node.parentId === id).sort((a, b2) => a.index - b2.index).map((child) => child.id);
  const getNavigableChildrenIds = (id) => {
    let childrenIds = getChildrenIds(id);
    if (!disabledItemsFocusable) {
      childrenIds = childrenIds.filter((node) => !isDisabled(node));
    }
    return childrenIds;
  };
  const getNextNode = (id) => {
    if (isExpanded(id) && getNavigableChildrenIds(id).length > 0) {
      return getNavigableChildrenIds(id)[0];
    }
    let node = nodeMap.current[id];
    while (node != null) {
      const siblings = getNavigableChildrenIds(node.parentId);
      const nextSibling = siblings[siblings.indexOf(node.id) + 1];
      if (nextSibling) {
        return nextSibling;
      }
      node = nodeMap.current[node.parentId];
    }
    return null;
  };
  const getPreviousNode = (id) => {
    const node = nodeMap.current[id];
    const siblings = getNavigableChildrenIds(node.parentId);
    const nodeIndex = siblings.indexOf(id);
    if (nodeIndex === 0) {
      return node.parentId;
    }
    let currentNode = siblings[nodeIndex - 1];
    while (isExpanded(currentNode) && getNavigableChildrenIds(currentNode).length > 0) {
      currentNode = getNavigableChildrenIds(currentNode).pop();
    }
    return currentNode;
  };
  const getLastNode = () => {
    let lastNode = getNavigableChildrenIds(null).pop();
    while (isExpanded(lastNode)) {
      lastNode = getNavigableChildrenIds(lastNode).pop();
    }
    return lastNode;
  };
  const getFirstNode = () => getNavigableChildrenIds(null)[0];
  const getParent = (id) => nodeMap.current[id].parentId;
  const findOrderInTremauxTree = (nodeAId, nodeBId) => {
    if (nodeAId === nodeBId) {
      return [nodeAId, nodeBId];
    }
    const nodeA = nodeMap.current[nodeAId];
    const nodeB = nodeMap.current[nodeBId];
    if (nodeA.parentId === nodeB.id || nodeB.parentId === nodeA.id) {
      return nodeB.parentId === nodeA.id ? [nodeA.id, nodeB.id] : [nodeB.id, nodeA.id];
    }
    const aFamily = [nodeA.id];
    const bFamily = [nodeB.id];
    let aAncestor = nodeA.parentId;
    let bAncestor = nodeB.parentId;
    let aAncestorIsCommon = bFamily.indexOf(aAncestor) !== -1;
    let bAncestorIsCommon = aFamily.indexOf(bAncestor) !== -1;
    let continueA = true;
    let continueB = true;
    while (!bAncestorIsCommon && !aAncestorIsCommon) {
      if (continueA) {
        aFamily.push(aAncestor);
        aAncestorIsCommon = bFamily.indexOf(aAncestor) !== -1;
        continueA = aAncestor !== null;
        if (!aAncestorIsCommon && continueA) {
          aAncestor = nodeMap.current[aAncestor].parentId;
        }
      }
      if (continueB && !aAncestorIsCommon) {
        bFamily.push(bAncestor);
        bAncestorIsCommon = aFamily.indexOf(bAncestor) !== -1;
        continueB = bAncestor !== null;
        if (!bAncestorIsCommon && continueB) {
          bAncestor = nodeMap.current[bAncestor].parentId;
        }
      }
    }
    const commonAncestor = aAncestorIsCommon ? aAncestor : bAncestor;
    const ancestorFamily = getChildrenIds(commonAncestor);
    const aSide = aFamily[aFamily.indexOf(commonAncestor) - 1];
    const bSide = bFamily[bFamily.indexOf(commonAncestor) - 1];
    return ancestorFamily.indexOf(aSide) < ancestorFamily.indexOf(bSide) ? [nodeAId, nodeBId] : [nodeBId, nodeAId];
  };
  const getNodesInRange = (nodeA, nodeB) => {
    const [first, last2] = findOrderInTremauxTree(nodeA, nodeB);
    const nodes = [first];
    let current = first;
    while (current !== last2) {
      current = getNextNode(current);
      nodes.push(current);
    }
    return nodes;
  };
  const focus = (event, id) => {
    if (id) {
      setFocusedNodeId(id);
      if (onNodeFocus) {
        onNodeFocus(event, id);
      }
    }
  };
  const focusNextNode = (event, id) => focus(event, getNextNode(id));
  const focusPreviousNode = (event, id) => focus(event, getPreviousNode(id));
  const focusFirstNode = (event) => focus(event, getFirstNode());
  const focusLastNode = (event) => focus(event, getLastNode());
  const focusByFirstCharacter = (event, id, char) => {
    let start2;
    let index2;
    const lowercaseChar = char.toLowerCase();
    const firstCharIds = [];
    const firstChars = [];
    Object.keys(firstCharMap.current).forEach((nodeId) => {
      const firstChar = firstCharMap.current[nodeId];
      const map2 = nodeMap.current[nodeId];
      const visible = map2.parentId ? isExpanded(map2.parentId) : true;
      const shouldBeSkipped = disabledItemsFocusable ? false : isDisabled(nodeId);
      if (visible && !shouldBeSkipped) {
        firstCharIds.push(nodeId);
        firstChars.push(firstChar);
      }
    });
    start2 = firstCharIds.indexOf(id) + 1;
    if (start2 >= firstCharIds.length) {
      start2 = 0;
    }
    index2 = findNextFirstChar(firstChars, start2, lowercaseChar);
    if (index2 === -1) {
      index2 = findNextFirstChar(firstChars, 0, lowercaseChar);
    }
    if (index2 > -1) {
      focus(event, firstCharIds[index2]);
    }
  };
  const toggleExpansion = (event, value = focusedNodeId) => {
    let newExpanded;
    if (expanded.indexOf(value) !== -1) {
      newExpanded = expanded.filter((id) => id !== value);
    } else {
      newExpanded = [value].concat(expanded);
    }
    if (onNodeToggle) {
      onNodeToggle(event, newExpanded);
    }
    setExpandedState(newExpanded);
  };
  const expandAllSiblings = (event, id) => {
    const map2 = nodeMap.current[id];
    const siblings = getChildrenIds(map2.parentId);
    const diff = siblings.filter((child) => isExpandable(child) && !isExpanded(child));
    const newExpanded = expanded.concat(diff);
    if (diff.length > 0) {
      setExpandedState(newExpanded);
      if (onNodeToggle) {
        onNodeToggle(event, newExpanded);
      }
    }
  };
  const lastSelectedNode = react.exports.useRef(null);
  const lastSelectionWasRange = react.exports.useRef(false);
  const currentRangeSelection = react.exports.useRef([]);
  const handleRangeArrowSelect = (event, nodes) => {
    let base = selected.slice();
    const {
      start: start2,
      next,
      current
    } = nodes;
    if (!next || !current) {
      return;
    }
    if (currentRangeSelection.current.indexOf(current) === -1) {
      currentRangeSelection.current = [];
    }
    if (lastSelectionWasRange.current) {
      if (currentRangeSelection.current.indexOf(next) !== -1) {
        base = base.filter((id) => id === start2 || id !== current);
        currentRangeSelection.current = currentRangeSelection.current.filter((id) => id === start2 || id !== current);
      } else {
        base.push(next);
        currentRangeSelection.current.push(next);
      }
    } else {
      base.push(next);
      currentRangeSelection.current.push(current, next);
    }
    if (onNodeSelect) {
      onNodeSelect(event, base);
    }
    setSelectedState(base);
  };
  const handleRangeSelect = (event, nodes) => {
    let base = selected.slice();
    const {
      start: start2,
      end: end2
    } = nodes;
    if (lastSelectionWasRange.current) {
      base = base.filter((id) => currentRangeSelection.current.indexOf(id) === -1);
    }
    let range = getNodesInRange(start2, end2);
    range = range.filter((node) => !isDisabled(node));
    currentRangeSelection.current = range;
    let newSelected = base.concat(range);
    newSelected = newSelected.filter((id, i) => newSelected.indexOf(id) === i);
    if (onNodeSelect) {
      onNodeSelect(event, newSelected);
    }
    setSelectedState(newSelected);
  };
  const handleMultipleSelect = (event, value) => {
    let newSelected;
    if (selected.indexOf(value) !== -1) {
      newSelected = selected.filter((id) => id !== value);
    } else {
      newSelected = [value].concat(selected);
    }
    if (onNodeSelect) {
      onNodeSelect(event, newSelected);
    }
    setSelectedState(newSelected);
  };
  const handleSingleSelect = (event, value) => {
    const newSelected = multiSelect ? [value] : value;
    if (onNodeSelect) {
      onNodeSelect(event, newSelected);
    }
    setSelectedState(newSelected);
  };
  const selectNode = (event, id, multiple = false) => {
    if (id) {
      if (multiple) {
        handleMultipleSelect(event, id);
      } else {
        handleSingleSelect(event, id);
      }
      lastSelectedNode.current = id;
      lastSelectionWasRange.current = false;
      currentRangeSelection.current = [];
      return true;
    }
    return false;
  };
  const selectRange = (event, nodes, stacked = false) => {
    const {
      start: start2 = lastSelectedNode.current,
      end: end2,
      current
    } = nodes;
    if (stacked) {
      handleRangeArrowSelect(event, {
        start: start2,
        next: end2,
        current
      });
    } else if (start2 != null && end2 != null) {
      handleRangeSelect(event, {
        start: start2,
        end: end2
      });
    }
    lastSelectionWasRange.current = true;
  };
  const rangeSelectToFirst = (event, id) => {
    if (!lastSelectedNode.current) {
      lastSelectedNode.current = id;
    }
    const start2 = lastSelectionWasRange.current ? lastSelectedNode.current : id;
    selectRange(event, {
      start: start2,
      end: getFirstNode()
    });
  };
  const rangeSelectToLast = (event, id) => {
    if (!lastSelectedNode.current) {
      lastSelectedNode.current = id;
    }
    const start2 = lastSelectionWasRange.current ? lastSelectedNode.current : id;
    selectRange(event, {
      start: start2,
      end: getLastNode()
    });
  };
  const selectNextNode = (event, id) => {
    if (!isDisabled(getNextNode(id))) {
      selectRange(event, {
        end: getNextNode(id),
        current: id
      }, true);
    }
  };
  const selectPreviousNode = (event, id) => {
    if (!isDisabled(getPreviousNode(id))) {
      selectRange(event, {
        end: getPreviousNode(id),
        current: id
      }, true);
    }
  };
  const selectAllNodes = (event) => {
    selectRange(event, {
      start: getFirstNode(),
      end: getLastNode()
    });
  };
  const registerNode = react.exports.useCallback((node) => {
    const {
      id,
      index: index2,
      parentId,
      expandable,
      idAttribute,
      disabled
    } = node;
    nodeMap.current[id] = {
      id,
      index: index2,
      parentId,
      expandable,
      idAttribute,
      disabled
    };
  }, []);
  const unregisterNode = react.exports.useCallback((id) => {
    const newMap = _extends$3({}, nodeMap.current);
    delete newMap[id];
    nodeMap.current = newMap;
    setFocusedNodeId((oldFocusedNodeId) => {
      if (oldFocusedNodeId === id && treeRef.current === ownerDocument(treeRef.current).activeElement) {
        return getChildrenIds(null)[0];
      }
      return oldFocusedNodeId;
    });
  }, []);
  const mapFirstChar = react.exports.useCallback((id, firstChar) => {
    firstCharMap.current[id] = firstChar;
  }, []);
  const unMapFirstChar = react.exports.useCallback((id) => {
    const newMap = _extends$3({}, firstCharMap.current);
    delete newMap[id];
    firstCharMap.current = newMap;
  }, []);
  const handleNextArrow = (event) => {
    if (isExpandable(focusedNodeId)) {
      if (isExpanded(focusedNodeId)) {
        focusNextNode(event, focusedNodeId);
      } else if (!isDisabled(focusedNodeId)) {
        toggleExpansion(event);
      }
    }
    return true;
  };
  const handlePreviousArrow = (event) => {
    if (isExpanded(focusedNodeId) && !isDisabled(focusedNodeId)) {
      toggleExpansion(event, focusedNodeId);
      return true;
    }
    const parent = getParent(focusedNodeId);
    if (parent) {
      focus(event, parent);
      return true;
    }
    return false;
  };
  const handleKeyDown2 = (event) => {
    let flag = false;
    const key = event.key;
    if (event.altKey || event.currentTarget !== event.target || !focusedNodeId) {
      return;
    }
    const ctrlPressed = event.ctrlKey || event.metaKey;
    switch (key) {
      case " ":
        if (!disableSelection && !isDisabled(focusedNodeId)) {
          if (multiSelect && event.shiftKey) {
            selectRange(event, {
              end: focusedNodeId
            });
            flag = true;
          } else if (multiSelect) {
            flag = selectNode(event, focusedNodeId, true);
          } else {
            flag = selectNode(event, focusedNodeId);
          }
        }
        event.stopPropagation();
        break;
      case "Enter":
        if (!isDisabled(focusedNodeId)) {
          if (isExpandable(focusedNodeId)) {
            toggleExpansion(event);
            flag = true;
          }
        }
        event.stopPropagation();
        break;
      case "ArrowDown":
        if (multiSelect && event.shiftKey && !disableSelection) {
          selectNextNode(event, focusedNodeId);
        }
        focusNextNode(event, focusedNodeId);
        flag = true;
        break;
      case "ArrowUp":
        if (multiSelect && event.shiftKey && !disableSelection) {
          selectPreviousNode(event, focusedNodeId);
        }
        focusPreviousNode(event, focusedNodeId);
        flag = true;
        break;
      case "ArrowRight":
        if (isRtl) {
          flag = handlePreviousArrow(event);
        } else {
          flag = handleNextArrow(event);
        }
        break;
      case "ArrowLeft":
        if (isRtl) {
          flag = handleNextArrow(event);
        } else {
          flag = handlePreviousArrow(event);
        }
        break;
      case "Home":
        if (multiSelect && ctrlPressed && event.shiftKey && !disableSelection && !isDisabled(focusedNodeId)) {
          rangeSelectToFirst(event, focusedNodeId);
        }
        focusFirstNode(event);
        flag = true;
        break;
      case "End":
        if (multiSelect && ctrlPressed && event.shiftKey && !disableSelection && !isDisabled(focusedNodeId)) {
          rangeSelectToLast(event, focusedNodeId);
        }
        focusLastNode(event);
        flag = true;
        break;
      default:
        if (key === "*") {
          expandAllSiblings(event, focusedNodeId);
          flag = true;
        } else if (multiSelect && ctrlPressed && key.toLowerCase() === "a" && !disableSelection) {
          selectAllNodes(event);
          flag = true;
        } else if (!ctrlPressed && !event.shiftKey && isPrintableCharacter(key)) {
          focusByFirstCharacter(event, focusedNodeId, key);
          flag = true;
        }
    }
    if (flag) {
      event.preventDefault();
      event.stopPropagation();
    }
    if (onKeyDown) {
      onKeyDown(event);
    }
  };
  const handleFocus = (event) => {
    if (event.target === event.currentTarget) {
      const firstSelected = Array.isArray(selected) ? selected[0] : selected;
      focus(event, firstSelected || getNavigableChildrenIds(null)[0]);
    }
    if (onFocus) {
      onFocus(event);
    }
  };
  const handleBlur = (event) => {
    setFocusedNodeId(null);
    if (onBlur) {
      onBlur(event);
    }
  };
  const activeDescendant = nodeMap.current[focusedNodeId] ? nodeMap.current[focusedNodeId].idAttribute : null;
  return /* @__PURE__ */ jsx(TreeViewContext$1.Provider, {
    value: {
      icons: {
        defaultCollapseIcon,
        defaultExpandIcon,
        defaultParentIcon,
        defaultEndIcon
      },
      focus,
      toggleExpansion,
      isExpanded,
      isExpandable,
      isFocused,
      isSelected,
      isDisabled,
      selectNode: disableSelection ? noopSelection : selectNode,
      selectRange: disableSelection ? noopSelection : selectRange,
      multiSelect,
      disabledItemsFocusable,
      mapFirstChar,
      unMapFirstChar,
      registerNode,
      unregisterNode,
      treeId
    },
    children: /* @__PURE__ */ jsx(DescendantProvider, {
      children: /* @__PURE__ */ jsx(TreeViewRoot, _extends$3({
        role: "tree",
        id: treeId,
        "aria-activedescendant": activeDescendant,
        "aria-multiselectable": multiSelect,
        className: clsx(classes.root, className),
        ref: handleRef,
        tabIndex: 0,
        onKeyDown: handleKeyDown2,
        onFocus: handleFocus,
        onBlur: handleBlur,
        ownerState
      }, other, {
        children
      }))
    })
  });
});
var TreeView$1 = TreeView;
function getFabUtilityClass(slot) {
  return generateUtilityClass("MuiFab", slot);
}
const fabClasses = generateUtilityClasses("MuiFab", ["root", "primary", "secondary", "extended", "circular", "focusVisible", "disabled", "colorInherit", "sizeSmall", "sizeMedium", "sizeLarge"]);
var fabClasses$1 = fabClasses;
const _excluded$1 = ["children", "className", "color", "component", "disabled", "disableFocusRipple", "focusVisibleClassName", "size", "variant"];
const useUtilityClasses$1 = (ownerState) => {
  const {
    color,
    variant,
    classes,
    size
  } = ownerState;
  const slots = {
    root: ["root", variant, `size${capitalize(size)}`, color === "inherit" && "colorInherit", color === "primary" && "primary", color === "secondary" && "secondary"]
  };
  return composeClasses(slots, getFabUtilityClass, classes);
};
const FabRoot = styled$3(ButtonBase$1, {
  name: "MuiFab",
  slot: "Root",
  overridesResolver: (props, styles2) => {
    const {
      ownerState
    } = props;
    return [styles2.root, styles2[ownerState.variant], styles2[`size${capitalize(ownerState.size)}`], ownerState.color === "inherit" && styles2.colorInherit, ownerState.color === "primary" && styles2.primary, ownerState.color === "secondary" && styles2.secondary];
  }
})(({
  theme: theme2,
  ownerState
}) => _extends$3({}, theme2.typography.button, {
  minHeight: 36,
  transition: theme2.transitions.create(["background-color", "box-shadow", "border-color"], {
    duration: theme2.transitions.duration.short
  }),
  borderRadius: "50%",
  padding: 0,
  minWidth: 0,
  width: 56,
  height: 56,
  boxShadow: theme2.shadows[6],
  "&:active": {
    boxShadow: theme2.shadows[12]
  },
  color: theme2.palette.getContrastText(theme2.palette.grey[300]),
  backgroundColor: theme2.palette.grey[300],
  "&:hover": {
    backgroundColor: theme2.palette.grey.A100,
    "@media (hover: none)": {
      backgroundColor: theme2.palette.grey[300]
    },
    textDecoration: "none"
  },
  [`&.${fabClasses$1.focusVisible}`]: {
    boxShadow: theme2.shadows[6]
  },
  [`&.${fabClasses$1.disabled}`]: {
    color: theme2.palette.action.disabled,
    boxShadow: theme2.shadows[0],
    backgroundColor: theme2.palette.action.disabledBackground
  }
}, ownerState.size === "small" && {
  width: 40,
  height: 40
}, ownerState.size === "medium" && {
  width: 48,
  height: 48
}, ownerState.variant === "extended" && {
  borderRadius: 48 / 2,
  padding: "0 16px",
  width: "auto",
  minHeight: "auto",
  minWidth: 48,
  height: 48
}, ownerState.variant === "extended" && ownerState.size === "small" && {
  width: "auto",
  padding: "0 8px",
  borderRadius: 34 / 2,
  minWidth: 34,
  height: 34
}, ownerState.variant === "extended" && ownerState.size === "medium" && {
  width: "auto",
  padding: "0 16px",
  borderRadius: 40 / 2,
  minWidth: 40,
  height: 40
}, ownerState.color === "inherit" && {
  color: "inherit"
}), ({
  theme: theme2,
  ownerState
}) => _extends$3({}, ownerState.color === "primary" && {
  color: theme2.palette.primary.contrastText,
  backgroundColor: theme2.palette.primary.main,
  "&:hover": {
    backgroundColor: theme2.palette.primary.dark,
    "@media (hover: none)": {
      backgroundColor: theme2.palette.primary.main
    }
  }
}, ownerState.color === "secondary" && {
  color: theme2.palette.secondary.contrastText,
  backgroundColor: theme2.palette.secondary.main,
  "&:hover": {
    backgroundColor: theme2.palette.secondary.dark,
    "@media (hover: none)": {
      backgroundColor: theme2.palette.secondary.main
    }
  }
}));
const Fab = /* @__PURE__ */ react.exports.forwardRef(function Fab2(inProps, ref) {
  const props = useThemeProps({
    props: inProps,
    name: "MuiFab"
  });
  const {
    children,
    className,
    color = "default",
    component = "button",
    disabled = false,
    disableFocusRipple = false,
    focusVisibleClassName,
    size = "large",
    variant = "circular"
  } = props, other = _objectWithoutPropertiesLoose$1(props, _excluded$1);
  const ownerState = _extends$3({}, props, {
    color,
    component,
    disabled,
    disableFocusRipple,
    size,
    variant
  });
  const classes = useUtilityClasses$1(ownerState);
  return /* @__PURE__ */ jsx(FabRoot, _extends$3({
    className: clsx(classes.root, className),
    component,
    disabled,
    focusRipple: !disableFocusRipple,
    focusVisibleClassName: clsx(classes.focusVisible, focusVisibleClassName),
    ownerState,
    ref
  }, other, {
    children
  }));
});
var Fab$1 = Fab;
const _excluded = ["className", "children", "classes", "IconComponent", "input", "inputProps", "variant"], _excluded2 = ["root"];
const useUtilityClasses = (ownerState) => {
  const {
    classes
  } = ownerState;
  const slots = {
    root: ["root"]
  };
  return composeClasses(slots, getNativeSelectUtilityClasses, classes);
};
const defaultInput = /* @__PURE__ */ jsx(Input$1, {});
const NativeSelect = /* @__PURE__ */ react.exports.forwardRef(function NativeSelect2(inProps, ref) {
  const props = useThemeProps({
    name: "MuiNativeSelect",
    props: inProps
  });
  const {
    className,
    children,
    classes: classesProp = {},
    IconComponent = ArrowDropDownIcon,
    input = defaultInput,
    inputProps
  } = props, other = _objectWithoutPropertiesLoose$1(props, _excluded);
  const muiFormControl = useFormControl();
  const fcs = formControlState({
    props,
    muiFormControl,
    states: ["variant"]
  });
  const ownerState = _extends$3({}, props, {
    classes: classesProp
  });
  const classes = useUtilityClasses(ownerState);
  const otherClasses = _objectWithoutPropertiesLoose$1(classesProp, _excluded2);
  return /* @__PURE__ */ react.exports.cloneElement(input, _extends$3({
    inputComponent: NativeSelectInput$1,
    inputProps: _extends$3({
      children,
      classes: otherClasses,
      IconComponent,
      variant: fcs.variant,
      type: void 0
    }, inputProps, input ? input.props.inputProps : {}),
    ref
  }, other, {
    className: clsx(classes.root, input.props.className, className)
  }));
});
NativeSelect.muiName = "Select";
var NativeSelect$1 = NativeSelect;
function useMediaQuery(queryInput, options = {}) {
  const theme2 = useTheme$3();
  const supportMatchMedia = typeof window !== "undefined" && typeof window.matchMedia !== "undefined";
  const {
    defaultMatches = false,
    matchMedia = supportMatchMedia ? window.matchMedia : null,
    noSsr = false,
    ssrMatchMedia = null
  } = getThemeProps({
    name: "MuiUseMediaQuery",
    props: options,
    theme: theme2
  });
  let query = typeof queryInput === "function" ? queryInput(theme2) : queryInput;
  query = query.replace(/^@media( ?)/m, "");
  const [match, setMatch] = react.exports.useState(() => {
    if (noSsr && supportMatchMedia) {
      return matchMedia(query).matches;
    }
    if (ssrMatchMedia) {
      return ssrMatchMedia(query).matches;
    }
    return defaultMatches;
  });
  useEnhancedEffect$1(() => {
    let active = true;
    if (!supportMatchMedia) {
      return void 0;
    }
    const queryList = matchMedia(query);
    const updateMatch = () => {
      if (active) {
        setMatch(queryList.matches);
      }
    };
    updateMatch();
    queryList.addListener(updateMatch);
    return () => {
      active = false;
      queryList.removeListener(updateMatch);
    };
  }, [query, matchMedia, supportMatchMedia]);
  return match;
}
const RenderTree = React.memo(({
  content
}) => {
  const renderContent = (contentIn) => {
    return contentIn.map((item) => {
      return /* @__PURE__ */ jsx(TreeItem$1, {
        nodeId: item.slug,
        label: item.name,
        children: renderContent(item.children)
      }, item.slug);
    });
  };
  return /* @__PURE__ */ jsx(react.exports.Fragment, {
    children: content.map((item) => {
      return /* @__PURE__ */ jsx(TreeItem$1, {
        nodeId: item.slug,
        label: item.name,
        children: renderContent(item.children)
      }, item.slug);
    })
  });
});
const createTree = (contents, project) => {
  const root = {
    depth: -1,
    parent: null,
    children: []
  };
  let current = root;
  contents.forEach((content) => {
    const depth = content.depth;
    const newItem = __spreadProps(__spreadValues({}, content), {
      depth,
      children: [],
      parent: null
    });
    if (depth <= current.depth) {
      while (depth <= current.depth) {
        current = current.parent;
      }
    }
    newItem.parent = current;
    current.children.push(newItem);
    current = newItem;
  });
  return root.children;
};
const SidebarWrapper = default_1$e(Grid$1)(({
  theme: theme2
}) => ({
  flexGrow: 1,
  maxWidth: 400,
  position: "sticky",
  top: 60,
  "&.editor-sidebar": {
    top: 0,
    padding: "10px",
    display: "block",
    width: "200px"
  },
  [".menu-button"]: {
    display: "none",
    position: "fixed",
    right: 20,
    bottom: 20
  },
  ".MuiTreeItem-label": {
    paddingTop: "0.25em",
    paddingBottom: "0.25em",
    lineHeight: "1.3em !important",
    wordBreak: "break-word"
  },
  [theme2.breakpoints.down("sm")]: {
    paddingRight: 20,
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-start",
    flexDirection: "column",
    position: "fixed",
    top: "55px",
    width: "100%",
    maxWidth: "100%",
    flexBasis: "initial",
    height: "0%",
    padingRight: "10px",
    backgroundColor: theme2.palette.mode === "light" ? "#fff" : "#1c2128",
    overflow: "hidden",
    transition: "height .3s ease",
    ["&.show"]: {
      height: "100%"
    },
    [" .menu-button"]: {
      display: "flex"
    },
    ["& > * > *"]: {
      width: "100%"
    },
    ["ul *, form *, .MuiBox-root *"]: {
      fontSize: "1.2rem !important"
    }
  }
}));
var SIDEBAR_MODE;
(function(SIDEBAR_MODE2) {
  SIDEBAR_MODE2[SIDEBAR_MODE2["DOCS"] = 0] = "DOCS";
  SIDEBAR_MODE2[SIDEBAR_MODE2["EDITOR"] = 1] = "EDITOR";
})(SIDEBAR_MODE || (SIDEBAR_MODE = {}));
const RenderTreeWrapper = ({
  projectObservable$
}) => {
  const [content] = useObservableState(() => combineLatest([contents$, projectObservable$]).pipe(map(([contents, project]) => {
    try {
      return createTree(contents.get(project.slug), project);
    } catch (e2) {
      return void 0;
    }
  })));
  return content ? /* @__PURE__ */ jsx(RenderTree, {
    content
  }) : /* @__PURE__ */ jsx(CircularProgress, {});
};
const ConditionalCard = ({
  children,
  mode
}) => {
  if (mode === 1) {
    return children;
  }
  return /* @__PURE__ */ jsx(Card$1, {
    elevation: 1,
    sx: {
      padding: 2
    },
    children
  });
};
function Sidebar({
  onNodeSelect,
  mode,
  onProjectSelect
}) {
  const [expanded, setExpanded] = react.exports.useState([]);
  const params = useParams();
  const handleToggle = (event, nodeIds) => {
    if (event.target.tagName === "svg") {
      setExpanded(nodeIds);
    }
  };
  const [projects] = useObservableAndState(() => projects$);
  const [project, projectObservable$] = useObservableAndState((inputs$) => combineLatest(projects$, inputs$).pipe(map(([projects2, [currentProject]]) => projects2.get(currentProject))), [params.projectSlug]);
  const handleExpandClick = react.exports.useCallback(() => {
    if (project) {
      setExpanded((oldExpanded) => oldExpanded.length === 0 ? Array.from(contents$.value.get(project.slug).values()).map((i) => i.slug) : []);
    }
  }, [project]);
  const navigate = useNavigate();
  const contents = useObservableState(contents$);
  react.exports.useEffect(() => {
    if (project) {
      const content = contents.get(project.slug);
      if (content) {
        setExpanded(Array.from(content.values()).map((item) => item.slug));
      }
    }
  }, [project, contents]);
  if (mode === 0) {
    react.exports.useEffect(() => {
      if (!params.contentSlug && !params.contentSlug && contents.get(params.projectSlug)) {
        let initDoc = "";
        for (const content of contents.get(params.projectSlug).values()) {
          if (!content.isOnlyHeading) {
            initDoc = content.slug;
            break;
          }
        }
        navigate(`/docs/${params.projectSlug}/${params.contentSlug || initDoc}`, {
          replace: true
        });
      }
    }, [contents, params]);
  }
  const theme2 = useTheme();
  const matches = useMediaQuery(theme2.breakpoints.down("sm"));
  const [showMobileSidebar, setShowMobileSidebar] = react.exports.useState(false);
  react.exports.useLayoutEffect(() => {
    if (!matches) {
      setShowMobileSidebar(false);
    }
  }, [matches]);
  return /* @__PURE__ */ jsx(SidebarWrapper, {
    item: true,
    xs: 3,
    className: (showMobileSidebar ? "show" : "") + " " + (mode === 1 ? "editor-sidebar" : "docs-sidebar"),
    children: /* @__PURE__ */ jsxs(ConditionalCard, {
      mode,
      children: [/* @__PURE__ */ jsx(Fab$1, {
        color: "secondary",
        "aria-label": "add",
        className: "menu-button",
        children: showMobileSidebar ? /* @__PURE__ */ jsx(default_1$7, {
          onClick: () => setShowMobileSidebar(false)
        }) : /* @__PURE__ */ jsx(default_1$5, {
          onClick: () => setShowMobileSidebar(true)
        })
      }), projects.size > 1 && /* @__PURE__ */ jsx(Box$1, {
        sx: {
          mb: 1
        },
        children: /* @__PURE__ */ jsxs(FormControl$1, {
          fullWidth: true,
          children: [/* @__PURE__ */ jsx(InputLabel$1, {
            variant: "standard",
            htmlFor: "uncontrolled-native",
            children: "Project"
          }), project && /* @__PURE__ */ jsx(NativeSelect$1, {
            defaultValue: project.slug,
            inputProps: {
              name: "age",
              id: "uncontrolled-native"
            },
            onChange: (e2) => {
              onProjectSelect(e2.target.value);
            },
            children: Array.from(projects).map(([slug, p2]) => /* @__PURE__ */ jsx("option", {
              value: slug,
              children: p2.name
            }, slug))
          })]
        })
      }), /* @__PURE__ */ jsx(Box$1, {
        sx: {
          mb: 1
        },
        children: /* @__PURE__ */ jsx(Button$1, {
          onClick: handleExpandClick,
          children: expanded.length === 0 ? "Expand all" : "Collapse all"
        })
      }), params.contentSlug && /* @__PURE__ */ jsx(TreeView$1, {
        "aria-label": "controlled",
        defaultCollapseIcon: /* @__PURE__ */ jsx(default_1$6, {}),
        defaultExpandIcon: /* @__PURE__ */ jsx(default_1$8, {}),
        expanded,
        onNodeToggle: handleToggle,
        onNodeSelect: (event, nodeId) => {
          if (event.target.tagName !== "svg") {
            onNodeSelect(nodeId);
          }
        },
        selected: mode !== 1 ? params.contentSlug : "",
        children: /* @__PURE__ */ jsx(RenderTreeWrapper, {
          projectObservable$
        })
      })]
    })
  });
}
const Project = () => {
  const params = useParams();
  const navigate = useNavigate();
  const contents = useObservableState(contents$);
  react.exports.useEffect(() => {
    if (!params.projectSlug && contents.size > 0) {
      navigate(`/docs/${Array.from(contents.keys())[0]}`, {
        replace: true
      });
    }
  }, [params, contents]);
  return /* @__PURE__ */ jsx(Fragment, {
    children: params.contentSlug && /* @__PURE__ */ jsx(Content, {})
  });
};
const Layout$1 = ({
  children
}) => {
  const params = useParams();
  const navigate = useNavigate();
  const onNodeSelect = react.exports.useCallback((nodeId) => {
    if (documents$.value.has(nodeId)) {
      navigate(`/docs/${params.projectSlug}/${nodeId}`, {
        replace: true
      });
    }
  }, [params]);
  return /* @__PURE__ */ jsxs(react.exports.Fragment, {
    children: [/* @__PURE__ */ jsx(Navbar, {}), /* @__PURE__ */ jsx(Container$1, {
      maxWidth: "lg",
      sx: {
        marginTop: 10,
        marginBottom: 10,
        flex: "auto"
      },
      children: /* @__PURE__ */ jsxs(Grid$1, {
        container: true,
        spacing: 2,
        children: [/* @__PURE__ */ jsx(Sidebar, {
          onProjectSelect: (projectSlug) => {
            navigate(`/docs/${projectSlug}`, {
              replace: true
            });
          },
          onNodeSelect,
          mode: SIDEBAR_MODE.DOCS
        }), children]
      })
    }), /* @__PURE__ */ jsx(Footer, {})]
  });
};
const Docs = () => {
  return /* @__PURE__ */ jsxs(Routes, {
    children: [/* @__PURE__ */ jsx(Route, {
      path: "/:projectSlug",
      element: /* @__PURE__ */ jsx(Layout$1, {
        children: /* @__PURE__ */ jsx(Project, {})
      })
    }), /* @__PURE__ */ jsx(Route, {
      path: "/:projectSlug/:contentSlug",
      element: /* @__PURE__ */ jsx(Layout$1, {
        children: /* @__PURE__ */ jsx(Project, {})
      })
    }), /* @__PURE__ */ jsx(Route, {
      path: "/",
      element: /* @__PURE__ */ jsx(Layout$1, {
        children: /* @__PURE__ */ jsx(Project, {})
      })
    })]
  });
};
var ArrowLeft = {};
var _interopRequireDefault$4 = interopRequireDefault.exports;
Object.defineProperty(ArrowLeft, "__esModule", {
  value: true
});
var default_1$4 = ArrowLeft.default = void 0;
var _createSvgIcon$4 = _interopRequireDefault$4(createSvgIcon$1);
var _jsxRuntime$4 = require$$2;
var _default$4 = (0, _createSvgIcon$4.default)(/* @__PURE__ */ (0, _jsxRuntime$4.jsx)("path", {
  d: "m14 7-5 5 5 5V7z"
}), "ArrowLeft");
default_1$4 = ArrowLeft.default = _default$4;
var ArrowRight = {};
var _interopRequireDefault$3 = interopRequireDefault.exports;
Object.defineProperty(ArrowRight, "__esModule", {
  value: true
});
var default_1$3 = ArrowRight.default = void 0;
var _createSvgIcon$3 = _interopRequireDefault$3(createSvgIcon$1);
var _jsxRuntime$3 = require$$2;
var _default$3 = (0, _createSvgIcon$3.default)(/* @__PURE__ */ (0, _jsxRuntime$3.jsx)("path", {
  d: "m10 17 5-5-5-5v10z"
}), "ArrowRight");
default_1$3 = ArrowRight.default = _default$3;
var Save = {};
var _interopRequireDefault$2 = interopRequireDefault.exports;
Object.defineProperty(Save, "__esModule", {
  value: true
});
var default_1$2 = Save.default = void 0;
var _createSvgIcon$2 = _interopRequireDefault$2(createSvgIcon$1);
var _jsxRuntime$2 = require$$2;
var _default$2 = (0, _createSvgIcon$2.default)(/* @__PURE__ */ (0, _jsxRuntime$2.jsx)("path", {
  d: "M17 3H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V7l-4-4zm-5 16c-1.66 0-3-1.34-3-3s1.34-3 3-3 3 1.34 3 3-1.34 3-3 3zm3-10H5V5h10v4z"
}), "Save");
default_1$2 = Save.default = _default$2;
var Visibility = {};
var _interopRequireDefault$1 = interopRequireDefault.exports;
Object.defineProperty(Visibility, "__esModule", {
  value: true
});
var default_1$1 = Visibility.default = void 0;
var _createSvgIcon$1 = _interopRequireDefault$1(createSvgIcon$1);
var _jsxRuntime$1 = require$$2;
var _default$1 = (0, _createSvgIcon$1.default)(/* @__PURE__ */ (0, _jsxRuntime$1.jsx)("path", {
  d: "M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z"
}), "Visibility");
default_1$1 = Visibility.default = _default$1;
var VisibilityOff = {};
var _interopRequireDefault = interopRequireDefault.exports;
Object.defineProperty(VisibilityOff, "__esModule", {
  value: true
});
var default_1 = VisibilityOff.default = void 0;
var _createSvgIcon = _interopRequireDefault(createSvgIcon$1);
var _jsxRuntime = require$$2;
var _default = (0, _createSvgIcon.default)(/* @__PURE__ */ (0, _jsxRuntime.jsx)("path", {
  d: "M12 7c2.76 0 5 2.24 5 5 0 .65-.13 1.26-.36 1.83l2.92 2.92c1.51-1.26 2.7-2.89 3.43-4.75-1.73-4.39-6-7.5-11-7.5-1.4 0-2.74.25-3.98.7l2.16 2.16C10.74 7.13 11.35 7 12 7zM2 4.27l2.28 2.28.46.46C3.08 8.3 1.78 10.02 1 12c1.73 4.39 6 7.5 11 7.5 1.55 0 3.03-.3 4.38-.84l.42.42L19.73 22 21 20.73 3.27 3 2 4.27zM7.53 9.8l1.55 1.55c-.05.21-.08.43-.08.65 0 1.66 1.34 3 3 3 .22 0 .44-.03.65-.08l1.55 1.55c-.67.33-1.41.53-2.2.53-2.76 0-5-2.24-5-5 0-.79.2-1.53.53-2.2zm4.31-.78 3.15 3.15.02-.16c0-1.66-1.34-3-3-3l-.17.01z"
}), "VisibilityOff");
default_1 = VisibilityOff.default = _default;
function _defineProperty$1(obj, key, value) {
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
function ownKeys$1(object, enumerableOnly) {
  var keys = Object.keys(object);
  if (Object.getOwnPropertySymbols) {
    var symbols = Object.getOwnPropertySymbols(object);
    if (enumerableOnly)
      symbols = symbols.filter(function(sym) {
        return Object.getOwnPropertyDescriptor(object, sym).enumerable;
      });
    keys.push.apply(keys, symbols);
  }
  return keys;
}
function _objectSpread2$1(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i] != null ? arguments[i] : {};
    if (i % 2) {
      ownKeys$1(Object(source), true).forEach(function(key) {
        _defineProperty$1(target, key, source[key]);
      });
    } else if (Object.getOwnPropertyDescriptors) {
      Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));
    } else {
      ownKeys$1(Object(source)).forEach(function(key) {
        Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
      });
    }
  }
  return target;
}
function _slicedToArray(arr, i) {
  return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest();
}
function _arrayWithHoles(arr) {
  if (Array.isArray(arr))
    return arr;
}
function _iterableToArrayLimit(arr, i) {
  if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr)))
    return;
  var _arr = [];
  var _n = true;
  var _d = false;
  var _e = void 0;
  try {
    for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {
      _arr.push(_s.value);
      if (i && _arr.length === i)
        break;
    }
  } catch (err) {
    _d = true;
    _e = err;
  } finally {
    try {
      if (!_n && _i["return"] != null)
        _i["return"]();
    } finally {
      if (_d)
        throw _e;
    }
  }
  return _arr;
}
function _unsupportedIterableToArray(o, minLen) {
  if (!o)
    return;
  if (typeof o === "string")
    return _arrayLikeToArray(o, minLen);
  var n2 = Object.prototype.toString.call(o).slice(8, -1);
  if (n2 === "Object" && o.constructor)
    n2 = o.constructor.name;
  if (n2 === "Map" || n2 === "Set")
    return Array.from(o);
  if (n2 === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n2))
    return _arrayLikeToArray(o, minLen);
}
function _arrayLikeToArray(arr, len) {
  if (len == null || len > arr.length)
    len = arr.length;
  for (var i = 0, arr2 = new Array(len); i < len; i++)
    arr2[i] = arr[i];
  return arr2;
}
function _nonIterableRest() {
  throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
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
function ownKeys(object, enumerableOnly) {
  var keys = Object.keys(object);
  if (Object.getOwnPropertySymbols) {
    var symbols = Object.getOwnPropertySymbols(object);
    if (enumerableOnly)
      symbols = symbols.filter(function(sym) {
        return Object.getOwnPropertyDescriptor(object, sym).enumerable;
      });
    keys.push.apply(keys, symbols);
  }
  return keys;
}
function _objectSpread2(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i] != null ? arguments[i] : {};
    if (i % 2) {
      ownKeys(Object(source), true).forEach(function(key) {
        _defineProperty(target, key, source[key]);
      });
    } else if (Object.getOwnPropertyDescriptors) {
      Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));
    } else {
      ownKeys(Object(source)).forEach(function(key) {
        Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
      });
    }
  }
  return target;
}
function compose$1() {
  for (var _len = arguments.length, fns = new Array(_len), _key = 0; _key < _len; _key++) {
    fns[_key] = arguments[_key];
  }
  return function(x) {
    return fns.reduceRight(function(y2, f2) {
      return f2(y2);
    }, x);
  };
}
function curry$1(fn2) {
  return function curried() {
    var _this = this;
    for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
      args[_key2] = arguments[_key2];
    }
    return args.length >= fn2.length ? fn2.apply(this, args) : function() {
      for (var _len3 = arguments.length, nextArgs = new Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
        nextArgs[_key3] = arguments[_key3];
      }
      return curried.apply(_this, [].concat(args, nextArgs));
    };
  };
}
function isObject$1(value) {
  return {}.toString.call(value).includes("Object");
}
function isEmpty(obj) {
  return !Object.keys(obj).length;
}
function isFunction(value) {
  return typeof value === "function";
}
function hasOwnProperty(object, property) {
  return Object.prototype.hasOwnProperty.call(object, property);
}
function validateChanges(initial, changes) {
  if (!isObject$1(changes))
    errorHandler$1("changeType");
  if (Object.keys(changes).some(function(field) {
    return !hasOwnProperty(initial, field);
  }))
    errorHandler$1("changeField");
  return changes;
}
function validateSelector(selector) {
  if (!isFunction(selector))
    errorHandler$1("selectorType");
}
function validateHandler(handler) {
  if (!(isFunction(handler) || isObject$1(handler)))
    errorHandler$1("handlerType");
  if (isObject$1(handler) && Object.values(handler).some(function(_handler) {
    return !isFunction(_handler);
  }))
    errorHandler$1("handlersType");
}
function validateInitial(initial) {
  if (!initial)
    errorHandler$1("initialIsRequired");
  if (!isObject$1(initial))
    errorHandler$1("initialType");
  if (isEmpty(initial))
    errorHandler$1("initialContent");
}
function throwError$1(errorMessages2, type) {
  throw new Error(errorMessages2[type] || errorMessages2["default"]);
}
var errorMessages$1 = {
  initialIsRequired: "initial state is required",
  initialType: "initial state should be an object",
  initialContent: "initial state shouldn't be an empty object",
  handlerType: "handler should be an object or a function",
  handlersType: "all handlers should be a functions",
  selectorType: "selector should be a function",
  changeType: "provided value of changes should be an object",
  changeField: 'it seams you want to change a field in the state which is not specified in the "initial" state',
  "default": "an unknown error accured in `state-local` package"
};
var errorHandler$1 = curry$1(throwError$1)(errorMessages$1);
var validators$1 = {
  changes: validateChanges,
  selector: validateSelector,
  handler: validateHandler,
  initial: validateInitial
};
function create(initial) {
  var handler = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
  validators$1.initial(initial);
  validators$1.handler(handler);
  var state = {
    current: initial
  };
  var didUpdate = curry$1(didStateUpdate)(state, handler);
  var update = curry$1(updateState)(state);
  var validate = curry$1(validators$1.changes)(initial);
  var getChanges = curry$1(extractChanges)(state);
  function getState2() {
    var selector = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : function(state2) {
      return state2;
    };
    validators$1.selector(selector);
    return selector(state.current);
  }
  function setState2(causedChanges) {
    compose$1(didUpdate, update, validate, getChanges)(causedChanges);
  }
  return [getState2, setState2];
}
function extractChanges(state, causedChanges) {
  return isFunction(causedChanges) ? causedChanges(state.current) : causedChanges;
}
function updateState(state, changes) {
  state.current = _objectSpread2(_objectSpread2({}, state.current), changes);
  return changes;
}
function didStateUpdate(state, handler, changes) {
  isFunction(handler) ? handler(state.current) : Object.keys(changes).forEach(function(field) {
    var _handler$field;
    return (_handler$field = handler[field]) === null || _handler$field === void 0 ? void 0 : _handler$field.call(handler, state.current[field]);
  });
  return changes;
}
var index$1 = {
  create
};
var config$1 = {
  paths: {
    vs: "https://cdn.jsdelivr.net/npm/monaco-editor@0.28.1/min/vs"
  }
};
function curry(fn2) {
  return function curried() {
    var _this = this;
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }
    return args.length >= fn2.length ? fn2.apply(this, args) : function() {
      for (var _len2 = arguments.length, nextArgs = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
        nextArgs[_key2] = arguments[_key2];
      }
      return curried.apply(_this, [].concat(args, nextArgs));
    };
  };
}
function isObject(value) {
  return {}.toString.call(value).includes("Object");
}
function validateConfig(config2) {
  if (!config2)
    errorHandler("configIsRequired");
  if (!isObject(config2))
    errorHandler("configType");
  if (config2.urls) {
    informAboutDeprecation();
    return {
      paths: {
        vs: config2.urls.monacoBase
      }
    };
  }
  return config2;
}
function informAboutDeprecation() {
  console.warn(errorMessages.deprecation);
}
function throwError(errorMessages2, type) {
  throw new Error(errorMessages2[type] || errorMessages2["default"]);
}
var errorMessages = {
  configIsRequired: "the configuration object is required",
  configType: "the configuration object should be an object",
  "default": "an unknown error accured in `@monaco-editor/loader` package",
  deprecation: "Deprecation warning!\n    You are using deprecated way of configuration.\n\n    Instead of using\n      monaco.config({ urls: { monacoBase: '...' } })\n    use\n      monaco.config({ paths: { vs: '...' } })\n\n    For more please check the link https://github.com/suren-atoyan/monaco-loader#config\n  "
};
var errorHandler = curry(throwError)(errorMessages);
var validators = {
  config: validateConfig
};
var compose = function compose2() {
  for (var _len = arguments.length, fns = new Array(_len), _key = 0; _key < _len; _key++) {
    fns[_key] = arguments[_key];
  }
  return function(x) {
    return fns.reduceRight(function(y2, f2) {
      return f2(y2);
    }, x);
  };
};
function merge(target, source) {
  Object.keys(source).forEach(function(key) {
    if (source[key] instanceof Object) {
      if (target[key]) {
        Object.assign(source[key], merge(target[key], source[key]));
      }
    }
  });
  return _objectSpread2$1(_objectSpread2$1({}, target), source);
}
var CANCELATION_MESSAGE = {
  type: "cancelation",
  msg: "operation is manually canceled"
};
function makeCancelable(promise) {
  var hasCanceled_ = false;
  var wrappedPromise = new Promise(function(resolve, reject) {
    promise.then(function(val) {
      return hasCanceled_ ? reject(CANCELATION_MESSAGE) : resolve(val);
    });
    promise["catch"](reject);
  });
  return wrappedPromise.cancel = function() {
    return hasCanceled_ = true;
  }, wrappedPromise;
}
var _state$create = index$1.create({
  config: config$1,
  isInitialized: false,
  resolve: null,
  reject: null,
  monaco: null
}), _state$create2 = _slicedToArray(_state$create, 2), getState = _state$create2[0], setState = _state$create2[1];
function config(config2) {
  setState(function(state) {
    return {
      config: merge(state.config, validators.config(config2))
    };
  });
}
function init() {
  var state = getState(function(_ref) {
    var isInitialized = _ref.isInitialized;
    return {
      isInitialized
    };
  });
  if (!state.isInitialized) {
    if (window.monaco && window.monaco.editor) {
      storeMonacoInstance(window.monaco);
      return makeCancelable(Promise.resolve(window.monaco));
    }
    compose(injectScripts, getMonacoLoaderScript)(configureLoader);
    setState({
      isInitialized: true
    });
  }
  return makeCancelable(wrapperPromise);
}
function injectScripts(script) {
  return document.body.appendChild(script);
}
function createScript(src) {
  var script = document.createElement("script");
  return src && (script.src = src), script;
}
function getMonacoLoaderScript(configureLoader2) {
  var state = getState(function(_ref2) {
    var config2 = _ref2.config, reject = _ref2.reject;
    return {
      config: config2,
      reject
    };
  });
  var loaderScript = createScript("".concat(state.config.paths.vs, "/loader.js"));
  loaderScript.onload = function() {
    return configureLoader2();
  };
  loaderScript.onerror = state.reject;
  return loaderScript;
}
function configureLoader() {
  var state = getState(function(_ref3) {
    var config2 = _ref3.config, resolve = _ref3.resolve, reject = _ref3.reject;
    return {
      config: config2,
      resolve,
      reject
    };
  });
  var require2 = window.require;
  require2.config(state.config);
  require2(["vs/editor/editor.main"], function(monaco) {
    storeMonacoInstance(monaco);
    state.resolve(monaco);
  }, function(error) {
    state.reject(error);
  });
}
function storeMonacoInstance(monaco) {
  if (!getState().monaco) {
    setState({
      monaco
    });
  }
}
function __getMonacoInstance() {
  return getState(function(_ref4) {
    var monaco = _ref4.monaco;
    return monaco;
  });
}
var wrapperPromise = new Promise(function(resolve, reject) {
  return setState({
    resolve,
    reject
  });
});
var loader = {
  config,
  init,
  __getMonacoInstance
};
function _extends() {
  _extends = Object.assign || function(target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];
      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }
    return target;
  };
  return _extends.apply(this, arguments);
}
const loadingStyles = {
  display: "flex",
  height: "100%",
  width: "100%",
  justifyContent: "center",
  alignItems: "center"
};
function Loading({
  content
}) {
  return /* @__PURE__ */ React.createElement("div", {
    style: loadingStyles
  }, content);
}
const styles = {
  wrapper: {
    display: "flex",
    position: "relative",
    textAlign: "initial"
  },
  fullWidth: {
    width: "100%"
  },
  hide: {
    display: "none"
  }
};
function MonacoContainer$1({
  width,
  height,
  isEditorReady,
  loading,
  _ref,
  className,
  wrapperProps
}) {
  return /* @__PURE__ */ React.createElement("section", _extends({
    style: __spreadProps(__spreadValues({}, styles.wrapper), {
      width,
      height
    })
  }, wrapperProps), !isEditorReady && /* @__PURE__ */ React.createElement(Loading, {
    content: loading
  }), /* @__PURE__ */ React.createElement("div", {
    ref: _ref,
    style: __spreadValues(__spreadValues({}, styles.fullWidth), !isEditorReady && styles.hide),
    className
  }));
}
MonacoContainer$1.propTypes = {
  width: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
  height: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
  loading: PropTypes.oneOfType([PropTypes.element, PropTypes.string]).isRequired,
  isEditorReady: PropTypes.bool.isRequired,
  className: PropTypes.string,
  wrapperProps: PropTypes.object
};
var MonacoContainer = /* @__PURE__ */ react.exports.memo(MonacoContainer$1);
function useMount(effect2) {
  react.exports.useEffect(effect2, []);
}
function useUpdate(effect2, deps, applyChanges = true) {
  const isInitialMount = react.exports.useRef(true);
  react.exports.useEffect(isInitialMount.current || !applyChanges ? () => {
    isInitialMount.current = false;
  } : effect2, deps);
}
function noop() {
}
function getOrCreateModel(monaco, value, language, path) {
  return getModel(monaco, path) || createModel(monaco, value, language, path);
}
function getModel(monaco, path) {
  return monaco.editor.getModel(createModelUri(monaco, path));
}
function createModel(monaco, value, language, path) {
  return monaco.editor.createModel(value, language, path && createModelUri(monaco, path));
}
function createModelUri(monaco, path) {
  return monaco.Uri.parse(path);
}
function isUndefined(input) {
  return input === void 0;
}
({
  original: PropTypes.string,
  modified: PropTypes.string,
  language: PropTypes.string,
  originalLanguage: PropTypes.string,
  modifiedLanguage: PropTypes.string,
  originalModelPath: PropTypes.string,
  modifiedModelPath: PropTypes.string,
  keepCurrentOriginalModel: PropTypes.bool,
  keepCurrentModifiedModel: PropTypes.bool,
  theme: PropTypes.string,
  loading: PropTypes.oneOfType([PropTypes.element, PropTypes.string]),
  options: PropTypes.object,
  width: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  height: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  className: PropTypes.string,
  wrapperProps: PropTypes.object,
  beforeMount: PropTypes.func,
  onMount: PropTypes.func
});
function usePrevious(value) {
  const ref = react.exports.useRef();
  react.exports.useEffect(() => {
    ref.current = value;
  }, [value]);
  return ref.current;
}
const viewStates = new Map();
function Editor$1({
  defaultValue,
  defaultLanguage,
  defaultPath,
  value,
  language,
  path,
  theme: theme2,
  line,
  loading,
  options,
  overrideServices,
  saveViewState,
  keepCurrentModel,
  width,
  height,
  className,
  wrapperProps,
  beforeMount,
  onMount,
  onChange,
  onValidate
}) {
  const [isEditorReady, setIsEditorReady] = react.exports.useState(false);
  const [isMonacoMounting, setIsMonacoMounting] = react.exports.useState(true);
  const monacoRef = react.exports.useRef(null);
  const editorRef = react.exports.useRef(null);
  const containerRef = react.exports.useRef(null);
  const onMountRef = react.exports.useRef(onMount);
  const beforeMountRef = react.exports.useRef(beforeMount);
  const subscriptionRef = react.exports.useRef(null);
  const valueRef = react.exports.useRef(value);
  const previousPath = usePrevious(path);
  useMount(() => {
    const cancelable = loader.init();
    cancelable.then((monaco) => (monacoRef.current = monaco) && setIsMonacoMounting(false)).catch((error) => (error === null || error === void 0 ? void 0 : error.type) !== "cancelation" && console.error("Monaco initialization: error:", error));
    return () => editorRef.current ? disposeEditor() : cancelable.cancel();
  });
  useUpdate(() => {
    const model = getOrCreateModel(monacoRef.current, defaultValue || value, defaultLanguage || language, path);
    if (model !== editorRef.current.getModel()) {
      saveViewState && viewStates.set(previousPath, editorRef.current.saveViewState());
      editorRef.current.setModel(model);
      saveViewState && editorRef.current.restoreViewState(viewStates.get(path));
    }
  }, [path], isEditorReady);
  useUpdate(() => {
    editorRef.current.updateOptions(options);
  }, [options], isEditorReady);
  useUpdate(() => {
    if (editorRef.current.getOption(monacoRef.current.editor.EditorOption.readOnly)) {
      editorRef.current.setValue(value);
    } else {
      if (value !== editorRef.current.getValue()) {
        editorRef.current.executeEdits("", [{
          range: editorRef.current.getModel().getFullModelRange(),
          text: value,
          forceMoveMarkers: true
        }]);
        editorRef.current.pushUndoStop();
      }
    }
  }, [value], isEditorReady);
  useUpdate(() => {
    monacoRef.current.editor.setModelLanguage(editorRef.current.getModel(), language);
  }, [language], isEditorReady);
  useUpdate(() => {
    if (!isUndefined(line)) {
      editorRef.current.revealLine(line);
    }
  }, [line], isEditorReady);
  useUpdate(() => {
    monacoRef.current.editor.setTheme(theme2);
  }, [theme2], isEditorReady);
  const createEditor = react.exports.useCallback(() => {
    beforeMountRef.current(monacoRef.current);
    const autoCreatedModelPath = path || defaultPath;
    const defaultModel = getOrCreateModel(monacoRef.current, value || defaultValue, defaultLanguage || language, autoCreatedModelPath);
    editorRef.current = monacoRef.current.editor.create(containerRef.current, __spreadValues({
      model: defaultModel,
      automaticLayout: true
    }, options), overrideServices);
    saveViewState && editorRef.current.restoreViewState(viewStates.get(autoCreatedModelPath));
    monacoRef.current.editor.setTheme(theme2);
    setIsEditorReady(true);
  }, [defaultValue, defaultLanguage, defaultPath, value, language, path, options, overrideServices, saveViewState, theme2]);
  react.exports.useEffect(() => {
    if (isEditorReady) {
      onMountRef.current(editorRef.current, monacoRef.current);
    }
  }, [isEditorReady]);
  react.exports.useEffect(() => {
    !isMonacoMounting && !isEditorReady && createEditor();
  }, [isMonacoMounting, isEditorReady, createEditor]);
  valueRef.current = value;
  react.exports.useEffect(() => {
    if (isEditorReady && onChange) {
      var _subscriptionRef$curr, _editorRef$current;
      (_subscriptionRef$curr = subscriptionRef.current) === null || _subscriptionRef$curr === void 0 ? void 0 : _subscriptionRef$curr.dispose();
      subscriptionRef.current = (_editorRef$current = editorRef.current) === null || _editorRef$current === void 0 ? void 0 : _editorRef$current.onDidChangeModelContent((event) => {
        const editorValue = editorRef.current.getValue();
        if (valueRef.current !== editorValue) {
          onChange(editorValue, event);
        }
      });
    }
  }, [isEditorReady, onChange]);
  react.exports.useEffect(() => {
    if (isEditorReady) {
      const changeMarkersListener = monacoRef.current.editor.onDidChangeMarkers((uris) => {
        var _editorRef$current$ge;
        const editorUri = (_editorRef$current$ge = editorRef.current.getModel()) === null || _editorRef$current$ge === void 0 ? void 0 : _editorRef$current$ge.uri;
        if (editorUri) {
          const currentEditorHasMarkerChanges = uris.find((uri) => uri.path === editorUri.path);
          if (currentEditorHasMarkerChanges) {
            const markers = monacoRef.current.editor.getModelMarkers({
              resource: editorUri
            });
            onValidate === null || onValidate === void 0 ? void 0 : onValidate(markers);
          }
        }
      });
      return () => {
        changeMarkersListener === null || changeMarkersListener === void 0 ? void 0 : changeMarkersListener.dispose();
      };
    }
  }, [isEditorReady, onValidate]);
  function disposeEditor() {
    var _subscriptionRef$curr2;
    (_subscriptionRef$curr2 = subscriptionRef.current) === null || _subscriptionRef$curr2 === void 0 ? void 0 : _subscriptionRef$curr2.dispose();
    if (keepCurrentModel) {
      saveViewState && viewStates.set(path, editorRef.current.saveViewState());
    } else {
      var _editorRef$current$ge2;
      (_editorRef$current$ge2 = editorRef.current.getModel()) === null || _editorRef$current$ge2 === void 0 ? void 0 : _editorRef$current$ge2.dispose();
    }
    editorRef.current.dispose();
  }
  return /* @__PURE__ */ jsx(MonacoContainer, {
    width,
    height,
    isEditorReady,
    loading,
    _ref: containerRef,
    className,
    wrapperProps
  });
}
Editor$1.propTypes = {
  defaultValue: PropTypes.string,
  defaultPath: PropTypes.string,
  defaultLanguage: PropTypes.string,
  value: PropTypes.string,
  language: PropTypes.string,
  path: PropTypes.string,
  theme: PropTypes.string,
  line: PropTypes.number,
  loading: PropTypes.oneOfType([PropTypes.element, PropTypes.string]),
  options: PropTypes.object,
  overrideServices: PropTypes.object,
  saveViewState: PropTypes.bool,
  keepCurrentModel: PropTypes.bool,
  width: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  height: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  className: PropTypes.string,
  wrapperProps: PropTypes.object,
  beforeMount: PropTypes.func,
  onMount: PropTypes.func,
  onChange: PropTypes.func,
  onValidate: PropTypes.func
};
Editor$1.defaultProps = {
  theme: "light",
  loading: "Loading...",
  options: {},
  overrideServices: {},
  saveViewState: true,
  keepCurrentModel: false,
  width: "100%",
  height: "100%",
  wrapperProps: {},
  beforeMount: noop,
  onMount: noop,
  onValidate: noop
};
var index = /* @__PURE__ */ react.exports.memo(Editor$1);
const EditorRenderer = ({
  setHeight,
  setMDX,
  mdx,
  editorRef,
  boxRef
}) => {
  return /* @__PURE__ */ jsx(index, {
    height: "100%",
    theme: "vs-dark",
    width: "100%",
    onChange: setMDX,
    onMount: (editor, monaco) => {
      console.log(monaco);
      editorRef.current = editor;
      setHeight(boxRef.current.clientHeight);
    },
    defaultLanguage: "markdown",
    defaultValue: mdx,
    options: {
      wordWrap: "on"
    }
  });
};
const EditorWrapper = default_1$e(Card$1)({
  width: "100%",
  flex: "auto",
  display: "flex",
  flexDirection: "column",
  ".editor": {
    width: "100%",
    flex: "auto",
    display: "flex",
    flexDirection: "row"
  }
});
const EditorHeader = default_1$e(CardHeader$1)(({
  theme: theme2
}) => ({
  background: theme2.palette.primary.dark,
  color: theme2.palette.getContrastText(theme2.palette.primary.dark),
  padding: 2,
  height: "44px"
}));
const ContentBox = default_1$e(Box$3)({
  overflow: "auto",
  paddingLeft: "20px",
  paddingRight: "20px",
  paddingBottom: "20px"
});
const SidebarBox = default_1$e(Box$3)({
  flex: 0,
  position: "relative"
});
const MAX_FLEX_DIFF = 4;
const MarkdownEditor = ({
  initial
}) => {
  const [mdx, setMDX] = react.exports.useState(initial);
  const [height, setHeight] = react.exports.useState(0);
  const [editorFlex, setEditorFlex] = react.exports.useState(-1);
  const boxRef = react.exports.useRef();
  const editorRef = react.exports.useRef();
  const saveMDX = react.exports.useCallback(() => {
    const element = document.createElement("a");
    element.setAttribute("href", "data:text/plain;charset=utf-8," + encodeURIComponent(mdx));
    element.setAttribute("download", "document.mdx");
    element.style.display = "none";
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  }, [mdx]);
  const navigate = useNavigate();
  const params = useParams();
  const onProjectSelected = react.exports.useCallback((projectSlug) => {
    var _a2;
    navigate(`/editor/${projectSlug}/${(_a2 = params.contentSlug) != null ? _a2 : ""}`);
  }, [params]);
  const [showPreview, setShowPreview] = react.exports.useState(true);
  return /* @__PURE__ */ jsxs(EditorWrapper, {
    children: [/* @__PURE__ */ jsx(EditorHeader, {
      action: /* @__PURE__ */ jsxs(React.Fragment, {
        children: [/* @__PURE__ */ jsx(IconButton$1, {
          sx: {
            color: "inherit"
          },
          "aria-label": "increase preview size",
          onClick: saveMDX,
          children: /* @__PURE__ */ jsx(default_1$2, {
            sx: {
              fontSize: 22
            }
          })
        }), /* @__PURE__ */ jsx(IconButton$1, {
          sx: {
            color: "inherit"
          },
          "aria-label": "increase preview size",
          onClick: () => {
            setEditorFlex((value) => Math.max(-(MAX_FLEX_DIFF - 1), value - 1));
          },
          children: /* @__PURE__ */ jsx(default_1$4, {
            sx: {
              fontSize: 32
            }
          })
        }), /* @__PURE__ */ jsx(IconButton$1, {
          sx: {
            color: "inherit"
          },
          "aria-label": "decrease preview size",
          onClick: () => {
            setEditorFlex((value) => Math.min(MAX_FLEX_DIFF - 1, value + 1));
          },
          children: /* @__PURE__ */ jsx(default_1$3, {
            sx: {
              fontSize: 32
            }
          })
        }), /* @__PURE__ */ jsx(Tooltip$1, {
          title: "toggle preview",
          children: /* @__PURE__ */ jsx(IconButton$1, {
            sx: {
              color: "inherit",
              marginRight: "10px"
            },
            "aria-label": "toggle preview",
            onClick: () => {
              setShowPreview((value) => !value);
            },
            children: !showPreview ? /* @__PURE__ */ jsx(default_1$1, {
              sx: {
                fontSize: 22
              }
            }) : /* @__PURE__ */ jsx(default_1, {
              sx: {
                fontSize: 22
              }
            })
          })
        })]
      })
    }), /* @__PURE__ */ jsxs(Box$3, {
      className: "editor",
      children: [/* @__PURE__ */ jsx(SidebarBox, {
        children: /* @__PURE__ */ jsx(Sidebar, {
          mode: SIDEBAR_MODE.EDITOR,
          onNodeSelect: (node) => {
            const doc = documents$.value.get(node);
            console.log(doc);
            const line = editorRef.current.getPosition();
            const id = {
              major: 1,
              minor: 1
            };
            const text = `[${doc.name}](/docs/${doc.projectSlug}/${doc.slug})`;
            const op = {
              identifier: id,
              range: {
                startLineNumber: line.lineNumber,
                endLineNumber: line.lineNumber
              },
              text,
              forceMoveMarkers: true
            };
            editorRef.current.executeEdits("my-source", [op]);
          },
          onProjectSelect: onProjectSelected
        })
      }), /* @__PURE__ */ jsx(Box$3, {
        ref: boxRef,
        sx: {
          flex: "auto",
          maxWidth: !showPreview ? "100%" : `${50 + 10 * editorFlex}%`,
          background: "black"
        },
        children: /* @__PURE__ */ jsx(EditorRenderer, {
          editorRef,
          mdx,
          boxRef,
          setHeight,
          setMDX
        })
      }), showPreview && /* @__PURE__ */ jsx(ContentBox, {
        sx: {
          height: height + "px",
          flex: "auto",
          maxWidth: `${50 - 10 * editorFlex}%`
        },
        children: !!height && /* @__PURE__ */ jsx(MarkdownRenderer, {
          mdx,
          isEditor: true
        })
      })]
    })]
  });
};
const DocumentEditor = () => {
  const params = useParams();
  const [document2] = useObservableAndState((input$) => {
    return combineLatest([input$, documents$]).pipe(map(([input, documents]) => {
      var _a2;
      return documents.get((_a2 = input[0]) == null ? void 0 : _a2.contentSlug);
    }));
  }, [params]);
  const shouldHaveDocument = !!params.contentSlug;
  return /* @__PURE__ */ jsx(Fragment, {
    children: shouldHaveDocument && !document2 ? /* @__PURE__ */ jsx(CircularProgress, {}) : /* @__PURE__ */ jsx(MarkdownEditor, {
      initial: shouldHaveDocument ? document2.mdx : "# hello world"
    }, shouldHaveDocument ? document2.mdx : "# hello world")
  });
};
const Layout = ({
  children
}) => {
  return /* @__PURE__ */ jsxs(react.exports.Fragment, {
    children: [/* @__PURE__ */ jsx(Navbar, {}), /* @__PURE__ */ jsx(Container$1, {
      sx: {
        marginTop: 3,
        marginBottom: 3,
        flex: "auto",
        display: "flex",
        maxWidth: "100% !important"
      },
      children
    })]
  });
};
const Editor = () => {
  return /* @__PURE__ */ jsxs(Routes, {
    children: [/* @__PURE__ */ jsx(Route, {
      path: "/:projectSlug",
      element: /* @__PURE__ */ jsx(Layout, {
        children: /* @__PURE__ */ jsx(DocumentEditor, {})
      })
    }), /* @__PURE__ */ jsx(Route, {
      path: "/:projectSlug/:contentSlug",
      element: /* @__PURE__ */ jsx(Layout, {
        children: /* @__PURE__ */ jsx(DocumentEditor, {})
      })
    }), /* @__PURE__ */ jsx(Route, {
      path: "/",
      element: /* @__PURE__ */ jsx(Layout, {
        children: /* @__PURE__ */ jsx(DocumentEditor, {})
      })
    })]
  });
};
const Doks = (options) => {
  return /* @__PURE__ */ jsx(ThemeProvider, {
    theme,
    children: /* @__PURE__ */ jsx(DocOptionsContextProvider, {
      options,
      children: /* @__PURE__ */ jsx(HashRouter, {
        children: /* @__PURE__ */ jsxs(Routes, {
          children: [/* @__PURE__ */ jsx(Route, {
            path: "/editor/*",
            element: /* @__PURE__ */ jsx(Editor, {})
          }), /* @__PURE__ */ jsx(Route, {
            path: "/docs/*",
            element: /* @__PURE__ */ jsx(Docs, {})
          }), /* @__PURE__ */ jsx(Route, {
            path: "*",
            element: /* @__PURE__ */ jsx(Docs, {})
          })]
        })
      })
    })
  });
};
var doks = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  [Symbol.toStringTag]: "Module",
  Doks,
  "default": Doks
});
export { doks as d, interopRequireDefault as i };
