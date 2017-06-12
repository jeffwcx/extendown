/**
 * transform list
 */

import Extendown from '../../core';
import { processInline, processHTMLEncoding } from '../../helper';

const regForList = '(?:^|\\n)[\\t ]{0,2}(\\d+\\.|[+\\-*>])[\\t ]+?([\\s\\S]*?)((?:\\n[\\t ]*\\n[ ]{3,}[\\s\\S]*?)*)(?=\\n[\\t ]{0,2}(?:\\d+\\.|[+\\-*>])|(\\n[\\t ]*\\n)|$)';

function parse(source, nowrap) {
  const factory = new Extendown(source, nowrap);
  return factory.getHTML();
}

function CreateTemplate() {
}
CreateTemplate.prototype.create = function create(type, start) {
  this._type = type;
  this._start = start;
  this._content = [];
};
CreateTemplate.prototype.add = function add(type, content, inline) {
  let str = '';
  if (type === 'inline') {
    str = `<li>${content}</li>`;
  } else if (type === 'block') {
    if (content instanceof Array) {
      str = `<li>${inline || ''}${content.map(block => block).join('')}</li>`;
    } else {
      str = `<li>${inline || ''}${content}</li>`;
    }
  } else if (type === 'blockquote') {
    if (content instanceof Array && content.length > 0) {
      str = `${inline || ''}${content.map(block => `<p>${block}</p>`).join('')}`;
    } else {
      str = inline;
    }
  }
  this._content.push(str);
};

CreateTemplate.prototype.get = function get() {
  if (this._type === 'ul' || this._type === 'ol') {
    return `<${this._type}${this._start && this._start > 0 ? ` start="${this._start}"` : ''}>${this._content.join('')}</${this._type}>`;
  }
  return `<${this._type}><p>${this._content.join('\n')}</p></${this._type}>`;
};

function backspace(content) {
  const reg = /(?:^|\n)([\t ]+)/g;
  const match = reg.exec(content);
  let result = content;
  if (match) {
    const spaceNum = match[1].length;
    const spaceReg = new RegExp(`(?:^|\n)([\\t ]{${spaceNum}})`, 'g');
    result = content.replace(spaceReg, '\n');
  }
  return result;
}

// 根据块级和行级元素制造内容数组
function makeContent(inlineContent, blockContent) {
  const content = [];
  if (inlineContent) {
    content.push(inlineContent);
  }
  if (blockContent) {
    content.push(...(blockContent
    .split(/\n[\t ]*\n(?=[ ]{3,})/)
    .filter((block) => {
      if (block) return true;
      return false;
    })
    .map((block) => {
      const result = backspace(block);
      return parse(result);
    })));
  }
  return content;
}

function unmatchedString(string, nowrap) {
  let str = string;
  if (!str) return '';
  str = str.replace(/^\n[\t \n]*/, '');
  if (nowrap) {
    return processInline(processHTMLEncoding(str));
  }
  return `<p>${processInline(processHTMLEncoding(str))}</p>`;
}

// process list
function process(md, nowrap) {
  let match = null;
  let result = '';
  const reg = new RegExp(regForList, 'g');
  match = reg.exec(md);
  if (!match) {
    result = unmatchedString(md, nowrap);
    return result;
  }
  let lastIndex = 0;
  let nowIndex = reg.lastIndex;
  let frontIndex = nowIndex - match[0].length;
  let lastType = '';
  let lastSymbol = '';
  const template = new CreateTemplate();
  while (match != null) {
    const symbol = match[1];
    let inlineContent = match[2];
    const blockContent = match[3];
    const suffix = match[4];
    let type;
    let start;
    if (symbol === '+' || symbol === '-' || symbol === '*') { // 无序列表
      type = 'ul';
    } else if (symbol === '>') { // 引用
      type = 'blockquote';
    } else { // 有序列表
      type = 'ol';
      start = symbol.replace('.', '');
    }

    if (type !== lastType || lastIndex !== frontIndex || (type === 'ul' && symbol !== lastSymbol)) {
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

export default process;
