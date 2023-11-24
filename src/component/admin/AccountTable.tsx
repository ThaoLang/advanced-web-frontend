import { FaRegEye, FaRegTrashCan, FaBan } from 'react-icons/fa6'
import { useMemo, useState } from 'react';
import Pagination from '@/component/admin/Pagination';

const ITEMS_PER_PAGE = 5;

interface AccountTableProps {
    currentPage: number;
    setCurrentPage: (value: number) => void
    fetchAccountList: () => Promise<{paginatedResult: any, totalItems: number}>;
}

export default async function AccountTable(props: AccountTableProps ) {
    
    const {paginatedResult, totalItems} = await props.fetchAccountList();
    
    const totalPages = 
        totalItems % ITEMS_PER_PAGE === 0
          ? totalItems / ITEMS_PER_PAGE
          : (totalItems - (totalItems % ITEMS_PER_PAGE)) / ITEMS_PER_PAGE + 1;

    const startIndex = (props.currentPage - 1) * ITEMS_PER_PAGE + 1;
    const endIndex = Math.min(startIndex + ITEMS_PER_PAGE - 1, totalItems);

    return (
        <div className="overflow-x-auto">
            <table className="table max-h-96">
                {/* head */}
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Role</th>
                        <th>Status</th>
                        <th>Actions</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {
                        paginatedResult.map((items: any, index: number) => (
                            <tr key={index}>
                                <td>{items.id}</td>
                                <td>
                                    <div className="flex items-center gap-3">
                                        <div className="avatar">
                                            <div className="mask mask-squircle w-12 h-12">
                                                <img src={items.avatar} alt="User avatar" />
                                            </div>
                                        </div>
                                        <div>
                                            <div className="font-bold">{items.name}</div>
                                            <div className="text-sm opacity-50">{items.school_id}</div>
                                        </div>
                                    </div>
                                </td>
                                {
                                    items.role === 'student' ? 
                                    (
                                        <td>
                                            <span className="inline-flex rounded-full bg-opacity-10 py-1 px-3 text-sm font-medium bg-blue-100 text-blue-700 ring-1 ring-inset ring-blue-700/10">Student</span>
                                        </td>
                                    )
                                    :
                                    items.role === 'teacher' ?
                                    (
                                        <td>
                                            <span className="inline-flex rounded-full bg-opacity-10 py-1 px-3 text-sm font-medium bg-green-100 text-green-700 ring-1 ring-inset ring-green-600/20">Teacher</span>
                                        </td>
                                    )
                                    :
                                    (
                                        <td>
                                            <span className="inline-flex rounded-full bg-opacity-10 py-1 px-3 text-sm font-medium text-yellow-800 bg-yellow-200 ring-1 ring-inset ring-yellow-600/20">Admin</span>
                                        </td>
                                    )
                                }
                                {
                                    items.status === 'ban' ? 
                                    (
                                        <td>
                                            <span className="inline-flex items-center rounded-full bg-red-50 px-3 py-1 text-sm font-medium text-red-700 ring-1 ring-inset ring-red-600/10">Ban</span>
                                        </td>
                                    )
                                    :
                                    (
                                        <td>
                                            <span className="inline-flex items-center rounded-full bg-green-50 px-2 py-1 text-sm font-medium text-green-700 ring-1 ring-inset ring-green-600/20">Normal</span>
                                        </td>
                                    )
                                }


                                <th>
                                    <div className="flex flex-row justify-start space-x-2">
                                        <div className="cursor-pointer hover:text-primary">
                                            <FaRegEye />
                                        </div>
                                        <div className="cursor-pointer hover:text-primary">
                                            <FaRegTrashCan />
                                        </div>
                                        <div className="cursor-pointer hover:text-primary">
                                            <FaBan />
                                        </div>
                                    </div>
                                </th>
                            </tr>
                        ))
                    }
                </tbody>
                {/* foot */}
                <tfoot>
                </tfoot>
                
            </table>
            <div className="w-full flex flex-col lg:flex-row justify-center lg:justify-between">
                        <div className="mx-2 my-3">Showing {startIndex} to {endIndex} of {totalItems} entries</div>
                        <Pagination
                            total={totalPages}
                            limit={5}
                            current={props.currentPage}
                            onChange={(page) => props.setCurrentPage(page)}
                            />
            </div>                        
        </div>
    )
}