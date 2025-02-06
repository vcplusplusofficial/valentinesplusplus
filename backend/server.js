const express = require("express");
const cors = require("cors");
const { MongoClient, ServerApiVersion } = require("mongodb");

require("dotenv").config();

const app = express();
app.use(cors({
  origin: "http://localhost:5173", // Replace with your React app's URL
}));
app.use(express.json());

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
    return client.db("sampleDatabase").collection("sampleCollection");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
    throw error;
  }
}

app.get("/api/documents", async (req, res) => {
  try {
    const collection = await connectToDatabase();
    const query = req.query; // Use query parameters for filtering
    const documents = await collection.find(query).toArray();
    res.json(documents); // Send the found documents as a JSON response
  } catch (error) {
    console.error("Error fetching documents:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.post("/api/documents", async (req, res) => {
  try {
    const collection = await connectToDatabase();
    const document = req.body; // Get the document to insert from the request body

    // Insert the document into the collection
    const insertResult = await collection.insertOne(document);

    res.status(201).json({
      message: "Document inserted successfully!",
      insertedId: insertResult.insertedId,
    });
  } catch (error) {
    console.error("Error inserting document:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});