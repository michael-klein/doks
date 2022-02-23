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
function scheme(hljs) {
  const SCHEME_IDENT_RE = "[^\\(\\)\\[\\]\\{\\}\",'`;#|\\\\\\s]+";
  const SCHEME_SIMPLE_NUMBER_RE = "(-|\\+)?\\d+([./]\\d+)?";
  const SCHEME_COMPLEX_NUMBER_RE = SCHEME_SIMPLE_NUMBER_RE + "[+\\-]" + SCHEME_SIMPLE_NUMBER_RE + "i";
  const KEYWORDS = {
    $pattern: SCHEME_IDENT_RE,
    "builtin-name": "case-lambda call/cc class define-class exit-handler field import inherit init-field interface let*-values let-values let/ec mixin opt-lambda override protect provide public rename require require-for-syntax syntax syntax-case syntax-error unit/sig unless when with-syntax and begin call-with-current-continuation call-with-input-file call-with-output-file case cond define define-syntax delay do dynamic-wind else for-each if lambda let let* let-syntax letrec letrec-syntax map or syntax-rules ' * + , ,@ - ... / ; < <= = => > >= ` abs acos angle append apply asin assoc assq assv atan boolean? caar cadr call-with-input-file call-with-output-file call-with-values car cdddar cddddr cdr ceiling char->integer char-alphabetic? char-ci<=? char-ci<? char-ci=? char-ci>=? char-ci>? char-downcase char-lower-case? char-numeric? char-ready? char-upcase char-upper-case? char-whitespace? char<=? char<? char=? char>=? char>? char? close-input-port close-output-port complex? cons cos current-input-port current-output-port denominator display eof-object? eq? equal? eqv? eval even? exact->inexact exact? exp expt floor force gcd imag-part inexact->exact inexact? input-port? integer->char integer? interaction-environment lcm length list list->string list->vector list-ref list-tail list? load log magnitude make-polar make-rectangular make-string make-vector max member memq memv min modulo negative? newline not null-environment null? number->string number? numerator odd? open-input-file open-output-file output-port? pair? peek-char port? positive? procedure? quasiquote quote quotient rational? rationalize read read-char real-part real? remainder reverse round scheme-report-environment set! set-car! set-cdr! sin sqrt string string->list string->number string->symbol string-append string-ci<=? string-ci<? string-ci=? string-ci>=? string-ci>? string-copy string-fill! string-length string-ref string-set! string<=? string<? string=? string>=? string>? string? substring symbol->string symbol? tan transcript-off transcript-on truncate values vector vector->list vector-fill! vector-length vector-ref vector-set! with-input-from-file with-output-to-file write write-char zero?"
  };
  const LITERAL = {
    className: "literal",
    begin: "(#t|#f|#\\\\" + SCHEME_IDENT_RE + "|#\\\\.)"
  };
  const NUMBER = {
    className: "number",
    variants: [
      {
        begin: SCHEME_SIMPLE_NUMBER_RE,
        relevance: 0
      },
      {
        begin: SCHEME_COMPLEX_NUMBER_RE,
        relevance: 0
      },
      {
        begin: "#b[0-1]+(/[0-1]+)?"
      },
      {
        begin: "#o[0-7]+(/[0-7]+)?"
      },
      {
        begin: "#x[0-9a-f]+(/[0-9a-f]+)?"
      }
    ]
  };
  const STRING = hljs.QUOTE_STRING_MODE;
  const COMMENT_MODES = [
    hljs.COMMENT(";", "$", {
      relevance: 0
    }),
    hljs.COMMENT("#\\|", "\\|#")
  ];
  const IDENT = {
    begin: SCHEME_IDENT_RE,
    relevance: 0
  };
  const QUOTED_IDENT = {
    className: "symbol",
    begin: "'" + SCHEME_IDENT_RE
  };
  const BODY = {
    endsWithParent: true,
    relevance: 0
  };
  const QUOTED_LIST = {
    variants: [
      {
        begin: /'/
      },
      {
        begin: "`"
      }
    ],
    contains: [
      {
        begin: "\\(",
        end: "\\)",
        contains: [
          "self",
          LITERAL,
          STRING,
          NUMBER,
          IDENT,
          QUOTED_IDENT
        ]
      }
    ]
  };
  const NAME = {
    className: "name",
    relevance: 0,
    begin: SCHEME_IDENT_RE,
    keywords: KEYWORDS
  };
  const LAMBDA = {
    begin: /lambda/,
    endsWithParent: true,
    returnBegin: true,
    contains: [
      NAME,
      {
        endsParent: true,
        variants: [
          {
            begin: /\(/,
            end: /\)/
          },
          {
            begin: /\[/,
            end: /\]/
          }
        ],
        contains: [IDENT]
      }
    ]
  };
  const LIST = {
    variants: [
      {
        begin: "\\(",
        end: "\\)"
      },
      {
        begin: "\\[",
        end: "\\]"
      }
    ],
    contains: [
      LAMBDA,
      NAME,
      BODY
    ]
  };
  BODY.contains = [
    LITERAL,
    NUMBER,
    STRING,
    IDENT,
    QUOTED_IDENT,
    QUOTED_LIST,
    LIST
  ].concat(COMMENT_MODES);
  return {
    name: "Scheme",
    illegal: /\S/,
    contains: [
      hljs.SHEBANG(),
      NUMBER,
      STRING,
      QUOTED_IDENT,
      QUOTED_LIST,
      LIST
    ].concat(COMMENT_MODES)
  };
}
var scheme_1 = scheme;
var scheme$1 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ _mergeNamespaces({
  __proto__: null,
  [Symbol.toStringTag]: "Module",
  "default": scheme_1
}, [scheme_1]));
export { scheme$1 as s };
//# sourceMappingURL=scheme.js.map
