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
var github$1 = {};
Object.defineProperty(github$1, "__esModule", {
  value: true
});
var default_1 = github$1.default = void 0;
var _default = {
  "hljs": {
    "display": "block",
    "overflowX": "auto",
    "padding": "0.5em",
    "color": "#333",
    "background": "#f8f8f8"
  },
  "hljs-comment": {
    "color": "#998",
    "fontStyle": "italic"
  },
  "hljs-quote": {
    "color": "#998",
    "fontStyle": "italic"
  },
  "hljs-keyword": {
    "color": "#333",
    "fontWeight": "bold"
  },
  "hljs-selector-tag": {
    "color": "#333",
    "fontWeight": "bold"
  },
  "hljs-subst": {
    "color": "#333",
    "fontWeight": "normal"
  },
  "hljs-number": {
    "color": "#008080"
  },
  "hljs-literal": {
    "color": "#008080"
  },
  "hljs-variable": {
    "color": "#008080"
  },
  "hljs-template-variable": {
    "color": "#008080"
  },
  "hljs-tag .hljs-attr": {
    "color": "#008080"
  },
  "hljs-string": {
    "color": "#d14"
  },
  "hljs-doctag": {
    "color": "#d14"
  },
  "hljs-title": {
    "color": "#900",
    "fontWeight": "bold"
  },
  "hljs-section": {
    "color": "#900",
    "fontWeight": "bold"
  },
  "hljs-selector-id": {
    "color": "#900",
    "fontWeight": "bold"
  },
  "hljs-type": {
    "color": "#458",
    "fontWeight": "bold"
  },
  "hljs-class .hljs-title": {
    "color": "#458",
    "fontWeight": "bold"
  },
  "hljs-tag": {
    "color": "#000080",
    "fontWeight": "normal"
  },
  "hljs-name": {
    "color": "#000080",
    "fontWeight": "normal"
  },
  "hljs-attribute": {
    "color": "#000080",
    "fontWeight": "normal"
  },
  "hljs-regexp": {
    "color": "#009926"
  },
  "hljs-link": {
    "color": "#009926"
  },
  "hljs-symbol": {
    "color": "#990073"
  },
  "hljs-bullet": {
    "color": "#990073"
  },
  "hljs-built_in": {
    "color": "#0086b3"
  },
  "hljs-builtin-name": {
    "color": "#0086b3"
  },
  "hljs-meta": {
    "color": "#999",
    "fontWeight": "bold"
  },
  "hljs-deletion": {
    "background": "#fdd"
  },
  "hljs-addition": {
    "background": "#dfd"
  },
  "hljs-emphasis": {
    "fontStyle": "italic"
  },
  "hljs-strong": {
    "fontWeight": "bold"
  }
};
default_1 = github$1.default = _default;
var github = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ _mergeNamespaces({
  __proto__: null,
  [Symbol.toStringTag]: "Module",
  get default() {
    return default_1;
  }
}, [github$1]));
export { github as g };
//# sourceMappingURL=github.js.map
