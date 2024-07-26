import {
  fireEvent,
  render,
  screen,
  waitFor,
  within,
} from "@testing-library/react";
import { Provider } from "react-redux";
import { RouterProvider, createMemoryRouter } from "react-router-dom";
import { describe, expect, it } from "vitest";

import { store } from "../app/store.ts";
import { ThemeProvider } from "../contexts/ThemeContext.tsx";
import { router, routs } from "../router.tsx";

describe("CharacterDetails Component", () => {
  it("displays loading indicator while fetching data main page", async () => {
    render(
      <ThemeProvider>
        <Provider store={store}>
          <RouterProvider
            router={router}
            fallbackElement={<div>Loading...</div>}
          />
        </Provider>
      </ThemeProvider>,
    );

    await waitFor(() => {
      expect(screen.getByText("Loading...")).toBeInTheDocument();
    });
  });

  it("displays correct number of cards", async () => {
    render(
      <ThemeProvider>
        <Provider store={store}>
          <RouterProvider
            router={router}
            fallbackElement={<div>Loading...</div>}
          />
        </Provider>
      </ThemeProvider>,
    );

    await waitFor(() => {
      expect(screen.getAllByRole("link").length).toBe(10);
    });
  });

  it("displays hint when no character is selected", async () => {
    render(
      <ThemeProvider>
        <Provider store={store}>
          <RouterProvider
            router={router}
            fallbackElement={<div>Loading...</div>}
          />
        </Provider>
      </ThemeProvider>,
    );
    await waitFor(() => {
      expect(
        screen.getByText("Select some persona, for details"),
      ).toBeInTheDocument();
    });
  });

  it("displays loading indicator while fetching personal data", async () => {
    const router = createMemoryRouter(routs, {
      initialEntries: ["/people/1"],
      initialIndex: 0,
    });
    render(
      <ThemeProvider>
        <Provider store={store}>
          <RouterProvider
            router={router}
            fallbackElement={<div>Loading...</div>}
          />
        </Provider>
      </ThemeProvider>,
    );

    await waitFor(() => {
      const detailsContainer = screen.getByTestId("character-details");
      expect(
        within(detailsContainer).getByText("Loading..."),
      ).toBeInTheDocument();
    });
  });

  it("displays correct personal data after fetching", async () => {
    const router = createMemoryRouter(routs, {
      initialEntries: ["/people/1"],
      initialIndex: 0,
    });
    render(
      <ThemeProvider>
        <Provider store={store}>
          <RouterProvider
            router={router}
            fallbackElement={<div>Loading...</div>}
          />
        </Provider>
      </ThemeProvider>,
    );

    await waitFor(() => {
      const characterDetailsContainer = screen.getByTestId("character-details");
      expect(
        within(characterDetailsContainer).getByText("birth year: 19BBY"),
      ).toBeInTheDocument();
      expect(
        within(characterDetailsContainer).getByText("gender: male"),
      ).toBeInTheDocument();
      expect(
        within(characterDetailsContainer).getByText("height: 172 cm."),
      ).toBeInTheDocument();
      expect(
        within(characterDetailsContainer).getByText("mass: 77 kg."),
      ).toBeInTheDocument();
      expect(
        within(characterDetailsContainer).getByText("skin color: fair"),
      ).toBeInTheDocument();
      expect(
        within(characterDetailsContainer).getByText("hair color: blond"),
      ).toBeInTheDocument();
      expect(
        within(characterDetailsContainer).getByText("eye color: blue"),
      ).toBeInTheDocument();
    });
  });

  it("element is removed after click close button", async () => {
    const router = createMemoryRouter(routs, {
      initialEntries: ["/people/1"],
      initialIndex: 0,
    });
    render(
      <ThemeProvider>
        <Provider store={store}>
          <RouterProvider
            router={router}
            fallbackElement={<div>Loading...</div>}
          />
        </Provider>
      </ThemeProvider>,
    );

    await waitFor(() => {
      expect(screen.getByText("height: 172 cm.")).toBeInTheDocument();
      expect(screen.getByText("×")).toBeInTheDocument();
    });

    await waitFor(async () => {
      const close = screen.getByText("×");
      fireEvent.click(close);
    });

    await waitFor(() => {
      expect(screen.queryByText("height: 172 cm.")).not.toBeInTheDocument();
      expect(screen.queryByText("×")).not.toBeInTheDocument();
    });
  });

  it("element is removed after click away from card", async () => {
    const router = createMemoryRouter(routs, {
      initialEntries: ["/people/1"],
      initialIndex: 0,
    });
    render(
      <ThemeProvider>
        <Provider store={store}>
          <RouterProvider
            router={router}
            fallbackElement={<div>Loading...</div>}
          />
        </Provider>
      </ThemeProvider>,
    );

    await waitFor(() => {
      expect(screen.getByText("height: 172 cm.")).toBeInTheDocument();
      expect(screen.getByText("×")).toBeInTheDocument();
    });

    await waitFor(async () => {
      const body = document.body;
      fireEvent.click(body);
    });

    await waitFor(() => {
      expect(screen.queryByText("height: 172 cm.")).not.toBeInTheDocument();
      expect(screen.queryByText("×")).not.toBeInTheDocument();
    });
  });

  it("displays 404 page when user navigates to non-existing route", async () => {
    const router = createMemoryRouter(routs, {
      initialEntries: ["/people/12345"],
      initialIndex: 0,
    });
    render(
      <ThemeProvider>
        <Provider store={store}>
          <RouterProvider
            router={router}
            fallbackElement={<div>Loading...</div>}
          />
        </Provider>
      </ThemeProvider>,
    );

    await waitFor(() => {
      expect(screen.getByText(/Not found/)).toBeInTheDocument();
    });
  });

  it("displays search result ?search=lu", async () => {
    const router = createMemoryRouter(routs, {
      initialEntries: ["/?search=lu"],
      initialIndex: 0,
    });
    render(
      <ThemeProvider>
        <Provider store={store}>
          <RouterProvider
            router={router}
            fallbackElement={<div>Loading...</div>}
          />
        </Provider>
      </ThemeProvider>,
    );

    await waitFor(() => {
      expect(screen.getAllByRole("link").length).toBe(2);
    });
  });

  it("displays search result ?search=unknown", async () => {
    const router = createMemoryRouter(routs, {
      initialEntries: ["/?search=unknown"],
      initialIndex: 0,
    });
    render(
      <ThemeProvider>
        <Provider store={store}>
          <RouterProvider
            router={router}
            fallbackElement={<div>Loading...</div>}
          />
        </Provider>
      </ThemeProvider>,
    );

    await waitFor(() => {
      expect(screen.getByText("No results found")).toBeInTheDocument();
    });
  });
});
