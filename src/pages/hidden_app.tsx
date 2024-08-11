import Cookies from "js-cookie";
import type { AppProps } from "next/app";
import { useRouter } from "next/navigation";
import React, { FC, useEffect } from "react";
import { Provider } from "react-redux";

import { wrapper } from "../app/store";
import { ThemeProvider } from "../contexts/ThemeContext";
import { useStateStorage } from "../hooks/useStateCookiesStorage";
import "../index.scss";

const MyApp: FC<AppProps> = ({ Component, ...rest }) => {
  const { store, props } = wrapper.useWrappedStore(rest);

  const [, , setStorageSearchTerm] = useStateStorage("searchTerm", "");
  const router = useRouter();

  useEffect(() => {
    const search = router.query.search;
    const savedSearch = Cookies.get("searchTerm");
    if (router.pathname !== "/") return;
    if (!search && savedSearch) {
      router.replace({
        pathname: router.pathname,
        query: { search: savedSearch },
      });
    } else if (search && search !== savedSearch) {
      setStorageSearchTerm(search as string);
    }
  }, [router, setStorageSearchTerm]);

  return (
    <ThemeProvider>
      <Provider store={store}>
        <Component {...props.pageProps} />
      </Provider>
    </ThemeProvider>
  );
};

export default MyApp;
