"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";

import { Characters } from "../../interfaces/interfaces";
import "./Pagination.scss";

interface ContentProps {
  characters: Characters;
}
export default function Pagination({ characters }: ContentProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const prevPage = characters.previous
    ? new URL(characters.previous).searchParams.get("page")
    : null;
  const nextPage = characters.next
    ? new URL(characters.next).searchParams.get("page")
    : null;

  const handlerPage = (page: string | null) => () => {
    if (!page) return;
    const currentSearch = new URLSearchParams(searchParams?.toString());
    currentSearch.set("page", page);
    router.push(`${pathname}?${currentSearch.toString()}`);
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
