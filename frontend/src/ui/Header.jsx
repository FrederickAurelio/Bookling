import Filter from "./Filter";
import BookSearch from "../features/booklist/BookSearch";
import BookSort from "../features/booklist/BookSort";
import Avatar from "../features/user/Avatar";
import { HiOutlineLogout } from "react-icons/hi";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function Header() {
  const {
    authState: { isAuthenticated },
  } = useAuth();

  return (
    <header className="flex h-16 min-h-16 items-center justify-around gap-2 border-b-2 border-stone-100 px-6">
      <BookSearch />
      <div className="flex items-center">
        <BookSort />
        <Filter label="Genre" options={["all", "education", "history"]} />
        <Filter label="Price" options={["all", ">10", "<10"]} />
      </div>
      <span className="flex items-center gap-1">
        <Avatar />
        {isAuthenticated && (
          <Link to="/logins">
            <HiOutlineLogout
              className="cursor-pointer hover:scale-110"
              size={22}
            />
          </Link>
        )}
      </span>
    </header>
  );
}

export default Header;
