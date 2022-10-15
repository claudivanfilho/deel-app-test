export type GenerationResponse = {
  id: number;
  name: string;
  names: Array<{ language: Resource; name: string }>;
  main_region: Resource;
  pokemon_species: Resource[];
};

export type Resource = {
  name: string;
  url: string;
};
