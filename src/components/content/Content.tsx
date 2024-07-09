import { Component } from "react";

import { Character } from "../../interfaces/interfaces";
import CharacterCard from "../characterCard/CharacterCard";
import "./Content.scss";

interface ContentProps {
  className?: string;
  results: Character[];
}

export default class Content extends Component<ContentProps> {
  render() {
    const { results } = this.props;
    if (results.length === 0)
      return <section className="content">No results found</section>;
    return (
      <section className="content">
        {results.map((character) => (
          <CharacterCard key={character.url.toString()} character={character} />
        ))}
      </section>
    );
  }
}
