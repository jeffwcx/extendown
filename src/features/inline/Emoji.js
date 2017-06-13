/**
 * transform :+1: to Emoji Graphic
 */

import { htmlTemplate } from '../../helper';
import config from '../../config';

const regStr = ':([\\w\\d\\+-]+):';

function getHTML(content, source) {
  return `<img alt="${source}" width="20" height="20" src="${config.emoji.path}${config.emoji.nameFormat(content)}.${config.emoji.ext}">`;
}

function processEmoji(source) {
  const reg = new RegExp(regStr, 'g');
  return source.replace(reg, (match, m1) => htmlTemplate(getHTML, m1, match));
}

export default { reg: regStr, process: processEmoji };
