    "use client";
    import CSVExporter from "@/component/excel/CSVExporter";
    import CSVImporter from "@/component/excel/CSVImporter";
    import ClassListTable from "@/component/admin/(table)/ClassListTable";
    import SearchBar from "@/component/admin/SearchBar";
    import { ClassListType } from "@/model/ClassListType";
    import filterAndSortArray from "@/utils/ArrayFilterUtils";
    import Link from "next/link";
    import { Suspense, useEffect, useRef, useState } from "react";

    export default function Page({ params, searchParams }:
        {
            params: { slug: string },
            searchParams?: {
                query?: string;
                page?: string;
            };
        }) {
        const ITEMS_PER_PAGE = 10;
        const [classList, setClassList] = useState<any>(null);
        const [query, setQuery] = useState(searchParams?.query || '');
        const [currentPage, setCurrentPage] = useState(Number(searchParams?.page) || 1);
        const [paginatedResult, setPaginatedResult] = useState<Array<any>>([]);
        const [totalItems, setTotalItems] = useState(0);

        const classListTableHeaders = [
            { header_name: "UserId", key: "user_id" },
            { header_name: "FullName", key: "fullname" },
            { header_name: "Role", key: "role" },
            { header_name: "StudentId", key: "student_id" },

        ];
        const roleSelectOptions: any[] = ["Teacher", "Student"];

        const [sortBy, setSortBy] = useState<string | null>(null);
        const [orderBy, setOrderBy] = useState<string>('asc');
        const [userIdFilter, setUserIdFilter] = useState<string | null>(null);
        const [classIdFilter, setClassIdFilter] = useState<string | null>(null);
        const [nameFilter, setNameFilter] = useState<string | null>(null);
        const [roleFilter, setRoleFilter] = useState<string | null>(null);
        const [studentIdFilter, setStudentIdFilter] = useState<string | null>(null);

        const [userIdSelectOptions, setUserIdSelectOptions] = useState<Array<string>>([]);
        // const [classIdSelectOptions, setClassIdSelectOptions] = useState<Array<string>>([]);
        const [nameSelectOptions, setNameSelectOptions] = useState<Array<string>>([]);
        const [studentIdSelectOptions, setStudentIdSelectOptions] = useState<Array<string>>([]);

        // Create a ref to store the scroll position
        const scrollRef = useRef<number>(0);

        const handleSelectChange = (
            value: string,
            setter: React.Dispatch<React.SetStateAction<string | null>>
        ) => {
            setter(value === 'null' ? null : value);
        };

        const handleRadioChange = (
            value: string,
            setter: React.Dispatch<React.SetStateAction<string>>
        ) => {
            setter(value);
        };

        const handleClearFilters = () => {
            setUserIdFilter(null);
            setNameFilter(null);
            setRoleFilter(null);
            setClassIdFilter(null);
            setStudentIdFilter(null);
        }

        useEffect(() => {
            const fetchData = async () => {
                const classData = await fetchClassListData();
                setClassList(classData);
            }
            fetchData()
                .catch(console.error)
        }, []);

        useEffect(() => {
            if (classList) {
                // Dynamically generate nameSelectOptions based on unique names
                const uniqueUserIds: string[] = Array.from(new Set(classList.map((items: ClassListType) => items.user_id)));
                setUserIdSelectOptions(uniqueUserIds);
                const uniqueNames: string[] = Array.from(new Set(classList.map((items: ClassListType) => items.fullName)));
                setNameSelectOptions(uniqueNames);
                const uniqueStudentIds: string[] = Array.from(new Set(classList.map((items: ClassListType) => items.student_id)));
                setStudentIdSelectOptions(uniqueStudentIds);
            }
            
        },[classList]);

        useEffect(() => {
            console.log("Account Table Render");
            // Save the current scroll position
            scrollRef.current = window.scrollY;

            const paginateClassListData = async () => {
                if (!classList) {
                    // Handle the case where classList is still loading or null
                    return { paginatedResult: [], totalItems: 0 };
                }

                const result = filterAndSortArray(
                    classList,
                    query,
                    sortBy,
                    orderBy,
                    {
                        class_id: classIdFilter,
                        user_id: userIdFilter,
                        fullname: nameFilter,
                        role: roleFilter,
                        student_id: studentIdFilter
                    })
                const totalItems = result.length;
                const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
                const endIndex = startIndex + ITEMS_PER_PAGE;
                const paginatedResult = result.slice(startIndex, endIndex);

                return { paginatedResult, totalItems };
            }

            const fetchData = async () => {
                await paginateClassListData().then((value) => {
                    const { paginatedResult, totalItems } = value;
                    setPaginatedResult(paginatedResult);
                    setTotalItems(totalItems);
                })
            };

            fetchData().catch(console.error);
            // Restore the scroll position after the component updates
            window.scrollTo(0, scrollRef.current);
        }, [query,
            sortBy,
            orderBy,
            classIdFilter,
            userIdFilter,
            nameFilter,
            roleFilter,
            studentIdFilter,
            currentPage,
            classList]); // Run this effect when currentPage or classList changes



        const deleteClassListHandler = (currentItem: any) => {
            if (!classList) {
                // Handle the case where classList is still loading or null
                return;
            }

            const updatedList = classList.filter((listItem: any) => {
                return JSON.stringify(listItem) !== JSON.stringify(currentItem);
            });
            setClassList(updatedList);
        }

        const editClassListHandler = (_fullname: any, _role: any, _studentId: any, currentItem: any) => {
            if (!classList) {
              // Handle the case where classList is still loading or null
              return;
            }
          
            const updatedList = classList.map((listItem: any) => {
                if (currentItem.user_id === listItem.user_id) {
                    return {...listItem, fullname: _fullname, role: _role, student_id: _studentId};
                }
                return listItem;
            });
            setClassList(updatedList);
          };

        const handleFileUpload = (data: any) => {
            // Handle the parsed CSV data, you can send it to an API or process it further
            const convertedData: ClassListType[] = data.map((item: any) => ({
                class_id: item.class_id,
                user_id: item.user_id.toString(), // Convert user_id to string if it's a number
                fullname: item.fullname,
                role: item.role,
                student_id: item.student_id ? item.student_id.toString() : '', // Convert student_id to string if it's a number, or use an empty string if undefined
            }));
            setClassList(convertedData);
        }

        function fetchClassListData() {
            return new Promise<string>((resolve, reject) => { })
        }

        return (
            <div className="mx-auto max-w-screen-2xl min-h-screen p-4 md:p-6 2xl:p-10 bg-slate-100">
                <div className="text-xl breadcrumbs mx-auto max-w-screen-2xl mx-4 md:mx-6 2xl:mx-10 w-auto">
                    <ul>
                        <li><Link href="/admin/">Home</Link></li>
                        <li><Link href="/admin/class">Classes</Link></li>
                        <li><Link href={`/admin/class/${params.slug}`}><b>{params.slug}</b></Link></li>
                    </ul>
                </div>

                <div className="flex flex-col lg:grid lg:grid-cols-3 mx-auto max-w-screen-2xl p-4 md:p-6 2xl:p-10s">
                    <details className="lg:col-start-0 lg:col-span-1 collapse bg-base-200 collapse-arrow border">
                        <summary className="collapse-title text-xl font-medium">Import/Export Data</summary>
                        <div className="collapse-content">
                            <div className="lg:col-start-0 lg:col-end-1">
                                <CSVImporter onFileUpload={handleFileUpload}/>
                            </div>
                            <div className="lg:col-start-2 lg:col-span-2">
                                <CSVExporter data={classList} filename="exported_data" />
                            </div>
                        </div>
                    </details>
                    <details className="lg:col-start-auto lg:col-span-1 collapse bg-base-200 collapse-arrow border">
                        <summary className="collapse-title text-xl font-medium">Sort Data</summary>
                        <div className="collapse-content">
                            <div className="lg:col-start-0 lg:col-span-1">
                                <label className="form-control w-full max-w-xs">
                                    <div className="label">
                                        <span className="label-text">Sort by</span>
                                    </div>
                                    <select className="select select-bordered"
                                        onChange={(e) => handleSelectChange(e.target.value, setSortBy)}>
                                        {/* <option disabled selected>--Option--</option> */}
                                        {
                                            classListTableHeaders.map((items, index) => {
                                                return (
                                                    <option key={index} value={items.key}>{items.header_name}</option>
                                                )
                                            })
                                        }
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
                                            <input type="radio" name="order-by"
                                                className="radio radio-sm checked:bg-red-500"
                                                checked={orderBy === 'asc'}
                                                onChange={() => handleRadioChange('asc', setOrderBy)} />
                                            <span className="label-text">Ascending</span>
                                        </label>
                                        <label className="flex flex-row gap-2 cursor-pointer">
                                            <input type="radio" name="order-by"
                                                className="radio radio-sm checked:bg-blue-500"
                                                checked={orderBy === 'desc'}
                                                onChange={() => handleRadioChange('desc', setOrderBy)} />
                                            <span className="label-text">Descending</span>
                                        </label>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </details>

                    <div className="lg:col-start-auto lg:col-span-1 max-w-md">
                        <SearchBar placeholder="Search anything...."
                            setQuery={setQuery}
                            currentPage={currentPage} />
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
                                <select className="select select-bordered w-full max-w-sm" value={userIdFilter || ''}
                                    onChange={(e) => handleSelectChange(e.target.value, setUserIdFilter)}>
                                    <option disabled selected value={''}>UserId</option>
                                    {
                                        userIdSelectOptions.map((items, index) => {
                                            return (
                                                <option key={index} value={items}>{items}</option>
                                            )
                                        })
                                    }
                                </select>
                                <select className="select select-bordered w-full max-w-sm" value={nameFilter || ''}
                                    onChange={(e) => handleSelectChange(e.target.value, setNameFilter)}>
                                    <option disabled selected value={''}>Username</option>
                                    {
                                        nameSelectOptions.map((items, index) => {
                                            return (
                                                <option key={index} value={items}>{items}</option>
                                            )
                                        })
                                    }
                                </select>
                                <select className="select select-bordered w-full max-w-sm" value={roleFilter || ''}
                                    onChange={(e) => handleSelectChange(e.target.value, setRoleFilter)}>
                                    <option disabled selected value={""}>Role</option>
                                    {
                                        roleSelectOptions.map((items, index) => {
                                            return (
                                                <option key={index} value={items.toLowerCase()}>{items}</option>
                                            )
                                        })
                                    }
                                </select>
                                <select className="select select-bordered w-full max-w-sm" value={studentIdFilter || ''}
                                    onChange={(e) => handleSelectChange(e.target.value, setStudentIdFilter)}>
                                    <option disabled selected value={""}>StudentId</option>
                                    {
                                        studentIdSelectOptions.map((items, index) => {
                                            return (
                                                <option key={index} value={items.toLowerCase()}>{items}</option>
                                            )
                                        })
                                    }
                                </select>
                                <button className="btn btn-error text-white"
                                    onClick={() => handleClearFilters()}>Clear all filters</button>
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
                                deleteClassListItem={deleteClassListHandler}
                                editClassListItem={editClassListHandler}
                            />
                        </Suspense>
                    </div>

                </div>

            </div>

        )
    }

