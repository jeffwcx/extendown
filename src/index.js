/**
 * export module
 */

import Extendown from './core';
import config from './config';
import { block, inline } from './features';

/**
 * Parse Mardown text to html
 * @param {String} md - Mardown text
 * @return {String} html
 * @example
 * var md = "`inline code`";
 * Extendown.parse(md); // "<code>inline code</code>"
 */
function parse(md) {
  const Parser = new Extendown(md);
  return Parser.getHTML();
}

const INLINE = 'inline';
const BLOCK = 'block';

function extend(type, feature) {
  if (feature && typeof feature.process === 'function') {
    if (type === INLINE) inline.push(feature);
    else if (type === BLOCK) {
      if (typeof feature.reg !== 'string') throw new TypeError('The Block feature\'s "reg" property must be string');
      block.push(feature);
    } else throw new TypeError('Do not support such a type to extend!');
  } else {
    throw new TypeError('The feature param must exist and process property must be a function');
  }
}

export {
  parse,
  Extendown,
  config,
  extend,
  INLINE,
  BLOCK,
};
