const Extdown = require('../../dist/extendown');
const expect = require('chai').expect;
const parse = Extdown.parse;

describe('Encode Test', () => {
  it('<>& encode', () => {
    const target = '<img src="hello" /> a < b && a > b';
    const result = '<p><img src="hello" /> a &lt; b &amp;&amp; a &gt; b</p>';
    expect(parse(target)).to.be.equal(result);
  });

  it('<> in Block Code And Inline Code', () => {
    const target = '```\n<p></p><\n```';
    const result = '<pre><code class="code_language_">&lt;p&gt;&lt;/p&gt;&lt;\n</code></pre>';
    expect(parse(target)).to.be.equal(result);
  });
});