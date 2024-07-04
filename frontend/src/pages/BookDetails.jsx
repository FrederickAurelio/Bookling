import {
  HiOutlineUser,
  HiOutlineCalendarDays,
  HiOutlineNewspaper,
  HiBars3BottomLeft,
  HiOutlineBanknotes,
  HiOutlineInformationCircle,
  HiOutlinePencilSquare,
  HiOutlineTrash,
} from "react-icons/hi2";
import Like from "../features/bookdetails/Like";
import Cover from "../ui/Cover";
import { formatCurrency } from "../utils/helpers";
import DetailItem from "../features/bookdetails/DetailItem";
import ButtonIcon from "../ui/ButtonIcon";
import Modal from "../ui/Modal";
import BookForm from "../features/bookdetails/BookForm";
import ConfirmDelete from "../ui/ConfirmDelete";
import UserLink from "../features/user/UserLink";
import { useParams } from "react-router-dom";
import { useBook } from "../features/bookdetails/useBook";
import Spinner from "../ui/Spinner";
import { useAuth } from "../context/AuthContext";

function BookDetails() {
  const { bookId } = useParams();
  const { book = {}, isPending } = useBook(bookId);

  const {
    authState: { isAuthenticated, username: currentUsername },
  } = useAuth();

  const {
    id,
    author,
    cover_url,
    description,
    genres,
    price,
    profile: { icon } = {},
    publisher,
    releaseDate,
    title,
    totalLike,
    username,
    is_liked,
  } = book;

  console.log(book)

  if (isPending) return <Spinner />;
  if (!id)
    return (
      <p className="col-span-3 flex justify-center py-8 text-3xl font-medium">
        🚫Book Not Found!
      </p>
    );
  return (
    <div className="col-span-3 flex flex-col overflow-y-auto bg-stone-100 px-12 py-8">
      <div className="grid grid-cols-5">
        <h1 className="col-span-4 text-5xl font-semibold">{title}</h1>
        <Like
          isAuthenticated={isAuthenticated}
          totalLike={totalLike}
          is_liked={is_liked}
          id={id}
        />
      </div>
      <div className="grid grid-cols-4">
        <div className="col-span-1 flex flex-col">
          <Cover className="mt-5" src={cover_url} />
          <div className="flex items-center justify-center gap-1 p-1">
            <p>By:</p>
            <UserLink username={username} icon={icon} />
          </div>
          <div className="flex justify-evenly py-3">
            {username === currentUsername && (
              <Modal>
                <Modal.Open id="edit">
                  <ButtonIcon
                    icon={HiOutlinePencilSquare}
                    text="Edit"
                    className="text-stone-600 hover:scale-110"
                  />
                </Modal.Open>
                <Modal.Open id="delete">
                  <ButtonIcon
                    icon={HiOutlineTrash}
                    text="Delete"
                    className="text-rose-600 hover:scale-110"
                  />
                </Modal.Open>
                <Modal.Window id="edit">
                  <BookForm editBookValues={book} />
                </Modal.Window>
                <Modal.Window id="delete">
                  <ConfirmDelete id={id} />
                </Modal.Window>
              </Modal>
            )}
          </div>
        </div>
        <div className="col-span-3 flex flex-col divide-y-2 divide-stone-300 p-3 px-8">
          <DetailItem icon={HiOutlineUser} text={author} />
          <DetailItem
            icon={HiOutlineCalendarDays}
            text={releaseDate}
            type="date"
          />
          <DetailItem icon={HiOutlineNewspaper} text={publisher} />
          <DetailItem icon={HiOutlineBanknotes} text={formatCurrency(price)} />
          <DetailItem
            icon={HiOutlineInformationCircle}
            text={genres.join(", ")}
          />
          <DetailItem
            type={"desc"}
            icon={HiBars3BottomLeft}
            text={description}
          />
        </div>
      </div>
    </div>
  );
}

export default BookDetails;
