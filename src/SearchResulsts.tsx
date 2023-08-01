import { useAtomValue } from "jotai";

import { isLoadingAtom } from "../stores/isLoading";
import { searchResAtom } from "../stores/searchRes";
import { GHUser } from "./GHUser";
import { currentSearchParams } from "../lib/useSearch";

export function SearchResults() {
  const searchResults = useAtomValue(searchResAtom);
  const isLoading = useAtomValue(isLoadingAtom);
  return (
    <div className="flex min-h-screen min-h-screen flex-col items-center bg-gray-50 text-slate-700">
      {searchResults.users[0] && !isLoading && (
        <ul className="mt-[110px] flex h-full flex-col items-center">
          {searchResults.users.map((u, i) => (
            <GHUser user={u} tabIndex={i} key={u.id} />
          ))}
        </ul>
      )}
      {isLoading && <div className="my-auto">Loading...</div>}
      {!isLoading && !searchResults.users[0] && !searchResults.error && (
        <div className="my-auto">Enter username to start searching</div>
      )}
      {!searchResults.users[0] &&
        !searchResults.error &&
        !isLoading &&
        currentSearchParams.query !== "" && (
          <div className="my-auto">No users matching your request</div>
        )}
      <div className="my-auto">
        {searchResults.error && !isLoading && searchResults.error}
      </div>
    </div>
  );
}
