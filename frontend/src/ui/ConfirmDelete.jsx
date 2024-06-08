import { HiOutlineBackspace, HiOutlineTrash } from "react-icons/hi";
import ButtonIcon from "./ButtonIcon";

function ConfirmDelete({ onCloseModal }) {
  return (
    <div className="flex w-[26rem] flex-col gap-1 text-stone-600">
      <p className="text-xl font-semibold">Delete Book</p>
      <h1>
        Are you sure you want to delete this book permanently? This action
        cannot be undone.
      </h1>
      <span className="flex justify-end gap-3 mt-3">
        <ButtonIcon
          icon={HiOutlineBackspace}
          onClick={onCloseModal}
          text="Cancel"
          className="text-stone-600 hover:scale-110"
        />
        <ButtonIcon
          icon={HiOutlineTrash}
          text="Delete"
          className="text-rose-600 hover:scale-110"
        />
      </span>
    </div>
  );
}

export default ConfirmDelete;
