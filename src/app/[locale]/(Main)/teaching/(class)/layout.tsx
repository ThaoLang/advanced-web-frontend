import Link from "next/link";
import { useTranslations } from "next-intl";

export default function TeachingLayout({
  children, // will be a page or nested layout
}: {
  children: React.ReactNode;
}) {
  const t = useTranslations("Tabs");
  
  const navigation = [
    { name: t("about"), href: "/teaching/detail" },
    { name: t("members"), href: "/teaching/members" },
    { name: t("grades"), href: "/teaching/grades" },
    { name: t("settings"), href: "/teaching/settings" },
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
