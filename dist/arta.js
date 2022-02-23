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
var arta$1 = {};
Object.defineProperty(arta$1, "__esModule", {
  value: true
});
var default_1 = arta$1.default = void 0;
var _default = {
  "hljs": {
    "display": "block",
    "overflowX": "auto",
    "padding": "0.5em",
    "background": "#222",
    "color": "#aaa"
  },
  "hljs-subst": {
    "color": "#aaa"
  },
  "hljs-section": {
    "color": "#fff",
    "fontWeight": "bold"
  },
  "hljs-comment": {
    "color": "#444"
  },
  "hljs-quote": {
    "color": "#444"
  },
  "hljs-meta": {
    "color": "#444"
  },
  "hljs-string": {
    "color": "#ffcc33"
  },
  "hljs-symbol": {
    "color": "#ffcc33"
  },
  "hljs-bullet": {
    "color": "#ffcc33"
  },
  "hljs-regexp": {
    "color": "#ffcc33"
  },
  "hljs-number": {
    "color": "#00cc66"
  },
  "hljs-addition": {
    "color": "#00cc66"
  },
  "hljs-built_in": {
    "color": "#32aaee"
  },
  "hljs-builtin-name": {
    "color": "#32aaee"
  },
  "hljs-literal": {
    "color": "#32aaee"
  },
  "hljs-type": {
    "color": "#32aaee"
  },
  "hljs-template-variable": {
    "color": "#32aaee"
  },
  "hljs-attribute": {
    "color": "#32aaee"
  },
  "hljs-link": {
    "color": "#32aaee"
  },
  "hljs-keyword": {
    "color": "#6644aa"
  },
  "hljs-selector-tag": {
    "color": "#6644aa"
  },
  "hljs-name": {
    "color": "#6644aa"
  },
  "hljs-selector-id": {
    "color": "#6644aa"
  },
  "hljs-selector-class": {
    "color": "#6644aa"
  },
  "hljs-title": {
    "color": "#bb1166"
  },
  "hljs-variable": {
    "color": "#bb1166"
  },
  "hljs-deletion": {
    "color": "#bb1166"
  },
  "hljs-template-tag": {
    "color": "#bb1166"
  },
  "hljs-doctag": {
    "fontWeight": "bold"
  },
  "hljs-strong": {
    "fontWeight": "bold"
  },
  "hljs-emphasis": {
    "fontStyle": "italic"
  }
};
default_1 = arta$1.default = _default;
var arta = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ _mergeNamespaces({
  __proto__: null,
  [Symbol.toStringTag]: "Module",
  get default() {
    return default_1;
  }
}, [arta$1]));
export { arta as a };
//# sourceMappingURL=arta.js.map
