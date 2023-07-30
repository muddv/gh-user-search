import { useAtomValue } from "jotai";

import { isLoadingAtom } from "../stores/isLoading";
import { searchResAtom } from "../stores/searchRes";
import { GHUser } from "./GHUser";

export function SearchResults() {
  const searchResults = useAtomValue(searchResAtom);
  const isLoading = useAtomValue(isLoadingAtom);
  return (
    <div className="flex min-h-screen min-h-screen flex-col items-center bg-gray-50 text-slate-700">
      {isLoading && <div className="my-auto">Loading...</div>}
      {!isLoading && !searchResults.users[0] && !searchResults.error && (
        <div className="my-auto">Enter username to start searching</div>
      )}
      {searchResults.users[0] && !isLoading && (
        <ul className="mt-[110px] flex h-full flex-col items-center">
          {searchResults.users.map((u) => (
            <GHUser {...u} key={u.id} />
          ))}
        </ul>
      )}
      <div className="w-56 my-auto">
        {searchResults.error && !isLoading && searchResults.error}
      </div>
    </div>
  );
}
