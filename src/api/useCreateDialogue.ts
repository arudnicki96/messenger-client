import axios, { AxiosResponse } from "axios";
import { useMutation } from "react-query";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../store";
import { setGlobalConversationId } from "../redux/slices/messengerSlice";
import { useQueryClient } from "react-query";
import { Dialog } from "../types/messenger";
import { User } from "../types/user";

// We use just ID's from User's Object
export const useCreateDialogue = (
  user_1: Partial<User>,
  user_2: Partial<User>,
  text: string
) => {
  const queryClient = useQueryClient();
  const dispatch = useDispatch();
  const token: string =
    useSelector((state: RootState) => state.auth.userToken) || "";

  return useMutation(
    async () =>
      await axios
        .post(
          "/api/dialogs",
          {
            user_1,
            user_2,
            text,
          },
          { headers: { authorization: `Bearer ${token}` } }
        )
        .then((response: AxiosResponse) => {
          const dialogue: Dialog = response.data.dialogue;
          dispatch(setGlobalConversationId(dialogue));
        }),
    {
      onSuccess: () => {
        queryClient.invalidateQueries("dialogue");
        queryClient.invalidateQueries("userDialogues");
      },
    }
  );
};
