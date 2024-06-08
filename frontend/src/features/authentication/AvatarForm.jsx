import useHandleImage from "../../hooks/useHandleImage";
import { HiOutlineUpload } from "react-icons/hi";
import AvatarFormImage from "./AvatarFormImage";

function AvatarForm() {
  const { image, handleImageChange } = useHandleImage();
  return (
    <div className="ml-0.5 mt-2 flex h-fit items-center gap-3">
      {!image && (
        <AvatarFormImage htmlFor="imageInput" src="https://i.ibb.co/WBG9ZjJ/default-avatar.jpg" />
      )}
      {image && <AvatarFormImage htmlFor="imageInput" src={image} />}
      <label
        htmlFor="imageInput"
        className="text-stone-500 flex cursor-pointer justify-center duration-200 hover:scale-110"
      >
        <HiOutlineUpload size={24} />
        <p>Upload Avatar</p>
      </label>

      <input
        required
        id="imageInput"
        className="absolute left-4 bottom-15 h-[10%] w-[90%] cursor-pointer opacity-0"
        accept="image/*"
        type="file"
        onChange={handleImageChange}
      />
    </div>
  );
}

export default AvatarForm;
