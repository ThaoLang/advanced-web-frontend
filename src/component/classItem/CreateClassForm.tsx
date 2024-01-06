import { useState } from "react";
import { useTranslations } from "next-intl";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ClassType } from "@/model/ClassType";

interface CreateClassFormProps {
  handleAddNewClass: (name: string, description: string) => void;
  classes: ClassType[];
  // errorMsg: string | null;
}
export default function CreateClassForm(props: CreateClassFormProps) {
  const [nameProxy, setNameProxy] = useState("");
  const [descriptionProxy, setDescriptionProxy] = useState("");
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const t = useTranslations("Tabs");

  const checkInput = () => {
    if (nameProxy === "") {
      setErrorMsg(t("invalid_info"));
      return false;
    }
    const duplicate_class = props.classes.some(
      (item) => item.name === nameProxy
    );
    if (duplicate_class) {
      setErrorMsg(t("duplicate_class_error_msg"));
      return false;
    }

    return true;
  };

  const handleAdd = () => {
    if (!checkInput()) return;
    setErrorMsg(null);
    props.handleAddNewClass(nameProxy, descriptionProxy);
    setNameProxy("");
    setDescriptionProxy("");
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
          maxLength={20}
        />
        <input
          type="text"
          placeholder={t("create_class_desc")}
          className="input input-bordered w-full max-w-xs"
          value={descriptionProxy}
          onChange={(e) => setDescriptionProxy(e.target.value)}
          maxLength={50}
        />
        {errorMsg && (
          <label className="flex text-center items-center justify-center my-3 text-red-700">
            {errorMsg}
          </label>
        )}
        <button
          className="btn btn-info w-full max-w-xs"
          onClick={() => handleAdd()}
        >
          {t("create_class_btn")}!
        </button>
      </div>
    </div>
  );
}
