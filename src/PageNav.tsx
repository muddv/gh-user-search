import { useAtom, useAtomValue, useSetAtom } from "jotai";

import { currentPageAtom, pagesAtom } from "../stores/pages";
import { isLoadingAtom } from "../stores/isLoading";
import { searchResAtom } from "../stores/searchRes";
import { currentSearchParams, useSearch } from "../lib/useSearch";

function generateNav(currentPage: number, totalPages: number) {
  let nav = [];
  for (let i = currentPage - 3; i < currentPage + 3 && i < totalPages; i++) {
    if (i > 0) {
      nav.push(i);
    }
  }
  return nav;
}

export function PageNav() {
  const totalPages = useAtomValue(pagesAtom);
  const [currentPage, setCurrentPage] = useAtom(currentPageAtom);
  const setLoading = useSetAtom(isLoadingAtom);
  const setSearchRes = useSetAtom(searchResAtom);
  function handlePageChange(page: number) {
    if (currentSearchParams.page === page) return
    currentSearchParams.page = page;
    window.scrollTo({ top: 0, left: 0 });
    useSearch(currentSearchParams, setLoading, setSearchRes, setCurrentPage);
  }
  const nav = generateNav(currentPage, totalPages);

  return (
    <div
      className={`mt-auto flex w-screen justify-center bg-slate-50 pb-3 ${
        totalPages < 2 && "hidden"
      }`}
    >
      {currentPage > 1 && (
        <button
          className="hover:text-slate-950 hover:underline focus:text-gray-950"
          onClick={() => handlePageChange(currentPage - 1)}
        >
          prev
        </button>
      )}
      {totalPages > 3 && currentPage > 3 && (
        <span>
          <button
            onClick={() => {
              handlePageChange(1);
            }}
            className="lext-lg mx-2 hover:text-slate-950 hover:underline focus:text-gray-950"
          >
            1
          </button>{" "}
          ...{" "}
        </span>
      )}
      <span>
        {nav.map((n) => (
          <button
            key={n}
            onClick={() => {
              handlePageChange(n);
            }}
            className={`${
              n === currentPage
                ? "font-semibold cursor-default"
                : "hover:text-slate-950 hover:underline focus:text-gray-950"
            } mx-2 text-lg `}
          >
            {n}
          </button>
        ))}
      </span>
      <span>
        {totalPages > 3 && totalPages - currentPage > 3 && "..."}
        <button
          className="mx-2 text-lg hover:text-slate-950 hover:underline focus:text-gray-950"
          onClick={() => {
            handlePageChange(totalPages);
          }}
        >
          {totalPages}
        </button>
      </span>
      {currentPage !== totalPages && (
        <button
          className="hover:text-slate-950 hover:underline focus:text-gray-950"
          onClick={() => {
            handlePageChange(currentPage + 1);
          }}
        >
          next
        </button>
      )}
    </div>
  );
}
