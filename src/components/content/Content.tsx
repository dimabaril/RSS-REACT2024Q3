import { Character } from "../../interfaces/interfaces";
import CharacterCard from "../characterCard/CharacterCard";
import "./Content.scss";

interface ContentProps {
  results: Character[];
}

export default function Content(props: ContentProps) {
  const { results } = props;
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
