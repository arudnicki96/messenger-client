import React, { useState } from "react";
import styles from "./ChatFooter.module.scss";
import SendMessageIcon from "../../../icons/SendMessageIcon";

const ChatFooter: React.FC = (): JSX.Element => {
  const [message, setMessage] = useState<string>("");

  const handleSubmit = (e: any) => {

    e.preventDefault();
    console.log('HURRAY!!!');
    setMessage('')
  }
  return (
    <form className={styles.wrapper} onSubmit={handleSubmit}>
      <input
        className={styles.input}
        placeholder={"Type a message..."}
        onChange={(e) => setMessage(e.target.value)}
        value={message}
      />
      <div className={styles.iconWrapper} onClick={handleSubmit}>
      <SendMessageIcon />
      </div>
    </form>
  );
};

export default ChatFooter;
