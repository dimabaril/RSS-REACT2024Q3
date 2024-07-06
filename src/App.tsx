import { Component } from "react";
import "./App.css";

import Search from "./components/search/Search";
import Content from "./components/content/Content";
import { fetchSWPeople } from "./services/api";

import { Character } from "./interfaces/interfaces";

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
        <Content className="content" results={this.state.results} />
      </>
    );
  };
}
