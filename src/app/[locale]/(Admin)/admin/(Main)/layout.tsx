import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "@/app/[locale]/globals.css";
import { AuthProvider } from "@/context/AuthContext";
import React from "react";
import AdminLayout from "@/component/admin/AdminLayout";
import { NextIntlClientProvider, useMessages } from "next-intl";

interface RootLayoutProps {
  children: React.ReactNode;
  params: { locale: string };
}

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "LightHub Web Application",
  description: "Education for life",
};

export default function Layout({
  children,
  params: { locale },
}: RootLayoutProps) {
  const messages = useMessages();
  return (
    <html lang={locale}>
      <body className={inter.className}>
        <AuthProvider>
          <NextIntlClientProvider locale={locale} messages={messages}>
            <AdminLayout children={children} />
          </NextIntlClientProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
