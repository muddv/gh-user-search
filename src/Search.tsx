import { useState, useRef } from "react";
import { useSetAtom } from "jotai";

import { isLoadingAtom } from "../stores/isLoading";
import { searchResAtom } from "../stores/searchRes";
import { pagesAtom } from "../stores/pages";
import { useSearch, currentSearchParams } from "../lib/useSearch";
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
      //@ts-ignore
      !sortDropdown.current.contains(e.target)
    ) {
      setOpened(false);
    }
  }
  document.addEventListener("mousedown", closeSortDropdown);
  return (
    <div ref={sortDropdown} className="m-2 md:ml-32 mr-20">
      <span className="hidden md:block">
        Sort by repositories,
        <span className="ml-1 border-2 border-slate-900 w-fit md:fixed">
          <button
            className="hidden w-[120px] w-32 md:flex"
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
      <button className="md:hidden">
        <img
          src={menu}
          onClick={() => {
            setOpened(!isOpened);
          }}
        />
      </button>
      <ul
        className={
          isOpened
            ? "fixed bg-slate-800 text-slate-50 lg:ml-[155px] lg:w-[120px]"
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
        className="fixed md:grid md:grid-rows-2 flex w-screen justify-center rounded-b-lg h-20 md:h-28 bg-slate-500 text-neutral-50 shadow-xl pt-4"
        onSubmit={(e) => e.preventDefault()}
      >
        <span className="flex md:-ml-[90px]">
          <label className="mt-2 mr-4" htmlFor="username">
            Username
          </label>
          <span className="flex h-[45px] md:w-[35rem] rounded-lg border-2 border-neutral-50 bg-neutral-50 p-2 text-slate-950 focus:shadow-md">
            <input
              type="text"
              name="username"
              placeholder="panda_coder"
              onChange={(e) => {
                debounceHandle(e.target.value);
              }}
              className="md:w-[34rem] bg-neutral-50"
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
