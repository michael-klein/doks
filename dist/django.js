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
function django(hljs) {
  const FILTER = {
    begin: /\|[A-Za-z]+:?/,
    keywords: {
      name: "truncatewords removetags linebreaksbr yesno get_digit timesince random striptags filesizeformat escape linebreaks length_is ljust rjust cut urlize fix_ampersands title floatformat capfirst pprint divisibleby add make_list unordered_list urlencode timeuntil urlizetrunc wordcount stringformat linenumbers slice date dictsort dictsortreversed default_if_none pluralize lower join center default truncatewords_html upper length phone2numeric wordwrap time addslashes slugify first escapejs force_escape iriencode last safe safeseq truncatechars localize unlocalize localtime utc timezone"
    },
    contains: [
      hljs.QUOTE_STRING_MODE,
      hljs.APOS_STRING_MODE
    ]
  };
  return {
    name: "Django",
    aliases: ["jinja"],
    case_insensitive: true,
    subLanguage: "xml",
    contains: [
      hljs.COMMENT(/\{%\s*comment\s*%\}/, /\{%\s*endcomment\s*%\}/),
      hljs.COMMENT(/\{#/, /#\}/),
      {
        className: "template-tag",
        begin: /\{%/,
        end: /%\}/,
        contains: [{
          className: "name",
          begin: /\w+/,
          keywords: {
            name: "comment endcomment load templatetag ifchanged endifchanged if endif firstof for endfor ifnotequal endifnotequal widthratio extends include spaceless endspaceless regroup ifequal endifequal ssi now with cycle url filter endfilter debug block endblock else autoescape endautoescape csrf_token empty elif endwith static trans blocktrans endblocktrans get_static_prefix get_media_prefix plural get_current_language language get_available_languages get_current_language_bidi get_language_info get_language_info_list localize endlocalize localtime endlocaltime timezone endtimezone get_current_timezone verbatim"
          },
          starts: {
            endsWithParent: true,
            keywords: "in by as",
            contains: [FILTER],
            relevance: 0
          }
        }]
      },
      {
        className: "template-variable",
        begin: /\{\{/,
        end: /\}\}/,
        contains: [FILTER]
      }
    ]
  };
}
var django_1 = django;
var django$1 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ _mergeNamespaces({
  __proto__: null,
  [Symbol.toStringTag]: "Module",
  "default": django_1
}, [django_1]));
export { django$1 as d };
//# sourceMappingURL=django.js.map
