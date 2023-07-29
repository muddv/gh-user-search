import { useState, useRef } from "react";
import { useSetAtom } from "jotai";

import { isLoadingAtom } from "../stores/isLoading";
import { searchResAtom } from "../stores/searchRes";
import { pagesAtom } from "../stores/pages";
import { useSearch, currentSearchParams } from "../lib/useSearch";
import { debounce } from "../lib/debounce";
import down from "./assets/down.svg";
import { currentPageAtom } from "../stores/pages";

// no need for a generic dropdown component,
// values can be hard coded for
// this use case
type SortDropdownProps = {
  callback: () => void;
};

function SortDropdown(props: SortDropdownProps) {
  const [isOpened, setOpened] = useState(false);
  const [currentSelection, setCurrentSelection] = useState("Descending");
  const sortDropdown = useRef(null);
  const selectedCls = "bg-red-500";
  function closeSortDropdown(e: Event) {
    if (
      sortDropdown.current &&
      isOpened &&
      //@ts-ignore
      !sortDropdown.current.contains(e.target)
    ) {
      setOpened(false);
    }
  }
  document.addEventListener("mousedown", closeSortDropdown);
  return (
    <div ref={sortDropdown} className="">
      Sort by repositories,
      <span className="fixed ml-1 w-32 border-2 border-slate-900">
        <button
          className="mx-auto flex  w-fit"
          onClick={() => {
            setOpened(!isOpened);
          }}
        >
          {currentSelection}
          <img className="mr-auto" alt="Open dropdown" src={down} />
        </button>
        <ul className={isOpened ? "bg-slate-800 text-slate-50" : "hidden"}>
          <li
            onClick={() => {
              setCurrentSelection("Descending");
              props.callback();
            }}
            className={`cursor-pointer ${
              currentSelection === "Descending" && selectedCls
            }`}
          >
            Descending
          </li>
          <li
            onClick={() => {
              setCurrentSelection("Ascending");
              props.callback();
            }}
            className={`cursor-pointer ${
              currentSelection === "Ascending" && selectedCls
            }`}
          >
            Ascending
          </li>
        </ul>
      </span>
    </div>
  );
}

export function Search() {
  const setLoading = useSetAtom(isLoadingAtom);
  const setSearchRes = useSetAtom(searchResAtom);
  const setPages = useSetAtom(pagesAtom);
  const setCurrentPage = useSetAtom(currentPageAtom);

  async function handleSearch(query?: string) {
    currentSearchParams.page = 1;
    query && (currentSearchParams.query = query);
    useSearch(
      currentSearchParams,
      setLoading,
      setSearchRes,
      setCurrentPage,
      setPages,
    );
  }

  const debounceHandle = debounce(handleSearch, 250);

  function changeSortOrder() {
    currentSearchParams.desc = !currentSearchParams.desc;
    handleSearch();
  }

  return (
    <div className="">
      <form
        className="fixed top-0 flex w-screen rounded-b-lg bg-slate-500 text-neutral-50 shadow-xl"
        onSubmit={(e) => e.preventDefault()}
      >
        <div className="mx-auto my-5 flex">
          <label className="mr-5 mt-2" htmlFor="username">
            Username{" "}
          </label>
          <input
            type="text"
            name="username"
            placeholder="panda_coder"
            onChange={(e) => {
              debounceHandle(e.target.value);
            }}
            className="h-[45px] w-[35rem] rounded border-2 border-gray-800 bg-neutral-50 p-2 text-slate-950 focus:shadow-md focus:outline-none"
          />
          <div className="ml-5 mt-2">
            <SortDropdown callback={changeSortOrder} />
          </div>
        </div>
      </form>
    </div>
  );
}
