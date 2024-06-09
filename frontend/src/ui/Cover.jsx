function Cover({ src, className, htmlFor }) {
  return (
    <label htmlFor={htmlFor} className="cursor-pointer">
      <img
        className={`aspect-book rounded-xl border-[3px] border-rose-700 object-cover shadow-glower-dark ${className}`}
        src={src}
      />
    </label>
  );
}

export default Cover;
