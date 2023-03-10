import { createSlice } from "@reduxjs/toolkit";
import { ActiveUsers } from "../../types/activeUsers";

type InitialMessengerState = {
  selectedUserId: null | string;
  isGroupConversation: boolean;
  dialogId: string | null;
  activeUsers: ActiveUsers[];
};

const initialState: InitialMessengerState = {
  selectedUserId: null,
  isGroupConversation: false,
  dialogId: null,
  activeUsers: [],
};

const messengerSlice = createSlice({
  name: "messenger",
  initialState,
  reducers: {
    setGlobalSelectedUserId: (state, { payload }) => {
      state.selectedUserId = payload._id;
    },

    setGlobalConversationId: (state, { payload }) => {
      state.dialogId = payload._id;
    },

    clearMessengerState: (state) => {
      state.selectedUserId = null;
      state.isGroupConversation = null;
      state.dialogId = null;
    },
    setActiveUsers: (state, { payload }) => {
      state.activeUsers = [...payload];
    },
    addActiveUsers: (state, { payload }) => {
      state.activeUsers = state.activeUsers.filter(
        (user) => user.userId !== payload.userId
      );
      state.activeUsers = [...state.activeUsers, payload];
    },
  },
  extraReducers: {},
});

export const {
  setGlobalSelectedUserId,
  setGlobalConversationId,
  clearMessengerState,
  setActiveUsers,
  addActiveUsers,
} = messengerSlice.actions;

export default messengerSlice.reducer;
