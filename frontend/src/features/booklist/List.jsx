import MiniSpiner from "../../ui/MiniSpiner";
import BookCard from "./BookCard";

function List() {
  return (
    <>
      <div className="grid grid-cols-3 gap-1 px-5 py-2">
        {Array.from({ length: 12 }, (_, i) => (
          <BookCard key={i} />
        ))}
      </div>

      <p className="flex items-center justify-center gap-2 pb-3 text-sm text-stone-400">
        <MiniSpiner />
        <span>Showing 12 of 104 results...</span>
      </p>
    </>
  );
}

export default List;
