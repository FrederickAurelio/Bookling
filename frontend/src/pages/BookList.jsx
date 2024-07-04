import List from "../features/booklist/List";
import { useBooks } from "../features/booklist/useBooks";
import Spinner from "../ui/Spinner";

function BookList() {
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, status } =
    useBooks();

  const books = data?.pages.flatMap((page) => page.results) || [];
  const total = data?.pages[0].count;

  if (books?.length === 0)
    return (
      <div className="col-span-2 flex justify-center overflow-y-scroll py-2">
        <p className="text-xl font-medium">🚫No Book Found!</p>
      </div>
    );
  if (status === "loading") return <Spinner type="full" />;
  return (
    <div className="col-span-2 overflow-y-scroll">
      <List
        total={total}
        books={books}
        fetchNextPage={fetchNextPage}
        hasNextPage={hasNextPage}
        isFetchingNextPage={isFetchingNextPage}
      />
    </div>
  );
}

export default BookList;
