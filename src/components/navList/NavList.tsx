import { NavLink, useLocation } from "react-router-dom";

import { PATH } from "../../constants";
import { Characters } from "../../interfaces/interfaces";
import CharacterShort from "../characterShort/CharacterShort";
import "./NavList.scss";

interface ContentProps {
  response: Characters;
}

export default function NavList(props: ContentProps) {
  const { response } = props;
  const location = useLocation();

  if (location.pathname === PATH.ROOT)
    localStorage.setItem("onCloseDetailsLocation", JSON.stringify(location));

  return (
    <>
      {response.results.length === 0 ? (
        <div className="nav-list">No results found</div>
      ) : (
        <>
          <ul className="nav-list">
            {response.results.map((character) => {
              const Id = character.url.split("/").filter(Boolean).pop();
              return (
                <li key={character.url.toString()} className="nav-list__item">
                  <NavLink
                    to={`${PATH.PEOPLE}${Id}${location.search}`}
                    className={({ isActive, isPending }) =>
                      `nav-link ${isActive ? "active" : isPending ? "pending" : ""}`
                    }
                  >
                    <CharacterShort character={character} />
                  </NavLink>
                </li>
              );
            })}
          </ul>
        </>
      )}
    </>
  );
}
