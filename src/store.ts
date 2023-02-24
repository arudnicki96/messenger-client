import AuthReducer from "./redux/slices/authSlice";
import { configureStore, ThunkAction } from "@reduxjs/toolkit";
import { AnyAction } from "@reduxjs/toolkit";

const store = configureStore({
  reducer: {
    auth: AuthReducer,
  },
});


export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  AnyAction
>;

export default store;
