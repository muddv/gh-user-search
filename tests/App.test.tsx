import { describe, expect, it } from "vitest";
import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Provider as JotaiProvider } from "jotai";
import { useHydrateAtoms } from "jotai/utils";

import { customRender } from "./test-utils";
import { App } from "../src/App";
import { SearchResults } from "../src/SearchResulsts";
import { Search } from "../src/Search";
import { searchResAtom } from "../stores/searchRes";
import { currentSearchParams } from "../lib/useSearch";

type TestProviderProps = {
  initialValues: any;
  children: JSX.Element;
};

function HydrateAtoms({ initialValues, children }: TestProviderProps) {
  useHydrateAtoms(initialValues);
  return children;
}

function TestProvider({ initialValues, children }: TestProviderProps) {
  return (
    <JotaiProvider>
      <HydrateAtoms initialValues={initialValues}>{children}</HydrateAtoms>
    </JotaiProvider>
  );
}

function SearchResultsError() {
  return (
    <TestProvider
      initialValues={[[searchResAtom, { users: [], error: "error" }]]}
    >
      <SearchResults />
    </TestProvider>
  );
}

function SearchResultsNoneFound() {
  return (
    <TestProvider initialValues={[[searchResAtom, { users: [] }]]}>
      <SearchResults />
    </TestProvider>
  );
}

describe("Application renders", () => {
  it("displays placeholder", () => {
    customRender(<App />);
    expect(screen.getByText(/Enter username/i));
  });
});

describe("SearchResults communicates state", () => {
  it("displays error", () => {
    customRender(<SearchResultsError />);
    expect(screen.getByText("error"));
  });

  it('shows "no users found" message', () => {
    customRender(<SearchResultsNoneFound />);
    expect(screen.getByText("No users matching your request"));
  });
});

describe("Search uses debounce", () => {
  it("waits before sending request", () => {
    // ignore json type validation for now
    //@ts-ignore
    customRender(<Search />);
    const input = screen.getByPlaceholderText("panda_coder");
    userEvent.type(input, "test");
    expect(currentSearchParams.query).toBe("");
    setTimeout(() => {
      expect(currentSearchParams.query).toBe("test");
      userEvent.type(input, "test2");
      expect(currentSearchParams.query).toBe("test");
      userEvent.type(input, "test3");
      setTimeout(() => {
        expect(currentSearchParams.query).toBe("test3");
      }, 250);
    }, 250);
  });
});
