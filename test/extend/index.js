const Extdown = require('../../dist/extendown');
const expect = require('chai').expect;
const parse = Extdown.parse;
const extend = Extdown.extend;

describe('extend Test', () => {
  it('extend a inline feature', () => {
    const feature = {
      reg: '==(.+?)==',
      process(section) {
        return section.replace(new RegExp(feature.reg, 'g'), '<span style="background-color:yellow;">$1</span>');
      },
    }
    extend(Extdown.INLINE, feature);
    const md = '==color==';
    const result = '<p><span style="background-color:yellow;">color</span></p>';
    expect(parse(md)).to.be.equal(result);
  });

  it('extend a block feature', () => {
    const feature = {
      reg: '(?:^|\\n)@@\\n((?:[^@]*\\n)?)@@(?=\\n|$)',
      process(section) {
        return section.replace(new RegExp(feature.reg, 'g'), (match, g1) => {
          return `<article>${g1}</article>`
        });
      },
    };
    extend(Extdown.BLOCK, feature);
    const md = `@@
<p>here is your article</p>
@@`;
    const result = '<article><p>here is your article</p>\n</article>';
    expect(parse(md)).to.be.equal(result);
  });

  it('extend error', () => {
    expect(extend).to.throw(TypeError);
  });
});