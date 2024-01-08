import {
  FaRegEye,
  FaUsers,
  FaArrowUp,
  FaChalkboard,
  FaChalkboardUser,
  FaPersonChalkboard,
} from "react-icons/fa6";

import { useState, useEffect } from 'react'
import { useAuth } from '@/context/AuthContext'
import { UserType } from '@/model/UserType'
import { ClassType } from '@/model/ClassType'
import axios from "axios";

export default function Dashboard() {
  const auth = useAuth();
  const [users, setUsers] = useState<UserType[] | null>(null);
  const [totalUsers, setTotalUsers] = useState<number>(0);
  const [totalClasses, setTotalClasses] = useState<number>(0);
  const [totalTeachers, setTotalTeachers] = useState<number>(0);
  const [totalStudents, setTotalStudents] = useState<number>(0);

  




  useEffect(() => {

    const fetchAccountsData = async () => {
      console.log('Fetching accounts: ', auth.admin)
      // let ResponseData: Array<UserType> = [];
      await axios
        .get(`${process.env.NEXT_PUBLIC_BACKEND_PREFIX}profile`, {
          headers: {
            Authorization: `Bearer ${auth.admin?.access_token}`,
          },
        })
        .then((response) => {
          console.log("Response", response.data);
          let ResponseData = response.data;
          setUsers(ResponseData);
          setTotalUsers(ResponseData.length);
          const _totalStudents = ResponseData.filter(
            (user: any) => user.student_id !== null && user.student_id !== undefined && user.student_id !== "").length;
          console.log(_totalStudents);
          setTotalStudents(_totalStudents);
          
        })
        .catch((error) => {
          console.error("Error fetching all users:", error);
        });
    };

    const fetchClassesData = async () => {
        let ResponseData: Array<ClassType> = [];
        await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_PREFIX}classes/teaching/exist`, {
          headers: {
            Authorization: `Bearer ${auth.admin?.access_token}`,
          },
        }).then((response) => {
          ResponseData = response.data;
          setTotalClasses(ResponseData.length);
          setTotalTeachers(ResponseData.length);
        }).catch((error) => {
        console.error("Error fetching all classes:", error);
        return [];
        });
      
    }

    fetchAccountsData();
    fetchClassesData();
    

  },[]);

  return (
    <div className="flex flex-col mx-auto h-[38.1rem] max-w-screen-2xl p-4 md:p-6 2xl:p-10 bg-slate-100">
      <div className="stats-vertical stats lg:stats-horizontal shadow">
        <div className="stat">
          <div className="stat-figure text-primary text-3xl">
            <FaUsers className="bg-slate-200 bg-transparent" />
          </div>
          <div className="stat-title">Total users</div>
          <div className="stat-value text-primary">{totalUsers}</div>
          {/* <div className="stat-desc flex items-center gap-1 text-sm font-medium text-lime-500">
            <span>3.50% </span>
            <FaArrowUp />
          </div> */}
        </div>
        <div className="stat">
          <div className="stat-figure text-primary text-3xl">
            <FaChalkboard className="bg-slate-200 bg-transparent" />
          </div>
          <div className="stat-title">Total classes</div>
          <div className="stat-value text-primary">{totalClasses}</div>
          {/* <div className="stat-desc flex items-center gap-1 text-sm font-medium text-lime-500">
            <span>3.50% </span>
            <FaArrowUp />
          </div> */}
        </div>
        <div className="stat">
          <div className="stat-figure text-primary text-3xl">
            <FaPersonChalkboard className="bg-slate-200 bg-transparent" />
          </div>
          <div className="stat-title">Total teachers</div>
          <div className="stat-value text-primary">{totalTeachers}</div>
          {/* <div className="stat-desc flex items-center gap-1 text-sm font-medium text-lime-500">
            <span>3.50% </span>
            <FaArrowUp />
          </div> */}
        </div>
        <div className="stat">
          <div className="stat-figure text-primary text-3xl">
            <FaChalkboardUser className="bg-slate-200 bg-transparent" />
          </div>
          <div className="stat-title">Total students</div>
          <div className="stat-value text-primary">{totalStudents}</div>
          {/* <div className="stat-desc flex items-center gap-1 text-sm font-medium text-lime-500">
            <span>3.50% </span>
            <FaArrowUp />
          </div> */}
        </div>
      </div>
      <div className="text-center">
        <h1 className="my-10 text-3xl font-extrabold text-gray-900 dark:text-white md:text-5xl lg:text-6xl">
          Welcome to the{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r to-emerald-600 from-sky-400">
            LightHub Dashboard
          </span>
          ! 🚀
        </h1>
        <p className="text-lg font-normal text-gray-500 lg:text-xl dark:text-gray-400">
          Great to have you here, Admin. Let&apos;s make things happen and keep
          everything in check! If you need any assistance, feel free to reach
          out. Happy managing!
        </p>
      </div>
    </div>
  );
}
