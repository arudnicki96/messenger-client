import axios from "axios";
import { useQuery } from "react-query";
import { useSelector } from "react-redux";
import { RootState } from "../store";
import { User } from "../types/user";
import { Message, Dialog } from "../types/messenger";

type UserDialogues = {
  dialogues: {
    user: Partial<User>;
    lastMessage: Message;
    dialog: Partial<Dialog>;
  }[];
};

export const useUserDialogues = () => {
  const selfId: string = useSelector((state: RootState) => state.auth.user._id);
  const fetchDialogues = async () => {
    const data: UserDialogues = await axios
      .get(`api/dialogs/getUserDialogs/${selfId}`)
      .then((response) => response.data);
    return data;
  };
  return useQuery("userDialogues", fetchDialogues);
};
