"use client";
import React, { useEffect, useState } from "react";
import { BsThreeDotsVertical } from "react-icons/bs";
import { useTranslations } from "next-intl";
import { IoMdClose } from "react-icons/io";
import axios from "axios";
import { useParams } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { UserType } from "@/model/UserType";
import { ClassListType } from "@/model/ClassListType";

// const teachers = [
//   {
//     avatarUrl: "https://cdn-icons-png.flaticon.com/128/1077/1077114.png",
//     name: "Teacher 1",
//     email: "name@flaticon.com",
//   },
//   {
//     avatarUrl: "https://cdn-icons-png.flaticon.com/128/1077/1077114.png",
//     name: "Teacher 2",
//     email: "name@flaticon.com",
//   },
//   {
//     avatarUrl: "https://cdn-icons-png.flaticon.com/128/1077/1077114.png",
//     name: "Teacher 3",
//     email: "name@flaticon.com",
//   },
// ];

// const students = [
//   {
//     avatarUrl: "https://cdn-icons-png.flaticon.com/128/1077/1077114.png",
//     name: "Nguyen Minh Quang",
//     email: "nmq@flaticon.com",
//     studentId: "20127605",
//   },
//   {
//     avatarUrl: "https://cdn-icons-png.flaticon.com/128/1077/1077114.png",
//     name: "Lang Thao Thao",
//     email: "ltt@flaticon.com",
//     studentId: "20127629",
//   },
//   {
//     avatarUrl: "https://cdn-icons-png.flaticon.com/128/1077/1077114.png",
//     name: "Le Hoang Khanh Nguyen",
//     email: "lhkn@flaticon.com",
//     studentId: "20127679",
//   },
// ];

export default function MemberPage() {
  // copy
  const [isCopied, setIsCopied] = useState(false);
  const t = useTranslations("Tabs");

  const { classId } = useParams();
  const auth = useAuth();
  const savedUser = localStorage.getItem("user");
  let currentUser: UserType;
  if (savedUser) {
    currentUser = JSON.parse(savedUser);
  }
  const [teacherList, setTeacherList] = useState<ClassListType[]>([]);
  const [studentList, setStudentList] = useState<ClassListType[]>([]);
  const [hostUser, setHostUser] = useState<UserType>();

  const WriteToClipboard = async (text: string) => {
    const param = "clipboard-write" as PermissionName;
    const result = await navigator.permissions.query({ name: param });
    if (result.state === "granted") {
      console.log("Permission granted");
      await navigator.clipboard.writeText(text);
      return true;
    }
    console.log("Permission denied");
    return false;
  };

  const CopyText = (text: string) => {
    // Asynchronously call
    WriteToClipboard(text)
      .then((result) => {
        // If successful, update the isCopied state value
        if (result) {
          setIsCopied(true);
          setTimeout(() => {
            setIsCopied(false);
          }, 1500);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  // end copy

  const handleDelete = async (member_id: string, role: string = "Student") => {
    try {
      const response = await axios.delete(
        `${process.env.NEXT_PUBLIC_BACKEND_PREFIX}classes/${classId}/members/${member_id}`,
        {
          headers: {
            Authorization: `Bearer ${currentUser?.access_token}`,
          },
        }
      );
      if (response.status === 200) {
        console.log("Check response", response);
        if (role === "Student") {
          setStudentList(
            studentList.filter((student) => student.user_id != member_id)
          );
        } else {
          setTeacherList(
            teacherList.filter((teacher) => teacher.user_id != member_id)
          );
        }
      }
    } catch (error: any) {
      console.error("Failed to delete:", error);
    }
  };

  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    if (savedUser) {
      // Assuming UserType has a structure like { email: string }
      auth.login(JSON.parse(savedUser));
    }
  }, []);

  useEffect(() => {
    axios
      .get(
        `${process.env.NEXT_PUBLIC_BACKEND_PREFIX}classes/${classId}/members`,
        {
          headers: {
            Authorization: `Bearer ${currentUser?.access_token}`,
          },
        }
      )
      .then((response) => {
        console.log("Response", response.data);
        setHostUser(response.data.host_user);

        response.data.members.map((item: ClassListType) => {
          if (item.role === "Student") {
            setStudentList([...studentList, item]);
          } else {
            setTeacherList([...teacherList, item]);
          }
        });
      })
      .catch((error) => {
        console.error("Error fetching classes:", error);
      });
  }, []);

  return (
    // <div className="w-3/4 lg:w-1/2 mx-auto">
    //   <div className="text-2xl lg:text-3xl text-blue-600">{t("teachers")}</div>
    //   <div className="divider mt-1 lg:mt-3 divide-blue-500" />

    //   <ul className="menu bg-base-200 rounded-box mb-10">
    //     {teachers.map((teacher, index) => (
    //       <li key={index}>
    //         <a>
    //           <div tabIndex={0} className="btn btn-ghost btn-circle avatar">
    //             <div className="w-10 rounded-full">
    //               <img alt="avatar" src={teacher.avatarUrl} />
    //             </div>
    //           </div>
    //           {teacher.name}
    //           <span className="badge badge-sm">Email: {teacher.email}</span>

    //           <div className="dropdown">
    //             <label
    //               tabIndex={0}
    //               className="btn rounded-full cursor-pointer text-2xl"
    //             >
    //               <BsThreeDotsVertical />
    //             </label>
    //             <ul
    //               tabIndex={0}
    //               className="p-2 shadow menu dropdown-content z-[1] bg-base-100 rounded-box w-52"
    //             >
    //               <li>
    //                 <div onClick={() => CopyText(teacher.email)}>Email</div>
    //               </li>
    //               {/* <li>
    //                 <div>Leave class</div>
    //               </li> */}
    //             </ul>
    //           </div>
    //         </a>
    //       </li>
    //     ))}
    //   </ul>

    //   <div className="text-2xl lg:text-3xl text-yellow-500">
    //     {t("students")}
    //   </div>
    //   <div className="divider mt-1 lg:mt-3 divide-yellow-400" />

    //   <ul className="menu bg-base-200 rounded-box mb-10">
    //     {students.map((student, index) => (
    //       <li key={index}>
    //         <a>
    //           <div tabIndex={0} className="btn btn-ghost btn-circle avatar">
    //             <div className="w-10 rounded-full">
    //               <img alt="avatar" src={student.avatarUrl} />
    //             </div>
    //           </div>
    //           <div className="flex flex-col">
    //             {student.name}
    //             <div className="text-xs font-extralight">
    //               {student.studentId}
    //             </div>
    //           </div>
    //           <span className="badge badge-sm">Email: {student.email}</span>

    //           <div className="dropdown">
    //             <label
    //               tabIndex={0}
    //               className="btn rounded-full cursor-pointer text-2xl"
    //             >
    //               <BsThreeDotsVertical />
    //             </label>
    //             <ul
    //               tabIndex={0}
    //               className="p-2 shadow menu dropdown-content z-[1] bg-base-100 rounded-box w-52"
    //             >
    //               <li>
    //                 <div onClick={() => CopyText(student.email)}>Email</div>
    //               </li>
    //               <li>
    //                 <div>{t("leave_class")}</div>
    //               </li>
    //             </ul>
    //           </div>
    //         </a>
    //       </li>
    //     ))}
    //   </ul>
    //   {isCopied && (
    //     <div className="toast toast-bottom toast-end">
    //       <div className="alert alert-info">
    //         <span>{t("copied")}!</span>
    //       </div>
    //     </div>
    //   )}
    // </div>
    <div className="w-3/4 lg:w-1/2 mx-auto">
      <div className="flex flex-row justify-between">
        <div className="text-2xl lg:text-3xl text-blue-600">
          {t("teachers")}
        </div>
      </div>
      <div className="divider mt-1 lg:mt-3 divide-blue-500" />

      <ul className="menu bg-base-200 rounded-box mb-10">
        <li>
          <a>
            <div tabIndex={0} className="btn btn-ghost btn-circle avatar">
              <div className="w-10 rounded-full">
                <img alt="avatar" src={hostUser?.avatarUrl} />
              </div>
            </div>
            {hostUser?.username}
            <span className="badge badge-sm mr-16">
              Email: {hostUser?.email}
            </span>
          </a>
        </li>
        {teacherList.map((teacher, index) => (
          <li key={index}>
            <a>
              <div tabIndex={0} className="btn btn-ghost btn-circle avatar">
                <div className="w-10 rounded-full">
                  <img alt="avatar" src={teacher.avatar_url} />
                </div>
              </div>
              <div className="flex flex-col">{teacher.fullName}</div>
              <span className="badge badge-sm mr-16">
                Email: {teacher.email}
              </span>
            </a>
          </li>
        ))}
      </ul>

      <div className="flex flex-row justify-between">
        <div className="text-2xl lg:text-3xl text-yellow-500">
          {t("students")}
        </div>
      </div>
      <div className="divider mt-1 lg:mt-3 divide-yellow-400" />
      <ul className="menu bg-base-200 rounded-box mb-10">
        {studentList.length > 0 ? (
          studentList.map((student, index) => (
            <li key={index}>
              <a>
                <div tabIndex={0} className="btn btn-ghost btn-circle avatar">
                  <div className="w-10 rounded-full">
                    <img alt="avatar" src={student.avatar_url} />
                  </div>
                </div>
                <div className="flex flex-col">
                  {student.fullName}
                  <div className="text-xs font-extralight">
                    {student.student_id}
                  </div>
                </div>
                <span className="badge badge-sm mr-16">
                  Email: {student.email} thao {currentUser.studentId}
                </span>
                {currentUser.studentId &&
                  student.student_id === currentUser.studentId && (
                    <div className="dropdown">
                      <label
                        tabIndex={0}
                        className="btn rounded-full cursor-pointer text-2xl"
                      >
                        <BsThreeDotsVertical />
                      </label>
                      <ul
                        tabIndex={0}
                        className="p-2 shadow menu dropdown-content z-[1] bg-base-100 rounded-box w-52"
                      >
                        <li>
                          <div onClick={() => CopyText(student.email)}>
                            Email
                          </div>
                        </li>
                        <li>
                          <div onClick={() => handleDelete(student.user_id)}>
                            {t("leave_class_option")}
                          </div>
                        </li>
                      </ul>
                    </div>
                  )}
              </a>
            </li>
          ))
        ) : (
          <div className="text-center items-center justify-center p-4">
            {t("empty")}
          </div>
        )}
      </ul>
      {isCopied && (
        <div className="toast toast-bottom toast-end">
          <div className="alert alert-info">
            <span>{t("copied")}!</span>
          </div>
        </div>
      )}
    </div>
  );
}
