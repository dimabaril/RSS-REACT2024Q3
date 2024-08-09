import Cookies from "js-cookie";
import { useRouter } from "next/router";
import { useEffect } from "react";

import { useStateStorage } from "../../hooks/useStateCookiesStorage";
import "./Search.scss";

export default function Search() {
  const [searchTerm, setSearchTerm, setStorageSearchTerm] = useStateStorage(
    "searchTerm",
    "",
  );
  const router = useRouter();

  useEffect(() => {
    const search = router.query.search;
    const savedSearch = Cookies.get("searchTerm");
    if (search && search !== savedSearch) {
      setSearchTerm(search as string);
    }
  }, [router.query.search, setSearchTerm]);

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

    const currentQuery = { ...router.query };
    delete currentQuery.page;
    router.push({
      pathname: router.pathname,
      query: { ...currentQuery, search: trimmedSearchTerm },
    });
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
