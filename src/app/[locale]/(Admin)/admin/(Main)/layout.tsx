import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "@/app/[locale]/globals.css";
import { AuthProvider } from "@/context/AuthContext";
import React from "react";
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
            <AdminLayout children={children}/>
        </AuthProvider>
      </body>
    </html>
  );
}
