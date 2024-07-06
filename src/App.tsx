import { Component } from "react";
import "./App.css";

import Search from "./components/search/Search";
import Content from "./components/content/Content";

interface AppState {
  results: string;
}

export default class App extends Component<Record<string, never>, AppState> {
  constructor(props: Record<string, never>) {
    super(props);
    this.state = {
      results: "",
    };
  }

  handleSearch = async (term: string) => {
    console.log("!!!handleSearch...", term);
    try {
      // const response = await fetchResults(term);
      // this.setState({ results: response });
      this.setState({ results: "some mocked results" });
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
