import { useRouter } from "next/router";

import { wrapper } from "../app/store";
import ErrorButton from "../components/errorButton/ErrorButton";
import FlyoutSelected from "../components/flyout/FlyoutSelected";
import Loader from "../components/loader/Loader";
import NavList from "../components/navList/NavList";
import Pagination from "../components/pagination/Pagination";
import Search from "../components/search/Search";
import ThemeSelector from "../components/themeSelector/ThemeSelector";
import { usePageLoading } from "../hooks/usePageLoading";
import { starWarsApi } from "../services/api";
import "./Root.css";

// eslint-disable-next-line react-refresh/only-export-components
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

export default function Root() {
  const router = useRouter();
  const searchParams = new URLSearchParams(
    router.query as Record<string, string>,
  );
  searchParams.delete("id");
  const { data, error } = starWarsApi.useGetCharactersQuery(
    searchParams.toString(),
  );
  const { isPageLoading } = usePageLoading();

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
          <NavList response={data} />
          <Pagination response={data} />
        </>
      );
    }

    return null;
  };

  return (
    <>
      <section className="side-nav">
        <ThemeSelector />
        <ErrorButton />
        <Search />
        {renderContent()}
      </section>
      <FlyoutSelected />
    </>
  );
}
