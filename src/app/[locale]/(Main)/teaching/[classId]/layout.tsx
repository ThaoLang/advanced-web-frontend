"use client";
import Link from "next/link";
import { useTranslations } from "next-intl";
import { useParams } from "next/navigation";

export default function TeachingLayout({
  children, // will be a page or nested layout
}: {
  children: React.ReactNode;
}) {
  const { classId } = useParams();

  const t = useTranslations("Tabs");

  const navigation = [
    { name: t("about"), href: "/teaching/" + classId + "/detail" },
    { name: t("members"), href: "/teaching/" + classId + "/members" },
    { name: t("grades"), href: "/teaching/" + classId + "/grades" },
    { name: t("review"), href: "/teaching/" + classId + "/review" },
  ];

  let option = "About";

  return (
    <section>
      {/* Include shared UI here e.g. a header or sidebar */}

      <div className="tabs tabs-lifted h-10 justify-center space-x-4 lg:gap-10">
        {navigation.map((item, index) => (
          <Link key={index} href={item.href}>
            <div
              className={`tab text-md lg:text-lg space-x-2 ${
                option === item.name ? "tab-active" : ""
              }`}
            >
              <label>{item.name}</label>
            </div>
          </Link>
        ))}
      </div>

      <div className="divider mt-1 w-3/4 mx-auto" />

      {children}
    </section>
  );
}
