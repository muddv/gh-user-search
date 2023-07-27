import { useSetAtom, useAtom } from 'jotai'

import { searchErrAtom, searchResAtom } from '../stores/searchRes'
import { sendRequest } from '../lib/sendRequest'
import { debounce } from '../lib/debounce'
import { SearchResults } from './SearchResulsts'

  let q = ''
  let page = 1
export function App() {
  const [searchRes, setSearchRes] = useAtom(searchResAtom)
  const setSearchErr = useSetAtom(searchErrAtom)
  async function handleSearch(query: string) {
     if (query === "") {
       setSearchRes([])
       return
     }
     q = query
     let data = await sendRequest(query, page)
     page++
     if (data.message) { 
       setSearchErr(data.message)
       setSearchRes([])
       return 
     }
     data.items !== undefined ? setSearchRes(searchRes.concat(data.items)) : setSearchRes([])
    return
    // ______________________
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
            debounceHandle(e.target.value)
          }}
          className="border-2 border-black p-2" 
        />
      </form>
      <SearchResults />
      <button className="border-2 border-black hover:bg-slate-300 active:bg-slate-400"onClick={() => {
        handleSearch(q)
      }}>
        load more</button>
    </div>
  );
}
