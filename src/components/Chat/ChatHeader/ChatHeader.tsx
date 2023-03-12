import React from "react";
import styles from "./ChatHeader.module.scss";
import IconSearch from "../../../icons/IconSearch";
import { useSelector } from "react-redux";
import { RootState } from "../../../store";
import { onLogout } from "../../../redux/slices/authSlice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { clearMessengerState } from "../../../redux/slices/messengerSlice";
import socket from "../../../socket/socket";
import LogoutIcon from "../../../icons/LogoutIcon";

const ChatHeader: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const username = useSelector((state: RootState) => state.auth.user.username);

  return (
    <div className={styles.wrapper}>
      <div></div>
      <div className={styles.inputWrapper}>
        <input
          className={styles.input}
          placeholder={"Search for messages..."}
        ></input>
        <IconSearch />
      </div>
      <div className={styles.logoutContainer}>
        {username}
        <div
          onClick={() => {
            window.localStorage.removeItem("username");
            window.localStorage.removeItem("id");
            dispatch(onLogout({ user: null, userToken: null }));
            socket.disconnect();
            dispatch(clearMessengerState());
            navigate("/");
          }}
        >
          <LogoutIcon />
        </div>
      </div>
    </div>
  );
};

export default ChatHeader;
