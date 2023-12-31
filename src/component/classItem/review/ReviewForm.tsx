"use client";
import { useTranslations } from "next-intl";
import CommentContainer from "../comment/CommentContainer";
import { ReviewType } from "@/model/ReviewType";

const ReviewForm = (review: ReviewType) => {
  const t = useTranslations("Review");

  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden relative">
      <div className="m-2 mb-3 grid grid-cols-3 gap-4">
        <div className="col-span-1 flex flex-col">
          <div>
            <b>{t("grade_composition")}:</b> {review.gradeComposition}
          </div>
          <div>
            <b>{t("current_grade")}:</b> {review.currentGrade}
          </div>
          <div>
            <b>{t("student_expectation_grade")}:</b> {review.expectationGrade}
          </div>
        </div>
        <div className=" col-span-2 flex flex-col">
          <div>
            <b>{t("student_explanation")}:</b> {review.explanation}
          </div>
          <div>
            <b>{t("status")}:</b>{" "}
            {review.status == "In Progress" && <>{t("in_progress_status")}</>}
            {review.status == "Completed" && <>{t("completed_status")}</>}
          </div>
        </div>
      </div>
      <CommentContainer reviewId={review._id} studentId={review.studentId} />
    </div>
  );
};

export default ReviewForm;
