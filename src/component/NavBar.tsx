"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import {
  Link as LinkIntl,
  usePathname,
  useRouter,
} from "../language_navigation";

import { FaBars, FaArrowRightFromBracket } from "react-icons/fa6";
import "../app/[locale]/page.module.css";
import { useAuth } from "@/context/AuthContext";
import { useTranslations } from "next-intl";
import { IoLanguage } from "react-icons/io5";
import { FaRegBell } from "react-icons/fa";
import { createSharedPathnamesNavigation } from "next-intl/navigation";

import NotificationList from "./NotificationList";
import { NotificationType } from "@/model/NotificationType";
import { actions } from "@/app/[locale]/(Main)/state";
import axios from "axios";
import { ClassType } from "@/model/ClassType";
import { UserType } from "@/model/UserType";

export default function NavBar() {
  const auth = useAuth();
  const savedUser = localStorage.getItem("user");
  let currentUser: UserType;
  if (savedUser) {
    currentUser = JSON.parse(savedUser);
  }

  // useEffect(() => {
  //   const checkCredential = async () => {
  //     const savedUser = localStorage.getItem("user");
  //     if (savedUser != null) {
  //       // Assuming UserType has a structure like { email: string }
  //       const user = JSON.parse(savedUser);
  //       if (user) {
  //         auth.login(user);
  //       }
  //     }
  //   };
  //   checkCredential();
  // }, []);

  const t = useTranslations("Navbar");

  const [isNotificationVisible, setIsNotificationVisible] =
    React.useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = React.useState(false);
  const pathname = usePathname();
  const router = useRouter();

  const [notifications, setNotifications] = useState<Array<NotificationType>>(
    []
  );
  useEffect(() => {
    (async () => {
      const checkCredential = async () => {
        const savedUser = localStorage.getItem("user");
        if (savedUser != null) {
          // Assuming UserType has a structure like { email: string }
          const user = JSON.parse(savedUser);
          if (user) {
            auth.login(user);
            console.log("auth", auth);
            console.log("user", auth.user);
          }
        }
      };
      await checkCredential();

      // get a list of class id user is in
      // loop the list
      let classes: ClassType[];

      await axios
        .get(`${process.env.NEXT_PUBLIC_BACKEND_PREFIX}classes`, {
          headers: {
            Authorization: `Bearer ${currentUser?.access_token}`,
          },
        })
        .then((response) => {
          console.log("All classes response", response);
          classes = response.data;

          classes.forEach((element) => {
            axios
              .get(
                `${process.env.NEXT_PUBLIC_BACKEND_PREFIX}notification/list/${element._id}`,
                {
                  headers: {
                    Authorization: `Bearer ${currentUser?.access_token}`,
                  },
                }
              )

              .then((response) => {
                if (response.data.length > 0) {
                  console.log("Notifications response", response);
                  setNotifications([...notifications, ...response.data]);
                }
              })
              .catch((error) => {
                console.error("Error fetching notifications:", error);
              });
          });
        })
        .catch((error) => {
          console.error("Error fetching my classes:", error);
        });
    })();
  }, []);

  const isNotificationClicked = (notification: NotificationType) => {
    notification.isRead = true;
    setNotifications(notifications);
  };

  const handleLanguageChange = (locale: string) => {
    setIsDropdownOpen(false);
    router.replace(pathname, { locale: locale });
  };

  const handleLogout = () => {
    localStorage.setItem("user", null as any);
    auth.logout("user");
  };

  // avatar url

  useEffect(() => {
    // socket io notification
    let user = auth.user;
    let accessToken = user?.access_token;
    if (accessToken) {
      actions.setAccessToken(accessToken);
      actions.initializeSocket(accessToken);
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
        {auth.user ? (
          <div className="flex justify-center gap-2">
            <div className="dropdown dropdown-end">
              <button
                tabIndex={0}
                className="btn btn-ghost btn-circle"
                onClick={() => setIsNotificationVisible(true)}
              >
                <div className={`${notifications.length !== 0 && "indicator"}`}>
                  <div>
                    <FaRegBell size={20} />
                  </div>
                  {notifications.filter(
                    (notification) => notification.isRead === false
                  ).length !== 0 && (
                    <span className="badge badge-xs badge-primary indicator-item" />
                  )}
                </div>
              </button>

              <ul
                tabIndex={0}
                className="relative z-[1] menu dropdown-content max-h-[550px] w-80 overflow-y-auto overflow-clip overflow-x-hidden shadow bg-white border-1 border-gray-300 rounded-box"
              >
                {isNotificationVisible && (
                  <>
                    {(notifications.length === 0 && (
                      <div className="flex align-center justify-center pt-2 h-10 text-md">
                        {t("no_notification")}
                      </div>
                    )) || (
                      <div onClick={() => setIsNotificationVisible(false)}>
                        <NotificationList
                          notifications={notifications}
                          isClickedNotification={isNotificationClicked}
                        />
                      </div>
                    )}
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
                className="relative mt-3 z-[1] p-5 shadow menu dropdown-content bg-white border-2
				border-slate-200 rounded-box h-auto w-80 space-y-10"
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
