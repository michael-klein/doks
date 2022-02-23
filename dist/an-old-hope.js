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
var anOldHope$1 = {};
Object.defineProperty(anOldHope$1, "__esModule", {
  value: true
});
var default_1 = anOldHope$1.default = void 0;
var _default = {
  "hljs-comment": {
    "color": "#B6B18B"
  },
  "hljs-quote": {
    "color": "#B6B18B"
  },
  "hljs-variable": {
    "color": "#EB3C54"
  },
  "hljs-template-variable": {
    "color": "#EB3C54"
  },
  "hljs-tag": {
    "color": "#EB3C54"
  },
  "hljs-name": {
    "color": "#EB3C54"
  },
  "hljs-selector-id": {
    "color": "#EB3C54"
  },
  "hljs-selector-class": {
    "color": "#EB3C54"
  },
  "hljs-regexp": {
    "color": "#EB3C54"
  },
  "hljs-deletion": {
    "color": "#EB3C54"
  },
  "hljs-number": {
    "color": "#E7CE56"
  },
  "hljs-built_in": {
    "color": "#E7CE56"
  },
  "hljs-builtin-name": {
    "color": "#E7CE56"
  },
  "hljs-literal": {
    "color": "#E7CE56"
  },
  "hljs-type": {
    "color": "#E7CE56"
  },
  "hljs-params": {
    "color": "#E7CE56"
  },
  "hljs-meta": {
    "color": "#E7CE56"
  },
  "hljs-link": {
    "color": "#E7CE56"
  },
  "hljs-attribute": {
    "color": "#EE7C2B"
  },
  "hljs-string": {
    "color": "#4FB4D7"
  },
  "hljs-symbol": {
    "color": "#4FB4D7"
  },
  "hljs-bullet": {
    "color": "#4FB4D7"
  },
  "hljs-addition": {
    "color": "#4FB4D7"
  },
  "hljs-title": {
    "color": "#78BB65"
  },
  "hljs-section": {
    "color": "#78BB65"
  },
  "hljs-keyword": {
    "color": "#B45EA4"
  },
  "hljs-selector-tag": {
    "color": "#B45EA4"
  },
  "hljs": {
    "display": "block",
    "overflowX": "auto",
    "background": "#1C1D21",
    "color": "#c0c5ce",
    "padding": "0.5em"
  },
  "hljs-emphasis": {
    "fontStyle": "italic"
  },
  "hljs-strong": {
    "fontWeight": "bold"
  }
};
default_1 = anOldHope$1.default = _default;
var anOldHope = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ _mergeNamespaces({
  __proto__: null,
  [Symbol.toStringTag]: "Module",
  get default() {
    return default_1;
  }
}, [anOldHope$1]));
export { anOldHope as a };
//# sourceMappingURL=an-old-hope.js.map
