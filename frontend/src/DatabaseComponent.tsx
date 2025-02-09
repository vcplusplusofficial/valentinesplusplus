import React, { useState, useEffect } from 'react';
import { insertDocument, fetchDocuments } from './APIService';

const DatabaseComponent = () => {
  const [documents, setDocuments] = useState([]);
  const [newDoc, setNewDoc] = useState({ senderName: '', receiverName: "", link: '', cardNumber: '', hobbies: '' });

  // Fetch documents on component mount
  useEffect(() => {
    const loadDocuments = async () => {
      try {
        const docs = await fetchDocuments({}); // All documents
        // const docs = await fetchDocuments({ name: 'Alice' }); // Example query
        setDocuments(docs);
      } catch (error) {
        console.error('Failed to load documents:', error);
      }
    };

    loadDocuments();
  }, []);

  // Insert a new document
  const handleInsert = async () => {
    try {
      // Check if any field is empty or missing
      if (Object.values(newDoc).some(value => !value.trim())) {
        alert('All fields must be filled before submitting.');
        return; // Stop execution if any field is empty
      }
  
      const hobbiesArray = newDoc.hobbies.split(',').map(hobby => hobby.trim()); // Convert hobbies to array
      const response = await insertDocument({ ...newDoc, hobbies: hobbiesArray });
  
      console.log(newDoc);
      // alert(`Document inserted with ID: ${response.documentId}`);
    } catch (error) {
      alert('Failed to insert document');
    }
  };
  return (
    <div>
      <h1>MongoDB React App</h1>

      <h2>Insert Document</h2>
      <input
        type="text"
        placeholder="Sender name"
        value={newDoc.senderName}
        onChange={(e) => setNewDoc({ ...newDoc, senderName: e.target.value })}
      />
      <input
        type="text"
        placeholder="Receiver name"
        value={newDoc.receiverName}
        onChange={(e) => setNewDoc({ ...newDoc, receiverName: e.target.value })}
      />
      <input
          type="text"
          placeholder="Link"
          value={newDoc.link}
          onChange={(e) => setNewDoc({ ...newDoc, link: e.target.value })}
        />
      <input
        type="number"
        placeholder="Card Number"
        value={newDoc.cardNumber}
        onChange={(e) => setNewDoc({ ...newDoc, cardNumber: parseInt(e.target.value, 10) })}
      />
      {/* TODO: MISSING LINK AND EMAILS */}

      {/* example input */}
      <input
        type="text"
        placeholder="Hobbies (comma-separated)"
        value={newDoc.hobbies}
        onChange={(e) => setNewDoc({ ...newDoc, hobbies: e.target.value })}
      />
      <button onClick={handleInsert}>Insert</button>

      <h2>Fetched Documents</h2>
      <ul>
      {documents.map((doc) => (
        <li key={doc._id}>
          {Object.entries(doc).map(([key, value]) => (
            <span key={key}>
              <strong>{key}:</strong>{" "}
              {Array.isArray(value) ? value.join(", ") + " // ": value.toString() + " // "}
            </span>
          ))}
        </li>
      ))}
      </ul>
    </div>
  );
};

export default DatabaseComponent;