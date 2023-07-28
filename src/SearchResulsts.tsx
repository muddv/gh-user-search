import { useAtomValue } from "jotai"

import { searchResAtom, searchErrAtom } from "../stores/searchRes"
import { GHUser } from "./GHUser"

export function SearchResults() {
  const searchResults = useAtomValue(searchResAtom)
  const searchError = useAtomValue(searchErrAtom)
  return (
    <>
      {(!searchResults[0] && !searchError) && <div>Enter username to start searching</div>}
      {searchResults[0] &&
        <ul className="w-screen flex flex-col items-center">{searchResults.map(u => (
          <GHUser {...u} key={u.id} />
        )
        )}
        </ul>
      }
      <div className="w-56">{searchError !== '' && searchError}</div>
    </>
  )
}
