enum URL {
  BASE_URL = "https://starwars-visualguide.com/assets/img/",
  CHARACTERS = "characters/",
  FILMS = "films/",
  SPECIES = "species/",
  STARSHIPS = "starships/",
  VEHICLES = "vehicles/",
  PLANETS = "planets/",
}

export const getSWCharacterImageUrlById = (id: number | string) =>
  `${URL.BASE_URL}${URL.CHARACTERS}${id}.jpg`;
