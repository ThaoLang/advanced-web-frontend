"use client";
import React, { useState } from 'react';

interface EditFieldModalProps {
    affectedClassList: any,
    onSave: (_fullname: any, _role: any, _studentId: any) => void,
    onCancel: () => void,
}


export default function EditFieldModal(props: EditFieldModalProps) {
    const [currentFullName, setCurrentFullName] = useState(props.affectedClassList.fullname);
    const [currentRole, setCurrentRole] = useState(props.affectedClassList.role);
    const [currentStudentId, setCurrentStudentId] = useState(props.affectedClassList.student_id);
    const [isStudentIdDisabled, setIsStudentIdDisabled] = useState(currentStudentId === 'Teacher');
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const [successMessage, setSuccessMessage] = useState<string | null>(null);

    //current rule is the studentIds are only use numbers
    const isOnlyNumbers = (studentId: string) => {
        const regex = /^[0-9]+$/;
        return regex.test(studentId);
    }

    const handleSwitchRole = (role: string) => {
        if (role === 'Teacher') {
            setCurrentStudentId('');
            setIsStudentIdDisabled(true);
        }
        else {
            setIsStudentIdDisabled(false);
        }
        setCurrentRole(role);
    }

    const handleSaveInfo = () => {
        if (currentRole === 'student' && !isOnlyNumbers(currentStudentId)) {
            setErrorMessage("Student ID must be a chain of numbers");
            setTimeout(() => {
                setErrorMessage(null);
            }, 2000);
            return;
        }
        props.onSave(currentFullName, currentRole, currentStudentId);
    }

    return (
        <React.Fragment>
            {errorMessage ? (
                <div className="toast toast-end z-[100]">
                    <div className="alert alert-error">
                        <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                        <span>{errorMessage}</span>
                    </div>
                </div>
            ): null}
            {/* {successMessage ?? (
                <div className="toast toast-end">

                    <div role="alert" className="z-[100] mx-auto mt-4 alert alert-success">
                        <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                        <span>{successMessage}</span>
                    </div>
                </div>
            )} */}
            <div id="popup-modal"
                className="fixed top-0 right-0 left-0 bottom-0 bg-gray-500 bg-opacity-50 flex items-center justify-center z-50 p-4 overflow-y-auto">
                <div className="relative w-full max-w-md max-h-full">
                    <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
                        <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
                            <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                                Edit Row Infos
                            </h3>
                        </div>
                        {/* Close button */}
                        <button type="button"
                            className="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ml-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                            onClick={props.onCancel}
                            data-modal-hide="popup-modal">
                            <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                            </svg>
                        </button>
                        <form className="p-4 md:p-5 space-y-1">
                            <label className="form-control w-full max-w-xs">
                                <div className="label">
                                    <span className="label-text block mb-2 text-sm font-medium text-gray-900 dark:text-white">ClassID</span>
                                </div>
                                <input type="text" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                                    value={props.affectedClassList.class_id} disabled />
                            </label>
                            <label className="form-control w-full max-w-xs">
                                <div className="label">
                                    <span className="label-text block mb-2 text-sm font-medium text-gray-900 dark:text-white">UserID</span>
                                </div>
                                <input type="text" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                                    value={props.affectedClassList.user_id} disabled />
                            </label>
                            <label className="form-control w-full max-w-xs">
                                <div className="label">
                                    <span className="label-text block mb-2 text-sm font-medium text-gray-900 dark:text-white">FullName</span>
                                </div>
                                <input type="text" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                                    value={currentFullName}
                                    onChange={(e) => setCurrentFullName(e.target.value)} />
                            </label>
                            <label className="form-control w-full max-w-xs">
                                <div className="label">
                                    <span className="label-text block mb-2 text-sm font-medium text-gray-900 dark:text-white">Role</span>
                                </div>
                                <select className="select select-bordered"
                                    value={currentRole}
                                    onChange={(e) => handleSwitchRole(e.target.value)}
                                >
                                    <option value="student">Student</option>
                                    <option value="teacher">Teacher</option>
                                </select>
                            </label>
                            <label className="form-control w-full max-w-xs">
                                <div className="label">
                                    <span className="label-text block mb-2 text-sm font-medium text-gray-900 dark:text-white">StudentID</span>
                                </div>
                                <input type="text" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                                    value={currentStudentId}
                                    onChange={(e) => setCurrentStudentId(e.target.value)}
                                    disabled={isStudentIdDisabled} />
                            </label>
                            <div className="pt-5 flex flex-row justify-end">
                                <button data-modal-hide="popup-modal"
                                    type="button"
                                    className="mx-5 text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600"
                                    onClick={props.onCancel}>
                                    Cancel
                                </button>
                                <button data-modal-hide="popup-modal"
                                    type="button"
                                    className="mx-5 text-white bg-cyan-600 hover:bg-cyan-800 focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center mr-2"
                                    onClick={handleSaveInfo}>
                                    Save
                                </button>
                            </div>
                        </form>
                        {/* Fields */}

                    </div>
                </div>
            </div>
        </React.Fragment>
    );
}