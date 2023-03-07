import axios from "axios";
import { useQuery } from "react-query";
import { useSelector } from "react-redux";
import { RootState } from "../store";
import { Message } from "../types/messenger";

export type DialogMessages = { messages: Message[] };

export const useFetchDialogue = () => {
  const token: string =
    useSelector((state: RootState) => state.auth.userToken) || "";
  const dialogueId: string = useSelector(
    (state: RootState) => state.messenger.dialogId
  );
  const fetchDialogue = async () => {
    const data: DialogMessages = await axios
      .get(`/api/dialogs/${dialogueId}`, {
        headers: { authorization: `Bearer ${token}` },
      })
      .then((response) => response.data);
    return data;
  };
  return useQuery("dialogue", fetchDialogue);
};
