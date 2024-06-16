import {
  HiOutlineBookOpen,
  HiOutlineLockClosed,
  HiOutlineMail,
  HiOutlineUser,
} from "react-icons/hi";
import ButtonIcon from "../../ui/ButtonIcon";
import InputRow from "../bookdetails/InputRow";
import AvatarForm from "./AvatarForm";
import { useForm } from "react-hook-form";
import { useAuth } from "../../context/AuthContext";
import { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { HiOutlineKey } from "react-icons/hi2";

function SignUp() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
  } = useForm();

  async function onSubmit(data) {
    setIsLoading(true);
    const formData = new FormData();
    formData.append("username", data.username);
    formData.append("password", data.password);
    formData.append("email", data.email);
    formData.append("icon", data.icon);
    // BELUM FIX

    try {
      // const token = await loginApi(formData);
      // await login(token.access);
      // handle success
      toast.success("Login Success!");
      navigate("/books");
    } catch (error) {
      // if (error.response) {
      //   if (error.response.status === 400 || error.response.status === 401) {
      //     toast.error("Invalid username or password.");
      //   } else if (error.response.status === 403) {
      //     toast.error("Access timeout or forbidden.");
      //   } else {
      //     toast.error("Login failed. Please try again later.");
      //   }
      // } else if (error.request) {
      //   toast.error("Network error. Please check your internet connection.");
      // } else {
      console.error("Error:", error.message);
      toast.error("An unexpected error occurred. Please try again.");
      // }
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <InputRow
        className="bg-white"
        icon={HiOutlineUser}
        placeholder="Username"
        type="text"
        id="username"
        register={register}
        disabled={isLoading}
        errors={errors}
      />
      <InputRow
        className="bg-white"
        icon={HiOutlineMail}
        placeholder="Email"
        type="text"
        id="email"
        register={register}
        disabled={isLoading}
        errors={errors}
      />
      <InputRow
        className="bg-white"
        icon={HiOutlineLockClosed}
        placeholder="Password"
        type="password"
        id="password"
        register={register}
        disabled={isLoading}
        errors={errors}
      />
      <InputRow
        className="bg-white"
        icon={HiOutlineKey}
        placeholder="Confirm Password"
        type="password"
        id="confirmPassword"
        register={register}
        disabled={isLoading}
        errors={errors}
        validate={(value) =>
          value === getValues("password") || "Passwords do not match"
        }
      />
      <AvatarForm disabled={isLoading} />

      <span className="mt-5 flex justify-center">
        <ButtonIcon
          type="submit"
          icon={HiOutlineBookOpen}
          text="SignUp"
          className="text-rose-700 hover:scale-110"
          disabled={isLoading}
        />
      </span>
    </form>
  );
}

export default SignUp;
