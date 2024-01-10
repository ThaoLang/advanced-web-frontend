"use client";
import { FaRegEye, FaRegTrashCan, FaBan } from 'react-icons/fa6'
import Link from 'next/link';
import Pagination from '@/component/admin/Pagination';
import React, { useState, useEffect } from 'react';
import DeletePopupModal from '@/component/admin/(modal)/DeletePopupModal';
import BanPopupModal from '../(modal)/BanPopupModal';
import { UserType } from '@/model/UserType';
import { useRouter } from 'next/navigation';

interface ClassTableProps {
    paginatedResult: any;
    totalItems: any;
    currentPage: number;
    itemsPerPage: number;
    setCurrentPage: (value: number) => void
    deleteClass: (Class: any) => void;
    banClass: (Class: any) => void;
}

export default async function ClassTable(props: ClassTableProps) {
    const router = useRouter();
    const totalPages =
        props.totalItems % props.itemsPerPage === 0
            ? props.totalItems / props.itemsPerPage
            : (props.totalItems - (props.totalItems % props.itemsPerPage)) / props.itemsPerPage + 1;

    const startIndex = (props.currentPage - 1) * props.itemsPerPage + 1;
    const endIndex = Math.min(startIndex + props.itemsPerPage - 1, props.totalItems);

    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [isBanModalOpen, setIsBanModalOpen] = useState(false);
    const [affectedClass, setAffectedClass] = useState<any>(null);
    const definedStatus = {ban: "inactive", normal: "active"};
    const messages = {
        to_ban: 
        `Are you sure you want to inactive this class?
        Students and teachers will no longer be able to enter this class.
        `, 
        to_normal:  
        `
        Are you sure you want to activate this class again? 
        Students and teachers will now have access to enter this class.
        `
    };
    const btn_switch_messages = {ban: "Inactive", unban: "Active"};

    const openDeleteModal = (currentUser: any) => {
        setAffectedClass(currentUser);
        setIsDeleteModalOpen(true);
    };

    const closeDeleteModal = () => {
        setAffectedClass(null);
        setIsDeleteModalOpen(false);
    };

    const handleDelete = () => {
        if (affectedClass) props.deleteClass(affectedClass);
        closeDeleteModal();
    };

    const openBanModal = (currentUser: any) => {
        console.log('Opening Ban Modal with user:', currentUser);
        setAffectedClass(currentUser);
        setIsBanModalOpen(true);
    };

    const closeBanModal = () => {
        setAffectedClass(null);
        setIsBanModalOpen(false);
    };

    const handleBan = () => {
        if (affectedClass) props.banClass(affectedClass);
        closeBanModal();
    };

    function handleRowDoubleClick(_class: any): void {
        router.push(`/admin/class/${_class._id}`);
    }

    return (
        <React.Fragment>
            {isDeleteModalOpen && (
                <DeletePopupModal
                    title="Confirm Deletion"
                    description="Are you sure you want to remove this class?"
                    onClose={closeDeleteModal}
                    onDelete={handleDelete}
                />
            )}
            {isBanModalOpen && (
                <BanPopupModal
                    currentBanStatus={affectedClass.status}
                    title="Change Class Ban Status"
                    description=""
                    onClose={closeBanModal}
                    onBan={handleBan} 
                    definedStatus={definedStatus} 
                    messages={messages} 
                    btn_switch_messages={btn_switch_messages}/>
            )}
            <div className="overflow-x-auto mt-5 bg-white">
                <table className="table">
                    {/* head */}
                    <thead>
                        <tr>
                            <th>No.</th>
                            <th>Name</th>
                            <th>Host name</th>
                            <th>Description</th>
                            <th>Status</th>
                            <th>Actions</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            props.paginatedResult.map((items: any, index: number) => {
                                return (
                                <tr key={index} 
                                className="hover:bg-gray-100 cursor-pointer hover:border-1 hover:border-gray-200"
                                onDoubleClick={() => handleRowDoubleClick(items)}>
                                    <td>{(props.currentPage - 1) * props.itemsPerPage + index + 1}</td>
                                    <td>{items.name}</td>
                                    <td>
                                        <div className="flex items-center gap-3">
                                            <div className="avatar">
                                                <div className="mask mask-squircle w-12 h-12">
                                                    <img src={items.host_avatarUrl} alt="User avatar" />
                                                </div>
                                            </div>
                                            <div>
                                                <div className="font-bold">{items.host_username}</div>
                                                {/* <div className="text-sm opacity-50">{items.email}</div> */}
                                            </div>
                                        </div>
                                    </td>
                                    <td>{items.description}</td>
                                    {
                                        items.status === 'inactive' ?
                                            (
                                                <td>
                                                    <span className="inline-flex items-center rounded-full bg-slate-50 px-3 py-1 text-sm font-medium text-slate-700 ring-1 ring-inset ring-slate-600/10">Inactive</span>
                                                </td>
                                            )
                                            :
                                            (
                                                <td>
                                                    <span className="inline-flex items-center rounded-full bg-green-50 px-2 py-1 text-sm font-medium text-green-700 ring-1 ring-inset ring-green-600/20">Active</span>
                                                </td>
                                            )
                                    }
                                    <th>
                                        <div className="flex flex-row justify-start space-x-2">
                                            <div className="cursor-pointer hover:text-primary">
                                                <Link href={`/admin/class/${items._id}`}>
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
                            )})
                        }
                    </tbody>
                </table>
                <div className="mt-10 w-full flex flex-col lg:flex-row justify-center items-center lg:justify-between">
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