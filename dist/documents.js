var __defProp = Object.defineProperty;
var __getOwnPropSymbols = Object.getOwnPropertySymbols;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __propIsEnum = Object.prototype.propertyIsEnumerable;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues = (a2, b2) => {
  for (var prop in b2 || (b2 = {}))
    if (__hasOwnProp.call(b2, prop))
      __defNormalProp(a2, prop, b2[prop]);
  if (__getOwnPropSymbols)
    for (var prop of __getOwnPropSymbols(b2)) {
      if (__propIsEnum.call(b2, prop))
        __defNormalProp(a2, prop, b2[prop]);
    }
  return a2;
};
import { BehaviorSubject } from "rxjs";
function n(n2) {
  for (var t2 = arguments.length, r2 = Array(t2 > 1 ? t2 - 1 : 0), e = 1; e < t2; e++)
    r2[e - 1] = arguments[e];
  throw Error("[Immer] minified error nr: " + n2 + (r2.length ? " " + r2.map(function(n3) {
    return "'" + n3 + "'";
  }).join(",") : "") + ". Find the full error at: https://bit.ly/3cXEKWf");
}
function t(n2) {
  return !!n2 && !!n2[Q];
}
function r(n2) {
  return !!n2 && (function(n3) {
    if (!n3 || typeof n3 != "object")
      return false;
    var t2 = Object.getPrototypeOf(n3);
    if (t2 === null)
      return true;
    var r2 = Object.hasOwnProperty.call(t2, "constructor") && t2.constructor;
    return r2 === Object || typeof r2 == "function" && Function.toString.call(r2) === Z;
  }(n2) || Array.isArray(n2) || !!n2[L] || !!n2.constructor[L] || s(n2) || v(n2));
}
function i(n2, t2, r2) {
  r2 === void 0 && (r2 = false), o(n2) === 0 ? (r2 ? Object.keys : nn)(n2).forEach(function(e) {
    r2 && typeof e == "symbol" || t2(e, n2[e], n2);
  }) : n2.forEach(function(r3, e) {
    return t2(e, r3, n2);
  });
}
function o(n2) {
  var t2 = n2[Q];
  return t2 ? t2.i > 3 ? t2.i - 4 : t2.i : Array.isArray(n2) ? 1 : s(n2) ? 2 : v(n2) ? 3 : 0;
}
function u(n2, t2) {
  return o(n2) === 2 ? n2.has(t2) : Object.prototype.hasOwnProperty.call(n2, t2);
}
function a(n2, t2) {
  return o(n2) === 2 ? n2.get(t2) : n2[t2];
}
function f(n2, t2, r2) {
  var e = o(n2);
  e === 2 ? n2.set(t2, r2) : e === 3 ? (n2.delete(t2), n2.add(r2)) : n2[t2] = r2;
}
function c(n2, t2) {
  return n2 === t2 ? n2 !== 0 || 1 / n2 == 1 / t2 : n2 != n2 && t2 != t2;
}
function s(n2) {
  return X && n2 instanceof Map;
}
function v(n2) {
  return q && n2 instanceof Set;
}
function p(n2) {
  return n2.o || n2.t;
}
function l(n2) {
  if (Array.isArray(n2))
    return Array.prototype.slice.call(n2);
  var t2 = tn(n2);
  delete t2[Q];
  for (var r2 = nn(t2), e = 0; e < r2.length; e++) {
    var i2 = r2[e], o2 = t2[i2];
    o2.writable === false && (o2.writable = true, o2.configurable = true), (o2.get || o2.set) && (t2[i2] = { configurable: true, writable: true, enumerable: o2.enumerable, value: n2[i2] });
  }
  return Object.create(Object.getPrototypeOf(n2), t2);
}
function d(n2, e) {
  return e === void 0 && (e = false), y(n2) || t(n2) || !r(n2) ? n2 : (o(n2) > 1 && (n2.set = n2.add = n2.clear = n2.delete = h), Object.freeze(n2), e && i(n2, function(n3, t2) {
    return d(t2, true);
  }, true), n2);
}
function h() {
  n(2);
}
function y(n2) {
  return n2 == null || typeof n2 != "object" || Object.isFrozen(n2);
}
function b(t2) {
  var r2 = rn[t2];
  return r2 || n(18, t2), r2;
}
function m(n2, t2) {
  rn[n2] || (rn[n2] = t2);
}
function _() {
  return U;
}
function j(n2, t2) {
  t2 && (b("Patches"), n2.u = [], n2.s = [], n2.v = t2);
}
function O(n2) {
  g(n2), n2.p.forEach(S), n2.p = null;
}
function g(n2) {
  n2 === U && (U = n2.l);
}
function w(n2) {
  return U = { p: [], l: U, h: n2, m: true, _: 0 };
}
function S(n2) {
  var t2 = n2[Q];
  t2.i === 0 || t2.i === 1 ? t2.j() : t2.O = true;
}
function P(t2, e) {
  e._ = e.p.length;
  var i2 = e.p[0], o2 = t2 !== void 0 && t2 !== i2;
  return e.h.g || b("ES5").S(e, t2, o2), o2 ? (i2[Q].P && (O(e), n(4)), r(t2) && (t2 = M(e, t2), e.l || x(e, t2)), e.u && b("Patches").M(i2[Q], t2, e.u, e.s)) : t2 = M(e, i2, []), O(e), e.u && e.v(e.u, e.s), t2 !== H ? t2 : void 0;
}
function M(n2, t2, r2) {
  if (y(t2))
    return t2;
  var e = t2[Q];
  if (!e)
    return i(t2, function(i2, o3) {
      return A(n2, e, t2, i2, o3, r2);
    }, true), t2;
  if (e.A !== n2)
    return t2;
  if (!e.P)
    return x(n2, e.t, true), e.t;
  if (!e.I) {
    e.I = true, e.A._--;
    var o2 = e.i === 4 || e.i === 5 ? e.o = l(e.k) : e.o;
    i(e.i === 3 ? new Set(o2) : o2, function(t3, i2) {
      return A(n2, e, o2, t3, i2, r2);
    }), x(n2, o2, false), r2 && n2.u && b("Patches").R(e, r2, n2.u, n2.s);
  }
  return e.o;
}
function A(e, i2, o2, a2, c2, s2) {
  if (t(c2)) {
    var v2 = M(e, c2, s2 && i2 && i2.i !== 3 && !u(i2.D, a2) ? s2.concat(a2) : void 0);
    if (f(o2, a2, v2), !t(v2))
      return;
    e.m = false;
  }
  if (r(c2) && !y(c2)) {
    if (!e.h.F && e._ < 1)
      return;
    M(e, c2), i2 && i2.A.l || x(e, c2);
  }
}
function x(n2, t2, r2) {
  r2 === void 0 && (r2 = false), n2.h.F && n2.m && d(t2, r2);
}
function z(n2, t2) {
  var r2 = n2[Q];
  return (r2 ? p(r2) : n2)[t2];
}
function I(n2, t2) {
  if (t2 in n2)
    for (var r2 = Object.getPrototypeOf(n2); r2; ) {
      var e = Object.getOwnPropertyDescriptor(r2, t2);
      if (e)
        return e;
      r2 = Object.getPrototypeOf(r2);
    }
}
function k(n2) {
  n2.P || (n2.P = true, n2.l && k(n2.l));
}
function E(n2) {
  n2.o || (n2.o = l(n2.t));
}
function R(n2, t2, r2) {
  var e = s(t2) ? b("MapSet").N(t2, r2) : v(t2) ? b("MapSet").T(t2, r2) : n2.g ? function(n3, t3) {
    var r3 = Array.isArray(n3), e2 = { i: r3 ? 1 : 0, A: t3 ? t3.A : _(), P: false, I: false, D: {}, l: t3, t: n3, k: null, o: null, j: null, C: false }, i2 = e2, o2 = en;
    r3 && (i2 = [e2], o2 = on);
    var u2 = Proxy.revocable(i2, o2), a2 = u2.revoke, f2 = u2.proxy;
    return e2.k = f2, e2.j = a2, f2;
  }(t2, r2) : b("ES5").J(t2, r2);
  return (r2 ? r2.A : _()).p.push(e), e;
}
function D(e) {
  return t(e) || n(22, e), function n2(t2) {
    if (!r(t2))
      return t2;
    var e2, u2 = t2[Q], c2 = o(t2);
    if (u2) {
      if (!u2.P && (u2.i < 4 || !b("ES5").K(u2)))
        return u2.t;
      u2.I = true, e2 = F(t2, c2), u2.I = false;
    } else
      e2 = F(t2, c2);
    return i(e2, function(t3, r2) {
      u2 && a(u2.t, t3) === r2 || f(e2, t3, n2(r2));
    }), c2 === 3 ? new Set(e2) : e2;
  }(e);
}
function F(n2, t2) {
  switch (t2) {
    case 2:
      return new Map(n2);
    case 3:
      return Array.from(n2);
  }
  return l(n2);
}
function C() {
  function t2(n2, t3) {
    function r2() {
      this.constructor = n2;
    }
    a2(n2, t3), n2.prototype = (r2.prototype = t3.prototype, new r2());
  }
  function e(n2) {
    n2.o || (n2.D = new Map(), n2.o = new Map(n2.t));
  }
  function o2(n2) {
    n2.o || (n2.o = new Set(), n2.t.forEach(function(t3) {
      if (r(t3)) {
        var e2 = R(n2.A.h, t3, n2);
        n2.p.set(t3, e2), n2.o.add(e2);
      } else
        n2.o.add(t3);
    }));
  }
  function u2(t3) {
    t3.O && n(3, JSON.stringify(p(t3)));
  }
  var a2 = function(n2, t3) {
    return (a2 = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(n3, t4) {
      n3.__proto__ = t4;
    } || function(n3, t4) {
      for (var r2 in t4)
        t4.hasOwnProperty(r2) && (n3[r2] = t4[r2]);
    })(n2, t3);
  }, f2 = function() {
    function n2(n3, t3) {
      return this[Q] = { i: 2, l: t3, A: t3 ? t3.A : _(), P: false, I: false, o: void 0, D: void 0, t: n3, k: this, C: false, O: false }, this;
    }
    t2(n2, Map);
    var o3 = n2.prototype;
    return Object.defineProperty(o3, "size", { get: function() {
      return p(this[Q]).size;
    } }), o3.has = function(n3) {
      return p(this[Q]).has(n3);
    }, o3.set = function(n3, t3) {
      var r2 = this[Q];
      return u2(r2), p(r2).has(n3) && p(r2).get(n3) === t3 || (e(r2), k(r2), r2.D.set(n3, true), r2.o.set(n3, t3), r2.D.set(n3, true)), this;
    }, o3.delete = function(n3) {
      if (!this.has(n3))
        return false;
      var t3 = this[Q];
      return u2(t3), e(t3), k(t3), t3.D.set(n3, false), t3.o.delete(n3), true;
    }, o3.clear = function() {
      var n3 = this[Q];
      u2(n3), p(n3).size && (e(n3), k(n3), n3.D = new Map(), i(n3.t, function(t3) {
        n3.D.set(t3, false);
      }), n3.o.clear());
    }, o3.forEach = function(n3, t3) {
      var r2 = this;
      p(this[Q]).forEach(function(e2, i2) {
        n3.call(t3, r2.get(i2), i2, r2);
      });
    }, o3.get = function(n3) {
      var t3 = this[Q];
      u2(t3);
      var i2 = p(t3).get(n3);
      if (t3.I || !r(i2))
        return i2;
      if (i2 !== t3.t.get(n3))
        return i2;
      var o4 = R(t3.A.h, i2, t3);
      return e(t3), t3.o.set(n3, o4), o4;
    }, o3.keys = function() {
      return p(this[Q]).keys();
    }, o3.values = function() {
      var n3, t3 = this, r2 = this.keys();
      return (n3 = {})[V] = function() {
        return t3.values();
      }, n3.next = function() {
        var n4 = r2.next();
        return n4.done ? n4 : { done: false, value: t3.get(n4.value) };
      }, n3;
    }, o3.entries = function() {
      var n3, t3 = this, r2 = this.keys();
      return (n3 = {})[V] = function() {
        return t3.entries();
      }, n3.next = function() {
        var n4 = r2.next();
        if (n4.done)
          return n4;
        var e2 = t3.get(n4.value);
        return { done: false, value: [n4.value, e2] };
      }, n3;
    }, o3[V] = function() {
      return this.entries();
    }, n2;
  }(), c2 = function() {
    function n2(n3, t3) {
      return this[Q] = { i: 3, l: t3, A: t3 ? t3.A : _(), P: false, I: false, o: void 0, t: n3, k: this, p: new Map(), O: false, C: false }, this;
    }
    t2(n2, Set);
    var r2 = n2.prototype;
    return Object.defineProperty(r2, "size", { get: function() {
      return p(this[Q]).size;
    } }), r2.has = function(n3) {
      var t3 = this[Q];
      return u2(t3), t3.o ? !!t3.o.has(n3) || !(!t3.p.has(n3) || !t3.o.has(t3.p.get(n3))) : t3.t.has(n3);
    }, r2.add = function(n3) {
      var t3 = this[Q];
      return u2(t3), this.has(n3) || (o2(t3), k(t3), t3.o.add(n3)), this;
    }, r2.delete = function(n3) {
      if (!this.has(n3))
        return false;
      var t3 = this[Q];
      return u2(t3), o2(t3), k(t3), t3.o.delete(n3) || !!t3.p.has(n3) && t3.o.delete(t3.p.get(n3));
    }, r2.clear = function() {
      var n3 = this[Q];
      u2(n3), p(n3).size && (o2(n3), k(n3), n3.o.clear());
    }, r2.values = function() {
      var n3 = this[Q];
      return u2(n3), o2(n3), n3.o.values();
    }, r2.entries = function() {
      var n3 = this[Q];
      return u2(n3), o2(n3), n3.o.entries();
    }, r2.keys = function() {
      return this.values();
    }, r2[V] = function() {
      return this.values();
    }, r2.forEach = function(n3, t3) {
      for (var r3 = this.values(), e2 = r3.next(); !e2.done; )
        n3.call(t3, e2.value, e2.value, this), e2 = r3.next();
    }, n2;
  }();
  m("MapSet", { N: function(n2, t3) {
    return new f2(n2, t3);
  }, T: function(n2, t3) {
    return new c2(n2, t3);
  } });
}
var G, U, W = typeof Symbol != "undefined" && typeof Symbol("x") == "symbol", X = typeof Map != "undefined", q = typeof Set != "undefined", B = typeof Proxy != "undefined" && Proxy.revocable !== void 0 && typeof Reflect != "undefined", H = W ? Symbol.for("immer-nothing") : ((G = {})["immer-nothing"] = true, G), L = W ? Symbol.for("immer-draftable") : "__$immer_draftable", Q = W ? Symbol.for("immer-state") : "__$immer_state", V = typeof Symbol != "undefined" && Symbol.iterator || "@@iterator", Z = "" + Object.prototype.constructor, nn = typeof Reflect != "undefined" && Reflect.ownKeys ? Reflect.ownKeys : Object.getOwnPropertySymbols !== void 0 ? function(n2) {
  return Object.getOwnPropertyNames(n2).concat(Object.getOwnPropertySymbols(n2));
} : Object.getOwnPropertyNames, tn = Object.getOwnPropertyDescriptors || function(n2) {
  var t2 = {};
  return nn(n2).forEach(function(r2) {
    t2[r2] = Object.getOwnPropertyDescriptor(n2, r2);
  }), t2;
}, rn = {}, en = { get: function(n2, t2) {
  if (t2 === Q)
    return n2;
  var e = p(n2);
  if (!u(e, t2))
    return function(n3, t3, r2) {
      var e2, i3 = I(t3, r2);
      return i3 ? "value" in i3 ? i3.value : (e2 = i3.get) === null || e2 === void 0 ? void 0 : e2.call(n3.k) : void 0;
    }(n2, e, t2);
  var i2 = e[t2];
  return n2.I || !r(i2) ? i2 : i2 === z(n2.t, t2) ? (E(n2), n2.o[t2] = R(n2.A.h, i2, n2)) : i2;
}, has: function(n2, t2) {
  return t2 in p(n2);
}, ownKeys: function(n2) {
  return Reflect.ownKeys(p(n2));
}, set: function(n2, t2, r2) {
  var e = I(p(n2), t2);
  if (e == null ? void 0 : e.set)
    return e.set.call(n2.k, r2), true;
  if (!n2.P) {
    var i2 = z(p(n2), t2), o2 = i2 == null ? void 0 : i2[Q];
    if (o2 && o2.t === r2)
      return n2.o[t2] = r2, n2.D[t2] = false, true;
    if (c(r2, i2) && (r2 !== void 0 || u(n2.t, t2)))
      return true;
    E(n2), k(n2);
  }
  return n2.o[t2] === r2 && typeof r2 != "number" && (r2 !== void 0 || t2 in n2.o) || (n2.o[t2] = r2, n2.D[t2] = true, true);
}, deleteProperty: function(n2, t2) {
  return z(n2.t, t2) !== void 0 || t2 in n2.t ? (n2.D[t2] = false, E(n2), k(n2)) : delete n2.D[t2], n2.o && delete n2.o[t2], true;
}, getOwnPropertyDescriptor: function(n2, t2) {
  var r2 = p(n2), e = Reflect.getOwnPropertyDescriptor(r2, t2);
  return e ? { writable: true, configurable: n2.i !== 1 || t2 !== "length", enumerable: e.enumerable, value: r2[t2] } : e;
}, defineProperty: function() {
  n(11);
}, getPrototypeOf: function(n2) {
  return Object.getPrototypeOf(n2.t);
}, setPrototypeOf: function() {
  n(12);
} }, on = {};
i(en, function(n2, t2) {
  on[n2] = function() {
    return arguments[0] = arguments[0][0], t2.apply(this, arguments);
  };
}), on.deleteProperty = function(t2, r2) {
  return en.deleteProperty.call(this, t2[0], r2);
}, on.set = function(t2, r2, e) {
  return en.set.call(this, t2[0], r2, e, t2[0]);
};
var un = function() {
  function e(t2) {
    var e2 = this;
    this.g = B, this.F = true, this.produce = function(t3, i3, o2) {
      if (typeof t3 == "function" && typeof i3 != "function") {
        var u2 = i3;
        i3 = t3;
        var a2 = e2;
        return function(n2) {
          var t4 = this;
          n2 === void 0 && (n2 = u2);
          for (var r2 = arguments.length, e3 = Array(r2 > 1 ? r2 - 1 : 0), o3 = 1; o3 < r2; o3++)
            e3[o3 - 1] = arguments[o3];
          return a2.produce(n2, function(n3) {
            var r3;
            return (r3 = i3).call.apply(r3, [t4, n3].concat(e3));
          });
        };
      }
      var f2;
      if (typeof i3 != "function" && n(6), o2 !== void 0 && typeof o2 != "function" && n(7), r(t3)) {
        var c2 = w(e2), s2 = R(e2, t3, void 0), v2 = true;
        try {
          f2 = i3(s2), v2 = false;
        } finally {
          v2 ? O(c2) : g(c2);
        }
        return typeof Promise != "undefined" && f2 instanceof Promise ? f2.then(function(n2) {
          return j(c2, o2), P(n2, c2);
        }, function(n2) {
          throw O(c2), n2;
        }) : (j(c2, o2), P(f2, c2));
      }
      if (!t3 || typeof t3 != "object") {
        if ((f2 = i3(t3)) === H)
          return;
        return f2 === void 0 && (f2 = t3), e2.F && d(f2, true), f2;
      }
      n(21, t3);
    }, this.produceWithPatches = function(n2, t3) {
      return typeof n2 == "function" ? function(t4) {
        for (var r3 = arguments.length, i4 = Array(r3 > 1 ? r3 - 1 : 0), o2 = 1; o2 < r3; o2++)
          i4[o2 - 1] = arguments[o2];
        return e2.produceWithPatches(t4, function(t5) {
          return n2.apply(void 0, [t5].concat(i4));
        });
      } : [e2.produce(n2, t3, function(n3, t4) {
        r2 = n3, i3 = t4;
      }), r2, i3];
      var r2, i3;
    }, typeof (t2 == null ? void 0 : t2.useProxies) == "boolean" && this.setUseProxies(t2.useProxies), typeof (t2 == null ? void 0 : t2.autoFreeze) == "boolean" && this.setAutoFreeze(t2.autoFreeze);
  }
  var i2 = e.prototype;
  return i2.createDraft = function(e2) {
    r(e2) || n(8), t(e2) && (e2 = D(e2));
    var i3 = w(this), o2 = R(this, e2, void 0);
    return o2[Q].C = true, g(i3), o2;
  }, i2.finishDraft = function(t2, r2) {
    var e2 = t2 && t2[Q];
    var i3 = e2.A;
    return j(i3, r2), P(void 0, i3);
  }, i2.setAutoFreeze = function(n2) {
    this.F = n2;
  }, i2.setUseProxies = function(t2) {
    t2 && !B && n(20), this.g = t2;
  }, i2.applyPatches = function(n2, r2) {
    var e2;
    for (e2 = r2.length - 1; e2 >= 0; e2--) {
      var i3 = r2[e2];
      if (i3.path.length === 0 && i3.op === "replace") {
        n2 = i3.value;
        break;
      }
    }
    var o2 = b("Patches").$;
    return t(n2) ? o2(n2, r2) : this.produce(n2, function(n3) {
      return o2(n3, r2.slice(e2 + 1));
    });
  }, e;
}(), an = new un(), fn = an.produce;
an.produceWithPatches.bind(an);
an.setAutoFreeze.bind(an);
an.setUseProxies.bind(an);
an.applyPatches.bind(an);
an.createDraft.bind(an);
an.finishDraft.bind(an);
class ValueSubject extends BehaviorSubject {
  next(value) {
    if (this.value !== value) {
      super.next(value);
    }
  }
}
function WorkerWrapper() {
  return new Worker("/assets/document_worker.4dcf3d91.js", {
    "type": "module"
  });
}
C();
const projects$ = new ValueSubject(new Map());
const contents$ = new ValueSubject(new Map());
const addOrUpdateProject = (project) => {
  projects$.next(fn(projects$.value, (draft) => {
    draft.set(project.slug, project);
  }));
};
const updateContents = (contentsIn, projectSlug) => {
  contents$.next(fn(contents$.value, (draft) => {
    draft.get(projectSlug).set(contentsIn.slug, __spreadValues(__spreadValues({}, draft.get(projectSlug).get(contentsIn.slug)), contentsIn));
  }));
};
const removeContents = (contentsSlug, projectSlug) => {
  contents$.next(fn(contents$.value, (draft) => {
    var _a;
    (_a = draft.get(projectSlug)) == null ? void 0 : _a.delete(contentsSlug);
  }));
};
const addOrUpdateContents = (contentsIn, projectSlug) => {
  contents$.next(fn(contents$.value, (draft) => {
    if (!draft.has(projectSlug)) {
      draft.set(projectSlug, new Map());
    }
    draft.get(projectSlug).set(contentsIn.slug, contentsIn);
  }));
};
const addOrUpdateManyContents = (contentsIn, projectSlug) => {
  contents$.next(fn(contents$.value, (draft) => {
    if (!draft.has(projectSlug)) {
      draft.set(projectSlug, new Map());
    }
    contentsIn.forEach((contents) => {
      draft.get(projectSlug).set(contents.slug, contents);
    });
  }));
};
const documents$ = new ValueSubject(new Map());
const queuedDocuments$ = new ValueSubject({
  docs: new Map(),
  order: []
});
const fetchingDocuments$ = new ValueSubject(new Set());
const CACHE_PREFEX = "doks-cache";
let flushCache = false;
window.flushCacheOnReload = () => {
  flushCache = true;
};
const cachedDocuments = new Map();
const getCachedDocument = (slug) => {
  if (cachedDocuments.has(slug)) {
    return cachedDocuments.get(slug);
  }
  const cachedString = localStorage.getItem(CACHE_PREFEX + slug);
  if (cachedString) {
    const doc = JSON.parse(cachedString);
    cachedDocuments.set(slug, doc);
    return doc;
  }
  return void 0;
};
const modifyDocument = (doc) => {
  documents$.next(fn(documents$.value, (draft) => {
    var _a;
    const docNew = __spreadValues(__spreadValues({}, (_a = documents$.value.get(doc.slug)) != null ? _a : {}), doc);
    if (docNew.name === docNew.path) {
      if (docNew.mdx.trim().startsWith("#")) {
        docNew.name = docNew.mdx.split("\n")[0].replace("#", "").trim();
      }
    }
    updateContents({ slug: docNew.slug, name: docNew.name }, docNew.projectSlug);
    draft.set(doc.slug, docNew);
  }));
};
const cacheDocument = (doc) => {
  if (!flushCache) {
    localStorage.setItem(CACHE_PREFEX + doc.slug, JSON.stringify(doc));
  }
};
window.onunload = () => {
  if (flushCache) {
    localStorage.clear();
  }
  documents$.value.forEach((doc) => cacheDocument(doc));
};
const getLastModified = async (src) => {
  try {
    return await fetch(src, {
      method: "HEAD"
    }).then((response) => {
      if (response.ok) {
        return response.headers.get("Last-Modified");
      } else {
        throw new Error("does not exist");
      }
    });
  } catch (e) {
    return false;
  }
};
const workerPool = [];
const spawnWorker = () => {
  const worker = new WorkerWrapper();
  worker.onmessage = (event) => {
    switch (event.data[0]) {
      case "fetch_done":
        workerPool.push(worker);
        const doc = event.data[1];
        modifyDocument(doc);
        fetchingDocuments$.next(fn(fetchingDocuments$.value, (draft) => {
          draft.delete(doc.slug);
        }));
    }
  };
  return worker;
};
const sendToWorker = (type, payload) => {
  var _a;
  const worker = (_a = workerPool.shift()) != null ? _a : spawnWorker();
  worker.postMessage([type, payload]);
};
const fetchDocument = async (contents) => {
  const project = projects$.value.get(contents.projectSlug);
  fetchingDocuments$.next(fn(fetchingDocuments$.value, (draft) => {
    draft.add(contents.slug);
  }));
  const cached = getCachedDocument(contents.slug);
  if (cached && cached.lastModified === contents.lastModified) {
    modifyDocument(cached);
    fetchingDocuments$.next(fn(fetchingDocuments$.value, (draft) => {
      draft.delete(contents.slug);
    }));
  } else {
    sendToWorker("fetch", {
      contents: __spreadValues({}, contents),
      projectRoot: project.root
    });
  }
};
const MAX_QUEUE = 50;
const shiftQueue = () => {
  if (queuedDocuments$.value.order.length > 0 && queuedDocuments$.value.docs.size < MAX_QUEUE) {
    let contents;
    queuedDocuments$.next(fn(queuedDocuments$.value, (draft) => {
      const slug = draft.order.shift();
      contents = queuedDocuments$.value.docs.get(slug);
      draft.docs.delete(slug);
      const index = draft.order.indexOf(slug);
      if (index > -1) {
        draft.order.splice(index, 1);
      }
    }));
    fetchDocument(contents);
  }
};
fetchingDocuments$.subscribe(shiftQueue);
const queueDocument = (contents, prioritize = false) => {
  if (documents$.value.has(contents.slug) || fetchingDocuments$.value.has(contents.slug)) {
    return;
  }
  queuedDocuments$.next(fn(queuedDocuments$.value, (draft) => {
    draft.docs.set(contents.slug, contents);
    if (prioritize) {
      const index = draft.order.indexOf(contents.slug);
      if (index > -1) {
        draft.order.splice(index, 1);
      }
      draft.order.unshift(contents.slug);
    } else {
      draft.order.push(contents.slug);
    }
  }));
  shiftQueue();
};
export { ValueSubject as V, addOrUpdateProject as a, addOrUpdateManyContents as b, contents$ as c, documents$ as d, addOrUpdateContents as e, fetchingDocuments$ as f, getLastModified as g, getCachedDocument as h, queueDocument as i, modifyDocument as m, projects$ as p, queuedDocuments$ as q, removeContents as r };
//# sourceMappingURL=documents.js.map
