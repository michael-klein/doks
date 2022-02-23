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
var nightOwl$1 = {};
Object.defineProperty(nightOwl$1, "__esModule", {
  value: true
});
var default_1 = nightOwl$1.default = void 0;
var _default = {
  "hljs": {
    "display": "block",
    "overflowX": "auto",
    "padding": "0.5em",
    "background": "#011627",
    "color": "#d6deeb"
  },
  "hljs-keyword": {
    "color": "#c792ea",
    "fontStyle": "italic"
  },
  "hljs-built_in": {
    "color": "#addb67",
    "fontStyle": "italic"
  },
  "hljs-type": {
    "color": "#82aaff"
  },
  "hljs-literal": {
    "color": "#ff5874"
  },
  "hljs-number": {
    "color": "#F78C6C"
  },
  "hljs-regexp": {
    "color": "#5ca7e4"
  },
  "hljs-string": {
    "color": "#ecc48d"
  },
  "hljs-subst": {
    "color": "#d3423e"
  },
  "hljs-symbol": {
    "color": "#82aaff"
  },
  "hljs-class": {
    "color": "#ffcb8b"
  },
  "hljs-function": {
    "color": "#82AAFF"
  },
  "hljs-title": {
    "color": "#DCDCAA",
    "fontStyle": "italic"
  },
  "hljs-params": {
    "color": "#7fdbca"
  },
  "hljs-comment": {
    "color": "#637777",
    "fontStyle": "italic"
  },
  "hljs-doctag": {
    "color": "#7fdbca"
  },
  "hljs-meta": {
    "color": "#82aaff"
  },
  "hljs-meta-keyword": {
    "color": "#82aaff"
  },
  "hljs-meta-string": {
    "color": "#ecc48d"
  },
  "hljs-section": {
    "color": "#82b1ff"
  },
  "hljs-tag": {
    "color": "#7fdbca"
  },
  "hljs-name": {
    "color": "#7fdbca"
  },
  "hljs-builtin-name": {
    "color": "#7fdbca"
  },
  "hljs-attr": {
    "color": "#7fdbca"
  },
  "hljs-attribute": {
    "color": "#80cbc4"
  },
  "hljs-variable": {
    "color": "#addb67"
  },
  "hljs-bullet": {
    "color": "#d9f5dd"
  },
  "hljs-code": {
    "color": "#80CBC4"
  },
  "hljs-emphasis": {
    "color": "#c792ea",
    "fontStyle": "italic"
  },
  "hljs-strong": {
    "color": "#addb67",
    "fontWeight": "bold"
  },
  "hljs-formula": {
    "color": "#c792ea"
  },
  "hljs-link": {
    "color": "#ff869a"
  },
  "hljs-quote": {
    "color": "#697098",
    "fontStyle": "italic"
  },
  "hljs-selector-tag": {
    "color": "#ff6363"
  },
  "hljs-selector-id": {
    "color": "#fad430"
  },
  "hljs-selector-class": {
    "color": "#addb67",
    "fontStyle": "italic"
  },
  "hljs-selector-attr": {
    "color": "#c792ea",
    "fontStyle": "italic"
  },
  "hljs-selector-pseudo": {
    "color": "#c792ea",
    "fontStyle": "italic"
  },
  "hljs-template-tag": {
    "color": "#c792ea"
  },
  "hljs-template-variable": {
    "color": "#addb67"
  },
  "hljs-addition": {
    "color": "#addb67ff",
    "fontStyle": "italic"
  },
  "hljs-deletion": {
    "color": "#EF535090",
    "fontStyle": "italic"
  }
};
default_1 = nightOwl$1.default = _default;
var nightOwl = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ _mergeNamespaces({
  __proto__: null,
  [Symbol.toStringTag]: "Module",
  get default() {
    return default_1;
  }
}, [nightOwl$1]));
export { nightOwl as n };
//# sourceMappingURL=night-owl.js.map
