import { sendRequest } from "./sendRequest";
import type { SearchResults } from "../stores/searchRes";

type SearchParams = {
  query: string;
  page: number;
  desc: boolean;
};

export let currentSearchParams: SearchParams = {
  query: "",
  page: 1,
  desc: true,
};

export async function useSearch(
  searchParams: SearchParams,
  setLoading: (b: boolean) => void,
  setSearchRes: (res: SearchResults) => void,
  setCurrentPage?: (n: number) => void,
  setPages?: (n: number) => void,
) {
  setLoading(true);
  if (searchParams.query === "") {
    setSearchRes({ users: [], error: undefined });
    setLoading(false);
    return;
  }
  const data = await sendRequest(
    searchParams.query,
    searchParams.page,
    searchParams.desc,
  );
  if (typeof data === "string") {
    setSearchRes({ users: [], error: data });
    setLoading(false);
    return;
  }
  if (!data.items) {
    setSearchRes({
      users: [],
      error: "Something went wrong, try again later",
    });
    setLoading(false);
    return;
  }
  if (!data.items[0]) {
    setSearchRes({ users: [], error: "No users match your request" });
    setLoading(false);
    return;
  }
  setSearchRes({ users: data.items, error: undefined });
  setCurrentPage && setCurrentPage(searchParams.page);
  let pages =
    data.total_count > 1000
      ? Math.ceil(1000 / 30)
      : Math.ceil(data.total_count / 30);
  setPages && setPages(pages);
  setLoading(false);
  return;
}
