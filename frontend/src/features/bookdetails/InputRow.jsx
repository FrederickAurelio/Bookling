function InputRow({ icon: Icon, type, id, className="", placeholder="" }) {
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
    <div
      className={`flex gap-2 py-2 text-xl text-stone-700 ${type === "desc" ? "py-2" : "items-center"}`}
    >
      <Icon size={36} />
      {type === "desc" && (
        <textarea
          required
          id={id}
          className={`input h-36 text-justify ${className}`}
          placeholder={placeholder || placeHolder[id]}
        ></textarea>
      )}
      {type !== "desc" && (
        <input
          step="0.01"
          required
          id={id}
          className={`input ${className}`}
          placeholder={placeholder || placeHolder[id]}
          type={type}
        />
      )}
    </div>
  );
}

export default InputRow;
