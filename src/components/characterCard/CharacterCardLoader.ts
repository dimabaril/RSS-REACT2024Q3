import { LoaderFunctionArgs } from "react-router-dom";

import { CharacterDetailResponse } from "../../interfaces/interfaces";
import { fetchSWPerson } from "../../services/api";

export async function characterCardLoader({
  params,
}: LoaderFunctionArgs): Promise<{
  character: CharacterDetailResponse;
  id: string;
}> {
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
