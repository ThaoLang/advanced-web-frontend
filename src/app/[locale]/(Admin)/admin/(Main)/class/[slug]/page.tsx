"use client";
import CSVExporter from "@/component/excel/CSVExporter";
import CSVImporter from "@/component/excel/CSVImporter";
import ClassListTable from "@/component/admin/(table)/ClassListTable";
import SearchBar from "@/component/admin/SearchBar";
import { ClassListType } from "@/model/ClassListType";
import filterAndSortArray from "@/utils/ArrayFilterUtils";
import Link from "next/link";
import { Suspense, useEffect, useRef, useState } from "react";
import axios from "axios";
import { useAuth } from "@/context/AuthContext";
import { StudentType } from "@/model/StudentType";
import { FaHome } from "react-icons/fa";
import { FaChalkboard } from "react-icons/fa6";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Page({
  params,
  searchParams,
}: {
  params: { slug: string };
  searchParams?: {
    query?: string;
    page?: string;
  };
}) {
  const [itemsPerPage, setItemsPerPage] = useState<number>(5);
  const auth = useAuth();
  const [classList, setClassList] = useState<Array<ClassListType> | null>(null);
  const [query, setQuery] = useState(searchParams?.query || "");
  const [currentPage, setCurrentPage] = useState(
    Number(searchParams?.page) || 1
  );
  const [paginatedResult, setPaginatedResult] = useState<any>(null);
  const [totalItems, setTotalItems] = useState(0);

  const classListTableHeaders = [
    { header_name: "Email", key: "email" },
    { header_name: "FullName", key: "fullName" },
    { header_name: "Role", key: "role" },
    { header_name: "StudentId", key: "student_id" },
  ];
  const roleSelectOptions: any[] = ["Teacher", "Student"];

  const [sortBy, setSortBy] = useState<string | null>(null);
  const [orderBy, setOrderBy] = useState<string>("asc");
  const [emailFilter, setEmailFilter] = useState<string | null>(null);
  const [nameFilter, setNameFilter] = useState<string | null>(null);
  const [roleFilter, setRoleFilter] = useState<string | null>(null);
  const [studentIdFilter, setStudentIdFilter] = useState<string | null>(null);

  const [emailSelectOptions, setEmailSelectOptions] = useState<Array<string>>(
    []
  );
  const [nameSelectOptions, setNameSelectOptions] = useState<Array<string>>([]);
  const [studentIdSelectOptions, setStudentIdSelectOptions] = useState<Array<string>>([]);

  // Create a ref to store the scroll position
  const scrollRef = useRef<number>(0);

  const handleSelectChange = (
    value: string,
    setter: React.Dispatch<React.SetStateAction<string | null>>
  ) => {
    setter(value === "null" ? null : value);
  };

  const handleRadioChange = (
    value: string,
    setter: React.Dispatch<React.SetStateAction<string>>
  ) => {
    setter(value);
  };

  const handleClearFilters = () => {
    setEmailFilter(null);
    setNameFilter(null);
    setRoleFilter(null);
    setStudentIdFilter(null);
  };

  const studentDataToClassListData = (studentData: Array<StudentType>, classId: string) => {
    return studentData ? studentData.map((item: StudentType) => ({
      class_id: classId,
      email: "",
      role: "Student",
      user_id: "",
      fullName: item.fullname ? item.fullname.toString() : "",
      student_id: item.studentId ? item.studentId.toString() : "",
    })) as Array<ClassListType> : [];
  }

  const classListDataToStudentData = (classListData: Array<ClassListType>) => {
    return classListData ? classListData.map((item: ClassListType) => ({
      fullname: item.fullName ? item.fullName.toString() : "",
      studentId: item.student_id ? item.student_id.toString() : "",
    })) as Array<StudentType> : [];
  }

  const fetchStudentListData = async (classId: string) => {
    return await axios
      .get(`${process.env.NEXT_PUBLIC_BACKEND_PREFIX}student/${classId}`, {
        headers: {
          Authorization: `Bearer ${auth.admin?.access_token}`,
        },
      })
      .then((response) => {
        console.log("Response", response.data[0].students);
        let ResponseData = response.data[0].students ? response.data[0].students : []
        return ResponseData;
      })
      .catch((error) => {
        // toast.error("Error fetching student list");
        return null;
      });
  };

  const fetchClassListData = async (
    classId: string
  ): Promise<Array<ClassListType> | null> => {
    return await axios
      .get(
        `${process.env.NEXT_PUBLIC_BACKEND_PREFIX}classes/${classId}/members`,
        {
          headers: {
            Authorization: `Bearer ${auth.admin?.access_token}`,
          },
        }
      )
      .then((response) => {
        let { host_user, members } = response.data;
        const hostAsClassList = {
          class_id: classId,
          fullName: host_user.username,
          role: "Teacher",
          email: host_user.email,
        } as ClassListType;

        members.unshift(hostAsClassList);
        let ResponseData = members as Array<ClassListType>;
        return ResponseData;
      })
      .catch((error) => {
        console.error("Error fetching ClassList Data:", error);
        return null;
      });
  };

  useEffect(() => {
    const _storage = localStorage.getItem("ITEMS_PER_PAGE");
    setItemsPerPage(JSON.parse(_storage!) as number);

    const fetchData = async () => {
      const classId = params.slug;
      const [classListData, studentListData] = await Promise.all([
        fetchClassListData(classId),
        fetchStudentListData(classId)
      ]);
      const convertedToClassList = studentDataToClassListData(studentListData, classId);
      // Remove items from convertedToClassList where studentId is present in classListData
      const filteredClassList = convertedToClassList.filter(item =>
        !classListData!.some(classItem => classItem.student_id === item.student_id));
      console.log(filteredClassList)
      setClassList([...classListData!, ...filteredClassList]);
    };
    fetchData().catch(console.error);
  }, []);

  useEffect(() => {
    if (classList) {
      // Dynamically generate nameSelectOptions based on unique names
      const uniqueEmails: string[] = Array.from(
        new Set(classList.map((items: ClassListType) => items.email))
      );
      setEmailSelectOptions(uniqueEmails);
      const uniqueNames: string[] = Array.from(
        new Set(classList.map((items: ClassListType) => items.fullName))
      );
      setNameSelectOptions(uniqueNames);
      const uniqueStudentIds: string[] = Array.from(
        new Set(classList.map((items: ClassListType) => items.student_id))
      );
      setStudentIdSelectOptions(uniqueStudentIds);
    }
  }, [classList]);

  useEffect(() => {
    // Save the current scroll position
    scrollRef.current = window.scrollY;

    const paginateClassListData = async () => {
      if (!classList) {
        // Handle the case where classList is still loading or null
        return { paginatedResult: [], totalItems: 0 };
      }

      const result = filterAndSortArray(classList, query, sortBy, orderBy, {
        email: emailFilter,
        fullName: nameFilter,
        role: roleFilter,
        student_id: studentIdFilter,
      });
      const totalItems = result.length;
      const startIndex = (currentPage - 1) * itemsPerPage;
      const endIndex = startIndex + itemsPerPage;
      const paginatedResult = result.slice(startIndex, endIndex);

      return { paginatedResult, totalItems };
    };

    const fetchData = async () => {
      await paginateClassListData().then((value) => {
        const { paginatedResult, totalItems } = value;
        setPaginatedResult(paginatedResult);
        setTotalItems(totalItems);
      });
    };

    fetchData().catch(console.error);
    // Restore the scroll position after the component updates
    window.scrollTo(0, scrollRef.current);
  }, [
    query,
    sortBy,
    orderBy,
    emailFilter,
    nameFilter,
    roleFilter,
    studentIdFilter,
    currentPage,
    classList,
  ]); // Run this effect when currentPage or classList changes

  const fetchDeleteClassList = async (classId: string, memberId: string) => {
    return await axios
      .delete(
        `${process.env.NEXT_PUBLIC_BACKEND_PREFIX}classes/${classId}/members/${memberId}`,
        {
          headers: {
            Authorization: `Bearer ${auth.admin?.access_token}`,
          },
        }
      )
      .then((response) => {
        toast.success(`${response.status}: Remove successfully!`);
        return true;
      })
      .catch((error) => {
        toast.error("Error while remove member: " + error.message);
        return false;
      });
  };

  const fetchUpdateClassList = async (
    classId: string,
    memberId: string,
    updateInfos: any
  ) => {
    await axios
      .put(
        `${process.env.NEXT_PUBLIC_BACKEND_PREFIX}classes/${classId}/members/${memberId}`,
        {
          fullName: updateInfos.fullName,
          student_id: updateInfos.student_id,
          role: updateInfos.role,
        },
        {
          headers: {
            Authorization: `Bearer ${auth.admin?.access_token}`,
          },
        }
      )
      .then((response) => {
        toast.success(`${response.status}: Update successfully!`);
      })
      .catch((error) => {
        toast.error("Error while update member");
      });
  };

  const deleteClassListHandler = async (currentItem: ClassListType) => {
    if (!classList) { 
      // Handle the case where classList is still loading or null
      return;
    }
    const updatedList = classList.filter((listItem: any) => {
      return JSON.stringify(listItem) !== JSON.stringify(currentItem);
    });
    const isDeleted = await fetchDeleteClassList(currentItem.class_id, currentItem.user_id);
    if (isDeleted) setClassList(updatedList);
  };

  const editClassListHandler = async (
    _fullname: any,
    _role: any,
    _studentId: any,
    currentItem: any
  ) => {
    if (!classList) {
      // Handle the case where classList is still loading or null
      return;
    }

    const updatedList = classList.map((listItem: ClassListType) => {
      if (currentItem.email === listItem.email) {
        return {
          ...listItem,
          fullName: _fullname,
          role: _role,
          student_id: _studentId,
        };
      }
      return listItem;
    });
    const updatedInfos = {
      fullName: _fullname,
      role: _role,
      student_id: _studentId,
    };

    await fetchUpdateClassList(
      currentItem.class_id,
      currentItem.user_id,
      updatedInfos
    ).catch(console.error);
    setClassList(updatedList);
  };

  const fetchSaveCSV = async (students: any, classId: string) => {
    await axios
      .post(
        `${process.env.NEXT_PUBLIC_BACKEND_PREFIX}student/${classId}/import`,
        {
          students: students,
        },
        {
          headers: {
            Authorization: `Bearer ${auth.admin?.access_token}`,
          },
        }
      )
      .then((response) => {
        toast.success(`${response.status}: Save CSV data successfully!`);
      })
      .catch((error) => {
        toast.error("Error saving CSV data: " + error.message);
      });
  };

  const handleFileUpload = async (data: any) => {
    // Handle the parsed CSV data
    const convertedData: StudentType[] = data.map((item: any) => ({
      fullname: item.fullname ? item.fullname.toString() : "",
      studentId: item.studentId ? item.studentId.toString() : "",
    }));
    const classId = params.slug;
    await fetchSaveCSV(convertedData, classId).catch(console.error);
    //Currently replacing
    const dataToClassList = studentDataToClassListData(convertedData, classId);
    const filteredClassList = dataToClassList.filter(item =>
      !classList!.some(classItem => classItem.student_id === item.student_id));
    setClassList([...classList!, ...filteredClassList]);
  };

  return (
    <div>
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
              <div className="flex flex-row items-center gap-2 font-bold">
                <FaChalkboard />
                <Link href="/admin/class">Classes</Link>
              </div>
            </li>
            <li>
              <Link href={`/admin/class/${params.slug}`}>
                <b>{params.slug}</b>
              </Link>
            </li>
          </ul>
        </div>

        <div className="flex flex-col lg:grid lg:grid-cols-3 mx-auto max-w-screen-2xl p-4 md:p-6 2xl:p-10s">
          <details className="lg:col-start-0 lg:col-span-1 collapse bg-base-200 collapse-arrow border">
            <summary className="collapse-title text-xl font-medium">
              Import/Export Data
            </summary>
            <div className="collapse-content">
              <div className="lg:col-start-0 lg:col-end-1">
                <CSVImporter onFileUpload={handleFileUpload} />
              </div>
              <div className="lg:col-start-2 lg:col-span-2">
                <CSVExporter data={classListDataToStudentData(classList!.slice(1))} filename="exported_data" />
              </div>
            </div>
          </details>
          <details className="lg:col-start-auto lg:col-span-1 collapse bg-base-200 collapse-arrow border">
            <summary className="collapse-title text-xl font-medium">
              Sort Data
            </summary>
            <div className="collapse-content">
              <div className="lg:col-start-0 lg:col-span-1">
                <label className="form-control w-full max-w-xs">
                  <div className="label">
                    <span className="label-text">Sort by</span>
                  </div>
                  <select
                    className="select select-bordered"
                    onChange={(e) =>
                      handleSelectChange(e.target.value, setSortBy)
                    }
                  >
                    {/* <option disabled selected>--Option--</option> */}
                    {classListTableHeaders.map((items, index) => {
                      return (
                        <option key={index} value={items.key}>
                          {items.header_name}
                        </option>
                      );
                    })}
                  </select>
                </label>
              </div>
              <div className="lg:mx-10 lg:col-start-1 lg:col-span-1">
                <div className="form-control">
                  <div className="label">
                    <span className="label-text">Order by</span>
                  </div>
                  <div className="flex lg:flex-col flex-row space-x-5 lg:space-y-3 lg:space-x-0">
                    <label className="flex flex-row gap-2 cursor-pointer">
                      <input
                        type="radio"
                        name="order-by"
                        className="radio radio-sm checked:bg-red-500"
                        checked={orderBy === "asc"}
                        onChange={() => handleRadioChange("asc", setOrderBy)}
                      />
                      <span className="label-text">Ascending</span>
                    </label>
                    <label className="flex flex-row gap-2 cursor-pointer">
                      <input
                        type="radio"
                        name="order-by"
                        className="radio radio-sm checked:bg-blue-500"
                        checked={orderBy === "desc"}
                        onChange={() => handleRadioChange("desc", setOrderBy)}
                      />
                      <span className="label-text">Descending</span>
                    </label>
                  </div>
                </div>
              </div>
            </div>
          </details>

          <div className="lg:col-start-auto lg:col-span-1 max-w-md">
            <SearchBar
              placeholder="Search anything...."
              setQuery={setQuery}
              currentPage={currentPage}
            />
          </div>
          <div className="lg:col-start-0 lg:col-span-4">
            <div className="form-control">
              <div className="label">
                <span className="label-text">Filters</span>
              </div>
              <div className="flex flex-row space-x-10">
                {/* <select className="select select-bordered w-full max-w-sm" value={classIdFilter || ''}
                                    onChange={(e) => handleSelectChange(e.target.value, setClassIdFilter)}>
                                    <option disabled selected value={''}>ClassId</option>
                                    {
                                        classIdSelectOptions.map((items, index) => {
                                            return (
                                                <option key={index} value={items}>{items}</option>
                                            )
                                        })
                                    }
                                </select> */}
                <select
                  className="select select-bordered w-full max-w-sm"
                  value={emailFilter || ""}
                  onChange={(e) =>
                    handleSelectChange(e.target.value, setEmailFilter)
                  }
                >
                  <option disabled selected value={""}>
                    Email
                  </option>
                  {emailSelectOptions.map((items, index) => {
                    return (
                      <option key={index} value={items}>
                        {items}
                      </option>
                    );
                  })}
                </select>
                <select
                  className="select select-bordered w-full max-w-sm"
                  value={nameFilter || ""}
                  onChange={(e) =>
                    handleSelectChange(e.target.value, setNameFilter)
                  }
                >
                  <option disabled selected value={""}>
                    Username
                  </option>
                  {nameSelectOptions.map((items, index) => {
                    return (
                      <option key={index} value={items}>
                        {items}
                      </option>
                    );
                  })}
                </select>
                <select
                  className="select select-bordered w-full max-w-sm"
                  value={roleFilter || ""}
                  onChange={(e) =>
                    handleSelectChange(e.target.value, setRoleFilter)
                  }
                >
                  <option disabled selected value={""}>
                    Role
                  </option>
                  {roleSelectOptions.map((items, index) => {
                    return (
                      <option key={index} value={items}>
                        {items}
                      </option>
                    );
                  })}
                </select>
                <select
                  className="select select-bordered w-full max-w-sm"
                  value={studentIdFilter || ""}
                  onChange={(e) =>
                    handleSelectChange(e.target.value, setStudentIdFilter)
                  }
                >
                  <option disabled selected value={""}>
                    StudentId
                  </option>
                  {studentIdSelectOptions.map((items, index) => {
                    return (
                      <option key={index} value={items?.toLowerCase()}>
                        {items}
                      </option>
                    );
                  })}
                </select>
                <button
                  className="btn btn-error text-white"
                  onClick={() => handleClearFilters()}
                >
                  Clear all filters
                </button>
              </div>
            </div>
          </div>
          <div className="lg:col-start-0 lg:col-span-4">
            <Suspense key={query + currentPage}>
              <ClassListTable
                paginatedResult={paginatedResult}
                totalItems={totalItems}
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
                itemsPerPage={itemsPerPage}
                deleteClassListItem={deleteClassListHandler}
                editClassListItem={editClassListHandler}
              />
            </Suspense>
          </div>
        </div>
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
        theme="light" />
    </div>
  );
}
