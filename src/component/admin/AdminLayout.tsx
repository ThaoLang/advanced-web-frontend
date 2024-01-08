"use client";
import Link from "next/link";
import Footer from "./Footer";
import NavBar from "./NavBar";
import {
    FaChartSimple,
    FaPerson,
    FaChalkboardUser,
    FaGear
} from "react-icons/fa6";
import { useAuth } from "@/context/AuthContext";
import CredentialError from "@/component/admin/CredentialError";
import { useEffect } from "react";

interface AdminLayoutProps {
    children: React.ReactNode;
}

const navigation = [
    { name: "Dashboard", href: "/admin/", icon: <FaChartSimple /> },
    { name: "User Accounts", href: "/admin/account", icon: <FaPerson /> },
    { name: "Classes", href: "/admin/class", icon: <FaChalkboardUser /> },
    { name: "Settings", href: "/admin/setting", icon: <FaGear /> },
];

export default function AdminLayout(props: AdminLayoutProps) {
    const auth = useAuth();

    useEffect(() => {
        const checkCredential = async () => {
            const savedUser = localStorage.getItem("admin");
            if (savedUser != null) {
                // Assuming UserType has a structure like { email: string }
                const user = JSON.parse(savedUser);
                if (user) {
                    auth.login(user);
                }
            }
        }
        checkCredential();
    }, []);

    return auth.admin ? (
        <div className="drawer lg:drawer-open">
            <input
                id="admin-drawer"
                type="checkbox"
                className="drawer-toggle"
            />
            <div className="drawer-content relative flex flex-col justify-between dark:bg-boxdark-2 dark:text-bodydark">
                <NavBar />
                <main>{props.children}</main>
                <Footer />
            </div>
            <div className="drawer-side z-50">
                <label
                    htmlFor="admin-drawer"
                    aria-label="close sidebar"
                    className="drawer-overlay"
                ></label>
                <aside className="fixed inset-y-0 left-0 h-full flex w-72.5 flex-col overflow-y-hidden bg-slate-700 duration-300 ease-linear dark:bg-current lg:static lg:translate-x-0 -translate-x-full">
                    <div className="flex overflow-y items-center justify-between gap-2 px-6 py-5.5 lg:py-6.5">
                        <Link href="/" className="normal-case text-xl">
                            <div className="mt-5 flex flex-row items-center gap-3.5">
                                <img
                                    className="h-8 w-auto"
                                    src="https://bootstraplogos.com/wp-content/uploads/edd/2018/07/logo.png"
                                    alt="logo"
                                />
                                <span className="font-semibold text-slate-200">
                                    LightHub
                                </span>
                            </div>
                        </Link>
                    </div>
                    {/* <div className="divider"></div> */}
                    <div className="no-scrollbar flex flex-col overflow-y-auto duration-300 ease-linear">
                        <nav className="mt-5 py-4 px-4 lg:mt-9 lg:px-6">
                            <div>
                                {/* <h3 className="mb-4 ml-4 text-sm font-semibold text-bodydark2">MENU</h3> */}
                                <ul className="mt-5 mb-6 flex flex-col gap-1.5">
                                    {navigation.map((items, index) => (
                                        <li className="cursor-pointer" key={index}>
                                            <Link
                                                href={items.href}
                                                className="group relative flex items-center gap-2.5 rounded-sm py-2 px-4 font-normal text-slate-200 duration-300 ease-in-out hover:bg-gray-200 hover:text-black dark:hover:bg-meta-4 false"
                                            >
                                                {items.icon}
                                                {items.name}
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </nav>
                    </div>
                </aside>
            </div>
        </div>
    ) : <CredentialError />
}
