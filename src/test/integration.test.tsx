import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { Provider } from "react-redux";
import { RouterProvider, createMemoryRouter } from "react-router-dom";
import { describe, expect, it } from "vitest";

import { store } from "../app/store.ts";
import { router, routs } from "../router.tsx";

describe("CharacterDetails Component", () => {
  it("displays correct number of cards", async () => {
    render(
      <Provider store={store}>
        <RouterProvider
          router={router}
          fallbackElement={<div>Loading...</div>}
        />
      </Provider>,
    );
    await waitFor(() => {
      expect(screen.getAllByRole("link").length).toBe(10);
    });
  });

  it("displays loading indicator while fetching data main page", async () => {
    render(
      <Provider store={store}>
        <RouterProvider
          router={router}
          fallbackElement={<div>Loading...</div>}
        />
      </Provider>,
    );
    await waitFor(() => {
      expect(
        screen.getByText("Select some persona, for details"),
      ).toBeInTheDocument();
    });
  });

  it("displays hint when no character is selected", async () => {
    render(
      <Provider store={store}>
        <RouterProvider
          router={router}
          fallbackElement={<div>Loading...</div>}
        />
      </Provider>,
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
      <Provider store={store}>
        <RouterProvider
          router={router}
          fallbackElement={<div>Loading...</div>}
        />
      </Provider>,
    );

    await waitFor(() => {
      expect(screen.getByText("Loading...")).toBeInTheDocument();
    });
  });

  it("displays correct personal data after fetching", async () => {
    const router = createMemoryRouter(routs, {
      initialEntries: ["/people/1"],
      initialIndex: 0,
    });
    render(
      <Provider store={store}>
        <RouterProvider
          router={router}
          fallbackElement={<div>Loading...</div>}
        />
      </Provider>,
    );

    await waitFor(() => {
      expect(screen.getByText("birth year: 19BBY")).toBeInTheDocument();
      expect(screen.getByText("height: 172 cm.")).toBeInTheDocument();
      expect(screen.getByText("mass: 77 kg.")).toBeInTheDocument();
      expect(screen.getByText("skin color: fair")).toBeInTheDocument();
      expect(screen.getByText("hair color: blond")).toBeInTheDocument();
      expect(screen.getByText("eye color: blue")).toBeInTheDocument();
      expect(screen.getByText("×")).toBeInTheDocument();
    });
  });

  it("element is removed after click close button", async () => {
    const router = createMemoryRouter(routs, {
      initialEntries: ["/people/1"],
      initialIndex: 0,
    });
    render(
      <Provider store={store}>
        <RouterProvider
          router={router}
          fallbackElement={<div>Loading...</div>}
        />
      </Provider>,
    );

    await waitFor(() => {
      expect(screen.getByText("birth year: 19BBY")).toBeInTheDocument();
      expect(screen.getByText("height: 172 cm.")).toBeInTheDocument();
      expect(screen.getByText("×")).toBeInTheDocument();
    });

    await waitFor(async () => {
      const close = screen.getByText("×");
      fireEvent.click(close);
    });

    await waitFor(() => {
      expect(screen.queryByText("birth year: 19BBY")).not.toBeInTheDocument();
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
      <Provider store={store}>
        <RouterProvider
          router={router}
          fallbackElement={<div>Loading...</div>}
        />
      </Provider>,
    );

    await waitFor(() => {
      expect(screen.getByText("birth year: 19BBY")).toBeInTheDocument();
      expect(screen.getByText("height: 172 cm.")).toBeInTheDocument();
      expect(screen.getByText("×")).toBeInTheDocument();
    });

    await waitFor(async () => {
      const body = document.body;
      fireEvent.click(body);
    });

    await waitFor(() => {
      expect(screen.queryByText("birth year: 19BBY")).not.toBeInTheDocument();
      expect(screen.queryByText("height: 172 cm.")).not.toBeInTheDocument();
      expect(screen.queryByText("×")).not.toBeInTheDocument();
    });
  });

  it("displays 404 page when user navigates to non-existing route", async () => {
    const router = createMemoryRouter(routs, {
      initialEntries: ["/unknown"],
      initialIndex: 0,
    });
    render(
      <Provider store={store}>
        <RouterProvider
          router={router}
          fallbackElement={<div>Loading...</div>}
        />
      </Provider>,
    );

    await waitFor(() => {
      expect(screen.getByText("Not Found")).toBeInTheDocument();
    });
  });
});
