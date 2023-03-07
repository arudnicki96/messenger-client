import React, { useState } from "react";
import styles from "./ChatFooter.module.scss";
import SendMessageIcon from "../../../icons/SendMessageIcon";
import { useSelector } from "react-redux";
import { RootState } from "../../../store";
import { useCreateDialogue } from "../../../api/useCreateDialogue";
import { useCreateMessage } from "../../../api/useCreateMessage";

const ChatFooter: React.FC = (): JSX.Element => {
  const sender = useSelector((state: RootState) => state.auth.user._id);
  const receipent = useSelector(
    (state: RootState) => state.messenger.selectedUserId
  );
  const dialogId = useSelector((state: RootState) => state.messenger.dialogId);
  const [message, setMessage] = useState<string>("");

  const { mutate: createMessage } = useCreateMessage(sender, message);

  const { mutate: createDialogueMutation } = useCreateDialogue(
    sender,
    receipent,
    message
  );
  const handleSubmit = (e: any) => {
    e.preventDefault();
    if (!dialogId) {
      createDialogueMutation();
    } else {
      createMessage();
    }
    setMessage("");
  };
  return (
    <form className={styles.wrapper} onSubmit={handleSubmit}>
      <input
        className={styles.input}
        placeholder={"Type a message..."}
        onChange={(e) => setMessage(e.target.value)}
        value={message}
      />
      <button className={styles.iconWrapper} onClick={handleSubmit}>
        <p>Send a message...</p>
        <SendMessageIcon />
      </button>
    </form>
  );
};

export default ChatFooter;
