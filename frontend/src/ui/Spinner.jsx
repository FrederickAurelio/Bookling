function Spinner({ type = "regular" }) {
  return (
    <div
      className={`col-span-3 flex items-center justify-center h-full ${type !== "regular" ? "h-dvh" : ""}`}
    >
      <div className="spinner"></div>
    </div>
  );
}

export default Spinner;
