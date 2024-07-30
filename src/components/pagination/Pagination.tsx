import { useState } from "react";
import { useSearchParams } from "react-router-dom";

import { CharactersResponse } from "../../interfaces/interfaces";
import "./Pagination.scss";

interface ContentProps {
  response: CharactersResponse;
}
export default function Pagination(props: ContentProps) {
  const [response] = useState<CharactersResponse>(props.response);
  const [, setSearchParams] = useSearchParams();
  const { previous, next } = response;
  const prevPage = previous ? new URL(previous).searchParams.get("page") : null;
  const nextPage = next ? new URL(next).searchParams.get("page") : null;

  const handlerPage = (page: string | null) => () => {
    if (!page) return;
    setSearchParams((currentParams) => {
      const newParams = new URLSearchParams(currentParams);
      newParams.set("page", page);
      return newParams;
    });
  };

  return (
    <nav className="pagination">
      <button onClick={handlerPage(prevPage)} disabled={!prevPage}>
        Prev
      </button>
      <div>Page: {Number(prevPage) + 1}</div>
      <button onClick={handlerPage(nextPage)} disabled={!nextPage}>
        Next
      </button>
    </nav>
  );
}
