import type { Metadata } from "next";
//import { Inter } from "next/font/google";
import "@/app/[locale]/globals.css";
import { AuthProvider } from "@/context/AuthContext";
import { ReactNode } from "react";
import { NextIntlClientProvider, useMessages } from "next-intl";
import { notFound } from "next/navigation";

interface AuthLayoutProps {
  children: ReactNode;
  params: { locale: string };
}

const locales = ["en", "vi"];

//const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "LightHub",
  description: "Generated by create next app",
};

export default function AuthLayout({
  children,
  params: { locale },
}: AuthLayoutProps) {
  const messages = useMessages();
  if (!locales.includes(locale as any)) notFound();
  return (
    <html lang={locale}>
      {/* <body className={inter.className}> */}
      <body className="">
        <NextIntlClientProvider locale={locale} messages={messages}>
          <AuthProvider>{children}</AuthProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
