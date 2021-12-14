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
var monokai$1 = {};
Object.defineProperty(monokai$1, "__esModule", {
  value: true
});
var default_1 = monokai$1.default = void 0;
var _default = {
  "hljs": {
    "display": "block",
    "overflowX": "auto",
    "padding": "0.5em",
    "background": "#272822",
    "color": "#ddd"
  },
  "hljs-tag": {
    "color": "#f92672"
  },
  "hljs-keyword": {
    "color": "#f92672",
    "fontWeight": "bold"
  },
  "hljs-selector-tag": {
    "color": "#f92672",
    "fontWeight": "bold"
  },
  "hljs-literal": {
    "color": "#f92672",
    "fontWeight": "bold"
  },
  "hljs-strong": {
    "color": "#f92672"
  },
  "hljs-name": {
    "color": "#f92672"
  },
  "hljs-code": {
    "color": "#66d9ef"
  },
  "hljs-class .hljs-title": {
    "color": "white"
  },
  "hljs-attribute": {
    "color": "#bf79db"
  },
  "hljs-symbol": {
    "color": "#bf79db"
  },
  "hljs-regexp": {
    "color": "#bf79db"
  },
  "hljs-link": {
    "color": "#bf79db"
  },
  "hljs-string": {
    "color": "#a6e22e"
  },
  "hljs-bullet": {
    "color": "#a6e22e"
  },
  "hljs-subst": {
    "color": "#a6e22e"
  },
  "hljs-title": {
    "color": "#a6e22e",
    "fontWeight": "bold"
  },
  "hljs-section": {
    "color": "#a6e22e",
    "fontWeight": "bold"
  },
  "hljs-emphasis": {
    "color": "#a6e22e"
  },
  "hljs-type": {
    "color": "#a6e22e",
    "fontWeight": "bold"
  },
  "hljs-built_in": {
    "color": "#a6e22e"
  },
  "hljs-builtin-name": {
    "color": "#a6e22e"
  },
  "hljs-selector-attr": {
    "color": "#a6e22e"
  },
  "hljs-selector-pseudo": {
    "color": "#a6e22e"
  },
  "hljs-addition": {
    "color": "#a6e22e"
  },
  "hljs-variable": {
    "color": "#a6e22e"
  },
  "hljs-template-tag": {
    "color": "#a6e22e"
  },
  "hljs-template-variable": {
    "color": "#a6e22e"
  },
  "hljs-comment": {
    "color": "#75715e"
  },
  "hljs-quote": {
    "color": "#75715e"
  },
  "hljs-deletion": {
    "color": "#75715e"
  },
  "hljs-meta": {
    "color": "#75715e"
  },
  "hljs-doctag": {
    "fontWeight": "bold"
  },
  "hljs-selector-id": {
    "fontWeight": "bold"
  }
};
default_1 = monokai$1.default = _default;
var monokai = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ _mergeNamespaces({
  __proto__: null,
  [Symbol.toStringTag]: "Module",
  get default() {
    return default_1;
  }
}, [monokai$1]));
export { monokai as m };
//# sourceMappingURL=monokai.js.map
