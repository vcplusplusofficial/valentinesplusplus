import React from "react";
import styles from "./styles.module.css";

interface Card1Props {
  senderName: string;
  receiverName: string;
  note: string;
}

const Card1: React.FC<Card1Props> = ({ senderName, receiverName, note }) => {
  return (
    <div className={styles.page}>
      <div className={styles.happyValentines}>
        <p className={styles.cite}>base designed by @lenadesign5043</p>
        <div className={styles.toFrom}>
          <p className={styles.to}>To: {receiverName}</p>
          <p className={styles.from}>From: {senderName}</p>
        </div>
        <div className={styles.valentinesDayCard}>
          <div className={styles.clouds}></div>
          <div className={styles.hearts}>
            <div className={styles.heartOne}>
              <div className={styles.leftSide}></div>
              <div className={styles.rightSide}></div>
            </div>
            <div className={styles.heartTwo}>
              <div className={styles.leftSide}></div>
              <div className={styles.rightSide}></div>
            </div>
            <div className={styles.heartThree}>
              <div className={styles.leftSide}></div>
              <div className={styles.rightSide}></div>
            </div>
            <div className={styles.heartFour}>
              <div className={styles.leftSide}></div>
              <div className={styles.rightSide}></div>
            </div>
            <div className={styles.heartFive}>
              <div className={styles.leftSide}></div>
              <div className={styles.rightSide}></div>
            </div>
          </div>
          <div className={styles.message}>
            <div className={styles.text}>
              {note}
              <br />
            </div>
            <div className={styles.text}>
              Happy Valentine's
              <br />
              Day!
            </div>
          </div>
        </div>
        <p className={styles.hover}>- hover over the text -</p>
      </div>
    </div>
  );
};

export default Card1;
