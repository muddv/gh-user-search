import { useSetAtom } from 'jotai'

import { searchErrAtom, searchResAtom } from '../stores/searchRes'
import { sendRequest } from '../lib/sendRequest'
import { debounce } from '../lib/debounce'
import { SearchResults } from './SearchResulsts'

export function App() {
  const setSearchRes = useSetAtom(searchResAtom)
  const setSearchErr = useSetAtom(searchErrAtom)
  async function handleSearch(e: React.ChangeEvent<HTMLInputElement>) {
    if (e.target.value === "") {
      setSearchRes([])
      return
    }
    let res = await sendRequest(e.target.value)
    let data = await res.json()
    if (!res.ok) { 
      setSearchErr(data.message)
      setSearchRes([])
      return 
    }
    data.items !== undefined ? setSearchRes(data.items) : setSearchRes([])
    // console.log(data.items)
    // console.log('req')
    // console.log(new Date().getTime())
  }
  const debounceHandle = debounce(handleSearch, 500)
  return (
    <div className="w-screen mt-10 flex flex-col justify-center items-center">
      <form className='flex flex-col'>
        <label htmlFor='usename'>Enter username</label>
        <input type='text' name='username' placeholder="panda_coder"
          onChange={e => {
            debounceHandle(e)
          }}
          className="border-2 border-black p-2" 
        />
      </form>
      <SearchResults />
    </div>
  );
}
