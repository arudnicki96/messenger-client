import axios from "axios";
import { useMutation } from "react-query";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../store";
import { setGlobalConversationId } from "../redux/slices/messengerSlice";
import { useQueryClient } from "react-query";

export const useCreateDialogue = (user_1, user_2, text) => {
  const queryClient = useQueryClient();
  const dispatch = useDispatch();
  const token = useSelector((state: RootState) => state.auth.userToken);

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
        .then((response) => {
          dispatch(setGlobalConversationId(response.data.dialogue));
        }),
    {
      onSuccess: () => {
        queryClient.invalidateQueries("dialogue");
        queryClient.invalidateQueries("userDialogues");
      },
    }
  );
};
