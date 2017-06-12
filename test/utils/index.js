const fs = require('fs');
const path = require('path');

function removeLineBreak(source) {
  return source.replace(/[\t ]*[\n\r][\t ]*/g, '');
}

function getMDAndHTML(fileName, dirname) {
  let mdurl = path.join(dirname, `./${fileName}.md`);
  let resulturl = path.join(dirname, `./${fileName}.html`);
  let md = fs.readFileSync(mdurl, { encoding: 'utf-8' });
  let result = fs.readFileSync(resulturl, { encoding: 'utf-8' });
  return {
    target: md,
    result: removeLineBreak(result),
  };
}


module.exports = {
  removeLineBreak,
  getMDAndHTML
};