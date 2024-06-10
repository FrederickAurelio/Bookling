import { HiOutlineDocumentAdd } from "react-icons/hi";
import Modal from "../../ui/Modal";
import BookForm from "./BookForm";

function AddBookButton() {
  return (
    <Modal>
      <Modal.Open>
        <button className="fixed bottom-5 right-5 flex h-16 w-16 items-center justify-center rounded-full bg-green-200 text-green-700 outline outline-2 duration-200 hover:scale-105">
          <HiOutlineDocumentAdd size={30} />
        </button>
      </Modal.Open>
      <Modal.Window>
        <BookForm />
      </Modal.Window>
    </Modal>
  );
}

export default AddBookButton;
