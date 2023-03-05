import React, { useEffect, useMemo } from "react";
import styles from "./ChatBodyStyles.module.scss";
import clsx from "clsx";
import { useFetchDialogue } from "../../../api/useFetchDialogue";
import { useSelector } from "react-redux";
import { RootState } from "../../../store";

interface TextMessageInterface {
  createdBy: string;
  text: string;
}

const TextMessage: React.FC<TextMessageInterface> = ({ createdBy, text }) => {
  const selfId = useSelector((state: RootState) => state.auth.user._id);
  const receivedOrSentStyling =
    createdBy === selfId ? styles.sent : styles.received;
  return (
    <li className={clsx(styles.message, receivedOrSentStyling)}>{text}</li>
  );
};

const ChatBody: React.FC = (): any => {
  const dialogueId = useSelector(
    (state: RootState) => state.messenger.dialogId
  );
  const {
    data: dialogue = [],
    isSuccess,
    refetch: refetchDialogue,
    isLoading,
  } = useFetchDialogue();
  const fetchedMessages = dialogue.Messages;
  useEffect(() => {
    const fn = async () => await refetchDialogue();
    fn();
  }, [dialogueId, refetchDialogue]);

  const Body = useMemo(() => {
    return (
      <>
        {isLoading && <div>Loading...</div>}
        {isSuccess && (
          <main className={styles.wrapper}>
            <div className={styles.header}>{dialogueId}</div>
            <ul className={styles.messagesWrapper}>
              {fetchedMessages.map((item) => {
                const { text, createdBy } = item;
                return <TextMessage createdBy={createdBy} text={text} />;
              })}
            </ul>
          </main>
        )}
      </>
    );
  }, [fetchedMessages, isLoading, isSuccess]);
  return Body;
};
export default ChatBody;
