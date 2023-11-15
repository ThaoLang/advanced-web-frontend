"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

import Link from "next/link";
import axios from "axios";
import { useAuth } from "@/context/AuthContext";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { UserType } from "@/model/UserType";

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
  const invalidEmailMsg = "Email is invalid.";
  const invalidPasswordMsg =
    "Password must be at least 8 characters with at least one uppercase\
  letter, one special character, and one digit.";
  const router = useRouter();

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
      setValidAuthMsg(invalidEmailMsg);
      console.error("Error email");
      return false;
    }
    if (!isPassword(password)) {
      setValidAuthMsg(invalidPasswordMsg);
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
        avatarUrl: `https://api.lorem.space/image/face?w=120&h=120&hash=bart89fe`
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
    setIsPasswordVisible(false);
  };

  function togglePasswordVisibility() {
    setIsPasswordVisible((prevState) => !prevState);
  }

  return (
    <div className="flex flex-col border rounded-xl p-4 m-8 w-96 mx-auto my-auto bg-white">
      <label className="font-semibold text-4xl text-center p-2">LightHub</label>
      {isSignupOpeneded && (
        <input
          type="text"
          placeholder="Username"
          className="input input-bordered w-full max-w-xs m-2 mx-auto"
          value={username}
          maxLength={15}
          onChange={(e) => setUsername(e.target.value)}
        />
      )}
      <input
        type="text"
        placeholder="Email"
        className="input input-bordered w-full max-w-xs m-2 mx-auto dark:bg-white dark:text-black "
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <div className="relative">
        <input
          type={isPasswordVisible ? "text" : "password"}
          placeholder="Password"
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
          Sign in
        </button>
      )}

      {isSignupOpeneded && (
        <button
          onClick={() => handleSignup()}
          className="btn btn-info w-full max-w-xs m-4 mx-auto mt-3"
        >
          Sign up
        </button>
      )}
      <div className="divider">OR</div>
      {isSigninOpeneded && (
        <label
          onClick={() => goToSignup()}
          className="flex text-center items-center justify-center"
        >
          Don&apos;t have an account?
          <span className="text-blue-500 ml-2">Signup</span>
        </label>
      )}
      {isSignupOpeneded && (
        <label
          onClick={() => goToLogin()}
          className="flex text-center items-center justify-center"
        >
          Already have an account?
          <span className="text-blue-500 ml-2">Login</span>
        </label>
      )}
    </div>
  );
}
