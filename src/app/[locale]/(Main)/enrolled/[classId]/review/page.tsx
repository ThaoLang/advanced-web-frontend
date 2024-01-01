"use client";
import React, { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import ReviewForm from "@/component/classItem/review/ReviewForm";
import { IoMdClose } from "react-icons/io";
import AddReviewModal from "@/component/classItem/review/AddReviewModal";
import { useAuth } from "@/context/AuthContext";
import MiniReview from "@/component/classItem/review/MiniReview";
import { ReviewType } from "@/model/ReviewType";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { RubricType } from "@/model/RubricType";
import { UserType } from "@/model/UserType";
import { useParams } from "next/navigation";
import axios from "axios";

export default function ReviewPage() {
  const t = useTranslations("Review");
  const [showModal, setShowModal] = useState(false);
  const handleModal = () => {
    console.log("Modal changed");
    setShowModal(!showModal);
  };
  const auth = useAuth();
  const studentId = auth.user?.studentId ? auth.user.studentId : "20127679";
  const [rubrics, setRubrics] = useState<RubricType[]>([]);

  const savedUser = localStorage.getItem("user");
  let currentUser: UserType;
  if (savedUser) {
    currentUser = JSON.parse(savedUser);
  }
  const { classId } = useParams();
  const [selectedReview, setSelectedReview] = useState<ReviewType>();

  const addReview = (
    gradeComposition: string,
    expectationGrade: string,
    studentExplanation: string,
    currentGrade: string
  ) => {
    let tempReview = {
      _id: "",
      studentId: studentId,
      gradeComposition: gradeComposition,
      currentGrade: currentGrade,
      expectationGrade: expectationGrade,
      explanation: studentExplanation,
      status: "In Progress",
    } as ReviewType;

    console.log("Review", tempReview);
    axios
      .post(
        `${process.env.NEXT_PUBLIC_BACKEND_PREFIX}review/create`,
        {
          classId: classId,
          studentId: tempReview.studentId,
          gradeComposition: tempReview.gradeComposition,
          currentGrade: tempReview.currentGrade,
          expectationGrade: tempReview.expectationGrade,
          explanation: tempReview.explanation,
          status: tempReview.status,
        },
        {
          headers: {
            Authorization: `Bearer ${currentUser?.access_token}`,
          },
        }
      )
      .then((response) => {
        if (response.status === 201) {
          toast.success(t("add_review_success"));
        }
      })
      .catch((error) => {
        console.error("Error creating review:", error);
        toast.error(t("add_review_failure"));
        return;
      });

    reviewList.push(tempReview);
    setReviewList(reviewList);
  };

  const [reviewList, setReviewList] = useState<ReviewType[]>([]);

  useEffect(() => {
    axios
      .get(`${process.env.NEXT_PUBLIC_BACKEND_PREFIX}rubric/${classId}`, {
        headers: {
          Authorization: `Bearer ${currentUser?.access_token}`,
        },
      })
      .then((response) => {
        // console.log("Response", response);
        setRubrics(response.data);
      })
      .catch((error) => {
        console.error("Error fetching rubrics:", error);
      });

    // get review list
    axios
      .get(
        `${process.env.NEXT_PUBLIC_BACKEND_PREFIX}review/studentReviews/${classId}/${studentId}`,
        {
          headers: {
            Authorization: `Bearer ${currentUser?.access_token}`,
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
  }, []);

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
            {rubrics.length > 0 && (
              <button
                className="btn btn-info max-w-xs bg-yellow-400 text-white"
                onClick={handleModal}
              >
                {t("create_review")}
              </button>
            )}
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
              _id={selectedReview._id}
              classId={selectedReview.classId}
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
          <AddReviewModal
            rubricName=""
            currentGrade={null}
            rubrics={rubrics}
            addReview={addReview}
            closeModal={handleModal}
          />
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
