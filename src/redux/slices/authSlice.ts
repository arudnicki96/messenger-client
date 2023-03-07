import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  userToken: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    onLoginSuccess: (state, { payload }) => {
      state.userToken = payload.token;
      state.user = payload.user;
    },
    onLogout: (state, { payload }) => {
      state.userToken = payload.token;
      state.user = payload.user;
    },
  },
  extraReducers: {},
});
export const { onLoginSuccess, onLogout } = authSlice.actions;

export default authSlice.reducer;
