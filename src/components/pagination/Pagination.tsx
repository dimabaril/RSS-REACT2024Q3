import { useRouter } from "next/router";

import { Characters } from "../../interfaces/interfaces";
import "./Pagination.scss";

interface ContentProps {
  response: Characters;
}
export default function Pagination(props: ContentProps) {
  const router = useRouter();

  const prevPage = props.response.previous
    ? new URL(props.response.previous).searchParams.get("page")
    : null;
  const nextPage = props.response.next
    ? new URL(props.response.next).searchParams.get("page")
    : null;

  const handlerPage = (page: string | null) => () => {
    if (!page) return;
    const searchParams = new URLSearchParams(
      router.query as Record<string, string>,
    );

    searchParams.set("page", page);
    router.push({
      pathname: router.pathname,
      query: Object.fromEntries(searchParams.entries()),
    });
  };

  return (
    <nav className="pagination">
      <button
        className="pagination__button"
        onClick={handlerPage(prevPage)}
        disabled={!prevPage}
      >
        Prev
      </button>
      <div>Page: {Number(prevPage) + 1}</div>
      <button
        className="pagination__button"
        onClick={handlerPage(nextPage)}
        disabled={!nextPage}
      >
        Next
      </button>
    </nav>
  );
}
