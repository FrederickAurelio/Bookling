import { HiOutlineArchiveBox, HiOutlineHeart } from "react-icons/hi2";
import { useState } from "react";
import ButtonIcon from "../../ui/ButtonIcon";
import MyLikeList from "./MyLikeList";
import MyPostList from "./MyPostList";

function ActiveTab() {
  const [activeTab, setActiveTab] = useState("archive");
  return (
    <div className="grid h-full w-full grid-cols-2 overflow-hidden">
      <ButtonIcon
        onClick={() => setActiveTab("archive")}
        icon={HiOutlineArchiveBox}
        className={`h-fit border-b-2 py-1 hover:scale-100 ${activeTab === "archive" ? "border-rose-700 text-rose-700" : "border-stone-200 text-stone-300"}`}
      />
      <ButtonIcon
        onClick={() => setActiveTab("heart")}
        icon={HiOutlineHeart}
        className={`h-fit border-b-2 py-1 hover:scale-100 ${activeTab === "heart" ? "border-rose-700 text-rose-700" : "border-stone-200 text-stone-300"}`}
      />
      {activeTab === "heart" && <MyLikeList />}
      {activeTab === "archive" && <MyPostList />}
    </div>
  );
}

export default ActiveTab;
