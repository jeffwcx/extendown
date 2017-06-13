const Extdown = require('../../dist/extendown');
const expect = require('chai').expect;
const parse = Extdown.parse;
const config = Extdown.config;

describe('config extendown', () => {
  it('emoji path config', () => {
    config.emoji.path = 'https://dn-phphub.qbox.me/assets/images/emoji/';
    const md = ':+1:';
    const result = '<p><img alt=":+1:" width="20" height="20" src="https://dn-phphub.qbox.me/assets/images/emoji/+1.png"></p>';
    expect(parse(md)).to.be.equal(result);
    config.emoji.path = 'https://www.webpagefx.com/tools/emoji-cheat-sheet/graphics/emojis/';
  });
  it('emoji nameformat', () => {
    config.emoji.nameFormat = function(name) {
      return `${name}test`;
    };
    const md = ':+1:';
    const result = '<p><img alt=":+1:" width="20" height="20" src="https://www.webpagefx.com/tools/emoji-cheat-sheet/graphics/emojis/+1test.png"></p>';
    expect(parse(md)).to.be.equal(result);
    config.emoji.nameFormat = function (name) {
      return name;
    }
  });
  it('emoji extension config', () => {
    config.emoji.ext = 'gif';
    const md = ':+1:';
    const result = '<p><img alt=":+1:" width="20" height="20" src="https://www.webpagefx.com/tools/emoji-cheat-sheet/graphics/emojis/+1.gif"></p>';
    expect(parse(md)).to.be.equal(result);
    config.emoji.ext = 'png';
  });
});