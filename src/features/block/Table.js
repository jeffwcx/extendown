
import { trimForArray, processInline } from '../../helper';

const regStr = '(?:^|\\n)([^|\\n]*(?:\\|[^|\\n]*)+\\|?)\\n((?:\\:?-{3,}\\:?)?(?:[\\t ]*\\|[\\t ]*(?:\\:?-{3,}\\:?)?)+[\\t ]*\\|?)((?:\\n[^|\n]*(?:\\|[^|\n]*)+\\|?)*)';

function template(cols, rows) {
  return `<table>
    <thead>
      <tr>
      ${cols.map(col => `<th${col.align && ` align="${col.align}"`}>${col.colName}</th>`).join('')}
      </tr>
    </thead>
    <tbody>
      ${rows.map(row =>
        `<tr>${cols.map((col, index) =>
          `<td${col.align && ` align="${col.align}"`}>${row[index]}</td>`).join('')}</tr>`).join('')}
    </tbody>
  </table>`;
}

function trimBlank(item) {
  return /^\s*$/g.test(item);
}

function processTable(section) {
  const reg = new RegExp(regStr, 'g');
  return section.replace(reg, (match, m1, m2, m3) => {
    let cols = m2.split('|');
    let colNames = m1.split('|');
    let rows = m3.split('\n');
    cols = trimForArray(cols, trimBlank);
    colNames = trimForArray(colNames);
    rows = trimForArray(rows);
    if (cols.length > 1) {
      const colInfo = [];
      const rowsInfo = [];
      let hasEmpty = false;

      for (let i = 0; i < cols.length; i += 1) {
        let colStyle = cols[i];
        const colName = colNames[i];
        if (!colStyle) {
          hasEmpty = true;
          break;
        }
        colStyle = colStyle.trim();
        const left = colStyle.substr(0, 1) === ':';
        const right = colStyle.substr(-1) === ':';
        let align = '';
        if (left && !right) {
          align = 'left';
        } else if (!left && right) {
          align = 'right';
        } else if (left && right) {
          align = 'center';
        }
        colInfo.push({
          colName: processInline(colName.trim()),
          align,
        });
      }
      if (hasEmpty) {
        return match;
      }
      rows = trimForArray(rows, trimBlank);
      for (let j = 0; j < rows.length; j += 1) {
        let rowArr = rows[j].split('|');
        rowArr = trimForArray(rowArr);
        rowArr = rowArr.map(item => processInline(item.trim()));
        rowsInfo.push(rowArr);
      }
      return template(colInfo, rowsInfo);
    }
    return match;
  });
}


export default { reg: regStr, process: processTable };
