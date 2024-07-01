import { HiHeart, HiOutlineHeart } from "react-icons/hi2";
import { useState } from "react";

function Like({totalLike:initial}) {
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
    <div className="col-span-1 my-1 mx-3 flex items-center justify-center text-rose-600">
      <span
        onClick={handleLike}
        className="cursor-pointer duration-200 hover:scale-105"
      >
        {like ? <HiHeart size={60} /> : <HiOutlineHeart size={60} />}
      </span>
      <p className="text-xl">{totalLike}</p>
    </div>
  );
}

export default Like;
