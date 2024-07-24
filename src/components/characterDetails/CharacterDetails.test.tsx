import { fireEvent, render, screen } from "@testing-library/react";
import { useLoaderData, useNavigate, useNavigation } from "react-router-dom";
import { describe, expect, it, vi } from "vitest";

import { mockedCharacterDetailResponse } from "../../test/mocks";
import CharacterDetails from "./CharacterDetails";

vi.mock("react-router-dom", () => ({
  ...vi.importActual("react-router-dom"),
  useLoaderData: vi.fn(),
  useNavigate: vi.fn(),
  useNavigation: vi.fn(),
}));

vi.mocked(useLoaderData).mockReturnValue({
  character: mockedCharacterDetailResponse,
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

describe("CharacterDetails", () => {
  it("renders the character data", () => {
    render(<CharacterDetails />);
    expect(
      screen.getByText(mockedCharacterDetailResponse.name),
    ).toBeInTheDocument();
    expect(
      screen.getByText(
        `birth year: ${mockedCharacterDetailResponse.birth_year}`,
      ),
    ).toBeInTheDocument();
    expect(
      screen.getByText(`gender: ${mockedCharacterDetailResponse.gender}`),
    ).toBeInTheDocument();
    expect(
      screen.getByText(`height: ${mockedCharacterDetailResponse.height} cm.`),
    ).toBeInTheDocument();
    expect(
      screen.getByText(`mass: ${mockedCharacterDetailResponse.mass} kg.`),
    ).toBeInTheDocument();
    expect(
      screen.getByText(
        `skin color: ${mockedCharacterDetailResponse.skin_color}`,
      ),
    ).toBeInTheDocument();
    expect(
      screen.getByText(
        `hair color: ${mockedCharacterDetailResponse.hair_color}`,
      ),
    ).toBeInTheDocument();
    expect(
      screen.getByText(`eye color: ${mockedCharacterDetailResponse.eye_color}`),
    ).toBeInTheDocument();
  });

  it("does not navigate when clicked inside the card", () => {
    const navigate = useNavigate();
    render(<CharacterDetails />);
    fireEvent.click(screen.getByText(mockedCharacterDetailResponse.name));
    expect(navigate).not.toHaveBeenCalled();
  });

  it("navigates when clicked outside the card", () => {
    const navigate = useNavigate();
    render(<CharacterDetails />);
    fireEvent.click(document.body);
    expect(navigate).toHaveBeenCalled();
  });
});
