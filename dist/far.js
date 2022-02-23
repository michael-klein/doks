function _mergeNamespaces(n, m) {
  m.forEach(function(e) {
    e && typeof e !== "string" && !Array.isArray(e) && Object.keys(e).forEach(function(k) {
      if (k !== "default" && !(k in n)) {
        var d = Object.getOwnPropertyDescriptor(e, k);
        Object.defineProperty(n, k, d.get ? d : {
          enumerable: true,
          get: function() {
            return e[k];
          }
        });
      }
    });
  });
  return Object.freeze(n);
}
var far$1 = {};
Object.defineProperty(far$1, "__esModule", {
  value: true
});
var default_1 = far$1.default = void 0;
var _default = {
  "hljs": {
    "display": "block",
    "overflowX": "auto",
    "padding": "0.5em",
    "background": "#000080",
    "color": "#0ff"
  },
  "hljs-subst": {
    "color": "#0ff"
  },
  "hljs-string": {
    "color": "#ff0"
  },
  "hljs-attribute": {
    "color": "#ff0"
  },
  "hljs-symbol": {
    "color": "#ff0"
  },
  "hljs-bullet": {
    "color": "#ff0"
  },
  "hljs-built_in": {
    "color": "#ff0"
  },
  "hljs-builtin-name": {
    "color": "#ff0"
  },
  "hljs-template-tag": {
    "color": "#ff0"
  },
  "hljs-template-variable": {
    "color": "#ff0"
  },
  "hljs-addition": {
    "color": "#ff0"
  },
  "hljs-keyword": {
    "color": "#fff",
    "fontWeight": "bold"
  },
  "hljs-selector-tag": {
    "color": "#fff",
    "fontWeight": "bold"
  },
  "hljs-section": {
    "color": "#fff",
    "fontWeight": "bold"
  },
  "hljs-type": {
    "color": "#fff"
  },
  "hljs-name": {
    "color": "#fff",
    "fontWeight": "bold"
  },
  "hljs-selector-id": {
    "color": "#fff"
  },
  "hljs-selector-class": {
    "color": "#fff"
  },
  "hljs-variable": {
    "color": "#fff"
  },
  "hljs-comment": {
    "color": "#888"
  },
  "hljs-quote": {
    "color": "#888"
  },
  "hljs-doctag": {
    "color": "#888"
  },
  "hljs-deletion": {
    "color": "#888"
  },
  "hljs-number": {
    "color": "#0f0"
  },
  "hljs-regexp": {
    "color": "#0f0"
  },
  "hljs-literal": {
    "color": "#0f0"
  },
  "hljs-link": {
    "color": "#0f0"
  },
  "hljs-meta": {
    "color": "#008080"
  },
  "hljs-title": {
    "fontWeight": "bold"
  },
  "hljs-strong": {
    "fontWeight": "bold"
  },
  "hljs-emphasis": {
    "fontStyle": "italic"
  }
};
default_1 = far$1.default = _default;
var far = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ _mergeNamespaces({
  __proto__: null,
  [Symbol.toStringTag]: "Module",
  get default() {
    return default_1;
  }
}, [far$1]));
export { far as f };
//# sourceMappingURL=far.js.map
