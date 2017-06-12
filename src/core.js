/**
 * itegrate all features of extendown
 * @module  core module
 * @author jeffone cunxuanwang@163.com
 */

import { processBlock, mergeRegStr, preProcess, postProcess } from './helper';
import processList from './features/block/List';
/** Class Extendown */
class Extendown {
  constructor(md, nowrap) {
    this.html = '';
    this.nowrap = nowrap;
    this.source = md.replace(/\r\n^/gm, '\n');
    this.frontFlag = 0;
    this.behindFlag = 0;
    this.lastIndex = 0;
    this.process();
  }

  process() {
    this.reg = new RegExp(mergeRegStr(), 'g');
    // preprocess
    this.source = preProcess(this.source);
    let match = this.reg.exec(this.source);
    if (!match) {
      this.html = Extendown.processOtherBlock(this.source, this.nowrap);
    }
    for (;match !== null;) {
      this.frontFlag = this.lastIndex;
      this.behindFlag = match.index;
      this.lastIndex = this.reg.lastIndex;
      // do not eat the last char \n
      if (match && match[0].slice(-1) === '\n') {
        this.reg.lastIndex -= 1;
        this.lastIndex -= 1;
      }
      if (this.frontFlag < this.behindFlag) {
        // these blocks do not match any block regexs
        // just process them inline and wrap them with <p></p>
        const otherBlock = this.source.substring(this.frontFlag, this.behindFlag);
        const result = Extendown.processOtherBlock(otherBlock, this.nowrap);
        this.html += result;
      }
      this.html += String(processBlock(match, this.source));
      match = this.reg.exec(this.source);
      // add the last unmatch part of source to html
      if (!match) {
        const lastPart = this.source.substring(this.lastIndex);
        const result = Extendown.processOtherBlock(lastPart, this.nowrap);
        this.html += result;
      }
    }

    this.html = postProcess(this.html);
  }
  // process list,quote block and unmatched block
  static processOtherBlock(source, nowrap) {
    return source.replace(/^(\n*)([\s\S]*)$/g, (mat, m1, m2) => {
      if (m2) {
        return `${m1 || ''}${processList(m2, nowrap) || ''}`;
      }
      return `${m1 || ''}`;
    });
  }
  getHTML() {
    return this.html;
  }

}

export default Extendown;

