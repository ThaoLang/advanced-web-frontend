import { useState } from "react";
import { useTranslations } from "next-intl";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

interface DeleteGradeFormProps {
  name: string;
  scale: number;
  id: string;
  deleteFunc: (id: string) => void;
  cancelFunc: () => void;
}
export default function DeleteGradeForm(props: DeleteGradeFormProps) {
  const [nameProxy, setNameProxy] = useState(props.name);
  const [scaleProxy, setScaleProxy] = useState(props.scale);
  const t = useTranslations("Tabs");

  return (
    <div className="flex flex-row m-2 align-middle justify-center">
      <div className="flex flex-col gap-4 w-2xl">
        <p className="mb-2 font-bold text-xl flex items-center justify-center ">
          {" "}
          {t("delete_grade_title")}
        </p>
        <div className="flex space-x-4 ">
          <button className="btn w-1/2 " onClick={props.cancelFunc}>
            {t("cancel_btn")}!
          </button>
          <button
            className="btn btn-error w-1/2"
            onClick={() => props.deleteFunc(props.id)}
          >
            {t("delete_btn")}!
          </button>
        </div>
      </div>
    </div>
  );
}
