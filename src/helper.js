/**
 * Helper functions for Extendown Class
 * Also have public state over here
 * Includes Capture Group Count Array
 * PreDefined Array, BlockRegex ...
 */

import { block, inline } from './features/';
import { preEscape, escape } from './escape';

let trapArr = [];
let preDefined = {};

function preprocessCall(source, reg) {
  return source.replace(reg, (...args) => {
    if (!preDefined[reg.source]) preDefined[reg.source] = [];
    preDefined[reg.source].push(args);
    return '';
  });
}


function preProcess(source) {
  let md = source;
  inline.forEach((obj) => {
    // if feature have predefined
    if (obj.pre) {
      md = preprocessCall(source, obj.pre);
    }
  });
  block.forEach((obj) => {
    if (obj.pre) {
      md = preprocessCall(source, obj.pre);
    }
  });
  md = preEscape(md);
  return md;
}


const htmlEncoding = [{
  reg: '&(?!\\w+;)',
  replace: '&amp;',
}, {
  reg: '©',
  replace: '&copy;',
}, {
  reg: '®',
  replace: '&reg;',
}, {
  reg: '(<\\/?\\w+(?:[\\s]+\\w+(?:=(?:".*"|\'.*\'))*)*[\\s]*\\/?>)|(<)|(>)',
  replace(match, g1, g2, g3) {
    if (g2) return '&lt;';
    else if (g3) return '&gt;';
    return match;
  },
},
];

/**
 * process markdown source before parse
 * usually used in predefined statement
 * @param {String} source - MarkDown String Source
 * @return {String} The String After The Source Transformed
 * @ignore
 */
function processHTMLEncoding(source) {
  let result = source || '';
  result = String(result);
  htmlEncoding.forEach((rep) => {
    let reg = new RegExp(rep.reg, 'g');
    result = result.replace(reg, rep.replace);
    reg = null;
  });
  return result;
}

function htmlEncode(source) {
  return source.replace(/[<>]/g, (match) => {
    if (match === '<') return '&lt;';
    return '&gt;';
  });
}

function processInline(md) {
  let source = md || '';
  source = String(source);
  inline.forEach((obj) => {
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
  let index = 1;
  let i = 0;
  let isMatch = false;
  for (; index < match.length && i < trapArr.length; index += trapArr[i], i += 1) {
    if (match[index] !== undefined) {
      isMatch = true;
      break;
    }
  }
  if (!isMatch) return match[0];
  return block[i].process(match[0], source);
}

function processLineBreak(source) {
  if (source[0] === '\n') return source[0];
  return '';
}


function htmlTemplate(func, ...args) {
  const params = args;
  args.forEach((arg, index) => {
    params[index] = processHTMLEncoding(arg);
  });
  return func(...params);
}


// function makeRegUntrapped(regStr) {
//   const reg = /(\\)?\((\?:)?/g;
//   return regStr.replace(reg, (match, prefix) => {
//     if (prefix === '\\' || match === '(?:') return match;
//     return '(?:';
//   });
// }

function countTrapGroup(regStr) {
  const brackets = [];
  let count = 0;
  for (let i = 0; i < regStr.length; i += 1) {
    const nowChar = regStr[i];
    if (nowChar === '(') {
      const unTrapTag = regStr.substr(i + 1, 2);
      if (!((i >= 1 && regStr[i - 1] === '\\')
      || unTrapTag === '?:'
      || unTrapTag === '?='
      || unTrapTag === '?!')) {
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
  const trapReferReg = /\\(\d)/g;
  let allCount = 0;
  if (regStr.match(trapReferReg) === null) return regStr;
  allCount = trapArr.reduce((all, value) => all + value, allCount);
  return regStr.replace(trapReferReg, (match, refer) =>
      `\\${(allCount + parseInt(refer, 10))}`);
}


function mergeRegStr() {
  trapArr = [];
  preDefined = {}; // state init
  return block.reduce((all, obj) => {
    if (obj.reg) {
      // check trap refer
      const regStr = getRealReferCount(obj.reg);
      // get the current regex string's trap group number
      const count = countTrapGroup(obj.reg);
      trapArr.push(count);
      if (!all) {
        return `(?:${regStr})`;
      }
      return `${all}|(?:${regStr})`;
    }
    return all;
  }, '');
}


function getPredefined() {
  return preDefined;
}

function trimForArray(source, condition) {
  const array = source;
  if (array instanceof Array) {
    let contentStart = 0;
    let contentEnd = array.length;
    let isAllEmpty = true;
    for (let i = 0; i < array.length; i += 1) {
      if (array[i] && (condition ? !condition(array[i]) : true)) {
        contentStart = i;
        isAllEmpty = false;
        break;
      }
    }
    for (let j = array.length - 1; j > 0; j -= 1) {
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
  return escape(source);
}

export {
  processBlock,
  processInline,
  mergeRegStr,
  processLineBreak,
  preProcess,
  getPredefined,
  processHTMLEncoding,
  htmlEncode,
  htmlTemplate,
  trimForArray,
  postProcess,
};
