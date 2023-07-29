import { useAtomValue } from "jotai";

import { isLoadingAtom } from "../stores/isLoading";
import { searchResAtom } from "../stores/searchRes";
import { GHUser } from "./GHUser";

export function SearchResults() {
  const searchResults = useAtomValue(searchResAtom);
  const isLoading = useAtomValue(isLoadingAtom);
  return (
    <div className="text-slate-700 flex flex-col min-h-screen bg-gray-50 min-h-screen items-center justify-center">
      {isLoading && <div>Loading...</div>}
      {!isLoading && !searchResults.users[0] && !searchResults.error && (
        <div>Enter username to start searching</div>
      )}
      {searchResults.users[0] && (
        <ul className="flex h-full mt-[100px] flex-col items-center">
          {searchResults.users.map((u) => (
            <GHUser {...u} key={u.id} />
          ))}
        </ul>
      )}
      <div className="w-56">{(searchResults.error && !isLoading) && searchResults.error}</div>
    </div>
  );
}
