"use client";
import React, { useEffect, useState } from "react";
import DragNDrop from "./DragNDrop";
import { GrCircleInformation } from "react-icons/gr";
import { GoChecklist } from "react-icons/go";
import { VscFeedback } from "react-icons/vsc";
// import { useAuth } from "@/context/AuthContext";
import { UserType } from "@/model/UserType";
// import Image from 'next/image'

interface ProfileFormProp {
  // username: string;
  // email: string;
  // profilePicture: string;
  user: UserType | null;
  saveInfo: (
    username: string | undefined,
    email: string | undefined,
    profilePicture: string | any
  ) => void;
}

export default function ProfileForm(props: ProfileFormProp) {
  const [emailProxy, setEmailProxy] = useState(props.user?.email);
  const [usernameProxy, setUsernameProxy] = useState(props.user?.username);
  const [profilePictureProxy, setProfilePictureProxy] = useState(
    props.user?.avatarUrl
  );
  const [isEditable, setIsEditable] = useState(false);
  const [option, setOption] = useState("tab_1");

  const toggleEdit = async () => {
    setIsEditable(!isEditable);
  };

  const saveChanges = async () => {
    props.saveInfo(usernameProxy, emailProxy, profilePictureProxy);
    setIsEditable(!isEditable);
  };

  // use effect to change section?
  const handleOptionClick = async (option: string) => {
    setOption(option);
  };

  return (
    <div className="m-4">
      <div className="flex flex-row justify-center">
        <div className="flex flex-col justify-center mt-10">
          {/* TODO: update this button UI */}
          <div className="justify-center">
            {isEditable || (
              <img
                src={props.user?.avatarUrl ?? ''}
                className="rounded-full w-40 m-5 mx-5"
                alt="profile picture"
              />
            )}
            {isEditable && profilePictureProxy && (
              <img
                src={profilePictureProxy}
                className="rounded-full w-40 m-5 mx-5 brightness-50"
                alt="image upload"
              />
            )}
            <div className={`w-44 ${isEditable ? "active" : "invisible"}`}>
              <DragNDrop
                imageUrl={profilePictureProxy}
                saveImageUrl={setProfilePictureProxy}
              />
            </div>
          </div>
        </div>
        <div className="grid grid-rows-4">
          <div className="row-span-3 flex flex-col p-4 m-8 w-96 h-72 mx-auto my-auto bg-white">
            <label className="font-semibold h-fit text-2xl text-center my-10 mx-auto">
              {props.user?.username}&apos;s Profile
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
                    {props.user?.username}
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
                    {props.user?.email}
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

      <div className="divider w-3/4 mx-auto" />

      <div className="tabs tabs-lifted items-center justify-center space-x-4">
        <a
          className={`tab text-lg space-x-2 ${
            option === "tab_1" ? "tab-active border-b-2" : ""
          }`}
          onClick={() => handleOptionClick("tab_1")}
        >
          <GrCircleInformation size={20} />
          <label>Bio</label>
        </a>
        <a
          className={`tab text-lg space-x-2 ${
            option === "tab_2" ? "tab-active border-b-2" : ""
          }`}
          onClick={() => handleOptionClick("tab_2")}
        >
          <VscFeedback size={20} />
          <label>Comment</label>
        </a>
        <a
          className={`tab text-lg space-x-2 ${
            option === "tab_3" ? "tab-active border-b-2" : ""
          }`}
          onClick={() => handleOptionClick("tab_3")}
        >
          <GoChecklist size={20} />
          <label>Activity</label>
        </a>
      </div>

      <div
        className={`mt-5 w-3/4 mx-auto ${
          option === "tab_1" ? "visible" : "hidden"
        }`}
      >
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam
        vulputate dictum sagittis. Cras vulputate sit amet lorem sit amet
        aliquet. Integer hendrerit lobortis sem in mollis. Donec eget luctus
        nunc. Fusce congue elit quis ipsum porta, suscipit tincidunt dolor
        sodales. Praesent accumsan nulla sit amet metus laoreet scelerisque.
        Integer blandit fringilla lorem quis mattis. Phasellus egestas gravida
        convallis. Integer molestie, sapien vitae accumsan fermentum, mi erat
        sodales nunc, nec elementum sem mi nec justo. Nulla venenatis
        condimentum congue. Nunc quis urna elit. Nunc condimentum dapibus lacus,
        eu tristique risus rhoncus eget. Fusce ut consequat lorem. Suspendisse
        potenti. Proin vitae enim sed dolor fermentum consequat. Fusce libero
        risus, lobortis id ante ultrices, accumsan finibus diam. Nam tempor ante
        nulla, vel cursus leo rutrum vitae. Ut odio ligula, semper eget lectus
        ac, euismod mattis nunc. Interdum et malesuada fames ac ante ipsum
        primis in faucibus. Praesent congue nisl rutrum, malesuada justo vitae,
        porttitor nisi. Suspendisse a leo sed felis luctus pellentesque id ut
        sapien.
      </div>

      <div
        className={`mt-5 w-3/4 mx-auto ${
          option === "tab_2" ? "visible" : "hidden"
        }`}
      >
        Donec in leo diam. Pellentesque habitant morbi tristique senectus et
        netus et malesuada fames ac turpis egestas. Vivamus in fringilla ex. Sed
        lacus nisi, molestie id ligula vitae, bibendum ullamcorper erat.
        Pellentesque pellentesque aliquam metus a gravida. Fusce non metus
        ultrices, sagittis risus ac, tincidunt nisi. Aenean pulvinar, mauris ut
        eleifend scelerisque, purus tortor viverra nisi, id porta mauris sem eu
        justo. Maecenas pulvinar sem a dui accumsan, quis laoreet risus
        sollicitudin. Aliquam id consequat sem. Praesent id condimentum velit.
        Integer auctor sit amet urna ut egestas. Nam sit amet turpis et dolor
        consequat consequat. Duis mi justo, iaculis nec scelerisque ac, aliquam
        sed purus.
      </div>

      <div
        className={`mt-5 w-3/4 mx-auto ${
          option === "tab_3" ? "visible" : "hidden"
        }`}
      >
        Vestibulum non eleifend augue. Maecenas efficitur molestie turpis eget
        lobortis. Quisque rutrum vitae lectus id semper. Morbi rutrum vitae
        neque vitae facilisis. Cras sagittis nisl pretium mattis posuere.
        Curabitur pellentesque neque nibh, non gravida lacus fermentum eget.
        Nullam vel imperdiet nunc. Vestibulum volutpat hendrerit ex sed luctus.
        Nulla facilisi. Cras euismod nibh enim, in feugiat metus eleifend vitae.
        Morbi vestibulum nec nulla in auctor. Sed id sapien interdum, dictum
        sapien eu, rhoncus leo. Etiam sollicitudin ut ligula ut vestibulum.
        Suspendisse accumsan placerat quam. In id enim nunc. Maecenas vulputate
        sem eget pretium ultricies. Duis porta scelerisque urna, placerat luctus
        libero cursus quis. Nulla pharetra dignissim augue faucibus efficitur.
        Donec varius eget arcu vel tristique. Vivamus ac quam at metus molestie
        laoreet vel non nibh. Etiam in commodo tellus, vel venenatis ipsum.
      </div>
    </div>
  );
}
