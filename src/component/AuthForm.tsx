"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation"
import Image from "next/image";
import Link from "next/link";
import axios from 'axios';
import { User, useAuth } from "@/context/AuthContext";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";

export default function AuthForm() {
  const apiUrl = "http://localhost:4000";
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [isSigninOpeneded, setIsSigninOpeneded] = useState(true);
  const [isSignupOpeneded, setIsSignupOpeneded] = useState(false);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isNotValidAuth, setIsNotValidAuth] = useState("");
  const router = useRouter();

  const auth = useAuth();

  const isEmail = (email: string) => {
    const regex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
    return regex.test(email);
  } 

  const isPassword = (password: string) => {
    const regex = /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*\W)(?!.* ).{8,16}$/;
    return regex.test(password);
  } 

  const isValidAuth = (email: string, password: string) => {
    setIsNotValidAuth("");
    if (!isEmail(email)){
      setIsNotValidAuth("email");
      console.error("Error email");
      return false;
    }
    if (!isPassword(password)){
      setIsNotValidAuth("password");
      console.error("Error password");
      return false;
    }
    return true;
  } 

  const handleLogin = async () => {
    if(!isValidAuth(email,password)) return;

    // try {
    //   const response = await axios.post(`${apiUrl}/auth/signin`, {
    //     email: email,
    //     password: password,
    //   });

    //   if (response.data) {
    //     const { username, email, roles, authToken } = response.data;

    //     console.log("AUTH", response.data);

    //     if (auth && "login" in auth) {
    //       auth.login({
    //         username: username,
    //         email: email,
    //       });
    //     }
    //   }
    // } catch (error) {
    //   console.error("Fail to login:", error);
    // }
    console.log("I'M HERE AUTHFORM");
    localStorage.setItem("email", email);
    localStorage.setItem("password", password);
    router.push('/');
  };

  const handleSignup = async () => {
    if(!isValidAuth(email,password)) return;

    try {
      const response = await axios.post(`${apiUrl}/auth/signup`, {
        email: email,
        password: password,
        username: username,
      });

      if (response.data) {
      }
    } catch (error) {
      console.error("Fail to sign up:", error);
    }
  };

  const goToLogin = async () => {
    setIsSignupOpeneded(false);
    setIsSigninOpeneded(true);
    setIsPasswordVisible(false);
  };
  const goToSignup = async () => {
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
          {isPasswordVisible ? ( <AiOutlineEye/> ) : ( <AiOutlineEyeInvisible/> )}
        </button>
      </div>
      {(isNotValidAuth==="email") && (
        <label
        className="flex text-center items-center justify-center my-3 text-red-700">
        Email is invalid.
        </label>
      )}
      {(isNotValidAuth==="password") && (
        <label
        className="flex text-center items-center justify-center my-3 text-red-700">
        Password must be at least 8 characters with at least one uppercase letter, one special character, and one digit.
        </label>
      )}

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
          Don't have an account?
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