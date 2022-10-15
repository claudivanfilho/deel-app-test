import { useContext } from "react";

import { AutocompleteContext } from "../context/AutocompleteContext";

export default function useAutocomplete() {
  return useContext(AutocompleteContext);
}
