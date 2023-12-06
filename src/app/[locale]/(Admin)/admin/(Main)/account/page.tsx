"use client";
import React, { useState, useEffect } from "react";
import Link from 'next/link';
import AccountTable from '@/component/admin/AccountTable'
import SearchBar from '@/component/admin/SearchBar'
import { Suspense } from 'react';
import { UserType } from "@/model/UserType";

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

    useEffect(() => {
        console.log('render page.tsx');

        const fetchData = async () => {
            const userData = await fetchAccountsData();
            setAccounts(userData);
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

            const result = filterArrayByQuery(accounts, query);
            const totalItems = result.length;

            const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
            const endIndex = startIndex + ITEMS_PER_PAGE;
            const paginatedResult = result.slice(startIndex, endIndex);

            return { paginatedResult, totalItems };
        }

        const fetchData = async () => {
            const response = await paginateAccountData().then((value) => {
                const { paginatedResult, totalItems } = value;
                setPaginatedResult(paginatedResult);
                setTotalItems(totalItems);
            })
        };

        fetchData();
    }, [query, currentPage, accounts]); // Run this effect when currentPage or accounts changes

    const fetchAccountsData = async () => {
        const templateAccounts: Array<UserType> = [
            {
                id: '1',
                username: 'Nguyễn Minh Quang',
                email: '20127605@student.hcmus.edu.vn',
                avatarUrl: 'https://i.pravatar.cc/150?u=1',
                role: {
                    id: '2',
                    name: 'user'
                },
                status: 'ban',
                refresh_token: '',
                access_token: '',
            },
            {
                id: '2',
                username: 'Lê Hoàng Khanh Nguyên',
                email: '20127679@student.hcmus.edu.vn',
                avatarUrl: 'https://i.pravatar.cc/150?u=2',
                role: {
                    id: '2',
                    name: 'user'
                },
                status: 'ban',
                refresh_token: '',
                access_token: '',
            },
            {
                id: '3',
                username: 'Lăng Thảo Thảo',
                email: '20127629@student.hcmus.edu.vn',
                avatarUrl: 'https://i.pravatar.cc/150?u=3',
                role: {
                    id: '1',
                    name: 'admin'
                },
                status: 'normal',
                refresh_token: '',
                access_token: '',
            },
            {
                id: '4',
                username: 'Lê Hoài Phương',
                email: '20127598@student.hcmus.edu.vn',
                avatarUrl: 'https://i.pravatar.cc/150?u=4',
                role: {
                    id: '1',
                    name: 'admin'
                },
                status: 'normal',
                refresh_token: '',
                access_token: '',
            },
            {
                id: '5',
                username: 'Hoàng Hữu Minh An',
                email: '20127102@student.hcmus.edu.vn',
                avatarUrl: 'https://i.pravatar.cc/150?u=5',
                role: {
                    id: '1',
                    name: 'admin'
                },
                status: 'normal',
                refresh_token: '',
                access_token: '',
            },
            {
                id: '6',
                username: 'Huỳnh Minh Chiến',
                email: '20127444@student.hcmus.edu.vn',
                avatarUrl: 'https://i.pravatar.cc/150?u=6',
                role: {
                    id: '2',
                    name: 'user'
                },
                status: 'normal',
                refresh_token: '',
                access_token: '',
            },
            {
                id: '7',
                username: 'Nguyễn Hoàng Phúc',
                email: '20127523@student.hcmus.edu.vn',
                avatarUrl: 'https://i.pravatar.cc/150?u=7',
                role: {
                    id: '2',
                    name: 'user'
                },
                status: 'normal',
                refresh_token: '',
                access_token: '',
            },
            {
                id: '8',
                username: 'Lê Duẩn',
                email: '20127123@student.hcmus.edu.vn',
                avatarUrl: 'https://i.pravatar.cc/150?u=8',
                role: {
                    id: '2',
                    name: 'user'
                },
                status: 'ban',
                refresh_token: '',
                access_token: '',
            },
            {
                id: '9',
                username: 'Lê Cung Tiến',
                email: '20127034@student.hcmus.edu.vn',
                avatarUrl: 'https://i.pravatar.cc/150?u=9',
                role: {
                    id: '2',
                    name: 'user'
                },
                status: 'normal',
                refresh_token: '',
                access_token: '',
            },
            {
                id: '10',
                username: 'Nguyễn Đăng Khoa',
                email: '20127528@student.hcmus.edu.vn',
                avatarUrl: 'https://i.pravatar.cc/150?u=10',
                role: {
                    id: '2',
                    name: 'user'
                },
                status: 'normal',
                refresh_token: '',
                access_token: '',
            },
            {
                id: '11',
                username: 'Bùi Thị Dung',
                email: '20127349@student.hcmus.edu.vn',
                avatarUrl: 'https://i.pravatar.cc/150?u=11',
                role: {
                    id: '1',
                    name: 'admin'
                },
                status: 'ban',
                refresh_token: '',
                access_token: '',
            },
            {
                id: '12',
                username: 'Bành Hảo Toàn',
                email: '20127646@student.hcmus.edu.vn',
                avatarUrl: 'https://i.pravatar.cc/150?u=12',
                role: {
                    id: '2',
                    name: 'user'
                },
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
                return {...user, status: 'normal'};
            }
            else if (user.id === currentUser.id && currentUser.status === 'normal') {
                return {...user, status: 'ban'};
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
                <div className="grid grid-cols-3 mx-auto max-w-screen-2xl p-4 md:p-6 2xl:p-10">
                    <div className="col-start-3 col-end-4">
                        <SearchBar placeholder="Search user...."
                            setQuery={setQuery}
                            currentPage={currentPage} />
                    </div>
                    <div className="col-start-0 col-span-3">
                        <Suspense key={query + currentPage}>
                            <AccountTable 
                                paginatedResult={paginatedResult}
                                totalItems={totalItems}
                                currentPage={currentPage}
                                setCurrentPage={setCurrentPage}
                                deleteAccount={deleteAccountHandler}
                                banAccount={banAccountHandler}/>
                        </Suspense>
                    </div>
                </div>

            </div>
        </React.Fragment>
    );
}
