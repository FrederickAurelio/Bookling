import { useInView } from "react-intersection-observer";
import MiniSpiner from "../../ui/MiniSpiner";
import BookCard from "./BookCard";
import { useEffect } from "react";

function List({
  total,
  books,
  fetchNextPage,
  hasNextPage,
  isFetchingNextPage,
}) {
  const { ref, inView } = useInView();

  useEffect(
    function () {
      if (inView && hasNextPage) fetchNextPage();
    },
    [fetchNextPage, hasNextPage, inView],
  );

  return (
    <>
      <div className="grid grid-cols-3 gap-1 px-5 py-2">
        {books.map((book) => (
          <BookCard book={book} key={book.id} />
        ))}
      </div>

      <div className="flex items-center justify-center gap-2 pb-3 text-sm text-stone-400">
        {isFetchingNextPage && <MiniSpiner />}
        <span ref={ref}>
          Showing {books.length} of {total} results...
        </span>
      </div>
    </>
  );
}

export default List;
