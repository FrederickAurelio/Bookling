function ButtonIcon({
  icon: Icon,
  text,
  className,
  onClick,
  type = "button",
  disabled,
}) {
  return (
    <button
      disabled={disabled}
      type={type}
      onClick={onClick}
      className={`flex items-center justify-center duration-200 ${disabled ? "cursor-not-allowed opacity-50" : "cursor-pointer hover:scale-110"} ${className}`}
      style={{ pointerEvents: disabled ? "none" : "auto" }}
    >
      <Icon size={32} />
      <p>{text}</p>
    </button>
  );
}

export default ButtonIcon;
