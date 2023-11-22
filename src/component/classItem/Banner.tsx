import { useState } from "react";
import { IoIosArrowDropdown, IoIosArrowDropup } from "react-icons/io";

interface BannerProp {
  id: number;
  imageUrl: string;
  name: string;
  description: string;
  inviteUrl: string;
}

const Banner = (classInfo: BannerProp) => {
  const [isActive, setIsActive] = useState(false);

  return (
    <div className="w-1/2 lg:w-3/4 bg-white rounded-xl shadow-md overflow-hidden relative">
      <div className="md:flex flex-col">
        <div className="md:shrink-0 ">
          <img
            className="h-80 object-cover w-full"
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

          {isActive && <div>
            <p className="m-3 text-lg">Class code: ASDHDASKJ</p>
            <p className="m-3 text-lg">Invite link: {classInfo.inviteUrl}</p>
          </div>}
        </div>
      </div>
    </div>
  );
};

export default Banner;
