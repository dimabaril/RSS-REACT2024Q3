import { useState } from "react";

import "./App.css";
import Content from "./components/content/Content";
import ErrorButton from "./components/errorButton/ErrorButton";
import Loader from "./components/loader/Loader";
import Search from "./components/search/Search";
import { Character } from "./interfaces/interfaces";
import { fetchSWPeople } from "./services/api";

export default function App() {
  const [results, setResults] = useState<Character[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleSearch = async (term: string) => {
    setIsLoading(true);
    try {
      const response = await fetchSWPeople(term);
      setResults(response);
    } catch (error) {
      console.error("Error fetching search results:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Search onSearch={handleSearch} />
      <ErrorButton />
      {isLoading ? <Loader /> : <Content results={results} />}
    </>
  );
}
