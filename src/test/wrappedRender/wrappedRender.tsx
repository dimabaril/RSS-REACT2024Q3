import { render } from "@testing-library/react";
import type { RenderOptions } from "@testing-library/react";
import { MemoryRouterProvider } from "next-router-mock/MemoryRouterProvider";
import { PropsWithChildren, ReactElement } from "react";
import { Provider } from "react-redux";

import { AppStore, makeStore } from "../../app/store";
import { ThemeProvider } from "../../contexts/ThemeContext";

interface ExtendedRenderOptions extends Omit<RenderOptions, "queries"> {
  store?: AppStore;
}

export function renderWithProviders(
  ui: ReactElement,
  { store = makeStore(), ...renderOptions }: ExtendedRenderOptions = {},
) {
  function Wrapper({ children }: PropsWithChildren<object>): JSX.Element {
    return (
      <MemoryRouterProvider>
        <ThemeProvider>
          <Provider store={store}>{children}</Provider>
        </ThemeProvider>
      </MemoryRouterProvider>
    );
  }
  return { store, ...render(ui, { wrapper: Wrapper, ...renderOptions }) };
}
