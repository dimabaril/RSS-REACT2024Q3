import { URL } from "url";

export interface Character {
  birth_year: string;
  created: string;
  edited: string;
  eye_color: string;
  films: URL[];
  gender: string;
  hair_color: string;
  height: string;
  homeworld: string;
  mass: string;
  name: string;
  skin_color: string;
  species: URL[];
  starships: URL[];
  url: string;
  vehicles: URL[];
}

export interface CharactersResponse {
  count: number;
  next: URL | null;
  previous: URL | null;
  results: Character[];
}
