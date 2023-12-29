"use client";
import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import Link from "next/link";
import ClassTable from "@/component/admin/(table)/ClassTable";
import SearchBar from "@/component/admin/SearchBar";
import { Suspense } from "react";
import { ClassType } from "@/model/ClassType";
import { UserType } from "@/model/UserType";
import filterAndSortArray from "@/utils/ArrayFilterUtils";
import LoadingIndicator from "@/component/admin/LoadingIndicator";

const ITEMS_PER_PAGE = 5;

export default function Classes({
  searchParams,
}: {
  searchParams?: {
    query?: string;
    page?: string;
  };
}) {
  const [classes, setClasses] = useState<any>(null);
  const [query, setQuery] = useState(searchParams?.query || "");
  const [currentPage, setCurrentPage] = useState(
    Number(searchParams?.page) || 1
  );
  const [paginatedResult, setPaginatedResult] = useState<Array<any>>([]);
  const [totalItems, setTotalItems] = useState(0);

  const [idSelectOptions, setIdSelectOptions] = useState<Array<string>>([]);
  const [nameSelectOptions, setNameSelectOptions] = useState<Array<string>>([]);
  const [hostNameSelectOptions, setHostNameSelectOptions] = useState<
    Array<string>
  >([]);
  const classroomTableHeaders = [
    { header_name: "ID", key: "id" },
    { header_name: "Name", key: "name" },
    { header_name: "Host name", key: "host_username" },
    { header_name: "Description", key: "description" },
    { header_name: "Status", key: "status" },
  ];
  const statusSelectOptions: any[] = ["Active", "Inactive"];

  const [sortBy, setSortBy] = useState<string | null>("id");
  const [orderBy, setOrderBy] = useState<string>("asc");
  const [idFilter, setIdFilter] = useState<string | null>(null);
  const [nameFilter, setNameFilter] = useState<string | null>(null);
  const [hostNameFilter, setHostNameFilter] = useState<string | null>(null);
  const [statusFilter, setStatusFilter] = useState<string | null>(null);

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
    setIdFilter(null);
    setNameFilter(null);
    setHostNameFilter(null);
    setStatusFilter(null);
  };

  useEffect(() => {
    console.log("render page.tsx");

    const fetchData = async () => {
      const classData = await fetchClassesData();
      setClasses(classData);
      // Dynamically generate nameSelectOptions based on unique names
      const uniqueIds = Array.from(
        new Set(classData.map((classroom) => classroom.id))
      );
      setIdSelectOptions(uniqueIds);
      const uniqueNames = Array.from(
        new Set(classData.map((classroom) => classroom.name))
      );
      setNameSelectOptions(uniqueNames);
      const uniqueHostNames = Array.from(
        new Set(classData.map((classroom) => classroom.host_username))
      );
      setHostNameSelectOptions(uniqueHostNames);
    };
    fetchData().catch(console.error);
  }, []);

  useEffect(() => {
    // Save the current scroll position
    scrollRef.current = window.scrollY;

    const paginateClassesData = async () => {
      if (!classes) {
        // Handle the case where classes is still loading or null
        return { paginatedResult: [], totalItems: 0 };
      }

      const result = filterAndSortArray(classes, query, sortBy, orderBy, {
        id: idFilter,
        name: nameFilter,
        host_username: hostNameFilter,
        status: statusFilter,
      });
      const totalItems = result.length;
      const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
      const endIndex = startIndex + ITEMS_PER_PAGE;
      const paginatedResult = result.slice(startIndex, endIndex);

      return { paginatedResult, totalItems };
    };
    const fetchData = async () => {
      await paginateClassesData().then((value) => {
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
    nameFilter,
    hostNameFilter,
    idFilter,
    statusFilter,
    currentPage,
    classes,
  ]);

  const fetchClassesData = async () => {
    const templateClasses: Array<ClassType> = [
      {
        id: "class1",
        host_id: "1",
        description: "Introduction to Mathematics",
        name: "Mathematics 101",
        class_code: "MATH101",
        status: "active",
        invite_url: "https://example.com/invite/math101",
      },
      {
        id: "class2",
        host_id: "1",
        description: "Programming Fundamentals",
        name: "Programming 101",
        class_code: "CS101",
        status: "active",
        invite_url: "https://example.com/invite/cs101",
      },
      {
        id: "class3",
        host_id: "3",
        description: "Literature Appreciation",
        name: "English Literature",
        class_code: "ENG101",
        status: "inactive",
        invite_url: "https://example.com/invite/eng101",
      },
      {
        id: "class4",
        host_id: "5",
        description: "Chemistry Basics",
        name: "Chemistry 101",
        class_code: "CHEM101",
        status: "active",
        invite_url: "https://example.com/invite/chem101",
      },
      {
        id: "class5",
        host_id: "5",
        description: "History of Art",
        name: "Art History",
        class_code: "ART101",
        status: "active",
        invite_url: "https://example.com/invite/art101",
      },
      {
        id: "class6",
        host_id: "7",
        description: "Web Development Workshop",
        name: "Web Dev Workshop",
        class_code: "WEBDEV101",
        status: "active",
        invite_url: "https://example.com/invite/webdev101",
      },
      {
        id: "class7",
        host_id: "7",
        description: "Physics Principles",
        name: "Physics 101",
        class_code: "PHYSICS101",
        status: "active",
        invite_url: "https://example.com/invite/physics101",
      },
      {
        id: "class8",
        host_id: "11",
        description: "Introduction to Psychology",
        name: "Psychology 101",
        class_code: "PSYCH101",
        status: "active",
        invite_url: "https://example.com/invite/psych101",
      },
      {
        id: "class9",
        host_id: "9",
        description: "Computer Networks",
        name: "Networking Basics",
        class_code: "NETWORK101",
        status: "active",
        invite_url: "https://example.com/invite/network101",
      },
      {
        id: "class10",
        host_id: "11",
        description: "Human Anatomy",
        name: "Anatomy 101",
        class_code: "ANATOMY101",
        status: "inactive",
        invite_url: "https://example.com/invite/anatomy101",
      },
      {
        id: "class11",
        host_id: "11",
        description: "Environmental Science",
        name: "Environmental Science",
        class_code: "ENVSCI101",
        status: "active",
        invite_url: "https://example.com/invite/envsci101",
      },
      {
        id: "class12",
        host_id: "7",
        description: "Data Structures and Algorithms",
        name: "DSA Workshop",
        class_code: "DSA101",
        status: "active",
        invite_url: "https://example.com/invite/dsa101",
      },
      {
        id: "class13",
        host_id: "3",
        description: "Microeconomics Basics",
        name: "Microeconomics 101",
        class_code: "ECON101",
        status: "inactive",
        invite_url: "https://example.com/invite/econ101",
      },
      {
        id: "class14",
        host_id: "1",
        description: "Introduction to Sociology",
        name: "Sociology 101",
        class_code: "SOCIO101",
        status: "active",
        invite_url: "https://example.com/invite/socio101",
      },
      {
        id: "class15",
        host_id: "5",
        description: "Digital Marketing Strategies",
        name: "Marketing 101",
        class_code: "MARKETING101",
        status: "active",
        invite_url: "https://example.com/invite/marketing101",
      },
    ];
    const templateAccounts: Array<UserType> = [
      {
        id: "1",
        studentId: "",
        username: "Nguyễn Minh Quang",
        email: "20127605@student.hcmus.edu.vn",
        avatarUrl: "https://i.pravatar.cc/150?u=1",
        role: "user",
        status: "ban",
        refresh_token: "",
        access_token: "",
      },
      {
        id: "2",
        studentId: "",
        username: "Lê Hoàng Khanh Nguyên",
        email: "20127679@student.hcmus.edu.vn",
        avatarUrl: "https://i.pravatar.cc/150?u=2",
        role: "user",
        status: "ban",
        refresh_token: "",
        access_token: "",
      },
      {
        id: "3",
        studentId: "",
        username: "Lăng Thảo Thảo",
        email: "20127629@student.hcmus.edu.vn",
        avatarUrl: "https://i.pravatar.cc/150?u=3",
        role: "admin",
        status: "normal",
        refresh_token: "",
        access_token: "",
      },
      {
        id: "4",
        studentId: "",
        username: "Lê Hoài Phương",
        email: "20127598@student.hcmus.edu.vn",
        avatarUrl: "https://i.pravatar.cc/150?u=4",
        role: "admin",
        status: "normal",
        refresh_token: "",
        access_token: "",
      },
      {
        id: "5",
        studentId: "",
        username: "Hoàng Hữu Minh An",
        email: "20127102@student.hcmus.edu.vn",
        avatarUrl: "https://i.pravatar.cc/150?u=5",
        role: "admin",
        status: "normal",
        refresh_token: "",
        access_token: "",
      },
      {
        id: "6",
        studentId: "",
        username: "Huỳnh Minh Chiến",
        email: "20127444@student.hcmus.edu.vn",
        avatarUrl: "https://i.pravatar.cc/150?u=6",
        role: "user",
        status: "normal",
        refresh_token: "",
        access_token: "",
      },
      {
        id: "7",
        studentId: "",
        username: "Nguyễn Hoàng Phúc",
        email: "20127523@student.hcmus.edu.vn",
        avatarUrl: "https://i.pravatar.cc/150?u=7",
        role: "user",
        status: "normal",
        refresh_token: "",
        access_token: "",
      },
      {
        id: "8",
        studentId: "",
        username: "Lê Duẩn",
        email: "20127123@student.hcmus.edu.vn",
        avatarUrl: "https://i.pravatar.cc/150?u=8",
        role: "user",
        status: "ban",
        refresh_token: "",
        access_token: "",
      },
      {
        id: "9",
        studentId: "",
        username: "Lê Cung Tiến",
        email: "20127034@student.hcmus.edu.vn",
        avatarUrl: "https://i.pravatar.cc/150?u=9",
        role: "user",
        status: "normal",
        refresh_token: "",
        access_token: "",
      },
      {
        id: "10",
        studentId: "",
        username: "Nguyễn Đăng Khoa",
        email: "20127528@student.hcmus.edu.vn",
        avatarUrl: "https://i.pravatar.cc/150?u=10",
        role: "user",
        status: "normal",
        refresh_token: "",
        access_token: "",
      },
      {
        id: "11",
        studentId: "",
        username: "Bùi Thị Dung",
        email: "20127349@student.hcmus.edu.vn",
        avatarUrl: "https://i.pravatar.cc/150?u=11",
        role: "admin",
        status: "ban",
        refresh_token: "",
        access_token: "",
      },
      {
        id: "12",
        studentId: "",
        username: "Bành Hảo Toàn",
        email: "20127646@student.hcmus.edu.vn",
        avatarUrl: "https://i.pravatar.cc/150?u=12",
        role: "user",
        status: "ban",
        refresh_token: "",
        access_token: "",
      },
    ];

    const addHostInfo = (
      classes: Array<ClassType>,
      accounts: Array<UserType>
    ): Array<ClassType> => {
      return classes.map((cls) => {
        const host = accounts.find((account) => account.id === cls.host_id);
        return {
          ...cls,
          host_username: host?.username,
          host_avatarUrl: host?.avatarUrl,
        };
      });
    };

    const classesWithHostInfo: Array<any> = addHostInfo(
      templateClasses,
      templateAccounts
    );

    return classesWithHostInfo;
  };

  const deleteClassHandler = (currentClass: any) => {
    if (!classes) {
      // Handle the case where classes is still loading or null
      return;
    }

    const updatedClasses = classes.filter((user: any) => {
      return user.id !== currentClass.id;
    });
    setClasses(updatedClasses);
  };

  const banClassHandler = (currentClass: any) => {
    if (!classes) {
      // Handle the case where classes is still loading or null
      return;
    }
    const updatedClasses = classes.map((user: any) => {
      if (user.id === currentClass.id && currentClass.status === "inactive") {
        return { ...user, status: "active" };
      } else if (
        user.id === currentClass.id &&
        currentClass.status === "active"
      ) {
        return { ...user, status: "inactive" };
      }
      return user;
    });
    setClasses(updatedClasses);
  };

  if (classes === null) {
    // Render a loading state or return null
    return <LoadingIndicator />;
  }

  return (
    <div className="mx-auto max-w-screen-2xl p-4 md:p-6 2xl:p-10 bg-slate-100">
      <div className="text-xl breadcrumbs mx-auto max-w-screen-2xl mx-4 md:mx-6 2xl:mx-10 w-auto">
        <ul>
          <li>
            <Link href="/admin/">Home</Link>
          </li>
          <li>
            <Link href="/admin/classes">
              <b>Classes</b>
            </Link>
          </li>
        </ul>
      </div>
      <div className="flex flex-col lg:grid lg:grid-cols-3 mx-auto max-w-screen-2xl p-4 md:p-6 2xl:p-10">
        <div className="lg:col-start-0 lg:col-end-2">
          <label className="form-control w-full max-w-xs">
            <div className="label">
              <span className="label-text">Sort by</span>
            </div>
            <select
              className="select select-bordered"
              onChange={(e) => handleSelectChange(e.target.value, setSortBy)}
            >
              {/* <option disabled selected>--Option--</option> */}
              {classroomTableHeaders.map((items, index) => {
                return (
                  <option key={index} value={items.key}>
                    {items.header_name}
                  </option>
                );
              })}
            </select>
          </label>
        </div>

        <div className="lg:mx-10 lg:col-start-2 lg:col-end-3">
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
        <div className="lg:col-start-3 lg:col-end-4 max-w-md">
          <SearchBar
            placeholder="Search anything...."
            setQuery={setQuery}
            currentPage={currentPage}
          />
        </div>
        <div className="lg:col-start-0 lg:col-span-3">
          <div className="form-control">
            <div className="label">
              <span className="label-text">Filters</span>
            </div>
            <div className="flex flex-row space-x-10">
              <select
                className="select select-bordered w-full max-w-sm"
                value={nameFilter || ""}
                onChange={(e) =>
                  handleSelectChange(e.target.value, setIdFilter)
                }
              >
                <option disabled selected value={""}>
                  ID
                </option>
                {idSelectOptions.map((items, index) => {
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
                  Name
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
                value={hostNameFilter || ""}
                onChange={(e) =>
                  handleSelectChange(e.target.value, setHostNameFilter)
                }
              >
                <option disabled selected value={""}>
                  Host Name
                </option>
                {hostNameSelectOptions.map((items, index) => {
                  return (
                    <option key={index} value={items}>
                      {items}
                    </option>
                  );
                })}
              </select>
              <select
                className="select select-bordered w-full max-w-sm"
                value={statusFilter || ""}
                onChange={(e) =>
                  handleSelectChange(e.target.value, setStatusFilter)
                }
              >
                <option disabled selected value={""}>
                  Status
                </option>
                {statusSelectOptions.map((items, index) => {
                  return (
                    <option key={index} value={items.toLowerCase()}>
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
        <div className="col-start-0 col-span-3">
          <Suspense key={query + currentPage}>
            <ClassTable
              paginatedResult={paginatedResult}
              totalItems={totalItems}
              currentPage={currentPage}
              setCurrentPage={setCurrentPage}
              deleteClass={deleteClassHandler}
              banClass={banClassHandler}
            />
          </Suspense>
        </div>
      </div>
    </div>
  );
}
