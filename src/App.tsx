import { Component } from "react";

import "./App.css";
import Content from "./components/content/Content";
import ErrorButton from "./components/errorButton/ErrorButton";
import Search from "./components/search/Search";
import { Character } from "./interfaces/interfaces";
import { fetchSWPeople } from "./services/api";

interface AppState {
  results: Character[];
}

export default class App extends Component<Record<string, never>, AppState> {
  constructor(props: Record<string, never>) {
    super(props);

    this.state = {
      results: [],
    };
  }

  handleSearch = async (term: string) => {
    try {
      const response = await fetchSWPeople(term);
      this.setState({ results: response });
    } catch (error) {
      console.error("Error fetching search results:", error);
    }
  };

  render = () => {
    return (
      <>
        <Search className="search" onSearch={this.handleSearch} />
        <ErrorButton />
        <Content results={this.state.results} />
      </>
    );
  };
}
