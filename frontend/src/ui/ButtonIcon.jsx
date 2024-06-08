function ButtonIcon({ icon: Icon, text, className, onClick, type="button" }) {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`flex cursor-pointer items-center justify-center duration-200 ${className}`}
    >
      <Icon size={32} />
      <p>{text}</p>
    </button>
  );
}

export default ButtonIcon;
