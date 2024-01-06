"use client";
import { UserType } from "@/model/UserType";
import axios from "axios";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function OAuthSuccessRedirect() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [access_token, setAcessToken] = useState(searchParams.get("code"));

  const getCurrentUser = async (access_token: string) => {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_BACKEND_PREFIX}auth/user`,
      // `http://localhost:4000/auth/user`,
      {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      }
    );
    if (response.status === 200) {
      const cur_user: UserType = response.data;

      localStorage.setItem("user", JSON.stringify(cur_user));
    }
    router.push(
      process.env.NEXT_PUBLIC_FRONTEND_PREFIX
        ? process.env.NEXT_PUBLIC_FRONTEND_PREFIX
        : "/"
    );
  };

  if (access_token) {
    getCurrentUser(access_token);
  } else {
    return (
      <span className="loading loading-spinner text-info items-center justify-center"></span>
    );
  }
}
