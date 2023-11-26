import { useState } from "react";
import CreateClassForm from "./CreateClassForm";
import JoinClassForm from "./JoinClassForm";
import { useTranslations } from "next-intl";

export default function NewClass() {
  const [status, setStatus] = useState("create");
  const t = useTranslations("Tabs");

  return (
    <div className="items-center h-[440px]">
      <div className="flex flex-row gap-4 align-middle justify-center pt-10">
        <button
          className="btn btn-info max-w-xs bg-blue-500 text-white"
          onClick={() => setStatus("create")}
        >
          {t("create_class_btn")}
        </button>
        <button
          className="btn btn-info max-w-xs bg-yellow-400 text-white"
          onClick={() => setStatus("join")}
        >
          {t("join_class_btn")}
        </button>
      </div>
      {status === "create" && <CreateClassForm />}
      {status === "join" && <JoinClassForm />}
    </div>
  );
}
