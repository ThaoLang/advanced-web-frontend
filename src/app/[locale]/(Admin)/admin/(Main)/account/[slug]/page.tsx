"use client";
import { useAccount } from "@/context/AccountContext";
// import { mapStudentId, unmapStudentId } from "@/utils/IdMappingUtils";
import Link from "next/link";
import React, { useState } from "react";
import { FaUser, FaAngleDown } from 'react-icons/fa6'

export default function Page({ params }: { params: { slug: string } }) {
  const context = useAccount();
  console.log('Account Context: ', context);
  const classes = [
    {
      id: 2,
      imageUrl:
        "https://static.vecteezy.com/system/resources/previews/011/005/174/original/creative-education-background-with-school-supplies-vector.jpg",
      name: "My Class Name",
      description: "This is the class",
      inviteUrl: "inviteurl",
      page: "enrolled",
    },
    {
      id: 2,
      imageUrl:
        "https://static.vecteezy.com/system/resources/previews/011/005/174/original/creative-education-background-with-school-supplies-vector.jpg",
      name: "My Class Name",
      description: "This is the class",
      inviteUrl: "inviteurl",
      page: "enrolled",
    },
    {
      id: 2,
      imageUrl:
        "https://static.vecteezy.com/system/resources/previews/011/005/174/original/creative-education-background-with-school-supplies-vector.jpg",
      name: "My Class Name",
      description: "This is the class",
      inviteUrl: "inviteurl",
      page: "enrolled",
    },
  ];
  
  const [isEditable, setIsEditable] = useState(false);
  const [username, setUsername] = useState(context.account?.username);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState(context.account?.email);
  const [role, setRole] = useState(context.account?.role);
  const roles = [
    {
      id: "1",
      name: "Admin"
    },
    {
      id: "2",
      name: "User"
    },

  ];
  const saveInformation = () => {

  }
  return (
    <React.Fragment>
      <div className="mx-auto max-w-screen-2xl min-h-screen p-4 md:p-6 2xl:p-10 bg-slate-100">
        <div className="text-xl breadcrumbs mx-auto max-w-screen-2xl mx-4 md:mx-6 2xl:mx-10 w-auto">
          <ul>
            <li><Link href="/admin/">Home</Link></li>
            <li><Link href="/admin/account">Account</Link></li>
            <li><Link href={`/admin/account/${params.slug}`}><b>{params.slug}</b></Link></li>
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
                  <input type="text" disabled={!isEditable}
                    value={username}
                    className="mt-3 w-full rounded-lg border-[1.5px]
                      disabled:bg-gray-100 
                      border-stroke bg-transparent py-3 px-5 
                      outline-none transition focus:border-primary active:border-primary 
                      disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark 
                      dark:bg-form-input dark:focus:border-primary" />

                  <label className="mt-5 block text-lg text-black dark:text-white">
                    Phone Number
                  </label>
                  <input type="text" disabled={!isEditable}
                    className="mt-3 w-full rounded-lg border-[1.5px] 
                      disabled:bg-gray-100 
                      border-stroke bg-transparent py-3 px-5 
                      outline-none transition focus:border-primary active:border-primary 
                      disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark 
                      dark:bg-form-input dark:focus:border-primary"
                    value={phoneNumber} />
                  <label className="mt-5 block text-lg text-black dark:text-white">
                    Email Address
                  </label>
                  <input type="text" disabled
                    placeholder="example@domain.com"
                    value={email}
                    className="mt-3 w-full rounded-lg border-[1.5px] 
                      disabled:bg-gray-100 
                      border-stroke bg-transparent py-3 px-5 
                      outline-none transition
                      disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark 
                      dark:bg-form-input dark:focus:border-primary" />

                </div>
                <label className="mt-5 block text-lg text-black dark:text-white">
                  Role
                </label>
                <div className="mt-3 relative z-20 w-48 bg-white dark:bg-form-input">
                  <span className="absolute top-1/2 left-4 z-30 -translate-y-1/2"><FaUser /></span>
                  <span className="absolute top-1/2 right-4 -translate-y-1/2"><FaAngleDown /></span>
                  <select className="relative z-20 w-full appearance-none rounded 
                border border-stroke bg-transparent py-3 px-12 outline-none transition 
                focus:border-primary active:border-primary dark:border-form-strokedark 
                dark:bg-form-input disabled:bg-gray-100"
                    disabled={!isEditable}
                    value={role?.id}>
                    {
                      roles.map((items, index) => (
                        <option key={index} value={items.id}>{items.name}</option>
                      ))
                    }
                  </select>
                </div>
                {isEditable ? (
                  <div className="flex justify-end gap-4.5 space-x-5">
                    <button className="flex justify-center rounded border border-stroke py-2 px-6 font-medium text-black hover:shadow-1 dark:border-strokedark dark:text-white"
                      onClick={() => setIsEditable(false)}>
                      Cancel
                    </button>
                    <button className="flex justify-center rounded bg-info py-2 px-6 font-medium text-gray hover:bg-opacity-90"
                      onClick={() => {
                        setIsEditable(false);
                        saveInformation();
                      }}>
                      Save
                    </button>
                  </div>
                ) :
                  (
                    <div className="flex justify-end gap-4.5 space-x-5">
                      <button className="flex justify-center rounded bg-info py-2 px-6 font-medium text-gray hover:bg-opacity-90"
                        onClick={() => setIsEditable(true)}>
                        Edit
                      </button>
                    </div>
                  )
                }
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
                      <img className="h-48 w-48 border rounded-full" 
                            src={context.account?.avatarUrl} alt="User" />
                  <div>
                  <span className="font-medium text-lg text-black dark:text-white">
                          {username}
                    </span>
                      {isEditable && (<>
                        
                        <span className="flex gap-2.5 justify-center">
                          <button className="font-medium text-sm hover:text-primary">
                            Delete
                          </button>
                          <button className="font-medium text-sm hover:text-primary">
                            Update
                          </button>
                        </span>
                      </>

                      )}
                    </div>
                  </div>

                  {isEditable ? (
                    <div className="flex justify-end gap-4.5 space-x-5">
                      <button className="flex justify-center rounded border border-stroke py-2 px-6 font-medium text-black hover:shadow-1 dark:border-strokedark dark:text-white"
                        onClick={() => setIsEditable(false)}>
                        Cancel
                      </button>
                      <button className="flex justify-center rounded bg-info py-2 px-6 font-medium text-gray hover:bg-opacity-90"
                        onClick={() => setIsEditable(false)}>
                        Save
                      </button>
                    </div>
                  ) :
                    (
                      <div className="flex justify-end gap-4.5 space-x-5">
                        <button className="flex justify-center rounded bg-info py-2 px-6 font-medium text-gray hover:bg-opacity-90"
                          onClick={() => setIsEditable(true)}>
                          Edit
                        </button>
                      </div>
                    )
                  }
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
                  {
                    classes.map((items, index) =>
                      <div key={index} className="mb-5 card card-side bg-base-100 shadow-lg">
                        {/* <figure><img src={items.imageUrl}></img></figure> */}
                         <div className="card-body">
                            <h2 className="card-title">{items.name}</h2>
                            <p>{items.description}</p>
                            {/* <p>
                              {
                                mapStudentId('HIS', context.account?.id as string)
                              }
                            </p>
                            <p>
                              {
                                unmapStudentId(mapStudentId('HIS', context.account?.id as string))
                              }
                            </p> */}
                        </div>
                      </div>
                    )
                  }
              </div>
            </div>

          </div>

        </div>
      </div>
    </React.Fragment>
  )
}