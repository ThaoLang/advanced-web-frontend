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
import { ToastContainer, toast } from "react-toastify";
import { proxy } from "valtio";
import { UserType } from "@/model/UserType";
import { GradeType } from "@/model/GradeType";
import FileDownloadButton from "@/component/excel/FileDownloadButton";
import ImportModal from "@/component/classItem/grade/ImportModal";
import ExportModal from "@/component/classItem/grade/ExportModal";

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
    // updatedRubrics.forEach((rubric, index) => {
    //   rubric.order = index;
    // });

    //props.setRubrics(updatedRubrics);

    const updatedRubricsWithOrder = updatedRubrics.map((rubric, index) => ({
      ...rubric,
      order: index,
    }));

    props.setRubrics(updatedRubricsWithOrder);
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
  const getStudents = async () => {
    return [
      {
        fullname: "Nguyễn Minh Quang",
        studentId: "20127605",
        email: "",
      },
      {
        fullname: "Lăng Thảo Thảo",
        studentId: "20127629",
        email: "",
      },
      {
        fullname: "Lê Hoàng Khanh Nguyên",
        studentId: "20127679",
        email: "lhkn@gmail.com",
      },
      {
        fullname: "Lê Hoài Phương",
        studentId: "20127598",
        email: "",
      },
      {
        fullname: "Hoàng Hữu Minh An",
        studentId: "20127102",
        email: "",
      },
      {
        fullname: "Huỳnh Minh Chiến",
        studentId: "20127444",
        email: "20127444@student.hcmus.edu.vn",
      },
    ];
  };

  const getGrade = async () => {
    return [
      {
        studentId: "20127605",
        rubricId: "1",
        grade: "10",
      },
      {
        studentId: "20127605",
        rubricId: "2",
        grade: "10.2",
      },
      {
        studentId: "20127605",
        rubricId: "3",
        grade: "10",
      },
      {
        studentId: "20127605",
        rubricId: "4",
        grade: "10.4",
      },
      {
        studentId: "20127605",
        rubricId: "5",
        grade: "10",
      },
      {
        studentId: "20127605",
        rubricId: "6",
        grade: "10",
      },
      //
      {
        studentId: "20127629",
        rubricId: "1",
        grade: "10",
      },
      {
        studentId: "20127629",
        rubricId: "2",
        grade: "10",
      },
      {
        studentId: "20127629",
        rubricId: "3",
        grade: "10",
      },
      {
        studentId: "20127629",
        rubricId: "4",
        grade: "10",
      },
      {
        studentId: "20127629",
        rubricId: "5",
        grade: "10",
      },
      {
        studentId: "20127629",
        rubricId: "6",
        grade: "10",
      },
      //
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

  interface StudentProps {
    fullname: string;
    studentId: string;
    email: string;
  }

  const [students, setStudents] = useState<StudentProps[]>();
  const [grade, setGrade] = useState<GradeType[]>([]);
  const [gradeProxy, setGradeProxy] = useState<GradeType[]>([]);

  const getMyStudentGrade = (studentId: string, rubricId: string) => {
    for (let item of grade) {
      if (item.studentId == studentId && item.rubricId == rubricId) {
        return item.grade;
      }
    }
    return "";
  };

  const getProxyStudentGrade = (studentId: string, rubricId: string) => {
    for (let item of gradeProxy) {
      if (item.studentId == studentId && item.rubricId == rubricId) {
        return item.grade;
      }
    }
    return "";
  };

  const isGrade = (grade: string) => {
    const regex = /^(\d*\.)?\d+$/;
    if (regex.test(grade)) {
      let temp = Number.parseFloat(grade);
      return temp >= 0 && temp <= 10;
    } else return regex.test(grade);
  };

  // const [newGrade, setNewGrade] = useState<
  //   { studentId: string; rubricId: string }[]
  // >([]);
  // const [invalidGrade, setInvalidGrade] = useState<
  //   { studentId: string; rubricId: string }[]
  // >([]);

  const [newGrade, setNewGrade] = useState<string[]>([]);
  const [invalidGrade, setInvalidGrade] = useState<string[]>([]);

  const checkMyStudentGrade = (
    value: string,
    studentId: string,
    rubricId: string
  ) => {
    // let temp = { studentId, rubricId };
    if (!isGrade(value)) {
      toast.warn(t("invalid_grade"));
      if (!invalidGrade.includes(studentId)) {
        setInvalidGrade([...invalidGrade, studentId]);
      }

      setNewGrade(newGrade.filter((item) => item != studentId));
    } else {
      let grade = getMyStudentGrade(studentId, rubricId);
      if (value == grade) {
        setNewGrade(newGrade.filter((item) => item != studentId));
      } else if (!newGrade.includes(studentId)) {
        setNewGrade([...newGrade, studentId]);
      }

      setInvalidGrade(invalidGrade.filter((item) => item != studentId));
    }
  };

  const setMyStudentGrade = (
    studentId: string,
    rubricId: string,
    value: string
  ) => {
    for (let item of gradeProxy) {
      if (item.studentId == studentId && item.rubricId == rubricId) {
        item.grade = value;
        setGradeProxy(gradeProxy);
        return;
      }
    }
  };

  const handleResetBtn = () => {
    setGradeProxy([]);
    async () => {
      let gradeData = await getGrade();
      setGradeProxy(proxy<GradeType[]>([...gradeData]));
    };
    setNewGrade([]);
    setInvalidGrade([]);
  };

  const t = useTranslations("GradePage");

  const [showModal, setShowModal] = useState(false);
  const [showImportModal, setShowImportModal] = useState(false);
  const [showExportModal, setShowExportModal] = useState(false);
  const [rubrics, setRubrics] = useState<RubricType[]>([]);
  const [isDisabledUpdatedBtn, setIsDisabledUpdatedBtn] = useState(true);
  const auth = useAuth();
  const savedUser = localStorage.getItem("user");
  let currentUser: UserType;
  if (savedUser) {
    currentUser = JSON.parse(savedUser);
  }
  const { classId } = useParams();
  const handleModal = () => {
    console.log("Modal changed");
    setShowModal(!showModal);
  };

  
  const handleImportModal = () => {
    console.log("Modal changed");
    setShowImportModal(!showImportModal);
  };

  const handleExportModal = () => {
    console.log("Modal changed");
    setShowExportModal(!showExportModal);
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
            Authorization: `Bearer ${currentUser?.access_token}`,
          },
        }
      );
      if (response.status === 201) {
        const createdRubric: RubricType = response.data;

        setRubrics([...rubrics, createdRubric]);
      }
    } catch (error: any) {
      console.error("Failed to create new rubric:", error);
    }
    setShowModal(false);
  };

  const handleUpdate = async () => {
    try {
      const response = await axios.put(
        `${process.env.NEXT_PUBLIC_BACKEND_PREFIX}rubric/update}`,
        {
          rubrics: rubrics,
        },
        {
          headers: {
            Authorization: `Bearer ${currentUser?.access_token}`,
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
    console.log("User", currentUser);
    axios
      .get(`${process.env.NEXT_PUBLIC_BACKEND_PREFIX}rubric/${classId}`, {
        headers: {
          Authorization: `Bearer ${currentUser?.access_token}`,
        },
      })
      .then((response) => {
        console.log("Response", response);
        setRubrics(response.data);
      })
      .catch((error) => {
        console.error("Error fetching rubrics:", error);
      });

    // TODO: update request
    (async () => {
      const students = await getStudents();
      let gradeData = await getGrade();

      setStudents(students);
      setGrade(gradeData);
      setGradeProxy(proxy<GradeType[]>([...gradeData]));
    })();
  }, []);

  useEffect(() => {
    console.log("List Rubrics:", rubrics);
    if (isDisabledUpdatedBtn) {
      setIsDisabledUpdatedBtn(!isDisabledUpdatedBtn);
    }
  }, [rubrics]);

  return (
    <div className="grid grid-cols-6 gap-10 mx-10">
      <div className="col-span-6 lg:col-span-4">
        <div className="flex items-center justify-center gap-4 mb-2">
          {/* <button
            className="hidden md:block btn btn-info bg-blue-500 text-white text-xs"
            // onClick={() => {}}
          > */}
          {/* </button> */}

          {t("download_help")}
          <FileDownloadButton
            templateCategory="Grade"
            filename="Grade_Template" />
          <button
            className="btn btn-info bg-blue-500 text-white text-xs"
          onClick={handleImportModal}
          >
            {t("import")}
          </button>
          {grade && (
            <button
              className={`btn btn-info bg-blue-500 text-white text-xs md:text-md lg:text-md
            ${grade.length == 0 ? "btn-disabled" : ""}
            `}
            onClick={handleExportModal}
            >
              {t("export")}
            </button>
          )}
        </div>
        <div className="max-h-[450px] overflow-auto bg-white rounded">
          {/* table */}
          <table className="table table-sm table-pin-rows table-pin-cols z-0">
            {/* head */}
            <thead>
              <tr>
                <th>{t("number")}</th>
                <td>{t("fullname")}</td>
                <td>{t("student_id")}</td>
                <td>{t("email")}</td>
                {rubrics.length > 0 &&
                  rubrics.map((item, index) => {
                    return <td key={index}>{item.gradeName}</td>;
                  })}
                <th>{t("finalized_score")}</th>
              </tr>
            </thead>
            <tbody>
              {/* rows */}
              {students &&
                students.length > 0 &&
                students.map((student, index) => {
                  return (
                    <tr>
                      <th>
                        <div className="text-sm opacity-50">{index + 1}</div>
                      </th>
                      <td>{student.fullname}</td>
                      <td>{student.studentId}</td>
                      <td>
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
                      </td>

                      {rubrics.length > 0 &&
                        rubrics.map((item, index) => {
                          return (
                            <td key={index}>
                              <input
                                type="text"
                                className={`text-md font-light h-10 p-2
                                ${
                                  invalidGrade.includes(student.studentId)
                                    ? "border-red-500 text-red-500"
                                    : ""
                                }
                                ${
                                  newGrade.includes(student.studentId)
                                    ? "border-teal-500 text-teal-500"
                                    : ""
                                }
                                `}
                                placeholder={item.gradeName}
                                defaultValue={getProxyStudentGrade(
                                  student.studentId,
                                  item._id
                                )}
                                onChange={(e) => {
                                  setMyStudentGrade(
                                    student.studentId,
                                    item._id,
                                    e.target.value
                                  );
                                }}
                                onBlur={(e) =>
                                  checkMyStudentGrade(
                                    e.target.value,
                                    student.studentId,
                                    item._id
                                  )
                                }
                                maxLength={6}
                              />
                            </td>
                          );
                        })}
                      <th>
                        <div className="text-sm opacity-50 flex justify-center align-middle">
                          {index + 1}
                        </div>
                      </th>
                    </tr>
                  );
                })}
            </tbody>

            {/* foot */}
            {/* <tfoot>
              <tr>
                <th>{t("number")}</th>
                <td>{t("fullname")}</td>
                <td>{t("student_id")}</td>
                <td>{t("email")}</td>
                {rubrics.length > 0 &&
                  rubrics.map((item, index) => {
                    return <td key={index}>{item.gradeName}</td>;
                  })}
              </tr>
            </tfoot> */}
          </table>
        </div>
        <div className="flex items-center justify-center gap-4 mb-2">
          <button
            className={`btn btn-info bg-blue-500 text-white text-xs ${
              newGrade.length == 0 ? "btn-disabled" : ""
            }`}
            // onClick={() => {}}
          >
            {t("update")}
          </button>
          <button
            className={`btn btn-info bg-blue-500 text-white text-xs ${
              invalidGrade.length == 0 && newGrade.length == 0
                ? "btn-disabled"
                : ""
            }`}
            onClick={() => handleResetBtn()}
          >
            {t("cancel_change")}
          </button>
          {grade && (
            <button
              className={`btn btn-info bg-blue-500 text-white text-xs md:text-md lg:text-md
            ${grade.length == 0 ? "btn-disabled" : ""}
            `}
              // onClick={() => {}}
            >
              {t("finalize_score")}
            </button>
          )}
        </div>
      </div>

      <div className="hidden lg:block lg:col-span-2">
        <div className="absolute top-32 right-4">
          <button
            onClick={handleModal}
            className="btn btn-info m-auto bg-blue-500 text-white floating"
          >
            <IoAdd color="white" /> {t("add")}
          </button>
        </div>

        <div className="font-bold text-xl lg:text-2xl flex items-center justify-center mb-8">
          <h1 className="">{t("grade_structure")}</h1>
        </div>
        <SortableComponent rubrics={rubrics} setRubrics={setRubrics} />
        <div className="flex items-center justify-center">
          <button
            className={`btn btn-info bg-blue-500 text-white ${
              isDisabledUpdatedBtn ? "btn-disabled" : ""
            }`}
            onClick={() => handleUpdate()}
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
         {/* Import Modal */}
         <dialog className={`modal ${showImportModal ? "modal-open" : ""}`}>
          <div className="modal-box">
            <div className="flex flex-row justify-between">
              <p className="text-sm text-gray-500">
                {/* Press X or click outside to close */}
              </p>
              <button onClick={handleImportModal}>
                <IoMdClose />
              </button>
            </div>
            <ImportModal
              //
              closeModal={handleImportModal}
              data={undefined} />
          </div>
          <form method="dialog" className="modal-backdrop">
            <button onClick={handleImportModal}>close</button>
          </form>
        </dialog>
        {/* Export Modal */}
        <dialog className={`modal ${showExportModal ? "modal-open" : ""}`}>
          <div className="modal-box">
            <div className="flex flex-row justify-between">
              <p className="text-sm text-gray-500">
                {/* Press X or click outside to close */}
              </p>
              <button onClick={handleExportModal}>
                <IoMdClose />
              </button>
            </div>
            <ExportModal
              //
              closeModal={handleExportModal}
              data={undefined} />
          </div>
          <form method="dialog" className="modal-backdrop">
            <button onClick={handleExportModal}>close</button>
          </form>
        </dialog>
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
};

export default GradePage;
