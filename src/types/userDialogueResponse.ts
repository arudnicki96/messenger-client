import { Dialog, Message } from "./messenger";
import { User } from "./user";

export type UserDialoguesResponse = {
  dialogues: {
    user: Partial<User>;
    lastMessage: Message;
    dialog: Partial<Dialog>;
  }[];
};
