import { useEffect } from "react";
import {
  matchPath,
  useLoaderData,
  useNavigate,
  useNavigation,
} from "react-router-dom";

import { CharacterDetailResponse } from "../../interfaces/interfaces";
import Loader from "../loader/Loader";
import "./CharacterCard.scss";

export default function CharacterCard() {
  const { character, id } = useLoaderData() as {
    character: CharacterDetailResponse;
    id: string;
  };
  const navigation = useNavigation();
  const navigate = useNavigate();

  const isLoading =
    navigation.state === "loading" &&
    matchPath("/people/:id", navigation.location.pathname);

  const close = () => {
    const location = localStorage.getItem("location");
    navigate(location ? JSON.parse(location) : "/");
  };

  const clickHandler = (event: MouseEvent) => {
    const target = event.target as HTMLElement;
    if (target.closest(".character-card") || target.closest(".nav-list__item"))
      return;
    close();
  };

  useEffect(() => {
    document.addEventListener("click", clickHandler);
    return () => {
      document.removeEventListener("click", clickHandler);
    };
  });

  const img = `https://starwars-visualguide.com/assets/img/characters/${id}.jpg`;

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <section className="character-card">
          <ul className="character-card__description">
            <div className="character-card__name">{character.name}</div>
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
          <div className="character-card__img">
            <img src={img} alt="img" />
          </div>
          <button className="character-card__close" onClick={close}>
            ×
          </button>
        </section>
      )}
    </>
  );
}
