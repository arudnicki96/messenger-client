import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const registerUser = createAsyncThunk(
  "auth/register",
  async (
    { username, email, password, passwordConfirm },
    { rejectWithValue }
  ) => {
    try {
      // await axios.post(`/api/user/signup`, {
      //   username,
      //   email,
      //   password,
      //   passwordConfirm,
      // });
    } catch (error) {
      // return custom error message from backend if present
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);
