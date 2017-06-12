/**
 * transform ** ** or -- -- to bold text
 * transform * * or - - to itatic text
 * @module  features/inline/ItaticBold
 * @author jeffone cunxuanwang@163.com
 */
import { processInline, processHTMLEncoding } from '../../helper';

const regStr = '([*_]{1,2})(?![\\t ])([\\s\\S]*?[^ \\t])\\1';

function getHTML(type, content) {
  return `<${type}>${content}</${type}>`;
}

function processItaticBold(section) {
  const reg = new RegExp(regStr, 'g');
  return section.replace(reg, (match, m1, m2) => {
    let type;
    if (m1.length === 1) {
      type = 'em';
    } else {
      type = 'strong';
    }
    const content = processInline(processHTMLEncoding(m2));
    return getHTML(type, content);
  });
}

export default { reg: regStr, process: processItaticBold };
