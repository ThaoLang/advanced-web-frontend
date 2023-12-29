import React from "react";
import { useTranslations } from "next-intl";
import { RubricType } from "@/model/RubricType";

export default function GradePage() {
  const items: RubricType[] = [
    {
      classId: "123",
      id: "1",
      gradeName: "Homework 1",
      gradeScale: 53,
      order: 1,
    },
    {
      classId: "123",
      id: "2",
      gradeName: "Homework 2",
      gradeScale: 92,
      order: 2,
    },
    {
      classId: "123",
      id: "3",
      gradeName: "Midterm ",
      gradeScale: 14,
      order: 3,
    },
    { classId: "123", id: "4", gradeName: "Test 4", gradeScale: 68, order: 4 },
    {
      classId: "123",
      id: "5",
      gradeName: "Final project 5",
      gradeScale: 35,
      order: 5,
    },
    {
      classId: "123",
      id: "6",
      gradeName: "Additional point 6",
      gradeScale: 79,
      order: 6,
    },
  ];

  const getGrade = async () => {
    return [
      {
        studentId: "20127679",
        rubricId: "1",
        grade: "1",
      },
      {
        studentId: "20127679",
        rubricId: "2",
        grade: "1",
      },
      {
        studentId: "20127679",
        rubricId: "3",
        grade: "1",
      },
      {
        studentId: "20127679",
        rubricId: "4",
        grade: "1",
      },
      {
        studentId: "20127679",
        rubricId: "5",
        grade: "1",
      },
      {
        studentId: "20127679",
        rubricId: "6",
        grade: "1",
      },
    ];
  };

  const student = {
    fullname: "Lê Hoàng Khanh Nguyên",
    studentId: "20127679",
    email: "lhkn@gmail.com",
  };

  const t = useTranslations("GradePage");

  return (
    <div className="flex items-center justify-center my-20">
      <div className="max-w-7xl max-h-[450px] overflow-auto bg-white rounded">
        {/* table */}
        <table className="table table-lg table-pin-rows table-pin-cols">
          {/* head */}
          <thead>
            <tr className="text-lg font-normal">
              <th>{t("student_id")}</th>
              <td>{t("fullname")}</td>
              <td>{t("email")}</td>
              {items.length > 0 &&
                items.map((item, index) => {
                  return <td key={index}>{item.gradeName}</td>;
                })}
              <th>{t("finalized_score")}</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th>{student.studentId}</th>
              <td>{student.fullname}</td>
              <td>
                <input
                  type="text"
                  className="text-md font-light h-8 p-2"
                  value={student.email}
                  placeholder={t("email")}
                  disabled={true}
                />
              </td>

              {items.length > 0 &&
                items.map((item, index) => {
                  return <td key={index}>{item.gradeName}</td>;
                })}
              <th>
                <div className="text-sm opacity-50 flex justify-center align-middle">
                  Điểm tổng kết
                </div>
              </th>
            </tr>
            <tr>
              <td></td>
              <td></td>
              <td></td>
              {items.length > 0 &&
                items.map((item, index) => {
                  return (
                    <td>
                      <button
                        key={index}
                        className="hidden md:block btn btn-info bg-blue-500 text-white text-xs"
                        // onClick={() => {}}
                      >
                        {t("review")}
                      </button>
                    </td>
                  );
                })}
              <th></th>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
