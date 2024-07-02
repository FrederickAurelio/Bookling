import Cover from "../../ui/Cover";
import useHandleImage from "../../hooks/useHandleImage";
import { HiOutlineUpload } from "react-icons/hi";

function CoverForm({ register, editCover, errors }) {
  const { image, handleImageChange } = useHandleImage(null);
  return (
    <>
      {!image && editCover && (
        <Cover src={editCover} htmlFor="imageInput" className="w-full" />
      )}
      {!image && !editCover && (
        <Cover htmlFor="imageInput" className="w-full" />
      )}
      {image && <Cover htmlFor="imageInput" src={image} className="w-full" />}
      <label
        htmlFor="imageInput"
        className="mt-1 flex w-full cursor-pointer justify-center duration-200 hover:scale-110"
      >
        <HiOutlineUpload size={24} />
        <p>Upload</p>
      </label>

      {editCover && (
        <input
          id="imageInput"
          className="absolute top-1 h-[55%] w-full cursor-pointer opacity-0"
          accept="image/*"
          type="file"
          {...register("imageInput")}
          onChange={handleImageChange}
        />
      )}
      {!editCover && (
        <input
          id="imageInput"
          className="absolute top-1 h-[55%] w-full cursor-pointer opacity-0"
          accept="image/*"
          type="file"
          {...register("imageInput", {
            required: "Image is required",
          })}
          onChange={handleImageChange}
        />
      )}
      {errors["imageInput"] && (
        <span className="ml-12 flex text-xs capitalize" role="alert">
          {errors["imageInput"].message}
        </span>
      )}
    </>
  );
}

export default CoverForm;
