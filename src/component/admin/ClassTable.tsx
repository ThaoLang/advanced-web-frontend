import { FaRegEye, FaRegTrashCan, FaBan } from 'react-icons/fa6'
import { useMemo, useState } from 'react';
import Pagination from '@/component/admin/Pagination';

const ITEMS_PER_PAGE = 5;

interface AccountTableProps {
    currentPage: number;
    setCurrentPage: (value: number) => void
    fetchClassList: () => Promise<{paginatedResult: any, totalItems: number}>;
}

export default async function ClassTable(props: AccountTableProps ) {
    
    const {paginatedResult, totalItems} = await props.fetchClassList();
    
    const totalPages = 
        totalItems % ITEMS_PER_PAGE === 0
          ? totalItems / ITEMS_PER_PAGE
          : (totalItems - (totalItems % ITEMS_PER_PAGE)) / ITEMS_PER_PAGE + 1;

    const startIndex = (props.currentPage - 1) * ITEMS_PER_PAGE + 1;
    const endIndex = Math.min(startIndex + ITEMS_PER_PAGE - 1, totalItems);

    return (
        <div className="overflow-x-auto bg-white mt-5">
            <table className="table max-h-96">
                {/* head */}
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Host name</th>
                        <th>Description</th>
                        <th>Actions</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {
                        paginatedResult.map((items: any, index: number) => (
                            <tr key={index}>
                                <td>{items.id}</td>
                                <td className="font-bold">{items.class_name}</td>
                                <td>
                                    <div className="flex items-center gap-3">
                                        <div className="avatar">
                                            <div className="mask mask-squircle w-12 h-12">
                                                <img src={items.avatar} alt="User avatar" />
                                            </div>
                                        </div>
                                        <div>
                                            <div className="font-bold">{items.host_name}</div>
                                            <div className="text-sm opacity-50">{items.email}</div>
                                        </div>
                                    </div>
                                </td>
                                <td>
                                    {items.description}
                                </td>
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