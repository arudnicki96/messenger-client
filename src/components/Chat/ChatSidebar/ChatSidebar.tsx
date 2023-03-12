import React, { useEffect, useState } from "react";
import styles from "./ChatSidebar.module.scss";
import IconSearch from "../../../icons/IconSearch";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../../store";
import {
  setGlobalConversationId,
  setGlobalSelectedUserId,
} from "../../../redux/slices/messengerSlice";
import { useUserDialogues } from "../../../api/useUserDialogues";
import { User } from "../../../types/user";
import Swal from "sweetalert2";
import { AxiosError } from "axios";
import { ConversationItemProps } from "../../../types/conversationItem";
import { SearchInputProps } from "../../../types/searchInput";
import GreenActiveCircle from "../../../icons/GreenActiveCircle";

const ChatSidebar: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [users, setUsers] = useState<User[]>([]);
  const {
    data: userDialogues,
    isSuccess: isSuccessUserDialogs,
    error,
  } = useUserDialogues();

  const dispatch = useDispatch();
  const handleItemPress = (user: User) => {
    dispatch(setGlobalSelectedUserId(user));
    dispatch(setGlobalConversationId({ _id: null }));
  };

  const fireErrorAlert = (error: AxiosError) => Swal.fire(error.message);
  if (axios.isAxiosError(error)) fireErrorAlert(error);

  const token = useSelector((state: RootState) => state.auth.userToken);

  const activeUsers = useSelector(
    (state: RootState) => state.websocket.activeUsers
  ).map((user) => user.userId);
  useEffect(() => {
    if (searchQuery === "") return;
    const currentUsersIds =
      isSuccessUserDialogs &&
      userDialogues.dialogues.map((item) => item.user._id);
    const timer = setTimeout(
      async () =>
        await axios
          .get(`/api/users/${searchQuery}`, {
            headers: { authorization: `Bearer ${token}` },
          })
          .then((response) =>
            setUsers(
              response.data.users.filter(
                (user) => !currentUsersIds.includes(user._id)
              )
            )
          ),
      300
    );
    return () => clearTimeout(timer);
  }, [searchQuery, token, isSuccessUserDialogs, userDialogues?.dialogues]);

  return (
    <div className={styles.wrapper}>
      <SearchInput searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
      {isSuccessUserDialogs && searchQuery === ""
        ? userDialogues?.dialogues.sort().map((item) => (
            <ConversationItem
              key={item.lastMessage._id}
              date={item.lastMessage.createdAt}
              username={item.user?.username}
              message={item.lastMessage.text}
              onPress={() => {
                dispatch(setGlobalSelectedUserId(item.user));
                dispatch(setGlobalConversationId(item.dialog));
              }}
              isActive={activeUsers.includes(item.user._id)}
            />
          ))
        : null}
      {users.map((user) => (
        <ConversationItem
          date={new Date().getTime()}
          username={user.username}
          onPress={() => handleItemPress(user)}
          message={"Lets start chatting!"}
          isActive={activeUsers.includes(user._id)}
        />
      ))}
    </div>
  );
};

const ConversationItem: React.FC<ConversationItemProps> = ({
  username,
  onPress,
  message,
  date,
  isActive,
}) => {
  const hour = new Date(date).getHours();
  const minutes = new Date(date).getMinutes();
  return (
    <div className={styles.conversationItemWrapper} onClick={onPress}>
      <div className={styles.photoWrapper}>
        <img
          src={require("../../../userPhoto.png")}
          width={64}
          height={48}
          alt={"avatar"}
        ></img>
        {isActive && <GreenActiveCircle />}
      </div>
      <div className={styles.nicknameText}>
        <div className={styles.usernameContainer}>
          <p>{username}</p>
          <p>
            {hour}:{minutes}
          </p>
        </div>
        <p className={styles.textMessage}>{message}</p>
      </div>
    </div>
  );
};

const SearchInput: React.FC<SearchInputProps> = ({
  searchQuery,
  setSearchQuery,
}) => {
  return (
    <div className={styles.inputWrapper}>
      <input
        type={"text"}
        placeholder={"Search friends..."}
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
      <IconSearch></IconSearch>
    </div>
  );
};

export default ChatSidebar;
