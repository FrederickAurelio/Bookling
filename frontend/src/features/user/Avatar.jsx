import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { useUser } from "./useUser";
import Spinner from "../../ui/Spinner";
import MiniSpiner from "../../ui/MiniSpiner";

function Avatar() {
  const navigate = useNavigate();
  const location = useLocation();
  const currentParams = new URLSearchParams(location.search);
  const userName = "FrederickAurelio";
  const {
    authState: { isAuthenticated },
  } = useAuth();

  const {user, isPending} = useUser();

  function handleClick() {
    if (isAuthenticated)
      navigate(`/books/user/${userName}?${currentParams.toString()}`);
    else navigate(`/logins`);
  }

  if(isPending) return <MiniSpiner />
  return (
    <div
      onClick={handleClick}
      className={`items flex cursor-pointer items-center justify-center duration-200 hover:scale-110`}
    >
      <img
        className={`aspect-square size-8 rounded-full object-cover`}
        src={"https://i.ibb.co/WBG9ZjJ/default-avatar.jpg"}
        alt="User avatar"
      />
      <p className={`p-2 text-[14px] font-medium text-stone-700`}>Guests</p>
    </div>
  );
}

export default Avatar;
