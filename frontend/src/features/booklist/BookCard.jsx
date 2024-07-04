import { Link, useLocation } from "react-router-dom";
import { formatCurrency } from "../../utils/helpers";
import Cover from "../../ui/Cover";
import { HiHeart } from "react-icons/hi2";

function BookCard({ book }) {
  const { id, author, price, releaseDate, title, totalLike, cover_url } = book;
  const location = useLocation();
  const currentParams = new URLSearchParams(location.search);

  return (
    <div className="m-2 flex w-36 cursor-pointer flex-col text-sm duration-200 hover:scale-105">
      <Link to={`/books/${id}?${currentParams.toString()}`}>
        <Cover src={cover_url} />
        <h1 className="py-1 pt-1.5 text-sm font-semibold leading-4">{title}</h1>
        <div className="text-xs text-stone-500">
          <div className="flex items-center justify-between">
            <p>{author}</p>
            <p>{new Date(releaseDate).getFullYear()}</p>
          </div>
          <div className="flex items-center justify-between">
            <span className="font-medium text-green-600">
              {formatCurrency(price)}
            </span>
            <span className="flex items-center text-rose-600">
              <HiHeart /> {totalLike}
            </span>
          </div>
        </div>
      </Link>
    </div>
  );
}

export default BookCard;
