"use client";
import React, { useState } from "react";

interface ProfileFormProp {
  username: string;
  email: string;
  saveInfo: (username: string, email: string) => void;
}

export default function ProfileForm(props: ProfileFormProp) {
  const [emailProxy, setEmailProxy] = useState(props.email);
  const [usernameProxy, setUsernameProxy] = useState(props.username);
  const [isEditable, setIsEditable] = useState(false);
  const [option, setOption] = useState("");

  const toggleEdit = async () => {
    setIsEditable(!isEditable);
  };

  const saveChanges = async () => {
    props.saveInfo(usernameProxy, emailProxy);
    setIsEditable(!isEditable);
  };

  // use effect to change section?
  const handleOptionClick = async (option:string) => {
    setOption(option); // default
  }

  return (
    <div>
      <div className="flex flex-row">
        <div className="mr-10 mt-20 h-full w-full mx-auto inline-block align-middle">
          <img
            src="https://api.lorem.space/image/face?w=120&h=120&hash=bart89fe"
            className="rounded-full w-40 "
            alt="profile picture"
          />
        </div>
        <div className="grid grid-rows-3">
          <div className="row-span-2 flex flex-col p-4 m-8 w-96 h-72 mx-auto my-auto bg-white">
            <label className="font-semibold h-fit text-2xl text-center my-10 mx-auto">
              {props.username}'s Profile
            </label>
            <div className="grid grid-cols-3 h-24 w-full">
              <label className="font-semibold text-md text-left inline-block align-bottom mt-2 ml-4">
                Username:
              </label>{" "}
              <div className="col-span-2">
                {(isEditable && (
                  <input
                    type="text"
                    placeholder="Username"
                    className="input input-bordered w-full max-w-xs"
                    value={usernameProxy}
                    onChange={(e) => setUsernameProxy(e.target.value)}
                    maxLength={15}
                  />
                )) || (
                  <label className="text-md text-left inline-block align-bottom mt-2">
                    {props.username}
                  </label>
                )}
              </div>
            </div>
            <div className="grid grid-cols-3 h-24 w-full">
              <label className="font-semibold text-md text-left inline-block align-bottom mt-2 ml-4">
                Email:
              </label>
              <div className="col-span-2">
                {(isEditable && (
                  <input
                    type="text"
                    placeholder="Email"
                    className="input input-bordered w-full max-w-xs"
                    value={emailProxy}
                    onChange={(e) => setEmailProxy(e.target.value)}
                  />
                )) || (
                  <label className="text-md text-left inline-block align-bottom mt-2">
                    {props.email}
                  </label>
                )}
              </div>
            </div>
          </div>
          {(!isEditable && (
            <button
              onClick={toggleEdit}
              className="btn btn-info w-full max-w-xs mx-auto"
            >
              Update Profile
            </button>
          )) || (
            <div className="flex flex-row w-full max-w-xs mx-auto">
              <button
                onClick={saveChanges}
                className="btn btn-info w-1/2 max-w-xs mr-4"
              >
                Save
              </button>
              <button
                onClick={toggleEdit}
                className="btn btn-info w-1/2 max-w-xs ml-4"
              >
                Cancel
              </button>
            </div>
          )}
        </div>
      </div>
      <div className="divider">ABOUT ME</div>

      {/* <div className="flex w-full flex-row align-middle justify-around"> */}
      <div className="btm-nav">
        <button id="button1" onClick={() => handleOptionClick("")}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
            />
          </svg>
          <span className="btm-nav-label">Comments</span>
        </button>
        <button className="active" id="button2" onClick={() => handleOptionClick("")}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <span className="btm-nav-label">Bio</span>
        </button>
        <button id="button3" onClick={() => handleOptionClick("")}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
            />
          </svg>
          <span className="btm-nav-label">Activities</span>
        </button>
      </div>
    </div>
  );
}
