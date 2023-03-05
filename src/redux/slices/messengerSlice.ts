import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  selectedUserId: null,
  isGroupConversation: false,
  dialogId: null,
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
  },
  extraReducers: {},
});

export const {
  setGlobalSelectedUserId,
  setGlobalConversationId,
  clearMessengerState,
} = messengerSlice.actions;

export default messengerSlice.reducer;
