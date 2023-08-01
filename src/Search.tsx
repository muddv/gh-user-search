import { useState, useRef } from "react";
import { useSetAtom } from "jotai";

import { isLoadingAtom } from "../stores/isLoading";
import { searchResAtom } from "../stores/searchRes";
import { pagesAtom } from "../stores/pages";
import { performSearch, currentSearchParams } from "../lib/useSearch";
import { debounce } from "../lib/debounce";
import down from "./assets/down.svg";
import { currentPageAtom } from "../stores/pages";
import search from "./assets/search.svg";
import menu from "./assets/menu.svg";

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
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      //@ts-ignore
      !sortDropdown.current.contains(e.target)
    ) {
      setOpened(false);
    }
  }
  document.addEventListener("mousedown", closeSortDropdown);
  return (
    <div ref={sortDropdown} className="m-2 mr-20 md:ml-32">
      <span className="hidden md:block">
        Sort by repositories,
        <span className="ml-1 w-fit border-2 border-slate-900 md:fixed">
          <button
            className="hidden w-32 md:flex"
            onClick={() => {
              setOpened(!isOpened);
            }}
          >
            <span className="w-5">{currentSelection}</span>
            <img
              className="relative left-[70px]"
              alt="Open dropdown"
              src={down}
            />
          </button>
        </span>
      </span>
      <button className="mx-auto h-10 w-10 md:hidden">
        <img
          className="mb-10"
          width="25"
          height="25"
          src={menu}
          onClick={() => {
            setOpened(!isOpened);
          }}
        />
      </button>
      <ul
        className={
          isOpened
            ? "fixed bg-slate-800 -ml-[60px] w-[100px] top-16 text-slate-50 lg:ml-[157px] lg:w-[120px] md:top-[101px]"
            : "hidden"
        }
      >
        <div className="rounded-b-lg border border-slate-700 bg-slate-700 lg:hidden">
          Sort by repositories
        </div>
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
    performSearch(
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
    <div>
      <form
        className="max-w-screen fixed flex h-20 w-screen justify-center rounded-b-lg bg-slate-500 pt-4 text-neutral-50 shadow-xl md:grid md:h-28 md:grid-rows-2"
        onSubmit={(e) => e.preventDefault()}
      >
        <span className="flex md:-ml-[90px]">
          <label className="ml-24 mr-1 mt-2 md:mr-2" htmlFor="username">
            Username
          </label>
          <span className="flex h-[45px] rounded-lg border-2 border-neutral-50 bg-neutral-50 p-2 text-slate-950 focus:shadow-md md:w-[35rem]">
            <input
              type="text"
              name="username"
              placeholder="panda_coder"
              onChange={(e) => {
                debounceHandle(e.target.value);
              }}
              className="bg-neutral-50 md:w-[34rem]"
              id="username"
            />
            <button className="ml-auto" onClick={() => debounceHandle()}>
              <img width="25" height="25" alt="search" src={search} />
            </button>
          </span>
        </span>
        <SortDropdown callback={changeSortOrder} />
      </form>
    </div>
  );
}
