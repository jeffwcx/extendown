/**
 * export module
 */

import Extendown from './core';

/**
 * Parse Mardown text to html
 * @param {String} md - Mardown text
 * @return {String} html
 * @example
 * var md = "`inline code`";
 * ExDown.parse(md); // "<code>inline code</code>"
 */
function parse(md) {
  const Parser = new Extendown(md);
  return Parser.getHTML();
}



const Extdown = {
  parse,
  Extendown,
};

module.exports = Extdown;
