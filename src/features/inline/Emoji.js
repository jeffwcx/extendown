/**
 * transform :+1: to Emoji Graphic
 */

import { htmlTemplate } from '../../helper';

const regStr = ':([\\w\\d\\+-]+):';
const path = './'; // emoji image path
const type = 'png';

function getHTML(content, source) {
  return `<img alt="${source}" width="20" height="20" src="${path}${content}.${type}">`;
}

function processEmoji(source) {
  const reg = new RegExp(regStr, 'g');
  return source.replace(reg, (match, m1) => htmlTemplate(getHTML, m1, match));
}

export default { reg: regStr, process: processEmoji };
