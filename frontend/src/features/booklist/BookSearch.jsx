import {
  HiMiniMagnifyingGlass,
  HiOutlineBookOpen,
  HiOutlineUser,
} from "react-icons/hi2";
import { useRef, useState } from "react";
import { useSearchParams } from "react-router-dom";

function BookSearch() {
  const [searchParam, setSearchParam] = useSearchParams();
  const [search, setSearch] = useState("");
  const [searchType, setSearchType] = useState(
    searchParam.get("search")
      ? searchParam.get("search").split("-")[0]
      : "title",
  );
  const inputRef = useRef();

  function handleSubmit(e) {
    e.preventDefault();
    if (!search || search.length < 3) return null;
    searchParam.set("search", `${searchType}-${search}`);
    setSearchParam(searchParam);
    inputRef.current.blur();
  }
  return (
    <form onSubmit={handleSubmit} className="mr-2 flex items-center">
      <button
        type="button"
        onClick={() =>
          setSearchType((type) => (type === "title" ? "author" : "title"))
        }
        className="tooltip relative rounded-md border border-stone-200 p-3 hover:border-stone-300 active:bg-stone-100"
      >
        {searchType === "title" ? <HiOutlineBookOpen /> : <HiOutlineUser />}
        <div className="absolute rounded-full bg-stone-100 px-3 py-0.5 opacity-0 shadow-glow-darker duration-200">
          {searchType === "title" ? "Title" : "Author"}
        </div>
      </button>
      <input
        ref={inputRef}
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        type="text"
        id="search"
        placeholder="Search..."
        className="w-96 rounded-lg border border-stone-300 px-4 py-2 focus:outline-none focus:ring-1 focus:ring-stone-300"
      />
      <button
        type="submit"
        className="rounded-md border border-stone-200 p-3 hover:border-stone-300 active:bg-stone-100"
      >
        <HiMiniMagnifyingGlass />
      </button>
    </form>
  );
}

export default BookSearch;
