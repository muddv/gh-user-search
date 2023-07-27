import { useAtomValue } from "jotai"

import { searchResAtom, searchErrAtom } from "../stores/searchRes"

export function SearchResults() {
  const searchResults = useAtomValue(searchResAtom)
  const searchError = useAtomValue(searchErrAtom)
  return (
    <>
      {(!searchResults[0] && !searchError) && <div>Enter username to start searching</div>}
      {searchResults[0] &&
        <ul>{searchResults.map(u => (
          <li key={u.id}>{u.login}</li>
        ))}
        </ul>
      }
      <div className="w-56">{searchError !== '' && searchError}</div>
    </>
  )
}
