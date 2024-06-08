import { HiOutlineBackspace, HiOutlineSaveAs } from "react-icons/hi";
import ButtonIcon from "../../ui/ButtonIcon";
import CoverForm from "./CoverForm";
import InputRow from "./InputRow";
import {
  HiOutlineUser,
  HiOutlineCalendarDays,
  HiOutlineNewspaper,
  HiBars3BottomLeft,
  HiOutlineBanknotes,
  HiOutlineInformationCircle,
  HiOutlineBookOpen,
} from "react-icons/hi2";

function BookForm({ onCloseModal }) {
  return (
    <form className="grid h-[32rem] w-[60rem] grid-cols-5 px-2">
      <div className="py-2 relative col-span-1 w-full">
        <CoverForm />
        <div className="flex justify-around py-2">
          <ButtonIcon
            icon={HiOutlineBackspace}
            onClick={onCloseModal}
            text="Cancel"
            className="text-stone-600 hover:scale-110"
          />
          <ButtonIcon
            type="submit"
            icon={HiOutlineSaveAs}
            text="Submit"
            className="text-green-700 hover:scale-110"
          />
        </div>
      </div>
      <div className="col-span-4 flex flex-col divide-y-2 divide-stone-200 pl-8">
        <InputRow icon={HiOutlineBookOpen} type="text" id="title" />
        <InputRow icon={HiOutlineUser} type="text" id="author" />
        <InputRow icon={HiOutlineCalendarDays} type="date" id="releaseDate" />
        <InputRow icon={HiOutlineNewspaper} type="text" id="publisher" />
        <InputRow icon={HiOutlineBanknotes} type="number" id="price" />
        <InputRow icon={HiOutlineInformationCircle} type="text" id="genre" />
        <InputRow icon={HiBars3BottomLeft} type="desc" id="description" />
      </div>
    </form>
  );
}

export default BookForm;
