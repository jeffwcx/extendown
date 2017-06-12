/**
 * transform *** or --- or * * * to <hr></hr>
 * @module  features/block/SplitLine
 * @author jeffwcx cunxuanwang@163.com
 */

const regStr = '(^|\\n)[\\t ]*?([*|-][\\t ]*){3,}?(?:\\n|$)';

function processSplitLine(section) {
  const reg = new RegExp(regStr, 'g');
  return section.replace(reg, (match, prefix) => `${prefix || ''}<hr></hr>`);
}

export default { reg: regStr, process: processSplitLine };

