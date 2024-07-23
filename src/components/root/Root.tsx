import { useEffect } from "react";
// import { useDispatch } from "react-redux";
import {
  Outlet, // matchPath,
  // useLoaderData,
  // useNavigation,
  useSearchParams,
} from "react-router-dom";

import { useAppDispatch } from "../../app/hooks";
// import { Counter } from "../../features/counter/Counter";
import { setPeople } from "../../features/people/peopleSlice";
// import { Characters } from "../../interfaces/interfaces";
import { starWarsApi } from "../../services/api";
import ErrorButton from "../errorButton/ErrorButton";
import Loader from "../loader/Loader";
import NavList from "../navList/NavList";
import Pagination from "../pagination/Pagination";
import Search from "../search/Search";
import "./Root.css";

export default function Root() {
  console.log("Root");
  // const { response, search } = useLoaderData() as {
  //   response: Characters;
  //   search: string;
  // };
  // const navigation = useNavigation();

  // const isLoading =
  //   navigation.state === "loading" &&
  //   matchPath("/", navigation.location.pathname);

  // useEffect(() => {
  //   const element = document.getElementById("search");
  //   if (element && element instanceof HTMLInputElement && search) {
  //     element.value = search;
  //   }
  // }, [search]);

  const [searchParams] = useSearchParams();

  const dispatch = useAppDispatch();

  const { data, error, isFetching } = starWarsApi.useGetCharactersQuery(
    searchParams.toString(),
  );

  useEffect(() => {
    if (!data) return;
    dispatch(setPeople(data));
  }, [dispatch, data]);

  return (
    <>
      <section className="side-nav">
        {/* <Counter /> */}
        <ErrorButton />
        <Search />
        {isFetching || !data ? <Loader /> : <NavList response={data} />}
        {isFetching || error || !data ? null : <Pagination response={data} />}
      </section>
      <Outlet />
    </>
  );
}
