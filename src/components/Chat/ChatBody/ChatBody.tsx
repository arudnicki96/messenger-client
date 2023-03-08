import React, { useEffect, useMemo } from "react";
import styles from "./ChatBodyStyles.module.scss";
import clsx from "clsx";
import { useFetchDialogue } from "../../../api/useFetchDialogue";
import { useSelector } from "react-redux";
import { RootState } from "../../../store";
import { Message } from "../../../types/messenger";
import { TextMessageType } from "../../../types/textMessage";
import axios, { AxiosError } from "axios";
import Swal from "sweetalert2";

const TextMessage: React.FC<TextMessageType> = ({ createdBy, text }) => {
  const selfId: string =
    useSelector((state: RootState) => state.auth.user._id) || "";
  const receivedOrSentStyling =
    createdBy === selfId ? styles.sent : styles.received;
  return (
    <li className={clsx(styles.message, receivedOrSentStyling)}>{text}</li>
  );
};

const ChatBody: React.FC = (): JSX.Element => {
  const dialogueId: string | null = useSelector(
    (state: RootState) => state.messenger.dialogId
  );
  const {
    data: dialogues,
    isSuccess,
    refetch: refetchDialogue,
    isLoading,
    error,
  } = useFetchDialogue();

  const fetchedMessages: Message[] = dialogues?.messages;
  useEffect(() => {
    const fn = async () => await refetchDialogue();
    fn();
  }, [dialogueId, refetchDialogue]);

  const fireErrorAlert = (error: AxiosError) => Swal.fire(error.message);
  if (axios.isAxiosError(error)) fireErrorAlert(error);

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
  }, [fetchedMessages, isLoading, isSuccess, dialogueId]);
  return Body;
};
export default ChatBody;
