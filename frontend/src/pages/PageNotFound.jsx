import { HiOutlineArrowLeft } from "react-icons/hi";
import { Link } from "react-router-dom";

function PageNotFound() {
  return (
    <div className="bg-stone-100 h-dvh pt-48 flex flex-col items-center text-3xl font-semibold">
      <p>Page Not Found</p>
      <Link className="flex justify-center items-center gap-2 hover:underline" to="/books">{"<-- Back"}</Link>
    </div>
  );
}

export default PageNotFound;
