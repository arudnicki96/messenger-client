import React from "react";
import styles from "./ChatHeader.module.scss";
import IconSearch from "../../../icons/IconSearch";
import { useSelector } from "react-redux";
import { RootState } from "../../../store";

const ChatHeader: React.FC = () => {
  const username = useSelector((state: RootState) => state.user.username);

  return (
    <div className={styles.wrapper}>
      <div></div>
      <div className={styles.inputWrapper}>
        <input
          className={styles.input}
          placeholder={"Search for messages..."}
        ></input>
        <IconSearch />
      </div>
      <div>{username}</div>
    </div>
  );
};

export default ChatHeader;
