"use client";

import Cookies from "js-cookie";
import { usePathname } from "next/navigation";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

import { useStateStorage } from "../../hooks/useStateCookiesStorage";
import "./Search.scss";

export default function Search({
  searchParams,
}: {
  searchParams: Record<string, string>;
}) {
  const [searchTerm, setSearchTerm, setStorageSearchTerm] = useStateStorage(
    "searchTerm",
    "",
  );
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const search = searchParams.search;
    const savedSearch = Cookies.get("searchTerm");
    if (search && search !== savedSearch) {
      setSearchTerm(search as string);
    }
  }, [searchParams.search, setSearchTerm]);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  function handleSearch(
    event:
      | React.MouseEvent<HTMLButtonElement>
      | React.KeyboardEvent<HTMLInputElement>,
  ) {
    event.preventDefault();
    const trimmedSearchTerm = searchTerm.trim();
    setStorageSearchTerm(trimmedSearchTerm);

    const currentQuery = { ...searchParams };
    delete currentQuery.page;
    router.push(
      `${pathname}?${new URLSearchParams({ ...currentQuery, search: trimmedSearchTerm }).toString()}`,
    );
  }

  return (
    <div className="search">
      <form className="search__form">
        <input
          id="search"
          className="search__input"
          type="text"
          placeholder="Search..."
          value={searchTerm}
          onChange={handleInputChange}
          name="search"
        />
        <button className="search__button" onClick={handleSearch}>
          Search
        </button>
      </form>
    </div>
  );
}
