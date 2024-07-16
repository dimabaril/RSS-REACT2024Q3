import { afterEach, beforeEach, describe, expect, it } from "vitest";

import updateSearchParamsFromLS from "./updateSearchParamFromLS";

describe("updateSearchParamsFromLS", () => {
  beforeEach(() => {
    localStorage.clear();
    window.location.href = "http://example.com/";
  });
  afterEach(() => {
    localStorage.clear();
  });

  it('sets the "q" parameter from localStorage', async () => {
    localStorage.setItem("searchText", "test");
    updateSearchParamsFromLS();
    expect(window.location.href).toContain("?q=test");
  });

  it('sets the "page" parameter from localStorage', () => {
    localStorage.setItem("page", "2");
    updateSearchParamsFromLS();
    expect(window.location.href).toContain("?page=2");
  });

  it('sets both "q" and "page" parameters from localStorage', () => {
    localStorage.setItem("searchText", "test");
    localStorage.setItem("page", "2");
    updateSearchParamsFromLS();
    expect(window.location.href).toContain("?page=2&q=test");
  });

  it('removes "q" parameter if not in localStorage', () => {
    localStorage.setItem("page", "2");
    window.location.href = "http://example.com/?q=old";
    updateSearchParamsFromLS();
    expect(window.location.href).toContain("?page=2");
    expect(window.location.href).not.toContain("q=old");
  });

  it('removes "page" parameter if not in localStorage', () => {
    localStorage.setItem("searchText", "test");
    window.location.href = "http://example.com/?page=1";
    updateSearchParamsFromLS();
    expect(window.location.href).toContain("?q=test");
    expect(window.location.href).not.toContain("page=1");
  });

  it('removes both "q" and "page" parameters if not in localStorage', () => {
    window.location.href = "http://example.com/?q=old&page=1";
    updateSearchParamsFromLS();
    expect(window.location.href).not.toContain("q=old");
    expect(window.location.href).not.toContain("page=1");
  });
});
