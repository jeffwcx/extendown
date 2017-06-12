const Extdown = require('../../dist/extendown');
const expect = require('chai').expect;
const getMDAndHTML = require('../utils').getMDAndHTML;
const removeLineBreak = require('../utils').removeLineBreak;

const parse = Extdown.parse;

describe('Table Test', () => {
  it('Simple Table', () => {
    const all =  getMDAndHTML('simple', __dirname);
    const str = parse(all.target);
    expect(removeLineBreak(str)).to.be.equal(all.result);
  });

  it('Inline Table', () => {
    const all =  getMDAndHTML('inline', __dirname);
    const str = parse(all.target);
    expect(removeLineBreak(str)).to.be.equal(all.result);
  });

  it('Complex Table', () => {
    const all =  getMDAndHTML('complex', __dirname);
    const str = parse(all.target);
    expect(removeLineBreak(str)).to.be.equal(all.result);
  });
})
