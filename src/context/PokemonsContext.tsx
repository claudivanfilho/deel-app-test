import { createContext, FC, ReactNode, useEffect, useState } from "react";
import { fetchPokemons } from "../services/api.service";

type PokemonsContextType = {
  pokemons: string[];
  hasError: boolean;
};

export const PokemonsContext = createContext<PokemonsContextType>({
  pokemons: [],
  hasError: false,
});

export const PokemonsProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [pokemons, setPokemons] = useState<string[]>([]);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    const abortCtrl = new AbortController();
    fetchPokemons(abortCtrl.signal)
      .then((result) => {
        setPokemons(result!.map((poke) => poke.name));
        hasError && setHasError(false);
      })
      .catch(() => {
        setPokemons([]);
        setHasError(true);
      });

    return () => {
      abortCtrl.abort();
    };
    // eslint-disable-next-line
  }, []);

  return (
    <PokemonsContext.Provider
      value={{
        pokemons,
        hasError,
      }}
    >
      {children}
    </PokemonsContext.Provider>
  );
};
