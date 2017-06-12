/*!
 * extendown v0.1.0
 * author jeffwang <cunxuanwang@163.com>
 */
(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["Extendown"] = factory();
	else
		root["Extendown"] = factory();
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 16);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return processBlock; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "e", function() { return processInline; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return mergeRegStr; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "k", function() { return processLineBreak; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return preProcess; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "h", function() { return getPredefined; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "f", function() { return processHTMLEncoding; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "i", function() { return htmlEncode; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "g", function() { return htmlTemplate; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "j", function() { return trimForArray; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "d", function() { return postProcess; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__features___ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__escape__ = __webpack_require__(3);
/**
 * Helper functions for Extendown Class
 * Also have public state over here
 * Includes Capture Group Count Array
 * PreDefined Array, BlockRegex ...
 */




var trapArr = [];
var preDefined = {};

function preprocessCall(source, reg) {
  return source.replace(reg, function () {
    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    if (!preDefined[reg.source]) preDefined[reg.source] = [];
    preDefined[reg.source].push(args);
    return '';
  });
}

function preProcess(source) {
  var md = source;
  __WEBPACK_IMPORTED_MODULE_0__features___["a" /* inline */].forEach(function (obj) {
    // if feature have predefined
    if (obj.pre) {
      md = preprocessCall(source, obj.pre);
    }
  });
  __WEBPACK_IMPORTED_MODULE_0__features___["b" /* block */].forEach(function (obj) {
    if (obj.pre) {
      md = preprocessCall(source, obj.pre);
    }
  });
  md = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__escape__["a" /* preEscape */])(md);
  return md;
}

var htmlEncoding = [{
  reg: '&(?!\\w+;)',
  replace: '&amp;'
}, {
  reg: '©',
  replace: '&copy;'
}, {
  reg: '®',
  replace: '&reg;'
}, {
  reg: '(<\\/?\\w+(?:[\\s]+\\w+(?:=(?:".*"|\'.*\'))*)*[\\s]*\\/?>)|(<)|(>)',
  replace: function replace(match, g1, g2, g3) {
    if (g2) return '&lt;';else if (g3) return '&gt;';
    return match;
  }
}];

/**
 * process markdown source before parse
 * usually used in predefined statement
 * @param {String} source - MarkDown String Source
 * @return {String} The String After The Source Transformed
 * @ignore
 */
function processHTMLEncoding(source) {
  var result = source || '';
  result = String(result);
  htmlEncoding.forEach(function (rep) {
    var reg = new RegExp(rep.reg, 'g');
    result = result.replace(reg, rep.replace);
    reg = null;
  });
  return result;
}

function htmlEncode(source) {
  return source.replace(/[<>]/g, function (match) {
    if (match === '<') return '&lt;';
    return '&gt;';
  });
}

function processInline(md) {
  var source = md || '';
  source = String(source);
  __WEBPACK_IMPORTED_MODULE_0__features___["a" /* inline */].forEach(function (obj) {
    if (obj.reg) {
      if (source.match(obj.reg)) {
        source = obj.process(source);
      }
    } else {
      // for inline tag, allowed to process inline without regex
      source = obj.process(source);
    }
  });
  return source;
}

function processBlock(match, source) {
  var index = 1;
  var i = 0;
  var isMatch = false;
  for (; index < match.length && i < trapArr.length; index += trapArr[i], i += 1) {
    if (match[index] !== undefined) {
      isMatch = true;
      break;
    }
  }
  if (!isMatch) return match[0];
  return __WEBPACK_IMPORTED_MODULE_0__features___["b" /* block */][i].process(match[0], source);
}

function processLineBreak(source) {
  if (source[0] === '\n') return source[0];
  return '';
}

function htmlTemplate(func) {
  for (var _len2 = arguments.length, args = Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
    args[_key2 - 1] = arguments[_key2];
  }

  var params = args;
  args.forEach(function (arg, index) {
    params[index] = processHTMLEncoding(arg);
  });
  return func.apply(undefined, params);
}

// function makeRegUntrapped(regStr) {
//   const reg = /(\\)?\((\?:)?/g;
//   return regStr.replace(reg, (match, prefix) => {
//     if (prefix === '\\' || match === '(?:') return match;
//     return '(?:';
//   });
// }

function countTrapGroup(regStr) {
  var brackets = [];
  var count = 0;
  for (var i = 0; i < regStr.length; i += 1) {
    var nowChar = regStr[i];
    if (nowChar === '(') {
      var unTrapTag = regStr.substr(i + 1, 2);
      if (!(i >= 1 && regStr[i - 1] === '\\' || unTrapTag === '?:' || unTrapTag === '?=' || unTrapTag === '?!')) {
        brackets.push(nowChar);
      }
    }

    if (nowChar === ')') {
      if (!(i >= 1 && regStr[i - 1] === '\\')) {
        if (brackets.slice(-1)[0] === '(') {
          brackets.pop();
          count += 1;
        }
      }
    }
  }
  return count;
}

function getRealReferCount(regStr) {
  var trapReferReg = /\\(\d)/g;
  var allCount = 0;
  if (regStr.match(trapReferReg) === null) return regStr;
  allCount = trapArr.reduce(function (all, value) {
    return all + value;
  }, allCount);
  return regStr.replace(trapReferReg, function (match, refer) {
    return '\\' + (allCount + parseInt(refer, 10));
  });
}

function mergeRegStr() {
  trapArr = [];
  preDefined = {}; // state init
  return __WEBPACK_IMPORTED_MODULE_0__features___["b" /* block */].reduce(function (all, obj) {
    if (obj.reg) {
      // check trap refer
      var regStr = getRealReferCount(obj.reg);
      // get the current regex string's trap group number
      var count = countTrapGroup(obj.reg);
      trapArr.push(count);
      if (!all) {
        return '(?:' + regStr + ')';
      }
      return all + '|(?:' + regStr + ')';
    }
    return all;
  }, '');
}

function getPredefined() {
  return preDefined;
}

function trimForArray(source, condition) {
  var array = source;
  if (array instanceof Array) {
    var contentStart = 0;
    var contentEnd = array.length;
    var isAllEmpty = true;
    for (var i = 0; i < array.length; i += 1) {
      if (array[i] && (condition ? !condition(array[i]) : true)) {
        contentStart = i;
        isAllEmpty = false;
        break;
      }
    }
    for (var j = array.length - 1; j > 0; j -= 1) {
      if (array[j] && (condition ? !condition(array[j]) : true)) {
        contentEnd = j;
        break;
      }
    }
    if (isAllEmpty) {
      return [];
    }
    return array.slice(contentStart, contentEnd + 1);
  }
  return array;
}

function postProcess(source) {
  return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__escape__["b" /* escape */])(source);
}



/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__helper__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__features_block_List__ = __webpack_require__(6);
var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * itegrate all features of extendown
 * @module  core module
 * @author jeffone cunxuanwang@163.com
 */



/** Class Extendown */

var Extendown = function () {
  function Extendown(md, nowrap) {
    _classCallCheck(this, Extendown);

    this.html = '';
    this.nowrap = nowrap;
    this.source = md.replace(/\r\n^/gm, '\n');
    this.frontFlag = 0;
    this.behindFlag = 0;
    this.lastIndex = 0;
    this.process();
  }

  _createClass(Extendown, [{
    key: 'process',
    value: function process() {
      this.reg = new RegExp(__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__helper__["a" /* mergeRegStr */])(), 'g');
      // preprocess
      this.source = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__helper__["b" /* preProcess */])(this.source);
      var match = this.reg.exec(this.source);
      if (!match) {
        this.html = Extendown.processOtherBlock(this.source, this.nowrap);
      }
      for (; match !== null;) {
        this.frontFlag = this.lastIndex;
        this.behindFlag = match.index;
        this.lastIndex = this.reg.lastIndex;
        // do not eat the last char \n
        if (match && match[0].slice(-1) === '\n') {
          this.reg.lastIndex -= 1;
          this.lastIndex -= 1;
        }
        if (this.frontFlag < this.behindFlag) {
          // these blocks do not match any block regexs
          // just process them inline and wrap them with <p></p>
          var otherBlock = this.source.substring(this.frontFlag, this.behindFlag);
          var result = Extendown.processOtherBlock(otherBlock, this.nowrap);
          this.html += result;
        }
        this.html += String(__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__helper__["c" /* processBlock */])(match, this.source));
        match = this.reg.exec(this.source);
        // add the last unmatch part of source to html
        if (!match) {
          var lastPart = this.source.substring(this.lastIndex);
          var _result = Extendown.processOtherBlock(lastPart, this.nowrap);
          this.html += _result;
        }
      }

      this.html = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__helper__["d" /* postProcess */])(this.html);
    }
    // process list,quote block and unmatched block

  }, {
    key: 'getHTML',
    value: function getHTML() {
      return this.html;
    }
  }], [{
    key: 'processOtherBlock',
    value: function processOtherBlock(source, nowrap) {
      return source.replace(/^(\n*)([\s\S]*)$/g, function (mat, m1, m2) {
        if (m2) {
          return '' + (m1 || '') + (__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__features_block_List__["a" /* default */])(m2, nowrap) || '');
        }
        return '' + (m1 || '');
      });
    }
  }]);

  return Extendown;
}();

/* harmony default export */ __webpack_exports__["a"] = (Extendown);

/***/ }),
/* 2 */
/***/ (function(module, exports) {

module.exports = function(originalModule) {
	if(!originalModule.webpackPolyfill) {
		var module = Object.create(originalModule);
		// module.parent = undefined by default
		if(!module.children) module.children = [];
		Object.defineProperty(module, "loaded", {
			enumerable: true,
			get: function() {
				return module.l;
			}
		});
		Object.defineProperty(module, "id", {
			enumerable: true,
			get: function() {
				return module.i;
			}
		});
		Object.defineProperty(module, "exports", {
			enumerable: true,
		});
		module.webpackPolyfill = 1;
	}
	return module;
};


/***/ }),
/* 3 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return preEscape; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return escape; });

/**
 * escape functions
 */

var map = {};
var escapeReg = /\\([\\`*_{}[\]()#+\-.!:])/g;

/**
 * generate unique string
 * @return {String} Unique String
 */
function generateUniqueStr() {
  return "" + Date.now() + (parseInt(Math.random() * 900, 10) + 100);
}

/**
 * Escape for markdown string
 * @param {String} source - markdown string
 * @return {String} the string after escaping
 */
function escape(source) {
  var result = source;
  var keys = Object.keys(map);
  keys.forEach(function (key) {
    result = result.replace(key, map[key]);
  });
  return result;
}

/**
 * preprocess before escape
 * @param {String} source - markdown string
 * @return {String} preEscape string
 */
function preEscape(source) {
  return source.replace(escapeReg, function (match, g1) {
    var uniqueStr = generateUniqueStr();
    map[uniqueStr] = g1;
    return uniqueStr;
  });
}



/***/ }),
/* 4 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__helper__ = __webpack_require__(0);
/**
 * transform BlockCode
 */


var regStr = '(?:^|\\n)[\\t ]*?([`]{3,})(?:[\\t ]+(\\w*))?\n((?:(?!\\1).*\\n)*)\\1[\\t ]*?(?=\n|$)';

function getHTML(language, content) {
  return '<pre><code class="code_language_' + language + '">' + content + '</code></pre>';
}

function processBlockCode(section) {
  var reg = new RegExp(regStr, 'g');
  var prefix = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__helper__["k" /* processLineBreak */])(section);
  return section.replace(reg, function (match, m1, m2, m3) {
    return prefix + __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__helper__["g" /* htmlTemplate */])(getHTML, m2 || '', __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__helper__["i" /* htmlEncode */])(m3) || '');
  });
}

/* harmony default export */ __webpack_exports__["a"] = ({ reg: regStr, process: processBlockCode });

/***/ }),
/* 5 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__helper__ = __webpack_require__(0);
/**
 * transform #{1,6} to h1-h6
 */


var regStr = '(?:^|\\n)(?:[\\t ]*?)(#{1,6})\\s+(.*)(?:\\n|$)';

function getHTML(level, content) {
  return '<h' + level + '>' + content + '</h' + level + '>';
}

function processHead(section) {
  var reg = new RegExp(regStr, 'g');
  var prefix = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__helper__["k" /* processLineBreak */])(section);
  return section.replace(reg, function (match, m1, m2) {
    var content = '';
    if (m2) content = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__helper__["e" /* processInline */])(__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__helper__["f" /* processHTMLEncoding */])(m2));
    return prefix + getHTML(m1.length, content);
  });
}

/* harmony default export */ __webpack_exports__["a"] = ({ reg: regStr, process: processHead });

/***/ }),
/* 6 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__helper__ = __webpack_require__(0);
function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

/**
 * transform list
 */




var regForList = '(?:^|\\n)[\\t ]{0,2}(\\d+\\.|[+\\-*>])[\\t ]+?([\\s\\S]*?)((?:\\n[\\t ]*\\n[ ]{3,}[\\s\\S]*?)*)(?=\\n[\\t ]{0,2}(?:\\d+\\.|[+\\-*>])|(\\n[\\t ]*\\n)|$)';

function parse(source, nowrap) {
  var factory = new __WEBPACK_IMPORTED_MODULE_0__core__["a" /* default */](source, nowrap);
  return factory.getHTML();
}

function CreateTemplate() {}
CreateTemplate.prototype.create = function create(type, start) {
  this._type = type;
  this._start = start;
  this._content = [];
};
CreateTemplate.prototype.add = function add(type, content, inline) {
  var str = '';
  if (type === 'inline') {
    str = '<li>' + content + '</li>';
  } else if (type === 'block') {
    if (content instanceof Array) {
      str = '<li>' + (inline || '') + content.map(function (block) {
        return block;
      }).join('') + '</li>';
    } else {
      str = '<li>' + (inline || '') + content + '</li>';
    }
  } else if (type === 'blockquote') {
    if (content instanceof Array && content.length > 0) {
      str = '' + (inline || '') + content.map(function (block) {
        return '<p>' + block + '</p>';
      }).join('');
    } else {
      str = inline;
    }
  }
  this._content.push(str);
};

CreateTemplate.prototype.get = function get() {
  if (this._type === 'ul' || this._type === 'ol') {
    return '<' + this._type + (this._start && this._start > 0 ? ' start="' + this._start + '"' : '') + '>' + this._content.join('') + '</' + this._type + '>';
  }
  return '<' + this._type + '><p>' + this._content.join('\n') + '</p></' + this._type + '>';
};

function backspace(content) {
  var reg = /(?:^|\n)([\t ]+)/g;
  var match = reg.exec(content);
  var result = content;
  if (match) {
    var spaceNum = match[1].length;
    var spaceReg = new RegExp('(?:^|\n)([\\t ]{' + spaceNum + '})', 'g');
    result = content.replace(spaceReg, '\n');
  }
  return result;
}

// 根据块级和行级元素制造内容数组
function makeContent(inlineContent, blockContent) {
  var content = [];
  if (inlineContent) {
    content.push(inlineContent);
  }
  if (blockContent) {
    content.push.apply(content, _toConsumableArray(blockContent.split(/\n[\t ]*\n(?=[ ]{3,})/).filter(function (block) {
      if (block) return true;
      return false;
    }).map(function (block) {
      var result = backspace(block);
      return parse(result);
    })));
  }
  return content;
}

function unmatchedString(string, nowrap) {
  var str = string;
  if (!str) return '';
  str = str.replace(/^\n[\t \n]*/, '');
  if (nowrap) {
    return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__helper__["e" /* processInline */])(__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__helper__["f" /* processHTMLEncoding */])(str));
  }
  return '<p>' + __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__helper__["e" /* processInline */])(__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__helper__["f" /* processHTMLEncoding */])(str)) + '</p>';
}

// process list
function process(md, nowrap) {
  var match = null;
  var result = '';
  var reg = new RegExp(regForList, 'g');
  match = reg.exec(md);
  if (!match) {
    result = unmatchedString(md, nowrap);
    return result;
  }
  var lastIndex = 0;
  var nowIndex = reg.lastIndex;
  var frontIndex = nowIndex - match[0].length;
  var lastType = '';
  var lastSymbol = '';
  var template = new CreateTemplate();
  while (match != null) {
    var symbol = match[1];
    var inlineContent = match[2];
    var blockContent = match[3];
    var suffix = match[4];
    var type = void 0;
    var start = void 0;
    if (symbol === '+' || symbol === '-' || symbol === '*') {
      // 无序列表
      type = 'ul';
    } else if (symbol === '>') {
      // 引用
      type = 'blockquote';
    } else {
      // 有序列表
      type = 'ol';
      start = symbol.replace('.', '');
    }

    if (type !== lastType || lastIndex !== frontIndex || type === 'ul' && symbol !== lastSymbol) {
      if (lastType) {
        result += template.get();
      }
      template.create(type, start);
    }
    result += unmatchedString(md.substring(lastIndex, frontIndex)); // do nothing with unmatched string
    inlineContent = backspace(inlineContent);
    if (blockContent) {
      inlineContent = parse(inlineContent);
    } else {
      inlineContent = parse(inlineContent, true);
    }
    if (blockContent && type !== 'blockquote') {
      // 添加块级元素
      template.add('block', makeContent(null, blockContent), inlineContent);
    } else if (!blockContent && inlineContent && type !== 'blockquote') {
      // 添加行级元素
      if (!/\n[\t ]*\n/.test(suffix)) {
        template.add('inline', inlineContent);
      } else {
        // 对于行级元素,如果有空行意味着是块级元素
        template.add('block', inlineContent);
      }
    } else if (type === 'blockquote') {
      // 如果是引用,添加方式可能会有所不同
      template.add('blockquote', makeContent(null, blockContent), inlineContent);
    }

    match = reg.exec(md);
    if (match) {
      lastType = type;
      lastSymbol = symbol;
      lastIndex = nowIndex;
      nowIndex = reg.lastIndex;
      frontIndex = nowIndex - match[0].length;
    } else {
      result += template.get();
      result += unmatchedString(md.substring(nowIndex));
    }
  }
  return result;
}

/* harmony default export */ __webpack_exports__["a"] = (process);

/***/ }),
/* 7 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/**
 * transform *** or --- or * * * to <hr></hr>
 * @module  features/block/SplitLine
 * @author jeffwcx cunxuanwang@163.com
 */

var regStr = '(^|\\n)[\\t ]*?([*|-][\\t ]*){3,}?(?:\\n|$)';

function processSplitLine(section) {
  var reg = new RegExp(regStr, 'g');
  return section.replace(reg, function (match, prefix) {
    return (prefix || '') + '<hr></hr>';
  });
}

/* harmony default export */ __webpack_exports__["a"] = ({ reg: regStr, process: processSplitLine });

/***/ }),
/* 8 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__helper__ = __webpack_require__(0);



var regStr = '(?:^|\\n)([^|\\n]*(?:\\|[^|\\n]*)+\\|?)\\n((?:\\:?-{3,}\\:?)?(?:[\\t ]*\\|[\\t ]*(?:\\:?-{3,}\\:?)?)+[\\t ]*\\|?)((?:\\n[^|\n]*(?:\\|[^|\n]*)+\\|?)*)';

function template(cols, rows) {
  return '<table>\n    <thead>\n      <tr>\n      ' + cols.map(function (col) {
    return '<th' + (col.align && ' align="' + col.align + '"') + '>' + col.colName + '</th>';
  }).join('') + '\n      </tr>\n    </thead>\n    <tbody>\n      ' + rows.map(function (row) {
    return '<tr>' + cols.map(function (col, index) {
      return '<td' + (col.align && ' align="' + col.align + '"') + '>' + row[index] + '</td>';
    }).join('') + '</tr>';
  }).join('') + '\n    </tbody>\n  </table>';
}

function trimBlank(item) {
  return (/^\s*$/g.test(item)
  );
}

function processTable(section) {
  var reg = new RegExp(regStr, 'g');
  return section.replace(reg, function (match, m1, m2, m3) {
    var cols = m2.split('|');
    var colNames = m1.split('|');
    var rows = m3.split('\n');
    cols = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__helper__["j" /* trimForArray */])(cols, trimBlank);
    colNames = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__helper__["j" /* trimForArray */])(colNames);
    rows = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__helper__["j" /* trimForArray */])(rows);
    if (cols.length > 1) {
      var colInfo = [];
      var rowsInfo = [];
      var hasEmpty = false;

      for (var i = 0; i < cols.length; i += 1) {
        var colStyle = cols[i];
        var colName = colNames[i];
        if (!colStyle) {
          hasEmpty = true;
          break;
        }
        colStyle = colStyle.trim();
        var left = colStyle.substr(0, 1) === ':';
        var right = colStyle.substr(-1) === ':';
        var align = '';
        if (left && !right) {
          align = 'left';
        } else if (!left && right) {
          align = 'right';
        } else if (left && right) {
          align = 'center';
        }
        colInfo.push({
          colName: __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__helper__["e" /* processInline */])(colName.trim()),
          align: align
        });
      }
      if (hasEmpty) {
        return match;
      }
      rows = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__helper__["j" /* trimForArray */])(rows, trimBlank);
      for (var j = 0; j < rows.length; j += 1) {
        var rowArr = rows[j].split('|');
        rowArr = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__helper__["j" /* trimForArray */])(rowArr);
        rowArr = rowArr.map(function (item) {
          return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__helper__["e" /* processInline */])(item.trim());
        });
        rowsInfo.push(rowArr);
      }
      return template(colInfo, rowsInfo);
    }
    return match;
  });
}

/* harmony default export */ __webpack_exports__["a"] = ({ reg: regStr, process: processTable });

/***/ }),
/* 9 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return block; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return inline; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__block_Head__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__block_SplitLine__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__block_BlockCode__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__block_Table__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__inline_ItaticBold__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__inline_InlineCode__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__inline_ImageLink__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__inline_Strikethrough__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__inline_Emoji__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__inline_Br__ = __webpack_require__(10);
/**
 * return a array contains all features of extendown
 */











var block = [];
var inline = [];

block.push(__WEBPACK_IMPORTED_MODULE_0__block_Head__["a" /* default */]);
block.push(__WEBPACK_IMPORTED_MODULE_1__block_SplitLine__["a" /* default */]);
block.push(__WEBPACK_IMPORTED_MODULE_2__block_BlockCode__["a" /* default */]);
block.push(__WEBPACK_IMPORTED_MODULE_3__block_Table__["a" /* default */]);

inline.push(__WEBPACK_IMPORTED_MODULE_4__inline_ItaticBold__["a" /* default */]);
inline.push(__WEBPACK_IMPORTED_MODULE_5__inline_InlineCode__["a" /* default */]);
inline.push(__WEBPACK_IMPORTED_MODULE_6__inline_ImageLink__["a" /* default */]);
inline.push(__WEBPACK_IMPORTED_MODULE_7__inline_Strikethrough__["a" /* default */]);
inline.push(__WEBPACK_IMPORTED_MODULE_8__inline_Emoji__["a" /* default */]);
inline.push(__WEBPACK_IMPORTED_MODULE_9__inline_Br__["a" /* default */]);



/***/ }),
/* 10 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/**
 * transform two blank chars to <br />
 * @module features/inline/Br
 * @author jeffone cunxuanwang@163.com
 */

var regStr = '[ ]{2}(\\n|$)';

function processBr(source) {
  var reg = new RegExp(regStr, 'g');
  return source.replace(reg, '<br />');
}

/* harmony default export */ __webpack_exports__["a"] = ({ reg: regStr, process: processBr });

/***/ }),
/* 11 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__helper__ = __webpack_require__(0);
/**
 * transform :+1: to Emoji Graphic
 */



var regStr = ':([\\w\\d\\+-]+):';
var path = './'; // emoji image path
var type = 'png';

function getHTML(content, source) {
  return '<img alt="' + source + '" width="20" height="20" src="' + path + content + '.' + type + '">';
}

function processEmoji(source) {
  var reg = new RegExp(regStr, 'g');
  return source.replace(reg, function (match, m1) {
    return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__helper__["g" /* htmlTemplate */])(getHTML, m1, match);
  });
}

/* harmony default export */ __webpack_exports__["a"] = ({ reg: regStr, process: processEmoji });

/***/ }),
/* 12 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__helper__ = __webpack_require__(0);
/**
 * transform ![]() -> <img/>
 * tranform []() -> <a></a>
 * tranfrom !?[][] -> <img> or <a>
 */


var regStr = '(?:(!)?\\[([^\\[\\n]*)\\](?:(?:\\(([^\\(\\n)]*)\\))|(?:\\[([^\\(\\n)]*)\\])))';
var referReg = '^\\s{0,3}\\[([^\\n\\[]+)\\]:[\\t ]+<?(.+)>?[\\t ]+\\n?[\\t ]*(?:(?:(["\'])(.*?)\\3)?|(?:\\(.*?\\))?)[\\t ]*$';

function getImage(alt, src, title) {
  return '<img' + (alt && ' alt="' + alt + '"') + (title && ' title="' + title + '"') + ' src="' + (src || '') + '" />';
}

function getLink(text, href, title) {
  return '<a' + (title && ' title="' + title + '"') + ' href="' + (href || '') + '" target="_blank">' + (text || '') + '</a>';
}

function processImageLink(section) {
  var reg = new RegExp(regStr, 'g');
  return section.replace(reg, function (match, m1, m2, m3, m4) {
    if (m4 === undefined) {
      // no refer

      var arr = [];
      if (m3) {
        arr = m3.split(/[\t ]+/);
      }
      if (arr[1]) {
        // remove the tag wrapped title
        arr[1] = arr[1].replace(/["']/g, '');
      }
      return m1 ? __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__helper__["g" /* htmlTemplate */])(getImage, m2, arr[0], arr[1]) : __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__helper__["g" /* htmlTemplate */])(getLink, m2, arr[0], arr[1]);
    }
    var matchArr = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__helper__["h" /* getPredefined */])()[referReg] || [];
    // first way to find match
    if (m4 === '') {
      for (var i = 0; i < matchArr.length; i += 1) {
        var tmp = matchArr[i];
        if (tmp[1].toLowerCase() === m2.toLowerCase()) {
          return m1 ? __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__helper__["g" /* htmlTemplate */])(getImage, m2, tmp[2], tmp[4]) : __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__helper__["g" /* htmlTemplate */])(getLink, m2, tmp[2], tmp[4]);
        }
      }
    } else {
      for (var _i = 0; _i < matchArr.length; _i += 1) {
        var _tmp = matchArr[_i];
        if (_tmp[1].toLowerCase() === m4.toLowerCase()) {
          return m1 ? __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__helper__["g" /* htmlTemplate */])(getImage, m2, _tmp[2], _tmp[4]) : __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__helper__["g" /* htmlTemplate */])(getLink, m2, _tmp[2], _tmp[4]);
        }
      }
    }
    return match;
  });
}

/* harmony default export */ __webpack_exports__["a"] = ({ pre: new RegExp(referReg, 'mg'), reg: regStr, process: processImageLink });

/***/ }),
/* 13 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__helper__ = __webpack_require__(0);
/**
 * implementation of inline code
 * @module features/inlinecode
 * @author jeffone cunxuanwang@163.com
 */



var TAG = '`';

function codeTemplate(content) {
  return '<code>' + content + '</code>';
}

function processInlineCode(section) {
  var arr = [];
  var lines = section.split('\n');
  return lines.map(function (line) {
    var start = 0; // the start index of inline code str
    var end = 0; // the end index of inline code str
    var first = 0; // the unmatched string's first index
    var last = 0; // the unmatched string's last index
    var result = '';
    for (var i = 0; i < line.length; i += 1) {
      if (line[i] === TAG && (arr.length === 0 || arr.length === 1)) {
        var str = '';
        if (arr.length === 0) {
          start = i;
          last = i;
          result += line.substring(first, last);
          first = last;
          while (line[i] === TAG) {
            str += TAG;
            i += 1;
          }
          arr.push(str);
        } else {
          while (line[i] === TAG) {
            str += TAG;
            i += 1;
          }
          if (str === arr[0]) {
            end = i;
            var count = end - start;
            var contentNum = count - arr[0].length * 2;
            // when the content between tags exsist
            if (contentNum > 0) {
              var content = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__helper__["g" /* htmlTemplate */])(codeTemplate, __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__helper__["i" /* htmlEncode */])(line.substr(start + arr[0].length, contentNum)));
              result += content;
              first = end;
              arr.pop();
            }
          }
        }
        // the while will make the index + 1
        i -= 1;
      }
    }

    result += line.substr(first);
    return result;
  }).join('\n');
}

/* harmony default export */ __webpack_exports__["a"] = ({ process: processInlineCode });

/***/ }),
/* 14 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__helper__ = __webpack_require__(0);
/**
 * transform ** ** or -- -- to bold text
 * transform * * or - - to itatic text
 * @module  features/inline/ItaticBold
 * @author jeffone cunxuanwang@163.com
 */


var regStr = '([*_]{1,2})(?![\\t ])([\\s\\S]*?[^ \\t])\\1';

function getHTML(type, content) {
  return '<' + type + '>' + content + '</' + type + '>';
}

function processItaticBold(section) {
  var reg = new RegExp(regStr, 'g');
  return section.replace(reg, function (match, m1, m2) {
    var type = void 0;
    if (m1.length === 1) {
      type = 'em';
    } else {
      type = 'strong';
    }
    var content = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__helper__["e" /* processInline */])(__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__helper__["f" /* processHTMLEncoding */])(m2));
    return getHTML(type, content);
  });
}

/* harmony default export */ __webpack_exports__["a"] = ({ reg: regStr, process: processItaticBold });

/***/ }),
/* 15 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__helper__ = __webpack_require__(0);
/**
 * tranform ~~ ~~ to strikethrough
 * @module features/inline/Strikethrough
 * @author jeffone cunxuanwang@163.com
 */



var regStr = '(?:~~)(?![\\t \\n])([^\\n]*?\\n?[^\\n]*?[^\\t \\n])(?:~~)';

function getHTML(content) {
  return '<span style="text-decoration:line-through">' + (content || '') + '</span>';
}

function processStrikeThrough(source) {
  var reg = new RegExp(regStr, 'g');
  return source.replace(reg, function (match, m1) {
    return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__helper__["g" /* htmlTemplate */])(getHTML, m1.replace('\n', ' '));
  });
}

/* harmony default export */ __webpack_exports__["a"] = ({ reg: regStr, process: processStrikeThrough });

/***/ }),
/* 16 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* WEBPACK VAR INJECTION */(function(module) {/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__core__ = __webpack_require__(1);
/**
 * export module
 */



/**
 * Parse Mardown text to html
 * @param {String} md - Mardown text
 * @return {String} html
 * @example
 * var md = "`inline code`";
 * ExDown.parse(md); // "<code>inline code</code>"
 */
function parse(md) {
  var Parser = new __WEBPACK_IMPORTED_MODULE_0__core__["a" /* default */](md);
  return Parser.getHTML();
}

var Extdown = {
  parse: parse,
  Extendown: __WEBPACK_IMPORTED_MODULE_0__core__["a" /* default */]
};

module.exports = Extdown;
/* WEBPACK VAR INJECTION */}.call(__webpack_exports__, __webpack_require__(2)(module)))

/***/ })
/******/ ]);
});
//# sourceMappingURL=extendown.js.map