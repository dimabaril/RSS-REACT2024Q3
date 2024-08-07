import type { AppProps } from "next/app";
import React, { FC } from "react";
import { Provider } from "react-redux";

import { wrapper } from "../app/store";
import { ThemeProvider } from "../contexts/ThemeContext";
import "../index.scss";

const MyApp: FC<AppProps> = ({ Component, ...rest }) => {
  const { store, props } = wrapper.useWrappedStore(rest);
  return (
    <ThemeProvider>
      <Provider store={store}>
        <Component {...props.pageProps} />
      </Provider>
    </ThemeProvider>
  );
};

export default MyApp;
