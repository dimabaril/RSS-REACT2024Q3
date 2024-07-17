import { afterEach, beforeEach, describe, expect, it } from "vitest";

import {
  updatePageParamFromLS,
  updateSearchParamsFromLS,
} from "./updateSearchParamFromLS";

describe("updateSearchParamsFromLS", () => {
  beforeEach(() => {
    localStorage.clear();
  });
  afterEach(() => {
    localStorage.clear();
  });

  it('sets and remove the "q" parameter from localStorage', async () => {
    localStorage.setItem("searchText", "test");
    expect(window.location.href).not.toContain("?q=test");
    updateSearchParamsFromLS();
    expect(window.location.href).toContain("?q=test");
    localStorage.removeItem("searchText");
    updateSearchParamsFromLS();
    expect(window.location.href).not.toContain("?q=test");
  });

  it('sets and remove the "page" parameter from localStorage', () => {
    localStorage.setItem("page", "2");
    expect(window.location.href).not.toContain("?page=2");
    updatePageParamFromLS();
    expect(window.location.href).toContain("page=2");
    localStorage.removeItem("page");
    updatePageParamFromLS();
    expect(window.location.href).not.toContain("page=2");
  });

  it('sets both "q" and "page" parameters from localStorage', () => {
    localStorage.setItem("searchText", "test");
    localStorage.setItem("page", "2");
    updateSearchParamsFromLS();
    updatePageParamFromLS();
    expect(window.location.href).toContain("page=2");
    expect(window.location.href).toContain("q=test");
  });

  it('set and removes both "q" and "page" parameters from localStorage', () => {
    localStorage.setItem("searchText", "test");
    localStorage.setItem("page", "2");
    updateSearchParamsFromLS();
    updatePageParamFromLS();
    expect(window.location.href).toContain("page=2");
    expect(window.location.href).toContain("q=test");
    localStorage.removeItem("searchText");
    localStorage.removeItem("page");
    updateSearchParamsFromLS();
    updatePageParamFromLS();
    expect(window.location.href).not.toContain("page=2");
    expect(window.location.href).not.toContain("q=test");
  });
});
