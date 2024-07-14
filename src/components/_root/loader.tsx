import { LoaderFunctionArgs } from "react-router-dom";

import { fetchSWPeople } from "../../services/api";

export async function loader({ request }: LoaderFunctionArgs) {
  console.log("Root loader", request);
  const url = new URL(request.url);
  const q =
    url.searchParams.get("q") || localStorage.getItem("searchText") || null;
  const page =
    url.searchParams.get("page") || localStorage.getItem("page") || null;
  const response = await fetchSWPeople(q, page);
  return { response, q };
}