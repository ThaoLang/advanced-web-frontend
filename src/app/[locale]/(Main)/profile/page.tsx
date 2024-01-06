"use client";
import ProfileForm from "@/component/ProfileForm";
import { UserType } from "@/model/UserType";
import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { useTranslations } from "next-intl";

export default function Profile() {
  const auth = useAuth();
  const [showSuccessMsg, setShowSuccessMsg] = useState(false);
  const [showFailedMsg, setShowFailedMsg] = useState(false);
  const t = useTranslations("Profile");
  const [rawImage, setRawImage] = useState<any>(null);

  // Create an S3 instance
const s3 = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_DO_SPACES_URL}`,
  headers: {
    'Content-Type': 'application/octet-stream',
    'x-amz-acl': 'public-read',
    'Authorization': `Bearer ${auth.user?.access_token}`,
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS"
  },
});

  const updateProfile = async (
    _username: string,
    // _email: string,
    _studentId: string,
    _profilePicture: any
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
      console.log("USE", _username);
      console.log("USE", _profilePicture) ;
      console.log("USE", rawImage.name) ;
      
      console.log("EXTENSION: ", getFileExtension(rawImage.name));

      const avatarFileName = `/avatar/${extractUsernameFromEmail(auth.user?.email!)}.${getFileExtension(rawImage.name)}`;
      console.log("AVATAR FILE NAME: ", avatarFileName);  
      await fetchUploadAvatar(rawImage, avatarFileName).catch(console.error);
      const response = await axios.put(
        `${process.env.NEXT_PUBLIC_BACKEND_PREFIX}profile/update`,
        {
          // email: _email,
          username: _username,
          avatarUrl: avatarFileName,
          studentId: _studentId,
        },
        {
          headers: {
            Authorization: `Bearer ${auth.user?.access_token}`,
          },
        }
      );
      if (response.status === 200) {
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
    }
  };

  const extractUsernameFromEmail = (email: string) =>{
    const atIndex = email.indexOf('@');
  
    if (atIndex !== -1) {
      return email.slice(0, atIndex);
    } else {
      throw new Error('Invalid email format');
    }
  }

  function getFileExtension(filename: string): string {
    return filename.slice(((filename.lastIndexOf(".") - 1) >>> 0) + 2);
  }

  const fetchUploadAvatar = async (file: any, fileName: string) => {
    try {
      const response = await s3.put(`/${process.env.NEXT_PUBLIC_DO_SPACES_BUCKET}${fileName}`, file);
      console.log('Upload successful:', response.data);
    } catch (error) {
      console.error('Error uploading file:', error);
    }
  };
  

  const handleSaveInfo = async (
    _username: string | undefined,
    // _email: string | undefined,
    _studentId: string | undefined,
    _profilePicture: any
  ) => {
    
    auth.updateUser(_username, _profilePicture, _studentId);
    if (auth.user)
      await updateProfile(
        _username ? _username : "",
        // _email ? _email : "",
        _studentId ? _studentId : "",
        _profilePicture
      );
  };

  useEffect(() => {
    const savedUser = localStorage.getItem("user");

    if (savedUser != null) {
      const curUser: UserType = JSON.parse(savedUser);
      auth.login(curUser);
    }
  }, []);

  return (
    <div className="flex flex-col justify-center space-x-2 h-fit">
      {showSuccessMsg && (
        <div className="w-1/2 mx-auto mt-4 alert alert-success ">
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
          <span>{t("update_success")}</span>
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
          <span>{t("update_error")}</span>
        </div>
      )}
      {auth.user && <ProfileForm 
        user={auth.user} 
        saveInfo={handleSaveInfo} 
        setRawImage={setRawImage}/>}
    </div>
  );
}
