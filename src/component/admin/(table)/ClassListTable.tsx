import { FaRegEye, FaRegTrashCan, FaBan, FaPenToSquare } from 'react-icons/fa6'
import Link from 'next/link';
import Pagination from '@/component/admin/Pagination';
import React, { useState, useEffect } from 'react';
import DeletePopupModal from '@/component/admin/(modal)/DeletePopupModal';
import EditFieldModal from '@/component/admin/(modal)/EditFieldModal';

const ITEMS_PER_PAGE = 10;

interface ClassListTableProps {
    paginatedResult: any;
    totalItems: number;
    currentPage: number;
    setCurrentPage: (value: number) => void
    deleteClassListItem: (ClassList: any) => void;
    editClassListItem: (_fullname: any, _role: any, _studentId: any, currentItem: any) => void;
}

export default async function ClassListTable(props: ClassListTableProps) {
    // const context = useClassList();
    const totalPages =
        props.totalItems % ITEMS_PER_PAGE === 0
            ? props.totalItems / ITEMS_PER_PAGE
            : (props.totalItems - (props.totalItems % ITEMS_PER_PAGE)) / ITEMS_PER_PAGE + 1;

    const startIndex = (props.currentPage - 1) * ITEMS_PER_PAGE + 1;
    const endIndex = Math.min(startIndex + ITEMS_PER_PAGE - 1, props.totalItems);

    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [isEditFieldModalOpen, setIsEditFieldModalOpen] = useState(false);
    const [affectedClassList, setAffectedClassList] = useState<any>(null);

    const openDeleteModal = (currentUser: any) => {
        setAffectedClassList(currentUser);
        setIsDeleteModalOpen(true);
    };

    const closeDeleteModal = () => {
        setAffectedClassList(null);
        setIsDeleteModalOpen(false);
    };

    const handleDelete = () => {
        if (affectedClassList) props.deleteClassListItem(affectedClassList);
        closeDeleteModal();
    };

    const openEditModal = (currentUser: any) => {
        setAffectedClassList(currentUser);
        setIsEditFieldModalOpen(true);
    };

    const closeEditModal = () => {
        setAffectedClassList(null);
        setIsEditFieldModalOpen(false);
    };

    const handleEdit = (_fullname: any, _role: any, _studentId: any) => {
        if (affectedClassList) props.editClassListItem(_fullname, _role, _studentId, affectedClassList);
        closeEditModal();
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
            {isEditFieldModalOpen && (
                <EditFieldModal 
                    affectedClassList={affectedClassList}
                    onCancel={closeEditModal}
                    onSave={handleEdit}
                />
            )}

            <div className="overflow-x-auto mt-5 bg-white border shadow-lg">
                <table className="table">
                    {/* head */}
                    <thead>
                        <tr>
                            <th>ClassID</th>
                            <th>UserID</th>
                            <th>FullName</th>
                            <th>Role</th>
                            <th>StudentID</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            props.paginatedResult.map((items: any, index: number) => (
                                <tr key={index}
                                    className="hover:bg-gray-100 cursor-pointer hover:border-1 hover:border-gray-200"
                                >
                                    <td>{items.class_id}</td>
                                    <td>{items.user_id}</td>
                                    <td>{items.fullname}</td>
                                    {
                                        items.role === 'teacher' ?
                                            (
                                                <td>
                                                    <span className="inline-flex rounded-full bg-opacity-10 py-1 px-3 text-sm font-medium text-yellow-800 bg-yellow-200 ring-1 ring-inset ring-yellow-600/20">Teacher</span>
                                                </td>
                                            )
                                            :
                                            (
                                                <td>
                                                    <span className="inline-flex rounded-full bg-opacity-10 py-1 px-3 text-sm font-medium bg-blue-100 text-blue-700 ring-1 ring-inset ring-blue-700/10">Student</span>
                                                </td>
                                            )
                                    }
                                    <td>{items.student_id}</td>
                                    <th>
                                        <div className="flex flex-row justify-start space-x-2">
                                            <button className="cursor-pointer hover:text-primary"
                                                onClick={() => openDeleteModal(items)}>
                                                <FaRegTrashCan />
                                            </button>
                                            <button className="cursor-pointer hover:text-primary"
                                                onClick={() => openEditModal(items)}>
                                                <FaPenToSquare />
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
                            limit={ITEMS_PER_PAGE}
                            current={props.currentPage}
                            onChange={(page) => props.setCurrentPage(page)}
                        />
                    </div>
                </div>
            </div>
        </React.Fragment>
    )
}