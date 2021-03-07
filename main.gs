function main() {
  const sheets = SpreadsheetApp.getActiveSpreadsheet().getSheets()
    .filter(sheet => sheet.getName() !== 'Read Me')
    .map(sheet => ({
      name: sheet.getName(),
      header: sheet.getSheetValues(1, 1, 1 -1)
    }))
}
