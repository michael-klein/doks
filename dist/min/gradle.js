function _mergeNamespaces(e,t){return t.forEach((function(t){t&&"string"!=typeof t&&!Array.isArray(t)&&Object.keys(t).forEach((function(r){if("default"!==r&&!(r in e)){var i=Object.getOwnPropertyDescriptor(t,r);Object.defineProperty(e,r,i.get?i:{enumerable:!0,get:function(){return t[r]}})}}))})),Object.freeze(e)}function gradle(e){return{name:"Gradle",case_insensitive:!0,keywords:{keyword:"task project allprojects subprojects artifacts buildscript configurations dependencies repositories sourceSets description delete from into include exclude source classpath destinationDir includes options sourceCompatibility targetCompatibility group flatDir doLast doFirst flatten todir fromdir ant def abstract break case catch continue default do else extends final finally for if implements instanceof native new private protected public return static switch synchronized throw throws transient try volatile while strictfp package import false null super this true antlrtask checkstyle codenarc copy boolean byte char class double float int interface long short void compile runTime file fileTree abs any append asList asWritable call collect compareTo count div dump each eachByte eachFile eachLine every find findAll flatten getAt getErr getIn getOut getText grep immutable inject inspect intersect invokeMethods isCase join leftShift minus multiply newInputStream newOutputStream newPrintWriter newReader newWriter next plus pop power previous print println push putAt read readBytes readLines reverse reverseEach round size sort splitEachLine step subMap times toInteger toList tokenize upto waitForOrKill withPrintWriter withReader withStream withWriter withWriterAppend write writeLine"},contains:[e.C_LINE_COMMENT_MODE,e.C_BLOCK_COMMENT_MODE,e.APOS_STRING_MODE,e.QUOTE_STRING_MODE,e.NUMBER_MODE,e.REGEXP_MODE]}}var gradle_1=gradle,gradle$1=Object.freeze(_mergeNamespaces({__proto__:null,[Symbol.toStringTag]:"Module",default:gradle_1},[gradle_1]));export{gradle$1 as g};