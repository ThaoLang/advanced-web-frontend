"use client";

import { useEffect, useRef, useState } from 'react';
import AuthForm from '@/component/admin/AuthForm';

export default function Auth() {
    const ref = useRef(null);
    const [showSuccessMsg, setShowSuccessMsg] = useState(true);
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
    );
}