import { useState } from "react";
import { NavLink, useLocation } from "react-router-dom";

import { CharactersResponse } from "../../interfaces/interfaces";
import "./NavList.scss";

interface ContentProps {
  response: CharactersResponse;
}

export default function NavList(props: ContentProps) {
  const [response] = useState<CharactersResponse>(props.response);
  const location = useLocation();

  const handleLinkClick = () => {
    if (location.pathname !== "/") return;
    const page =
      new URLSearchParams(location.search).get("page")?.toString() || "1";
    localStorage.setItem("temporaryPage", page);
  };

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
                    to={`/people/${Id}`}
                    onClick={handleLinkClick}
                    className={({ isActive, isPending }) =>
                      `nav-link ${isActive ? "active" : isPending ? "pending" : ""}`
                    }
                  >
                    <span>{character.name ? character.name : "No Name"}</span>
                    <span>
                      {character.gender
                        ? ` -${character.gender}-`
                        : " No gender"}
                    </span>
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
