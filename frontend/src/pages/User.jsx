import Profile from "../features/user/Profile";
import MyList from "../features/user/MyList";
import { useUser } from "../features/user/useUser";
import { useParams } from "react-router-dom";
import Spinner from "../ui/Spinner";

function User() {
  const { username } = useParams();
  const { isPending, user } = useUser(username);
  if (isPending) return <Spinner />;
  return (
    <div className="col-span-3 grid grid-cols-12 overflow-hidden bg-stone-100">
      <div className="col-start-3 col-end-10 mt-10 flex flex-col items-center overflow-hidden">
        <Profile username={user?.username} icon={user?.profile?.icon} />
        <MyList />
      </div>
    </div>
  );
}

export default User;
