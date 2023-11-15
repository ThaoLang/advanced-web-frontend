"use client";
import Image from "next/image";
import styles from "./page.module.css";
import Hero from "@/component/Hero";
import { UserType } from "@/model/UserType";
import { useEffect, useState } from "react";
import LandingPage from "@/component/LandingPage";

export default function Home() {
  const [user, setUser] = useState<UserType | null>(null);

  useEffect(() => {
    const savedUser = localStorage.getItem("user");

    if (savedUser) {
      // Assuming UserType has a structure like { email: string }

      setUser(JSON.parse(savedUser));
    }
  }, []);

  return <div>{user ? <div>Welcome to HomePage</div> : <LandingPage />}</div>;
}
