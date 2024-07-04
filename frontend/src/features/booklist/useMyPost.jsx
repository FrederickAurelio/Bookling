import { useInfiniteQuery } from "@tanstack/react-query";
import { getMyPost } from "../../api/apiBooks";

export function useMyPost({ username }) {
  const {
    data,
    error,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
    status,
  } = useInfiniteQuery({
    queryKey: ["books", "myPost", username],
    queryFn: ({ pageParam = 1 }) =>
      getMyPost({
        pageParam,
        username,
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
