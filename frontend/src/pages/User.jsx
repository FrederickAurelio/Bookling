import Profile from "../features/user/Profile";
import { useUser } from "../features/user/useUser";
import { useParams } from "react-router-dom";
import Spinner from "../ui/Spinner";
import ActiveTab from "../features/user/ActiveTab";

function User() {
  const { username } = useParams();
  const { isPending, user } = useUser(username);
  if (isPending) return <Spinner />;
  return (
    <div className="col-span-3 grid grid-cols-12 overflow-hidden bg-stone-100">
      <div className="col-start-3 col-end-10 mt-10 flex flex-col items-center overflow-hidden">
        <Profile username={user?.username} icon={user?.profile?.icon} />
        <ActiveTab />
      </div>
    </div>
  );
}

export default User;
