import Link from "next/link";

export default function TeachingLayout({
  children, // will be a page or nested layout
}: {
  children: React.ReactNode;
}) {
  const navigation = [
    { name: "About", href: "/teaching" },
    { name: "Members", href: "/teaching/members" },
    { name: "Grades", href: "/teaching/grades" },
    { name: "Settings", href: "/teaching/settings" },
  ];

  let option = "About";

  return (
    <section>
      {/* Include shared UI here e.g. a header or sidebar */}

      <div className="tabs tabs-lifted h-10 justify-center space-x-4">
        {navigation.map((item, index) => (
          <Link href={item.href}>
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