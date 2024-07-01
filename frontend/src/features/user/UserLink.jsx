import { Link } from "react-router-dom";

function UserLink({username, icon}) {
  const currentParams = new URLSearchParams(location.search);
  
  return (
    <Link
      to={`/books/user/${username}?${currentParams.toString()}`}
      className={`items flex cursor-pointer items-center decoration-stone-700 duration-200 hover:underline`}
    >
      <img
        className={`aspect-square size-6 rounded-full object-cover`}
        src={icon}
        alt="User avatar"
      />
      <p className={`px-1 text-xs font-medium text-stone-700`}>
        {username}
      </p>
    </Link>
  );
}

export default UserLink;
