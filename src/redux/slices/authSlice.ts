import { createSlice } from '@reduxjs/toolkit'
import { registerUser } from './../actions/authActions'

const initialState = {
  loading: false,
  userInfo: null,
  user: null,
  error: null,
  success: false,
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
extraReducers: {},
})
export default authSlice.reducer