"use client";

import styles from "./page.module.css";
import Hero from "@/component/Hero";
import { UserType } from "@/model/UserType";
import { useEffect, useState } from "react";
import LandingPage from "@/component/LandingPage";
import HomePage from "@/component/HomePage";
import { useAuth } from '@/context/AuthContext';

export default function Home() {

  const auth = useAuth();
  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    if (savedUser) {
      // Assuming UserType has a structure like { email: string }
        auth.login(JSON.parse(savedUser));
    }
  },[]);

  return <div>{auth.user ? <HomePage /> : <LandingPage />}</div>;
}
