"use client";

import { useEffect, useState } from "react";

import { useAppSelector } from "../../app/hooks";
import { useAppDispatch } from "../../app/hooks";
import { unsetAllPeopleSelected } from "../../features/people/peopleSlice";
import { concertObjectToCsv } from "../../helpers/convertObjectToCsv";
import { createBlobURL } from "../../helpers/createBlobURL";
import "./FlyoutSelected.scss";

function FlyoutSelected() {
  const peopleSelected = useAppSelector((state) => state.peopleSelected);
  const dispatch = useAppDispatch();
  const [blobUrl, setBlobUrl] = useState("");

  const count = peopleSelected.length;
  const isOpen = Boolean(count);

  const unselectAll = () => {
    dispatch(unsetAllPeopleSelected());
  };

  useEffect(() => {
    if (peopleSelected.length > 0) {
      const csvData = concertObjectToCsv(peopleSelected);
      const url = createBlobURL(csvData, "text/csv");
      setBlobUrl(url);
    }
  }, [peopleSelected]);

  return (
    <div className={`flyout ${isOpen ? "open" : ""}`}>
      <span>
        {count} {count > 1 ? "characters are" : "character is"} selected
      </span>
      <button onClick={unselectAll}>Unselect all</button>
      {blobUrl && (
        <a href={blobUrl} download={`${count}_selected_characters.csv`}>
          Download selected as CSV
        </a>
      )}
    </div>
  );
}

export default FlyoutSelected;
