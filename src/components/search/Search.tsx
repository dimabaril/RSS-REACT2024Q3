"use client";

// import Cookies from "js-cookie";
import { useRouter } from "next/router";

// import { useEffect } from "react";
import { useStateLocalStorage } from "../../hooks/useStateLocalStorage";
import "./Search.scss";

export default function Search() {
  const [searchTerm, setSearchTerm, setLocalStorageSearchTerm] =
    useStateLocalStorage("searchTerm", "");
  const router = useRouter();

  // useEffect(() => {
  //   const search = router.query.search;
  //   console.log("search", search, router);
  //   const savedSearch = Cookies.get("searchTerm");
  //   console.log("savedSearch", savedSearch);

  //   if (!search && savedSearch) {
  //     router.push({
  //       pathname: router.pathname,
  //       query: { search: savedSearch },
  //     });
  //   }
  // }, [router, router.query.search]);

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
    setLocalStorageSearchTerm(trimmedSearchTerm);
    router.push({
      pathname: router.pathname,
      query: { search: trimmedSearchTerm },
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
