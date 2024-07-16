import { describe, expect, it, vi } from "vitest";

import { fetchSWPerson } from "../../services/api";
import { mockedCharacterDetailResponse } from "../../test/mocks";
import { characterCardLoader } from "./CharacterCardLoader";

vi.mock("../../services/api", () => ({
  fetchSWPerson: vi.fn(),
}));

describe("characterCardLoader", () => {
  it("loads character data successfully", async () => {
    const mockRequest = new Request("http://example.com");

    vi.mocked(fetchSWPerson).mockResolvedValue(mockedCharacterDetailResponse);

    const result = await characterCardLoader({
      params: { id: "1" },
      request: mockRequest,
    });

    expect(result).toEqual({
      character: mockedCharacterDetailResponse,
      id: "1",
    });
    expect(fetchSWPerson).toHaveBeenCalledWith("1");
  });

  it("throws an error if URL parameter is missing", async () => {
    const mockRequest = new Request("http://example.com");
    try {
      await characterCardLoader({ params: {}, request: mockRequest });
    } catch (error) {
      const typedError = error as Error;
      expect(typedError).toBeInstanceOf(Error);
      expect(typedError.message).toBe("URL parameter is missing");
    }
  });

  it("throws a 404 error if the character is not found", async () => {
    const mockRequest = new Request("http://example.com");
    vi.mocked(fetchSWPerson).mockRejectedValue(
      new Response("", {
        status: 404,
        statusText: "Not Found",
      }),
    );

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
