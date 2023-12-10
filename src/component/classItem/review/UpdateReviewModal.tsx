import { useState } from "react";
import { useTranslations } from "next-intl";

export default function JoinClassForm() {
  const [classCodeProxy, setClassCodeProxy] = useState("");
  const [studentIdProxy, setStudentIdProxy] = useState("");
  const t = useTranslations("Review");

  return (
    <div className="flex flex-row m-10 align-middle justify-center">
      <div className="flex flex-col gap-4 w-md">
        <p className="text-sm text-md ml-4">{t("grade_composition")}: </p>
        <p className="text-sm text-md ml-4">{t("current_grade")}: </p>

        <input
          type="text"
          placeholder={t("updated_grade")}
          className="input input-bordered w-full max-w-xs"
          value={classCodeProxy}
          onChange={(e) => setClassCodeProxy(e.target.value)}
          maxLength={15}
        />
        <input
          type="text"
          placeholder={t("note")}
          className="input input-bordered w-full max-w-xs"
          value={studentIdProxy}
          onChange={(e) => setStudentIdProxy(e.target.value)}
          maxLength={15}
        />
        <div className="flex flex-row gap-4 align-middle justify-center pt-10">
          <button className="btn btn-info max-w-xs bg-blue-500 text-white">
            {t("update_grade")}
          </button>
          <button className="btn btn-info max-w-xs bg-yellow-400 text-white">
            {t("mark_as_completed")}
          </button>
        </div>
      </div>
    </div>
  );
}
