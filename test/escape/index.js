const Extdown = require('../../dist/extendown');
const expect = require('chai').expect;
const parse = Extdown.parse;
describe('Escape Test', () => {
  it('` Escape', () => {
    const target = '`\\``';
    const result = '<p><code>`</code></p>';
    expect(parse(target)).to.be.equal(result);
  });
  it('\\ Escape', () => {
    const target = '\\\\';
    const result = '<p>\\</p>';
    expect(parse(target)).to.be.equal(result);
  });

  it('* Escape', () => {
    const target = '*\\**';
    const result = '<p><em>*</em></p>';
    expect(parse(target)).to.be.equal(result);
  });

  it('_ Escape', () => {
    const target = '__\\___';
    const result = '<p><strong>_</strong></p>';
    expect(parse(target)).to.be.equal(result);
  });

  it('[] Escape', () => {
    const target = '!\\[\\]()';
    const result = '<p>![]()</p>';
    expect(parse(target)).to.be.equal(result);
  });

  it('! Escape', () => {
    const target = '\\![link]()';
    const result = '<p>!<a href="" target="_blank">link</a></p>';
    expect(parse(target)).to.be.equal(result);
  });

  it('# Escape', () => {
    const target = '# \#hello';
    const result = '<h1>#hello</h1>';
    expect(parse(target)).to.be.equal(result);
  });
});