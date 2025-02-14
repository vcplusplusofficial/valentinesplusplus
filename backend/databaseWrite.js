const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
const fs = require("fs");
const csv = require("csv-parser");

require("dotenv").config();

const url = process.env.MONGO_URL;

const client = new MongoClient(url, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function connectToDatabase() {
  try {
    await client.connect();
    console.log("Connected to MongoDB!");
    return client.db("sampleDatabase").collection("testDatabaseWrite");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
    throw error;
  }
}

async function insertDocument(collection, document) {
  try {
    const insertResult = await collection.insertOne(document);
    console.log("Document inserted successfully!", insertResult.insertedId);
  } catch (error) {
    console.error("Error inserting document:", error);
  } finally {
    await client.close();
  }
}

const main = async () => {
  console.log("This ran main");
  // Connecting to MongoDB
  const collection = await connectToDatabase();

  // Reading spreadsheet
  const results = await new Promise((resolve, reject) => {
    const data = [];

    fs.createReadStream("./data/form_test.csv")
      .pipe(csv())
      .on("data", (row) => data.push(row))
      .on("end", () => resolve(data))
      .on("error", (err) => reject(err));
  });

  // console.log(results);

  const document = {
    Timestamp: new Date().toISOString(),
    "Email Address": "jlui@vassar.edu",
    "Write your first and last name or leave it blank if you'd like to stay anonymous!": "Sujaq",
    "Who are we sending this gift to? (Recipient’s name)": "Sujaq",
    "Recipient’s email address": "Suhuq@vassar.edu",
    "Would you like to add a message? (optional)": "I bet you’re hungry. Fatty.",
    "Choose an option for your card!": "Option 2",
    "Would you like to add roses and a chocolate gift package for $5?": "No"
  };
  
  // Writing to database
  await insertDocument(collection, document);

  await client.close();
}

main();