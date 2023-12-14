import { FaRegEye, FaRegTrashCan, FaBan } from 'react-icons/fa6'
import Link from 'next/link';
import Pagination from '@/component/admin/Pagination';
import React, { useState, useEffect } from 'react';
import DeletePopupModal from '@/component/admin/(modal)/DeletePopupModal';
import BanPopupModal from './(modal)/BanPopupModal';
import { useAccount } from '@/context/AccountContext';

const ITEMS_PER_PAGE = 5;

interface AccountTableProps {
    paginatedResult: any;
    totalItems: number;
    currentPage: number;
    setCurrentPage: (value: number) => void
    deleteAccount: (account: any) => void;
    banAccount: (account: any) => void;
}

export default async function AccountTable(props: AccountTableProps) {
    const context = useAccount();
    const totalPages =
        props.totalItems % ITEMS_PER_PAGE === 0
            ? props.totalItems / ITEMS_PER_PAGE
            : (props.totalItems - (props.totalItems % ITEMS_PER_PAGE)) / ITEMS_PER_PAGE + 1;

    const startIndex = (props.currentPage - 1) * ITEMS_PER_PAGE + 1;
    const endIndex = Math.min(startIndex + ITEMS_PER_PAGE - 1, props.totalItems);

    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [isBanModalOpen, setIsBanModalOpen] = useState(false);
    const [affectedAccount, setAffectedAccount] = useState<any>(null);
    const definedStatus = {ban: "ban", normal: "normal"};
    const messages = {
        to_ban: "Are you sure you want to ban your presence?", 
        to_normal: "Are you sure you want to unban your presence?"
    };
    const btn_switch_messages = {ban: "Ban", unban: "Unban"};
    


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
                    currentBanStatus={affectedAccount.status}
                    title="Change Account Ban Status"
                    onClose={closeBanModal}
                    onBan={handleBan} 
                    definedStatus={definedStatus} 
                    messages={messages} 
                    btn_switch_messages={btn_switch_messages}                />
            )}
            <div className="overflow-x-auto mt-5 bg-white border shadow-lg">
                <table className="table">
                    {/* head */}
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Username</th>
                            <th>Role</th>
                            <th>Status</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            props.paginatedResult.map((items: any, index: number) => (
                                <tr key={index} className="hover:bg-gray-100 cursor-pointer hover:border-1 hover:border-gray-200">
                                    <td>{items.id}</td>
                                    <td>
                                        <div className="flex items-center gap-3">
                                            <div className="avatar">
                                                <div className="mask mask-squircle w-12 h-12">
                                                    <img src={items.avatarUrl} alt="User avatar" />
                                                </div>
                                            </div>
                                            <div>
                                                <div className="font-bold">{items.username}</div>
                                                <div className="text-sm opacity-50">{items.email}</div>
                                            </div>
                                        </div>
                                    </td>
                                    {
                                        items.role === 'admin' ?
                                            (
                                                <td>
                                                    <span className="inline-flex rounded-full bg-opacity-10 py-1 px-3 text-sm font-medium text-yellow-800 bg-yellow-200 ring-1 ring-inset ring-yellow-600/20">Admin</span>
                                                </td>
                                            )
                                            :
                                            (
                                                <td>
                                                    <span className="inline-flex rounded-full bg-opacity-10 py-1 px-3 text-sm font-medium bg-blue-100 text-blue-700 ring-1 ring-inset ring-blue-700/10">User</span>
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
                                                    <button onClick={() => context.account = items}>
                                                        <FaRegEye />
                                                    </button>
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
                </table>
                <div className="lg:mt-10 w-full flex flex-col lg:flex-row justify-center items-center lg:justify-between">
                    <div className="mx-5 my-5">Showing {startIndex} to {endIndex} of {props.totalItems} entries</div>
                    <div className="mx-10 my-5">
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