import { HiHeart, HiOutlineHeart } from "react-icons/hi2";
import { useState } from "react";

function Like({ totalLike: initial, isAuthenticated }) {
  const [totalLike, setTotalLike] = useState(initial);
  const [like, setLike] = useState(false);
  function handleLike() {
    setLike((like) => {
      if (!like) {
        setTotalLike((total) => total + 1);
      } else setTotalLike((total) => total - 1);

      return !like;
    });
  }
  return (
    <div className="col-span-1 mx-3 my-1 flex items-center justify-center text-rose-600">
      <button
        disabled={!isAuthenticated}
        onClick={handleLike}
        className={`duration-200 ${isAuthenticated ? "cursor-pointer hover:scale-105" : "cursor-not-allowed hover:scale-100"}`}
      >
        {like ? <HiHeart size={60} /> : <HiOutlineHeart size={60} />}
      </button>
      <p className="text-xl">{totalLike}</p>
    </div>
  );
}

export default Like;
