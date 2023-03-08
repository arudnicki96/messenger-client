import axios from "axios";
import { useQuery, UseQueryResult } from "react-query";
import { useSelector } from "react-redux";
import { RootState } from "../store";
import { UserDialoguesResponse } from "../types/userDialogueResponse";

export const useUserDialogues = (): UseQueryResult<
  UserDialoguesResponse,
  unknown
> => {
  const selfId: string = useSelector((state: RootState) => state.auth.user._id);
  const fetchDialogues = async () => {
    const data = await axios
      .get<UserDialoguesResponse>(`api/dialogs/getUserDialogs/${selfId}`)
      .then((response) => response.data);
    return data;
  };
  return useQuery("userDialogues", fetchDialogues);
};
