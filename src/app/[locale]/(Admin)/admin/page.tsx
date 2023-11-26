"use client";
import React, { useRef, useState } from "react";
import {FaRegEye, FaArrowUp, FaArrowRight,
    FaBars,
    FaChartSimple,
    FaChalkboardUser,
    FaChalkboard,
    FaWpforms,
    FaRegUser
} from 'react-icons/fa6'

export default function Dashboard() {
    return (
        <div className="mx-auto max-w-screen-2xl p-4 md:p-6 2xl:p-10 bg-slate-100">
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 xl:grid-cols-4 2xl:gap-7.5">
                <div className="card rounded-sm border border-stroke bg-white py-6 px-7.5 shadow-default dark:border-strokedark dark:bg-boxdark">
                    <div className="card-title text-5xl flex h-11.5 w-11.5 items-center justify-center rounded-full bg-meta-2 dark:bg-meta-4">
                        <FaRegEye className="bg-slate-200 rounded-full px-1 py-1"/>
                    </div>
                    <div className="card-body mt-4 flex items-center justify-between">
                        <div>
                            <h4 className="text-2xl font-bold text-center text-black dark:text-white">69420</h4>
                            <span className="text-sm font-medium">Total views</span>
                        </div>
                        <span className="flex items-center gap-1 text-sm font-medium text-lime-500 undefined ">
                            3.50% <span><FaArrowUp/></span>
                        </span>
                    </div>
                </div>
                <div className="card rounded-sm border border-stroke bg-white py-6 px-7.5 shadow-default dark:border-strokedark dark:bg-boxdark">
                    <div className="card-title text-5xl flex h-11.5 w-11.5 items-center justify-center rounded-full bg-meta-2 dark:bg-meta-4">
                        <FaChalkboard className="bg-slate-200 rounded-full px-1 py-1"/>
                    </div>
                    <div className="card-body mt-4 flex text-center items-center justify-between">
                        <div>
                            <h4 className="text-2xl font-bold text-black dark:text-white">3</h4>
                            <span className="text-sm font-medium">Total classes</span>
                        </div>
                        
                    </div>
                    <span className="card-actions flex flex-row justify-center gap-1 text-sm font-medium text-slate-500 hover:text-primary undefined ">
                            View details <span className="align-text-bottom"><FaArrowRight/></span>
                    </span>
                </div>
                <div className="card rounded-sm border border-stroke bg-white py-6 px-7.5 shadow-default dark:border-strokedark dark:bg-boxdark">
                    <div className="card-title text-5xl flex h-11.5 w-11.5 items-center justify-center">
                        <FaChalkboardUser className="bg-slate-200 rounded-full px-1 py-1"/>
                    </div>
                    <div className="card-body mt-4 flex text-center items-center justify-between">
                        <div>
                            <h4 className="text-2xl font-bold text-black dark:text-white">23</h4>
                            <span className="text-sm font-medium">Total teachers</span>
                        </div>
                        <span className="flex items-center gap-1 text-sm font-medium text-lime-500 undefined ">
                            3.50% <span><FaArrowUp/></span>
                        </span>
                    </div>
                    <span className="card-actions flex flex-row justify-center gap-1 text-sm font-medium text-slate-500 hover:text-primary undefined ">
                            View details <span className="align-text-bottom"><FaArrowRight/></span>
                    </span>
                </div>
                <div className="card rounded-sm border border-stroke bg-white py-6 px-7.5 shadow-default dark:border-strokedark dark:bg-boxdark">
                    <div className="card-title text-5xl flex h-11.5 w-11.5 items-center justify-center rounded-full bg-meta-2 dark:bg-meta-4">
                        <FaRegUser className="bg-slate-200 rounded-full px-1 py-1"/>
                    </div>
                    <div className="card-body mt-4 flex text-center items-center justify-between">
                        <div>
                            <h4 className="text-2xl font-bold text-black dark:text-white">694</h4>
                            <span className="text-sm font-medium">Total students</span>
                        </div>
                        <span className="flex items-center gap-1 text-sm font-medium text-lime-500 undefined ">
                            3.50% <span><FaArrowUp/></span>
                        </span>
                    </div>
                    <span className="card-actions flex flex-row justify-center gap-1 text-sm font-medium text-slate-500 hover:text-primary undefined ">
                            View details <span className="align-text-bottom"><FaArrowRight/></span>
                    </span>
                </div>
            
            </div>
        </div>
    );
}
