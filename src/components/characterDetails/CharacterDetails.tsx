import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { getSWCharacterImageUrlById } from "../../helpers/getSWImageUrlById";
import { starWarsApi } from "../../services/api";
import Loader from "../loader/Loader";
import "./CharacterDetails.scss";

export default function CharacterDetails() {
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

  return (
    <>
      {error ? (
        <div className="error">
          Oh no, there was an error {JSON.stringify(error)}
        </div>
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
            <img src={getSWCharacterImageUrlById(Number(id))} alt="img" />
          </div>
          <button className="character-card__close" onClick={close}>
            ×
          </button>
        </section>
      ) : null}
    </>
  );
}
