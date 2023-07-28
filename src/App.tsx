import { useSetAtom, useAtom } from 'jotai'

import { searchErrAtom, searchResAtom } from '../stores/searchRes'
import { sendRequest } from '../lib/sendRequest'
import { debounce } from '../lib/debounce'
import { SearchResults } from './SearchResulsts'

  let q = ''
  let page = 1
  let desc = true
export function App() {
  const [searchRes, setSearchRes] = useAtom(searchResAtom)
  const setSearchErr = useSetAtom(searchErrAtom)
  async function handleSearch(query: string) {
    console.log(query)
     if (query === "") {
       setSearchRes([])
       return
     }
     q = query
    
     let data = await sendRequest(query, page, desc)
     page++
     if (data.message) { 
       setSearchErr(data.message)
       setSearchRes([])
       return 
     }
     data.items !== undefined ? setSearchRes(data.items) : setSearchRes([])
    return
    // ______________________
    // console.log(data.items)
    // console.log('req')
    // console.log(new Date().getTime())
  }
  const debounceHandle = debounce(handleSearch, 250)
  return (
    <div className="w-screen mt-10 flex flex-col justify-center items-center">
      <form className='flex flex-col'onSubmit={e => (e.preventDefault())}>
        <label htmlFor='usename'>Enter username</label>
        <input type='text' name='username' placeholder="panda_coder"
          onChange={e => {
            debounceHandle(e.target.value)
          }}
          className="border-2 border-black p-2" 
        />
        <fieldset onChange={() => {
          desc = !desc
          console.log(desc)
        }} className='flex flex-col'>
          <legend>Sort by:</legend>
          <div className='flex gap-5'>
            <label htmlFor='desc'>Number of repositories, descending</label>
            <input type='radio' name='order' id='desc' value='desc' defaultChecked />
          </div>
          <div className='flex gap-5'>
            <label htmlFor='asc'>Number of repositories, ascending</label>
            <input type='radio' name='order' id='asc' value='ascending' />
          </div>
        </fieldset>
      </form>
      <SearchResults />
      <button className="border-2 border-black hover:bg-slate-300 active:bg-slate-400"onClick={() => {
        handleSearch(q)
      }}>
        load more</button>
    </div>
  );
}
