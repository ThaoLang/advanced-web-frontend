"use client";

import { useEffect } from "react";
import LandingPage from "@/component/LandingPage";
import HomePage from "@/component/HomePage";
import { useAuth } from "@/context/AuthContext";
import CredentialError from "@/component/admin/CredentialError";
import { useTranslations } from "next-intl";

export default function Home() {
  const auth = useAuth();
  // const t = useTranslations("Homepage");
  
  // useEffect(() => {
  //   const savedUser = localStorage.getItem("user");
  //   if (savedUser !== null) {
  //     // Assuming UserType has a structure like { email: string }
  //     auth.login(JSON.parse(savedUser));
  //   }
  // }, []);

  return (
    <div>
      {auth.user && auth.user.status === 'normal' ? (
        <HomePage />
      ) : (
        <LandingPage />
      )}
    </div>
  );
};
