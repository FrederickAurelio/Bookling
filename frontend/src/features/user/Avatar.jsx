import { Link, useLocation } from "react-router-dom";

function Avatar({ type = "regular" }) {
  let avatar;
  let name = "Frederickaurelio";
  const styles = {
    regular: {
      link: "items-center justify-center hover:scale-110",
      img: "size-8",
      p: "p-2 text-[14px]",
    },
    small: {
      link: "items-center decoration-stone-700 decoration-stone-100 items-start hover:underline",
      img: "size-6",
      p: "px-1 text-xs",
    },
  };

  const location = useLocation();
  const currentParams = new URLSearchParams(location.search);
  const userName = "FrederickAurelio";

  return (
    <Link
      to={`/books/user/${userName}?${currentParams.toString()}`}
      className={`items flex cursor-pointer duration-200 ${styles[type].link}`}
    >
      <img
        className={`aspect-square rounded-full object-cover ${styles[type].img}`}
        src={avatar ? avatar : "https://i.ibb.co/WBG9ZjJ/default-avatar.jpg"}
        alt="User avatar"
      />
      <p className={`font-medium text-stone-700 ${styles[type].p}`}>
        {name}
      </p>
    </Link>
  );
}

export default Avatar;
