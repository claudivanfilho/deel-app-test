import { createContext, FC, ReactNode, useEffect, useState } from "react";
import { fetchPokemons } from "../services/api.service";

type AutocompleteContextType = {
  options: string[];
  text: string;
  setText: (text: string) => void;
  loading: boolean;
  error: boolean;
  isOptionsListVisible: boolean;
  setIsInputFocused: (state: boolean) => void;
};

export const AutocompleteContext = createContext<AutocompleteContextType>(
  {} as AutocompleteContextType
);

export const AutocompleteProvider: FC<{ children: ReactNode }> = ({ children }) => {
  // To improve the perfomance we can use a debounce function and override the default setter of text,
  // but I am avoiding to use 3rd party libraries in this application test
  const [text, setText] = useState("");
  const [options, setOptions] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [isInputFocused, setIsInputFocused] = useState(false);

  const isOptionsListVisible = !loading && isInputFocused && text.length > 0 && options.length > 0;

  useEffect(() => {
    const abortCtrl = new AbortController();
    if (isInputFocused) {
      setLoading(true);
      fetchPokemons(text, abortCtrl.signal)
        .then((result) => {
          setOptions(result!.map((poke) => poke.name));
          error && setError(false);
        })
        .catch(() => {
          setOptions([]);
          setError(true);
        })
        .finally(() => setLoading(false));
    }

    return () => {
      abortCtrl.abort();
    };
  }, [text, isInputFocused]);

  return (
    <AutocompleteContext.Provider
      value={{
        text,
        setText,
        options,
        loading,
        isOptionsListVisible,
        setIsInputFocused,
        error,
      }}
    >
      {children}
    </AutocompleteContext.Provider>
  );
};
