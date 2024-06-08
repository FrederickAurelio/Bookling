import { formatDate } from "../../utils/helpers";

function DetailItem({ text, icon:Icon,  type="regular" }) {
  const textClass = type==="desc"? "w-[30rem] text-justify text-sm" : "";

  return (
    <div className={`flex gap-2 py-2 text-xl text-stone-700 ${type==="desc"? "py-2" : "items-center"}`}>
      <Icon size={36} />
      <p className={textClass}>{type==="date"? formatDate(text) : text}</p>
    </div>
  );
}

export default DetailItem;
