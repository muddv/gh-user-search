import { cleanup, render } from "@testing-library/react";
import { afterEach } from "vitest";

afterEach(() => {
  cleanup();
});

export const customRender = (element: React.ReactElement, opts = {}) =>
  render(element, {
    wrapper: ({ children }) => children,
    ...opts,
  });
