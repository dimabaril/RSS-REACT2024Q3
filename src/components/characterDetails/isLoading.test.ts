import { matchPath } from "react-router-dom";
import { describe, expect, it } from "vitest";

describe("CharacterDetails isLoading", () => {
  it("should be true when navigation state is 'loading' and path matches '/people/:id'", () => {
    const navigation = {
      state: "loading",
      location: {
        pathname: "/people/1",
      },
    };

    const isLoading =
      navigation.state === "loading" &&
      matchPath("/people/:id", navigation.location.pathname);

    expect(isLoading).toBeTruthy();
  });

  it("should be false when navigation state is not 'loading'", () => {
    const navigation = {
      state: "idle",
      location: {
        pathname: "/people/1",
      },
    };

    const isLoading =
      navigation.state === "loading" &&
      matchPath("/people/:id", navigation.location.pathname);

    expect(isLoading).toBeFalsy();
  });

  it("should be false when path does not match '/people/:id'", () => {
    const navigation = {
      state: "loading",
      location: {
        pathname: "/not-matching",
      },
    };

    const isLoading =
      navigation.state === "loading" &&
      matchPath("/people/:id", navigation.location.pathname);

    expect(isLoading).toBeFalsy();
  });
});
