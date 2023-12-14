import { useState } from "react";
import { useTranslations } from "next-intl";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

interface UpdateReviewProps {
  gradeComposition: string;
  currentGrade: string;
  status: string;
  toggleStatus: (value: string) => void;
  setUpdatedGrade: (value: string) => void;
  setNote: (value: string) => void;
  closeModal: () => void;
}

export default function UpdateReviewModal(props: UpdateReviewProps) {
  const [updatedGradeProxy, setUpdatedGradeProxy] = useState("");
  const [noteProxy, setNoteProxy] = useState("");
  const t = useTranslations("Review");

  const isGrade = (grade: string) => {
    const regex = /^(\d*\.)?\d+$/;
    if (regex.test(grade)) {
      let temp = Number.parseFloat(grade);
      return temp >= 0 && temp <= 10;
    } else return regex.test(grade);
  };

  const updateReview = () => {
    if (updatedGradeProxy === "") {
      toast.warn(t("please_update_grade"));
    } else if (!isGrade(updatedGradeProxy)) {
      console.log(updatedGradeProxy);
      console.log("isGrade: ", isGrade(updatedGradeProxy));
      toast.warn(t("invalid_grade"));
    } else {
      props.setUpdatedGrade(updatedGradeProxy);
      props.setNote(noteProxy);
      props.toggleStatus("In Progress");

      setUpdatedGradeProxy("");
      setNoteProxy("");
      props.closeModal();
    }
  };

  const updateStatus = () => {
    props.toggleStatus(props.status);
    props.closeModal();
  };

  return (
    <div className="flex flex-row m-10 align-middle justify-center">
      <div className="flex flex-col gap-4 w-md">
        <p className="text-sm text-md ml-4">
          <b>{t("grade_composition")}:</b> {props.gradeComposition}
        </p>
        <p className="text-sm text-md ml-4">
          <b>{t("current_grade")}:</b> {props.currentGrade}
        </p>

        <input
          type="text"
          placeholder={t("updated_grade")}
          className="input input-bordered w-full max-w-xs"
          value={updatedGradeProxy}
          onChange={(e) => setUpdatedGradeProxy(e.target.value)}
          maxLength={15}
        />
        <input
          type="text"
          placeholder={t("note")}
          className="input input-bordered w-full max-w-xs"
          value={noteProxy}
          onChange={(e) => setNoteProxy(e.target.value)}
          maxLength={15}
        />
        <div className="flex flex-row gap-4 align-middle justify-center pt-10">
          <button
            className="btn btn-info max-w-xs bg-blue-500 text-white"
            onClick={() => updateReview()}
          >
            {t("update_grade")}
          </button>
          <button
            className="btn btn-info max-w-xs bg-yellow-400 text-white"
            onClick={() => updateStatus()}
          >
            {props.status === "In Progress" && <>{t("mark_as_completed")}</>}
            {props.status === "Completed" && <>{t("mark_as_in_progress")}</>}
          </button>
        </div>
      </div>
    </div>
  );
}
