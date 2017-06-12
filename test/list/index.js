const Extdown = require('../../dist/extendown');
const expect = require('chai').expect;
const getMDAndHTML = require('../utils').getMDAndHTML;

var parse = Extdown.parse;

describe('List Test', () => {
  it('Simple List', () => {
    const all =  getMDAndHTML('list', __dirname);
    const html = parse(all.target);
    expect(html.replace(/[\t ]*[\n\r][\t ]*/g, '')).to.be.equal(all.result);
  });

  it('Nest List', () => {
    const all =  getMDAndHTML('nest-list', __dirname);
    const html = parse(all.target);
    expect(html.replace(/[\t ]*[\n\r][\t ]*/g, '')).to.be.equal(all.result);
  })

  it('Order List', () => {
    const all =  getMDAndHTML('order-list', __dirname);
    const html = parse(all.target);
    expect(html.replace(/[\t ]*[\n\r][\t ]*/g, '')).to.be.equal(all.result);
  })

  it('Complex List', () => {
    const all =  getMDAndHTML('complex-list', __dirname);
    const html = parse(all.target);
    expect(html.replace(/[\t ]*[\n\r][\t ]*/g, '')).to.be.equal(all.result);
  });

});