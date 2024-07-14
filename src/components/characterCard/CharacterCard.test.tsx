import { fireEvent, render, screen } from "@testing-library/react";
import { useLoaderData, useNavigate, useNavigation } from "react-router-dom";
import { beforeEach, describe, expect, it, vi } from "vitest";

import CharacterCard from "./CharacterCard";

vi.mock("react-router-dom", () => ({
  ...vi.importActual("react-router-dom"),
  useLoaderData: vi.fn(),
  useNavigate: vi.fn(),
  useNavigation: vi.fn(),
}));

describe("CharacterCard", () => {
  const mockCharacter = {
    name: "Luke Skywalker",
    height: "172",
    mass: "77",
    hair_color: "blond",
    skin_color: "fair",
    eye_color: "blue",
    birth_year: "19BBY",
    gender: "male",
    homeworld: "https://swapi.dev/api/planets/1/",
    films: [
      "https://swapi.dev/api/films/1/",
      "https://swapi.dev/api/films/2/",
      "https://swapi.dev/api/films/3/",
      "https://swapi.dev/api/films/6/",
    ],
    species: [],
    vehicles: [
      "https://swapi.dev/api/vehicles/14/",
      "https://swapi.dev/api/vehicles/30/",
    ],
    starships: [
      "https://swapi.dev/api/starships/12/",
      "https://swapi.dev/api/starships/22/",
    ],
    created: "2014-12-09T13:50:51.644000Z",
    edited: "2014-12-20T21:17:56.891000Z",
    url: "https://swapi.dev/api/people/1/",
  };

  beforeEach(() => {
    vi.mocked(useLoaderData).mockReturnValue({
      character: mockCharacter,
    });
    vi.mocked(useNavigate).mockReturnValue(vi.fn());
    vi.mocked(useNavigation).mockReturnValue({
      state: "idle",
      location: undefined,
      formMethod: undefined,
      formAction: undefined,
      formEncType: undefined,
      formData: undefined,
      json: undefined,
      text: undefined,
    });
  });

  it("renders the character data", () => {
    render(<CharacterCard />);
    expect(screen.getByText(mockCharacter.name)).toBeInTheDocument();
    expect(
      screen.getByText(`birth year: ${mockCharacter.birth_year}`),
    ).toBeInTheDocument();
    expect(
      screen.getByText(`gender: ${mockCharacter.gender}`),
    ).toBeInTheDocument();
    expect(
      screen.getByText(`height: ${mockCharacter.height} cm.`),
    ).toBeInTheDocument();
    expect(
      screen.getByText(`mass: ${mockCharacter.mass} kg.`),
    ).toBeInTheDocument();
    expect(
      screen.getByText(`skin color: ${mockCharacter.skin_color}`),
    ).toBeInTheDocument();
    expect(
      screen.getByText(`hair color: ${mockCharacter.hair_color}`),
    ).toBeInTheDocument();
    expect(
      screen.getByText(`eye color: ${mockCharacter.eye_color}`),
    ).toBeInTheDocument();
  });

  it("does not navigate when clicked inside the card", () => {
    const navigate = useNavigate();
    render(<CharacterCard />);
    fireEvent.click(screen.getByText(mockCharacter.name));
    expect(navigate).not.toHaveBeenCalled();
  });
});
