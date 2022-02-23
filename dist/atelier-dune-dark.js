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
var atelierDuneDark$1 = {};
Object.defineProperty(atelierDuneDark$1, "__esModule", {
  value: true
});
var default_1 = atelierDuneDark$1.default = void 0;
var _default = {
  "hljs-comment": {
    "color": "#999580"
  },
  "hljs-quote": {
    "color": "#999580"
  },
  "hljs-variable": {
    "color": "#d73737"
  },
  "hljs-template-variable": {
    "color": "#d73737"
  },
  "hljs-attribute": {
    "color": "#d73737"
  },
  "hljs-tag": {
    "color": "#d73737"
  },
  "hljs-name": {
    "color": "#d73737"
  },
  "hljs-regexp": {
    "color": "#d73737"
  },
  "hljs-link": {
    "color": "#d73737"
  },
  "hljs-selector-id": {
    "color": "#d73737"
  },
  "hljs-selector-class": {
    "color": "#d73737"
  },
  "hljs-number": {
    "color": "#b65611"
  },
  "hljs-meta": {
    "color": "#b65611"
  },
  "hljs-built_in": {
    "color": "#b65611"
  },
  "hljs-builtin-name": {
    "color": "#b65611"
  },
  "hljs-literal": {
    "color": "#b65611"
  },
  "hljs-type": {
    "color": "#b65611"
  },
  "hljs-params": {
    "color": "#b65611"
  },
  "hljs-string": {
    "color": "#60ac39"
  },
  "hljs-symbol": {
    "color": "#60ac39"
  },
  "hljs-bullet": {
    "color": "#60ac39"
  },
  "hljs-title": {
    "color": "#6684e1"
  },
  "hljs-section": {
    "color": "#6684e1"
  },
  "hljs-keyword": {
    "color": "#b854d4"
  },
  "hljs-selector-tag": {
    "color": "#b854d4"
  },
  "hljs": {
    "display": "block",
    "overflowX": "auto",
    "background": "#20201d",
    "color": "#a6a28c",
    "padding": "0.5em"
  },
  "hljs-emphasis": {
    "fontStyle": "italic"
  },
  "hljs-strong": {
    "fontWeight": "bold"
  }
};
default_1 = atelierDuneDark$1.default = _default;
var atelierDuneDark = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ _mergeNamespaces({
  __proto__: null,
  [Symbol.toStringTag]: "Module",
  get default() {
    return default_1;
  }
}, [atelierDuneDark$1]));
export { atelierDuneDark as a };
//# sourceMappingURL=atelier-dune-dark.js.map
