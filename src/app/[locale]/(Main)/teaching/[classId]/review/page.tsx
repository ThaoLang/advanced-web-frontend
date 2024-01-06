"use client";
import React, { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { ReviewType } from "@/model/ReviewType";
import DetailedMiniReview from "@/component/classItem/review/DetailedMiniReview";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { useParams } from "next/navigation";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";

export default function ReviewPage() {
  const t = useTranslations("Review");
  const auth = useAuth();

  const { classId } = useParams();

  const [reviewList, setReviewList] = useState<ReviewType[]>([]);

  useEffect(() => {
    // get review list
    (async () => {
      axios
        .get(
          `${process.env.NEXT_PUBLIC_BACKEND_PREFIX}review/allReviews/${classId}`,
          {
            headers: {
              Authorization: `Bearer ${auth.user?.access_token}`,
            },
          }
        )
        .then((response) => {
          console.log("Response", response);
          setReviewList(response.data);
        })
        .catch((error) => {
          console.error("Error fetching review list:", error);
        });
    })();
  }, []);

  return (
    <div>
      <div className="grid grid-cols-2 mx-20">
        <div className="hidden lg:block lg:col-span-1 mt-2">
          <div className="m-3 mx-10 text-2xl lg:text-3xl text-blue-600">
            {t("all_reviews")}
          </div>
          <div className="grid grid-cols-2 mx-20 ml-10 gap-4">
            <div>
              <div className="flex text-lg text-blue-600 items-center justify-center py-2">
                {t("in_progress_status")}
              </div>
              <div className="overflow-auto h-96 space-y-2">
                {reviewList
                  .filter((review) => review.status === "In Progress")
                  .map((review, index) => (
                    <Link href={`/teaching/${classId}/review/${review._id}`}>
                      <div key={index} className="flex flex-row">
                        <input
                          type="radio"
                          name="radio-1"
                          className="radio"
                          checked={false}
                          onChange={() => {}}
                        />
                        <DetailedMiniReview
                          _id={review._id}
                          classId={review.classId}
                          studentId={review.studentId}
                          gradeComposition={review.gradeComposition}
                          currentGrade={review.currentGrade}
                          expectationGrade={review.expectationGrade}
                          explanation={review.explanation}
                          status={review.status}
                        />
                      </div>
                    </Link>
                  ))}
              </div>
            </div>
            <div>
              <div className="flex text-lg text-blue-600 items-center justify-center py-2">
                {t("completed_status")}
              </div>
              <div className="overflow-auto h-96 space-y-2">
                {reviewList
                  .filter((review) => review.status === "Completed")
                  .map((review, index) => (
                    <Link href={`/teaching/${classId}/review/${review._id}`}>
                      <div key={index} className="flex flex-row">
                        <input
                          type="radio"
                          name="radio-1"
                          className="radio"
                          checked={false}
                          onChange={() => {}}
                        />
                        <DetailedMiniReview
                          _id={review._id}
                          classId={review.classId}
                          studentId={review.studentId}
                          gradeComposition={review.gradeComposition}
                          currentGrade={review.currentGrade}
                          expectationGrade={review.expectationGrade}
                          explanation={review.explanation}
                          status={review.status}
                        />
                      </div>
                    </Link>
                  ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer
        position="bottom-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={true}
        closeOnClick={true}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </div>
  );
}
