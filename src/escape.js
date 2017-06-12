
/**
 * escape functions
 */


const map = {};
const escapeReg = /\\([\\`*_{}[\]()#+\-.!:])/g;


/**
 * generate unique string
 * @return {String} Unique String
 */
function generateUniqueStr() {
  return `${Date.now()}${(parseInt(Math.random() * 900, 10) + 100)}`;
}


/**
 * Escape for markdown string
 * @param {String} source - markdown string
 * @return {String} the string after escaping
 */
function escape(source) {
  let result = source;
  const keys = Object.keys(map);
  keys.forEach((key) => {
    result = result.replace(key, map[key]);
  });
  return result;
}


/**
 * preprocess before escape
 * @param {String} source - markdown string
 * @return {String} preEscape string
 */
function preEscape(source) {
  return source.replace(escapeReg, (match, g1) => {
    const uniqueStr = generateUniqueStr();
    map[uniqueStr] = g1;
    return uniqueStr;
  });
}

export {
  preEscape,
  escape,
};
