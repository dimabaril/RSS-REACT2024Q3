import { useDispatch, useSelector } from "react-redux";
import { Form, useSubmit } from "react-router-dom";

import type { RootState } from "../../app/store";
import { increment } from "../../features/counter/counterSlice";
import { useStateLocalStorage } from "../../hooks/useStateLocalStorage";
import "./Search.scss";

export default function Search() {
  const [searchText, setSearchText, setLocalStorageSearchText] =
    useStateLocalStorage("searchText", "");
  const submit = useSubmit();

  const dispatch = useDispatch();
  const count = useSelector((state: RootState) => state.counter.value);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchText(event.target.value);
  };

  function handleSearch(
    event:
      | React.MouseEvent<HTMLButtonElement>
      | React.KeyboardEvent<HTMLInputElement>,
  ) {
    event.preventDefault();
    dispatch(increment());
    const trimmedSearchText = searchText.trim();
    setLocalStorageSearchText(trimmedSearchText);
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
          Search {count}
        </button>
      </Form>
    </div>
  );
}
