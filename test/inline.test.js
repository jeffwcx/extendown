var expect = require('chai').expect;
var Extdown = require('../dist/extendown');
var Extendown = Extdown.Extendown;
var parse = Extdown.parse;

describe('ItaticBoldTest', function(){
  it('itatic test', function() {
    var extend = new Extendown('*hello*');
    expect(extend.getHTML()).to.be.equal('<p><em>hello</em></p>');
  });

  it('bold test', function() {
    var extend = new Extendown('__hello__');
    expect(extend.getHTML()).to.be.equal('<p><strong>hello</strong></p>');
  });

   it('itatic and bold test', function() {
    var extend = new Extendown('__hello*world*__');
    expect(extend.getHTML()).to.be.equal('<p><strong>hello<em>world</em></strong></p>');
  });

});

describe('Inline Code Test', function() {
  it('inlineCode test 1', function() {
    var extend = new Extendown('```hello```');
    expect(extend.getHTML()).to.be.equal('<p><code>hello</code></p>');
  });

  it('inlineCode test 2', function() {
    var extend = new Extendown('```he`llo```');
    expect(extend.getHTML()).to.be.equal('<p><code>he`llo</code></p>');
  });

  it('inlineCode test 3', function() {
    var extend = new Extendown('```he`llo``` \n ``hello`');
    expect(extend.getHTML()).to.be.equal('<p><code>he`llo</code> \n ``hello`</p>');
  });

  it('inlineCode and ', function() {
    var extend = new Extendown('xxxxx```he`llo```xxxx');
    expect(extend.getHTML()).to.be.equal('<p>xxxxx<code>he`llo</code>xxxx</p>');
  });

});

describe('Image and Link test', function() {
  it('normal image test', function() {
    var extend = new Extendown('![img](http://baidu.com "title")');
    expect(extend.getHTML()).to.be.equal('<p><img alt="img" title="title" src="http://baidu.com" /></p>');;
  });

  it('predefined image 1', function() {
    var extend = new Extendown('[id]: http://baidu.com "Title"\n![ID][]');
    expect(extend.getHTML()).to.be.equal('\n<p><img alt="ID" title="Title" src="http://baidu.com" /></p>');;
  });
  it('predefined image 2', function() {
    var extend = new Extendown('[ID]: http://baidu.com "Title"\n![alt][id]');
    expect(extend.getHTML()).to.be.equal('\n<p><img alt="alt" title="Title" src="http://baidu.com" /></p>');;
  });


  it('normal link', function() {
    var extend = new Extendown('\n[link](http://baidu.com "title")');
    expect(extend.getHTML()).to.be.equal('\n<p><a title="title" href="http://baidu.com" target="_blank">link</a></p>');;
  });

  it('predefined link', function() {
    var extend = new Extendown('[ID]: http://baidu.com "title"\n[link][id]');
    expect(extend.getHTML()).to.be.equal('\n<p><a title="title" href="http://baidu.com" target="_blank">link</a></p>');;
  });
});

describe('Strikethrough test', function(){
  it('with linebreak in content', function() {
    var extend = new Extendown('~~line1\nline2~~');
    expect(extend.getHTML()).to.be.equal('<p><span style="text-decoration:line-through">line1 line2</span></p>');
  })

  it('linebreak after tag', function() {
    var extend = new Extendown('~~line1\nline2\n~~');
    expect(extend.getHTML()).to.be.equal('<p>~~line1\nline2\n~~</p>');
  })

  it('blank after tag', function() {
    var extend = new Extendown('~~ line1\nline2~~');
    expect(extend.getHTML()).to.be.equal('<p>~~ line1\nline2~~</p>');
  })
});

describe('Emoji test', function(){
  it('normal', function() {
    var extend = new Extendown(':+1:');
    expect(extend.getHTML()).to.be.equal('<p><img alt=":+1:" width="20" height="20" src="./+1.png"></p>');
  });

  it('illegal chars', function() {
    var extend = new Extendown(':+1):');
    expect(extend.getHTML()).to.be.equal('<p>:+1):</p>');
  });

  it('continuous chars', function() {
    var extend = new Extendown(':+1::jp:');
    expect(extend.getHTML()).to.be.equal('<p><img alt=":+1:" width="20" height="20" src="./+1.png"><img alt=":jp:" width="20" height="20" src="./jp.png"></p>');
  });
});

describe('Br test', function(){
  it('br test 1', function() {
    var extend = new Extendown('\n  \n');
    expect(extend.getHTML()).to.be.equal('\n<p><br /></p>');
  });

  it('br test 2', function() {
    var extend = new Extendown('hello  \n');
    expect(extend.getHTML()).to.be.equal('<p>hello<br /></p>');
  });
});