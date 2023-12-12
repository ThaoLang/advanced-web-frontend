"use client";
import React, { useState } from "react";
import { useTranslations } from "next-intl";
import ReviewForm from "@/component/classItem/review/ReviewForm";
import { IoMdClose } from "react-icons/io";
import AddReviewModal from "@/component/classItem/review/AddReviewModal";
import { useAuth } from "@/context/AuthContext";
import MiniReview from "@/component/classItem/review/MiniReview";
import { ReviewType } from "@/model/ReviewType";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function ReviewPage() {
  const t = useTranslations("Review");
  const [showModal, setShowModal] = useState(false);
  const handleModal = () => {
    console.log("Modal changed");
    setShowModal(!showModal);
  };
  const auth = useAuth();
  const studentId = "auth.user?.student_id"; // TODO: need to change this

  const [selectedReview, setSelectedReview] = useState<ReviewType>();

  const addReview = (
    gradeComposition: string,
    expectationGrade: string,
    studentExplanation: string
  ) => {
    let tempReview = {
      studentId: studentId,
      gradeComposition: gradeComposition,
      currentGrade: "8", // TODO: query the current grade
      expectationGrade: expectationGrade,
      explanation: studentExplanation,
      status: "In Progress",
    } as ReviewType;

    reviewList.push(tempReview);
    setReviewList(reviewList);
    toast.success("Add review successfully!");
  };

  let tempReviewList = [
    {
      studentId: "auth.user?.student_id",
      gradeComposition: "Điểm cuối kì",
      currentGrade: "8",
      expectationGrade: "10",
      explanation: "Em đã làm tốt",
      status: "In Progress",
    },
    {
      studentId: "auth.user?.student_id",
      gradeComposition: "Điểm cuối kì",
      currentGrade: "8",
      expectationGrade: "10",
      explanation: "Em đã làm tốt",
      status: "In Progress",
    },
    {
      studentId: "auth.user?.student_id",
      gradeComposition: "Điểm cuối kì",
      currentGrade: "8",
      expectationGrade: "10",
      explanation: "Em đã làm tốt",
      status: "Completed",
    },
  ];
  const [reviewList, setReviewList] = useState<ReviewType[]>(tempReviewList);

  return (
    <div>
      <div className="grid grid-cols-2 mx-20">
        <div
          className={`${
            selectedReview ? "hidden lg:block" : "col-span-2"
          } lg:col-span-1`}
        >
          <div className="m-3 mx-10 text-2xl lg:text-3xl text-yellow-500 flex flex-row items-center justify-between">
            {t("my_review")}
            <button
              className="btn btn-info max-w-xs bg-yellow-400 text-white"
              onClick={handleModal}
            >
              {t("create_review")}
            </button>
          </div>

          <div className="grid grid-cols-2 mx-20 ml-10 gap-4">
            <div>
              <div className="flex text-lg text-yellow-500 items-center justify-center py-2">
                {t("in_progress_status")}
              </div>
              <div className="overflow-auto h-96 space-y-2">
                {reviewList
                  .filter((review) => review.status === "In Progress")
                  .map((review, index) => (
                    <div
                      key={index}
                      onClick={() => setSelectedReview(review)}
                      className="flex flex-row"
                    >
                      <input
                        type="radio"
                        name="radio-1"
                        className="radio"
                        checked={selectedReview === review}
                        onChange={() => {}}
                      />
                      <MiniReview
                        studentId={review.studentId}
                        gradeComposition={review.gradeComposition}
                        currentGrade={review.currentGrade}
                        expectationGrade={review.expectationGrade}
                        explanation={review.explanation}
                        status={review.status}
                      />
                    </div>
                  ))}
              </div>
            </div>
            <div>
              <div className="flex text-lg text-yellow-500 items-center justify-center py-2">
                {t("completed_status")}
              </div>
              <div className="overflow-auto h-96 space-y-2">
                {reviewList
                  .filter((review) => review.status === "Completed")
                  .map((review, index) => (
                    <div
                      key={index}
                      onClick={() => setSelectedReview(review)}
                      className="flex flex-row"
                    >
                      <input
                        type="radio"
                        name="radio-1"
                        className="radio"
                        checked={selectedReview === review}
                        onChange={() => {}}
                      />
                      <MiniReview
                        studentId={review.studentId}
                        gradeComposition={review.gradeComposition}
                        currentGrade={review.currentGrade}
                        expectationGrade={review.expectationGrade}
                        explanation={review.explanation}
                        status={review.status}
                      />
                    </div>
                  ))}
              </div>
            </div>
          </div>
        </div>
        {selectedReview && (
          <div className="m-3 flex-col col-span-2 lg:col-span-1">
            <div className="m-3 text-2xl lg:text-3xl text-yellow-500">
              {t("review_detail")}
            </div>
            <ReviewForm
              studentId={selectedReview.studentId}
              gradeComposition={selectedReview.gradeComposition}
              currentGrade={selectedReview.currentGrade}
              expectationGrade={selectedReview.expectationGrade}
              explanation={selectedReview.explanation}
              status={selectedReview.status}
            />
          </div>
        )}
      </div>

      {/* Modal */}
      <dialog className={`modal ${showModal ? "modal-open" : ""}`}>
        <div className="modal-box">
          <div className="flex flex-row justify-between">
            <p className="text-sm text-gray-500">
              {/* Press X or click outside to close */}
            </p>
            <button onClick={handleModal}>
              <IoMdClose />
            </button>
          </div>
          <AddReviewModal addReview={addReview} closeModal={handleModal} />
        </div>
        <form method="dialog" className="modal-backdrop">
          <button onClick={handleModal}>close</button>
        </form>
      </dialog>

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
