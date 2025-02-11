import React from "react";
import styles from "./styles.module.css";

interface Card3Props {
  senderName: string;
  receiverName: string;
  note: string;
}

const Card3: React.FC<Card3Props> = ({ senderName, receiverName, note }) => {
  return (
    <div className={styles.page}>
      <p className={styles.cite}>Base designed by @lenadesign5043</p>

      <div className={styles.chocolateBox}>
        <div className={styles.chocs}>
          <div id={styles.topLeft} className={styles.topLeft}></div>
          <div id={styles.topRight} className={styles.topRight}></div>
          <div id={styles.bottomLeft} className={styles.bottomLeft}></div>
          <div id={styles.bottomRight} className={styles.bottomRight}></div>
        </div>

        <div className={styles.boxBottom}></div>
        <div className={styles.cover}></div>

        {/* Labels for the chocolates */}
        <div id={styles.white}>White Chocolate</div>
        <div id={styles.milk}>Milk Chocolate</div>
        <div id={styles.truffle}>Chocolate Truffle</div>
        <div id={styles.truffle2}>Chocolate Truffle</div>
      </div>
    </div>
  );
};

export default Card3;
