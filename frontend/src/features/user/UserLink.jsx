import { Link } from "react-router-dom";

function UserLink() {
  return (
    <Link
      to="/books/user/${userName}?${currentParams.toString()}"
      className={`items flex cursor-pointer items-center decoration-stone-700 duration-200 hover:underline`}
    >
      <img
        className={`aspect-square size-6 rounded-full object-cover`}
        src={"https://i.ibb.co/WBG9ZjJ/default-avatar.jpg"}
        alt="User avatar"
      />
      <p className={`px-1 text-xs font-medium text-stone-700`}>
        FrederickAurelio
      </p>
    </Link>
  );
}

export default UserLink;
