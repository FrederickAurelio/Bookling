function InputRow({
  icon: Icon,
  type,
  id,
  className = "",
  placeholder = "",
  register,
  disabled,
  errors,
  validate,
}) {
  const placeHolder = {
    title: "Book Title...",
    author: "Author Name...",
    releaseDate: "Release Date...",
    publisher: "Publisher...",
    price: "Price...",
    genre: "Genre (ex: Fantasy, Mystery, Science Fiction...)",
    description: "Description...",
  };

  return (
    <>
      <div
        className={`flex gap-2 py-2 text-xl text-stone-700 ${
          type === "desc" ? "py-2" : "items-center"
        }`}
      >
        <Icon size={36} />
        {type === "desc" && (
          <textarea
            disabled={disabled}
            id={id}
            className={`input h-36 text-justify ${className}`}
            placeholder={placeholder || placeHolder[id]}
          ></textarea>
        )}
        {type === "password" && id === "confirmPassword" && (
          <input
            disabled={disabled}
            step="0.01"
            id={id}
            className={`input ${className}`}
            placeholder={placeholder || placeHolder[id]}
            type="password"
            {...register(id, {
              required: `${id} is required`,
              validate: validate,
            })}
          />
        )}
        {type !== "desc" && !(type === "password" && id === "confirmPassword") && (
          <input
            disabled={disabled}
            step="0.01"
            id={id}
            className={`input ${className}`}
            placeholder={placeholder || placeHolder[id]}
            type={type}
            {...register(id, { required: `${id} is required` })}
          />
        )}
      </div>
      {errors[id] && (
        <span className="ml-12 flex capitalize" role="alert">
          {errors[id].message}
        </span>
      )}
    </>
  );
}

export default InputRow;
