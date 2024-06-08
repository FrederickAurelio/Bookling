import {
  HiOutlineBookOpen,
  HiOutlineLockClosed,
  HiOutlineMail,
  HiOutlineUser,
} from "react-icons/hi";
import ButtonIcon from "../../ui/ButtonIcon";
import InputRow from "../bookdetails/InputRow";
import AvatarForm from "./AvatarForm";

function SignUp() {
  return (
    <form>
      <InputRow
        className="bg-white"
        icon={HiOutlineUser}
        placeholder="Username"
        type="text"
        id="username"
      />
      <InputRow
        className="bg-white"
        icon={HiOutlineMail}
        placeholder="Email"
        type="text"
        id="email"
      />
      <InputRow
        className="bg-white"
        icon={HiOutlineLockClosed}
        placeholder="Password"
        type="password"
        id="password"
      />
      <InputRow
        className="bg-white"
        icon={HiOutlineLockClosed}
        placeholder="Confirm Password"
        type="password"
        id="confirmPassword"
      />
      <AvatarForm />

      <span className="mt-5 flex justify-center">
        <ButtonIcon
          type="submit"
          icon={HiOutlineBookOpen}
          text="SignUp"
          className="text-rose-700 hover:scale-110"
        />
      </span>
    </form>
  );
}

export default SignUp;
