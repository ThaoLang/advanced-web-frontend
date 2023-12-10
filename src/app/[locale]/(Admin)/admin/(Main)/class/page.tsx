"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import ClassTable from "@/component/admin/ClassTable";
import SearchBar from "@/component/admin/SearchBar";
import { Suspense } from "react";
import { ClassType } from "@/model/ClassType";

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
  
  useEffect(() => {
    console.log('render page.tsx');

    const fetchData = async () => {
        const classData = await fetchClassesData();
        setClasses(classData);
    }
    fetchData()
        .catch(console.error)
}, []);

  useEffect(() => {
    const paginateClassesData = async () => {
      if (!classes) {
            // Handle the case where classes is still loading or null
            return { paginatedResult: [], totalItems: 0 };
      }

      function filterArrayByQuery(array: Array<any>, query: string) {
        if (query.trim() === '') {
            // If query is empty, return the original array
            return array;
        }

        return array.filter(item => {
            return Object.values(item).some(value => {
                if (typeof value === 'string') {
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
    }
    const fetchData = async () => {
      await paginateClassesData().then((value) => {
          const { paginatedResult, totalItems } = value;
          setPaginatedResult(paginatedResult);
          setTotalItems(totalItems);
      })
  };
  fetchData();


    },[query, currentPage, classes]);

  const fetchClassesData = async () => {
    const templateClasses: Array<ClassType> = [
      {
        id: 'class1',
        host_id: '1',
        description: 'Introduction to Mathematics',
        name: 'Mathematics 101',
        class_code: 'MATH101',
        invite_url: 'https://example.com/invite/math101',
      },
      {
        id: 'class2',
        host_id: '1',
        description: 'Programming Fundamentals',
        name: 'Programming 101',
        class_code: 'CS101',
        invite_url: 'https://example.com/invite/cs101',
      },
      {
        id: 'class3',
        host_id: '3',
        description: 'Literature Appreciation',
        name: 'English Literature',
        class_code: 'ENG101',
        invite_url: 'https://example.com/invite/eng101',
      },
      {
        id: 'class4',
        host_id: '5',
        description: 'Chemistry Basics',
        name: 'Chemistry 101',
        class_code: 'CHEM101',
        invite_url: 'https://example.com/invite/chem101',
      },
      {
        id: 'class5',
        host_id: '5',
        description: 'History of Art',
        name: 'Art History',
        class_code: 'ART101',
        invite_url: 'https://example.com/invite/art101',
      },
      {
        id: 'class6',
        host_id: '7',
        description: 'Web Development Workshop',
        name: 'Web Dev Workshop',
        class_code: 'WEBDEV101',
        invite_url: 'https://example.com/invite/webdev101',
      },
      {
        id: 'class7',
        host_id: '7',
        description: 'Physics Principles',
        name: 'Physics 101',
        class_code: 'PHYSICS101',
        invite_url: 'https://example.com/invite/physics101',
      },
      {
        id: 'class8',
        host_id: '11',
        description: 'Introduction to Psychology',
        name: 'Psychology 101',
        class_code: 'PSYCH101',
        invite_url: 'https://example.com/invite/psych101',
      },
      {
        id: 'class9',
        host_id: '9',
        description: 'Computer Networks',
        name: 'Networking Basics',
        class_code: 'NETWORK101',
        invite_url: 'https://example.com/invite/network101',
      },
      {
        id: 'class10',
        host_id: '11',
        description: 'Human Anatomy',
        name: 'Anatomy 101',
        class_code: 'ANATOMY101',
        invite_url: 'https://example.com/invite/anatomy101',
      },
      {
        id: 'class11',
        host_id: '11',
        description: 'Environmental Science',
        name: 'Environmental Science',
        class_code: 'ENVSCI101',
        invite_url: 'https://example.com/invite/envsci101',
      },
      {
        id: 'class12',
        host_id: '7',
        description: 'Data Structures and Algorithms',
        name: 'DSA Workshop',
        class_code: 'DSA101',
        invite_url: 'https://example.com/invite/dsa101',
      },
      {
        id: 'class13',
        host_id: '3',
        description: 'Microeconomics Basics',
        name: 'Microeconomics 101',
        class_code: 'ECON101',
        invite_url: 'https://example.com/invite/econ101',
      },
      {
        id: 'class14',
        host_id: '1',
        description: 'Introduction to Sociology',
        name: 'Sociology 101',
        class_code: 'SOCIO101',
        invite_url: 'https://example.com/invite/socio101',
      },
      {
        id: 'class15',
        host_id: '5',
        description: 'Digital Marketing Strategies',
        name: 'Marketing 101',
        class_code: 'MARKETING101',
        invite_url: 'https://example.com/invite/marketing101',
      },
    ];
    return templateClasses;
  }

  const deleteClassHandler = (currentUser: any) => {
    if (!classes) {
        // Handle the case where classes is still loading or null
        return;
    }
    
    const updatedClasses = classes.filter((user: any) => {
        return user.id !== currentUser.id;
    });
    setClasses(updatedClasses);
}

const banClassHandler = (currentUser: any) => {
    if (!classes) {
        // Handle the case where classes is still loading or null
        return;
    }
    const updatedClasses = classes.map((user: any) => {
        if (user.id === currentUser.id && currentUser.status === 'ban') {
            return {...user, status: 'normal'};
        }
        else if (user.id === currentUser.id && currentUser.status === 'normal') {
            return {...user, status: 'ban'};
        }
        return user;
    });
    setClasses(updatedClasses);
}

if (classes === null) {
    // Render a loading state or return null
    return <div className="mx-auto max-w-screen-2xl p-4 md:p-6 2xl:p-10 bg-slate-100">Loading...</div>;
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
              paginatedResult={paginatedResult}
              totalItems={totalItems}
              currentPage={currentPage}
              setCurrentPage={setCurrentPage}
              deleteClass={deleteClassHandler}
              banClass={banClassHandler}/>
          </Suspense>
        </div>
      </div>
    </div>
  );
}
