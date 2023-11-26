import React from "react";
import Link from 'next/link';
import {
    FaAngleLeft,
    FaBars,
    FaChartSimple,
    FaCalendar,
    FaChalkboardUser,
    FaWpforms,
    FaBell,
    FaRegUser,
    FaGear,
    FaArrowRightFromBracket,
    FaAngleDown,
    FaSun,
    FaMoon,
} from "react-icons/fa6";


export default function NavBar() {
    const avatarUrl = "https://scontent.fsgn5-10.fna.fbcdn.net/v/t39.30808-1/398534440_712492687404314_4951001529935588432_n.jpg?stp=c12.215.197.197a_dst-jpg&_nc_cat=107&ccb=1-7&_nc_sid=5f2048&_nc_eui2=AeFaUsexPKcDrToYxtmxLwrfaeoefWNJmOtp6h59Y0mY6w747LQVfj87mu_G5CfaLGbC5lGyfMKrky4mQQXAeE_7&_nc_ohc=rMLJXF5To3sAX-_ZEfW&_nc_ht=scontent.fsgn5-10.fna&oh=00_AfAErJlelj3T20XSeWKBth0yQbGlGbRuu5U_gGg5IgAEgw&oe=65640C39";

    return (
        <header className="navbar top-0 z-[999] flex w-full bg-white drop-shadow-1 dark:bg-boxdark dark:drop-shadow-none">
            <div className="flex flex-grow items-center justify-between px-4 py-4 shadow-2 md:px-6 2xl:px-11">
                <div className="flex items-center gap-2 sm:gap-4 lg:hidden">
                    <label htmlFor="admin-drawer" aria-label="close sidebar" className="z-[99999] block rounded-sm border border-stroke bg-white p-1.5 shadow-sm dark:border-strokedark dark:bg-boxdark">
                        <span><FaBars/></span>
                    </label>
                </div>
                <div className="hidden sm:block">
                    
                </div>
                <div className="flex items-center gap-3 2xsm:gap-7">
                    <ul className="flex items-center gap-2 2xsm:gap-4">
                        {/* <li> */}
                        {/* <label className="swap swap-rotate"> */}
                        {/* this hidden checkbox controls the state */}
                        {/* <input type="checkbox" /> */}

                        {/* sun icon */}
                        {/* <div className="swap-on"><FaSun /></div> */}

                        {/* moon icon */}
                        {/* <div className="swap-off"><FaMoon /></div> */}
                        {/* </label> */}
                        {/* </li> */}
                        <li className="relative">
                            <a className="relative flex h-8.5 w-8.5 items-center justify-center rounded-full border-[0.5px] border-stroke bg-gray dark:border-strokedark dark:bg-meta-4 dark:text-white" href="#">
                                <span className="absolute -top-0.5 right-0 z-1 h-2 w-2 rounded-full bg-meta-1 hidden">
                                    <span className="absolute -z-1 inline-flex h-full w-full animate-ping rounded-full bg-meta-1 opacity-75">
                                    </span>
                                </span>
                                <div className="fill-current duration-300 ease-in-out dropdown">
                                    <div tabIndex={0} className="hover:text-primary focus:text-primary"><FaBell /></div>
                                    <ul tabIndex={0} className="dropdown-content absolute -right-27 mt-2.5 flex h-90 w-75 flex-col rounded-xl border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark sm:right-0 sm:w-80">
                                        <div className="px-4.5 py-3 mx-auto">
                                            <h5 className="text-sm font-medium text-bodydark2">Notification</h5>
                                        </div>
                                        <ul className="flex h-auto flex-col overflow-y-auto ml-2">
                                            <li>
                                                <a className="flex flex-col gap-2.5 border-t border-stroke px-4.5 py-3 hover:bg-gray-2 dark:border-strokedark dark:hover:bg-meta-4" href="#">
                                                    <p className="text-sm"><span className="text-black dark:text-white">Edit your information in a swipe</span> Sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim.</p>
                                                    <p className="text-xs">12 May, 2025</p>
                                                </a>
                                            </li>
                                            <li>
                                                <a className="flex flex-col gap-2.5 border-t border-stroke px-4.5 py-3 hover:bg-gray-2 dark:border-strokedark dark:hover:bg-meta-4" href="#">
                                                    <p className="text-sm"><span className="text-black dark:text-white">It is a long established fact</span> that a reader will be distracted by the readable.</p>
                                                    <p className="text-xs">24 Feb, 2025</p>
                                                </a>
                                            </li>
                                            <li>
                                                <a className="flex flex-col gap-2.5 border-t border-stroke px-4.5 py-3 hover:bg-gray-2 dark:border-strokedark dark:hover:bg-meta-4" href="#">
                                                    <p className="text-sm"><span className="text-black dark:text-white">There are many variations</span> of passages of Lorem Ipsum available, but the majority have suffered</p>
                                                    <p className="text-xs">04 Jan, 2025</p>
                                                </a>
                                            </li>
                                            <li>
                                                <a className="flex flex-col gap-2.5 border-t border-stroke px-4.5 py-3 hover:bg-gray-2 dark:border-strokedark dark:hover:bg-meta-4" href="#">
                                                    <p className="text-sm"><span className="text-black dark:text-white">There are many variations</span> of passages of Lorem Ipsum available, but the majority have suffered</p>
                                                    <p className="text-xs">01 Dec, 2024</p>
                                                </a>
                                            </li>
                                        </ul>
                                    </ul>
                                </div>
                            </a>
                        </li>
                    </ul>
                    <div className="relative dropdown dropdown-end dropdown-hover">
                        <a className="flex items-center gap-4" href="#">
                            <span className="hidden text-right lg:block">
                                <span className="block text-sm font-medium text-black dark:text-white">Lăng Thảo Thảo</span>
                                <span className="block text-xs">Admin</span>
                            </span>
                            <span className="h-12 w-12">
                                <img className="rounded-full"
                                    alt="User"
                                    loading="lazy"
                                    decoding="async"
                                    src={avatarUrl} />
                            </span>
                            <div className="hidden fill-current sm:block"><FaAngleDown /></div>
                        </a>
                        <div className="absolute right-0 mt-4 menu dropdown-content flex w-62.5 flex-col rounded-lg border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark block">
                            <ul className="flex flex-col border-stroke dark:border-strokedark">
                                <li>
                                    <a className="flex items-center text-sm font-medium duration-300 ease-in-out hover:text-cyan-500 lg:text-base" href="/profile">
                                        <div><FaRegUser /></div>
                                        Profile
                                    </a>
                                </li>
                                <li>
                                    <a className="flex items-center text-sm font-medium duration-300 ease-in-out hover:text-cyan-500 lg:text-base" href="/pages/settings">
                                        <div><FaGear /></div>
                                        Settings
                                    </a>
                                </li>
                            </ul>
                            <div className="divider"></div>
                            <button className="flex items-center justify-center gap-3.5 text-sm font-medium duration-300 ease-in-out hover:text-red-500 lg:text-base">
                                <div><FaArrowRightFromBracket /></div>
                                Logout
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </header>
    )
}