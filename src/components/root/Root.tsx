import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import {
  Outlet,
  matchPath,
  useLoaderData,
  useNavigation,
} from "react-router-dom";

import { CharactersResponse } from "../../interfaces/interfaces";
import ErrorButton from "../errorButton/ErrorButton";
import Loader from "../loader/Loader";
import NavList from "../navList/NavList";
import Pagination from "../pagination/Pagination";
import Search from "../search/Search";
import "./Root.css";

export default function Root() {
  const { response, q } = useLoaderData() as {
    response: CharactersResponse;
    q: string;
  };
  const navigation = useNavigation();
  const location = useLocation();

  const isLoading =
    navigation.state === "loading" &&
    matchPath("/", navigation.location.pathname);

  useEffect(() => {
    const element = document.getElementById("q");
    if (element && element instanceof HTMLInputElement && q) {
      element.value = q;
    }
  }, [location.pathname, q]);

  return (
    <>
      <section className="side-nav">
        <ErrorButton />
        <Search />
        {isLoading ? <Loader /> : <NavList response={response} />}
        {isLoading ? null : <Pagination response={response} />}
      </section>
      <Outlet />
    </>
  );
}
