import React from "react";
import { useTranslations } from "next-intl";

export default function GradePage() {
  const t = useTranslations("Tabs");

  return (
    <div className="items-center justify-center mx-auto">
      <div></div>
      Grades
    </div>
  );
}
