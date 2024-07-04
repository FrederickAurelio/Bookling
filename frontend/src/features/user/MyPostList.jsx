import List from "../booklist/List";
import { useParams } from "react-router-dom";
import Spinner from "../../ui/Spinner";
import { useMyPost } from "../booklist/useMyPost";

function MyPostList() {
  const { username } = useParams();

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, status } =
    useMyPost({ username });

  const books = data?.pages.flatMap((page) => page.results) || [];
  const total = data?.pages[0]?.count;

  if (status === "loading") return <Spinner type="full" />;

  return (
    <div className="col-span-2 h-full overflow-y-scroll">
      {books?.length === 0 && (
        <div className="flex justify-center overflow-y-scroll py-2">
          <p className="text-xl font-medium">🚫No Book Found!</p>
        </div>
      )}
      {books?.length !== 0 && (
        <List
          total={total}
          books={books}
          fetchNextPage={fetchNextPage}
          hasNextPage={hasNextPage}
          isFetchingNextPage={isFetchingNextPage}
        />
      )}
    </div>
  );
}

export default MyPostList;
