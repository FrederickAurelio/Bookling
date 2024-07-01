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
import { useForm } from "react-hook-form";

function BookForm({ onCloseModal }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  function onSubmit(data) {
    // HERE
    // ABOI HO
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="grid h-[32rem] w-[60rem] grid-cols-5 px-2"
    >
      <div className="relative col-span-1 w-full py-2">
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
      <div className="col-span-4 flex flex-col pl-8">
        <InputRow
          icon={HiOutlineBookOpen}
          type="text"
          id="title"
          register={register}
          errors={errors}
        />
        <InputRow
          icon={HiOutlineUser}
          type="text"
          id="author"
          register={register}
          errors={errors}
        />
        <InputRow
          icon={HiOutlineCalendarDays}
          type="date"
          id="releaseDate"
          register={register}
          errors={errors}
        />
        <InputRow
          icon={HiOutlineNewspaper}
          type="text"
          id="publisher"
          register={register}
          errors={errors}
        />
        <InputRow
          icon={HiOutlineBanknotes}
          type="number"
          id="price"
          register={register}
          errors={errors}
        />
        <InputRow
          icon={HiOutlineInformationCircle}
          type="text"
          id="genre"
          register={register}
          errors={errors}
        />
        <InputRow
          icon={HiBars3BottomLeft}
          type="desc"
          id="description"
          register={register}
          errors={errors}
        />
      </div>
    </form>
  );
}

export default BookForm;
