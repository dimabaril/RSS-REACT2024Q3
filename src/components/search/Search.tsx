import { Form, useSubmit } from "react-router-dom";

import { useStateLocalStorage } from "../../hooks/useStateLocalStorage";
import "./Search.scss";

export default function Search() {
  const [searchTerm, setSearchTerm, setLocalStorageSearchTerm] =
    useStateLocalStorage("searchTerm", "");
  const submit = useSubmit();

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
    submit(event.currentTarget.form);
  }

  return (
    <div className="search">
      <Form className="search__form">
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
      </Form>
    </div>
  );
}
