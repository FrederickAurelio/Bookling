import { useQuery } from "@tanstack/react-query";
import { getBook } from "../../api/apiBooks";

export function useBook(bookId) {
  const { isPending, data:book, error } = useQuery({
    queryKey: ["book", bookId],
    queryFn: () => getBook(bookId),
  });

  return {isPending, book, error}
}
