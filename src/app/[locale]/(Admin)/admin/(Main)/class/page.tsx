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
import axios from "axios";
import { useAuth } from "@/context/AuthContext";
import { FaChalkboard } from "react-icons/fa6";
import { FaHome } from "react-icons/fa";

export default function Classes({
  searchParams,
}: {
  searchParams?: {
    query?: string;
    page?: string;
  };
}) {
  const auth = useAuth();
  const [itemsPerPage, setItemsPerPage] = useState<number>(5);
  const [classes, setClasses] = useState<any>(null);
  const [query, setQuery] = useState(searchParams?.query || "");
  const [currentPage, setCurrentPage] = useState(
    Number(searchParams?.page) || 1
  );
  const [paginatedResult, setPaginatedResult] = useState<Array<any>>([]);
  const [totalItems, setTotalItems] = useState(0);

  const [nameSelectOptions, setNameSelectOptions] = useState<Array<string>>([]);
  const [hostNameSelectOptions, setHostNameSelectOptions] = useState<
    Array<string>
  >([]);
  const classroomTableHeaders = [
    { header_name: "Name", key: "name" },
    { header_name: "Host name", key: "host_username" },
    { header_name: "Description", key: "description" },
    { header_name: "Status", key: "status" },
  ];
  const statusSelectOptions: any[] = ["Active", "Inactive"];

  const [sortBy, setSortBy] = useState<string | null>("name");
  const [orderBy, setOrderBy] = useState<string>("asc");
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
    setNameFilter(null);
    setHostNameFilter(null);
    setStatusFilter(null);
  };

  useEffect(() => {
    const _storage = localStorage.getItem("ITEMS_PER_PAGE");
    setItemsPerPage(JSON.parse(_storage!) as number);

    const fetchData = async () => {
      const classData = await fetchClassesData();
      setClasses(classData);
      // Dynamically generate nameSelectOptions based on unique names
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
        name: nameFilter,
        host_username: hostNameFilter,
        status: statusFilter,
      });
      const totalItems = result.length;
      const startIndex = (currentPage - 1) * itemsPerPage;
      const endIndex = startIndex + itemsPerPage;
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
    statusFilter,
    currentPage,
    classes,
  ]);

  const fetchClassesData = async () => {

    // Fetch all accounts from the database
    const fetchAccounts = async () => {
      try {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_PREFIX}profile`, {
          headers: {
            Authorization: `Bearer ${auth.admin?.access_token}`,
          },
        });

        // console.log("Response Accounts", response.data);
        return response.data as Array<UserType>;
      } catch (error) {
        console.error("Error fetching all users:", error);
        return [];
      }
    };

    //Fetch all classes from the database
    const fetchClasses = async () => {
      try {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_PREFIX}classes/teaching/exist`, {
          headers: {
            Authorization: `Bearer ${auth.admin?.access_token}`,
          },
        });

        // console.log("Response Classes", response.data);
        return response.data as Array<ClassType>;
      } catch (error) {
        console.error("Error fetching all classes:", error);
        return [];
      }
    }
    
    const addHostInfo = (
      classes: Array<ClassType>,
      accounts: Array<UserType>
    ): Array<ClassType> => {
      return classes.map((cls) => {
        const host = accounts.find((account) => account._id === cls.host_id);
        return {
          ...cls,
          host_username: host?.username,
          host_avatarUrl: host?.avatarUrl,
        };
      });
    };

    const Classes: Array<ClassType> = await fetchClasses();
    const Accounts: Array<UserType> = await fetchAccounts();

    const classesWithHostInfo: Array<any> = addHostInfo(
      Classes,
      Accounts
    );

    return classesWithHostInfo;
  };

  const fetchSetClassStatus = async(action: string, classId: string) => {
    await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_PREFIX}classes/${action}/${classId}`, null, {
      headers: {
        Authorization: `Bearer ${auth.admin?.access_token}`,
      },
    })
    .then((response) => {
      console.log(`${response.status}: Update status successfully!`);
    })
    .catch((error) => {
      console.error("Error setting class status: ", error);
    }); 
  }

  const fetchDeleteClass = async(classId: string) => {
    await axios.delete(`${process.env.NEXT_PUBLIC_BACKEND_PREFIX}classes/${classId}`, {
      headers: {
        Authorization: `Bearer ${auth.admin?.access_token}`,
      },
    })
    .then((response) => {
      console.log(`${response.status}: Remove successfully!`);
    })
    .catch((error) => {
      console.error("Error while remove class: ", error);
    }); 
  }


  //TODO: INCOMPLETE HANDLE, NEED TO IMPLEMENT "IMPORT/EXPORT FROM THE BACK-END SIDE" TO CONTINUE THIS TASK
  const deleteClassHandler = async (currentClass: any) => {
    if (!classes) {
      // Handle the case where classes is still loading or null
      return;
    }

    const updatedClasses = classes.filter((classItem: any) => {
      return classItem._id !== currentClass._id;
    });
    await fetchDeleteClass(currentClass._id).catch(console.error);
    setClasses(updatedClasses);
  };

  const banClassHandler = async (currentClass: any) => {
    if (!classes) {
      // Handle the case where classes is still loading or null
      return;
    }

    const updatedStatus = currentClass.status === "inactive" ? "active" : "inactive";

    const updatedClasses = classes.map((classItem: any) => {
      if (classItem._id === currentClass._id) {
          return {...classItem, status: updatedStatus}
      }
      return classItem;
    });
    
    await fetchSetClassStatus(updatedStatus, currentClass._id).catch(console.error);
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
              <div className="flex flex-row items-center gap-2">
                <FaHome />
                <Link href="/admin/">Home</Link>
              </div>
            </li>
            <li>
              <div className="flex flex-row items-center gap-2 font-bold">
                <FaChalkboard />
                <Link href="/admin/classes">Classes</Link>
              </div>
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
              itemsPerPage={itemsPerPage}
              deleteClass={deleteClassHandler}
              banClass={banClassHandler}
            />
          </Suspense>
        </div>
      </div>
    </div>
  );
}
