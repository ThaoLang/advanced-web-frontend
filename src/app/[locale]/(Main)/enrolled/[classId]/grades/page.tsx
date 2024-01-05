"use client";
import React, { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { RubricType } from "@/model/RubricType";
import { UserType } from "@/model/UserType";
import axios from "axios";
import { useParams } from "next/navigation";
import AddReviewModal from "@/component/classItem/review/AddReviewModal";
import { useAuth } from "@/context/AuthContext";
import { ReviewType } from "@/model/ReviewType";
import { IoMdClose } from "react-icons/io";
import { toast, ToastContainer } from "react-toastify";
import { GradeType } from "@/model/GradeType";

export default function GradePage() {
  //temp
  const student = {
    studentId: "20127679",
    email: "lhkn@gmail.com",
  };

  const t = useTranslations("GradePage");
  const [showModal, setShowModal] = useState(false);

  const openModal = (name: string, id: string) => {
    console.log("selected rubric name: " + name);
    setSelectedRubric(name);

    grade.forEach((oneGrade) => {
      if (id === oneGrade.rubricId) {
        setSelectedGrade(oneGrade.grade);
        return;
      }
    });

    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const [rubrics, setRubrics] = useState<RubricType[]>([]);
  const [selectedRubric, setSelectedRubric] = useState("");
  const [selectedGrade, setSelectedGrade] = useState<string | null>(null);

  const [grade, setGrade] = useState<GradeType[]>([]);
  const [finalizedGrade, setFinalizedGrade] = useState();
  const [fullname, setFullname] = useState();

  // const auth = useAuth();
  // student.studentId = auth.user?.studentId ? auth.user.studentId : "20127679";
  const savedUser = localStorage.getItem("user");
  let currentUser: UserType;
  if (savedUser) {
    currentUser = JSON.parse(savedUser);
    if (currentUser) {
      student.email = currentUser.email;
      student.studentId = currentUser.studentId;
    }
  }
  const { classId } = useParams();

  const addReview = (
    gradeComposition: string,
    expectationGrade: string,
    studentExplanation: string,
    currentGrade: string
  ) => {
    let tempReview = {
      _id: "",
      studentId: student.studentId,
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
  };

  useEffect(() => {
    (async () => {
      axios
        .get(`${process.env.NEXT_PUBLIC_BACKEND_PREFIX}rubric/${classId}`, {
          headers: {
            Authorization: `Bearer ${currentUser?.access_token}`,
          },
        })
        .then((response) => {
          setRubrics(response.data);
        })
        .catch((error) => {
          console.error("Error fetching rubrics:", error);
        });

      axios
        .get(
          `${process.env.NEXT_PUBLIC_BACKEND_PREFIX}grade/studentGrades/${student.studentId}`,
          {
            headers: {
              Authorization: `Bearer ${currentUser?.access_token}`,
            },
          }
        )
        .then((response) => {
          setGrade(response.data);
        })
        .catch((error) => {
          console.error("Error fetching grade:", error);
        });

      axios
        .get(
          `${process.env.NEXT_PUBLIC_BACKEND_PREFIX}student/${classId}/${student.studentId}`,
          {
            headers: {
              Authorization: `Bearer ${currentUser?.access_token}`,
            },
          }
        )
        .then((response) => {
          console.log("Member response", response);
          setFullname(response.data);
        })
        .catch((error) => {
          console.error("Error fetching member:", error);
        });

      axios
        .get(
          `${process.env.NEXT_PUBLIC_BACKEND_PREFIX}grade/finalizedGrade/${classId}/${student.studentId}`,
          {
            headers: {
              Authorization: `Bearer ${currentUser?.access_token}`,
            },
          }
        )
        .then((response) => {
          console.log("Grade response", response);
          setFinalizedGrade(response.data);
        })
        .catch((error) => {
          console.error("Error fetching member:", error);
        });
    })();
  }, []);

  return (
    <div>
      <div className="flex flex-col items-center justify-center my-5 mx-auto">
        <h1 className="text-2xl lg:text-3xl mb-8 text-yellow-500">
          {t("my_grade")}
        </h1>

        <div className="max-w-7xl max-h-[450px] overflow-auto bg-white rounded border-2 border-yellow-200">
          {/* table */}
          <table className="table table-lg table-pin-cols">
            {/* head */}
            <thead>
              <tr className="text-lg font-normal">
                <th>{t("student_id")}</th>
                <td>{t("fullname")}</td>
                <td>{t("email")}</td>
                {rubrics.length > 0 &&
                  rubrics.map((item, index) => {
                    return <td key={index}>{item.gradeName}</td>;
                  })}
                <th>{t("finalized_score")}</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th>{student.studentId}</th>
                <td>{fullname}</td>
                <td>
                  <input
                    type="text"
                    className="text-md font-light h-8 p-2"
                    value={student.email}
                    placeholder={t("email")}
                    disabled={true}
                  />
                </td>

                {rubrics.length > 0 &&
                  rubrics.map((item, index) => {
                    return (
                      <td key={index}>
                        {grade
                          .filter((oneGrade) => {
                            if (item._id === oneGrade.rubricId) return oneGrade;
                          })
                          .map((oneGrade) => (
                            <>{oneGrade.grade}</>
                          ))}
                      </td>
                    );
                  })}
                <th>
                  <div className="text-sm opacity-50 flex justify-center align-middle">
                    {finalizedGrade}
                  </div>
                </th>
              </tr>
              {rubrics.length > 0 && (
                <>
                  <tr>
                    <th className="text-lg text-gray-500">%</th>
                    <td></td>
                    <td></td>
                    {rubrics.map((item, index) => {
                      return <td key={index}>{item.gradeScale}</td>;
                    })}
                  </tr>
                  <tr>
                    <th className="text-lg text-gray-500">{t("status")}</th>
                    <td></td>
                    <td></td>
                    {rubrics.map((item, index) => {
                      return (
                        <td key={index}>
                          {/* {t("graded")} */}
                          {t("not_graded")}
                        </td>
                      );
                    })}
                  </tr>
                  <tr>
                    <th className="text-lg text-gray-500">{t("review")}</th>
                    <td></td>
                    <td></td>
                    {rubrics.map((item, index) => {
                      return (
                        <td key={index}>
                          <button
                            key={index}
                            className="hidden md:block btn btn-info bg-yellow-400 text-white text-xs"
                            onClick={() => {
                              openModal(item.gradeName, item._id);
                            }}
                          >
                            {t("review")}
                          </button>
                        </td>
                      );
                    })}
                    <th></th>
                  </tr>
                </>
              )}
            </tbody>
          </table>
        </div>
      </div>
      {/* Modal */}
      <dialog className={`modal ${showModal ? "modal-open" : ""}`}>
        <div className="modal-box">
          <div className="flex flex-row justify-between">
            <p className="text-sm text-gray-500">
              {/* Press X or click outside to close */}
            </p>
            <button onClick={closeModal}>
              <IoMdClose />
            </button>
          </div>
          <AddReviewModal
            rubricName={selectedRubric}
            currentGrade={selectedGrade}
            rubrics={rubrics}
            addReview={addReview}
            closeModal={closeModal}
          />
        </div>
        <form method="dialog" className="modal-backdrop">
          <button onClick={closeModal}>close</button>
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
