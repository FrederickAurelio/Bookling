import Profile from "../features/user/Profile";
import MyList from "../features/user/MyList";

function User() {
  return (
    <div className="bg-stone-100 col-span-3 grid grid-cols-12 overflow-hidden">
      <div className="col-start-3 col-end-10 mt-10 flex flex-col items-center overflow-hidden">
        <Profile />
        <MyList />
      </div>
    </div>
  );
}

export default User;
