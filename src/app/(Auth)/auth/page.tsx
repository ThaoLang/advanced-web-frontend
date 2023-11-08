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
      src="https://lottie.host/6d3f708a-276a-4c95-9cbd-4bd5152de477/f0QQhzDnhm.json"
      style={{ width: "400px", height: "400px" }}
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
