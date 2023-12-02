import { FaRegEye, FaRegTrashCan, FaBan } from 'react-icons/fa6'
import Link from 'next/link';
import Pagination from '@/component/admin/Pagination';
import React, { useState, useEffect } from 'react';
import DeletePopupModal from '@/component/admin/(modal)/DeletePopupModal';
import BanPopupModal from './(modal)/BanPopupModal';

const ITEMS_PER_PAGE = 5;

interface AccountTableProps {
    accounts: any;
    query: string;
    currentPage: number;
    setCurrentPage: (value: number) => void
    deleteAccount: (account: any) => void;
    banAccount: (account: any) => void;
}

export default async function AccountTable(props: AccountTableProps) {

    const [paginatedResult, setPaginatedResult] = useState<any>([]);
    const [totalItems, setTotalItems] = useState(0);

    useEffect(() => {
        console.log("Account Table Render");
        const paginateAccountData = async () => {

            if (!props.accounts) {
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

            const result = filterArrayByQuery(props.accounts, props.query);
            const totalItems = result.length;

            const startIndex = (props.currentPage - 1) * ITEMS_PER_PAGE;
            const endIndex = startIndex + ITEMS_PER_PAGE;
            const paginatedResult = result.slice(startIndex, endIndex);

            return { paginatedResult, totalItems };
        }

        const fetchData = async () => {
            const response = await paginateAccountData();
            if (!response) return;
            const { paginatedResult, totalItems } = response;
            setPaginatedResult(paginatedResult);
            setTotalItems(totalItems);
        };

        fetchData();
    }, [props.currentPage, props.accounts]); // Run this effect when currentPage or accounts changes

    const totalPages =
        totalItems % ITEMS_PER_PAGE === 0
            ? totalItems / ITEMS_PER_PAGE
            : (totalItems - (totalItems % ITEMS_PER_PAGE)) / ITEMS_PER_PAGE + 1;

    const startIndex = (props.currentPage - 1) * ITEMS_PER_PAGE + 1;
    const endIndex = Math.min(startIndex + ITEMS_PER_PAGE - 1, totalItems);

    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [isBanModalOpen, setIsBanModalOpen] = useState(false);
    const [affectedAccount, setAffectedAccount] = useState<any>(null);

    const openDeleteModal = (currentUser: any) => {
        setAffectedAccount(currentUser);
        setIsDeleteModalOpen(true);
    };

    const closeDeleteModal = () => {
        setAffectedAccount(null);
        setIsDeleteModalOpen(false);
    };

    const handleDelete = () => {
        if (affectedAccount) props.deleteAccount(affectedAccount);
        closeDeleteModal();
    };

    const openBanModal = (currentUser: any) => {
        console.log('Opening Ban Modal with user:', currentUser);
        setAffectedAccount(currentUser);
        setIsBanModalOpen(true);
    };

    const closeBanModal = () => {
        setAffectedAccount(null);
        setIsBanModalOpen(false);
    };

    const handleBan = () => {
        if (affectedAccount) props.banAccount(affectedAccount);
        closeBanModal();
    };

    return (
        <React.Fragment>
            {isDeleteModalOpen && (
                <DeletePopupModal
                    title="Confirm Deletion"
                    description="Are you sure you want to remove your presence?"
                    onClose={closeDeleteModal}
                    onDelete={handleDelete}
                />
            )}
            {isBanModalOpen && (
                <BanPopupModal
                    banStatus={affectedAccount.status}
                    title="Change Account Ban Status"
                    description=""
                    onClose={closeBanModal}
                    onBan={handleBan}
                />
            )}
            <div className="overflow-x-auto mt-5 bg-white">
                <table className="table">
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
                                <tr key={index} className="hover:bg-gray-100 cursor-pointer hover:border-1 hover:border-gray-200">
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
                                                <div className="text-sm opacity-50">{items.email}</div>
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
                                                <Link href={`/admin/account/${items.id}`} passHref legacyBehavior>
                                                    <FaRegEye />
                                                </Link>
                                            </div>
                                            <button className="cursor-pointer hover:text-primary"
                                                onClick={() => openDeleteModal(items)}>
                                                <FaRegTrashCan />
                                            </button>
                                            <button className="cursor-pointer hover:text-primary"
                                                onClick={() => openBanModal(items)}>
                                                <FaBan />
                                            </button>
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
                <div className="mt-10 w-full flex flex-col lg:flex-row justify-center lg:justify-between">
                    <div className="mx-2 my-3">Showing {startIndex} to {endIndex} of {totalItems} entries</div>
                    <div className="mx-2 my-3">
                        <Pagination
                            total={totalPages}
                            limit={5}
                            current={props.currentPage}
                            onChange={(page) => props.setCurrentPage(page)}
                        />
                    </div>
                </div>
            </div>
        </React.Fragment>
    )
}