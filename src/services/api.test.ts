import { describe, expect, it, vi } from "vitest";

import { fetchSwCharacterDetails, fetchSwCharacters } from "./api";

global.fetch = vi.fn();

describe("fetchSWPeople", () => {
  it("fetches characters successfully", async () => {
    const mockCharactersResponse = {
      count: 0,
      next: null,
      previous: null,
      results: [],
    };

    vi.mocked(fetch).mockResolvedValueOnce({
      ok: true,
      json: async () => mockCharactersResponse,
    } as Response);

    const response = await fetchSwCharacters();
    expect(response).toEqual(mockCharactersResponse);
    expect(fetch).toHaveBeenCalledWith(
      expect.objectContaining({ href: "https://swapi.dev/api/people/" }),
    );
  });

  it("throws an error when response is not ok", async () => {
    vi.mocked(fetch).mockResolvedValueOnce({
      ok: false,
      status: 404,
    } as Response);

    await expect(fetchSwCharacters()).rejects.toThrow(
      "Network response wasn't ok: 404",
    );
  });
});

describe("fetchSWPerson", () => {
  it("fetches a single character successfully", async () => {
    const mockCharacter = {
      name: "Luke Skywalker",
    };

    vi.mocked(fetch).mockResolvedValueOnce({
      ok: true,
      json: async () => mockCharacter,
    } as Response);

    const response = await fetchSwCharacterDetails("1");
    expect(response).toEqual(mockCharacter);
    expect(fetch).toHaveBeenCalledWith("https://swapi.dev/api/people/1");
  });

  it("throws an error when response is not ok", async () => {
    vi.mocked(fetch).mockResolvedValueOnce({
      ok: false,
      status: 404,
    } as Response);

    await expect(fetchSwCharacterDetails("1")).rejects.toThrow(
      "Network response wasn't ok: 404",
    );
  });
});
