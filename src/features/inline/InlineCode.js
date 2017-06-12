/**
 * implementation of inline code
 * @module features/inlinecode
 * @author jeffone cunxuanwang@163.com
 */

import { htmlTemplate, htmlEncode } from '../../helper';

const TAG = '`';

function codeTemplate(content) {
  return `<code>${content}</code>`;
}


function processInlineCode(section) {
  const arr = [];
  const lines = section.split('\n');
  return lines.map((line) => {
    let start = 0; // the start index of inline code str
    let end = 0; // the end index of inline code str
    let first = 0; // the unmatched string's first index
    let last = 0; // the unmatched string's last index
    let result = '';
    for (let i = 0; i < line.length; i += 1) {
      if (line[i] === TAG && (arr.length === 0 || arr.length === 1)) {
        let str = '';
        if (arr.length === 0) {
          start = i;
          last = i;
          result += line.substring(first, last);
          first = last;
          while (line[i] === TAG) {
            str += TAG;
            i += 1;
          }
          arr.push(str);
        } else {
          while (line[i] === TAG) {
            str += TAG;
            i += 1;
          }
          if (str === arr[0]) {
            end = i;
            const count = end - start;
            const contentNum = count - (arr[0].length * 2);
            // when the content between tags exsist
            if (contentNum > 0) {
              const content = htmlTemplate(codeTemplate, htmlEncode(line.substr(start + arr[0].length, contentNum)));
              result += content;
              first = end;
              arr.pop();
            }
          }
        }
        // the while will make the index + 1
        i -= 1;
      }
    }

    result += line.substr(first);
    return result;
  }).join('\n');
}

export default { process: processInlineCode };
