import axios from "axios";
import { useQuery, UseQueryResult } from "react-query";
import { useSelector } from "react-redux";
import { RootState } from "../store";
import { DialogMessages } from "../types/messenger";

export const useFetchDialogue = (): UseQueryResult<DialogMessages, unknown> => {
  const token: string =
    useSelector((state: RootState) => state.auth.userToken) || "";
  const dialogueId: string = useSelector(
    (state: RootState) => state.messenger.dialogId
  );
  const fetchDialogue = async () => {
    const data = await axios
      .get<DialogMessages>(`/api/dialogs/${dialogueId}`, {
        headers: { authorization: `Bearer ${token}` },
      })
      .then((response) => response.data);
    return data;
  };
  return useQuery("dialogue", fetchDialogue);
};
