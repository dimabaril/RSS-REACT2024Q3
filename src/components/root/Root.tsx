import { useEffect } from "react";
import { Outlet, useSearchParams } from "react-router-dom";

import { starWarsApi } from "../../services/api";
import ErrorButton from "../errorButton/ErrorButton";
import FlyoutSelected from "../flyout/FlyoutSelected";
import Loader from "../loader/Loader";
import NavList from "../navList/NavList";
import Pagination from "../pagination/Pagination";
import Search from "../search/Search";
import ThemeSelector from "../themeSelector/ThemeSelector";
import "./Root.css";

export default function Root() {
  const [searchParams, setSearchParams] = useSearchParams();
  const { data, error, isFetching } = starWarsApi.useGetCharactersQuery(
    searchParams.toString(),
  );

  // Set search term from local storage if it exists
  useEffect(() => {
    const search = searchParams.get("search") || "";
    const savedSearch = localStorage.getItem("searchTerm") || "";
    if (search) return;
    if (savedSearch) {
      setSearchParams((params) => {
        const newParams = new URLSearchParams(params);
        newParams.set("search", savedSearch);
        return newParams;
      });
    }
  }, [searchParams, setSearchParams]);

  return (
    <>
      <section className="side-nav">
        <ThemeSelector />
        <ErrorButton />
        <Search />
        {isFetching || !data ? <Loader /> : <NavList response={data} />}
        {isFetching || error || !data ? null : <Pagination response={data} />}
      </section>
      <Outlet />
      <FlyoutSelected />
    </>
  );
}
