// import "./FlyoutSelected.css";
import { useAppSelector } from "../../app/hooks";
import { useAppDispatch } from "../../app/hooks";
import { UnsetAllPeopleSelected } from "../../features/people/peopleSlice";
import { concertObjectToCsv } from "../../helpers/convertObjectToCsv";
import { createBlobURL } from "../../helpers/createBlobURL";

export default function FlyoutSelected() {
  const peopleSelected = useAppSelector((state) => state.peopleSelected);
  const dispatch = useAppDispatch();

  const count = peopleSelected.length;

  const isOpen = Boolean(count);

  const unselectAll = () => {
    dispatch(UnsetAllPeopleSelected());
  };

  return (
    isOpen && (
      <div className="flyout">
        <p>
          {count} {count > 1 ? "items are" : "item is"} selected
        </p>
        <button onClick={unselectAll}>Unselect all</button>
        <a
          href={createBlobURL(concertObjectToCsv(peopleSelected), "text/csv")}
          download={`${count}_selected_characters.csv`}
        >
          Download selected as CSV
        </a>
      </div>
    )
  );
}
