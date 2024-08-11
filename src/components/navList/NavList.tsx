import Cookies from "js-cookie";
import Link from "next/link";
import { useRouter } from "next/router";

import { PATH } from "../../constants";
import { Characters } from "../../interfaces/interfaces";
import CharacterShort from "../characterShort/CharacterShort";
import "./NavList.scss";

interface ContentProps {
  response: Characters;
}

export default function NavList(props: ContentProps) {
  const { response } = props;
  const router = useRouter();
  const searchParams = new URLSearchParams(
    router.query as Record<string, string>,
  );
  searchParams.delete("id");

  // Save location to return the same page after closing details
  if (router.pathname === PATH.ROOT) {
    Cookies.set("onCloseDetailsLocation", JSON.stringify(router.asPath));
  }

  return (
    <>
      {response.results.length === 0 ? (
        <div className="nav-list" data-testid="nav-list">
          No results found
        </div>
      ) : (
        <>
          <ul className="nav-list" data-testid="nav-list">
            {response.results.map((character) => {
              const Id = character.url.split("/").filter(Boolean).pop();
              return (
                <li key={character.url.toString()} className="nav-list__item">
                  <Link
                    href={`${PATH.ROOT}${PATH.PEOPLE}${Id}${searchParams.size ? "?" + searchParams.toString() : ""}`}
                  >
                    <CharacterShort character={character} />
                  </Link>
                </li>
              );
            })}
          </ul>
        </>
      )}
    </>
  );
}
