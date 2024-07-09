import { Component } from "react";

import "./App.css";
import Content from "./components/content/Content";
import ErrorButton from "./components/errorButton/ErrorButton";
import Loader from "./components/loader/Loader";
import Search from "./components/search/Search";
import { Character } from "./interfaces/interfaces";
import { fetchSWPeople } from "./services/api";

interface AppState {
  results: Character[];
  isLoading: boolean;
}

export default class App extends Component<Record<string, never>, AppState> {
  constructor(props: Record<string, never>) {
    super(props);

    this.state = {
      results: [],
      isLoading: false,
    };
  }

  handleSearch = async (term: string) => {
    this.setState({ isLoading: true });
    try {
      const response = await fetchSWPeople(term);
      this.setState({ results: response });
    } catch (error) {
      console.error("Error fetching search results:", error);
    } finally {
      this.setState({ isLoading: false });
    }
  };

  render = () => {
    const { isLoading, results } = this.state;
    return (
      <>
        <Search className="search" onSearch={this.handleSearch} />
        <ErrorButton />
        {isLoading ? <Loader /> : <Content results={results} />}
      </>
    );
  };
}
