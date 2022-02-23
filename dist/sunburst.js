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
var sunburst$1 = {};
Object.defineProperty(sunburst$1, "__esModule", {
  value: true
});
var default_1 = sunburst$1.default = void 0;
var _default = {
  "hljs": {
    "display": "block",
    "overflowX": "auto",
    "padding": "0.5em",
    "background": "#000",
    "color": "#f8f8f8"
  },
  "hljs-comment": {
    "color": "#aeaeae",
    "fontStyle": "italic"
  },
  "hljs-quote": {
    "color": "#aeaeae",
    "fontStyle": "italic"
  },
  "hljs-keyword": {
    "color": "#e28964"
  },
  "hljs-selector-tag": {
    "color": "#e28964"
  },
  "hljs-type": {
    "color": "#e28964"
  },
  "hljs-string": {
    "color": "#65b042"
  },
  "hljs-subst": {
    "color": "#daefa3"
  },
  "hljs-regexp": {
    "color": "#e9c062"
  },
  "hljs-link": {
    "color": "#e9c062"
  },
  "hljs-title": {
    "color": "#89bdff"
  },
  "hljs-section": {
    "color": "#89bdff"
  },
  "hljs-tag": {
    "color": "#89bdff"
  },
  "hljs-name": {
    "color": "#89bdff"
  },
  "hljs-class .hljs-title": {
    "textDecoration": "underline"
  },
  "hljs-doctag": {
    "textDecoration": "underline"
  },
  "hljs-symbol": {
    "color": "#3387cc"
  },
  "hljs-bullet": {
    "color": "#3387cc"
  },
  "hljs-number": {
    "color": "#3387cc"
  },
  "hljs-params": {
    "color": "#3e87e3"
  },
  "hljs-variable": {
    "color": "#3e87e3"
  },
  "hljs-template-variable": {
    "color": "#3e87e3"
  },
  "hljs-attribute": {
    "color": "#cda869"
  },
  "hljs-meta": {
    "color": "#8996a8"
  },
  "hljs-formula": {
    "backgroundColor": "#0e2231",
    "color": "#f8f8f8",
    "fontStyle": "italic"
  },
  "hljs-addition": {
    "backgroundColor": "#253b22",
    "color": "#f8f8f8"
  },
  "hljs-deletion": {
    "backgroundColor": "#420e09",
    "color": "#f8f8f8"
  },
  "hljs-selector-class": {
    "color": "#9b703f"
  },
  "hljs-selector-id": {
    "color": "#8b98ab"
  },
  "hljs-emphasis": {
    "fontStyle": "italic"
  },
  "hljs-strong": {
    "fontWeight": "bold"
  }
};
default_1 = sunburst$1.default = _default;
var sunburst = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ _mergeNamespaces({
  __proto__: null,
  [Symbol.toStringTag]: "Module",
  get default() {
    return default_1;
  }
}, [sunburst$1]));
export { sunburst as s };
//# sourceMappingURL=sunburst.js.map
