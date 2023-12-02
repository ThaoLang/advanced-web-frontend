"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import axios from "axios";
import { useAuth } from "@/context/AuthContext";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { UserType } from "@/model/UserType";
import { useTranslations } from "next-intl";

interface AuthFormProps {
  showSuccessMsg: (show: boolean) => void;
}
export default function AuthForm(props: AuthFormProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [isSigninOpeneded, setIsSigninOpeneded] = useState(true);
  const [isSignupOpeneded, setIsSignupOpeneded] = useState(false);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [validAuthMsg, setValidAuthMsg] = useState<string | null>(null);
  const router = useRouter();
  const t = useTranslations("Authentication");

  const isEmail = (email: string) => {
    const regex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
    return regex.test(email);
  };

  const isPassword = (password: string) => {
    const regex = /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*\W)(?!.* ).{8,16}$/;
    return regex.test(password);
  };

  const isValidAuth = (email: string, password: string) => {
    setValidAuthMsg(null);
    if (!isEmail(email)) {
      setValidAuthMsg(t("email_error_msg"));
      console.error("Error email");
      return false;
    }
    if (!isPassword(password)) {
      setValidAuthMsg(t("password_error_msg"));
      console.error("Error password");
      return false;
    }
    return true;
  };

  const handleLogin = async () => {
    if (!isValidAuth(email, password)) return;

    try {
      const response = await axios.post(`http://localhost:4000/auth/login`, {
        email: email,
        password: password,
      });
      if (response.status === 201) {
        const cur_user: UserType = response.data;

        localStorage.setItem("user", JSON.stringify(cur_user));
      }
      router.push("/");
    } catch (error: any) {
      const errorMessage =
        error.response && error.response.data
          ? error.response.data.message
          : "Failed to login";
      setValidAuthMsg(errorMessage);

      console.error("Failed to login:", error);
    }
  };

  const handleSignup = async () => {
    if (!isValidAuth(email, password)) return;

    try {
      const response = await axios.post(`http://localhost:4000/auth/register`, {
        email: email,
        password: password,
        username: username,
        avatarUrl: `https://api.lorem.space/image/face?w=120&h=120&hash=bart89fe`,
      });

      if (response.status === 201) {
        props.showSuccessMsg(true);
        setTimeout(() => {
          props.showSuccessMsg(false);
        }, 2000);
      }
    } catch (error: any) {
      const errorMessage =
        error.response && error.response.data
          ? error.response.data.message
          : "Failed to register";
      setValidAuthMsg(errorMessage);

      console.error("Failed to login:", error);
    }
  };

  const goToLogin = async () => {
    setValidAuthMsg(null);
    setIsSignupOpeneded(false);
    setIsSigninOpeneded(true);
    setIsPasswordVisible(false);

  };
  const goToSignup = async () => {
    setValidAuthMsg(null);
    setIsSigninOpeneded(false);
    setIsSignupOpeneded(true);
  };


  function togglePasswordVisibility() {
    setIsPasswordVisible((prevState) => !prevState);
  }

  function goToResetPassword(): void {
    router.push('/forget_password');
  }

  return (
    <div className="flex flex-col border rounded-xl p-4 m-8 w-96 mx-auto my-auto bg-white">
      <label className="font-semibold text-4xl text-center p-2">LightHub</label>
      {isSignupOpeneded && (
        <input
          type="text"
          placeholder={t("username")}
          className="input input-bordered w-full max-w-xs m-2 mx-auto"
          value={username}
          maxLength={15}
          onChange={(e) => setUsername(e.target.value)}
        />
      )}

      <input
        type="text"
        placeholder={t("email")}
        className="input input-bordered w-full max-w-xs m-2 mx-auto dark:bg-white dark:text-black "
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />


        <div className="relative">
          <input
            type={isPasswordVisible ? "text" : "password"}
            placeholder={t("password")}
            className="input input-bordered w-full max-w-xs ml-4 mt-2 mx-auto"
            value={password}
            maxLength={16}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button
            className="absolute inset-y-0 right-4 flex items-center pt-2 px-4 text-gray-600"
            onClick={togglePasswordVisibility}
          >
            {isPasswordVisible ? <AiOutlineEye /> : <AiOutlineEyeInvisible />}
          </button>
        </div>
      {validAuthMsg && (
        <label className="flex text-center items-center justify-center my-3 text-red-700">
          {validAuthMsg}
        </label>
      )}
      {/* {validAuthMsg === "password" && (
        <label className="flex text-center items-center justify-center my-3 text-red-700">
          Password must be at least 8 characters with at least one uppercase
          letter, one special character, and one digit.
        </label>
      )} */}

      {isSigninOpeneded && (
        <button
          onClick={() => handleLogin()}
          className="btn btn-info w-full max-w-xs m-4 mx-auto mt-3"
        >
          {t("signin_btn")}
        </button>
      )}

      {isSignupOpeneded && (
        <button
          onClick={() => handleSignup()}
          className="btn btn-info w-full max-w-xs m-4 mx-auto mt-3"
        >
          {t("signup_btn")}
        </button>
      )}
        <div className="divider">{t("or")}</div>

      {isSigninOpeneded && (
        <label
          onClick={() => goToSignup()}
          className="flex text-center items-center justify-center"
        >
          {t("go_to_signup_mg")}
          <span className="text-blue-500 ml-2">{t("signup_btn")}</span>
        </label>
      )}
      {isSignupOpeneded && (
        <label
          onClick={() => goToLogin()}
          className="flex text-center items-center justify-center"
        >
          {t("go_to_signin_mg")}
          <span className="text-blue-500 ml-2">{t("signin_btn")}</span>
        </label>
      )}
      {isSigninOpeneded && (
        <>
          <div className="divider">{t("or")}</div>
          <label onClick={() => goToResetPassword()}
            className="flex text-center items-center justify-center italic text-blue-500 ml-2">
            {t("go_to_password_reset_mg")}
          </label>
        </>
      )}
    </div>
  );
}
