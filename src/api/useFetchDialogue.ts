import axios from "axios";
import { useQuery } from "react-query";
import { useSelector } from "react-redux";
import { RootState } from "../store";

export const useFetchDialogue = () => {
  const token = useSelector((state: RootState) => state.auth.userToken);
  const dialogueId = useSelector(
    (state: RootState) => state.messenger.dialogId
  );
  const fetchDialogue = async () =>
    await axios
      .get(`/api/dialogs/${dialogueId}`, {
        headers: { authorization: `Bearer ${token}` },
      })
      .then((response) => response.data);
  return useQuery("dialogue", fetchDialogue);
};
