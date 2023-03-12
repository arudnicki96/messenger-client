import React from "react";
import styles from "./ChatLayout.module.scss";
import ChatBody from "./ChatBody/ChatBody";
import ChatFooter from "./ChatFooter/ChatFooter";
import ChatSidebar from "./ChatSidebar/ChatSidebar";
import ChatHeader from "./ChatHeader/ChatHeader";
import socket from "../../socket/socket";
import { useDispatch } from "react-redux";
import {
  setActiveUsers,
  addActiveUsers,
  removeInactiveUser,
} from "../../redux/slices/websocketSlice";
import { useQueryClient } from "react-query";

const Chat = () => {
  const dispatch = useDispatch();
  const queryClient = useQueryClient();
  const gridAreas = false
    ? `
  'header header header'
  'nav main aside'
  'nav footer aside'
  `
    : `
    'header header header'
    'nav main main' 
    'nav footer footer'`;

  socket.on("users", (users) => {
    dispatch(setActiveUsers(users));
  });
  socket.on("user connected", (user) => {
    dispatch(addActiveUsers(user));
  });

  socket.on("private message", ({ content, from }) => {
    queryClient.invalidateQueries("userDialogues");
    queryClient.invalidateQueries("dialogue");
  });
  socket.on("user disconnected", (event) => {
    dispatch(removeInactiveUser(event));
  });
  return (
    <div
      className={styles.wrapper}
      style={{
        gridTemplateAreas: gridAreas,
      }}
    >
      <header className={styles.header}>
        <ChatHeader />
      </header>
      <aside className={styles.aside}></aside>
      <main className={styles.main}>
        <ChatBody></ChatBody>
      </main>
      <nav className={styles.nav}>
        <ChatSidebar />
      </nav>
      <footer className={styles.footer}>
        <ChatFooter></ChatFooter>
      </footer>
    </div>
  );
};

export default Chat;
