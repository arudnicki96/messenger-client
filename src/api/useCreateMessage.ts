import axios from "axios";
import { useMutation, useQueryClient, UseMutationResult } from "react-query";
import { useSelector } from "react-redux";
import { RootState } from "../store";
import Swal from "sweetalert2";
import { AxiosError } from "axios";
import { CreateMessageResponse } from "../types/createMessageResponse";
import socket from "../socket/socket";

export const useCreateMessage = (createdBy, text): UseMutationResult => {
  const queryClient = useQueryClient();
  const dialogId = useSelector((state: RootState) => state.messenger.dialogId);
  const token = useSelector((state: RootState) => state.auth.userToken);
  const activeUsers = useSelector(
    (state: RootState) => state.messenger.activeUsers
  );

  return useMutation(
    () =>
      axios.post<CreateMessageResponse>(
        "/api/dialogs/messages",
        {
          dialogId: dialogId,
          createdBy: createdBy,
          text: text,
          createdAt: new Date().getTime(),
        },
        { headers: { authorization: `Bearer ${token}` } }
      ),
    {
      onSuccess: (response) => {
        const socketId = activeUsers.find(
          (user) => user.userId === response.data.receipent
        )?.socketId;

        if (socketId) {
          socket.emit("private message", {
            content: response.data.message,
            to: socketId,
          });
        }

        queryClient.invalidateQueries("dialogue");
        queryClient.invalidateQueries("userDialogues");
      },
      onError: (error: AxiosError) => {
        Swal.fire(error.message);
      },
    }
  );
};
