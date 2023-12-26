"use client";
import * as React from "react";
import * as ReactDOM from "react-dom";
import {
  arrayMove,
  SortableContainer,
  SortableElement,
} from "react-sortable-hoc";
import { RxDragHandleDots2 } from "react-icons/rx";
import { RiDeleteBinLine } from "react-icons/ri";
import { MdOutlineModeEditOutline } from "react-icons/md";
import { IoAdd } from "react-icons/io5";
import { IoMdClose } from "react-icons/io";
import AddGradeForm from "@/component/AddGradeForm";
import SortableList from "@/component/GradeBlocks";
import { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "@/context/AuthContext";
import { useParams } from "next/navigation";
import { RubricType } from "@/model/RubricType";
import { useTranslations } from "next-intl";

interface SortableComponentProps {
  rubrics: RubricType[];
  setRubrics: (rubrics: RubricType[]) => void;
}
const SortableComponent = (props: SortableComponentProps) => {
  const onSortEnd = ({
    oldIndex,
    newIndex,
  }: {
    oldIndex: number;
    newIndex: number;
  }) => {
    const updatedRubrics: RubricType[] = arrayMove(
      props.rubrics,
      oldIndex,
      newIndex
    );
    updatedRubrics.forEach((rubric, index) => {
      rubric.order = index;
    });

    props.setRubrics(updatedRubrics);
  };

  return (
    <SortableList
      items={props.rubrics}
      setRubrics={props.setRubrics}
      onSortEnd={onSortEnd}
      useDragHandle
    />
  );
};

const GradePage: React.FC = () => {
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

  const students = [
    {
      fullName: "Nguyen Minh Quang",
      studentId: "20127605",
      email: "",
    },
    {
      fullName: "Lang Thao Thao",
      studentId: "20127629",
      email: "",
    },
    {
      fullName: "Le Hoang Khanh Nguyen",
      studentId: "20127679",
      email: "lhkn@gmail.com",
    },
    {
      fullName: "Nguyen Minh Quang",
      studentId: "20127605",
      email: "",
    },
    {
      fullName: "Lang Thao Thao",
      studentId: "20127629",
      email: "",
    },
    {
      fullName: "Le Hoang Khanh Nguyen",
      studentId: "20127679",
      email: "lhkn@gmail.com",
    },
    {
      fullName: "Nguyen Minh Quang",
      studentId: "20127605",
      email: "",
    },
    {
      fullName: "Lang Thao Thao",
      studentId: "20127629",
      email: "",
    },
    {
      fullName: "Le Hoang Khanh Nguyen",
      studentId: "20127679",
      email: "lhkn@gmail.com",
    },
  ];

  const studentGrade = [
    // ?
    {
      studentId: "20127605",
      grades: [],
    },
    {
      studentId: "20127629",
      grades: [],
    },
    {
      studentId: "20127679",
      grades: [],
    },
  ];
  const [studentGradeProxy, setStudentGradeProxy] = useState(studentGrade);

  const t = useTranslations("GradePage");

  const [showModal, setShowModal] = useState(false);
  const [rubrics, setRubrics] = useState<RubricType[]>(items);
  const [isDisabledUpdatedBtn, setIsDisabledUpdatedBtn] = useState(true);
  const [isDisabledUpdatedBtn2, setIsDisabledUpdatedBtn2] = useState(true);
  const auth = useAuth();
  const { classId } = useParams();
  const handleModal = () => {
    console.log("Modal changed");
    setShowModal(!showModal);
  };

  const handleAddRubric = async (gradeName: string, gradeScale: number) => {
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_BACKEND_PREFIX}rubric/create`,
        {
          class_id: classId,
          gradeName: gradeName,
          gradeScale: gradeScale,
          order: rubrics.length,
        },
        {
          headers: {
            Authorization: `Bearer ${auth.user?.access_token}`,
          },
        }
      );
      if (response.status === 200) {
        const createdRubric: RubricType = response.data;

        setRubrics([...rubrics, createdRubric]);
      }
    } catch (error: any) {
      console.error("Failed to create new rubric:", error);
    }
  };

  const handleUpdate = async (rubrics: RubricType[]) => {
    try {
      const response = await axios.put(
        `${process.env.NEXT_PUBLIC_BACKEND_PREFIX}rubric/update}`,
        rubrics,
        {
          headers: {
            Authorization: `Bearer ${auth.user?.access_token}`,
          },
        }
      );
      if (response.status === 200) {
        //const newRubrics = response.data;
        //setRubrics(newRubrics);
      }
    } catch (error: any) {
      console.error("Failed to delete:", error);
    }
  };

  useEffect(() => {
    axios
      .get(`${process.env.NEXT_PUBLIC_BACKEND_PREFIX}rubric/get`, {
        params: { classId: classId },
        headers: {
          Authorization: `Bearer ${auth.user?.access_token}`,
        },
      })
      .then((response) => {
        setRubrics(response.data);
      })
      .catch((error) => {
        console.error("Error fetching rubrics:", error);
      });
  }, []);

  useEffect(() => {
    console.log("List Rubrics:", rubrics);
    if (isDisabledUpdatedBtn) {
      setIsDisabledUpdatedBtn(!isDisabledUpdatedBtn);
    }
  }, [rubrics]);

  return (
    <div className="grid grid-cols-6 gap-10 mx-10">
      <div className="hidden md:block md:col-span-3 lg:col-span-4">
        <div className="flex items-center justify-center gap-4 mb-2">
          <button
            className={`btn btn-info bg-blue-500 text-white ${
              isDisabledUpdatedBtn2 ? "btn-disabled" : ""
            }`}
            // onClick={() => {}}
          >
            {t("update")}
          </button>
          <button
            className="btn btn-info bg-blue-500 text-white"
            // onClick={() => {}}
          >
            {t("download_help")}
          </button>
          <button
            className="btn btn-info bg-blue-500 text-white"
            // onClick={() => {}}
          >
            {t("import")}
          </button>
          <button
            className={`btn btn-info bg-blue-500 text-white 
            ${studentGrade.length === 0 ? "btn-disabled" : ""}
            `}
            // onClick={() => {}}
          >
            {t("export")}
          </button>
        </div>
        <div className="max-h-[450px] overflow-auto bg-white rounded">
          {/* table */}
          <table className="table">
            {/* head */}
            <thead className="text-md">
              <tr>
                {/* <th>
                <label>
                  <input type="checkbox" className="checkbox" />
                </label>
              </th> */}
                <th>{t("number")}</th>
                <th>{t("fullname")}</th>
                <th>{t("student_id")}</th>
                <th>{t("email")}</th>
                {items.length > 0 &&
                  items.map((item, index) => {
                    return <th key={index}>{item.gradeName}</th>;
                  })}
              </tr>
            </thead>
            <tbody>
              {/* rows */}
              {students.length > 0 &&
                students.map((student, index) => {
                  return (
                    <tr>
                      {/* <th>
                      <label>
                        <input type="checkbox" className="checkbox" />
                      </label>
                    </th> */}
                      <td>
                        <div className="text-sm opacity-50">{index + 1}</div>
                      </td>
                      <td>{student.fullName}</td>
                      <td>{student.studentId}</td>
                      <th>
                        <input
                          type="text"
                          className="text-md font-light h-8 p-2"
                          value={student.email}
                          placeholder={t("email")}
                          disabled={true}
                        />
                        <br />
                        <span className="badge badge-ghost badge-sm">
                          {(student.email && <>{t("available")}</>) || (
                            <>{t("unavailable")}</>
                          )}
                        </span>
                      </th>
                      {/* <th>
                      <button className="btn btn-ghost btn-xs">details</button>
                    </th> */}
                      {items.length > 0 &&
                        items.map((item, index) => {
                          return (
                            <th key={index}>
                              <input
                                type="text"
                                className="text-md font-light h-8 p-2"
                                placeholder={item.gradeName}
                              />
                            </th>
                          );
                        })}
                    </tr>
                  );
                })}
            </tbody>

            {/* foot */}
            <tfoot>
              <tr>
                {/* <th></th> */}
                <th>{t("number")}</th>
                <th>{t("fullname")}</th>
                <th>{t("student_id")}</th>
                <th>{t("email")}</th>
                {items.length > 0 &&
                  items.map((item, index) => {
                    return <th key={index}>{item.gradeName}</th>;
                  })}
              </tr>
            </tfoot>
          </table>
        </div>
      </div>

      <div className="col-span-6 md:col-span-3 lg:col-span-2">
        <div className="absolute top-32 right-4">
          <button
            onClick={handleModal}
            className="btn btn-info m-auto bg-blue-500 text-white floating"
          >
            <IoAdd color="white" /> {t("add")}
          </button>
        </div>

        <div className="font-bold text-xl lg:text-2xl flex items-center justify-center mb-8">
          <h1 className="">Grade Structure</h1>
        </div>
        <SortableComponent rubrics={rubrics} setRubrics={setRubrics} />
        <div className="flex items-center justify-center">
          <button
            className={`btn btn-info bg-blue-500 text-white ${
              isDisabledUpdatedBtn ? "btn-disabled" : ""
            }`}
            onClick={() => handleUpdate([])}
          >
            {t("update")}
          </button>
        </div>
        {/* Add Modal */}
        <dialog className={`modal ${showModal ? "modal-open" : ""}`}>
          <div className="modal-box">
            <div className="flex flex-row justify-between">
              <p className="text-sm text-gray-500"></p>
              <button onClick={handleModal}>
                <IoMdClose />
              </button>
            </div>
            <AddGradeForm handleClick={handleAddRubric} />
          </div>
          <form method="dialog" className="modal-backdrop">
            <button onClick={handleModal}>close</button>
          </form>
        </dialog>
      </div>
    </div>
  );
};

export default GradePage;
