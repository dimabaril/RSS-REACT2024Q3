import { getCharacters } from "../../services/starwarsApi";
import FlyoutSelected from "../flyout/FlyoutSelected";
import NavList from "../navList/NavList";
import Pagination from "../pagination/Pagination";
import Search from "../search/Search";
import ThemeSelector from "../themeSelector/ThemeSelector";
import "./Root.css";

export default async function Root({
  searchParams,
}: {
  searchParams: Record<string, string>;
}) {
  const characters = await getCharacters(
    new URLSearchParams(searchParams).toString(),
  );

  return (
    <>
      <section className="side-nav">
        <ThemeSelector />
        <Search searchParams={searchParams} />
        <NavList characters={characters} />
        <Pagination characters={characters} />
      </section>
      <FlyoutSelected />
    </>
  );
}
