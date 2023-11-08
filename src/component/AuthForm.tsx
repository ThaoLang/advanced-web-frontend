"use client";
import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import axios from "axios";
import { User, useAuth } from "@/context/AuthContext";

export default function AuthForm() {
  const apiUrl = "http://localhost:4000";
  const [isOpenedComment, setIsOpenedComment] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [isSigninOpeneded, setIsSigninOpeneded] = useState(true);
  const [isSignupOpeneded, setIsSignupOpeneded] = useState(false);
  const auth = useAuth();

  const closeModal = () => {
    setIsOpenedComment(false);
  };

  const handleLogin = async () => {
    try {
      const response = await axios.post(`${apiUrl}/auth/signin`, {
        email: email,
        password: password,
      });

      if (response.data) {
        const { username, email, roles, authToken } = response.data;

        console.log("AUTH", response.data);

        if (auth && "login" in auth) {
          auth.login({
            username: username,
            email: email,
          });
        }
      }

      closeModal();
    } catch (error) {
      console.error("Fail to login:", error);
    }
  };

  const handleSignup = async () => {
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
  };
  const goToSignup = async () => {
    setIsSigninOpeneded(false);
    setIsSignupOpeneded(true);
  };

  return (
    <div className="flex flex-col border rounded-xl p-4 m-8 w-96 mx-auto my-auto bg-white">
      <label className="font-semibold text-2xl text-center p-2">Shopping online</label>
      {isSignupOpeneded && (
        <input
          type="text"
          placeholder="Username"
          className="input input-bordered w-full max-w-xs m-2 mx-auto"
          value={email}
          onChange={(e) => setUsername(e.target.value)}
        />
      )}
      <input
        type="text"
        placeholder="Email"
        className="input input-bordered w-full max-w-xs m-2 mx-auto"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="text"
        placeholder="Password"
        className="input input-bordered w-full max-w-xs m-2 mx-auto"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      {isSigninOpeneded && (
        <button
          onClick={handleLogin}
          className="btn btn-info w-full max-w-xs m-4 mx-auto mt-6"
        >
          Sign in
        </button>
      )}

      {isSignupOpeneded && (
        <button
          onClick={handleSignup}
          className="btn btn-info w-full max-w-xs m-4 mx-auto mt-6"
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
          Don't have an account ?{" "}
          <span className="text-blue-500"> Signup</span>
        </label>
      )}
      {isSignupOpeneded && (
        <label
          onClick={() => goToLogin()}
          className="flex text-center items-center justify-center"
        >
          Already have an account ?{" "}
          <span className="text-blue-500"> Login</span>
        </label>
      )}
    </div>
  );
}
