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
import { useParams } from "next/navigation";
import axios from "axios";
import { ClassListType } from "@/model/ClassListType";
import { NotificationType } from "@/model/NotificationType";
import { actions } from "@/app/[locale]/(Main)/state";

export default function ReviewPage() {
  const t = useTranslations("Review");
  const [showModal, setShowModal] = useState(false);
  const handleModal = () => {
    console.log("Modal changed");
    setShowModal(!showModal);
  };

  const [rubrics, setRubrics] = useState<RubricType[]>([]);

  const { classId } = useParams();
  const { reviewId } = useParams();
  const auth = useAuth();

  const [selectedReview, setSelectedReview] = useState<ReviewType>();

  const addReview = (
    gradeComposition: string,
    expectationGrade: string,
    studentExplanation: string,
    currentGrade: string
  ) => {
    if (!auth.user || auth.user == null) return;

    let tempReview = {
      _id: "",
      studentId: auth.user.studentId,
      gradeComposition: gradeComposition,
      currentGrade: currentGrade ? currentGrade : "",
      expectationGrade: expectationGrade,
      explanation: studentExplanation,
      status: "In Progress",
    } as ReviewType;

    console.log("Review", tempReview);

    (async () => {
      await axios
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
              Authorization: `Bearer ${auth.user?.access_token}`,
            },
          }
        )
        .then((response) => {
          if (response.status === 201) {
            toast.success(t("add_review_success"));

            let data: ReviewType;
            data = response.data;

            tempReview._id = data._id;

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

                  receiverIdList.push(response.data.host_user._id);

                  senderRole = "Student";
                  message = "review_create";
                  redirectUrl = `/teaching/${classId}/review/${data._id}`;

                  if (allMembersList.length > 0) {
                    allMembersList.forEach((member) => {
                      if (member.role === "Teacher") {
                        receiverIdList.push(member.user_id);
                      }
                    });
                  }

                  let newNotification: NotificationType;
                  newNotification = {
                    id: "",
                    senderId: "",
                    classId: classId.toString(),
                    reviewId: "",
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
          }
        })
        .catch((error) => {
          console.error("Error creating review:", error);
          toast.error(t("add_review_failure"));
          return;
        });
    })();
    reviewList.push(tempReview);
    setReviewList(reviewList);
  };

  const [reviewList, setReviewList] = useState<ReviewType[]>([]);

  useEffect(() => {
    axios
      .get(`${process.env.NEXT_PUBLIC_BACKEND_PREFIX}rubric/${classId}`, {
        headers: {
          Authorization: `Bearer ${auth.user?.access_token}`,
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
        `${process.env.NEXT_PUBLIC_BACKEND_PREFIX}review/studentReviews/${classId}/${auth.user?.studentId}`,
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
  }, [auth.user]);

  return (
    <div>
      <div className="grid grid-cols-2 gap-5 mx-20">
        <div
          className={`${
            selectedReview ? "hidden lg:block" : "col-span-2"
          } lg:col-span-1`}
        >
          <div className="m-3 mx-10 text-2xl lg:text-3xl text-yellow-500 flex flex-row items-center justify-between">
            {t("my_review")}
            {rubrics.length > 0 && auth.user && (
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
