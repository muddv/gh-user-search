import { useState } from "react";
import { useSetAtom } from "jotai";

import { searchResAtom } from "../stores/searchRes";
import { sendRequest } from "../lib/sendRequest";
import { debounce } from "../lib/debounce";
import { SearchResults } from "./SearchResulsts";

let q = "";
let page = 1;
let desc = true;

export function App() {
  const setSearchRes = useSetAtom(searchResAtom);
  const [isLoading, setLoading] = useState(false);

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
      console.log("no items");
      setSearchRes({ users: [], error: "No users match your request" });
      setLoading(false);
    }
    setSearchRes({ users: data.items, error: undefined });
    setLoading(false);
    return;
  }

  const debounceHandle = debounce(handleSearch, 250);
  return (
    <div className="mt-10 flex w-screen flex-col items-center justify-center">
      <form className="flex flex-col" onSubmit={(e) => e.preventDefault()}>
        <label htmlFor="usename">Enter username</label>
        <input
          type="text"
          name="username"
          placeholder="panda_coder"
          onChange={(e) => {
            debounceHandle(e.target.value);
          }}
          className="border-2 border-black p-2"
        />
        <fieldset
          onChange={() => {
            desc = !desc;
          }}
          className="flex flex-col"
        >
          <legend>Sort by:</legend>
          <div className="flex gap-5">
            <label htmlFor="desc">Number of repositories, descending</label>
            <input
              type="radio"
              name="order"
              id="desc"
              value="desc"
              defaultChecked
            />
          </div>
          <div className="flex gap-5">
            <label htmlFor="asc">Number of repositories, ascending</label>
            <input type="radio" name="order" id="asc" value="ascending" />
          </div>
        </fieldset>
      </form>
      {!isLoading ? <SearchResults /> : <div>Loading...</div>}
      <button
        className="border-2 border-black hover:bg-slate-300 active:bg-slate-400"
        onClick={() => {
          handleSearch(q);
        }}
      >
        load more
      </button>
    </div>
  );
}
