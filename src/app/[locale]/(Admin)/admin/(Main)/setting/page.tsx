"use client";
import FileDownloadButton from "@/component/excel/FileDownloadButton";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { FaGears } from "react-icons/fa6";
import { FaHome } from "react-icons/fa";

export default function Setting() {
  const ITEMS_STEP = 5; // such a number!

  const [itemsPerPage, setItemsPerPage] = useState<number>(5);

  useEffect(() => {
      const _storage = localStorage.getItem("ITEMS_PER_PAGE");
      setItemsPerPage(JSON.parse(_storage!) as number);
  },[]);

  const handleSave = (itemsPerPage: number) => {
     localStorage.setItem("ITEMS_PER_PAGE", JSON.stringify(itemsPerPage));
     setItemsPerPage(itemsPerPage);
  }

  return (
    <div className="mx-auto h-[38.1rem] max-w-screen-2xl p-4 md:p-6 2xl:p-10 bg-slate-100">
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
              <FaGears />
              <Link href="/admin/setting">Settings</Link>
            </div>
          </li>
        </ul>
      </div>
      <div className="mt-10 col-span-5 xl:col-span-3">
        <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
          <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
            <h3 className="mx-5 text-xl font-medium text-black dark:text-white">
                Pagination
            </h3>
          </div>
          <div className="flex flex-col gap-5.5 p-6.5 mx-5 my-5">

            <label className="mt-5 block text-lg text-black dark:text-white">
              Display items-per-page: <span className="font-bold">{itemsPerPage}</span>
            </label>
            <div className="mt-3 relative z-20 w-48 bg-white dark:bg-form-input">
              <input
                type="range"
                min={5}
                max={20}
                value={itemsPerPage}
                className="range"
                step={ITEMS_STEP}
                onChange={(e) => {
                  // Handle slider value change
                  handleSave(Number(e.target.value));
                }}
              />
              <div className="w-full flex justify-between text-xs px-2">
                <span>5</span>
                <span>10</span>
                <span>15</span>
                <span>20</span>
              </div>
            </div>
            <div className="flex justify-end gap-4.5 space-x-5"></div>
          </div>
        </div>
      </div>
      ;
    </div>
  );
}
