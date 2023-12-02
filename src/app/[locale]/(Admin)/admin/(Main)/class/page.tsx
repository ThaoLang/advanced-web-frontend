"use client";
import React, { useState } from "react";
import Link from "next/link";
import ClassTable from "@/component/admin/ClassTable";
import SearchBar from "@/component/admin/SearchBar";
import { Suspense } from "react";

const ITEMS_PER_PAGE = 5;

export default function Classes({
  searchParams,
}: {
  searchParams?: {
    query?: string;
    page?: string;
  };
}) {
  const [query, setQuery] = useState(searchParams?.query || "");
  const [currentPage, setCurrentPage] = useState(
    Number(searchParams?.page) || 1
  );

  const fetchClassList = async () => {
    const classes = [
      {
        id: "45038cad5e644840a4f356d6a1f144fb",
        host_name: "Nguyễn Minh Quang",
        email: "20127605@gmail.com",
        avatar: "https://i.pravatar.cc/150?u=1",
        description: "A dedicated student pursuing excellence in Math 101.",
        class_name: "Math 101",
      },
      {
        id: "87b40e669a764bef845f8f33a3ce568e",
        host_name: "Lê Hoàng Khanh Nguyên",
        email: "20127679@gmail.com",
        avatar: "https://i.pravatar.cc/150?u=2",
        description:
          "An experienced teacher with a passion for imparting knowledge and fostering a love for History. In History 201, students embark on a captivating journey through different eras, exploring significant events and understanding their impact on the present. Mr. Nguyên brings history to life through engaging lectures, thought-provoking discussions, and interactive activities. His commitment to creating a dynamic and inclusive learning environment ensures that students not only grasp historical facts but also develop critical thinking skills. Join History 201 to uncover the fascinating tapestry of our past under the guidance of an inspiring educator!",
        class_name: "History 201",
      },
      {
        id: "0feb69a4dd89474288d13a4a1dcc7586",
        host_name: "Lăng Thảo Thảo",
        email: "20127629@gmail.com",
        avatar: "https://i.pravatar.cc/150?u=3",
        description:
          "Administrative role overseeing and managing activities in English 301.",
        class_name: "English 301",
      },
      {
        id: "4bf67405028d49fca40bdeb5197f350f",
        host_name: "Lê Hoài Phương",
        email: "20127598@gmail.com",
        avatar: "https://i.pravatar.cc/150?u=4",
        description:
          "Administrative role handling tasks related to Geometry 401.",
        class_name: "Geometry 401",
      },
      {
        id: "e67e7db5bc254568bf8ec4f96c9e5fa9",
        host_name: "Hoàng Hữu Minh An",
        email: "20127102@gmail.com",
        avatar: "https://i.pravatar.cc/150?u=5",
        description:
          "Administrative role overseeing and managing activities in Physics 501.",
        class_name: "Physics 501",
      },
      {
        id: "0460929e75de42ffa4d149e4d1a1210e",
        host_name: "Huỳnh Minh Chiến",
        email: "20127444@gmail.com",
        avatar: "https://i.pravatar.cc/150?u=6",
        description:
          "Experienced teacher guiding students through the intricacies of Chemistry 601.",
        class_name: "Chemistry 601",
      },
      {
        id: "a5eb7b9a06e64c6fb09220ffdecf554f",
        host_name: "Nguyễn Hoàng Phúc",
        email: "20127523@gmail.com",
        avatar: "https://i.pravatar.cc/150?u=7",
        description: "A dedicated student passionate about Programming 701.",
        class_name: "Programming 701",
      },
      {
        id: "4dfc9c7adb7c4a2590a33364556e5a7d",
        host_name: "Lê Duẩn",
        email: "20127123@gmail.com",
        avatar: "https://i.pravatar.cc/150?u=8",
        description: "A diligent student focused on mastering Physics 801.",
        class_name: "Physics 801",
      },
      {
        id: "1ae055a4e2ae48b89310caadfe2a3839",
        host_name: "Lê Cung Tiến",
        email: "20127034@gmail.com",
        avatar: "https://i.pravatar.cc/150?u=9",
        description: "A dedicated student exploring the world of Calculus 102.",
        class_name: "Calculus 102",
      },
      {
        id: "460613348c9146b7935411f04c60bc7e",
        host_name: "Nguyễn Đăng Khoa",
        email: "20127528@gmail.com",
        avatar: "https://i.pravatar.cc/150?u=10",
        description:
          "Experienced teacher specializing in Advanced Web Programming 202.",
        class_name: "Advanced Web Programming 202",
      },
      {
        id: "539347bdb71645c78606499c0100e4c1",
        host_name: "Bùi Thị Dung",
        email: "20127349@gmail.com",
        avatar: "https://i.pravatar.cc/150?u=11",
        description:
          "Administrative role overseeing and managing activities in Internet of Things 901.",
        class_name: "Internet of Things 901",
      },
    ];

    function filterArrayByQuery(array: Array<any>, query: string) {
      if (query.trim() === "") {
        // If query is empty, return the original array
        return array;
      }

      return array.filter((item) => {
        return Object.values(item).some((value) => {
          if (typeof value === "string") {
            return value.toLowerCase().includes(query.toLowerCase());
          }
          return false;
        });
      });
    }

    const result = filterArrayByQuery(classes, query);
    const totalItems = result.length;

    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const endIndex = startIndex + ITEMS_PER_PAGE;
    const paginatedResult = result.slice(startIndex, endIndex);

    return { paginatedResult, totalItems };
  };

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
      <div className="grid grid-cols-3 mx-auto max-w-screen-2xl p-4 md:p-6 2xl:p-10">
        <div className="col-start-3 col-end-4">
          <SearchBar
            placeholder="Search user...."
            setQuery={setQuery}
            currentPage={currentPage}
          />
        </div>
        <div className="col-start-0 col-span-3">
          <Suspense key={query + currentPage}>
            <ClassTable
              currentPage={currentPage}
              setCurrentPage={setCurrentPage}
              fetchClassList={fetchClassList}
            />
          </Suspense>
        </div>
      </div>
    </div>
  );
}
