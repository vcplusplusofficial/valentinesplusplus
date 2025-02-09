import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { insertDocument, fetchDocuments } from './APIService';
import Card1 from "./cards/card1/Card1";

const DynamicRouteHandler = () => {
  const location = useLocation(); // Get the current URL path
  const [entry, setEntry] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    // Extract the path from the URL
    const path = location.pathname.substring(1); // Remove leading "/"

    // Call the backend to check if the entry exists
    const fetchEntry = async () => {
      try {
        // const response = await fetchDocuments({ "link": path }); // Example query
        const response = await fetchDocuments({ "_id": path }); // Example query
        
        console.log(response);
        if (response) {
          if (Array.isArray(response)) setEntry(response[0]); 
          else setEntry(response); // Save entry if found
        } else {
          setEntry(null); // No matching entry
        }
      } catch (err) {
        setError("Failed to fetch entry");
      } finally {
        setLoading(false);
      }
    };

    fetchEntry();

    console.log(path, entry)

  }, [location.pathname]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  var display = <p>404: Entry not found</p>;

  if (entry) {
    if (entry.cardNumber === 1) display = <Card1 senderName={entry.senderName} receiverName={entry.receiverName} note="fill in"/> 

    else display = <p>404: Entry not found</p>
  }

  return (
    <div>
      {display}
    </div>
  );
};

export default DynamicRouteHandler;

        // <div>
        //   <p>{entry.senderName}</p>
        //   <p>{entry.receiverName}</p>
        //   <p>{entry.link}</p>
        //   <p>{entry.cardNumber}</p>
        // </div>