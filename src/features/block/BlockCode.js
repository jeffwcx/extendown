/**
 * transform BlockCode
 */
import { processLineBreak, htmlTemplate, htmlEncode } from '../../helper';

const regStr = '(?:^|\\n)[\\t ]*?([`]{3,})(?:[\\t ]+(\\w*))?\n((?:(?!\\1).*\\n)*)\\1[\\t ]*?(?=\n|$)';

function getHTML(language, content) {
  return `<pre><code class="code_language_${language}">${content}</code></pre>`;
}

function processBlockCode(section) {
  const reg = new RegExp(regStr, 'g');
  const prefix = processLineBreak(section);
  return section.replace(reg, (match, m1, m2, m3) => prefix + htmlTemplate(getHTML, m2 || '', htmlEncode(m3) || ''));
}


export default { reg: regStr, process: processBlockCode };
