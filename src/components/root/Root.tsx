import { useRouter } from "next/router";

import { usePageLoading } from "../../hooks/usePageLoading";
import { starWarsApi } from "../../services/api";
import FlyoutSelected from "../flyout/FlyoutSelected";
import Loader from "../loader/Loader";
import NavList from "../navList/NavList";
import Pagination from "../pagination/Pagination";
import Search from "../search/Search";
import ThemeSelector from "../themeSelector/ThemeSelector";
import "./Root.css";

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
        <Search />
        {renderContent()}
      </section>
      <FlyoutSelected />
    </>
  );
}
