"use client";
import React, { useState } from "react";
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
    const [query, setQuery] = useState(searchParams?.query || '');
    const [currentPage, setCurrentPage] = useState(Number(searchParams?.page) || 1);

    const fetchAccountList = async () =>
    {
        const accounts = [
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
                email: '20127102',
                avatar: 'https://i.pravatar.cc/150?u=5',
                role: 'admin',  
                status: 'normal'
            },
            {
                id: 'USER0006',
                name: 'Huỳnh Minh Chiến',
                email: '20127444',
                avatar: 'https://i.pravatar.cc/150?u=6',
                role: 'teacher',
                status: 'normal'
            },
            {
                id: 'USER0007',
                name: 'Nguyễn Hoàng Phúc',
                email: '20127523',
                avatar: 'https://i.pravatar.cc/150?u=7',
                role: 'student',
                status: 'normal'
            },
            {
                id: 'USER0008',
                name: 'Lê Duẩn',
                email: '20127123',
                avatar: 'https://i.pravatar.cc/150?u=8',
                role: 'student',
                status: 'ban'
            },
            {
                id: 'USER0009',
                name: 'Lê Cung Tiến',
                email: '20127034',
                avatar: 'https://i.pravatar.cc/150?u=9',
                role: 'student',
                status: 'normal'
            },
            {
                id: 'USER0010',
                name: 'Nguyễn Đăng Khoa',
                email: '20127528',
                avatar: 'https://i.pravatar.cc/150?u=10',
                role: 'teacher',
                status: 'normal'
            },
            {
                id: 'USER0011',
                name: 'Bùi Thị Dung',
                email: '20127349',
                avatar: 'https://i.pravatar.cc/150?u=11',
                role: 'admin',
                status: 'ban'
            },
        ]
    
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
        
        return {paginatedResult, totalItems};
    }

    return (
        <div className="w-full">
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
                            currentPage={currentPage}/>
                </div>
                <div className="col-start-0 col-span-3">
                    <Suspense key={query + currentPage}>
                        <AccountTable currentPage={currentPage}
                                    setCurrentPage={setCurrentPage} 
                                    fetchAccountList={fetchAccountList} />
                        
                    </Suspense>
                </div>
            </div>
            
        </div>
    );
}
