import React from "react";
import "./styles.css"; // Ensure you have the styles imported

interface Card3Props {
  senderName: string;
  receiverName: string;
  note: string;
}

const Card3: React.FC<Card3Props> = ({ senderName, receiverName, note }) => {
  return (
    <div>
      <p className="cite">Base designed by @lenadesign5043</p>

      <div className="chocolate-box">
        <div className="chocs">
          <div id="top-left" className="top-left"></div>
          <div id="top-right" className="top-right"></div>
          <div id="bottom-left" className="bottom-left"></div>
          <div id="bottom-right" className="bottom-right"></div>
        </div>

        <div className="box-bottom"></div>
        <div className="cover"></div>

        {/* Labels for the chocolates */}
        <div id="white">White Chocolate</div>
        <div id="milk">Milk Chocolate</div>
        <div id="truffle">Chocolate Truffle</div>
        <div id="truffle2">Chocolate Truffle</div>
      </div>
    </div>
  );
};

export default Card3;