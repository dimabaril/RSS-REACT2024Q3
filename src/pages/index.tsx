import { wrapper } from "../app/store";
import Root from "../components/root/Root";
import { starWarsApi } from "../services/api";

export const getServerSideProps = wrapper.getServerSideProps(
  (store) => async (context) => {
    const { query } = context;
    const searchParams = new URLSearchParams(query as Record<string, string>);
    searchParams.delete("id");

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

export default function index() {
  return <Root />;
}
