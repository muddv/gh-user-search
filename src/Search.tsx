import { useState, useRef } from "react";
import { useAtom, useSetAtom } from "jotai";

import { isLoadingAtom } from "../stores/isLoading";
import { searchResAtom } from "../stores/searchRes";
import { sendRequest } from "../lib/sendRequest";
import { debounce } from "../lib/debounce";
import { SearchResults } from "./SearchResulsts";
import down from "./assets/down.svg";

let q = "";
let page = 1;
let desc = true;

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
          className="flex w-fit  mx-auto"
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
  const setSearchRes = useSetAtom(searchResAtom);
  const setLoading = useSetAtom(isLoadingAtom);

  async function handleSearch(query: string) {
    setLoading(true);
    if (query === "") {
      setSearchRes({ users: [], error: undefined });
      setLoading(false);
      return;
    }
    q = query;
    const data = await sendRequest(query, page, desc);
    //page++;
    if (typeof data === "string") {
      setSearchRes({ users: [], error: data });
      setLoading(false);
      return;
    }
    if (!data.items[0]) {
      setSearchRes({ users: [], error: "No users match your request" });
      setLoading(false);
      return;
    }
    setSearchRes({ users: data.items, error: undefined });
    setLoading(false);
    return;
  }

  const debounceHandle = debounce(handleSearch, 250);

  return (
    <div className="">
      <form
        className="fixed top-0 flex w-screen bg-slate-500 shadow-xl text-neutral-50 rounded-b-lg"
        onSubmit={(e) => e.preventDefault()}
      >
        <div className="mx-auto my-5 flex">
          <label className="mr-5 mt-2" htmlFor="usename">
            Username{" "}
          </label>
          <input
            type="text"
            name="username"
            placeholder="panda_coder"
            onChange={(e) => {
              debounceHandle(e.target.value);
            }}
            className="h-[45px] w-[35rem] bg-neutral-50 rounded border-2 border-gray-800 p-2 focus:shadow-md focus:outline-none text-slate-950"
          />
          <div className="ml-5 mt-2">
            <SortDropdown
              callback={() => {
                desc = !desc;
              }}
            />
          </div>
        </div>
      </form>
      </div>
  );
}
