import { Character, CharactersResponse } from "../interfaces/interfaces";

export const fetchSWPeople = async (
  term: string | null = null,
  page: string | null = null,
): Promise<CharactersResponse> => {
  const endpoint = "https://swapi.dev/api/people/";

  const currentUrl = new URL(endpoint);
  if (term) {
    currentUrl.searchParams.set("search", term);
  }
  if (page) {
    currentUrl.searchParams.set("page", page);
  }

  const response = await fetch(currentUrl);
  if (!response.ok) {
    throw new Error(`Network response wasn't ok: ${response.status}`);
  }
  const data = await response.json();
  return data;
};

export const fetchSWPerson = async (id: string): Promise<Character> => {
  const endpoint = "https://swapi.dev/api/people/";

  const response = await fetch(endpoint + id);
  if (!response.ok) {
    throw new Error(`Network response wasn't ok: ${response.status}`);
  }
  const data = await response.json();
  return data;
};
