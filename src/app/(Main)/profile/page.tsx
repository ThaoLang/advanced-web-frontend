"use client";
import ProfileForm from "@/component/ProfileForm";
import { useUser } from "@/context/UserContext";
import React, { useState } from "react";

export default function Profile() {
  const { user, logoutUser, loginUser } = useUser();
  const [email, setEmail] = useState("nguyen@gmail.com");
  const [username, setUsername] = useState("Khanh");
  const [profilePicture, setProfilePicture] = useState(
    "https://api.lorem.space/image/face?w=120&h=120&hash=bart89fe"
  );

  const handleSaveInfo = (
    _username: string,
    _email: string,
    _profilePicture: string
  ) => {
    setUsername(_username);
    setEmail(_email);
    setProfilePicture(_profilePicture);
  };

  return (
    <div className="flex justify-center space-x-2 h-fit">
      <div>
        {user ? (
          <div>
            <p>Welcome, {user.username}!</p>
            <button onClick={logoutUser}>Logout</button>
          </div>
        ) : (
          <p>Please log in</p>
        )}
      </div>
      {/* <ProfileForm
        username={username}
        email={email}
        profilePicture={profilePicture}
        saveInfo={handleSaveInfo}
      /> */}
    </div>
  );
}
