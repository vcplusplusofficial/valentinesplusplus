import React, { useState } from "react";
import styles from "./styles.module.css";

interface Card1Props {
  senderName: string;
  receiverName: string;
  note: string;
}

// fix the message to fit in the card

const MAX_CHARACTERS_PER_LINE = 30;
const MAX_LINES = 3;

const Card1: React.FC<Card1Props> = ({ senderName, receiverName, note }) => {
  const [showNote, setShowNote] = useState(false);

  // Splitting the note into lines based on character count
  const splitMessageIntoLines = (message: string): string[] => {
    const words = message.split(" ");
    let lines: string[] = [];
    let currentLine = "";

    words.forEach((word) => {
      if ((currentLine + " " + word).trim().length <= MAX_CHARACTERS_PER_LINE) {
        currentLine = (currentLine + " " + word).trim();
      } else {
        lines.push(currentLine);
        currentLine = word;
      }
    });

    if (currentLine) lines.push(currentLine);

    return lines;
  };

  const noteLines = splitMessageIntoLines(note);
  const isNoteTooLong = noteLines.length > MAX_LINES;

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
            {[...Array(5)].map((_, index) => (
              <div key={index} className={styles[`heart${index + 1}`]}>
                <div className={styles.leftSide}></div>
                <div className={styles.rightSide}></div>
              </div>
            ))}
          </div>
          <div
            className={styles.message}
            onMouseEnter={() => setShowNote(true)}
            onMouseLeave={() => setShowNote(false)}
          >
            {showNote && !isNoteTooLong ? (
              <div className={styles.text}>
                {noteLines.map((line, idx) => (
                  <p key={idx}>{line}</p>
                ))}
              </div>
            ) : (
              <div className={styles.text}>
                Happy Valentine's
                <br />
                Day!
              </div>
            )}
          </div>
        </div>
        <p className={styles.hover}>- hover over the text -</p>
        {/* to implement incase there is a message longer than how much we can fit */}
        {isNoteTooLong && (
          <div className={styles.longMessage}>
            <p className={styles.longMessageTitle}>Your Full Message:</p>
            <p className={styles.longMessageContent}>{note}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Card1;
