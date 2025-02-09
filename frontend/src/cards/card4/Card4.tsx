import React from "react";
import "./styles.css"; // Ensure styles are correctly imported

interface Card4Props {
  senderName: string;
  receiverName: string;
  note: string;
}

const Card4: React.FC<Card4Props> = ({ senderName, receiverName, note }) => {
  return (
    <div>
      <p className="cite">Base designed by @lenadesign5043</p>

      <div className="valentines-day-card">
        {/* Checkbox to toggle the card open/close */}
        <input id="open" type="checkbox" />
        <label className="open" htmlFor="open"></label>

        {/* Card Front */}
        <div className="card-front">
          <div className="note">Click to Open</div>
        </div>

        {/* Card Inside */}
        <div className="card-inside">
          <div className="text-one">Happy</div>
          <div className="heart"></div>
          <div className="smile"></div>
          <div className="eyes"></div>

          {/* Sender & Receiver Info */}
          <div className="card-message">
            <p><strong>From:</strong> {senderName}</p>
            <p><strong>To:</strong> {receiverName}</p>
            <p className="note-text">{note}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card4;