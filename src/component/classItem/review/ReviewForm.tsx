"use client";
import { useTranslations } from "next-intl";
import CommentContainer from "../comment/CommentContainer";
import { ReviewType } from "@/model/ReviewType";

const ReviewForm = () => {
  const t = useTranslations("Review");

  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden relative">
      <div className="m-2 mb-3 grid grid-cols-3">
        <div className="col-span-1 flex flex-col">
          <div>
            <b>{t("grade_composition")}:</b> Điểm cuối kì
          </div>
          <div>
            <b>{t("current_grade")}:</b> 8
          </div>
          <div>
            <b>{t("student_expectation_grade")}:</b> 10
          </div>
        </div>
        <div className=" col-span-2 flex flex-col">
          <div>
            <b>{t("student_explanation")}:</b> Em đã làm tốt
          </div>
          <div>
            <b>{t("status")}:</b> Chưa xác nhận
          </div>
        </div>
      </div>
      <CommentContainer />
    </div>
  );
};

export default ReviewForm;
