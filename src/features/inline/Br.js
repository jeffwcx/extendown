/**
 * transform two blank chars to <br />
 * @module features/inline/Br
 * @author jeffone cunxuanwang@163.com
 */

const regStr = '[ ]{2}(\\n|$)';

function processBr(source) {
  const reg = new RegExp(regStr, 'g');
  return source.replace(reg, '<br />');
}

export default { reg: regStr, process: processBr };
