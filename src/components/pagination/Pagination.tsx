import { useSearchParams } from "react-router-dom";

import { Characters } from "../../interfaces/interfaces";
import "./Pagination.scss";

interface ContentProps {
  response: Characters;
}
export default function Pagination(props: ContentProps) {
  const [, setSearchParams] = useSearchParams();
  const prevPage = props.response.previous
    ? new URL(props.response.previous).searchParams.get("page")
    : null;
  const nextPage = props.response.next
    ? new URL(props.response.next).searchParams.get("page")
    : null;

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
