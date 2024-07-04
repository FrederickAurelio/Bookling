function Spinner({ type = "regular" }) {
  return (
    <div
      className={`col-span-3 flex items-center justify-center ${type !== "regular" ? "h-dvh" : "h-full"}`}
    >
      <div className="spinner"></div>
    </div>
  );
}

export default Spinner;
