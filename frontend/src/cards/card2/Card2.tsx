import React from "react";
import "./styles.css"; // Import styles

interface Card2Props {
  senderName: string;
  receiverName: string;
  note: string;
}

const Card2: React.FC<Card2Props> = ({ senderName, receiverName, note }) => {
  return (
    <div className="container">
      <p className="cite">Base designed by @lenadesign5043</p>

      <div className="valentines">
        <div className="envelope"></div>
        <div className="front">
          <div className="to-from">
            <p className="from">From: {senderName}</p>
            <p className="to">To: {receiverName}</p>
          </div>
        </div>

        <div className="card">
          <div className="text">{note}</div>
          <div className="heart"></div>
        </div>

        <div className="hearts">
          <div className="one"></div>
          <div className="two"></div>
          <div className="three"></div>
          <div className="four"></div>
          <div className="five"></div>
        </div>
      </div>

      <div className="shadow"></div>
    </div>
  );
};

export default Card2;