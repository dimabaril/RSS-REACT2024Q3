import { Component } from "react";

interface SearchProps {
  className?: string;
  onSearch: (searchText: string) => void;
}

interface SearchState {
  searchText: string;
}

export default class Search extends Component<SearchProps, SearchState> {
  constructor(props: SearchProps) {
    super(props);
    const savedSearchInput = localStorage.getItem("searchText") || "";
    this.state = {
      searchText: savedSearchInput,
    };
  }

  handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ searchText: event.target.value });
  };

  handleSearch = () => {
    localStorage.setItem("searchText", this.state.searchText);
    this.props.onSearch(this.state.searchText);
  };

  render = () => {
    const baseClass = this.props.className || "search";
    return (
      <section className={baseClass}>
        <input
          className={`${baseClass}__input`}
          type="text"
          placeholder="Search..."
          value={this.state.searchText}
          onChange={this.handleInputChange}
          onKeyUp={(event) => {
            if (event.key === "Enter") {
              this.handleSearch();
            }
          }}
        />
        <button className={`${baseClass}__button`} onClick={this.handleSearch}>
          Search
        </button>
      </section>
    );
  };
}
