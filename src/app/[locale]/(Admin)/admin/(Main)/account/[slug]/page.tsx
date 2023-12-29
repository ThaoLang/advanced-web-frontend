"use client";
import { useAccount } from "@/context/AccountContext";
import { ClassListType } from "@/model/ClassListType";
import { ClassType } from "@/model/ClassType";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { FaUser, FaAngleDown } from 'react-icons/fa6'

//Assume loading state...
const templateClassDetails: Array<ClassListType> = [
  {
    class_id: 'class1',
    user_id: '1',
    role: 'teacher',
    fullname: 'Nguyễn Minh Quang',
    student_id: '',
  },
  {
    class_id: 'class2',
    user_id: '1',
    role: 'teacher',
    fullname: 'Nguyễn Minh Quang',
    student_id: '',
  },
  {
    class_id: 'class14',
    user_id: '1',
    role: 'teacher',
    fullname: 'Nguyễn Minh Quang',
    student_id: '',
  },
  {
    class_id: 'class2',
    user_id: '2',
    role: 'student',
    fullname: 'Lê Hoàng Khanh Nguyên',
    student_id: '20127679',
  },
  {
    class_id: 'class3',
    user_id: '3',
    role: 'teacher',
    fullname: 'Nguyễn Minh Quang',
    student_id: '',
  },
  {
    class_id: 'class4',
    user_id: '4',
    role: 'student',
    fullname: 'Nguyễn Minh Quang',
    student_id: '20127598',
  },
  {
    class_id: 'class4',
    user_id: '5',
    role: 'teacher',
    fullname: 'Nguyễn Minh Quang',
    student_id: '',
  },
  {
    class_id: 'class5',
    user_id: '5',
    role: 'teacher',
    fullname: 'Nguyễn Minh Quang',
    student_id: '',
  },
  {
    class_id: 'class6',
    user_id: '6',
    role: 'student',
    fullname: 'Nguyễn Minh Quang',
    student_id: '20127444',
  },
  {
    class_id: 'class6',
    user_id: '7',
    role: 'teacher',
    fullname: 'Nguyễn Minh Quang',
    student_id: '',
  },
  {
    class_id: 'class7',
    user_id: '7',
    role: 'teacher',
    fullname: 'Nguyễn Minh Quang',
    student_id: '',
  },
  {
    class_id: 'class8',
    user_id: '8',
    role: 'student',
    fullname: 'Nguyễn Minh Quang',
    student_id: '20127523',
  },
  {
    class_id: 'class9',
    user_id: '9',
    role: 'teacher',
    fullname: 'Nguyễn Minh Quang',
    student_id: '',
  },
  {
    class_id: 'class10',
    user_id: '10',
    role: 'student',
    fullname: 'Nguyễn Minh Quang',
    student_id: '20127528',
  },
  {
    class_id: 'class11',
    user_id: '11',
    role: 'teacher',
    fullname: 'Nguyễn Minh Quang',
    student_id: '',
  },
  {
    class_id: 'class12',
    user_id: '12',
    role: 'student',
    fullname: 'Bành Hảo Toàn',
    student_id: '20127646',
  },
  {
    class_id: 'class12',
    user_id: '7',
    role: 'teacher',
    fullname: 'Nguyễn Minh Quang',
    student_id: '',
  },
  {
    class_id: 'class13',
    user_id: '3',
    role: 'teacher',
    fullname: 'Nguyễn Minh Quang',
    student_id: '',
  },
  {
    class_id: 'class14',
    user_id: '4',
    role: 'student',
    fullname: 'Lăng Thảo Thảo',
    student_id: '20127679',
  },
  {
    class_id: 'class15',
    user_id: '5',
    role: 'teacher',
    fullname: 'Nguyễn Minh Quang',
    student_id: '',
  },
];

const templateClassList: Array<ClassType> = [
  {
    id: 'class1',
    host_id: '1',
    description: 'Introduction to Mathematics',
    name: 'Mathematics 101',
    class_code: 'MATH101',
    status: 'active',
    invite_url: 'https://example.com/invite/math101',
  },
  {
    id: 'class2',
    host_id: '1',
    description: 'Programming Fundamentals',
    name: 'Programming 101',
    class_code: 'CS101',
    status: 'active',
    invite_url: 'https://example.com/invite/cs101',
  },
  {
    id: 'class3',
    host_id: '3',
    description: 'Literature Appreciation',
    name: 'English Literature',
    class_code: 'ENG101',
    status: 'inactive',
    invite_url: 'https://example.com/invite/eng101',
  },
  {
    id: 'class4',
    host_id: '5',
    description: 'Chemistry Basics',
    name: 'Chemistry 101',
    class_code: 'CHEM101',
    status: 'active',
    invite_url: 'https://example.com/invite/chem101',
  },
  {
    id: 'class5',
    host_id: '5',
    description: 'History of Art',
    name: 'Art History',
    class_code: 'ART101',
    status: 'active',
    invite_url: 'https://example.com/invite/art101',
  },
  {
    id: 'class6',
    host_id: '7',
    description: 'Web Development Workshop',
    name: 'Web Dev Workshop',
    class_code: 'WEBDEV101',
    status: 'active',
    invite_url: 'https://example.com/invite/webdev101',
  },
  {
    id: 'class7',
    host_id: '7',
    description: 'Physics Principles',
    name: 'Physics 101',
    class_code: 'PHYSICS101',
    status: 'active',
    invite_url: 'https://example.com/invite/physics101',
  },
  {
    id: 'class8',
    host_id: '11',
    description: 'Introduction to Psychology',
    name: 'Psychology 101',
    class_code: 'PSYCH101',
    status: 'active',
    invite_url: 'https://example.com/invite/psych101',
  },
  {
    id: 'class9',
    host_id: '9',
    description: 'Computer Networks',
    name: 'Networking Basics',
    class_code: 'NETWORK101',
    status: 'active',
    invite_url: 'https://example.com/invite/network101',
  },
  {
    id: 'class10',
    host_id: '11',
    description: 'Human Anatomy',
    name: 'Anatomy 101',
    class_code: 'ANATOMY101',
    status: 'inactive',
    invite_url: 'https://example.com/invite/anatomy101',
  },
  {
    id: 'class11',
    host_id: '11',
    description: 'Environmental Science',
    name: 'Environmental Science',
    class_code: 'ENVSCI101',
    status: 'active',
    invite_url: 'https://example.com/invite/envsci101',
  },
  {
    id: 'class12',
    host_id: '7',
    description: 'Data Structures and Algorithms',
    name: 'DSA Workshop',
    class_code: 'DSA101',
    status: 'active',
    invite_url: 'https://example.com/invite/dsa101',
  },
  {
    id: 'class13',
    host_id: '3',
    description: 'Microeconomics Basics',
    name: 'Microeconomics 101',
    class_code: 'ECON101',
    status: 'inactive',
    invite_url: 'https://example.com/invite/econ101',
  },
  {
    id: 'class14',
    host_id: '1',
    description: 'Introduction to Sociology',
    name: 'Sociology 101',
    class_code: 'SOCIO101',
    status: 'active',
    invite_url: 'https://example.com/invite/socio101',
  },
  {
    id: 'class15',
    host_id: '5',
    description: 'Digital Marketing Strategies',
    name: 'Marketing 101',
    class_code: 'MARKETING101',
    status: 'active',
    invite_url: 'https://example.com/invite/marketing101',
  },
];

async function getClassListByUserId(user_id: string) {
  const matchingClasses: Array<ClassType> = [];

  templateClassDetails.forEach((items) => {
    if (items.user_id === user_id) {
      const classList = templateClassList.find(
        (classItem) => classItem.id === items.class_id
      );
      if (classList) {
        console.log(classList);
        matchingClasses.push(classList);
      }
    }
  });

  return matchingClasses;
}

async function getClassDetailsByUserId(user_id: string) {
  const matchingClassDetails: Array<ClassListType> = templateClassDetails.filter(
    (classListItem) => classListItem.user_id === user_id
  );

  return matchingClassDetails;
}


export default function Page({ params }: { params: { slug: string } }) {
  const context = useAccount();

  const [isEditable, setIsEditable] = useState(false);
  const [username, setUsername] = useState(context.account?.username);
  const [studentId, setStudentId] = useState('');
  const [email, setEmail] = useState(context.account?.email);
  const [role, setRole] = useState(context.account?.role);
  const roles = [
    {
      name: "Admin",
      key: "admin"
    },
    {
      name: "User",
      key: "user"
    },
  ];
  const [userClassList, setUserClassList] = useState(context.classList);

  useEffect(() => {
    const loadClassInfo = async () => {
      context.classList = await getClassListByUserId(context.account?.id ?? '');
      context.classDetails = await getClassDetailsByUserId(context.account?.id ?? '');
      setStudentId(context.classDetails.find(items => items.student_id !== '')?.student_id ?? '');
      setUserClassList(context.classList);
      console.log('Account Context: ', context);
    };

    loadClassInfo();
  }, [context]);
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
                    onChange={(e) => setUsername(e.target.value)}
                    value={username}
                    className="mt-3 w-full rounded-lg border-[1.5px]
                      disabled:bg-gray-100 
                      border-stroke bg-transparent py-3 px-5 
                      outline-none transition focus:border-primary active:border-primary 
                      disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark 
                      dark:bg-form-input dark:focus:border-primary" />

                  <label className="mt-5 block text-lg text-black dark:text-white">
                    StudentId
                  </label>
                  <input type="text" disabled={!isEditable}
                    onChange={(e) => setStudentId(e.target.value)}
                    className="mt-3 w-full rounded-lg border-[1.5px] 
                      disabled:bg-gray-100 
                      border-stroke bg-transparent py-3 px-5 
                      outline-none transition focus:border-primary active:border-primary 
                      disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark 
                      dark:bg-form-input dark:focus:border-primary"
                    value={studentId} />
                  <label className="mt-5 block text-lg text-black dark:text-white">
                    Email Address
                  </label>
                  <input type="text" disabled
                    placeholder="example@domain.com"
                    onChange={(e) => setEmail(e.target.value)}
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
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                    >
                    {
                      roles.map((items, index) => (
                        <option key={index} value={items.key}>{items.name}</option>
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
                    </div>
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
                {
                  userClassList?.map((items, index) =>
                    <div key={index} className="mb-5 card card-side bg-base-100 shadow-lg">
                      {/* <figure><img src={items.imageUrl}></img></figure> */}
                      <div className="card-body">
                        <h2 className="card-title">{items.name}</h2>
                        <p>{items.description}</p>
                        <p className="">Role: {context.classDetails?.at(0)?.role}</p>
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