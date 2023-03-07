import React from "react";

export type Message = {
  createdAt: number;
  createdBy: string;
  text: string;
  dialogId: string;
  _id: string;
};

export type Dialog = {
  _id: string;
  user_1: string;
  user_2: string;
};
