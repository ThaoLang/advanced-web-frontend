import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "@/app/[locale]/globals.css";
import { AuthProvider, useAuth } from "@/context/AuthContext";
import React from "react";
import {
  FaAngleLeft,
  FaBars,
  FaChartSimple,
  FaChalkboardUser,
  FaPerson,
  FaGear,
  FaArrowRightFromBracket,
  FaAngleDown,
  FaSun,
  FaMoon,
} from "react-icons/fa6";
import { AccountProvider } from "@/context/AccountContext";
import { ClassroomProvider } from "@/context/ClassroomContext";
import AdminLayout from "@/component/admin/AdminLayout";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "LightHub Web Application",
  description: "Education for life",
};

export default function Layout({
  children,
}: {
  children: React.ReactNode;
}) {

  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthProvider>
          <AccountProvider>
            <ClassroomProvider>
              <AdminLayout children={children}/>
            </ClassroomProvider>
          </AccountProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
