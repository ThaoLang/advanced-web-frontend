import { useState } from "react";
import { useTranslations } from "next-intl";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function JoinClassForm() {
  const [classCodeProxy, setClassCodeProxy] = useState("");
  const t = useTranslations("Tabs");

  const checkInput = () => {
    if (classCodeProxy == "") {
      toast.error(t("invalid_info"));
    } else if (classCodeProxy !== "") {
      //update logic into checking if class code exists
      toast.error(t("unavailable_class_code"));
    }
  };

  return (
    <div className="flex flex-row m-10 align-middle justify-center">
      <div className="flex flex-col gap-4 w-md">
        <p className="mb-2 text-lg"> {t("join_class_btn")}</p>
        <p className="text-sm"> {t("help_join_class")}</p>
        <input
          type="text"
          placeholder={t("join_class_code")}
          className="input input-bordered w-full max-w-xs"
          value={classCodeProxy}
          onChange={(e) => setClassCodeProxy(e.target.value)}
          maxLength={15}
        />
        <button
          className="btn btn-info w-full max-w-xs"
          onClick={() => checkInput()}
        >
          {t("join_class_btn")}!
        </button>
      </div>
    </div>
  );
}
