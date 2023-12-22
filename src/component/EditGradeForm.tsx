import { useState } from "react";
import { useTranslations } from "next-intl";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

interface EditGradeFormProps {
  name: string;
  scale: number;
  handleUpdate: (gradeName: string, gradeScale: number, order: number) => void;
}
export default function EditGradeForm(props: EditGradeFormProps) {
  const [nameProxy, setNameProxy] = useState(props.name);
  const [scaleProxy, setScaleProxy] = useState(props.scale);
  const t = useTranslations("Tabs");
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const isValidGradeScale = () => {
    if (
      !isNaN(parseFloat(String(scaleProxy))) &&
      isFinite(Number(scaleProxy))
    ) {
      const integerValue = scaleProxy;
      if (Number.isInteger(integerValue)) {
        if (integerValue >= 1 && integerValue <= 100) {
          return true;
        }
      }
    }
    return false;
  };
  const isValidInput = () => {
    setErrorMsg(null);
    if (!nameProxy) {
      setErrorMsg(t("rubric_title_empty_error"));
      return false;
    }
    if (!scaleProxy) {
      setErrorMsg(t("rubric_scale_empty_error"));
      return false;
    }
    if (!isValidGradeScale()) {
      setErrorMsg(t("rubric_scale_error"));
      return false;
    }
    return true;
  };

  const handleClickUpdate = () => {
    if (!isValidGradeScale()) return;

    props.handleUpdate(nameProxy, scaleProxy, -1);
  };

  return (
    <div className="flex flex-row m-2 align-middle justify-center">
      <div className="flex flex-col gap-4 w-2xl">
        <p className="mb-2 font-bold text-2xl flex items-center justify-center ">
          {" "}
          {t("edit_grade_title")}
        </p>
        <div className="flex space-x-4 ">
          <input
            type="text"
            placeholder={t("grade_description")}
            className="input input-bordered w-3/4 "
            value={nameProxy}
            onChange={(e) => setNameProxy(e.target.value)}
          />
          <div className="flex flex-row items-center justify-center w-1/4">
            <input
              type="number"
              placeholder={t("grade_scale")}
              className="input input-bordered w-full "
              value={scaleProxy}
              onChange={(e) => setScaleProxy(Number(e.target.value))}
            />
            <span className="p-2">%</span>
          </div>
        </div>

        <button className="btn btn-info w-full " onClick={handleClickUpdate}>
          {t("update_grade_btn")}!
        </button>
      </div>
    </div>
  );
}
