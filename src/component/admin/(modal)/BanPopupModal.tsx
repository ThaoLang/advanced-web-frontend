import React from 'react';

interface BanPopupProps {
    title: string,
    description: string,
    banStatus: any,
    onClose: () => void,
    onBan: () => void,
}
export default function BanPopupModal(props: BanPopupProps) {
    console.log(props.banStatus);
    return (
        <React.Fragment>
            <div id="popup-modal"
                className="fixed top-0 right-0 left-0 bottom-0 backdrop-blur-md bg-opacity-50 bg-gray-800 flex items-center justify-center z-50 p-4 overflow-y-auto">
                <div className="relative w-full max-w-md max-h-full">
                    <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
                        <button type="button"
                            className="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ml-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                            onClick={props.onClose}
                            data-modal-hide="popup-modal">
                            <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                            </svg>
                            <span className="sr-only">{props.title}</span>
                        </button>
                        <div className="p-6 text-center">
                            <svg className="mx-auto mb-4 text-gray-400 w-12 h-12 dark:text-gray-200" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 11V6m0 8h.01M19 10a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                            </svg>
                            <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
                                {
                                    props.banStatus === 'normal' ? 
                                    <span>Are you sure you want to ban your presence?</span> : 
                                    <span>Are you sure you want to unban your presence?</span>
                                }
                            </h3>
                            <div className="flex flex-row justify-center">
                                <button data-modal-hide="popup-modal"
                                    type="button"
                                    className="mx-5 text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600"
                                    onClick={props.onClose}>
                                    Cancel
                                </button>
                                {props.banStatus === 'normal' ?
                                    <button data-modal-hide="popup-modal"
                                        type="button"
                                        className="mx-5 text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center mr-2"
                                        onClick={props.onBan}>
                                        Ban
                                    </button>
                                    :
                                    <button data-modal-hide="popup-modal"
                                        type="button"
                                        className="mx-5 text-white bg-sky-500 hover:bg-sky-800 focus:ring-4 focus:outline-none focus:ring-sky-300 dark:focus:ring-sky-800 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center mr-2"
                                        onClick={props.onBan}>
                                        Unban
                                    </button>
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </React.Fragment>
    );

}