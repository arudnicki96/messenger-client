import React from "react";
import styles from "./ChatBodyStyles.module.scss";
import clsx from "clsx";
import data from "../../../mockturtle.json";

const ChatBody: React.FC = (): any => {
  const messages = data.sort(
    (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
  );

  return (
    <main className={styles.wrapper}>
      <div className={styles.header}>Placeholder</div>
      <ul className={styles.messagesWrapper}>
        {messages.map((item) => {
          const { message, isSender } = item;
          const receivedOrSentStyling = isSender
            ? styles.sent
            : styles.received;
          return (
            <li className={clsx(styles.message, receivedOrSentStyling)}>
              {message}
            </li>
          );
        })}
      </ul>
    </main>
  );
};
export default ChatBody;



