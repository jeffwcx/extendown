var expect = require('chai').expect;
var Extdown = require('../dist/extendown');
var Extendown = Extdown.Extendown;
var parse = Extdown.parse;

describe('header test', function() {
  it('header test 1', function() {
    var extend = new Extendown("### header");
    expect(extend.getHTML()).to.be.equal("<h3>header</h3>");
  });

  it('header test 2', function() {
    var extend = new Extendown("###header");
    expect(extend.getHTML()).to.be.equal("<p>###header</p>");
  });

  it('header test 3', function() {
    var extend = new Extendown("###   header\n\nparas\nparas\n## header");
    expect(extend.getHTML()).to.be.equal("<h3>header</h3>\n\n<p>paras\nparas</p>\n<h2>header</h2>");
  });
  it('header test 4', function() {
    var extend = new Extendown("###   header\nparas\nparas\n\n\n ## header");
    expect(extend.getHTML()).to.be.equal("<h3>header</h3>\n<p>paras\nparas\n\n</p>\n<h2>header</h2>");
  });

  it('header test 5', function() {
    var extend = new Extendown("\n  ###   header\n");
    expect(extend.getHTML()).to.be.equal("\n<h3>header</h3>\n");
  });
});

describe('SplitLine Test', function() {
  it('SplitLine Test1', function() {
    var extend = new Extendown("***\n\nsplitline");
    expect(extend.getHTML()).to.be.equal("<hr></hr>\n\n<p>splitline</p>");
  });

  it('SplitLine Test2', function() {
    var extend = new Extendown("up\n***\ndown");
    expect(extend.getHTML()).to.be.equal("<p>up</p>\n<hr></hr>\n<p>down</p>");
  });

  it('SplitLine Test3', function() {
    var extend = new Extendown("*  * *");
    expect(extend.getHTML()).to.be.equal("<hr></hr>");
  });

  it('SplitLine Test4', function() {
    var extend = new Extendown("----");
    expect(extend.getHTML()).to.be.equal("<hr></hr>");
  });

});

describe('Blockquote Test', function() {
  it('Blockquote Test 1', function() {
    var extend = new Extendown("> block");
    expect(extend.getHTML()).to.be.equal("<blockquote><p>block</p></blockquote>");
  });
  
  it('Blockquote Test 2', function() {
    var extend = new Extendown("> block\n\npara");
    expect(extend.getHTML()).to.be.equal("<blockquote><p>block</p></blockquote><p>para</p>");
  });

  it('Blockquote Test 3', function() {
    var extend = new Extendown("\n > block\n\npara");
    expect(extend.getHTML()).to.be.equal("\n<blockquote><p>block</p></blockquote><p>para</p>");
  });
});

describe('BlockCode Test', function() {
  it('BlockCode Test 1', function() {
    var extend = new Extendown("```\n```");
    expect(extend.getHTML()).to.be.equal("<pre><code class=\"code_language_\"></code></pre>");
  });


  it('BlockCode Test 2', function() {
    var extend = new Extendown("``` javascript\n```");
    expect(extend.getHTML()).to.be.equal("<pre><code class=\"code_language_javascript\"></code></pre>");
  });

  it('BlockCode Test 3', function() {
    var extend = new Extendown("top\n``` javascript\ncode here\n``` \n bottom");
    expect(extend.getHTML()).to.be.equal("<p>top</p>\n<pre><code class=\"code_language_javascript\">code here\n</code></pre>\n<p> bottom</p>");
  });

  it('BlockCode Test 4', function() {
    var extend = new Extendown("``` \n#### hello\n```");
    expect(extend.getHTML()).to.be.equal("<pre><code class=\"code_language_\">#### hello\n</code></pre>");
  });

  it('BlockCode Test 5', function() {
    var extend = new Extendown("``` \nd```");
    expect(extend.getHTML()).to.be.equal("<p>``` \nd```</p>");
  });
  it('BlockCode Test 6', function() {
    var extend = new Extendown("```\n```\n```");
    expect(extend.getHTML()).to.be.equal("<pre><code class=\"code_language_\"></code></pre>\n<p>```</p>");
  });
});
const fs = require('fs');
describe('Block Union Test', function() {
  it('header+blockcode', function() {
    var extend = new Extendown("# header\n```\n```");
    expect(extend.getHTML()).to.be.equal("<h1>header</h1>\n<pre><code class=\"code_language_\"></code></pre>");
  });

  it('blockcode+blockquote', function() {
    var extend = new Extendown("\n```\n```\n  > block\n\npara");
    expect(extend.getHTML()).to.be.equal("\n<pre><code class=\"code_language_\"></code></pre>\n<blockquote><p>block</p></blockquote><p>para</p>");
  });

  it('blockcode+splitline+header+blockquote', function() {
    var md = fs.readFileSync('./test/blockunion.md', {encoding: 'utf-8'});
    var result = fs.readFileSync('./test/blockunion.html', {encoding: 'utf-8'});
    var extend = new Extendown(md);
    expect(extend.getHTML()).to.be.equal(result);
  });


});

describe('List Test', function() {
  it('List Simple', function() {
    var result = parse('1. List1\n2. List2\n+ List3\n* List4\n- List5');
    expect(result).to.be.equal('<ol start="1"><li>List1</li><li>List2</li></ol><ul><li>List3</li></ul><ul><li>List4</li></ul><ul><li>List5</li></ul>');
  });
});