import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { formatCurrency } from "../utils/helpers";

function Filter({ label, options }) {
  const filter = label;
  const [searchParam, setSearchParam] = useSearchParams();
  const [filterValue, setFilterValue] = useState(
    searchParam.get(filter) || options[0],
  );
  useEffect(
    function () {
      if (!searchParam.get(filter)) {
        searchParam.set(filter, options[0]);
        setSearchParam(searchParam);
      }
    },
    [filter, options, searchParam, setSearchParam],
  );

  return (
    <>
      <label className="label ml-2" htmlFor={filter}>
        {label}:
      </label>
      <select
        className="ml-1 w-36 rounded-full px-2 py-1 capitalize shadow-glow-dark duration-200 hover:scale-105 focus:scale-105 focus:shadow-glow-darker focus:outline-none"
        id={filter}
        value={filterValue}
        onChange={(e) => {
          setFilterValue(e.target.value);
          searchParam.set(filter, e.target.value);
          setSearchParam(searchParam);
        }}
      >
        {options.map((opt) => (
          <option className="bg-stone-100 text-stone-700" value={opt} key={opt}>
            {isNaN(opt.slice(1, 3))
              ? opt
              : `${opt.slice(0, 1)} ${formatCurrency(Number(opt.slice(1, 3)))}`}
          </option>
        ))}
      </select>
    </>
  );
}

export default Filter;
