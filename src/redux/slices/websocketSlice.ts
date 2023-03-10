import { createSlice } from "@reduxjs/toolkit";
import { WebsocketInitialState } from "../../types/websocketInitialState";

const initialState: WebsocketInitialState = {
  activeUsers: [],
};

const websocketSlice = createSlice({
  name: "websocket",
  initialState,
  reducers: {
    setActiveUsers: (state, { payload }) => {
      state.activeUsers = [...payload];
    },
    addActiveUsers: (state, { payload }) => {
      state.activeUsers = state.activeUsers.filter(
        (user) => user.userId !== payload.userId
      );
      state.activeUsers = [...state.activeUsers, payload];
    },
    removeInactiveUser: (state, { payload }) => {
      state.activeUsers = [
        ...state.activeUsers.filter(
          (socket) => socket.socketId !== payload.socketId
        ),
      ];
    },
  },
});

export const { setActiveUsers, addActiveUsers, removeInactiveUser } =
  websocketSlice.actions;

export default websocketSlice.reducer;
