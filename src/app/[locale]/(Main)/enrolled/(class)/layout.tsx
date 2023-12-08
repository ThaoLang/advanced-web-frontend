import Link from "next/link";
import { useTranslations } from "next-intl";

export default function EnrolledLayout({
  children, // will be a page or nested layout
}: {
  children: React.ReactNode;
}) {
  const t = useTranslations("Tabs");

  const navigation = [
    { name: t("about"), href: "/enrolled/detail" },
    { name: t("members"), href: "/enrolled/members" },
    { name: t("grades"), href: "/enrolled/grades" },
    { name: t("settings"), href: "/enrolled/settings" },
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
