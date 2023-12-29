"use client";
import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { RubricType } from "@/model/RubricType";
import { UserType } from "@/model/UserType";
import { useParams } from "next/navigation";
import axios from "axios";

interface AddReviewProps {
  rubrics: RubricType[];
  addReview: (
    gradeComposition: string,
    expectationGrade: string,
    studentExplanation: string,
    currentGrade: string
  ) => void;
  closeModal: () => void;
}

export default function AddReviewModal(props: AddReviewProps) {
  const [gradeCompositionProxy, setGradeCompositionProxy] = useState("");
  const [expectationGradeProxy, setExpectationGradeProxy] = useState("");
  const [studentExplanationProxy, setStudentExplanationProxy] = useState("");
  const [grade, setGrade] = useState(""); // view current grade

  const savedUser = localStorage.getItem("user");
  let currentUser: UserType;
  if (savedUser) {
    currentUser = JSON.parse(savedUser);
  }
  const { classId } = useParams();

  // TODO: update request to get current grade
  useEffect(() => {
    // console.log("User", currentUser);
    // axios
    //   .get(`${process.env.NEXT_PUBLIC_BACKEND_PREFIX}rubric/${classId}`, {
    //     headers: {
    //       Authorization: `Bearer ${currentUser?.access_token}`,
    //     },
    //   })
    //   .then((response) => {
    //     console.log("Response", response);
    //     setRubrics(response.data);
    //   })
    //   .catch((error) => {
    //     console.error("Error fetching rubrics:", error);
    //   });
  }, []);

  const t = useTranslations("Review");

  const isGrade = (grade: string) => {
    const regex = /^(\d*\.)?\d+$/;
    if (regex.test(grade)) {
      let temp = Number.parseFloat(grade);
      return temp >= 0 && temp <= 10;
    } else return regex.test(grade);
  };

  const addReviewTrigger = () => {
    if (
      gradeCompositionProxy === "" ||
      studentExplanationProxy === "" ||
      expectationGradeProxy === ""
    ) {
      toast.warn(t("invalid_info"));
    } else if (!isGrade(expectationGradeProxy)) {
      console.log(expectationGradeProxy);
      console.log("isGrade: ", isGrade(expectationGradeProxy));
      toast.warn(t("invalid_grade"));
    } else {
      props.addReview(
        gradeCompositionProxy,
        expectationGradeProxy,
        studentExplanationProxy,
        grade
      );

      setGradeCompositionProxy("");
      setExpectationGradeProxy("");
      setStudentExplanationProxy("");
      props.closeModal();
    }
  };

  const handleSelectChange = (
    value: string,
    setter: React.Dispatch<React.SetStateAction<string>>
  ) => {
    setter(value);
  };

  return (
    <div className="flex flex-row m-10 align-middle justify-center">
      <div className="flex flex-col gap-4 w-md">
        <p className="text-sm ml-4">
          <b>{t("select_composition")}</b>
        </p>
        <select
          className="select select-bordered w-full max-w-xs"
          onChange={(e) =>
            handleSelectChange(e.target.value, setGradeCompositionProxy)
          }
          value={gradeCompositionProxy}
        >
          <option value="" />
          {/* <option value={t("mock_quizzes")}>{t("mock_quizzes")}</option>
          <option value={t("mid_term_exam")}>{t("mid_term_exam")}</option>
          <option value={t("final_exam")}>{t("final_exam")}</option> */}

          {props.rubrics &&
            props.rubrics.map((rubric, index) => (
              <option key={index} value={rubric.gradeName}>
                {rubric.gradeName}
              </option>
            ))}
        </select>
        <p className="text-sm ml-4">
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
