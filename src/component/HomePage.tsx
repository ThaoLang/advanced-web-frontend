import React from "react";
import { useAuth } from "@/context/AuthContext";
import { useTranslations } from "next-intl";
import Link from "next/link";

export default function HomePage() {
  const t = useTranslations("LandingPage");
  const auth = useAuth();
  return auth.user ? (
    <div>
      <label>Welcome back! {auth.user.username}</label>
    </div>
  ) : (
    <div></div>
  );
}
