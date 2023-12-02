"use client";
import React, { useState, useEffect } from "react";
import Link from 'next/link';
import AccountTable from '@/component/admin/AccountTable'
import SearchBar from '@/component/admin/SearchBar'
import { Suspense } from 'react';

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

    useEffect(() => {
        console.log('render page.tsx');

        const fetchData = async () => {
            const userData = await fetchAccountsData();
            setAccounts(userData);
        }
        fetchData()
            .catch(console.error)
    }, []);

    const fetchAccountsData = async () => {
        return [
            {
                id: 'USER0001',
                name: 'Nguyễn Minh Quang',
                email: '20127605@student.hcmus.edu.vn',
                avatar: 'https://i.pravatar.cc/150?u=1',
                role: 'student',
                status: 'ban'
            },
            {
                id: 'USER0002',
                name: 'Lê Hoàng Khanh Nguyên',
                email: '20127679@student.hcmus.edu.vn',
                avatar: 'https://i.pravatar.cc/150?u=2',
                role: 'teacher',
                status: 'ban'
            },
            {
                id: 'USER0003',
                name: 'Lăng Thảo Thảo',
                email: '20127629@student.hcmus.edu.vn',
                avatar: 'https://i.pravatar.cc/150?u=3',
                role: 'admin',
                status: 'normal'
            },
            {
                id: 'USER0004',
                name: 'Lê Hoài Phương',
                email: '20127598@student.hcmus.edu.vn',
                avatar: 'https://i.pravatar.cc/150?u=4',
                role: 'admin',
                status: 'normal'
            },
            {
                id: 'USER0005',
                name: 'Hoàng Hữu Minh An',
                email: '20127102@student.hcmus.edu.vn',
                avatar: 'https://i.pravatar.cc/150?u=5',
                role: 'admin',
                status: 'normal'
            },
            {
                id: 'USER0006',
                name: 'Huỳnh Minh Chiến',
                email: '20127444@student.hcmus.edu.vn',
                avatar: 'https://i.pravatar.cc/150?u=6',
                role: 'teacher',
                status: 'normal'
            },
            {
                id: 'USER0007',
                name: 'Nguyễn Hoàng Phúc',
                email: '20127523@student.hcmus.edu.vn',
                avatar: 'https://i.pravatar.cc/150?u=7',
                role: 'student',
                status: 'normal'
            },
            {
                id: 'USER0008',
                name: 'Lê Duẩn',
                email: '20127123@student.hcmus.edu.vn',
                avatar: 'https://i.pravatar.cc/150?u=8',
                role: 'student',
                status: 'ban'
            },
            {
                id: 'USER0009',
                name: 'Lê Cung Tiến',
                email: '20127034@student.hcmus.edu.vn',
                avatar: 'https://i.pravatar.cc/150?u=9',
                role: 'student',
                status: 'normal'
            },
            {
                id: 'USER0010',
                name: 'Nguyễn Đăng Khoa',
                email: '20127528@student.hcmus.edu.vn',
                avatar: 'https://i.pravatar.cc/150?u=10',
                role: 'teacher',
                status: 'normal'
            },
            {
                id: 'USER0011',
                name: 'Bùi Thị Dung',
                email: '20127349@student.hcmus.edu.vn',
                avatar: 'https://i.pravatar.cc/150?u=11',
                role: 'admin',
                status: 'ban'
            },
        ]
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

            <div className="mx-auto max-w-screen-2xl p-4 md:p-6 2xl:p-10 bg-slate-100">
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
                                accounts={accounts}
                                query={query}
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
