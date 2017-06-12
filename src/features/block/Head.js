/**
 * transform #{1,6} to h1-h6
 */
import { processInline, processLineBreak, processHTMLEncoding } from '../../helper';

const regStr = '(?:^|\\n)(?:[\\t ]*?)(#{1,6})\\s+(.*)(?:\\n|$)';

function getHTML(level, content) {
  return `<h${level}>${content}</h${level}>`;
}

function processHead(section) {
  const reg = new RegExp(regStr, 'g');
  const prefix = processLineBreak(section);
  return section.replace(reg, (match, m1, m2) => {
    let content = '';
    if (m2) content = processInline(processHTMLEncoding(m2));
    return prefix + getHTML(m1.length, content);
  });
}

export default { reg: regStr, process: processHead };

