// Server-side code
const { google } = require("googleapis");
const express = require("express");
const path = require("path");
const fs = require("fs");
const cors = require("cors");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 8000;

app.use(cors());
app.use(express.static(path.join(__dirname, "/public")));

const credentialsFilePath = "./credentials.json";
const SPREADSHEET_ID = process.env.SPREADSHEET_ID;

const getData = async (inputValue) => {
  try {
    const auth = new google.auth.GoogleAuth({
      keyFile: credentialsFilePath,
      scopes: "https://www.googleapis.com/auth/spreadsheets",
    });

    const client = await auth.getClient();

    const sheets = google.sheets({ version: "v4", auth: client });

    const response = await sheets.spreadsheets.values.get({
      spreadsheetId: SPREADSHEET_ID,
      range: "Sheet1!I:I",
      valueRenderOption: "FORMULA",
    });

    const valuesWithRowNumbers = response.data.values.map((row, index) => ({
      rowNumber: index + 1,
      rowData: row,
    }));

    const matchingRow = valuesWithRowNumbers.find(
      (row) => row.rowData[0] === inputValue
    );

    if (matchingRow) {
      const rowResponse = await sheets.spreadsheets.values.get({
        spreadsheetId: SPREADSHEET_ID,
        range: `Sheet1!A${matchingRow.rowNumber}:Z${matchingRow.rowNumber}`,
      });

      return rowResponse.data.values[0];
    } else {
      res.send(null);
    }
  } catch (error) {
    console.error("Error searching for value:", error);
    res.status(500).json({
      success: false,
      message: "Error searching for value",
      error: error.message,
    });
  }
};

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

app.get("/vc_card1", (req, res) => {
  res.sendFile(path.join(__dirname, "vc_card1", "index.html"));
});
app.get("/vc_card2", (req, res) => {
  res.sendFile(path.join(__dirname, "vc_card2", "index.html"));
});
app.get("/vc_card3", (req, res) => {
  res.sendFile(path.join(__dirname, "vc_card3", "index.html"));
});
app.get("/vc_card4", (req, res) => {
  res.sendFile(path.join(__dirname, "vc_card4", "index.html"));
});

// app.get("/vc_card/", async (req, res) => {
//   try {
//     const inputValue = req.query.code;
//     const getRow = await getData(inputValue); // Make sure to await getData
//     const randomNumber = Math.floor(Math.random() * 4) + 1;
//     let filePath = "";

//     switch (randomNumber) {
//       case 1:
//         filePath = path.join(__dirname, "vc_card1", "index.html");
//         break;
//       case 2:
//         filePath = path.join(__dirname, "vc_card2", "index.html");
//         break;
//       case 3:
//         filePath = path.join(__dirname, "vc_card3", "index.html");
//         break;
//       default:
//         filePath = path.join(__dirname, "vc_card4", "index.html");
//     }

//     // Append the getRow data as a query parameter to the file path
//     const url = new URL("file://" + filePath);
//     url.searchParams.append("data", JSON.stringify(getRow));

//     // Send the file with the appended query parameter
//     res.sendFile(url.pathname);
//   } catch (error) {
//     console.error("Error retrieving data:", error);
//     res.status(500).json({
//       success: false,
//       message: "Error retrieving data",
//       error: error.message,
//     });
//   }
// });

app.get("/vc_card/:code", async (req, res) => {
  try {
    
    const inputValue = req.params.code;
    // console.log(req.code)
    const getRow = await getData(inputValue); // Make sure to await getData

    res.send(getRow)
  } catch (error) {
    console.error("Error retrieving data:", error);
    res.status(500).json({
      success: false,
      message: "Error retrieving data",
      error: error.message,
    });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
