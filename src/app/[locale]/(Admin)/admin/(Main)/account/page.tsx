"use client";
import React, { useState, useEffect } from "react";
import Link from 'next/link';
import AccountTable from '@/component/admin/AccountTable'
import SearchBar from '@/component/admin/SearchBar'
import { Suspense } from 'react';
import { UserType } from "@/model/UserType";
import { ClassListType } from "@/model/ClassListType";
import filterAndSortArray from "@/utils/ArrayFilterUtils";

const ITEMS_PER_PAGE = 5;

export default function Account({
    searchParams,
}: {
    searchParams?: {
        query?: string;
        page?: string;
    };
}) {
    const [accounts, setAccounts] = useState<any>(null);
    const [query, setQuery] = useState(searchParams?.query || '');
    const [currentPage, setCurrentPage] = useState(Number(searchParams?.page) || 1);
    const [paginatedResult, setPaginatedResult] = useState<Array<any>>([]);
    const [totalItems, setTotalItems] = useState(0);

    const [nameSelectOptions, setNameSelectOptions] = useState<Array<string>>([]);
    const accountTableHeaders = ["ID", "Name", "Role", "Status"];
    const roleSelectOptions: any[] = ["User", "Admin"];
    const statusSelectOptions: any[] = ["Normal", "Ban"];

    const [sortBy, setSortBy] = useState<string | null>(null);
    const [orderBy, setOrderBy] = useState<string>('asc');
    const [nameFilter, setNameFilter] = useState<string | null>(null);
    const [roleFilter, setRoleFilter] = useState<string | null>(null);
    const [statusFilter, setStatusFilter] = useState<string | null>(null);

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

      const handleClearFilters =  () => {
        setNameFilter(null);
        setRoleFilter(null);
        setStatusFilter(null);
      }      
      

    useEffect(() => {
        console.log('render page.tsx');

        const fetchData = async () => {
            const userData = await fetchAccountsData();
            setAccounts(userData);
            // Dynamically generate nameSelectOptions based on unique names
            const uniqueNames = Array.from(new Set(userData.map((user) => user.username)));
            setNameSelectOptions(uniqueNames);
        }
        fetchData()
            .catch(console.error)
    }, []);

    useEffect(() => {
        console.log("Account Table Render");
        const paginateAccountData = async () => {

            if (!accounts) {
                // Handle the case where accounts is still loading or null
                return { paginatedResult: [], totalItems: 0 };
            }
            
            const result = filterAndSortArray(
                accounts,
                query,
                sortBy,
                orderBy,
                {
                    username: nameFilter,
                    role: roleFilter,
                    status: statusFilter
                })
            const totalItems = result.length;
            const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
            const endIndex = startIndex + ITEMS_PER_PAGE;
            const paginatedResult = result.slice(startIndex, endIndex);

            return { paginatedResult, totalItems };
        }

        const fetchData = async () => {
            await paginateAccountData().then((value) => {
                const { paginatedResult, totalItems } = value;
                setPaginatedResult(paginatedResult);
                setTotalItems(totalItems);
            })
        };

        fetchData();
    }, [query, 
        sortBy, 
        orderBy, 
        nameFilter, 
        roleFilter, 
        statusFilter, 
        currentPage, 
        accounts]); // Run this effect when currentPage or accounts changes

    const fetchAccountsData = async () => {
        const templateAccounts: Array<UserType> = [
            {
                id: '1',
                username: 'Nguyễn Minh Quang',
                email: '20127605@student.hcmus.edu.vn',
                avatarUrl: 'https://i.pravatar.cc/150?u=1',
                role: 'user',
                status: 'ban',
                refresh_token: '',
                access_token: '',
            },
            {
                id: '2',
                username: 'Lê Hoàng Khanh Nguyên',
                email: '20127679@student.hcmus.edu.vn',
                avatarUrl: 'https://i.pravatar.cc/150?u=2',
                role: 'user',
                status: 'ban',
                refresh_token: '',
                access_token: '',
            },
            {
                id: '3',
                username: 'Lăng Thảo Thảo',
                email: '20127629@student.hcmus.edu.vn',
                avatarUrl: 'https://i.pravatar.cc/150?u=3',
                role: 'admin',
                status: 'normal',
                refresh_token: '',
                access_token: '',
            },
            {
                id: '4',
                username: 'Lê Hoài Phương',
                email: '20127598@student.hcmus.edu.vn',
                avatarUrl: 'https://i.pravatar.cc/150?u=4',
                role: 'admin',
                status: 'normal',
                refresh_token: '',
                access_token: '',
            },
            {
                id: '5',
                username: 'Hoàng Hữu Minh An',
                email: '20127102@student.hcmus.edu.vn',
                avatarUrl: 'https://i.pravatar.cc/150?u=5',
                role: 'admin',
                status: 'normal',
                refresh_token: '',
                access_token: '',
            },
            {
                id: '6',
                username: 'Huỳnh Minh Chiến',
                email: '20127444@student.hcmus.edu.vn',
                avatarUrl: 'https://i.pravatar.cc/150?u=6',
                role: 'user',
                status: 'normal',
                refresh_token: '',
                access_token: '',
            },
            {
                id: '7',
                username: 'Nguyễn Hoàng Phúc',
                email: '20127523@student.hcmus.edu.vn',
                avatarUrl: 'https://i.pravatar.cc/150?u=7',
                role: 'user',
                status: 'normal',
                refresh_token: '',
                access_token: '',
            },
            {
                id: '8',
                username: 'Lê Duẩn',
                email: '20127123@student.hcmus.edu.vn',
                avatarUrl: 'https://i.pravatar.cc/150?u=8',
                role: 'user',
                status: 'ban',
                refresh_token: '',
                access_token: '',
            },
            {
                id: '9',
                username: 'Lê Cung Tiến',
                email: '20127034@student.hcmus.edu.vn',
                avatarUrl: 'https://i.pravatar.cc/150?u=9',
                role: 'user',
                status: 'normal',
                refresh_token: '',
                access_token: '',
            },
            {
                id: '10',
                username: 'Nguyễn Đăng Khoa',
                email: '20127528@student.hcmus.edu.vn',
                avatarUrl: 'https://i.pravatar.cc/150?u=10',
                role: 'user',
                status: 'normal',
                refresh_token: '',
                access_token: '',
            },
            {
                id: '11',
                username: 'Bùi Thị Dung',
                email: '20127349@student.hcmus.edu.vn',
                avatarUrl: 'https://i.pravatar.cc/150?u=11',
                role: 'admin',
                status: 'ban',
                refresh_token: '',
                access_token: '',
            },
            {
                id: '12',
                username: 'Bành Hảo Toàn',
                email: '20127646@student.hcmus.edu.vn',
                avatarUrl: 'https://i.pravatar.cc/150?u=12',
                role: 'user',
                status: 'ban',
                refresh_token: '',
                access_token: '',
            },
        ];
        return templateAccounts;
    }

    const deleteAccountHandler = (currentUser: any) => {
        if (!accounts) {
            // Handle the case where accounts is still loading or null
            return;
        }

        const updatedUsers = accounts.filter((user: any) => {
            return user.id !== currentUser.id;
        });
        setAccounts(updatedUsers);
    }

    const banAccountHandler = (currentUser: any) => {
        if (!accounts) {
            // Handle the case where accounts is still loading or null
            return;
        }
        const updatedUsers = accounts.map((user: any) => {
            if (user.id === currentUser.id && currentUser.status === 'ban') {
                return { ...user, status: 'normal' };
            }
            else if (user.id === currentUser.id && currentUser.status === 'normal') {
                return { ...user, status: 'ban' };
            }
            return user;
        });
        setAccounts(updatedUsers);
    }

    if (accounts === null) {
        // Render a loading state or return null
        return <div className="mx-auto max-w-screen-2xl p-4 md:p-6 2xl:p-10 bg-slate-100">Loading...</div>;
    }



    return (
        <React.Fragment>
            <div className="mx-auto max-w-screen-2xl min-h-screen p-4 md:p-6 2xl:p-10 bg-slate-100">
                <div className="text-xl breadcrumbs mx-auto max-w-screen-2xl mx-4 md:mx-6 2xl:mx-10 w-auto">
                    <ul>
                        <li><Link href="/admin/">Home</Link></li>
                        <li><Link href="/admin/account"><b>Account</b></Link></li>
                    </ul>
                </div>
                <div className="flex flex-col lg:grid lg:grid-cols-3 mx-auto max-w-screen-2xl p-4 md:p-6 2xl:p-10">
                    <div className="lg:col-start-0 lg:col-end-2">
                        <label className="form-control w-full max-w-xs">
                            <div className="label">
                                <span className="label-text">Sort by</span>
                            </div>
                            <select className="select select-bordered"
                            onChange={(e) => handleSelectChange(e.target.value, setSortBy)}>
                                <option disabled selected>--Option--</option>
                                {
                                    accountTableHeaders.map((items, index) => {
                                        return (
                                            <option key={index} value={items.toLowerCase()}>{items}</option>
                                        )
                                    })
                                }
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
                    <div className="lg:col-start-3 lg:col-end-4 max-w-md">
                        <SearchBar placeholder="Search anything...."
                            setQuery={setQuery}
                            currentPage={currentPage} />
                    </div>
                    <div className="lg:col-start-0 lg:col-span-3">
                        <div className="form-control">
                            <div className="label">
                                <span className="label-text">Filters</span>
                            </div>
                            <div className="flex flex-row space-x-10">
                                <select className="select select-bordered w-full max-w-sm" value={nameFilter || ''}
                                onChange={(e) => handleSelectChange(e.target.value, setNameFilter)}>
                                    <option disabled selected value={''}>Name</option>
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
                                <select className="select select-bordered w-full max-w-sm" value={statusFilter || ''}
                                onChange={(e) => handleSelectChange(e.target.value, setStatusFilter)}>
                                    <option disabled selected value={""}>Status</option>
                                    {
                                        statusSelectOptions.map((items, index) => {
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
                    <div className="lg:col-start-0 lg:col-span-3">
                        <Suspense key={query + currentPage}>
                            <AccountTable
                                paginatedResult={paginatedResult}
                                totalItems={totalItems}
                                currentPage={currentPage}
                                setCurrentPage={setCurrentPage}
                                deleteAccount={deleteAccountHandler}
                                banAccount={banAccountHandler} />
                        </Suspense>
                    </div>
                </div>

            </div>
        </React.Fragment>
    );
}
