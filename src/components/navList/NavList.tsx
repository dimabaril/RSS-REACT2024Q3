"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";

import { PATH } from "../../constants";
import { Characters } from "../../interfaces/interfaces";
import CharacterShort from "../characterShort/CharacterShort";
import "./NavList.scss";

interface ContentProps {
  characters: Characters;
}

export default function NavList({ characters }: ContentProps) {
  const searchParams = useSearchParams();

  return (
    <>
      {characters.results.length === 0 ? (
        <div className="nav-list" data-testid="nav-list">
          No results found
        </div>
      ) : (
        <>
          <ul className="nav-list" data-testid="nav-list">
            {characters.results.map((character) => {
              const Id = character.url.split("/").filter(Boolean).pop();
              return (
                <li
                  key={character.url.toString()}
                  className="nav-list__item"
                  data-testid="nav-list__item"
                >
                  <Link
                    href={`${PATH.ROOT}${PATH.PEOPLE}${Id}${searchParams?.size ? "?" + searchParams.toString() : ""}`}
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
