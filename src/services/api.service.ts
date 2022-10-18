import { API_URL } from "../config/constants";
import { GenerationResponse, Resource } from "../types";

export async function fetchPokemons(signal: AbortSignal): Promise<Resource[]> {
  return fetch(`${API_URL}/generation/1`, { signal })
    .then((res) => res.json())
    .then((data: GenerationResponse) => data.pokemon_species);
}
