import { HiOutlineArchiveBox, HiOutlineHeart } from "react-icons/hi2";
import { useState } from "react";
import ButtonIcon from "../../ui/ButtonIcon";
import List from "../booklist/List";

function MyList() {
  const [activeTab, setActiveTab] = useState("archive");
  return (
    <div className="grid h-full w-full grid-cols-2 overflow-hidden">
      <ButtonIcon
        onClick={() => setActiveTab("archive")}
        icon={HiOutlineArchiveBox}
        className={`h-fit border-b-2 py-1 ${activeTab === "archive" ? "border-rose-700 text-rose-700" : "border-stone-200 text-stone-300"}`}
      />
      <ButtonIcon
        onClick={() => setActiveTab("heart")}
        icon={HiOutlineHeart}
        className={`h-fit border-b-2 py-1 ${activeTab === "heart" ? "border-rose-700 text-rose-700" : "border-stone-200 text-stone-300"}`}
      />
      <div className="col-span-2 h-full overflow-y-scroll">
        <List />
      </div>
    </div>
  );
}

export default MyList;
