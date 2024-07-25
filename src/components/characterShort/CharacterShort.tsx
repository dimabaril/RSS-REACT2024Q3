import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { togglePeopleSelected } from "../../features/people/peopleSlice";
import { CharacterDetails } from "../../interfaces/interfaces";
import "./CharacterShort.scss";

export default function CharacterShort(props: { character: CharacterDetails }) {
  const { character } = props;
  const dispatch = useAppDispatch();

  const isSelected = useAppSelector((state) =>
    state.peopleSelected.some(
      (selectedCharacter) => selectedCharacter.url === character.url,
    ),
  );

  const toggleSelected = (event: React.MouseEvent) => {
    event.preventDefault();
    dispatch(togglePeopleSelected(character));
  };

  return (
    <div className="character-short-card">
      <div className="custom-checkbox" onClick={toggleSelected}>
        {isSelected && "✓"}
      </div>
      <strong className="character-short-card__item">{character.name}</strong>
      <i className="character-short-card__item">
        birth year: {character.birth_year}
      </i>
    </div>
  );
}
