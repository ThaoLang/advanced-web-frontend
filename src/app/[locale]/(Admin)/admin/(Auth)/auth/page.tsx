"use client";

import { useEffect, useRef, useState } from 'react';
import AuthForm from '@/component/admin/AuthForm';

export default function Auth() {
    const ref = useRef(null);
    const [showSuccessMsg, setShowSuccessMsg] = useState(false);
    useEffect(() => {
        import("@lottiefiles/lottie-player");
    });
    const lottie = (
        <lottie-player
            id="firstLottie"
            ref={ref}
            autoPlay
            loop
            mode="normal"
            src="https://lottie.host/0ace940d-9d50-4c2d-9cfb-11b559fb7997/ANx1aZPdjU.json"
            style={{ width: "500px", height: "500px" }}
            className="align-center justify-center"
        />
    );

    return (
        <div>
            {showSuccessMsg && (
                <div className=" w-1/2 mx-auto mt-4 alert alert-success ">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="stroke-current shrink-0 h-6 w-6"
                        fill="none"
                        viewBox="0 0 24 24"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="1"
                            d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                    </svg>
                    <span>Registration confirm!</span>
                </div>
            )}
            <div className="mx-auto max-w-screen-2xl p-4 md:p-6 2xl:p-10">
                <div className="bg-white shadow-default">
                    <div className="flex flex-wrap items-center">
                        <div className="hidden w-full xl:block xl:w-1/2">
                            <div className="flex justify-center items-center py-17.5 px-26 text-center">
                                {/* lottie-player */}
                                <div className="hidden md:block">{lottie}</div>
                            </div>
                        </div>
                        <AuthForm showSuccessMsg={setShowSuccessMsg} />
                    </div>
                </div>
            </div>
        </div>
    );
}