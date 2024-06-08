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
import Avatar from "../features/user/Avatar";
import ButtonIcon from "../ui/ButtonIcon";
import Modal from "../ui/Modal";
import BookForm from "../features/bookdetails/BookForm";
import ConfirmDelete from "../ui/ConfirmDelete";

function BookDetails() {
  return (
    <div className="col-span-3 flex flex-col overflow-y-auto bg-stone-100 px-12 py-8">
      <div className="grid grid-cols-5">
        <h1 className="col-span-4 text-5xl font-semibold">
          Harry Potter and the Philisopher&apos;s Stone
        </h1>
        <Like />
      </div>
      <div className="grid grid-cols-4">
        <div className="col-span-1 flex flex-col">
          <Cover
            className="mt-5"
            src="https://i.ibb.co/mtFxtm6/book-cover2.jpg"
          />
          <div className="flex items-center justify-center gap-1 p-1">
            <p>By:</p>
            <Avatar type="small" />
          </div>
          <div className="flex justify-evenly py-3">
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
                <BookForm />
              </Modal.Window>
              <Modal.Window id="delete">
                <ConfirmDelete />
              </Modal.Window>
            </Modal>
          </div>
        </div>
        <div className="col-span-3 flex flex-col divide-y-2 divide-stone-300 p-3 px-8">
          <DetailItem icon={HiOutlineUser} text="J. K. Rowling" />
          <DetailItem
            icon={HiOutlineCalendarDays}
            text="1997-06-26T00:00:00.000Z"
            type="date"
          />
          <DetailItem icon={HiOutlineNewspaper} text="Bloomsbury" />
          <DetailItem icon={HiOutlineBanknotes} text={formatCurrency(5.99)} />
          <DetailItem
            icon={HiOutlineInformationCircle}
            text={["Fantasy, Adventure"].join(", ")}
          />
          <DetailItem
            icon={HiBars3BottomLeft}
            text="Harry Potter and the Philosopher's Stone is the first book in J.K. Rowling's series. It follows 11-year-old Harry Potter, who discovers he's a wizard. He attends Hogwarts School of Witchcraft and Wizardry, where he makes friends and learns about his magical heritage. Harry uncovers a plot to steal the Philosopher's Stone, a magical object that grants immortality. Along with his friends Ron and Hermione, Harry faces various challenges to protect the Stone from the dark wizard Voldemort. The story concludes with Harry preventing Voldemort from obtaining the Stone and returning to his non-magical relatives for the summer."
            type="desc"
          />
        </div>
      </div>
    </div>
  );
}

export default BookDetails;
