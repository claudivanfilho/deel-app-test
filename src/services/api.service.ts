import { API_URL } from "../config/constants";
import { GenerationResponse, Resource } from "../types";

export async function fetchPokemons(
  nameToSearch: string,
  signal: AbortSignal
): Promise<Resource[]> {
  // This call can be improved of course fetching only once in the beginnig,
  // but to simulate a real autocomplete flow I am always fetching data when typed a new character.
  return fetch(`${API_URL}/generation/1`, { signal })
    .then((res) => res.json())
    .then((data: GenerationResponse) =>
      data.pokemon_species.filter(({ name }) => new RegExp(nameToSearch, "ig").test(name))
    );
}
