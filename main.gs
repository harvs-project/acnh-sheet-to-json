/**
 * @param {SoreadsheetApp.Sheet} sheet
 * @param {number} row row to search.
 * @param {number} columns number of columns to seach.
 * @return {Array<number>} collumns containing formulas.
 */
function findFormulaColumns(sheet, row, columns) {
  return sheet.getRange(row, 1, 1, columns).getFormulas()
    .pop()
    .map((v, i) => v !== '' ? i + 1: null)
    .filter(i => i !== null);
}

/**
 * Generate ranges for one row, ignoring formulas.
 * @param {SpreadshetApp.Sheet} sheet
 * @param {number} row
 * @param {Array<number>} formulas
 * @return {Array<SpreadsheetApp.Range>}
 */
function valuesRange(sheet, row, columns, formulas) {
  return [].concat.apply([], formulas.map(column => {
    return [
      sheet.getRange(row, 1, 1, column - 1),
      sheet.getRange(row, column + 1, 1, columns)
    ];
  }))
}

function main() {
  const sheets = SpreadsheetApp.getActiveSpreadsheet().getSheets()
    .filter(sheet => sheet.getName() !== 'Read Me')
    .map(sheet => {
      const name = sheet.getName()
      const columns = sheet.getLastColumn() - 1
      const rows = sheet.getLastRow() - 1
      const header = sheet.getSheetValues(1, 1, 1, columns).pop()
      const values = sheet.getRange(2, 1, rows, columns)
      return {
        name,
        header,
        values
      }
    })
  Logger.log(sheets)
}
