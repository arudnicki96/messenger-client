/* eslint-disable */

import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import SignUp from "./components/SignUp/SignUp";
import Login from "./components/SignUp/Login";
import Chat from "./components/Chat/Chat";
import { QueryClient, QueryClientProvider } from "react-query";
import { Provider, useSelector } from "react-redux";
import store from "./store";
import { persistStore } from "redux-persist";
import { PersistGate } from "redux-persist/integration/react";

function App() {
  const queryClient = new QueryClient();

  let persistor = persistStore(store);

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <QueryClientProvider client={queryClient}>
          <BrowserRouter>
            <Routes>
              <Route path={"/"} element={<Login />} />
              <Route path={"/register"} element={<SignUp />} />
              <Route path={"/messenger"} element={<Chat />} />
            </Routes>
          </BrowserRouter>
        </QueryClientProvider>
      </PersistGate>
    </Provider>
  );
}

export default App;
