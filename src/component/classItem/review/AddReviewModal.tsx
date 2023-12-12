import { useState } from "react";
import { useTranslations } from "next-intl";

interface AddReviewProps {
  addReview: (
    gradeComposition: string,
    expectationGrade: string,
    studentExplanation: string
  ) => void;
  closeModal: () => void;
}

export default function AddReviewModal(props: AddReviewProps) {
  const [gradeCompositionProxy, setGradeCompositionProxy] = useState("");
  const [expectationGradeProxy, setExpectationGradeProxy] = useState("");
  const [studentExplanationProxy, setStudentExplanationProxy] = useState("");
  const t = useTranslations("Review");

  const addReviewTrigger = () => {
    props.addReview(
      gradeCompositionProxy,
      expectationGradeProxy,
      studentExplanationProxy
    );
    props.closeModal();
  };

  return (
    <div className="flex flex-row m-10 align-middle justify-center">
      <div className="flex flex-col gap-4 w-md">
        <select className="select select-bordered w-full max-w-xs">
          <option disabled selected>
            {t("select_composition")}
          </option>
          <option onClick={() => setGradeCompositionProxy(t("mock_quizzes"))}>
            {t("mock_quizzes")}
          </option>
          <option onClick={() => setGradeCompositionProxy(t("mid_term_exam"))}>
            {t("mid_term_exam")}
          </option>
          <option onClick={() => setGradeCompositionProxy(t("final_exam"))}>
            {t("final_exam")}
          </option>
        </select>
        <p className="text-sm text-md ml-4">
          <b>{t("current_grade")}:</b>{" "}
        </p>
        <input
          type="text"
          placeholder={t("student_expectation_grade")}
          className="input input-bordered w-full max-w-xs"
          value={expectationGradeProxy}
          onChange={(e) => setExpectationGradeProxy(e.target.value)}
          maxLength={15}
        />
        <input
          type="text"
          placeholder={t("student_explanation")}
          className="input input-bordered w-full max-w-xs"
          value={studentExplanationProxy}
          onChange={(e) => setStudentExplanationProxy(e.target.value)}
          maxLength={50}
        />
        <button
          className="btn btn-info max-w-xs bg-yellow-400 text-white"
          onClick={() => addReviewTrigger()}
        >
          {t("create_review")}!
        </button>
      </div>
    </div>
  );
}
