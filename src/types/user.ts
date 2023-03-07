import React from "react";
import { Dialog } from "./messenger";

export type User = {
  username: string;
  _id: string;
  email: string;
  dialogs: { dialogId: Partial<Dialog>; userId: string }[];
};
