"use client";
import { useTranslations } from "next-intl";
import { ReviewType } from "@/model/ReviewType";

const MiniReview = (review: ReviewType) => {
  const t = useTranslations("Review");

  return (
    <div className="bg-white hover:bg-slate-100 border p-2 rounded-xl shadow-md overflow-hidden relative cursor-pointer">
      <div className="flex flex-col">
        <div>
          <b>{t("grade_composition")}:</b> {review.gradeComposition}
        </div>
        <div>
          <b>{t("current_grade")}:</b> {review.currentGrade}
        </div>
        <div>
          <b>{t("student_expectation_grade")}:</b> {review.expectationGrade}
        </div>
        {/* <div>
          <b>{t("student_explanation")}:</b> {review.explanation}
        </div>
        <div>
          <b>{t("status")}:</b>{" "}
          {review.status == "In Progress" && <>{t("in_progress_status")}</>}
          {review.status == "Completed" && <>{t("completed_status")}</>}
        </div> */}
      </div>
    </div>
  );
};

export default MiniReview;
