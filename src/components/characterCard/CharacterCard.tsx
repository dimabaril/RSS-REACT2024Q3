import { Character } from "../../interfaces/interfaces";
import "./CharacterCard.scss";

interface CharacterCardProps {
  character: Character;
}

export default function CharacterCard(props: CharacterCardProps) {
  const { character } = props;
  return (
    <div className="character-card">
      <div className="character-card__name">name: {character.name}</div>
      <ul className="character-card__description">
        <li className="character-card__description-item">
          birth year: {character.birth_year}
        </li>
        <li className="character-card__description-item">
          gender: {character.gender}
        </li>
        <li className="character-card__description-item">
          height: {character.height} cm.
        </li>
        <li className="character-card__description-item">
          mass: {character.mass} kg.
        </li>
        <li className="character-card__description-item">
          skin color: {character.skin_color}
        </li>
        <li className="character-card__description-item">
          hair color: {character.hair_color}
        </li>
        <li className="character-card__description-item">
          eye color: {character.eye_color}
        </li>
      </ul>
    </div>
  );
}
