"use client";
import React, { useEffect } from "react";
import Link from "next/link";
import {
  Link as LinkIntl,
  usePathname,
  useRouter,
} from "../language_navigation";

import { FaBars, FaArrowRightFromBracket, FaGear } from "react-icons/fa6";
import "../app/[locale]/page.module.css";
import { useAuth } from "@/context/AuthContext";
import { useTranslations } from "next-intl";
import { IoLanguage } from "react-icons/io5";
import { FaRegBell } from "react-icons/fa";
import NotificationList from "./NotificationList";
import { io } from "socket.io-client";

import { createSharedPathnamesNavigation } from "next-intl/navigation";

export default function NavBar() {
  const t = useTranslations("Navbar");

  const [isNotificationVisible, setIsNotificationVisible] =
    React.useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = React.useState(false);
  const pathname = usePathname();
  const router = useRouter();

  const auth = useAuth();

  // const testMessages = ["Hello", "Nice to meet you", "Bye bye"];
  const testMessages = new Array<string>();

  // const socket = io("${process.env.NEXT_PUBLIC_BACKEND_PREFIX}notification", {
  //   extraHeaders: {
  //     Authorization: `Bearer ${auth.user?.access_token}`,
  //   },
  // });

  // socket.on("connect", () => {
  //   testMessages.push(`Welcome ${socket.id}`);
  // });

  // socket.emit("notification", "parameters");

  const handleLanguageChange = (locale: string) => {
    setIsDropdownOpen(false);
    router.replace(pathname, { locale: locale });
  };

  const handleLogout = () => {
    localStorage.setItem("user", null as any);
    auth.logout();
  };

  //   useEffect(() => {
  //     const cur_user = localStorage.getItem("user");
  //     if (cur_user) {
  //       //   const loggedUser = JSON.parse(cur_user);
  //       //   if (!loggedUser.avatarUrl) {
  //       //     auth.login({
  //       //       ...loggedUser,
  //       //       avatarUrl: "https://cdn-icons-png.flaticon.com/128/1077/1077114.png",
  //       //     });
  //       //   } else {
  //       //     auth.login(loggedUser);
  //       //   }
  //       auth.login(JSON.parse(cur_user));
  //     }
  //   }, []);

  //   useEffect(() => {
  //     const cur_user = localStorage.getItem("user");
  //     if (cur_user) {
  //       const loggedUser = JSON.parse(cur_user);
  //       if (!loggedUser.avatarUrl) {
  //         const updatedUser = {
  //           ...loggedUser,
  //           avatarUrl: "https://cdn-icons-png.flaticon.com/128/1077/1077114.png",
  //         };
  //         localStorage.setItem("user", JSON.stringify(updatedUser));
  //         auth.login(updatedUser);
  //       } else {
  //         auth.login(loggedUser);
  //       }
  //     }
  //   }, []);
  useEffect(() => {
    const cur_user = localStorage.getItem("user");
    if (cur_user) {
      const loggedUser = JSON.parse(cur_user);

      if (!loggedUser || !loggedUser.avatarUrl) {
        const updatedUser = {
          ...loggedUser,
          avatarUrl: "https://cdn-icons-png.flaticon.com/128/1077/1077114.png",
        };

        localStorage.setItem("user", JSON.stringify(updatedUser));
        auth.login(updatedUser);
      } else {
        auth.login(loggedUser);
      }

      async () => {};
    }
  }, []);

  return (
    <header className="navbar bg-amber-100">
      <div className="navbar-start">
        <div className="dropdown">
          <label
            htmlFor="my-drawer"
            tabIndex={0}
            className="btn btn-ghost drawer-button"
          >
            <FaBars />
          </label>
        </div>
        <Link href="/" className="btn btn-ghost normal-case text-xl">
          <img
            className="h-8 w-auto"
            src="https://bootstraplogos.com/wp-content/uploads/edd/2018/07/logo.png"
            alt="logo"
          ></img>
          LightHub
        </Link>
        {/* TODO: implement Breadcrumb? */}
      </div>

      <div className="navbar-end">
        {/* <div className='relative inline-block rounded-2xl border-2 mr-5 hidden lg:flex'>
					<FaMagnifyingGlass className='absolute text-black mt-3 ml-3'/>
					<input className='rounded-2xl border-solid boder-2 w-60 h-10 text-black pl-10 text-sm ' type='text' placeholder='Search' />
				</div> */}
        <div className="dropdown dropdown-end">
          <label
            tabIndex={0}
            className="btn btn-ghost btn-circle"
            onClick={() => setIsDropdownOpen(true)}
          >
            <div className="mx-4">
              <IoLanguage size={20} />
            </div>
          </label>

          {isDropdownOpen && (
            <ul
              tabIndex={0}
              className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52"
            >
              <li>
                <LinkIntl
                  href="./"
                  locale="en"
                  onClick={() => handleLanguageChange("en")}
                  className="cursor-pointer"
                >
                  {t("english")}
                </LinkIntl>
              </li>
              <li>
                <LinkIntl
                  href="./"
                  locale="vi"
                  onClick={() => handleLanguageChange("vi")}
                  className="cursor-pointer"
                >
                  {t("vietnam")}
                </LinkIntl>
              </li>
            </ul>
          )}
        </div>
        {auth.user && auth.user.email ? (
          <div className="flex justify-center gap-2">
            <div className="dropdown dropdown-end">
              <button
                tabIndex={0}
                className="btn btn-ghost btn-circle"
                onClick={() => setIsNotificationVisible(true)}
              >
                <div className={`${testMessages.length !== 0 && "indicator"}`}>
                  <div>
                    <FaRegBell size={20} />
                  </div>
                  {testMessages.length !== 0 && (
                    <span className="badge badge-xs badge-primary indicator-item" />
                  )}
                </div>
              </button>

              <ul
                tabIndex={0}
                className="relative mt-3 z-[1] p-2 menu dropdown-content h-auto w-60 space-y-10"
              >
                {isNotificationVisible && (
                  <>
                    {(testMessages.length === 0 && (
                      <div className="flex align-center justify-center pt-2 h-10 text-md shadow bg-white border-1 border-gray-300 rounded-box">
                        {t("no_notification")}
                      </div>
                    )) || <NotificationList messages={testMessages} />}
                  </>
                )}
              </ul>
            </div>

            <div className="dropdown dropdown-end dropdown-hover">
              <div tabIndex={0} className="btn btn-ghost btn-circle avatar">
                <div className="w-10 rounded-full">
                  <img alt="avatar" src={auth.user.avatarUrl} />
                </div>
              </div>
              <ul
                tabIndex={0}
                className="relative mt-3 z-[1] p-2 shadow menu dropdown-content bg-slate-100 border-1
				border-gray-300 rounded-box h-auto w-80 space-y-10"
              >
                <li className="text-center font-semibold text-lg font-sans pointer-events-none">
                  {auth.user.email}
                </li>
                <li className="items-center">
                  <label className="btn btn-ghost btn-circle avatar">
                    <div className="w-24 rounded-full">
                      <img alt="avatar" src={auth.user.avatarUrl} />
                    </div>
                  </label>
                </li>
                <li className="text-center text-xl pointer-events-none">
                  {t("hi")}, {auth.user.username}!
                </li>
                <li className="items-center gap-3">
                  <button className="bg-sky-500 hover:bg-sky-700 text-white font-semibold py-2 px-4 rounded-full">
                    <Link href="/profile">{t("manage_account")}</Link>
                  </button>
                  <Link
                    href="/"
                    className="justify-between"
                    passHref
                    legacyBehavior
                  >
                    <button
                      className="bg-red-500 hover:bg-red-700 text-white font-semibold py-2 px-4 rounded-full"
                      onClick={handleLogout}
                    >
                      <FaArrowRightFromBracket />
                      {t("logout")}
                    </button>
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        ) : (
          <div>
            <Link href="/auth" passHref legacyBehavior>
              <button className="btn btn-ghost text-sm font-semibold leading-6 text-gray-900 border-black">
                {t("login")}
              </button>
            </Link>
          </div>
        )}
      </div>
    </header>
  );
}
