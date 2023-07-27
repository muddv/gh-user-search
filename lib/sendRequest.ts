// TODO move to stores
import { atom } from "jotai"

export const searchResAtom = atom<any>([])

export async function sendRequest(userName: string, page?: number, perPage?: number) {
  // TODO trim username
  if (!page) page = 1
  if (!perPage) perPage = 30
  const res = await fetch(`https://api.github.com/search/users?q=${userName}&page=${page}&per_page=${perPage}`)
  return res
}
