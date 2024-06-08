function AvatarFormImage({ src, className, htmlFor }) {
  return (
    <label htmlFor={htmlFor} className="cursor-pointer">
      <img
        className={`aspect-square size-9 rounded-full border-none object-cover text-stone-600 outline outline-2 ${className}`}
        src={src}
      />
    </label>
  );
}

export default AvatarFormImage;
