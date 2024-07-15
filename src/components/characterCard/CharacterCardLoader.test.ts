import { describe, expect, it, vi } from "vitest";

import { Character } from "../../interfaces/interfaces";
import * as api from "../../services/api";
import { characterCardLoader } from "./CharacterCardLoader";

vi.mock("../../services/api", () => ({
  fetchSWPerson: vi.fn(),
}));

describe("characterCardLoader", () => {
  it("loads character data successfully", async () => {
    const mockCharacter: Character = {
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

    const mockRequest = new Request("http://example.com");

    vi.mocked(api.fetchSWPerson).mockResolvedValue(mockCharacter);

    const result = await characterCardLoader({
      params: { id: "1" },
      request: mockRequest,
    });

    expect(result).toEqual({ character: mockCharacter, id: "1" });
    expect(api.fetchSWPerson).toHaveBeenCalledWith("1");
  });

  it("throws an error if URL parameter is missing", async () => {
    const mockRequest = new Request("http://example.com");
    try {
      await characterCardLoader({ params: {}, request: mockRequest });
    } catch (error) {
      const typedError = error as Error; // Type assertion
      expect(typedError).toBeInstanceOf(Error);
      expect(typedError.message).toBe("URL parameter is missing");
    }
  });

  it("throws a 404 error if the character is not found", async () => {
    const mockRequest = new Request("http://example.com");
    vi.mocked(api.fetchSWPerson);

    try {
      await characterCardLoader({
        params: { id: "999" },
        request: mockRequest,
      });
    } catch (error) {
      const typedError = error as Response; // Type assertion
      expect(typedError).toBeInstanceOf(Response);
      expect(typedError.status).toBe(404);
      expect(typedError.statusText).toBe("Not Found");
    }
  });
});
