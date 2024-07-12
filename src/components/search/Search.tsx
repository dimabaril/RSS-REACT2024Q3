import { useState } from "react";

import "./Search.scss";

interface SearchProps {
  onSearch: (searchText: string) => void;
}

export default function Search(props: SearchProps) {
  const savedSearchInput = localStorage.getItem("searchText") || "";
  const [searchText, setSearchText] = useState(savedSearchInput);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchText(event.target.value);
  };

  const handleSearch = () => {
    const trimmedSearchText = searchText.trim();
    localStorage.setItem("searchText", trimmedSearchText);
    props.onSearch(trimmedSearchText);
  };

  return (
    <section className="search">
      <input
        className="search__input"
        type="text"
        placeholder="Search..."
        value={searchText}
        onChange={handleInputChange}
        onKeyUp={(event) => {
          if (event.key === "Enter") {
            handleSearch();
          }
        }}
      />
      <button className="search__button" onClick={handleSearch}>
        Search
      </button>
    </section>
  );
}
