"use client";
import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import AccountTable from "@/component/admin/(table)/AccountTable";
import SearchBar from "@/component/admin/SearchBar";
import { Suspense } from "react";
import { UserType } from "@/model/UserType";
import { ClassListType } from "@/model/ClassListType";
import filterAndSortArray from "@/utils/ArrayFilterUtils";
import LoadingIndicator from "@/component/admin/LoadingIndicator";
import axios from "axios";
import { useAuth } from "@/context/AuthContext";

const ITEMS_PER_PAGE = 5;

export default function Account({
  searchParams,
}: {
  searchParams?: {
    query?: string;
    page?: string;
  };
}) {
  const auth = useAuth();
  const [accounts, setAccounts] = useState<any>(null);
  const [query, setQuery] = useState(searchParams?.query || "");
  const [currentPage, setCurrentPage] = useState(
    Number(searchParams?.page) || 1
  );
  const [paginatedResult, setPaginatedResult] = useState<Array<any>>([]);
  const [totalItems, setTotalItems] = useState(0);

  const [idSelectOptions, setIdSelectOptions] = useState<Array<string>>([]);
  const [nameSelectOptions, setNameSelectOptions] = useState<Array<string>>([]);
  const accountTableHeaders = [
    { header_name: "ID", key: "id" },
    { header_name: "Name", key: "username" },
    { header_name: "Role", key: "role" },
    { header_name: "Status", key: "status" },
  ];
  const roleSelectOptions: any[] = ["User", "Admin"];
  const statusSelectOptions: any[] = ["Normal", "Ban"];

  const [sortBy, setSortBy] = useState<string | null>("id");
  const [orderBy, setOrderBy] = useState<string>("asc");
  const [idFilter, setIdFilter] = useState<string | null>(null);
  const [nameFilter, setNameFilter] = useState<string | null>(null);
  const [roleFilter, setRoleFilter] = useState<string | null>(null);
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
    setRoleFilter(null);
    setStatusFilter(null);
  };

  useEffect(() => {

    const fetchData = async () => {
      const userData = await fetchAccountsData();
      setAccounts(userData);
      // Dynamically generate nameSelectOptions based on unique names
      const uniqueIds = Array.from(new Set(userData.map((user) => user.id)));
      setIdSelectOptions(uniqueIds);
      const uniqueNames = Array.from(
        new Set(userData.map((user) => user.username))
      );
      setNameSelectOptions(uniqueNames);
    };
    fetchData().catch(console.error);
  }, []);

  useEffect(() => {
    console.log("Account Table Render");
    // Save the current scroll position
    scrollRef.current = window.scrollY;

    const paginateAccountData = async () => {
      if (!accounts) {
        // Handle the case where accounts is still loading or null
        return { paginatedResult: [], totalItems: 0 };
      }

      const result = filterAndSortArray(accounts, query, sortBy, orderBy, {
        id: idFilter,
        username: nameFilter,
        role: roleFilter,
        status: statusFilter,
      });
      const totalItems = result.length;
      const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
      const endIndex = startIndex + ITEMS_PER_PAGE;
      const paginatedResult = result.slice(startIndex, endIndex);

      return { paginatedResult, totalItems };
    };

    const fetchData = async () => {
      await paginateAccountData().then((value) => {
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
    idFilter,
    nameFilter,
    roleFilter,
    statusFilter,
    currentPage,
    accounts,
  ]); // Run this effect when currentPage or accounts changes

  const fetchAccountsData = async () => {
    let ResponseData: Array<UserType> = [];
      await axios
        .get(`${process.env.NEXT_PUBLIC_BACKEND_PREFIX}profile`, {
          headers: {
            Authorization: `Bearer ${auth.admin?.access_token}`,
          },
        })
        .then((response) => {
          console.log("Response", response.data);
          ResponseData = response.data as Array<UserType>;
        })
        .catch((error) => {
          console.error("Error fetching all users:", error);
        });
    return ResponseData;
  };

  const deleteAccountHandler = (currentUser: any) => {
    if (!accounts) {
      // Handle the case where accounts is still loading or null
      return;
    }

    const updatedUsers = accounts.filter((user: any) => {
      return user.id !== currentUser.id;
    });
    setAccounts(updatedUsers);
  };

  const banAccountHandler = (currentUser: any) => {
    if (!accounts) {
      // Handle the case where accounts is still loading or null
      return;
    }
    const updatedUsers = accounts.map((user: any) => {
      if (user.id === currentUser.id && currentUser.status === "ban") {
        return { ...user, status: "normal" };
      } else if (
        user.id === currentUser.id &&
        currentUser.status === "normal"
      ) {
        return { ...user, status: "ban" };
      }
      return user;
    });
    setAccounts(updatedUsers);
  };

  if (accounts === null) {
    // Render a loading state or return null
    return <LoadingIndicator />;
  }

  return (
    <React.Fragment>
      <div className="mx-auto max-w-screen-2xl min-h-screen p-4 md:p-6 2xl:p-10 bg-slate-100">
        <div className="text-xl breadcrumbs mx-auto max-w-screen-2xl mx-4 md:mx-6 2xl:mx-10 w-auto">
          <ul>
            <li>
              <Link href="/admin/">Home</Link>
            </li>
            <li>
              <Link href="/admin/account">
                <b>Account</b>
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
                {accountTableHeaders.map((items, index) => {
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
                  value={idFilter || ""}
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
                      <option key={index} value={items.toLowerCase()}>
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
          <div className="lg:col-start-0 lg:col-span-3">
            <Suspense key={query + currentPage}>
              <AccountTable
                paginatedResult={paginatedResult}
                totalItems={totalItems}
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
                deleteAccount={deleteAccountHandler}
                banAccount={banAccountHandler}
              />
            </Suspense>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}
