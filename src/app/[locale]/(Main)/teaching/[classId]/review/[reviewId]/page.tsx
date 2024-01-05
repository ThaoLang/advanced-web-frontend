"use client";
import React, { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import TeacherReviewForm from "@/component/classItem/review/TeacherReviewForm";
import { IoMdClose } from "react-icons/io";
import UpdateReviewModal from "@/component/classItem/review/UpdateReviewModal";
import { ReviewType } from "@/model/ReviewType";
import DetailedMiniReview from "@/component/classItem/review/DetailedMiniReview";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { UserType } from "@/model/UserType";
import { useParams } from "next/navigation";
import { RubricType } from "@/model/RubricType";
import { ClassListType } from "@/model/ClassListType";
import { NotificationType } from "@/model/NotificationType";
import { actions } from "@/app/[locale]/(Main)/state";
import { useAuth } from "@/context/AuthContext";

export default function DetailedReviewPage() {
  const t = useTranslations("Review");
  const [showModal, setShowModal] = useState(false);
  const handleModal = () => {
    console.log("Modal changed");
    setShowModal(!showModal);
  };

  // const savedUser = localStorage.getItem("user");
  // let currentUser: UserType;
  // if (savedUser) {
  //   currentUser = JSON.parse(savedUser);
  // }
  const { classId } = useParams();
  const { reviewId } = useParams();
  const auth = useAuth();

  const [reviewList, setReviewList] = useState<ReviewType[]>([]);

  const [selectedReview, setSelectedReview] = useState<ReviewType>();

  const handleStatus = (currentStatus: string, currentGrade: string) => {
    if (selectedReview) {
      if (currentStatus === "In Progress") {
        selectedReview.status = "Completed";

        // notification
        (async () => {
          let senderRole: string,
            message: string,
            redirectUrl: string,
            receiverIdList: string[],
            allMembersList: ClassListType[];

          receiverIdList = [];

          await axios
            .get(
              `${process.env.NEXT_PUBLIC_BACKEND_PREFIX}classes/${classId}/members`,
              {
                headers: {
                  Authorization: `Bearer ${auth.user?.access_token}`,
                },
              }
            )
            .then((response) => {
              allMembersList = response.data.members;

              senderRole = "Teacher";
              message = "review_finalize";
              redirectUrl = `/enrolled/${classId}/review/${selectedReview._id}`;

              if (allMembersList.length > 0) {
                allMembersList.forEach((member) => {
                  if (
                    member.role === "Student" &&
                    member.student_id === selectedReview.studentId
                  ) {
                    receiverIdList.push(member.user_id);
                  }
                });
              }

              let newNotification: NotificationType;
              newNotification = {
                id: "",
                senderId: "",
                classId: classId.toString(),
                reviewId: selectedReview._id,
                senderRole: senderRole,
                receiverIdList: receiverIdList,
                message: message,
                redirectUrl: redirectUrl,
                createdAt: new Date().toISOString(),
                isRead: false,
              };

              actions.sendNotification(
                auth.user?.access_token ? auth.user?.access_token : "",
                newNotification
              );
            })
            .catch((error) => {
              console.error("Error fetching class members:", error);
            });
        })();
        // end send notification
      } else if (currentStatus === "Completed") {
        selectedReview.status = "In Progress";
      }

      if (currentGrade !== selectedReview.currentGrade) {
        selectedReview.currentGrade = currentGrade;
      }

      setSelectedReview(selectedReview);

      // update selected review to review list
      setReviewList(reviewList);

      axios
        .put(
          `${process.env.NEXT_PUBLIC_BACKEND_PREFIX}review/update`,
          {
            classId: classId,
            studentId: selectedReview.studentId,
            gradeComposition: selectedReview.gradeComposition,
            status: selectedReview.status,
            currentGrade: selectedReview.currentGrade,
          },
          {
            headers: {
              Authorization: `Bearer ${auth.user?.access_token}`,
            },
          }
        )
        .then((response) => {
          toast.success(t("update_review_success"));
        })
        .catch((error) => {
          console.error("Error updating review:", error);
          toast.error(t("update_review_failure"));
          return;
        });
    }
  };

  const updateGrade = (updateGrade: string) => {
    if (selectedReview) {
      (async () => {
        axios
          .get(`${process.env.NEXT_PUBLIC_BACKEND_PREFIX}rubric/${classId}`, {
            headers: {
              Authorization: `Bearer ${auth.user?.access_token}`,
            },
          })
          .then((response) => {
            let rubrics: RubricType[];
            rubrics = response.data;

            let currentRubricId = "";
            rubrics.forEach((element) => {
              if (element.gradeName === selectedReview.gradeComposition) {
                currentRubricId = element._id;
              }
              (async () => {
                await axios
                  .put(
                    `${process.env.NEXT_PUBLIC_BACKEND_PREFIX}grade/update`,
                    {
                      studentId: selectedReview.studentId,
                      rubricId: currentRubricId,
                      grade: Number.parseFloat(updateGrade),
                    },
                    {
                      headers: {
                        Authorization: `Bearer ${auth.user?.access_token}`,
                      },
                    }
                  )
                  .then((response) => {
                    console.log("Response", response);
                  })
                  .catch((error) => {
                    console.error("Error updating grade:", error);
                  });
              })();
            });
          })
          .catch((error) => {
            console.error("Error fetching rubrics:", error);
          });
      })();
    }
  };

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
          if (response.data.length > 0) {
            let data: ReviewType[];
            data = response.data;
            setReviewList(data);

            data.forEach((element) => {
              if (element._id === reviewId) {
                setSelectedReview(element);
                return;
              }
            });
          }
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
                  ))}
              </div>
            </div>
          </div>
        </div>
        {selectedReview && (
          <div className="flex-col col-span-2 lg:col-span-1">
            <div className="p-3 text-2xl lg:text-3xl text-blue-600 flex flex-row items-center justify-between">
              {t("review_detail")}
              <button
                className="btn btn-info max-w-xs bg-blue-500 text-white"
                onClick={() => handleModal()}
              >
                {t("update")}
              </button>
            </div>
            <TeacherReviewForm
              _id={selectedReview._id}
              classId={selectedReview.classId}
              studentId={selectedReview.studentId}
              gradeComposition={selectedReview.gradeComposition}
              currentGrade={selectedReview.currentGrade}
              expectationGrade={selectedReview.expectationGrade}
              explanation={selectedReview.explanation}
              status={selectedReview.status}
            />

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
                <UpdateReviewModal
                  gradeComposition={selectedReview.gradeComposition}
                  currentGrade={selectedReview.currentGrade}
                  status={selectedReview.status}
                  toggleStatus={handleStatus}
                  setUpdatedGrade={updateGrade}
                  // setNote={setNote}
                  closeModal={handleModal}
                />
              </div>
              <form method="dialog" className="modal-backdrop">
                <button onClick={handleModal}>close</button>
              </form>
            </dialog>
          </div>
        )}
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
