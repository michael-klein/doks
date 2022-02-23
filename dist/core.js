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
var core$2 = {};
function deepFreeze(obj) {
  if (obj instanceof Map) {
    obj.clear = obj.delete = obj.set = function() {
      throw new Error("map is read-only");
    };
  } else if (obj instanceof Set) {
    obj.add = obj.clear = obj.delete = function() {
      throw new Error("set is read-only");
    };
  }
  Object.freeze(obj);
  Object.getOwnPropertyNames(obj).forEach(function(name) {
    var prop = obj[name];
    if (typeof prop == "object" && !Object.isFrozen(prop)) {
      deepFreeze(prop);
    }
  });
  return obj;
}
var deepFreezeEs6 = deepFreeze;
var _default = deepFreeze;
deepFreezeEs6.default = _default;
class Response {
  constructor(mode) {
    if (mode.data === void 0)
      mode.data = {};
    this.data = mode.data;
    this.isMatchIgnored = false;
  }
  ignoreMatch() {
    this.isMatchIgnored = true;
  }
}
function escapeHTML(value) {
  return value.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#x27;");
}
function inherit(original, ...objects) {
  const result = Object.create(null);
  for (const key in original) {
    result[key] = original[key];
  }
  objects.forEach(function(obj) {
    for (const key in obj) {
      result[key] = obj[key];
    }
  });
  return result;
}
const SPAN_CLOSE = "</span>";
const emitsWrappingTags = (node) => {
  return !!node.kind;
};
class HTMLRenderer {
  constructor(parseTree, options) {
    this.buffer = "";
    this.classPrefix = options.classPrefix;
    parseTree.walk(this);
  }
  addText(text2) {
    this.buffer += escapeHTML(text2);
  }
  openNode(node) {
    if (!emitsWrappingTags(node))
      return;
    let className = node.kind;
    if (!node.sublanguage) {
      className = `${this.classPrefix}${className}`;
    }
    this.span(className);
  }
  closeNode(node) {
    if (!emitsWrappingTags(node))
      return;
    this.buffer += SPAN_CLOSE;
  }
  value() {
    return this.buffer;
  }
  span(className) {
    this.buffer += `<span class="${className}">`;
  }
}
class TokenTree {
  constructor() {
    this.rootNode = { children: [] };
    this.stack = [this.rootNode];
  }
  get top() {
    return this.stack[this.stack.length - 1];
  }
  get root() {
    return this.rootNode;
  }
  add(node) {
    this.top.children.push(node);
  }
  openNode(kind) {
    const node = { kind, children: [] };
    this.add(node);
    this.stack.push(node);
  }
  closeNode() {
    if (this.stack.length > 1) {
      return this.stack.pop();
    }
    return void 0;
  }
  closeAllNodes() {
    while (this.closeNode())
      ;
  }
  toJSON() {
    return JSON.stringify(this.rootNode, null, 4);
  }
  walk(builder) {
    return this.constructor._walk(builder, this.rootNode);
  }
  static _walk(builder, node) {
    if (typeof node === "string") {
      builder.addText(node);
    } else if (node.children) {
      builder.openNode(node);
      node.children.forEach((child) => this._walk(builder, child));
      builder.closeNode(node);
    }
    return builder;
  }
  static _collapse(node) {
    if (typeof node === "string")
      return;
    if (!node.children)
      return;
    if (node.children.every((el) => typeof el === "string")) {
      node.children = [node.children.join("")];
    } else {
      node.children.forEach((child) => {
        TokenTree._collapse(child);
      });
    }
  }
}
class TokenTreeEmitter extends TokenTree {
  constructor(options) {
    super();
    this.options = options;
  }
  addKeyword(text2, kind) {
    if (text2 === "") {
      return;
    }
    this.openNode(kind);
    this.addText(text2);
    this.closeNode();
  }
  addText(text2) {
    if (text2 === "") {
      return;
    }
    this.add(text2);
  }
  addSublanguage(emitter, name) {
    const node = emitter.root;
    node.kind = name;
    node.sublanguage = true;
    this.add(node);
  }
  toHTML() {
    const renderer = new HTMLRenderer(this, this.options);
    return renderer.value();
  }
  finalize() {
    return true;
  }
}
function escape(value) {
  return new RegExp(value.replace(/[-/\\^$*+?.()|[\]{}]/g, "\\$&"), "m");
}
function source(re) {
  if (!re)
    return null;
  if (typeof re === "string")
    return re;
  return re.source;
}
function concat(...args) {
  const joined = args.map((x) => source(x)).join("");
  return joined;
}
function either(...args) {
  const joined = "(" + args.map((x) => source(x)).join("|") + ")";
  return joined;
}
function countMatchGroups(re) {
  return new RegExp(re.toString() + "|").exec("").length - 1;
}
function startsWith(re, lexeme) {
  const match = re && re.exec(lexeme);
  return match && match.index === 0;
}
const BACKREF_RE = /\[(?:[^\\\]]|\\.)*\]|\(\??|\\([1-9][0-9]*)|\\./;
function join(regexps, separator = "|") {
  let numCaptures = 0;
  return regexps.map((regex) => {
    numCaptures += 1;
    const offset = numCaptures;
    let re = source(regex);
    let out = "";
    while (re.length > 0) {
      const match = BACKREF_RE.exec(re);
      if (!match) {
        out += re;
        break;
      }
      out += re.substring(0, match.index);
      re = re.substring(match.index + match[0].length);
      if (match[0][0] === "\\" && match[1]) {
        out += "\\" + String(Number(match[1]) + offset);
      } else {
        out += match[0];
        if (match[0] === "(") {
          numCaptures++;
        }
      }
    }
    return out;
  }).map((re) => `(${re})`).join(separator);
}
const MATCH_NOTHING_RE = /\b\B/;
const IDENT_RE = "[a-zA-Z]\\w*";
const UNDERSCORE_IDENT_RE = "[a-zA-Z_]\\w*";
const NUMBER_RE = "\\b\\d+(\\.\\d+)?";
const C_NUMBER_RE = "(-?)(\\b0[xX][a-fA-F0-9]+|(\\b\\d+(\\.\\d*)?|\\.\\d+)([eE][-+]?\\d+)?)";
const BINARY_NUMBER_RE = "\\b(0b[01]+)";
const RE_STARTERS_RE = "!|!=|!==|%|%=|&|&&|&=|\\*|\\*=|\\+|\\+=|,|-|-=|/=|/|:|;|<<|<<=|<=|<|===|==|=|>>>=|>>=|>=|>>>|>>|>|\\?|\\[|\\{|\\(|\\^|\\^=|\\||\\|=|\\|\\||~";
const SHEBANG = (opts = {}) => {
  const beginShebang = /^#![ ]*\//;
  if (opts.binary) {
    opts.begin = concat(beginShebang, /.*\b/, opts.binary, /\b.*/);
  }
  return inherit({
    className: "meta",
    begin: beginShebang,
    end: /$/,
    relevance: 0,
    "on:begin": (m, resp) => {
      if (m.index !== 0)
        resp.ignoreMatch();
    }
  }, opts);
};
const BACKSLASH_ESCAPE = {
  begin: "\\\\[\\s\\S]",
  relevance: 0
};
const APOS_STRING_MODE = {
  className: "string",
  begin: "'",
  end: "'",
  illegal: "\\n",
  contains: [BACKSLASH_ESCAPE]
};
const QUOTE_STRING_MODE = {
  className: "string",
  begin: '"',
  end: '"',
  illegal: "\\n",
  contains: [BACKSLASH_ESCAPE]
};
const PHRASAL_WORDS_MODE = {
  begin: /\b(a|an|the|are|I'm|isn't|don't|doesn't|won't|but|just|should|pretty|simply|enough|gonna|going|wtf|so|such|will|you|your|they|like|more)\b/
};
const COMMENT = function(begin, end, modeOptions = {}) {
  const mode = inherit({
    className: "comment",
    begin,
    end,
    contains: []
  }, modeOptions);
  mode.contains.push(PHRASAL_WORDS_MODE);
  mode.contains.push({
    className: "doctag",
    begin: "(?:TODO|FIXME|NOTE|BUG|OPTIMIZE|HACK|XXX):",
    relevance: 0
  });
  return mode;
};
const C_LINE_COMMENT_MODE = COMMENT("//", "$");
const C_BLOCK_COMMENT_MODE = COMMENT("/\\*", "\\*/");
const HASH_COMMENT_MODE = COMMENT("#", "$");
const NUMBER_MODE = {
  className: "number",
  begin: NUMBER_RE,
  relevance: 0
};
const C_NUMBER_MODE = {
  className: "number",
  begin: C_NUMBER_RE,
  relevance: 0
};
const BINARY_NUMBER_MODE = {
  className: "number",
  begin: BINARY_NUMBER_RE,
  relevance: 0
};
const CSS_NUMBER_MODE = {
  className: "number",
  begin: NUMBER_RE + "(%|em|ex|ch|rem|vw|vh|vmin|vmax|cm|mm|in|pt|pc|px|deg|grad|rad|turn|s|ms|Hz|kHz|dpi|dpcm|dppx)?",
  relevance: 0
};
const REGEXP_MODE = {
  begin: /(?=\/[^/\n]*\/)/,
  contains: [{
    className: "regexp",
    begin: /\//,
    end: /\/[gimuy]*/,
    illegal: /\n/,
    contains: [
      BACKSLASH_ESCAPE,
      {
        begin: /\[/,
        end: /\]/,
        relevance: 0,
        contains: [BACKSLASH_ESCAPE]
      }
    ]
  }]
};
const TITLE_MODE = {
  className: "title",
  begin: IDENT_RE,
  relevance: 0
};
const UNDERSCORE_TITLE_MODE = {
  className: "title",
  begin: UNDERSCORE_IDENT_RE,
  relevance: 0
};
const METHOD_GUARD = {
  begin: "\\.\\s*" + UNDERSCORE_IDENT_RE,
  relevance: 0
};
const END_SAME_AS_BEGIN = function(mode) {
  return Object.assign(mode, {
    "on:begin": (m, resp) => {
      resp.data._beginMatch = m[1];
    },
    "on:end": (m, resp) => {
      if (resp.data._beginMatch !== m[1])
        resp.ignoreMatch();
    }
  });
};
var MODES = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  MATCH_NOTHING_RE,
  IDENT_RE,
  UNDERSCORE_IDENT_RE,
  NUMBER_RE,
  C_NUMBER_RE,
  BINARY_NUMBER_RE,
  RE_STARTERS_RE,
  SHEBANG,
  BACKSLASH_ESCAPE,
  APOS_STRING_MODE,
  QUOTE_STRING_MODE,
  PHRASAL_WORDS_MODE,
  COMMENT,
  C_LINE_COMMENT_MODE,
  C_BLOCK_COMMENT_MODE,
  HASH_COMMENT_MODE,
  NUMBER_MODE,
  C_NUMBER_MODE,
  BINARY_NUMBER_MODE,
  CSS_NUMBER_MODE,
  REGEXP_MODE,
  TITLE_MODE,
  UNDERSCORE_TITLE_MODE,
  METHOD_GUARD,
  END_SAME_AS_BEGIN
});
function skipIfhasPrecedingDot(match, response) {
  const before = match.input[match.index - 1];
  if (before === ".") {
    response.ignoreMatch();
  }
}
function beginKeywords(mode, parent) {
  if (!parent)
    return;
  if (!mode.beginKeywords)
    return;
  mode.begin = "\\b(" + mode.beginKeywords.split(" ").join("|") + ")(?!\\.)(?=\\b|\\s)";
  mode.__beforeBegin = skipIfhasPrecedingDot;
  mode.keywords = mode.keywords || mode.beginKeywords;
  delete mode.beginKeywords;
  if (mode.relevance === void 0)
    mode.relevance = 0;
}
function compileIllegal(mode, _parent) {
  if (!Array.isArray(mode.illegal))
    return;
  mode.illegal = either(...mode.illegal);
}
function compileMatch(mode, _parent) {
  if (!mode.match)
    return;
  if (mode.begin || mode.end)
    throw new Error("begin & end are not supported with match");
  mode.begin = mode.match;
  delete mode.match;
}
function compileRelevance(mode, _parent) {
  if (mode.relevance === void 0)
    mode.relevance = 1;
}
const COMMON_KEYWORDS = [
  "of",
  "and",
  "for",
  "in",
  "not",
  "or",
  "if",
  "then",
  "parent",
  "list",
  "value"
];
const DEFAULT_KEYWORD_CLASSNAME = "keyword";
function compileKeywords(rawKeywords, caseInsensitive, className = DEFAULT_KEYWORD_CLASSNAME) {
  const compiledKeywords = {};
  if (typeof rawKeywords === "string") {
    compileList(className, rawKeywords.split(" "));
  } else if (Array.isArray(rawKeywords)) {
    compileList(className, rawKeywords);
  } else {
    Object.keys(rawKeywords).forEach(function(className2) {
      Object.assign(compiledKeywords, compileKeywords(rawKeywords[className2], caseInsensitive, className2));
    });
  }
  return compiledKeywords;
  function compileList(className2, keywordList) {
    if (caseInsensitive) {
      keywordList = keywordList.map((x) => x.toLowerCase());
    }
    keywordList.forEach(function(keyword) {
      const pair = keyword.split("|");
      compiledKeywords[pair[0]] = [className2, scoreForKeyword(pair[0], pair[1])];
    });
  }
}
function scoreForKeyword(keyword, providedScore) {
  if (providedScore) {
    return Number(providedScore);
  }
  return commonKeyword(keyword) ? 0 : 1;
}
function commonKeyword(keyword) {
  return COMMON_KEYWORDS.includes(keyword.toLowerCase());
}
function compileLanguage(language, { plugins }) {
  function langRe(value, global) {
    return new RegExp(source(value), "m" + (language.case_insensitive ? "i" : "") + (global ? "g" : ""));
  }
  class MultiRegex {
    constructor() {
      this.matchIndexes = {};
      this.regexes = [];
      this.matchAt = 1;
      this.position = 0;
    }
    addRule(re, opts) {
      opts.position = this.position++;
      this.matchIndexes[this.matchAt] = opts;
      this.regexes.push([opts, re]);
      this.matchAt += countMatchGroups(re) + 1;
    }
    compile() {
      if (this.regexes.length === 0) {
        this.exec = () => null;
      }
      const terminators = this.regexes.map((el) => el[1]);
      this.matcherRe = langRe(join(terminators), true);
      this.lastIndex = 0;
    }
    exec(s) {
      this.matcherRe.lastIndex = this.lastIndex;
      const match = this.matcherRe.exec(s);
      if (!match) {
        return null;
      }
      const i = match.findIndex((el, i2) => i2 > 0 && el !== void 0);
      const matchData = this.matchIndexes[i];
      match.splice(0, i);
      return Object.assign(match, matchData);
    }
  }
  class ResumableMultiRegex {
    constructor() {
      this.rules = [];
      this.multiRegexes = [];
      this.count = 0;
      this.lastIndex = 0;
      this.regexIndex = 0;
    }
    getMatcher(index) {
      if (this.multiRegexes[index])
        return this.multiRegexes[index];
      const matcher = new MultiRegex();
      this.rules.slice(index).forEach(([re, opts]) => matcher.addRule(re, opts));
      matcher.compile();
      this.multiRegexes[index] = matcher;
      return matcher;
    }
    resumingScanAtSamePosition() {
      return this.regexIndex !== 0;
    }
    considerAll() {
      this.regexIndex = 0;
    }
    addRule(re, opts) {
      this.rules.push([re, opts]);
      if (opts.type === "begin")
        this.count++;
    }
    exec(s) {
      const m = this.getMatcher(this.regexIndex);
      m.lastIndex = this.lastIndex;
      let result = m.exec(s);
      if (this.resumingScanAtSamePosition()) {
        if (result && result.index === this.lastIndex)
          ;
        else {
          const m2 = this.getMatcher(0);
          m2.lastIndex = this.lastIndex + 1;
          result = m2.exec(s);
        }
      }
      if (result) {
        this.regexIndex += result.position + 1;
        if (this.regexIndex === this.count) {
          this.considerAll();
        }
      }
      return result;
    }
  }
  function buildModeRegex(mode) {
    const mm = new ResumableMultiRegex();
    mode.contains.forEach((term) => mm.addRule(term.begin, { rule: term, type: "begin" }));
    if (mode.terminatorEnd) {
      mm.addRule(mode.terminatorEnd, { type: "end" });
    }
    if (mode.illegal) {
      mm.addRule(mode.illegal, { type: "illegal" });
    }
    return mm;
  }
  function compileMode(mode, parent) {
    const cmode = mode;
    if (mode.isCompiled)
      return cmode;
    [
      compileMatch
    ].forEach((ext) => ext(mode, parent));
    language.compilerExtensions.forEach((ext) => ext(mode, parent));
    mode.__beforeBegin = null;
    [
      beginKeywords,
      compileIllegal,
      compileRelevance
    ].forEach((ext) => ext(mode, parent));
    mode.isCompiled = true;
    let keywordPattern = null;
    if (typeof mode.keywords === "object") {
      keywordPattern = mode.keywords.$pattern;
      delete mode.keywords.$pattern;
    }
    if (mode.keywords) {
      mode.keywords = compileKeywords(mode.keywords, language.case_insensitive);
    }
    if (mode.lexemes && keywordPattern) {
      throw new Error("ERR: Prefer `keywords.$pattern` to `mode.lexemes`, BOTH are not allowed. (see mode reference) ");
    }
    keywordPattern = keywordPattern || mode.lexemes || /\w+/;
    cmode.keywordPatternRe = langRe(keywordPattern, true);
    if (parent) {
      if (!mode.begin)
        mode.begin = /\B|\b/;
      cmode.beginRe = langRe(mode.begin);
      if (mode.endSameAsBegin)
        mode.end = mode.begin;
      if (!mode.end && !mode.endsWithParent)
        mode.end = /\B|\b/;
      if (mode.end)
        cmode.endRe = langRe(mode.end);
      cmode.terminatorEnd = source(mode.end) || "";
      if (mode.endsWithParent && parent.terminatorEnd) {
        cmode.terminatorEnd += (mode.end ? "|" : "") + parent.terminatorEnd;
      }
    }
    if (mode.illegal)
      cmode.illegalRe = langRe(mode.illegal);
    if (!mode.contains)
      mode.contains = [];
    mode.contains = [].concat(...mode.contains.map(function(c) {
      return expandOrCloneMode(c === "self" ? mode : c);
    }));
    mode.contains.forEach(function(c) {
      compileMode(c, cmode);
    });
    if (mode.starts) {
      compileMode(mode.starts, parent);
    }
    cmode.matcher = buildModeRegex(cmode);
    return cmode;
  }
  if (!language.compilerExtensions)
    language.compilerExtensions = [];
  if (language.contains && language.contains.includes("self")) {
    throw new Error("ERR: contains `self` is not supported at the top-level of a language.  See documentation.");
  }
  language.classNameAliases = inherit(language.classNameAliases || {});
  return compileMode(language);
}
function dependencyOnParent(mode) {
  if (!mode)
    return false;
  return mode.endsWithParent || dependencyOnParent(mode.starts);
}
function expandOrCloneMode(mode) {
  if (mode.variants && !mode.cachedVariants) {
    mode.cachedVariants = mode.variants.map(function(variant) {
      return inherit(mode, { variants: null }, variant);
    });
  }
  if (mode.cachedVariants) {
    return mode.cachedVariants;
  }
  if (dependencyOnParent(mode)) {
    return inherit(mode, { starts: mode.starts ? inherit(mode.starts) : null });
  }
  if (Object.isFrozen(mode)) {
    return inherit(mode);
  }
  return mode;
}
var version = "10.7.3";
function hasValueOrEmptyAttribute(value) {
  return Boolean(value || value === "");
}
function BuildVuePlugin(hljs) {
  const Component = {
    props: ["language", "code", "autodetect"],
    data: function() {
      return {
        detectedLanguage: "",
        unknownLanguage: false
      };
    },
    computed: {
      className() {
        if (this.unknownLanguage)
          return "";
        return "hljs " + this.detectedLanguage;
      },
      highlighted() {
        if (!this.autoDetect && !hljs.getLanguage(this.language)) {
          console.warn(`The language "${this.language}" you specified could not be found.`);
          this.unknownLanguage = true;
          return escapeHTML(this.code);
        }
        let result = {};
        if (this.autoDetect) {
          result = hljs.highlightAuto(this.code);
          this.detectedLanguage = result.language;
        } else {
          result = hljs.highlight(this.language, this.code, this.ignoreIllegals);
          this.detectedLanguage = this.language;
        }
        return result.value;
      },
      autoDetect() {
        return !this.language || hasValueOrEmptyAttribute(this.autodetect);
      },
      ignoreIllegals() {
        return true;
      }
    },
    render(createElement) {
      return createElement("pre", {}, [
        createElement("code", {
          class: this.className,
          domProps: { innerHTML: this.highlighted }
        })
      ]);
    }
  };
  const VuePlugin = {
    install(Vue) {
      Vue.component("highlightjs", Component);
    }
  };
  return { Component, VuePlugin };
}
const mergeHTMLPlugin = {
  "after:highlightElement": ({ el, result, text: text2 }) => {
    const originalStream = nodeStream(el);
    if (!originalStream.length)
      return;
    const resultNode = document.createElement("div");
    resultNode.innerHTML = result.value;
    result.value = mergeStreams(originalStream, nodeStream(resultNode), text2);
  }
};
function tag(node) {
  return node.nodeName.toLowerCase();
}
function nodeStream(node) {
  const result = [];
  (function _nodeStream(node2, offset) {
    for (let child = node2.firstChild; child; child = child.nextSibling) {
      if (child.nodeType === 3) {
        offset += child.nodeValue.length;
      } else if (child.nodeType === 1) {
        result.push({
          event: "start",
          offset,
          node: child
        });
        offset = _nodeStream(child, offset);
        if (!tag(child).match(/br|hr|img|input/)) {
          result.push({
            event: "stop",
            offset,
            node: child
          });
        }
      }
    }
    return offset;
  })(node, 0);
  return result;
}
function mergeStreams(original, highlighted, value) {
  let processed = 0;
  let result = "";
  const nodeStack = [];
  function selectStream() {
    if (!original.length || !highlighted.length) {
      return original.length ? original : highlighted;
    }
    if (original[0].offset !== highlighted[0].offset) {
      return original[0].offset < highlighted[0].offset ? original : highlighted;
    }
    return highlighted[0].event === "start" ? original : highlighted;
  }
  function open2(node) {
    function attributeString(attr) {
      return " " + attr.nodeName + '="' + escapeHTML(attr.value) + '"';
    }
    result += "<" + tag(node) + [].map.call(node.attributes, attributeString).join("") + ">";
  }
  function close2(node) {
    result += "</" + tag(node) + ">";
  }
  function render(event) {
    (event.event === "start" ? open2 : close2)(event.node);
  }
  while (original.length || highlighted.length) {
    let stream = selectStream();
    result += escapeHTML(value.substring(processed, stream[0].offset));
    processed = stream[0].offset;
    if (stream === original) {
      nodeStack.reverse().forEach(close2);
      do {
        render(stream.splice(0, 1)[0]);
        stream = selectStream();
      } while (stream === original && stream.length && stream[0].offset === processed);
      nodeStack.reverse().forEach(open2);
    } else {
      if (stream[0].event === "start") {
        nodeStack.push(stream[0].node);
      } else {
        nodeStack.pop();
      }
      render(stream.splice(0, 1)[0]);
    }
  }
  return result + escapeHTML(value.substr(processed));
}
const seenDeprecations = {};
const error = (message) => {
  console.error(message);
};
const warn = (message, ...args) => {
  console.log(`WARN: ${message}`, ...args);
};
const deprecated = (version2, message) => {
  if (seenDeprecations[`${version2}/${message}`])
    return;
  console.log(`Deprecated as of ${version2}. ${message}`);
  seenDeprecations[`${version2}/${message}`] = true;
};
const escape$1 = escapeHTML;
const inherit$1 = inherit;
const NO_MATCH = Symbol("nomatch");
const HLJS = function(hljs) {
  const languages = Object.create(null);
  const aliases = Object.create(null);
  const plugins = [];
  let SAFE_MODE = true;
  const fixMarkupRe = /(^(<[^>]+>|\t|)+|\n)/gm;
  const LANGUAGE_NOT_FOUND = "Could not find the language '{}', did you forget to load/include a language module?";
  const PLAINTEXT_LANGUAGE = { disableAutodetect: true, name: "Plain text", contains: [] };
  let options = {
    noHighlightRe: /^(no-?highlight)$/i,
    languageDetectRe: /\blang(?:uage)?-([\w-]+)\b/i,
    classPrefix: "hljs-",
    tabReplace: null,
    useBR: false,
    languages: null,
    __emitter: TokenTreeEmitter
  };
  function shouldNotHighlight(languageName) {
    return options.noHighlightRe.test(languageName);
  }
  function blockLanguage(block) {
    let classes = block.className + " ";
    classes += block.parentNode ? block.parentNode.className : "";
    const match = options.languageDetectRe.exec(classes);
    if (match) {
      const language = getLanguage(match[1]);
      if (!language) {
        warn(LANGUAGE_NOT_FOUND.replace("{}", match[1]));
        warn("Falling back to no-highlight mode for this block.", block);
      }
      return language ? match[1] : "no-highlight";
    }
    return classes.split(/\s+/).find((_class) => shouldNotHighlight(_class) || getLanguage(_class));
  }
  function highlight2(codeOrlanguageName, optionsOrCode, ignoreIllegals, continuation) {
    let code = "";
    let languageName = "";
    if (typeof optionsOrCode === "object") {
      code = codeOrlanguageName;
      ignoreIllegals = optionsOrCode.ignoreIllegals;
      languageName = optionsOrCode.language;
      continuation = void 0;
    } else {
      deprecated("10.7.0", "highlight(lang, code, ...args) has been deprecated.");
      deprecated("10.7.0", "Please use highlight(code, options) instead.\nhttps://github.com/highlightjs/highlight.js/issues/2277");
      languageName = codeOrlanguageName;
      code = optionsOrCode;
    }
    const context = {
      code,
      language: languageName
    };
    fire("before:highlight", context);
    const result = context.result ? context.result : _highlight(context.language, context.code, ignoreIllegals, continuation);
    result.code = context.code;
    fire("after:highlight", result);
    return result;
  }
  function _highlight(languageName, codeToHighlight, ignoreIllegals, continuation) {
    function keywordData(mode, match) {
      const matchText = language.case_insensitive ? match[0].toLowerCase() : match[0];
      return Object.prototype.hasOwnProperty.call(mode.keywords, matchText) && mode.keywords[matchText];
    }
    function processKeywords() {
      if (!top.keywords) {
        emitter.addText(modeBuffer);
        return;
      }
      let lastIndex = 0;
      top.keywordPatternRe.lastIndex = 0;
      let match = top.keywordPatternRe.exec(modeBuffer);
      let buf = "";
      while (match) {
        buf += modeBuffer.substring(lastIndex, match.index);
        const data = keywordData(top, match);
        if (data) {
          const [kind, keywordRelevance] = data;
          emitter.addText(buf);
          buf = "";
          relevance += keywordRelevance;
          if (kind.startsWith("_")) {
            buf += match[0];
          } else {
            const cssClass = language.classNameAliases[kind] || kind;
            emitter.addKeyword(match[0], cssClass);
          }
        } else {
          buf += match[0];
        }
        lastIndex = top.keywordPatternRe.lastIndex;
        match = top.keywordPatternRe.exec(modeBuffer);
      }
      buf += modeBuffer.substr(lastIndex);
      emitter.addText(buf);
    }
    function processSubLanguage() {
      if (modeBuffer === "")
        return;
      let result2 = null;
      if (typeof top.subLanguage === "string") {
        if (!languages[top.subLanguage]) {
          emitter.addText(modeBuffer);
          return;
        }
        result2 = _highlight(top.subLanguage, modeBuffer, true, continuations[top.subLanguage]);
        continuations[top.subLanguage] = result2.top;
      } else {
        result2 = highlightAuto2(modeBuffer, top.subLanguage.length ? top.subLanguage : null);
      }
      if (top.relevance > 0) {
        relevance += result2.relevance;
      }
      emitter.addSublanguage(result2.emitter, result2.language);
    }
    function processBuffer() {
      if (top.subLanguage != null) {
        processSubLanguage();
      } else {
        processKeywords();
      }
      modeBuffer = "";
    }
    function startNewMode(mode) {
      if (mode.className) {
        emitter.openNode(language.classNameAliases[mode.className] || mode.className);
      }
      top = Object.create(mode, { parent: { value: top } });
      return top;
    }
    function endOfMode(mode, match, matchPlusRemainder) {
      let matched = startsWith(mode.endRe, matchPlusRemainder);
      if (matched) {
        if (mode["on:end"]) {
          const resp = new Response(mode);
          mode["on:end"](match, resp);
          if (resp.isMatchIgnored)
            matched = false;
        }
        if (matched) {
          while (mode.endsParent && mode.parent) {
            mode = mode.parent;
          }
          return mode;
        }
      }
      if (mode.endsWithParent) {
        return endOfMode(mode.parent, match, matchPlusRemainder);
      }
    }
    function doIgnore(lexeme) {
      if (top.matcher.regexIndex === 0) {
        modeBuffer += lexeme[0];
        return 1;
      } else {
        resumeScanAtSamePosition = true;
        return 0;
      }
    }
    function doBeginMatch(match) {
      const lexeme = match[0];
      const newMode = match.rule;
      const resp = new Response(newMode);
      const beforeCallbacks = [newMode.__beforeBegin, newMode["on:begin"]];
      for (const cb of beforeCallbacks) {
        if (!cb)
          continue;
        cb(match, resp);
        if (resp.isMatchIgnored)
          return doIgnore(lexeme);
      }
      if (newMode && newMode.endSameAsBegin) {
        newMode.endRe = escape(lexeme);
      }
      if (newMode.skip) {
        modeBuffer += lexeme;
      } else {
        if (newMode.excludeBegin) {
          modeBuffer += lexeme;
        }
        processBuffer();
        if (!newMode.returnBegin && !newMode.excludeBegin) {
          modeBuffer = lexeme;
        }
      }
      startNewMode(newMode);
      return newMode.returnBegin ? 0 : lexeme.length;
    }
    function doEndMatch(match) {
      const lexeme = match[0];
      const matchPlusRemainder = codeToHighlight.substr(match.index);
      const endMode = endOfMode(top, match, matchPlusRemainder);
      if (!endMode) {
        return NO_MATCH;
      }
      const origin = top;
      if (origin.skip) {
        modeBuffer += lexeme;
      } else {
        if (!(origin.returnEnd || origin.excludeEnd)) {
          modeBuffer += lexeme;
        }
        processBuffer();
        if (origin.excludeEnd) {
          modeBuffer = lexeme;
        }
      }
      do {
        if (top.className) {
          emitter.closeNode();
        }
        if (!top.skip && !top.subLanguage) {
          relevance += top.relevance;
        }
        top = top.parent;
      } while (top !== endMode.parent);
      if (endMode.starts) {
        if (endMode.endSameAsBegin) {
          endMode.starts.endRe = endMode.endRe;
        }
        startNewMode(endMode.starts);
      }
      return origin.returnEnd ? 0 : lexeme.length;
    }
    function processContinuations() {
      const list = [];
      for (let current = top; current !== language; current = current.parent) {
        if (current.className) {
          list.unshift(current.className);
        }
      }
      list.forEach((item) => emitter.openNode(item));
    }
    let lastMatch = {};
    function processLexeme(textBeforeMatch, match) {
      const lexeme = match && match[0];
      modeBuffer += textBeforeMatch;
      if (lexeme == null) {
        processBuffer();
        return 0;
      }
      if (lastMatch.type === "begin" && match.type === "end" && lastMatch.index === match.index && lexeme === "") {
        modeBuffer += codeToHighlight.slice(match.index, match.index + 1);
        if (!SAFE_MODE) {
          const err = new Error("0 width match regex");
          err.languageName = languageName;
          err.badRule = lastMatch.rule;
          throw err;
        }
        return 1;
      }
      lastMatch = match;
      if (match.type === "begin") {
        return doBeginMatch(match);
      } else if (match.type === "illegal" && !ignoreIllegals) {
        const err = new Error('Illegal lexeme "' + lexeme + '" for mode "' + (top.className || "<unnamed>") + '"');
        err.mode = top;
        throw err;
      } else if (match.type === "end") {
        const processed = doEndMatch(match);
        if (processed !== NO_MATCH) {
          return processed;
        }
      }
      if (match.type === "illegal" && lexeme === "") {
        return 1;
      }
      if (iterations > 1e5 && iterations > match.index * 3) {
        const err = new Error("potential infinite loop, way more iterations than matches");
        throw err;
      }
      modeBuffer += lexeme;
      return lexeme.length;
    }
    const language = getLanguage(languageName);
    if (!language) {
      error(LANGUAGE_NOT_FOUND.replace("{}", languageName));
      throw new Error('Unknown language: "' + languageName + '"');
    }
    const md = compileLanguage(language, { plugins });
    let result = "";
    let top = continuation || md;
    const continuations = {};
    const emitter = new options.__emitter(options);
    processContinuations();
    let modeBuffer = "";
    let relevance = 0;
    let index = 0;
    let iterations = 0;
    let resumeScanAtSamePosition = false;
    try {
      top.matcher.considerAll();
      for (; ; ) {
        iterations++;
        if (resumeScanAtSamePosition) {
          resumeScanAtSamePosition = false;
        } else {
          top.matcher.considerAll();
        }
        top.matcher.lastIndex = index;
        const match = top.matcher.exec(codeToHighlight);
        if (!match)
          break;
        const beforeMatch = codeToHighlight.substring(index, match.index);
        const processedCount = processLexeme(beforeMatch, match);
        index = match.index + processedCount;
      }
      processLexeme(codeToHighlight.substr(index));
      emitter.closeAllNodes();
      emitter.finalize();
      result = emitter.toHTML();
      return {
        relevance: Math.floor(relevance),
        value: result,
        language: languageName,
        illegal: false,
        emitter,
        top
      };
    } catch (err) {
      if (err.message && err.message.includes("Illegal")) {
        return {
          illegal: true,
          illegalBy: {
            msg: err.message,
            context: codeToHighlight.slice(index - 100, index + 100),
            mode: err.mode
          },
          sofar: result,
          relevance: 0,
          value: escape$1(codeToHighlight),
          emitter
        };
      } else if (SAFE_MODE) {
        return {
          illegal: false,
          relevance: 0,
          value: escape$1(codeToHighlight),
          emitter,
          language: languageName,
          top,
          errorRaised: err
        };
      } else {
        throw err;
      }
    }
  }
  function justTextHighlightResult(code) {
    const result = {
      relevance: 0,
      emitter: new options.__emitter(options),
      value: escape$1(code),
      illegal: false,
      top: PLAINTEXT_LANGUAGE
    };
    result.emitter.addText(code);
    return result;
  }
  function highlightAuto2(code, languageSubset) {
    languageSubset = languageSubset || options.languages || Object.keys(languages);
    const plaintext = justTextHighlightResult(code);
    const results = languageSubset.filter(getLanguage).filter(autoDetection).map((name) => _highlight(name, code, false));
    results.unshift(plaintext);
    const sorted = results.sort((a, b) => {
      if (a.relevance !== b.relevance)
        return b.relevance - a.relevance;
      if (a.language && b.language) {
        if (getLanguage(a.language).supersetOf === b.language) {
          return 1;
        } else if (getLanguage(b.language).supersetOf === a.language) {
          return -1;
        }
      }
      return 0;
    });
    const [best, secondBest] = sorted;
    const result = best;
    result.second_best = secondBest;
    return result;
  }
  function fixMarkup(html) {
    if (!(options.tabReplace || options.useBR)) {
      return html;
    }
    return html.replace(fixMarkupRe, (match) => {
      if (match === "\n") {
        return options.useBR ? "<br>" : match;
      } else if (options.tabReplace) {
        return match.replace(/\t/g, options.tabReplace);
      }
      return match;
    });
  }
  function updateClassName(element, currentLang, resultLang) {
    const language = currentLang ? aliases[currentLang] : resultLang;
    element.classList.add("hljs");
    if (language)
      element.classList.add(language);
  }
  const brPlugin = {
    "before:highlightElement": ({ el }) => {
      if (options.useBR) {
        el.innerHTML = el.innerHTML.replace(/\n/g, "").replace(/<br[ /]*>/g, "\n");
      }
    },
    "after:highlightElement": ({ result }) => {
      if (options.useBR) {
        result.value = result.value.replace(/\n/g, "<br>");
      }
    }
  };
  const TAB_REPLACE_RE = /^(<[^>]+>|\t)+/gm;
  const tabReplacePlugin = {
    "after:highlightElement": ({ result }) => {
      if (options.tabReplace) {
        result.value = result.value.replace(TAB_REPLACE_RE, (m) => m.replace(/\t/g, options.tabReplace));
      }
    }
  };
  function highlightElement(element) {
    let node = null;
    const language = blockLanguage(element);
    if (shouldNotHighlight(language))
      return;
    fire("before:highlightElement", { el: element, language });
    node = element;
    const text2 = node.textContent;
    const result = language ? highlight2(text2, { language, ignoreIllegals: true }) : highlightAuto2(text2);
    fire("after:highlightElement", { el: element, result, text: text2 });
    element.innerHTML = result.value;
    updateClassName(element, language, result.language);
    element.result = {
      language: result.language,
      re: result.relevance,
      relavance: result.relevance
    };
    if (result.second_best) {
      element.second_best = {
        language: result.second_best.language,
        re: result.second_best.relevance,
        relavance: result.second_best.relevance
      };
    }
  }
  function configure(userOptions) {
    if (userOptions.useBR) {
      deprecated("10.3.0", "'useBR' will be removed entirely in v11.0");
      deprecated("10.3.0", "Please see https://github.com/highlightjs/highlight.js/issues/2559");
    }
    options = inherit$1(options, userOptions);
  }
  const initHighlighting = () => {
    if (initHighlighting.called)
      return;
    initHighlighting.called = true;
    deprecated("10.6.0", "initHighlighting() is deprecated.  Use highlightAll() instead.");
    const blocks = document.querySelectorAll("pre code");
    blocks.forEach(highlightElement);
  };
  function initHighlightingOnLoad() {
    deprecated("10.6.0", "initHighlightingOnLoad() is deprecated.  Use highlightAll() instead.");
    wantsHighlight = true;
  }
  let wantsHighlight = false;
  function highlightAll() {
    if (document.readyState === "loading") {
      wantsHighlight = true;
      return;
    }
    const blocks = document.querySelectorAll("pre code");
    blocks.forEach(highlightElement);
  }
  function boot() {
    if (wantsHighlight)
      highlightAll();
  }
  if (typeof window !== "undefined" && window.addEventListener) {
    window.addEventListener("DOMContentLoaded", boot, false);
  }
  function registerLanguage2(languageName, languageDefinition) {
    let lang = null;
    try {
      lang = languageDefinition(hljs);
    } catch (error$1) {
      error("Language definition for '{}' could not be registered.".replace("{}", languageName));
      if (!SAFE_MODE) {
        throw error$1;
      } else {
        error(error$1);
      }
      lang = PLAINTEXT_LANGUAGE;
    }
    if (!lang.name)
      lang.name = languageName;
    languages[languageName] = lang;
    lang.rawDefinition = languageDefinition.bind(null, hljs);
    if (lang.aliases) {
      registerAliases(lang.aliases, { languageName });
    }
  }
  function unregisterLanguage(languageName) {
    delete languages[languageName];
    for (const alias of Object.keys(aliases)) {
      if (aliases[alias] === languageName) {
        delete aliases[alias];
      }
    }
  }
  function listLanguages2() {
    return Object.keys(languages);
  }
  function requireLanguage(name) {
    deprecated("10.4.0", "requireLanguage will be removed entirely in v11.");
    deprecated("10.4.0", "Please see https://github.com/highlightjs/highlight.js/pull/2844");
    const lang = getLanguage(name);
    if (lang) {
      return lang;
    }
    const err = new Error("The '{}' language is required, but not loaded.".replace("{}", name));
    throw err;
  }
  function getLanguage(name) {
    name = (name || "").toLowerCase();
    return languages[name] || languages[aliases[name]];
  }
  function registerAliases(aliasList, { languageName }) {
    if (typeof aliasList === "string") {
      aliasList = [aliasList];
    }
    aliasList.forEach((alias) => {
      aliases[alias.toLowerCase()] = languageName;
    });
  }
  function autoDetection(name) {
    const lang = getLanguage(name);
    return lang && !lang.disableAutodetect;
  }
  function upgradePluginAPI(plugin) {
    if (plugin["before:highlightBlock"] && !plugin["before:highlightElement"]) {
      plugin["before:highlightElement"] = (data) => {
        plugin["before:highlightBlock"](Object.assign({ block: data.el }, data));
      };
    }
    if (plugin["after:highlightBlock"] && !plugin["after:highlightElement"]) {
      plugin["after:highlightElement"] = (data) => {
        plugin["after:highlightBlock"](Object.assign({ block: data.el }, data));
      };
    }
  }
  function addPlugin(plugin) {
    upgradePluginAPI(plugin);
    plugins.push(plugin);
  }
  function fire(event, args) {
    const cb = event;
    plugins.forEach(function(plugin) {
      if (plugin[cb]) {
        plugin[cb](args);
      }
    });
  }
  function deprecateFixMarkup(arg) {
    deprecated("10.2.0", "fixMarkup will be removed entirely in v11.0");
    deprecated("10.2.0", "Please see https://github.com/highlightjs/highlight.js/issues/2534");
    return fixMarkup(arg);
  }
  function deprecateHighlightBlock(el) {
    deprecated("10.7.0", "highlightBlock will be removed entirely in v12.0");
    deprecated("10.7.0", "Please use highlightElement now.");
    return highlightElement(el);
  }
  Object.assign(hljs, {
    highlight: highlight2,
    highlightAuto: highlightAuto2,
    highlightAll,
    fixMarkup: deprecateFixMarkup,
    highlightElement,
    highlightBlock: deprecateHighlightBlock,
    configure,
    initHighlighting,
    initHighlightingOnLoad,
    registerLanguage: registerLanguage2,
    unregisterLanguage,
    listLanguages: listLanguages2,
    getLanguage,
    registerAliases,
    requireLanguage,
    autoDetection,
    inherit: inherit$1,
    addPlugin,
    vuePlugin: BuildVuePlugin(hljs).VuePlugin
  });
  hljs.debugMode = function() {
    SAFE_MODE = false;
  };
  hljs.safeMode = function() {
    SAFE_MODE = true;
  };
  hljs.versionString = version;
  for (const key in MODES) {
    if (typeof MODES[key] === "object") {
      deepFreezeEs6(MODES[key]);
    }
  }
  Object.assign(hljs, MODES);
  hljs.addPlugin(brPlugin);
  hljs.addPlugin(mergeHTMLPlugin);
  hljs.addPlugin(tabReplacePlugin);
  return hljs;
};
var highlight$1 = HLJS({});
var core$1 = highlight$1;
var format = { exports: {} };
(function(module) {
  (function() {
    var namespace;
    {
      namespace = module.exports = format2;
    }
    namespace.format = format2;
    namespace.vsprintf = vsprintf;
    if (typeof console !== "undefined" && typeof console.log === "function") {
      namespace.printf = printf;
    }
    function printf() {
      console.log(format2.apply(null, arguments));
    }
    function vsprintf(fmt, replacements) {
      return format2.apply(null, [fmt].concat(replacements));
    }
    function format2(fmt) {
      var argIndex = 1, args = [].slice.call(arguments), i = 0, n = fmt.length, result = "", c, escaped = false, arg, tmp, leadingZero = false, precision, nextArg = function() {
        return args[argIndex++];
      }, slurpNumber = function() {
        var digits = "";
        while (/\d/.test(fmt[i])) {
          digits += fmt[i++];
          c = fmt[i];
        }
        return digits.length > 0 ? parseInt(digits) : null;
      };
      for (; i < n; ++i) {
        c = fmt[i];
        if (escaped) {
          escaped = false;
          if (c == ".") {
            leadingZero = false;
            c = fmt[++i];
          } else if (c == "0" && fmt[i + 1] == ".") {
            leadingZero = true;
            i += 2;
            c = fmt[i];
          } else {
            leadingZero = true;
          }
          precision = slurpNumber();
          switch (c) {
            case "b":
              result += parseInt(nextArg(), 10).toString(2);
              break;
            case "c":
              arg = nextArg();
              if (typeof arg === "string" || arg instanceof String)
                result += arg;
              else
                result += String.fromCharCode(parseInt(arg, 10));
              break;
            case "d":
              result += parseInt(nextArg(), 10);
              break;
            case "f":
              tmp = String(parseFloat(nextArg()).toFixed(precision || 6));
              result += leadingZero ? tmp : tmp.replace(/^0/, "");
              break;
            case "j":
              result += JSON.stringify(nextArg());
              break;
            case "o":
              result += "0" + parseInt(nextArg(), 10).toString(8);
              break;
            case "s":
              result += nextArg();
              break;
            case "x":
              result += "0x" + parseInt(nextArg(), 10).toString(16);
              break;
            case "X":
              result += "0x" + parseInt(nextArg(), 10).toString(16).toUpperCase();
              break;
            default:
              result += c;
              break;
          }
        } else if (c === "%") {
          escaped = true;
        } else {
          result += c;
        }
      }
      return result;
    }
  })();
})(format);
var formatter = format.exports;
var fault$1 = create(Error);
var fault_1 = fault$1;
fault$1.eval = create(EvalError);
fault$1.range = create(RangeError);
fault$1.reference = create(ReferenceError);
fault$1.syntax = create(SyntaxError);
fault$1.type = create(TypeError);
fault$1.uri = create(URIError);
fault$1.create = create;
function create(EConstructor) {
  FormattedError.displayName = EConstructor.displayName || EConstructor.name;
  return FormattedError;
  function FormattedError(format2) {
    if (format2) {
      format2 = formatter.apply(null, arguments);
    }
    return new EConstructor(format2);
  }
}
var high = core$1;
var fault = fault_1;
var highlight_1 = core$2.highlight = highlight;
var highlightAuto_1 = core$2.highlightAuto = highlightAuto;
var registerLanguage_1 = core$2.registerLanguage = registerLanguage;
var listLanguages_1 = core$2.listLanguages = listLanguages;
var registerAlias_1 = core$2.registerAlias = registerAlias;
Emitter.prototype.addText = text;
Emitter.prototype.addKeyword = addKeyword;
Emitter.prototype.addSublanguage = addSublanguage;
Emitter.prototype.openNode = open;
Emitter.prototype.closeNode = close;
Emitter.prototype.closeAllNodes = noop;
Emitter.prototype.finalize = noop;
Emitter.prototype.toHTML = toHtmlNoop;
var defaultPrefix = "hljs-";
function highlight(name, value, options) {
  var before = high.configure({});
  var settings = options || {};
  var prefix = settings.prefix;
  var result;
  if (typeof name !== "string") {
    throw fault("Expected `string` for name, got `%s`", name);
  }
  if (!high.getLanguage(name)) {
    throw fault("Unknown language: `%s` is not registered", name);
  }
  if (typeof value !== "string") {
    throw fault("Expected `string` for value, got `%s`", value);
  }
  if (prefix === null || prefix === void 0) {
    prefix = defaultPrefix;
  }
  high.configure({ __emitter: Emitter, classPrefix: prefix });
  result = high.highlight(value, { language: name, ignoreIllegals: true });
  high.configure(before || {});
  if (result.errorRaised) {
    throw result.errorRaised;
  }
  return {
    relevance: result.relevance,
    language: result.language,
    value: result.emitter.rootNode.children
  };
}
function highlightAuto(value, options) {
  var settings = options || {};
  var subset = settings.subset || high.listLanguages();
  settings.prefix;
  var length = subset.length;
  var index = -1;
  var result;
  var secondBest;
  var current;
  var name;
  if (typeof value !== "string") {
    throw fault("Expected `string` for value, got `%s`", value);
  }
  secondBest = { relevance: 0, language: null, value: [] };
  result = { relevance: 0, language: null, value: [] };
  while (++index < length) {
    name = subset[index];
    if (!high.getLanguage(name)) {
      continue;
    }
    current = highlight(name, value, options);
    current.language = name;
    if (current.relevance > secondBest.relevance) {
      secondBest = current;
    }
    if (current.relevance > result.relevance) {
      secondBest = result;
      result = current;
    }
  }
  if (secondBest.language) {
    result.secondBest = secondBest;
  }
  return result;
}
function registerLanguage(name, syntax) {
  high.registerLanguage(name, syntax);
}
function listLanguages() {
  return high.listLanguages();
}
function registerAlias(name, alias) {
  var map = name;
  var key;
  if (alias) {
    map = {};
    map[name] = alias;
  }
  for (key in map) {
    high.registerAliases(map[key], { languageName: key });
  }
}
function Emitter(options) {
  this.options = options;
  this.rootNode = { children: [] };
  this.stack = [this.rootNode];
}
function addKeyword(value, name) {
  this.openNode(name);
  this.addText(value);
  this.closeNode();
}
function addSublanguage(other, name) {
  var stack = this.stack;
  var current = stack[stack.length - 1];
  var results = other.rootNode.children;
  var node = name ? {
    type: "element",
    tagName: "span",
    properties: { className: [name] },
    children: results
  } : results;
  current.children = current.children.concat(node);
}
function text(value) {
  var stack = this.stack;
  var current;
  var tail;
  if (value === "")
    return;
  current = stack[stack.length - 1];
  tail = current.children[current.children.length - 1];
  if (tail && tail.type === "text") {
    tail.value += value;
  } else {
    current.children.push({ type: "text", value });
  }
}
function open(name) {
  var stack = this.stack;
  var className = this.options.classPrefix + name;
  var current = stack[stack.length - 1];
  var child = {
    type: "element",
    tagName: "span",
    properties: { className: [className] },
    children: []
  };
  current.children.push(child);
  stack.push(child);
}
function close() {
  this.stack.pop();
}
function toHtmlNoop() {
  return "";
}
function noop() {
}
var core = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ _mergeNamespaces({
  __proto__: null,
  [Symbol.toStringTag]: "Module",
  "default": core$2,
  highlight: highlight_1,
  highlightAuto: highlightAuto_1,
  registerLanguage: registerLanguage_1,
  listLanguages: listLanguages_1,
  registerAlias: registerAlias_1
}, [core$2]));
export { core as c };
//# sourceMappingURL=core.js.map
