import Cookies from "js-cookie";
import { useRouter } from "next/router";
import { useEffect } from "react";

import "../../components/characterDetails/CharacterDetails.scss";
import { getSWCharacterImageUrlById } from "../../helpers/getSWImageUrlById";
import { usePageLoading } from "../../hooks/usePageLoading";
import { starWarsApi } from "../../services/api";
import Loader from "../loader/Loader";

export default function CharacterDetails() {
  const router = useRouter();
  const { id } = router.query;
  const { data, error } = starWarsApi.useGetCharacterDetailByIdQuery(
    Number(id),
  );
  const { isPageLoading } = usePageLoading();

  const close = () => {
    const location = Cookies.get("onCloseDetailsLocation");
    router.push(location ? JSON.parse(location) : "/");
  };

  const clickHandler = (event: MouseEvent) => {
    const target = event.target as HTMLElement;
    if (
      target.closest(".character-card") ||
      target.closest(".nav-list__item") ||
      target.closest(".search__input") ||
      target.closest(".search__button") ||
      target.closest(".pagination__button")
    )
      return;
    close();
  };

  useEffect(() => {
    document.addEventListener("click", clickHandler);
    return () => {
      document.removeEventListener("click", clickHandler);
    };
  });

  const renderContent = () => {
    if (isPageLoading) {
      return <Loader />;
    }

    if (error) {
      if ("status" in error) {
        const errMsg =
          "error" in error ? error.error : JSON.stringify(error.data);

        return (
          <div>
            <div>An error has occurred:</div>
            <div>{errMsg}</div>
          </div>
        );
      }
      return <div>{error.message}</div>;
    }

    if (data) {
      return (
        <>
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
        </>
      );
    }

    return null;
  };

  return (
    <>
      <section className="character-card" data-testid="character-details">
        {renderContent()}
      </section>
    </>
  );
}
