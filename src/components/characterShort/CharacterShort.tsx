import { CharacterDetails } from "../../interfaces/interfaces";
import "./CharacterShort.scss";

export default function CharacterShort(props: { character: CharacterDetails }) {
  const { character } = props;

  return (
    <ul className="character-short-card">
      <li>
        <strong>{character.name}</strong>
      </li>
      <li>
        <i>birth year: {character.birth_year}</i>
      </li>
      <li>
        <i>gender: {character.gender}</i>
      </li>
    </ul>
  );
}
