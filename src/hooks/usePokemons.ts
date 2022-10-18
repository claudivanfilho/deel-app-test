import { useContext } from "react";

import { PokemonsContext } from "../context/PokemonsContext";

export default function usePokemons() {
  return useContext(PokemonsContext);
}
