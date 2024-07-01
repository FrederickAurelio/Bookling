import useHandleImage from "../../hooks/useHandleImage";
import { HiOutlineUpload } from "react-icons/hi";
import AvatarFormImage from "./AvatarFormImage";

function AvatarForm({ disabled, register }) {
  const { image, handleImageChange } = useHandleImage();
  return (
    <div className="ml-0.5 mt-2 flex h-fit items-center gap-3">
      {!image && (
        <AvatarFormImage
          htmlFor="icon"
          src="https://i.ibb.co/WBG9ZjJ/default-avatar.jpg"
        />
      )}
      {image && <AvatarFormImage htmlFor="icon" src={image} />}
      <label
        htmlFor="icon"
        className="flex cursor-pointer justify-center text-stone-500 duration-200 hover:scale-110"
      >
        <HiOutlineUpload size={24} />
        <p>Upload Avatar</p>
      </label>

      <input
        id="icon"
        className="bottom-15 absolute left-4 h-[10%] w-[90%] cursor-pointer opacity-0"
        accept="image/*"
        type="file"
        disabled={disabled}
        {...register("icon")}
        onChange={handleImageChange}
      />
    </div>
  );
}

export default AvatarForm;
