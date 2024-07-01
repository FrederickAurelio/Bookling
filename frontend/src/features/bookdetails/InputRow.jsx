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
  pattern,
  minLength,
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
        className={`flex gap-2 pt-3 text-xl text-stone-700 ${
          type === "desc" ? "py-2" : "items-center"
        }`}
      >
        <Icon size={36} />
        {type === "desc" && (
          <textarea
            disabled={disabled}
            id={id}
            className={`input h-36 text-justify ${className} ${errors[id] ? "border-rose-700" : ""}`}
            placeholder={placeholder || placeHolder[id]}
            {...register(id, {
              required: `${id} is required`,
            })}
          ></textarea>
        )}
        {type === "password" && id === "confirmPassword" && (
          <input
            disabled={disabled}
            step="0.01"
            id={id}
            className={`input ${className} ${errors[id] ? "border-rose-700" : ""}`}
            placeholder={placeholder || placeHolder[id]}
            type="password"
            {...register(id, {
              required: `${id} is required`,
              validate: validate,
            })}
          />
        )}
        {type !== "desc" &&
          !(type === "password" && id === "confirmPassword") && (
            <input
              disabled={disabled}
              step="0.01"
              id={id}
              className={`input ${className} ${errors[id] ? "border-rose-700" : ""}`}
              placeholder={placeholder || placeHolder[id]}
              type={type}
              {...register(id, {
                required: `${id} is required`,
                pattern: pattern,
                minLength: minLength,
              })}
            />
          )}
      </div>
      {errors[id] && (
        <span className="ml-12 flex text-xs capitalize" role="alert">
          {errors[id].message}
        </span>
      )}
    </>
  );
}

export default InputRow;
