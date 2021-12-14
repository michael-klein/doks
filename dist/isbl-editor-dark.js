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
var isblEditorDark$1 = {};
Object.defineProperty(isblEditorDark$1, "__esModule", {
  value: true
});
var default_1 = isblEditorDark$1.default = void 0;
var _default = {
  "hljs": {
    "display": "block",
    "overflowX": "auto",
    "padding": "0.5em",
    "background": "#404040",
    "color": "#f0f0f0"
  },
  "hljs-subst": {
    "color": "#f0f0f0"
  },
  "hljs-comment": {
    "color": "#b5b5b5",
    "fontStyle": "italic"
  },
  "hljs-keyword": {
    "color": "#f0f0f0",
    "fontWeight": "bold"
  },
  "hljs-attribute": {
    "color": "#f0f0f0",
    "fontWeight": "bold"
  },
  "hljs-selector-tag": {
    "color": "#f0f0f0",
    "fontWeight": "bold"
  },
  "hljs-meta-keyword": {
    "color": "#f0f0f0",
    "fontWeight": "bold"
  },
  "hljs-doctag": {
    "color": "#f0f0f0",
    "fontWeight": "bold"
  },
  "hljs-name": {
    "color": "#f0f0f0",
    "fontWeight": "bold"
  },
  "hljs-string": {
    "color": "#97bf0d"
  },
  "hljs-type": {
    "color": "#f0f0f0"
  },
  "hljs-number": {
    "color": "#f0f0f0"
  },
  "hljs-selector-id": {
    "color": "#f0f0f0"
  },
  "hljs-selector-class": {
    "color": "#f0f0f0"
  },
  "hljs-quote": {
    "color": "#f0f0f0"
  },
  "hljs-template-tag": {
    "color": "#f0f0f0"
  },
  "hljs-deletion": {
    "color": "#f0f0f0"
  },
  "hljs-title": {
    "color": "#df471e"
  },
  "hljs-section": {
    "color": "#df471e"
  },
  "hljs-title>.hljs-built_in": {
    "color": "#81bce9",
    "fontWeight": "normal"
  },
  "hljs-regexp": {
    "color": "#e2c696"
  },
  "hljs-symbol": {
    "color": "#e2c696"
  },
  "hljs-variable": {
    "color": "#e2c696"
  },
  "hljs-template-variable": {
    "color": "#e2c696"
  },
  "hljs-link": {
    "color": "#e2c696"
  },
  "hljs-selector-attr": {
    "color": "#e2c696"
  },
  "hljs-selector-pseudo": {
    "color": "#e2c696"
  },
  "hljs-built_in": {
    "color": "#97bf0d",
    "fontWeight": "bold"
  },
  "hljs-literal": {
    "color": "#97bf0d",
    "fontWeight": "bold"
  },
  "hljs-bullet": {
    "color": "#397300"
  },
  "hljs-code": {
    "color": "#397300"
  },
  "hljs-addition": {
    "color": "#397300"
  },
  "hljs-class": {
    "color": "#ce9d4d",
    "fontWeight": "bold"
  },
  "hljs-meta": {
    "color": "#1f7199"
  },
  "hljs-meta-string": {
    "color": "#4d99bf"
  },
  "hljs-emphasis": {
    "fontStyle": "italic"
  },
  "hljs-strong": {
    "fontWeight": "bold"
  }
};
default_1 = isblEditorDark$1.default = _default;
var isblEditorDark = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ _mergeNamespaces({
  __proto__: null,
  [Symbol.toStringTag]: "Module",
  get default() {
    return default_1;
  }
}, [isblEditorDark$1]));
export { isblEditorDark as i };
//# sourceMappingURL=isbl-editor-dark.js.map
