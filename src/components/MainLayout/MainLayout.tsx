import React from 'react';
import styles from './MainLayoutStyles.module.scss';
import ChatBody from '../Chat/ChatBody/ChatBody';
import ChatFooter from '../Chat/ChatFooter/ChatFooter';
import ChatSidebar from '../Chat/ChatSidebar/ChatSidebar';
import ChatHeader from '../Chat/ChatHeader/ChatHeader';

const MainLayout = () => {

    return (
        <div className={styles.wrapper}>
            <header className={styles.header}>
                <ChatHeader />
            </header>
            <aside className={styles.aside}>
            </aside>
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
    )
}

export default MainLayout;