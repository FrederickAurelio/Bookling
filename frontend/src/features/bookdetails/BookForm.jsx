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
import { useCreateBook } from "./useCreateBook";
import { useEditBook } from "./useEditBook";

function BookForm({ onCloseModal, editBookValues = {} }) {
  const editSession = editBookValues?.title !== undefined;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: editSession
      ? {
          ...editBookValues,
          genre: editBookValues.genres.join(", "),
          releaseDate: new Date(editBookValues.releaseDate)
            .toISOString()
            .split("T")[0],
          imageInput: [editBookValues.imageInput],
        }
      : {},
  });

  const { isCreating, createBook } = useCreateBook();
  const { isEditing, editBook } = useEditBook();

  function onSubmit(data) {
    const formData = new FormData();
    formData.append("title", data.title);
    formData.append("author", data.author);
    formData.append("releaseDate", new Date(data.releaseDate).toISOString());
    formData.append("publisher", data.publisher);
    formData.append("price", data.price);
    formData.append("genres", data.genre);
    formData.append("description", data.description);
    formData.append("cover", data.imageInput[0]);

    for (var pair of formData.entries()) {
      console.log(pair[0]+ ', ' + pair[1]); 
    }

    if (editSession) {
      editBook({ id: editBookValues?.id, formData });
    } else createBook(formData);

    onCloseModal();
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="grid h-[32rem] w-[60rem] grid-cols-5 px-2"
    >
      <div className="relative col-span-1 w-full py-2">
        <CoverForm
          register={register}
          editCover={editBookValues?.cover_url}
          errors={errors}
        />
        <div className="flex justify-around py-2">
          <ButtonIcon
            icon={HiOutlineBackspace}
            onClick={onCloseModal}
            text="Cancel"
            className="text-stone-600 hover:scale-110"
            disabled={isCreating || isEditing}
          />
          <ButtonIcon
            type="submit"
            icon={HiOutlineSaveAs}
            text="Submit"
            className="text-green-700 hover:scale-110"
            disabled={isCreating || isEditing}
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
          disabled={isCreating || isEditing}
        />
        <InputRow
          icon={HiOutlineUser}
          type="text"
          id="author"
          register={register}
          errors={errors}
          disabled={isCreating || isEditing}
        />
        <InputRow
          icon={HiOutlineCalendarDays}
          type="date"
          id="releaseDate"
          register={register}
          errors={errors}
          disabled={isCreating || isEditing}
        />
        <InputRow
          icon={HiOutlineNewspaper}
          type="text"
          id="publisher"
          register={register}
          errors={errors}
          disabled={isCreating || isEditing}
        />
        <InputRow
          icon={HiOutlineBanknotes}
          type="number"
          id="price"
          register={register}
          errors={errors}
          disabled={isCreating || isEditing}
        />
        <InputRow
          icon={HiOutlineInformationCircle}
          type="text"
          id="genre"
          register={register}
          errors={errors}
          disabled={isCreating || isEditing}
        />
        <InputRow
          icon={HiBars3BottomLeft}
          type="desc"
          id="description"
          register={register}
          errors={errors}
          disabled={isCreating || isEditing}
        />
      </div>
    </form>
  );
}

export default BookForm;
