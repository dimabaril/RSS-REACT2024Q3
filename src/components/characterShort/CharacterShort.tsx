import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { togglePeopleSelected } from "../../features/people/peopleSlice";
import { CharacterDetails } from "../../interfaces/interfaces";
import "./CharacterShort.scss";

export default function CharacterShort(props: { character: CharacterDetails }) {
  const { character } = props;
  const dispatch = useAppDispatch();

  const isSelected = useAppSelector((state) =>
    state.peopleSelected.find(
      (selectedCharacter) => selectedCharacter.url === character.url,
    ),
  );

  const toggleSelected = (event: React.MouseEvent) => {
    event.preventDefault();
    dispatch(togglePeopleSelected(character));
  };

  return (
    <ul className="character-short-card">
      <button onClick={toggleSelected}>
        {isSelected ? "Selected" : "Not Selected"}
      </button>
      <li>
        <strong>{character.name}</strong>
      </li>
      <li>
        <i>birth year: {character.birth_year}</i>
      </li>
      {/* <li>
        <i>gender: {character.gender}</i>
      </li> */}
    </ul>
  );
}
