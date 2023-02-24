import * as React from "react";
import styles from "./ChatSidebar.module.scss";
import IconSearch from "../../../icons/IconSearch";

const ChatSidebar: React.FC = () => {
  return (
    <div className={styles.wrapper}>
      <SearchInput />
      <ConversationItem />
    </div>
  );
};

const ConversationItem: React.FC = () => {
  return (
    <div className={styles.conversationItemWrapper}>
      <img
        src={
          "https://upload.wikimedia.org/wikipedia/en/thumb/3/3b/SpongeBob_SquarePants_character.svg/1200px-SpongeBob_SquarePants_character.svg.png"
        }
        width={64}
        height={64}
        alt={"avatar"}
      ></img>
      <div className={styles.nicknameText}>
        <p className={styles.nickname}>Username</p>
        <p className={styles.textMessage}>
          Text text text text text even more text;Text text text text text even
          more text;Text text text text text even more text;
        </p>
      </div>
    </div>
  );
};

const SearchInput: React.FC = () => {
  return (
    <div className={styles.inputWrapper}>
      <input type={"text"} placeholder={"Search friends..."} />
      <IconSearch></IconSearch>
    </div>
  );
};

export default ChatSidebar;
