"use client";
import { UserType } from "@/model/UserType";
import axios from "axios";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";

export default function OAuthSuccessRedirect() {
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const getCurrentUser = async (access_token: string) => {
      const response = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_PREFIX}auth/user`, {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      }).then(function (response) {
        const cur_user: UserType = response.data;
        localStorage.setItem("user", JSON.stringify(cur_user));
        router.push("/");
      }).catch(function (error) {
        console.log("ERROR: ",error);
      }).finally(function () {
      })
    };

    const access_token = searchParams.get("code");
    // console.log("LTTbh", access_token);
    if (access_token) {
      console.log("ACCESS_TOKEN", access_token);
      getCurrentUser(access_token);
    }
  }, []);


  // const access_token = searchParams.get("code");
  // console.log("LTTbh", access_token);
  // if (access_token) {
  //   console.log("ACCESS_TOKEN", access_token);
  // router.push("/");
  // localStorage.setItem(
  //   "user",
  //   JSON.stringify({
  //     email: "langthao200243@gmail.com",
  //     username: "Lăng Thảo",
  //     access_token:
  //       "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE3MDE4NzM4ODcsImV4cCI6MTcwMTk2MDI4N30.XUrJ3xapU4xx72HaavZgbZWUmpQUrbhQHKBuR8beqrA",
  //     refresh_token:
  //       "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE3MDE4NzM4ODcsImV4cCI6MTcwMTk2MDI4N30.XUrJ3xapU4xx72HaavZgbZWUmpQUrbhQHKBuR8beqrA",
  //   })
  // );
  // }
  return (
    <span className="fixed inset-0 flex loading loading-spinner text-info items-center justify-center"></span>
  );
}
