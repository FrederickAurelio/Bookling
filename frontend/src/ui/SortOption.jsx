function SortOption({ children, value, onSort, sortType }) {
  const isActive = sortType === value;
  return (
    <button
      onClick={(e) => onSort(e.target.value)}
      value={value}
      className={`active:bg-stone-200active:text-stone-800 rounded-md border border-stone-200 px-2 py-1 capitalize duration-300 hover:border-stone-300 ${
        isActive
          ? "-translate-y-0.5 scale-105 border-stone-300 bg-stone-100 text-rose-700"
          : "text-stone-600"
      }`}
    >
      {children}
    </button>
  );
}

export default SortOption;
