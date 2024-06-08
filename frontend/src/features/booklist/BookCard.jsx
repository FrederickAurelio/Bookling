import { Link, useLocation } from "react-router-dom";
import { formatCurrency } from "../../utils/helpers";
import Cover from "../../ui/Cover";
import { HiHeart } from "react-icons/hi2";

function BookCard() {
  const location = useLocation();
  const currentParams = new URLSearchParams(location.search);
  let bookId = 10;

  return (
    <div className="m-2 flex w-36 cursor-pointer flex-col text-sm duration-200 hover:scale-105">
      <Link to={`/books/${bookId}?${currentParams.toString()}`}>
        <Cover src="https://i.ibb.co/mtFxtm6/book-cover2.jpg" />
        <h1 className="py-1 pt-1.5 text-sm font-semibold leading-4">
          Harry Potter and the Philosopher&apos;s Stone
        </h1>
        <div className="text-xs text-stone-500">
          <div className="flex items-center justify-between">
            <p>J. K. Rowling</p>
            <p>1997</p>
          </div>
          <div className="flex items-center justify-between">
            <span className="font-medium text-green-600">
              {formatCurrency(5.99)}
            </span>
            <span className="flex items-center text-rose-600">
              <HiHeart /> 23
            </span>
          </div>
        </div>
      </Link>
    </div>
  );
}

export default BookCard;
