import React from "react";
import styles from "./styles.module.css";

interface Card2Props {
  senderName: string;
  receiverName: string;
  note: string;
}

const Card2: React.FC<Card2Props> = ({ senderName, receiverName, note }) => {
  return (
    <div className={styles.page}>
      <div className={styles.container}>
        <p className={styles.cite}>Base designed by @lenadesign5043</p>

        <div className={styles.valentines}>
          <div className={styles.envelope}></div>
          <div className={styles.front}>
            <div className={styles.toFrom}>
              <p className={styles.from}>From: {senderName}</p>
              <p className={styles.to}>To: {receiverName}</p>
            </div>
          </div>

          <div className={styles.card}>
            <div className={styles.text}>{note}</div>
            <div className={styles.heart}></div>
          </div>

          <div className={styles.hearts}>
            <div className={styles.one}></div>
            <div className={styles.two}></div>
            <div className={styles.three}></div>
            <div className={styles.four}></div>
            <div className={styles.five}></div>
          </div>
        </div>

        <div className={styles.shadow}></div>
      </div>
    </div>
  );
};

export default Card2;
