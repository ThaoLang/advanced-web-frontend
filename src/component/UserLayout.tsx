"use client";
import NavBar from "@/component/NavBar";
import Footer from "@/component/Footer";
import Link from "next/link";
import Providers from "@/component/Providers";
import { useTranslations } from "next-intl";
import { notFound } from "next/navigation";
import { FaChalkboardTeacher } from "react-icons/fa";
import { FaHouseChimney, FaGear } from "react-icons/fa6";
import { GiGraduateCap } from "react-icons/gi";
import { useAuth } from "@/context/AuthContext";
import { useEffect, useState } from "react";
import RestrictedPage from "./RestrictedPage";
import axios from "axios";
import React from 'react';
import WithAuth, { WithAuthProps } from '@/utils/WithAuth';

interface UserLayoutProps {
  children: React.ReactNode;
  locale: any;
}

const locales = ["en", "vi"];

export default function UserLayout(props: UserLayoutProps) {
  const auth = useAuth();


  const fetchGetUser = async () => {
    return await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_PREFIX}auth/user`, {
      headers: {
        Authorization: `Bearer ${auth.user?.access_token}`,
      },
    })
  }

  useEffect(() => {
    //first get from local storage  
    const checkCredential = async () => {
      const savedUser = localStorage.getItem('user');
      if (savedUser) {
        // Assuming UserType has a structure like { email: string }
        const user = JSON.parse(savedUser);
        if (user) {
          auth.login(user);
        }
      }
    };
    checkCredential();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      if (auth.user) {
        // console.log('Fetching...');
        const newData = await fetchGetUser();
        if (newData) {
          const _newUserData = JSON.parse(JSON.stringify(newData.data));
          // Check if user status has changed
          if (_newUserData.status !== auth.user.status || 
            _newUserData.username !== auth.user.username ||
            _newUserData.studentId !== auth.user.studentId ||
            _newUserData.avatarUrl !== auth.user.avatarUrl) {
            auth.login(_newUserData);
            localStorage.setItem('user', JSON.stringify(_newUserData));
            window.location.reload();
          }
        }
      }
    };

    // Fetch data initially
    fetchData();

    const intervalId = setInterval(fetchData, 5000);

    return () => clearInterval(intervalId);
  }, [auth.user]);


  const t = useTranslations("Navbar");

  if (!locales.includes(props.locale as any)) notFound();

  const navigation = [
    { name: `${t("home")}`, href: "/", icon: <FaHouseChimney /> },
    {
      name: `${t("teaching")}`,
      href: "/teaching",
      icon: <FaChalkboardTeacher />,
    },
    { name: `${t("enrolled")}`, href: "/enrolled", icon: <GiGraduateCap /> },
    { name: `${t("settings")}`, href: "/profile", icon: <FaGear /> },
  ];

  const MainContent: React.FC<WithAuthProps> = (props: UserLayoutProps) => {
    const { children } = props;
    return (
      <main className="min-h-screen">
        {/* <StyledComponentsRegistry> */}
        <Providers>{children}</Providers>
        {/* </StyledComponentsRegistry> */}
      </main>);
  };

  const AuthenticatedMainContent = WithAuth<WithAuthProps>(MainContent);

  if (!auth.user || auth.user.status === 'normal') {
    return (
      <div className="drawer bg-no-repeat bg-cover bg-[url('https://dbhi.edu.vn/wp-content/uploads/2019/09/white-background-with-blue-tech-hexagon_1017-19366.jpg')]">
        <input id="my-drawer" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content flex flex-col h-fit justify-between">
          <NavBar />
          <AuthenticatedMainContent {...props}/>
          <Footer />
        </div>
        <div className="drawer-side">
          <label
            htmlFor="my-drawer"
            aria-label="close sidebar"
            className="drawer-overlay"
          ></label>

          <ul className="menu p-4 w-80 min-h-full bg-base-200 text-base-content text-lg">
            {/* Sidebar content here */}
            <a className="btn btn-ghost normal-case text-xl mb-5">
              <img
                className="h-8 w-auto"
                src="https://bootstraplogos.com/wp-content/uploads/edd/2018/07/logo.png"
                alt=""
              ></img>
              LightHub
            </a>
            {navigation.map((item, index) => (
              <li className="cursor-pointer" key={index}>
                <Link href={item.href}>
                  <div className="flex w-full">
                    <div className="grid flex-grow place-items-center">
                      {item.icon}
                    </div>
                    <div className="divider divider-horizontal"></div>
                    <div className="grid flex-grow place-items-center">
                      {item.name}
                    </div>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    )
  }
  else if (auth.user.status === 'ban') {
    return <RestrictedPage />
  }
}
