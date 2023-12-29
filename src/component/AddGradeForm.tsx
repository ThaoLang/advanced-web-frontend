import { useState } from "react";
import { useTranslations } from "next-intl";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { RubricType } from "@/model/RubricType";
import axios from "axios";

interface AddGradeFormProps {
  handleClick: (gradeName: string, gradeScale: number) => void;
}

export default function AddGradeForm(props: AddGradeFormProps) {
  const [nameProxy, setNameProxy] = useState("");
  const [scaleProxy, setScaleProxy] = useState("");
  const t = useTranslations("Tabs");
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const isValidGradeScale = () => {
    if (
      !isNaN(parseFloat(String(scaleProxy))) &&
      isFinite(Number(scaleProxy))
    ) {
      const integerValue = parseInt(scaleProxy, 10);
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

  const handleAddRubric = () => {
    if (!isValidInput()) return;

    props.handleClick(nameProxy, Number(scaleProxy));
    setNameProxy("");
    setScaleProxy("");
  };

  return (
    <div className="flex flex-row m-2 align-middle justify-center">
      <div className="flex flex-col gap-4 w-2xl">
        <p className="mb-2 font-bold text-2xl flex items-center justify-center ">
          {" "}
          {t("add_grade_title")}
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
              type="text"
              placeholder={t("grade_scale")}
              className="input input-bordered w-full "
              value={scaleProxy}
              onChange={(e) => setScaleProxy(e.target.value)}
            />
            <span className="p-2">%</span>
          </div>
        </div>

        <button className="btn btn-info w-full " onClick={handleAddRubric}>
          {t("add_grade_btn")}!
        </button>
        {errorMsg && (
          <label className="flex text-center items-center justify-center my-3 text-red-700">
            {errorMsg}
          </label>
        )}
      </div>
    </div>
  );
}
