export const updateSearchParamsFromLS = () => {
  const currentUrl = new URL(window.location.href);

  const search = localStorage.getItem("searchText");

  if (search) {
    currentUrl.searchParams.set("q", search);
  } else {
    currentUrl.searchParams.delete("q");
  }

  window.history.replaceState({ path: currentUrl.href }, "", currentUrl.href);
};

export const updatePageParamFromLS = () => {
  const currentUrl = new URL(window.location.href);

  const page = localStorage.getItem("page");

  if (page) {
    currentUrl.searchParams.set("page", page);
  } else {
    currentUrl.searchParams.delete("page");
  }

  window.history.replaceState({ path: currentUrl.href }, "", currentUrl.href);
};
