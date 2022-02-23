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
var darcula$1 = {};
Object.defineProperty(darcula$1, "__esModule", {
  value: true
});
var default_1 = darcula$1.default = void 0;
var _default = {
  "hljs": {
    "display": "block",
    "overflowX": "auto",
    "padding": "0.5em",
    "background": "#2b2b2b",
    "color": "#bababa"
  },
  "hljs-strong": {
    "color": "#a8a8a2"
  },
  "hljs-emphasis": {
    "color": "#a8a8a2",
    "fontStyle": "italic"
  },
  "hljs-bullet": {
    "color": "#6896ba"
  },
  "hljs-quote": {
    "color": "#6896ba"
  },
  "hljs-link": {
    "color": "#6896ba"
  },
  "hljs-number": {
    "color": "#6896ba"
  },
  "hljs-regexp": {
    "color": "#6896ba"
  },
  "hljs-literal": {
    "color": "#6896ba"
  },
  "hljs-code": {
    "color": "#a6e22e"
  },
  "hljs-selector-class": {
    "color": "#a6e22e"
  },
  "hljs-keyword": {
    "color": "#cb7832"
  },
  "hljs-selector-tag": {
    "color": "#cb7832"
  },
  "hljs-section": {
    "color": "#cb7832"
  },
  "hljs-attribute": {
    "color": "#cb7832"
  },
  "hljs-name": {
    "color": "#cb7832"
  },
  "hljs-variable": {
    "color": "#cb7832"
  },
  "hljs-params": {
    "color": "#b9b9b9"
  },
  "hljs-string": {
    "color": "#6a8759"
  },
  "hljs-subst": {
    "color": "#e0c46c"
  },
  "hljs-type": {
    "color": "#e0c46c"
  },
  "hljs-built_in": {
    "color": "#e0c46c"
  },
  "hljs-builtin-name": {
    "color": "#e0c46c"
  },
  "hljs-symbol": {
    "color": "#e0c46c"
  },
  "hljs-selector-id": {
    "color": "#e0c46c"
  },
  "hljs-selector-attr": {
    "color": "#e0c46c"
  },
  "hljs-selector-pseudo": {
    "color": "#e0c46c"
  },
  "hljs-template-tag": {
    "color": "#e0c46c"
  },
  "hljs-template-variable": {
    "color": "#e0c46c"
  },
  "hljs-addition": {
    "color": "#e0c46c"
  },
  "hljs-comment": {
    "color": "#7f7f7f"
  },
  "hljs-deletion": {
    "color": "#7f7f7f"
  },
  "hljs-meta": {
    "color": "#7f7f7f"
  }
};
default_1 = darcula$1.default = _default;
var darcula = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ _mergeNamespaces({
  __proto__: null,
  [Symbol.toStringTag]: "Module",
  get default() {
    return default_1;
  }
}, [darcula$1]));
export { darcula as d };
//# sourceMappingURL=darcula.js.map
