import axios from "axios";
import { useQuery } from "react-query";
import { useSelector } from "react-redux";
import { RootState } from "../store";

export const useUserDialogues = () => {
  const selfId = useSelector((state: RootState) => state.auth.user._id);
  const fetchDialogues = async () => {
    const data = await axios
      .get(`api/dialogs/getUserDialogs/${selfId}`)
      .then((response) => response.data);
    return data;
  };
  return useQuery("userDialogues", fetchDialogues);
};
