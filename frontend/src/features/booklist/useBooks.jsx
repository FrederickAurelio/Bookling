import { useInfiniteQuery } from "@tanstack/react-query";
import { getBooks } from "../../api/apiBooks";
import { useSearchParams } from "react-router-dom";

export function useBooks() {
  const [searchParam] = useSearchParams();
  const [sortBy, asc] = (searchParam.get("sortBy") || "recently-asc").split(
    "-",
  );
  const [searchType, value] = (searchParam.get("search") || "title-").split(
    "-",
  );
  const searchValue = value ? value.split(" ").join("+") : "";
  const price = searchParam.get("Price") || "all";
  const genre = searchParam.get("Genre") || "all";

  const {
    data,
    error,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
    status,
  } = useInfiniteQuery({
    queryKey: ["books", sortBy, asc, searchType, searchValue, price, genre],
    queryFn: ({ pageParam = 1 }) =>
      getBooks({
        pageParam,
        sortBy,
        asc,
        searchType,
        searchValue,
        price,
        genre,
      }),
    initialPageParam: 1,
    getNextPageParam: (lastPage, allPages) => {
      const totalPages = Math.ceil(lastPage.count / 6); // ITEMS PER PAGE
      const nextPage = allPages.length + 1;
      return nextPage <= totalPages ? nextPage : undefined;
    },
  });

  return {
    data,
    error,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
    status,
  };
}
