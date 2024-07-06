import { Component } from "react";
import { Character } from "../../interfaces/interfaces";
import CharacterCard from "../characterCard/CharacterCard";

interface ContentProps {
  className?: string;
  results: Character[];
}

export default class Content extends Component<ContentProps> {
  render() {
    const baseClass = this.props.className || "content";
    const { results } = this.props;
    if (results.length === 0)
      return <section className={baseClass}>No results found</section>;
    return (
      <section className={baseClass}>
        {results.map((character) => (
          <CharacterCard key={character.url.toString()} character={character} />
        ))}
      </section>
    );
  }
}
