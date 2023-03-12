import { Dispatch, SetStateAction } from "react";

export type SearchInputProps = {
  searchQuery: string;
  setSearchQuery: Dispatch<SetStateAction<string>>;
};
