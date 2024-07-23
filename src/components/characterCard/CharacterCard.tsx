import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { starWarsApi } from "../../services/api";
import Loader from "../loader/Loader";
import "./CharacterCard.scss";

export default function CharacterCard() {
  const { id } = useParams();
  const { data, error, isFetching } =
    starWarsApi.useGetCharacterDetailByIdQuery(Number(id));
  const navigate = useNavigate();

  const close = () => {
    const location = localStorage.getItem("onCloseDetailsLocation");
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
      {error ? (
        <>Oh no, there was an error</>
      ) : isFetching ? (
        <Loader />
      ) : data ? (
        <section className="character-card">
          <ul className="character-card__description">
            <div className="character-card__name">{data.name}</div>
            <li className="character-card__description-item">
              birth year: {data.birth_year}
            </li>
            <li className="character-card__description-item">
              gender: {data.gender}
            </li>
            <li className="character-card__description-item">
              height: {data.height} cm.
            </li>
            <li className="character-card__description-item">
              mass: {data.mass} kg.
            </li>
            <li className="character-card__description-item">
              skin color: {data.skin_color}
            </li>
            <li className="character-card__description-item">
              hair color: {data.hair_color}
            </li>
            <li className="character-card__description-item">
              eye color: {data.eye_color}
            </li>
          </ul>
          <div className="character-card__img">
            <img src={img} alt="img" />
          </div>
          <button className="character-card__close" onClick={close}>
            ×
          </button>
        </section>
      ) : null}
    </>
  );
}
