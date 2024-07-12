import { useStateLocalStorage } from "../../hooks/useStateLocalStorage";
import "./Search.scss";

interface SearchProps {
  onSearch: (searchText: string) => void;
}

export default function Search(props: SearchProps) {
  const [searchText, setSearchText, setLocalStorageSearchText] =
    useStateLocalStorage("searchText", "");

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchText(event.target.value);
  };

  function handleSearch() {
    const trimmedSearchText = searchText.trim();
    setLocalStorageSearchText(trimmedSearchText);
    props.onSearch(trimmedSearchText);
  }

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
