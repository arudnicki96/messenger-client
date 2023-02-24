import React, { useState } from "react";
import styles from "./ChatLayout.module.scss";
import ChatBody from "./ChatBody/ChatBody";
import ChatFooter from "./ChatFooter/ChatFooter";
import ChatSidebar from "./ChatSidebar/ChatSidebar";
import ChatHeader from "./ChatHeader/ChatHeader";
import { useSelector } from "react-redux";

const Chat = () => {
  const [isAsideShown, setIsAsideShown] = useState(false);
  const gridAreas = isAsideShown
    ? `
  'header header header'
  'nav main aside'
  'nav footer aside'
  `
    : `
    'header header header'
    'nav main main' 
    'nav footer footer'`;

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
