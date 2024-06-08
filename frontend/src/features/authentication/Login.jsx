import {
  HiOutlineLockClosed,
  HiOutlineLogin,
  HiOutlineUser,
} from "react-icons/hi";
import InputRow from "../bookdetails/InputRow";
import ButtonIcon from "../../ui/ButtonIcon";

function Login() {
  return (
    <form>
      <InputRow
        className="bg-white"
        icon={HiOutlineUser}
        placeholder="Email / Username"
        type="text"
        id="username"
      />
      <InputRow
        className="bg-white"
        icon={HiOutlineLockClosed}
        placeholder="Password"
        type="password"
        id="password"
      />
      <span className="mt-5 flex justify-center">
        <ButtonIcon
          type="submit"
          icon={HiOutlineLogin}
          text="Login"
          className="text-rose-700 hover:scale-110"
        />
      </span>
    </form>
  );
}

export default Login;
