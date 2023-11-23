import { useState } from "react";
import { IoIosArrowDropdown, IoIosArrowDropup } from "react-icons/io";
import { FaRegCopy } from "react-icons/fa";

interface BannerProp {
  id: number;
  imageUrl: string;
  name: string;
  description: string;
  inviteUrl: string;
  classCode: string;
}

const Banner = (classInfo: BannerProp) => {
  const [isActive, setIsActive] = useState(false);

  return (
    <div className="w-1/2 lg:w-3/4 bg-white rounded-xl shadow-md overflow-hidden relative">
      <div className="md:flex flex-col">
        <div className="md:shrink-0 ">
          <img
            className="h-96 object-cover w-full"
            src={classInfo.imageUrl}
            alt={classInfo.name}
          />
        </div>
        <div className="p-3">
          <div className="flex flex-row justify-between">
            <div
              className="md:text-lg text-slate-400 italic "
              style={{ fontSize: "12px" }}
            >
              {" "}
              {classInfo.description}
            </div>
            <div
              className="md:text-lg text-slate-400 italic "
              style={{ fontSize: "12px" }}
            >
              {classInfo.inviteUrl}
            </div>
          </div>
          <div className="mt-1 text-2xl lg:text-4xl leading-tight font-medium text-black hover:underline text-ellipsis overflow-hidden roboto-bold text-wrap-2-line">
            {classInfo.name}
          </div>

          <div className="mt-5 flex flex-row justify-between align-middle">
            <span className="flex flex-row text-sm">
              <div onClick={() => setIsActive(!isActive)}>
                {isActive ? (
                  <IoIosArrowDropdown className="mt-0.5 text-xl text-gray-500 ml-1 cursor-pointer" />
                ) : (
                  <IoIosArrowDropup className="mt-0.5 text-xl text-gray-500 ml-1 cursor-pointer" />
                )}
              </div>
            </span>
          </div>

          {isActive && (
            <div className="grid grid-cols-6 items-center justify-center">
              <div className="hidden md:block md:col-span-1 lg:col-span-1">
                <p className="m-3 text-sm lg:text-md">Class code:</p>
                <p className="m-3 text-sm lg:text-md">Invite link:</p>
              </div>
              <div className="col-span-5 md:col-span-4 lg:col-span-2 text-blue-500">
                <p className="m-3 text-lg">{classInfo.classCode}</p>
                <p className="m-3 text-lg">{classInfo.inviteUrl}</p>
              </div>
              <div className="text-lg gap-4">
                <div className="row-end-2 m-3 cursor-pointer">
                  <FaRegCopy />
                </div>
                <div className="row-start-2 m-3 cursor-pointer">
                  <FaRegCopy />
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Banner;
