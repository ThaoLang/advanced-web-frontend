"use client";
import { useAuth } from "@/context/AuthContext";
import { ClassListType } from "@/model/ClassListType";
import { ClassType } from "@/model/ClassType";
import { UserType } from "@/model/UserType";
import axios from "axios";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { FaHome } from "react-icons/fa";
import { FaUser, FaAngleDown } from "react-icons/fa6";
import { MdSupervisorAccount } from "react-icons/md";

export default function Page({ params }: { params: { slug: string } }) {
  const auth = useAuth();
  const [user, setUser] = useState<UserType | null>(null);
  const [userId, setUserId] = useState(params.slug);
  const [isEditable, setIsEditable] = useState(false);
  const [username, setUsername] = useState<string | null>(null);
  const [studentId, setStudentId] = useState<string | null>(null);
  const [email, setEmail] = useState<string | null>(null);
  const [role, setRole] = useState<string | null>(null);
  const roles = [
    {
      name: "Admin",
      key: "admin",
    },
    {
      name: "User",
      key: "user",
    },
  ];
  const [userClassList, setUserClassList] = useState<Array<ClassType> | null>(
    null
  );

  useEffect(() => {
    const fetchAccountDetails = async () => {
      await axios
        .get(`${process.env.NEXT_PUBLIC_BACKEND_PREFIX}profile/${userId}`, {
          headers: {
            Authorization: `Bearer ${auth.admin?.access_token}`,
          },
        })
        .then((response) => {
          // setInfoMessage(`${response.status}: User ${user.email} has been deleted!`);
          //     setTimeout(() => {
          //         setInfoMessage(null);
          // }, 2000);
          let ResponseData = response.data;
          setUser(ResponseData);
          setUsername(ResponseData.username);
          setStudentId(ResponseData.student_id);
          setRole(ResponseData.role);

          console.log("User details fetch!", ResponseData);
        })
        .catch((error) => {
          console.error("Error fetching user details:", error);
        });
    };

    fetchAccountDetails();
  }, []);

  useEffect(() => {
    const loadClassInfo = async () => {
      console.log("CURRENT USER: ", user);
      if (!user) return;

      await axios
        .get(`${process.env.NEXT_PUBLIC_BACKEND_PREFIX}classes`, {
          headers: {
            Authorization: `Bearer ${user.refresh_token}`,
          },
        })
        .then((response) => {
          // setInfoMessage(`${response.status}: User ${user.email} has been deleted!`);
          //     setTimeout(() => {
          //         setInfoMessage(null);
          // }, 2000);
          let ResponseData = response.data;
          console.log("All classes of this user: ", ResponseData);
          setUserClassList(ResponseData);
        })
        .catch((error) => {
          console.error("Error fetching delete user:", error);
        });
    };
    loadClassInfo();
  }, [user]);

  const handleCancel = () => {
    setUsername(user?.username as string);
    setStudentId(user?.studentId as string);
    setRole(user?.role as string);
    setIsEditable(false);
  };

  const handleEdit = () => {
    setIsEditable(true);
  };

  const saveInformation = async () => {
    await axios
      .put(
        `${process.env.NEXT_PUBLIC_BACKEND_PREFIX}profile/${user?._id}`,
        {
          username: username,
          studentId: studentId,
          role: role,
        },
        {
          headers: {
            Authorization: `Bearer ${auth.admin?.access_token}`,
          },
        }
      )
      .then((response) => {
        // setInfoMessage(`${response.status}: User ${user.email} has been deleted!`);
        //     setTimeout(() => {
        //         setInfoMessage(null);
        // }, 2000);

        setUser({
          ...user,
          username: username,
          studentId: studentId,
          role: role,
        } as UserType);

        setIsEditable(false);
      })
      .catch((error) => {
        console.error("Error while change user infos:", error);
      });
  };

  return (
    <React.Fragment>
      <div className="mx-auto max-w-screen-2xl min-h-screen p-4 md:p-6 2xl:p-10 bg-slate-100">
        <div className="text-xl breadcrumbs mx-auto max-w-screen-2xl mx-4 md:mx-6 2xl:mx-10 w-auto">
          <ul>
            <li>
              <div className="flex flex-row items-center gap-2">
                <FaHome />
                <Link href="/admin/">Home</Link>
              </div>
            </li>
            <li>
              <div className="flex flex-row items-center gap-2">
                <MdSupervisorAccount />
                <Link href="/admin/account">Account</Link>
              </div>
            </li>
            <li>
              <Link href={`/admin/account/${params.slug}`}>
                <b>{params.slug}</b>
              </Link>
            </li>
          </ul>
        </div>
        <div className="mt-10 mx-4 md:mx-6 2xl:mx-10 grid grid-cols-5 gap-8">
          <div className="col-span-5 xl:col-span-3">
            <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
              <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
                <h3 className="mx-5 text-xl font-medium text-black dark:text-white">
                  Account Information
                </h3>
              </div>
              <div className="flex flex-col gap-5.5 p-6.5 mx-5 my-5">
                <div>
                  <label className="block text-lg text-black dark:text-white">
                    Username
                  </label>
                  <input
                    type="text"
                    disabled={!isEditable}
                    onChange={(e) => setUsername(e.target.value)}
                    value={username as string}
                    className="mt-3 w-full rounded-lg border-[1.5px]
                      disabled:bg-gray-100 
                      border-stroke bg-transparent py-3 px-5 
                      outline-none transition focus:border-primary active:border-primary 
                      disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark 
                      dark:bg-form-input dark:focus:border-primary"
                  />

                  <label className="mt-5 block text-lg text-black dark:text-white">
                    StudentId
                  </label>
                  <input
                    type="text"
                    disabled={!isEditable}
                    onChange={(e) => setStudentId(e.target.value)}
                    className="mt-3 w-full rounded-lg border-[1.5px] 
                      disabled:bg-gray-100 
                      border-stroke bg-transparent py-3 px-5 
                      outline-none transition focus:border-primary active:border-primary 
                      disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark 
                      dark:bg-form-input dark:focus:border-primary"
                    value={studentId as string}
                  />
                  <label className="mt-5 block text-lg text-black dark:text-white">
                    Email Address
                  </label>
                  <input
                    type="text"
                    disabled
                    placeholder="example@domain.com"
                    onChange={(e) => setEmail(e.target.value)}
                    value={user?.email}
                    className="mt-3 w-full rounded-lg border-[1.5px] 
                      disabled:bg-gray-100 
                      border-stroke bg-transparent py-3 px-5 
                      outline-none transition
                      disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark 
                      dark:bg-form-input dark:focus:border-primary"
                  />
                </div>
                <label className="mt-5 block text-lg text-black dark:text-white">
                  Role
                </label>
                <div className="mt-3 relative z-20 w-48 bg-white dark:bg-form-input">
                  <span className="absolute top-1/2 left-4 z-30 -translate-y-1/2">
                    <FaUser />
                  </span>
                  <span className="absolute top-1/2 right-4 -translate-y-1/2">
                    <FaAngleDown />
                  </span>
                  <select
                    className="relative z-20 w-full appearance-none rounded 
                border border-stroke bg-transparent py-3 px-12 outline-none transition 
                focus:border-primary active:border-primary dark:border-form-strokedark 
                dark:bg-form-input disabled:bg-gray-100"
                    disabled={!isEditable}
                    value={role as string}
                    onChange={(e) => setRole(e.target.value)}
                  >
                    {roles.map((items, index) => (
                      <option key={index} value={items.key}>
                        {items.name}
                      </option>
                    ))}
                  </select>
                </div>
                {isEditable ? (
                  <div className="flex justify-end gap-4.5 space-x-5">
                    <button
                      className="flex justify-center rounded border border-stroke py-2 px-6 font-medium text-black hover:shadow-1 dark:border-strokedark dark:text-white"
                      onClick={handleCancel}
                    >
                      Cancel
                    </button>
                    <button
                      className="flex justify-center rounded bg-info py-2 px-6 font-medium text-gray hover:bg-opacity-90"
                      onClick={() => {
                        saveInformation();
                      }}
                    >
                      Save
                    </button>
                  </div>
                ) : (
                  <div className="flex justify-end gap-4.5 space-x-5">
                    <button
                      className="flex justify-center rounded bg-info py-2 px-6 font-medium text-gray hover:bg-opacity-90"
                      onClick={handleEdit}
                    >
                      Edit
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
          <div className="col-span-5 xl:col-span-2">
            <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
              <div className="border-b border-stroke py-4 px-7 dark:border-strokedark">
                <h3 className="font-medium text-xl text-black dark:text-white">
                  Account Photo
                </h3>
              </div>
              <div className="p-7">
                <div>
                  <div className="mb-4 flex flex-col items-center justify-center space-y-2">
                    <img
                      className="h-48 w-48 border rounded-full"
                      src={user?.avatarUrl}
                      alt="User"
                    />
                    <div>
                      <span className="font-medium text-lg text-black dark:text-white">
                        {user?.username}
                      </span>
                    </div>
                    {user?.status === "ban" ? (
                      <span className="badge bg-red-100 text-red-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded dark:bg-gray-700 dark:text-red-400 border border-red-400">
                        Ban
                      </span>
                    ) : (
                      <span className="badge bg-green-100 text-green-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded dark:bg-gray-700 dark:text-green-400 border border-green-400">
                        Normal
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-10 rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
              <div className="border-b border-stroke py-4 px-7 dark:border-strokedark">
                <h3 className="font-medium text-xl text-black dark:text-white">
                  Classes
                </h3>
              </div>
              <div className="p-7">
                {userClassList?.length === 0 ? (
                  <div className="lg:text-sm text-lg">
                    No classrooms have been assigned to this user yet.
                  </div>
                ) : (
                  userClassList?.map((items, index) => (
                    <div
                      key={index}
                      className={`mb-5 card card-side 
                        ${
                          items.type === "teaching"
                            ? `bg-yellow-200`
                            : `bg-green-200`
                        } 
                      shadow-lg`}
                    >
                      {/* <figure><img src={items.imageUrl}></img></figure> */}
                      <div className="card-body">
                        <h2 className="card-title">{items.name}</h2>
                        <p>{items.description}</p>
                        <p>Status: {items.type}</p>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}
