function main() {
  const filename = "acnh.json";
  const sheets = SpreadsheetApp.getActiveSpreadsheet()
    .getSheets()
    .filter((sheet) => sheet.getName() !== "Read Me")
    .map((sheet) => {
      const name = sheet.getName();
      const columns = sheet.getLastColumn() - 1;
      const rows = sheet.getLastRow() - 1;
      const header =
        sheet.getRange(1, 1, 1, columns).getDisplayValues().pop() || [];
      const values =
        sheet.getRange(2, 1, rows, columns).getDisplayValues() || [];

      return {
        type: name,
        items: values.map((cells) =>
          cells.reduce(
            (acc, cell, column) => ({
              ...acc,
              ...{ [header[column] as string]: cell },
            }),
            {}
          )
        ),
      };
    });

  DriveApp.createFile(filename, JSON.stringify(sheets));
}
