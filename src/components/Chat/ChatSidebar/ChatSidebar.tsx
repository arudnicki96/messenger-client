import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import styles from "./ChatSidebar.module.scss";
import IconSearch from "../../../icons/IconSearch";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../../store";
import { onConversationSelect } from "../../../redux/slices/messengerSlice";
type SearchInputProps = {
  searchQuery: string;
  setSearchQuery: Dispatch<SetStateAction<string>>;
};

type UserWithoutConversationProps = {
  username: string;
  onPress: () => void;
};

const ChatSidebar: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [users, setUsers] = useState([]);

  const dispatch = useDispatch();
  const handleItemPress = (user) => dispatch(onConversationSelect(user));

  const token = useSelector((state: RootState) => state.auth.userToken);

  useEffect(() => {
    if (searchQuery === "") {
      setUsers([]);
    } else {
      const timer = setTimeout(
        async () =>
          await axios
            .get(`/api/users/${searchQuery}`, {
              headers: { authorization: `Bearer ${token}` },
            })
            .then((response) => setUsers(response.data.users)),
        300
      );
      return () => clearTimeout(timer);
    }
  }, [searchQuery]);

  return (
    <div className={styles.wrapper}>
      <SearchInput searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
      {users.map((user) => (
        <ConversationItem
          username={user.username}
          onPress={() => handleItemPress(user)}
        />
      ))}
    </div>
  );
};

const ConversationItem: React.FC<UserWithoutConversationProps> = ({
  username,
  onPress,
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
        <p className={styles.textMessage}>
          Text text text text text even more text;Text text text text text even
          more text;Text text text text text even more text;
        </p>
      </div>
    </div>
  );
};

const SearchInput: React.FC<SearchInputProps> = (props: SearchInputProps) => {
  const { searchQuery, setSearchQuery } = props;
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
