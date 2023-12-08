"use client";
import React, { useEffect } from "react";
import { useState } from "react";
import { useRecoveryContext } from "@/context/RecoveryContext";
import { useRouter } from 'next/navigation'
import axios from "axios";

interface OTPInputProps {
  isRouting: boolean;
  nextPage: string;
  setSuccessMsg: (msg: string) => void;
  setErrorMsg: (msg: string) => void;
  showSuccessMsg: (show: boolean) => void;
  showErrorMsg: (show: boolean) => void;
}

export default function OTPInput(props: OTPInputProps) {
  const context = useRecoveryContext();
  const [timerCount, setTimer] = React.useState(60);
  const [OTPinput, setOTPinput] = useState([0, 0, 0, 0]);
  const [disable, setDisable] = useState(true);
  const router = useRouter();

  function resendOTP() {
    if (disable) return;
    const generatedOTP = Math.floor(Math.random() * 9000 + 1000);
    context.otp = generatedOTP;
    axios
      .post(context.request, {
        email: context.email,
        otp: context.otp,
      })
      .then(() => setDisable(true))
      .then(() => alert("A new OTP has succesfully been sent to your email."))
      .then(() => setTimer(60))
      .catch(console.log);
  }

  function verifyOTP() {
    if (Number(OTPinput.join("")) === context.otp) {
      props.setSuccessMsg("The code you have entered was correctly!");
      props.showSuccessMsg(true);
      setTimeout(() => {
        props.showSuccessMsg(false);
      }, 2000);
      console.log('isRouting: ', props.isRouting, props.nextPage);
      if (!props.isRouting)
        //changing component, remain on page
        context.page = props.nextPage;
      else {
        router.push(props.nextPage);
      }
      return;
    }
    props.setErrorMsg("The code you have entered is not correct, try again or re-send the link");
    props.showErrorMsg(true);
    setTimeout(() => {
      props.showErrorMsg(false);
    }, 2000);
    return;
  }

  React.useEffect(() => {
    let interval = setInterval(() => {
      setTimer((lastTimerCount) => {
        lastTimerCount <= 1 && clearInterval(interval);
        if (lastTimerCount <= 1) setDisable(false);
        if (lastTimerCount <= 0) return lastTimerCount;
        return lastTimerCount - 1;
      });
    }, 1000); //each count lasts for a second
    //cleanup the interval on complete
    return () => clearInterval(interval);
  }, [disable]);

  return (
    <React.Fragment>

      <div className="flex justify-center items-center w-screen h-screen bg-gray-50">
        <div className="bg-white px-6 pt-10 pb-9 shadow-xl mx-auto w-full max-w-lg rounded-2xl">
          <div className="mx-auto flex w-full max-w-md flex-col space-y-16">
            <div className="flex flex-col items-center justify-center text-center space-y-2">
              <div className="font-semibold text-3xl">
                <p>Email Verification</p>
              </div>
              <div className="flex flex-row text-sm font-medium text-gray-400">
                <p>We have sent a code to your email <b>{context.email}</b></p>
              </div>
            </div>

            <div>
              <div>
                <div className="flex flex-col space-y-16">
                  <div className="flex flex-row items-center justify-between mx-auto w-full max-w-xs">
                    {
                      OTPinput.map((items, index) => {
                        return (
                          <div id={`square-${index}`} key={index} className="w-16 h-16">
                            <input
                              maxLength={1}
                              className="w-full h-full flex flex-col items-center 
                                                justify-center text-center px-5 outline-none 
                                                rounded-xl border border-gray-200 text-lg bg-white 
                                                focus:bg-gray-50 focus:ring-1 ring-blue-700"
                              type="text"
                              placeholder={items.toString()}
                              onChange={(e) => {
                                let newOTPInput = [...OTPinput];
                                // console.log("Old OTP inputs: ", newOTPInput);
                                newOTPInput[index] = (Number(e.target.value));
                                // console.log("New OTP inputs: ", newOTPInput);
                                setOTPinput(newOTPInput);
                              }}>
                            </input>
                          </div>
                        )
                      })
                    }
                  </div>

                  <div className="flex flex-col space-y-5">
                    <button
                      onClick={() => verifyOTP()}
                      className="btn btn-info cursor-pointer 
                      text-uppercase items-center justify-center 
                      text-center w-full border rounded-xl 
                      outline-none border-none text-white 
                      text-sm shadow-sm"
                    >
                      Verify Account
                    </button>

                    <div className="flex flex-row items-center justify-center text-center text-sm font-medium space-x-1 text-gray-500">
                      <p>Didn&apos;t recieve code?</p>{" "}
                      <a
                        className="flex flex-row items-center"
                        style={{
                          color: disable ? "gray" : "blue",
                          cursor: disable ? "none" : "pointer",
                          textDecorationLine: disable ? "none" : "underline",
                        }}
                        onClick={() => resendOTP()}
                      >
                        {disable ? `Resend OTP in ${timerCount}s` : "Resend OTP"}
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}