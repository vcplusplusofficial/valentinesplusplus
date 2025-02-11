import React from "react";
import styles from "./styles.module.css";

interface Card4Props {
  senderName: string;
  receiverName: string;
  note: string;
}

const Card4: React.FC<Card4Props> = ({ senderName, receiverName, note }) => {
  return (
    <div className={styles.page}>
      <p className={styles.cite}>Base designed by @lenadesign5043</p>

      <div className={styles.valentinesDayCard}>
        {/* Checkbox to toggle the card open/close */}
        <input id={styles.open} type={styles.checkBox} />
        <label className={styles.open} htmlFor={styles.open}></label>

        {/* Card Front */}
        <div className={styles.cardFront}>
          <div className={styles.note}>Click to Open</div>
        </div>

        {/* Card Inside */}
        <div className={styles.cardInside}>
          <div className={styles.textOne}>Happy</div>
          <div className={styles.heart}></div>
          <div className={styles.smile}></div>
          <div className={styles.eyes}></div>

          {/* Sender & Receiver Info */}
          <div className={styles.cardMessage}>
            <p>
              <strong>From:</strong> {senderName}
            </p>
            <p>
              <strong>To:</strong> {receiverName}
            </p>
            <p className={styles.noteText}>{note}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card4;
