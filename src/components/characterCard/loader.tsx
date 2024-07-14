import { LoaderFunctionArgs } from "react-router-dom";

import { Character } from "../../interfaces/interfaces";
import { fetchSWPerson } from "../../services/api";

export async function loader({
  params,
}: LoaderFunctionArgs): Promise<{ character: Character; id: string }> {
  console.log("CharacterCard loader", params);
  const { id } = params;
  if (!id) {
    throw new Error("URL parameter is missing");
  }
  const character = await fetchSWPerson(id);
  if (!character) {
    throw new Response("", {
      status: 404,
      statusText: "Not Found",
    });
  }
  return { character, id };
}
