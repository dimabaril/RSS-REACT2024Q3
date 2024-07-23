import { LoaderFunctionArgs } from "react-router-dom";

import { fetchSwCharacters } from "../../services/api";

export async function rootLoader({ request }: LoaderFunctionArgs) {
  const url = new URL(request.url);

  // console.log("url", url);

  const search =
    url.searchParams.get("search") ||
    localStorage.getItem("searchText") ||
    null;

  const page = url.searchParams.get("page") || null;

  const response = await fetchSwCharacters(search, page);
  return { response, search };
}
