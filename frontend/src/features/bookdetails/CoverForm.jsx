import Cover from "../../ui/Cover";
import useHandleImage from "../../hooks/useHandleImage";
import { HiOutlineUpload } from "react-icons/hi";

function CoverForm() {
  const { image, handleImageChange } = useHandleImage();
  return (
    <>
      {!image && <Cover htmlFor="imageInput" className="w-full" />}
      {image && <Cover htmlFor="imageInput" src={image} className="w-full" />}
      <label
        htmlFor="imageInput"
        className="mt-1 flex w-full cursor-pointer justify-center hover:scale-110 duration-200"
      >
        <HiOutlineUpload size={24} />
        <p>Upload</p>
      </label>

      <input
        required
        id="imageInput"
        className="absolute top-1 h-[55%] w-full cursor-pointer opacity-0"
        accept="image/*"
        type="file"
        onChange={handleImageChange}
      />
    </>
  );
}

export default CoverForm;
