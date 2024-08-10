export enum URL {
  BASE_URL = "https://starwars-visualguide.com/",
  CHARACTERS = "assets/img/characters/",
  FILMS = "assets/img/films/",
  SPECIES = "assets/img/species/",
  STARSHIPS = "assets/img/starships/",
  VEHICLES = "assets/img/vehicles/",
  PLANETS = "assets/img/planets/",
}

export const getSWCharacterImageUrlById = (id: number | string) =>
  `${URL.BASE_URL}${URL.CHARACTERS}${id}.jpg`;
