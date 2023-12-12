"use client";
import { useRecoveryContext } from "@/context/RecoveryContext";
import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { useTranslations } from "next-intl";

interface ResetPasswordProps {
  setSuccessMsg: (msg: string) => void;
  setErrorMsg: (msg: string) => void;
  showSuccessMsg: (show: boolean) => void;
  showErrorMsg: (show: boolean) => void;
}

export default function ResetPassword(props: ResetPasswordProps) {
  const context = useRecoveryContext();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isConfirmPasswordVisible, setIsConfirmPasswordVisible] = useState(false);
  const [validAuthMsg, setValidAuthMsg] = useState<string | null>(null);
  const [checked, setChecked] = useState(false)
  const router = useRouter();
  const t = useTranslations("Authentication");

  const isPassword = (password: string) => {
    const regex = /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*\W)(?!.* ).{8,16}$/;
    return regex.test(password);
  };

  const isMatchingPassword = () => (confirmPassword === password);

  const handleClick = () => setChecked(!checked);

  function togglePasswordVisibility() {
    setIsPasswordVisible((prevState) => !prevState);
  }

  function toggleConfirmPasswordVisibility() {
    setIsConfirmPasswordVisible((prevState) => !prevState);
  }

  const handleResetPassword = async () => {
    if (!checked) {
      setValidAuthMsg(t("accept_terms_and_conditions_msg"));
      props.setSuccessMsg(t("accept_terms_and_conditions_msg"));
        props.showSuccessMsg(true);
        setTimeout(() => {
          props.showSuccessMsg(false);
        }, 2000);
      return;
    }
    if (!isPassword(password) || !isPassword(confirmPassword)) {
      setValidAuthMsg(t("password_error_msg"));
      return;
    }
    if (!isMatchingPassword()) {
      setValidAuthMsg(t("password_not_match_msg"));
      return;
    }

    context.password = password;
    try {
      const response = await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_PREFIX}auth/reset-password`, {
        email: context.email,
        password: context.password,
      });
      if (response.status === 201) {
        props.setSuccessMsg(t("reset_password_success_msg"));
        props.showSuccessMsg(true);
        setTimeout(() => {
          props.showSuccessMsg(false);
        }, 2000);
      }
      router.push('/auth')
    } catch (error: any) {
      const errorMessage =
        error.response && error.response.data
          ? error.response.data.message
          : "Failed to reset password";
      setValidAuthMsg(errorMessage);

      console.error("Failed to reset password:", error);
    }

  }

  return (
    <React.Fragment>
      <section className="bg-gray-50 w-screen dark:bg-gray-900">
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
          <div className="w-full p-6 bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md dark:bg-gray-800 dark:border-gray-700 sm:p-8">
            <h2 className="mb-1 text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
              Change Password
            </h2>
            <div className="mt-4 space-y-4 lg:mt-5 md:space-y-5">
              <div className="relative">
                <label
                  htmlFor="password"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  New Password
                </label>
                <input
                  type={isPasswordVisible ? "text" : "password"}
                  name="password"
                  id="password"
                  value={password}
                  placeholder="••••••••"
                  maxLength={16}
                  onChange={(e) => setPassword(e.target.value)}
                  className="input input-bordered w-full m-2 mx-auto dark:bg-white dark:text-black"
                ></input>
                <button
                  className="absolute inset-y-0 right-4 top-7 text-lg lg:text-2xl flex items-center text-gray-600"
                  onClick={togglePasswordVisibility}
                >
                  {isPasswordVisible ? <AiOutlineEye /> : <AiOutlineEyeInvisible />}
                </button>
              </div>
              <div className="relative">
                <label
                  htmlFor="confirm-password"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                  Confirm password
                </label>
                <input
                  type={isConfirmPasswordVisible ? "text" : "password"}
                  name="confirm-password"
                  id="confirm-password"
                  value={confirmPassword}
                  placeholder="••••••••"
                  maxLength={16}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="input input-bordered w-full m-2 mx-auto dark:bg-white dark:text-black"
                ></input>
                <button
                  className="absolute inset-y-0 right-4 top-7 text-lg lg:text-2xl flex items-center text-gray-600"
                  onClick={toggleConfirmPasswordVisibility}
                >
                  {isConfirmPasswordVisible ? <AiOutlineEye /> : <AiOutlineEyeInvisible />}
                </button>
              </div>
              {validAuthMsg && (
                <label className="flex text-center items-center justify-center my-3 text-red-700">
                  {validAuthMsg}
                </label>
              )}
              <div className="flex items-start">
                <div className="flex items-center h-5">
                  <input
                    id="newsletter"
                    aria-describedby="newsletter"
                    type="checkbox"
                    checked={checked}
                    onClick={handleClick}
                    className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800"
                  ></input>
                </div>
                <div className="ml-3 text-sm">
                  <label
                    htmlFor="newsletter"
                    className="font-light text-gray-500 dark:text-gray-300"
                    >
                    I accept the{" "}
                    <a
                      className="font-medium text-primary-600 hover:underline dark:text-primary-500"
                      href="#"
                      >
                      Terms and Conditions
                    </a>
                  </label>
                </div>
              </div>
            </div>
            <button
              onClick={() => handleResetPassword()}
              className="w-full mt-5 text-white btn btn-info 
              bg-primary-600 hover:bg-primary-700 focus:ring-4 f
              ocus:outline-none focus:ring-primary-300 font-medium 
              rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 
              dark:hover:bg-primary-700 dark:focus:ring-primary-800"
            >
              Reset password
            </button>
          </div>
        </div>
      </section>
              </React.Fragment>
  );
}