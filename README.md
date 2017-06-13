
<p><img width="160" height="150" src="https://github.com/jeffwcx/extendown/raw/master/logo.png"></p>

[![TravisCi Build](https://img.shields.io/travis/jeffwcx/extendown.svg)](https://travis-ci.org/jeffwcx/extendown)
[![Coverage Status](https://img.shields.io/coveralls/jeffwcx/extendown/master.svg)](https://coveralls.io/github/jeffwcx/extendown?branch=master)
[![MIT](https://img.shields.io/npm/l/extendown.svg)](https://github.com/jeffwcx/extendown/blob/master/LICENSE)
[![Version](https://img.shields.io/npm/v/extendown.svg)](https://www.npmjs.com/package/extendown)
## extendable markdown compiler

## Features

+ Extenable
+ Github Mardown Syntax 

## Usage
### 1. install it by npm
```
npm install extendown
```
### 2. use it in nodejs or browser
The libray is packaged in UMD, you can import it in ES6 modules, CommonJS, AMD, etc.

### 3. how to use

```javascript
import Extendown from 'extendown';

const parse = Extendown.parse;
parse(YourMarkdownString);
```

### 4. how to extend
the following code is extend a inline feature
```javascript
const parse = Extendown.parse;
const extend = Extendown.extend;
const feature = {
  reg: '==(.+?)==',
  process(section) {
    return section.replace(new RegExp(feature.reg, 'g'),
    '<span style="background-color:yellow;">$1</span>');
  },
}
extend(Extdown.INLINE, feature);
parse('==color=='); 
// <p><span style="background-color:yellow;">color</span></p>
```
the following code is extend a block feature
```javascript
const feature = {
  reg: '(?:^|\\n)@@\\n((?:[^@]*\\n)?)@@(?=\\n|$)',
  process(section) {
    return section.replace(new RegExp(feature.reg, 'g'), (match, g1) => {
      return `<article>${g1}</article>`
    });
  },
};
extend(Extdown.BLOCK, feature);
parse(`@@
<p>here is your article</p>
@@`);
// <article><p>here is your article</p>\n</article>
```

### 5. how to config
The most config is for emoji, we will provide more config in future.

You can change emoji image's url in following ways.
1. change base path
```javascript
config.emoji.path = 'https://dn-phphub.qbox.me/assets/images/emoji/';
```
2. change extension
```javascript
config.emoji.ext = 'gif';
```
3. change your format function

```javascript
config.emoji.nameFormat = function(name) {
  return `${name}test`;
};
```

## Basic Syntax

Refer to Github Markdown

## refenrence
+ [Markdown: Syntax](http://daringfireball.net/projects/markdown/syntax)

+ [Basic writing and formatting syntax](https://help.github.com/articles/basic-writing-and-formatting-syntax)



