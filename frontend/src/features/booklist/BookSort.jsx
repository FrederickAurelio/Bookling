import SortOption from "../../ui/SortOption";
import { useEffect, useState } from "react";
import {
  HiOutlineSortAscending,
  HiOutlineSortDescending,
} from "react-icons/hi";
import { useSearchParams } from "react-router-dom";

function BookSort() {
  const [searchParam, setSearchParam] = useSearchParams();

  const [defSortType, defOrder] = searchParam.get("sortBy")
    ? searchParam.get("sortBy").split("-")
    : ["recently", "asc"];

  const [sortType, setSortType] = useState(defSortType);
  const [order, setOrder] = useState(defOrder);

  useEffect(
    function () {
      searchParam.set("sortBy", `${sortType}-${order}`);
      setSearchParam(searchParam);
    },
    [searchParam, setSearchParam, order, sortType],
  );
  return (
    <div className="flex items-center gap-1">
      <label className="label">SortBy: </label>

      {["recently", "title", "date", "price"].map((value) => (
        <SortOption
          key={value}
          sortType={sortType}
          onSort={setSortType}
          value={value}
        >
          {value}
        </SortOption>
      ))}

      <button
        className="flex size-8 items-center justify-center rounded-lg p-1 hover:bg-stone-100 active:bg-stone-200"
        onClick={() => setOrder((odr) => (odr === "asc" ? "desc" : "asc"))}
      >
        {order === "asc" ? (
          <HiOutlineSortAscending size={20}/>
        ) : (
          <HiOutlineSortDescending size={20}/>
        )}
      </button>
    </div>
  );
}

export default BookSort;
