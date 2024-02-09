const { google } = require("googleapis");
const API_KEY = process.env.API_KEY;
const SPREADSHEET_ID = process.env.SPREADSHEET_ID;

// Authenticate using API key
const sheets = google.sheets({ version: "v4", auth: API_KEY });

async function findRowByColumnValue(inputValue, columnName) {
  try {
    // Call the spreadsheets.values.search method to find the row that matches the input value
    const response = await sheets.spreadsheets.values.search({
      spreadsheetId: SPREADSHEET_ID,
      valueInputOption: "USER_ENTERED",
      requestBody: {
        data: [
          {
            range: "Sheet1",
            type: "ROW",
            valueRenderOption: "FORMATTED_VALUE",
            valueInputOption: "USER_ENTERED",
            values: [[inputValue]],
          },
        ],
      },
    });

    // Extract the range of the matched row
    const matchedRange = response.data.matchedValues[0].range;

    // Extract the column name from the matched range
    const columnNameFromRange = matchedRange
      .split("!")[1]
      .split(":")[0]
      .replace(/\d/g, "");

    // If the column name from the range matches the expected column name, extract the row number
    if (columnNameFromRange === columnName) {
      const rowNumber = matchedRange.match(/\d+/)[0];
      console.log(`Matched row number: ${rowNumber}`);
      // You can use this row number to retrieve the row from the spreadsheet
      // Example: const row = await getRow(rowNumber);
      return rowNumber;
    } else {
      console.log("Column name does not match the expected column name.");
      return null;
    }
  } catch (error) {
    console.error("Error searching for row:", error);
    return null;
  }
}

// Usage example
async function main() {
  const rowNumber = await findRowByColumnValue("INPUT_VALUE", "COLUMN_NAME");
  if (rowNumber) {
    console.log("Found row:", rowNumber);
  } else {
    console.log("Row not found.");
  }
}

main();
