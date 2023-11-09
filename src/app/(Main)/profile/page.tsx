"use client";
import ProfileForm from "@/component/ProfileForm";
import React, { useRef, useState } from "react";

export default function Profile() {
  const [email, setEmail] = useState("nguyen@gmail.com");
  const [username, setUsername] = useState("Khanh");

  // const ref = useRef(null);
  // React.useEffect(() => {
  //   import("@lottiefiles/lottie-player");
  // });

  // const lottie = (
  //   <lottie-player
  //     id="firstLottie"
  //     ref={ref}
  //     autoPlay
  //     loop
  //     mode="normal"
  //     src="https://lottie.host/9342dcd6-d160-4053-8484-c8512cdfc118/i1yBLMEWuB.json"
  //     style={{ width: "400px", height: "400px" }}
  //     className="absolute bottom-4"
  //   />
  // );

  const handleSaveInfo = (_username: string, _email: string) => {
    setUsername(_username);
    setEmail(_email);
  };

  return (
    <div className="flex justify-center space-x-2 h-fit">
      {/* <div className="hidden md:block">{lottie}</div> */}
      <ProfileForm
        username={username}
        email={email}
        saveInfo={handleSaveInfo}
      />
    </div>
  );
}