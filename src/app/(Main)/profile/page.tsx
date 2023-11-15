"use client";
import ProfileForm from "@/component/ProfileForm";
import { UserType } from "@/model/UserType";
import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext";

export default function Profile() {
  const auth = useAuth();
  // const [email, setEmail] = useState("nguyen@gmail.com");
  // const [username, setUsername] = useState("Khanh");
  // const [profilePicture, setProfilePicture] = useState(
  //   "https://api.lorem.space/image/face?w=120&h=120&hash=bart89fe"
  // );
  // const [user, setUser] = useState<UserType | null>(null);
  const [showSuccessMsg, setShowSuccessMsg] = useState(false);
  const [showFailedMsg, setShowFailedMsg] = useState(false);
  const router = useRouter();

  const updateProfile = async (
    _username: string,
    _email: string,
    _profilePicture: string
  ) => {
    // setUser((prevUser: UserType | null) => {
    //   if (!prevUser) {
    //     const savedUser = localStorage.getItem("user");
    //     if (savedUser) {
    //       const curUser: UserType = JSON.parse(savedUser);
    //       return curUser;
    //     }
    //     return null;
    //   }

    //   return {
    //     ...prevUser,
    //     username: _username,
    //     email: _email,
    //   };
    // });

    // setProfilePicture(_profilePicture);
    try {
      const response = await axios.put(
        `http://localhost:4000/profile/update`,
        {
          email: auth.user?.email,
          username: auth.user?.username,
          avatarUrl: auth.user?.avatarUrl,
        },
        {
          headers: {
            Authorization: `Bearer ${auth.user?.access_token}`,
          },
        }
      );
      if (response.status === 201) {
        setShowSuccessMsg(true);
        setTimeout(() => {
          setShowSuccessMsg(false);
        }, 2000);
      }
    } catch (error: any) {
      setShowFailedMsg(true);
      setTimeout(() => {
        setShowFailedMsg(false);
      }, 2000);
      const errorMessage =
        error.response && error.response.data
          ? error.response.data.message
          : "Failed to login";

      console.error("Failed to login:", error);
    }
  };

  const handleSaveInfo = (
    _username: string | undefined,
    _email: string | undefined,
    _profilePicture: string | undefined
  ) => {
    auth.updateUser(_username, _profilePicture);
  };

  useEffect(() => {
    const savedUser = localStorage.getItem("user");

    if (savedUser) {
      const curUser: UserType = JSON.parse(savedUser);
      auth.login(curUser);
    }
  }, []);

  return (
    <div className="flex justify-center space-x-2 h-fit">
      {showSuccessMsg && (
        <div className=" w-1/2 mx-auto mt-4 alert alert-success ">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="stroke-current shrink-0 h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="1"
              d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <span>Update profile successfully!</span>
        </div>
      )}
      {showFailedMsg && (
        <div className="w-1/2 mx-auto mt-4 alert alert-error">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="stroke-current shrink-0 h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <span>Fail to update profile!</span>
        </div>
      )}
      <ProfileForm user={auth.user} saveInfo={handleSaveInfo} />
    </div>
  );
}
