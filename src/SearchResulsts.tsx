import { useAtomValue } from "jotai";

import { searchResAtom } from "../stores/searchRes";
import { GHUser } from "./GHUser";

export function SearchResults() {
  const searchResults = useAtomValue(searchResAtom);
  return (
    <>
      {!searchResults.users[0] && !searchResults.error && (
        <div>Enter username to start searching</div>
      )}
      {searchResults.users[0] && (
        <ul className="flex h-full mt-[100px] flex-col items-center">
          {searchResults.users.map((u) => (
            <GHUser {...u} key={u.id} />
          ))}
        </ul>
      )}
      <div className="w-56">{searchResults.error && searchResults.error}</div>
    </>
  );
}
