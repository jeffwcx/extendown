/**
 * tranform ~~ ~~ to strikethrough
 * @module features/inline/Strikethrough
 * @author jeffone cunxuanwang@163.com
 */

import { htmlTemplate } from '../../helper';

const regStr = '(?:~~)(?![\\t \\n])([^\\n]*?\\n?[^\\n]*?[^\\t \\n])(?:~~)';

function getHTML(content) {
  return `<span style="text-decoration:line-through">${content || ''}</span>`;
}

function processStrikeThrough(source) {
  const reg = new RegExp(regStr, 'g');
  return source.replace(reg, (match, m1) => htmlTemplate(getHTML, m1.replace('\n', ' ')));
}

export default { reg: regStr, process: processStrikeThrough };
