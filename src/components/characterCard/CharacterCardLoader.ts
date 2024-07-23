import { LoaderFunctionArgs } from "react-router-dom";

import { CharacterDetails } from "../../interfaces/interfaces";
import { fetchSwCharacterDetails } from "../../services/api";

export async function characterCardLoader({
  params,
}: LoaderFunctionArgs): Promise<{
  character: CharacterDetails;
  id: string;
}> {
  const { id } = params;
  if (!id) {
    throw new Error("URL parameter is missing");
  }
  const character = await fetchSwCharacterDetails(id);
  if (!character) {
    throw new Response("", {
      status: 404,
      statusText: "Not Found",
    });
  }
  return { character, id };
}
