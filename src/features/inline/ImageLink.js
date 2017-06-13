/**
 * transform ![]() -> <img/>
 * tranform []() -> <a></a>
 * tranfrom !?[][] -> <img> or <a>
 */
import { getPredefined, htmlTemplate, processInline } from '../../helper';

const regStr = '(?:(!)?\\[(.*)\\](?:(?:\\(([^(\\n)]*)\\))|(?:\\[([^(\\n)]*)\\])))';
const referReg = '^\\s{0,3}\\[([^\\n\\[]+)\\]:[\\t ]+<?(.+)>?[\\t ]+\\n?[\\t ]*(?:(?:(["\'])(.*?)\\3)?|(?:\\(.*?\\))?)[\\t ]*$';

function getImage(alt, src, title) {
  return `<img${alt && ` alt="${alt}"`}${title && ` title="${title}"`} src="${src || ''}" />`;
}

function getLink(text, href, title) {
  return `<a${title && ` title="${title}"`} href="${href || ''}" target="_blank">${text || ''}</a>`;
}

function processImageLink(section) {
  const reg = new RegExp(regStr, 'g');
  return section.replace(reg, (match, m1, m2, m3, m4) => {
    if (m4 === undefined) {
      // no refer

      let arr = [];
      if (m3) {
        arr = m3.split(/[\t ]+/);
      }
      if (arr[1]) {
        // remove the tag wrapped title
        arr[1] = arr[1].replace(/["']/g, '');
      }
      return m1 ? htmlTemplate(getImage, m2, arr[0], arr[1]) : htmlTemplate(getLink, processInline(m2), arr[0], arr[1]);
    }
    const matchArr = getPredefined()[referReg] || [];
    // first way to find match
    if (m4 === '') {
      for (let i = 0; i < matchArr.length; i += 1) {
        const tmp = matchArr[i];
        if (tmp[1].toLowerCase() === m2.toLowerCase()) {
          return m1 ? htmlTemplate(getImage, m2, tmp[2], tmp[4]) : htmlTemplate(getLink, processInline(m2), tmp[2], tmp[4]);
        }
      }
    } else {
      for (let i = 0; i < matchArr.length; i += 1) {
        const tmp = matchArr[i];
        if (tmp[1].toLowerCase() === m4.toLowerCase()) {
          return m1 ? htmlTemplate(getImage, m2, tmp[2], tmp[4]) : htmlTemplate(getLink, processInline(m2), tmp[2], tmp[4]);
        }
      }
    }
    return match;
  });
}

export default { pre: new RegExp(referReg, 'mg'), reg: regStr, process: processImageLink };
