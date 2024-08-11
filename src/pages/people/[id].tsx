import { wrapper } from "../../app/store";
import CharacterDetails from "../../components/characterDetails/CharacterDetails";
import Root from "../../components/root/Root";
import { starWarsApi } from "../../services/api";

export const getServerSideProps = wrapper.getServerSideProps(
  (store) => async (context) => {
    const { id } = context.query;
    const searchParams = new URLSearchParams(
      context.query as Record<string, string>,
    );
    searchParams.delete("id");

    store.dispatch(
      starWarsApi.endpoints.getCharacterDetailById.initiate(Number(id)),
    );
    store.dispatch(
      starWarsApi.endpoints.getCharacters.initiate(searchParams.toString()),
    );

    await Promise.all(
      store.dispatch(starWarsApi.util.getRunningQueriesThunk()),
    );

    return {
      props: {},
    };
  },
);

export default function Id() {
  return (
    <>
      <Root />
      <CharacterDetails />
    </>
  );
}
