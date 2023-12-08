"use client";
import React, { useState } from "react";
import { BsThreeDotsVertical } from "react-icons/bs";
import { useTranslations } from "next-intl";

const teachers = [
  {
    avatarUrl: "https://cdn-icons-png.flaticon.com/128/1077/1077114.png",
    name: "Teacher 1",
    email: "name@flaticon.com",
  },
  {
    avatarUrl: "https://cdn-icons-png.flaticon.com/128/1077/1077114.png",
    name: "Teacher 2",
    email: "name@flaticon.com",
  },
  {
    avatarUrl: "https://cdn-icons-png.flaticon.com/128/1077/1077114.png",
    name: "Teacher 3",
    email: "name@flaticon.com",
  },
];

const students = [
  {
    avatarUrl: "https://cdn-icons-png.flaticon.com/128/1077/1077114.png",
    name: "Name",
    email: "name@flaticon.com",
  },
  {
    avatarUrl: "https://cdn-icons-png.flaticon.com/128/1077/1077114.png",
    name: "Name",
    email: "name@flaticon.com",
  },
  {
    avatarUrl: "https://cdn-icons-png.flaticon.com/128/1077/1077114.png",
    name: "Name",
    email: "name@flaticon.com",
  },
];


export default function MemberPage() {
  // copy
  const [isCopied, setIsCopied] = useState(false);
  const t = useTranslations("Tabs");

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

  return (
    <div className="w-3/4 lg:w-1/2 mx-auto">
      <div className="text-2xl lg:text-3xl text-blue-600">{t("teachers")}</div>
      <div className="divider mt-1 lg:mt-3 divide-blue-500" />

      <ul className="menu bg-base-200 rounded-box mb-10">
        {teachers.map((teacher, index) => (
          <li key={index}>
            <a>
              <div tabIndex={0} className="btn btn-ghost btn-circle avatar">
                <div className="w-10 rounded-full">
                  <img alt="avatar" src={teacher.avatarUrl} />
                </div>
              </div>
              {teacher.name}
              <span className="badge badge-sm">Email: {teacher.email}</span>

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
                    <div onClick={() => CopyText(teacher.email)}>Email</div>
                  </li>
                  {/* <li>
                    <div>Leave class</div>
                  </li> */}
                </ul>
              </div>
            </a>
          </li>
        ))}
      </ul>

      <div className="text-2xl lg:text-3xl text-yellow-500">
        {t("students")}
      </div>
      <div className="divider mt-1 lg:mt-3 divide-yellow-400" />

      <ul className="menu bg-base-200 rounded-box mb-10">
        {students.map((student, index) => (
          <li key={index}>
            <a>
              <div tabIndex={0} className="btn btn-ghost btn-circle avatar">
                <div className="w-10 rounded-full">
                  <img alt="avatar" src={student.avatarUrl} />
                </div>
              </div>
              {student.name}
              <span className="badge badge-sm">Email: {student.email}</span>

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
                    <div onClick={() => CopyText(student.email)}>Email</div>
                  </li>
                  <li>
                    <div>{t("leave_class")}</div>
                  </li>
                </ul>
              </div>
            </a>
          </li>
        ))}
      </ul>
      {isCopied && (
        <div className="toast toast-bottom toast-end">
          <div className="alert alert-info">
            <span>{"copied"}!</span>
          </div>
        </div>
      )}
    </div>
  );
}
