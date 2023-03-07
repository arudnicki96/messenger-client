import React from "react";
import { User } from "./user";

export type LoginSuccessResponse = {
  status: string;
  user: User;
  token: string;
};
