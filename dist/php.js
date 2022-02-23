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
function php(hljs) {
  const VARIABLE = {
    className: "variable",
    begin: `\\$+[a-zA-Z_\x7F-\xFF][a-zA-Z0-9_\x7F-\xFF]*(?![A-Za-z0-9])(?![$])`
  };
  const PREPROCESSOR = {
    className: "meta",
    variants: [
      { begin: /<\?php/, relevance: 10 },
      { begin: /<\?[=]?/ },
      { begin: /\?>/ }
    ]
  };
  const SUBST = {
    className: "subst",
    variants: [
      { begin: /\$\w+/ },
      { begin: /\{\$/, end: /\}/ }
    ]
  };
  const SINGLE_QUOTED = hljs.inherit(hljs.APOS_STRING_MODE, {
    illegal: null
  });
  const DOUBLE_QUOTED = hljs.inherit(hljs.QUOTE_STRING_MODE, {
    illegal: null,
    contains: hljs.QUOTE_STRING_MODE.contains.concat(SUBST)
  });
  const HEREDOC = hljs.END_SAME_AS_BEGIN({
    begin: /<<<[ \t]*(\w+)\n/,
    end: /[ \t]*(\w+)\b/,
    contains: hljs.QUOTE_STRING_MODE.contains.concat(SUBST)
  });
  const STRING = {
    className: "string",
    contains: [hljs.BACKSLASH_ESCAPE, PREPROCESSOR],
    variants: [
      hljs.inherit(SINGLE_QUOTED, {
        begin: "b'",
        end: "'"
      }),
      hljs.inherit(DOUBLE_QUOTED, {
        begin: 'b"',
        end: '"'
      }),
      DOUBLE_QUOTED,
      SINGLE_QUOTED,
      HEREDOC
    ]
  };
  const NUMBER = {
    className: "number",
    variants: [
      { begin: `\\b0b[01]+(?:_[01]+)*\\b` },
      { begin: `\\b0o[0-7]+(?:_[0-7]+)*\\b` },
      { begin: `\\b0x[\\da-f]+(?:_[\\da-f]+)*\\b` },
      { begin: `(?:\\b\\d+(?:_\\d+)*(\\.(?:\\d+(?:_\\d+)*))?|\\B\\.\\d+)(?:e[+-]?\\d+)?` }
    ],
    relevance: 0
  };
  const KEYWORDS = {
    keyword: "__CLASS__ __DIR__ __FILE__ __FUNCTION__ __LINE__ __METHOD__ __NAMESPACE__ __TRAIT__ die echo exit include include_once print require require_once array abstract and as binary bool boolean break callable case catch class clone const continue declare default do double else elseif empty enddeclare endfor endforeach endif endswitch endwhile enum eval extends final finally float for foreach from global goto if implements instanceof insteadof int integer interface isset iterable list match|0 mixed new object or private protected public real return string switch throw trait try unset use var void while xor yield",
    literal: "false null true",
    built_in: "Error|0 AppendIterator ArgumentCountError ArithmeticError ArrayIterator ArrayObject AssertionError BadFunctionCallException BadMethodCallException CachingIterator CallbackFilterIterator CompileError Countable DirectoryIterator DivisionByZeroError DomainException EmptyIterator ErrorException Exception FilesystemIterator FilterIterator GlobIterator InfiniteIterator InvalidArgumentException IteratorIterator LengthException LimitIterator LogicException MultipleIterator NoRewindIterator OutOfBoundsException OutOfRangeException OuterIterator OverflowException ParentIterator ParseError RangeException RecursiveArrayIterator RecursiveCachingIterator RecursiveCallbackFilterIterator RecursiveDirectoryIterator RecursiveFilterIterator RecursiveIterator RecursiveIteratorIterator RecursiveRegexIterator RecursiveTreeIterator RegexIterator RuntimeException SeekableIterator SplDoublyLinkedList SplFileInfo SplFileObject SplFixedArray SplHeap SplMaxHeap SplMinHeap SplObjectStorage SplObserver SplObserver SplPriorityQueue SplQueue SplStack SplSubject SplSubject SplTempFileObject TypeError UnderflowException UnexpectedValueException UnhandledMatchError ArrayAccess Closure Generator Iterator IteratorAggregate Serializable Stringable Throwable Traversable WeakReference WeakMap Directory __PHP_Incomplete_Class parent php_user_filter self static stdClass"
  };
  return {
    aliases: ["php3", "php4", "php5", "php6", "php7", "php8"],
    case_insensitive: true,
    keywords: KEYWORDS,
    contains: [
      hljs.HASH_COMMENT_MODE,
      hljs.COMMENT("//", "$", { contains: [PREPROCESSOR] }),
      hljs.COMMENT("/\\*", "\\*/", {
        contains: [
          {
            className: "doctag",
            begin: "@[A-Za-z]+"
          }
        ]
      }),
      hljs.COMMENT("__halt_compiler.+?;", false, {
        endsWithParent: true,
        keywords: "__halt_compiler"
      }),
      PREPROCESSOR,
      {
        className: "keyword",
        begin: /\$this\b/
      },
      VARIABLE,
      {
        begin: /(::|->)+[a-zA-Z_\x7f-\xff][a-zA-Z0-9_\x7f-\xff]*/
      },
      {
        className: "function",
        relevance: 0,
        beginKeywords: "fn function",
        end: /[;{]/,
        excludeEnd: true,
        illegal: "[$%\\[]",
        contains: [
          {
            beginKeywords: "use"
          },
          hljs.UNDERSCORE_TITLE_MODE,
          {
            begin: "=>",
            endsParent: true
          },
          {
            className: "params",
            begin: "\\(",
            end: "\\)",
            excludeBegin: true,
            excludeEnd: true,
            keywords: KEYWORDS,
            contains: [
              "self",
              VARIABLE,
              hljs.C_BLOCK_COMMENT_MODE,
              STRING,
              NUMBER
            ]
          }
        ]
      },
      {
        className: "class",
        variants: [
          { beginKeywords: "enum", illegal: /[($"]/ },
          { beginKeywords: "class interface trait", illegal: /[:($"]/ }
        ],
        relevance: 0,
        end: /\{/,
        excludeEnd: true,
        contains: [
          { beginKeywords: "extends implements" },
          hljs.UNDERSCORE_TITLE_MODE
        ]
      },
      {
        beginKeywords: "namespace",
        relevance: 0,
        end: ";",
        illegal: /[.']/,
        contains: [hljs.UNDERSCORE_TITLE_MODE]
      },
      {
        beginKeywords: "use",
        relevance: 0,
        end: ";",
        contains: [hljs.UNDERSCORE_TITLE_MODE]
      },
      STRING,
      NUMBER
    ]
  };
}
var php_1 = php;
var php$1 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ _mergeNamespaces({
  __proto__: null,
  [Symbol.toStringTag]: "Module",
  "default": php_1
}, [php_1]));
export { php$1 as p };
//# sourceMappingURL=php.js.map
