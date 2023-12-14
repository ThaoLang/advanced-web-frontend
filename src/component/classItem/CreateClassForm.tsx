import { useState } from "react";
import { useTranslations } from "next-intl";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function CreateClassForm() {
  const [nameProxy, setNameProxy] = useState("");
  const [descriptionProxy, setDescriptionProxy] = useState("");
  const t = useTranslations("Tabs");

  const checkInput = () => {
    if (nameProxy === "") {
      toast.error(t("invalid_info"));
    }
  };

  return (
    <div className="flex flex-row m-10 align-middle justify-center">
      <div className="flex flex-col gap-4 w-md">
        <p className="mb-1 text-lg"> {t("create_class_btn")}</p>
        <input
          type="text"
          placeholder={t("create_class_name")}
          className="input input-bordered w-full max-w-xs"
          value={nameProxy}
          onChange={(e) => setNameProxy(e.target.value)}
          maxLength={15}
        />
        <input
          type="text"
          placeholder={t("create_class_desc")}
          className="input input-bordered w-full max-w-xs"
          value={descriptionProxy}
          onChange={(e) => setDescriptionProxy(e.target.value)}
          maxLength={15}
        />
        <button
          className="btn btn-info w-full max-w-xs"
          onClick={() => checkInput()}
        >
          {t("create_class_btn")}!
        </button>
      </div>
    </div>
  );
}
