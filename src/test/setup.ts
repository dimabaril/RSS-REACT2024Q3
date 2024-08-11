import "@testing-library/jest-dom/vitest";
import { cleanup } from "@testing-library/react";
import { setupServer } from "msw/node";
import mockRouter from "next-router-mock";
import { createDynamicRouteParser } from "next-router-mock/dynamic-routes";
import { afterAll, afterEach, beforeAll, vi } from "vitest";

import { handlers } from "./mock/handlers";

const server = setupServer(...handlers);

beforeAll(() => server.listen());
afterEach(() => {
  server.resetHandlers();
  cleanup();
});
afterAll(() => server.close());

global.URL.createObjectURL = vi.fn();

vi.mock("next/navigation", () => require("next-router-mock"));
mockRouter.useParser(createDynamicRouteParser(["/", "/people/[id]"]));
