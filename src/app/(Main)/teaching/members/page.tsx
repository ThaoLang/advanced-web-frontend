import React from "react";
import { BsThreeDotsVertical } from "react-icons/bs";

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

export default function page() {
  return (
    <div className="w-3/4 lg:w-1/2 mx-auto">
      <div className="text-2xl lg:text-3xl text-blue-500">Teachers</div>
      <div className="divider divide-blue-500" />

      <ul className="menu bg-base-200 rounded-box mb-10">
        {teachers.map((teacher, index) => (
          <li>
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
                    <a>Email</a>
                  </li>
                  <li>
                    <a>Leave class</a>
                  </li>
                </ul>
              </div>
            </a>
          </li>
        ))}
      </ul>

      <div className="text-2xl lg:text-3xl text-yellow-400">Students</div>
      <div className="divider divide-yellow-400" />

      <ul className="menu bg-base-200 rounded-box my-10">
        {students.map((student, index) => (
          <li>
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
                    <a>Email</a>
                  </li>
                  <li>
                    <a>Remove</a>
                  </li>
                </ul>
              </div>
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}