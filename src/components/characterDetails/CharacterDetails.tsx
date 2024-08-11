import Image from "next/image";

import "../../components/characterDetails/CharacterDetails.scss";
import { getSWCharacterImageUrlById } from "../../helpers/getSWImageUrlById";
import { getCharacterDetailById } from "../../services/starwarsApi";
import CloseButton from "./closeButton/CloseButton";

export default async function CharacterDetails({
  params,
}: {
  params: Record<string, string>;
}) {
  const { id } = params;

  const characterDetails = await getCharacterDetailById(Number(id));

  return (
    <>
      <section className="character-card" data-testid="character-details">
        <ul className="character-card__description">
          <div className="character-card__name">{characterDetails.name}</div>
          <li className="character-card__description-item">
            birth year: {characterDetails.birth_year}
          </li>
          <li className="character-card__description-item">
            gender: {characterDetails.gender}
          </li>
          <li className="character-card__description-item">
            height: {characterDetails.height} cm.
          </li>
          <li className="character-card__description-item">
            mass: {characterDetails.mass} kg.
          </li>
          <li className="character-card__description-item">
            skin color: {characterDetails.skin_color}
          </li>
          <li className="character-card__description-item">
            hair color: {characterDetails.hair_color}
          </li>
          <li className="character-card__description-item">
            eye color: {characterDetails.eye_color}
          </li>
        </ul>

        <div className="character-card__img">
          <Image
            src={getSWCharacterImageUrlById(Number(id))}
            alt="img"
            width={500}
            height={500}
          />
        </div>
        <CloseButton />
      </section>
    </>
  );
}
