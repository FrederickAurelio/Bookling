import { Link, NavLink, Outlet, useNavigate } from "react-router-dom";

function Logins() {
  const className = ({ isActive }) => {
    return `duration-200 col-span-1 mb-2 border-b-2 text-center ${isActive ? "border-rose-700 text-rose-700" : "border-stone-200 text-stone-300"}`;
  };

  return (
    <div className="h-dvh bg-stone-100">
      <div className="fixed left-1/2 top-1/2 grid w-96 -translate-x-1/2 -translate-y-1/2 transform grid-cols-2 rounded-2xl bg-white p-8 shadow-lg">
        <NavLink to="/logins/login" className={className}>
          Login
        </NavLink>
        <NavLink to="/logins/signup" className={className}>
          SignUp
        </NavLink>
        <div className="col-span-2">
          <Outlet />
        </div>
      </div>
      <Link
        to="/books"
        className="fixed left-3 top-2 cursor-pointer text-lg font-semibold duration-200 hover:scale-110"
      >
        {"<-- Back"}
      </Link>
    </div>
  );
}

export default Logins;
