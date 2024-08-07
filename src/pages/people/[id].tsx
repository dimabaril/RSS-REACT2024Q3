import { useRouter } from "next/router";
import { useEffect } from "react";

// import { wrapper } from "../../app/store";
import "../../components/characterDetails/CharacterDetails.scss";
import Loader from "../../components/loader/Loader";
import { getSWCharacterImageUrlById } from "../../helpers/getSWImageUrlById";
import { usePageLoading } from "../../hooks/usePageLoading";
import { starWarsApi } from "../../services/api";
import Root from "../index";

// export const getServerSideProps = wrapper.getServerSideProps(
//   (store) => async (context) => {
//     const { id } = context.query;

//     store.dispatch(
//       starWarsApi.endpoints.getCharacterDetailById.initiate(Number(id)),
//     );

//     await Promise.all(
//       store.dispatch(starWarsApi.util.getRunningQueriesThunk()),
//     );

//     return {
//       props: {},
//     };
//   },
// );

export default function CharacterDetails() {
  const router = useRouter();
  const { id } = router.query;
  const { data, error } = starWarsApi.useGetCharacterDetailByIdQuery(
    Number(id),
  );
  const { isPageLoading } = usePageLoading();

  const close = () => {
    const location = localStorage.getItem("onCloseDetailsLocation");
    router.push(location ? JSON.parse(location) : "/");
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
      <Root />
      <section className="character-card" data-testid="character-details">
        {renderContent()}
      </section>
    </>
  );
}
