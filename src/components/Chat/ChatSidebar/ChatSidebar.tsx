import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
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

type SearchInputProps = {
  searchQuery: string;
  setSearchQuery: Dispatch<SetStateAction<string>>;
};

type ConversationItem = {
  username: string;
  onPress: () => void;
  message: string;
};

const ChatSidebar: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [users, setUsers] = useState([]);
  const { data: userDialogues, isSuccess: isSuccessUserDialogs } =
    useUserDialogues();

  const dispatch = useDispatch();
  const handleItemPress = (user) => {
    dispatch(setGlobalSelectedUserId(user));
    dispatch(setGlobalConversationId({ _id: null }));
  };

  const token = useSelector((state: RootState) => state.auth.userToken);
  useEffect(() => {
    {
      const currentUsersIds =
        isSuccessUserDialogs &&
        userDialogues?.userCurrentConversationItemsData.map(
          (item) => item.user._id
        );
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
    }
  }, [
    searchQuery,
    token,
    isSuccessUserDialogs,
    userDialogues?.userCurrentConversationItemsData,
  ]);

  return (
    <div className={styles.wrapper}>
      <SearchInput searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
      {isSuccessUserDialogs && searchQuery === ""
        ? userDialogues.userCurrentConversationItemsData.map((item) => (
            <ConversationItem
              username={item.user?.username}
              message={item.lastMessage.text}
              onPress={() => {
                dispatch(setGlobalSelectedUserId(item.user));
                dispatch(setGlobalConversationId(item.dialog));
              }}
            />
          ))
        : null}
      {users.map((user) => (
        <ConversationItem
          username={user.username}
          onPress={() => handleItemPress(user)}
          message={"Lets start chatting!"}
        />
      ))}
    </div>
  );
};

const ConversationItem: React.FC<ConversationItem> = ({
  username,
  onPress,
  message,
}) => {
  return (
    <div className={styles.conversationItemWrapper} onClick={onPress}>
      <img
        src={
          "https://upload.wikimedia.org/wikipedia/en/thumb/3/3b/SpongeBob_SquarePants_character.svg/1200px-SpongeBob_SquarePants_character.svg.png"
        }
        width={64}
        height={64}
        alt={"avatar"}
      ></img>
      <div className={styles.nicknameText}>
        <p className={styles.nickname}>{username}</p>
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
