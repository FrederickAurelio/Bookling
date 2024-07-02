import { HiOutlineBackspace, HiOutlineTrash } from "react-icons/hi";
import ButtonIcon from "./ButtonIcon";
import { useDeleteBook } from "../features/bookdetails/useDeleteBook";

function ConfirmDelete({ onCloseModal, id }) {
  const { isDeleting, deleteBook } = useDeleteBook();

  return (
    <div className="flex w-[26rem] flex-col gap-1 text-stone-600">
      <p className="text-xl font-semibold">Delete Book</p>
      <h1>
        Are you sure you want to delete this book permanently? This action
        cannot be undone.
      </h1>
      <span className="mt-3 flex justify-end gap-3">
        <ButtonIcon
          disabled={isDeleting}
          icon={HiOutlineBackspace}
          onClick={onCloseModal}
          text="Cancel"
          className="text-stone-600 hover:scale-110"
        />
        <ButtonIcon
          disabled={isDeleting}
          onClick={() => {
            deleteBook(id);
            onCloseModal();
          }}
          icon={HiOutlineTrash}
          text="Delete"
          className="text-rose-600 hover:scale-110"
        />
      </span>
    </div>
  );
}

export default ConfirmDelete;
