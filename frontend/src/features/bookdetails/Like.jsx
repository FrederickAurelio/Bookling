import { HiHeart, HiOutlineHeart } from "react-icons/hi2";
import { useLike } from "./useLike";
import { useUnlike } from "./useUnlike";

function Like({ totalLike, isAuthenticated, is_liked, id }) {
  const { isLiking, likeBook } = useLike({ id });
  const { isUnliking, unlikeBook } = useUnlike({ id });
  const isLoading = isLiking || isUnliking;

  function handleLike() {
    if (!is_liked) likeBook(id);
    else unlikeBook(id);
  }

  return (
    <div className="col-span-1 mx-3 my-1 flex items-center justify-center text-rose-600">
      <button
        disabled={!isAuthenticated || isLoading}
        onClick={handleLike}
        className={`duration-200 ${isAuthenticated ? "cursor-pointer hover:scale-105" : "cursor-not-allowed hover:scale-100"}`}
      >
        {is_liked ? <HiHeart size={60} /> : <HiOutlineHeart size={60} />}
      </button>
      <p className="text-xl">{totalLike}</p>
    </div>
  );
}

export default Like;
