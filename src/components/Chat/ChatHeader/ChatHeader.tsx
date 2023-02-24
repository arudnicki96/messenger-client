import React from 'react';
import styles from './ChatHeader.module.scss';
import IconSearch from '../../../icons/IconSearch'

const ChatHeader: React.FC = () => {
    return <div className={styles.wrapper}>
        <div></div>
        <div className={styles.inputWrapper}><input className={styles.input} placeholder={'Search for messages...'}></input>
        <IconSearch />
        </div>
        <div></div>
    </div>
} 

export default ChatHeader