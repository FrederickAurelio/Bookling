function Cover({ src, className, htmlFor }) {
  return (
    <label htmlFor={htmlFor} className="cursor-pointer">
      <img
        className={`aspect-book shadow-glower-dark rounded-xl border-[3px] border-rose-700 ${className}`}
        src={src}
      />
    </label>
  );
}

export default Cover;
