"use client";
import AuthForm from '@/component/AuthForm';
import React, { useRef } from 'react'

export default function Auth() {
  const ref = useRef(null);
  React.useEffect(() => {
    import("@lottiefiles/lottie-player");
  });

  const lottie =  (
    <lottie-player
      id="firstLottie"
      ref={ref}
      autoPlay
      loop
      mode="normal"
      src="https://lottie.host/70be53ac-d1bc-48bd-a429-51d2c88ffd0e/Gj57p6J6EA.json"
      style={{ width: "500px", height: "500px" }}
      className="absolute bottom-4"
    />
  )  

  return (
    <div className='flex justify-center items-center space-x-2 h-screen'>
      <div className="hidden md:block">
        {lottie}
      </div>      
      <AuthForm />
    </div>
  )
}
