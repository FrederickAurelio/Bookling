import { HiOutlineDocumentAdd } from "react-icons/hi";
import Modal from "../../ui/Modal";
import BookForm from "./BookForm";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";

function ButtonUI({ onClick }) {
  return (
    <button
      onClick={onClick}
      className="fixed bottom-5 right-5 flex h-16 w-16 items-center justify-center rounded-full bg-green-200 text-green-700 outline outline-2 duration-200 hover:scale-105"
    >
      <HiOutlineDocumentAdd size={30} />
    </button>
  );
}

function AddBookButton() {
  const navigate = useNavigate();
  const {
    authState: { isAuthenticated },
  } = useAuth();

  function handleClick() {
    navigate("/logins");
  }

  if (!isAuthenticated) return <ButtonUI onClick={handleClick} />;
  return (
    <Modal>
      <Modal.Open>
        <ButtonUI />
      </Modal.Open>
      <Modal.Window>
        <BookForm />
      </Modal.Window>
    </Modal>
  );
}

export default AddBookButton;
