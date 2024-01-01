"use client";
import Banner from "@/component/classItem/detail/Banner";
import React, { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import Link from "next/link";
import { IoMdClose } from "react-icons/io";
import ImportExportModal from "@/component/classItem/detail/ImportExportModal";
import { useParams } from "next/navigation";
import { ClassType } from "@/model/ClassType";
import axios from "axios";
import { UserType } from "@/model/UserType";
import FileDownloadButton from "@/component/excel/FileDownloadButton";

// const classInfo = {
//   id: 1,
//   imageUrl:
//     "https://img.freepik.com/free-vector/gradient-international-day-education-illustration_23-2150011975.jpg?w=1060&t=st=1700731744~exp=1700732344~hmac=24b786f258aaa8285646cf1044c2e8ccc3e829ef7d3bee36e80df89a345c792f",
//   name: "My Class Name",
//   description: "This is the class",
//   inviteUrl: "inviteurl",
//   classCode: "classCode",
// };

// interface DetailClassProps{
//   classInfo:ClassType;
// }

export default function DetailClass() {
  const t = useTranslations("Tabs");
  const [isAvailableStudentList, setIsAvailable] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const { classId } = useParams();
  const [classInfo, setClassInfo] = useState<ClassType>();
  const [currentUser, setCurrentUser] = useState<UserType | null>(null);
  
  const handleModal = () => {
    console.log("Modal changed");
    setShowModal(!showModal);
  };

  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    if (savedUser) {
      setCurrentUser(JSON.parse(savedUser));
    }}, []);



  useEffect(() => {
    axios
      .get(`${process.env.NEXT_PUBLIC_BACKEND_PREFIX}classes/${classId}`, {
        headers: {
          Authorization: `Bearer ${currentUser?.access_token}`,
        },
      })
      .then((response) => {
        console.log("Response", response.data);
        setClassInfo(response.data);
        console.log("Response class", classInfo);
      })
      .catch((error) => {
        console.error("Error fetching classes:", error);
      });
  }, []);

  return (
    <>
      <div className="flex justify-between mx-10 lg:mx-20">
        {classInfo && (
          <Banner
            id={classInfo._id}
            imageUrl="https://img.freepik.com/free-vector/gradient-international-day-education-illustration_23-2150011975.jpg?w=1060&t=st=1700731744~exp=1700732344~hmac=24b786f258aaa8285646cf1044c2e8ccc3e829ef7d3bee36e80df89a345c792f"
            name={classInfo.name}
            description={classInfo.description}
            inviteUrl={classInfo.invite_url}
            classCode={classInfo.class_code}
          />
        )}
        <div className="hidden md:block bg-white rounded-xl shadow-md max-w-1/2 h-fit end-0 p-4">
          <div className="text-2xl lg:text-3xl text-blue-600">
            <b>{t("get_started")}:</b>
            <div className="form-control">
              <label className="label">
                <span className="label-text">{t("download_help")}</span>
                {/* <button className="mb-2 lg:w-80 lg:ml-5 btn btn-info bg-blue-500 text-white">
                    {t("download")}
                  </button> */}
                <FileDownloadButton
                  templateCategory="ClassList"
                  filename="ClassList_Template" />
              </label>
              <label className="label">
                <span className="label-text">{t("import_help")} </span>
                <input
                  type="checkbox"
                  checked={isAvailableStudentList}
                  onChange={() => setIsAvailable(!isAvailableStudentList)} //replace with real check in the future
                  className="checkbox checkbox-warning mx-2 cursor-default"
                />
                <button
                  className="mb-2 lg:w-80 lg:ml-5 btn btn-info bg-blue-500 text-white"
                  onClick={handleModal}
                >
                  {t("import")}
                </button>
              </label>
              {(isAvailableStudentList && (
                <label className="label">
                  <span className="label-text">{t("view_help_2")}</span>
                  <Link href="/teaching/grades">
                    <button className="mb-2 lg:w-80 lg:ml-5 btn btn-info bg-blue-500 text-white">
                      {t("view")}
                    </button>
                  </Link>
                </label>
              )) || (
                  <label className="label">
                    <span className="label-text mt-5">{t("view_help_1")}</span>
                  </label>
                )}
            </div>
          </div>
        </div>
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
          <ImportExportModal
            //
            setIsAvailable={setIsAvailable}
            closeModal={handleModal}
            data={undefined} />
        </div>
        <form method="dialog" className="modal-backdrop">
          <button onClick={handleModal}>close</button>
        </form>
      </dialog>
    </>
  );
}

