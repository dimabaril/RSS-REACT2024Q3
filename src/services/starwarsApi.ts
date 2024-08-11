import { API_URL } from "../constants";

export async function getCharacterDetailById(id: number | string) {
  const response = await fetch(`${API_URL.BASE_URL}${API_URL.PEOPLE}${id}/`);
  if (!response.ok) {
    throw new Error("Failed to fetch character details");
  }
  const data = await response.json();
  return data;
}

export async function getCharacters(searchParams?: string) {
  const url = searchParams
    ? `${API_URL.BASE_URL}${API_URL.PEOPLE}?${searchParams}`
    : API_URL.BASE_URL + API_URL.PEOPLE;
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error("Failed to fetch characters");
  }
  const data = await response.json();
  return data;
}
