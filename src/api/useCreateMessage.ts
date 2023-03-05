import axios from "axios";
import { useMutation, useQueryClient } from "react-query";
import { useSelector } from "react-redux";
import { RootState } from "../store";

export const useCreateMessage = (createdBy, text) => {
  const queryClient = useQueryClient();

  const dialogId = useSelector((state: RootState) => state.messenger.dialogId);
  const token = useSelector((state: RootState) => state.auth.userToken);
  const createMessageMutation = () => {
    return axios.post(
      "/api/dialogs/messages",
      {
        dialogId: dialogId,
        createdBy: createdBy,
        text: text,
        createdAt: new Date().getTime(),
      },
      { headers: { authorization: `Bearer ${token}` } }
    );
  };
  return useMutation(createMessageMutation, {
    onSuccess: () => {
      queryClient.invalidateQueries("dialogue");
      queryClient.invalidateQueries("userDialogues");
    },
  });
};
