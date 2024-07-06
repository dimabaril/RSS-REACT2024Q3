import { Component } from "react";

interface SearchProps {
  className?: string;
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
    console.log(event.target.value);
    this.setState({ searchText: event.target.value });
  };

  handleSearch = () => {
    console.log("searching...");
    localStorage.setItem("searchText", this.state.searchText);
  };

  render() {
    const baseClass = this.props.className || "search";
    console.log("rendering Search component");
    return (
      <section className={baseClass}>
        <input
          className={`${baseClass}__input`}
          type="text"
          placeholder="Search..."
          value={this.state.searchText}
          onChange={this.handleInputChange}
        />
        <button className={`${baseClass}__button`} onClick={this.handleSearch}>
          Search
        </button>
      </section>
    );
  }
}
