import { Form, useSubmit } from "react-router-dom";

import { useStateLocalStorage } from "../../hooks/useStateLocalStorage";
import "./Search.scss";

export default function Search() {
  const [searchText, setSearchText, setLocalStorageSearchText] =
    useStateLocalStorage("searchText", "");
  const submit = useSubmit();

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchText(event.target.value);
  };

  function handleSearch(
    event:
      | React.MouseEvent<HTMLButtonElement>
      | React.KeyboardEvent<HTMLInputElement>,
  ) {
    event.preventDefault();
    const trimmedSearchText = searchText.trim();
    setLocalStorageSearchText(trimmedSearchText);
    localStorage.removeItem("page");
    submit(event.currentTarget.form);
  }

  return (
    <div className="search">
      <Form className="search__form">
        <input
          id="q"
          className="search__input"
          type="text"
          placeholder="Search..."
          value={searchText}
          onChange={handleInputChange}
          name="q"
        />
        <button className="search__button" onClick={handleSearch}>
          Search
        </button>
      </Form>
    </div>
  );
}
