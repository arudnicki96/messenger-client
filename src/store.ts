import AuthReducer from "./redux/slices/authSlice";
import MessengerReducer from "./redux/slices/messengerSlice";
import { combineReducers, configureStore, ThunkAction } from "@reduxjs/toolkit";
import { AnyAction } from "@reduxjs/toolkit";
import { persistReducer } from "redux-persist";
import thunk from "redux-thunk";
import { persistStore } from "redux-persist";
import sessionStorage from "redux-persist/es/storage/session";

const persistConfig = {
  timeout: 2000,
  key: "root",
  storage: sessionStorage,
};

const rootReducer = combineReducers({
  auth: AuthReducer,
  messenger: MessengerReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: [thunk],
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  AnyAction
>;

export default store;
