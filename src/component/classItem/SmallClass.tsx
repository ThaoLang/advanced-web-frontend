import { useState } from "react";
import { IoMdPerson } from "react-icons/io";
import { PiProjectorScreenChart } from "react-icons/pi";
import { BsThreeDotsVertical } from "react-icons/bs";

interface SmallClassProp {
  id: number;
  imageUrl: string;
  name: string;
  description: string;
  inviteUrl: string;
}

const SmallClass = (classInfo: SmallClassProp) => {
  const [isActive, setIsActive] = useState(false);

  return (
    <div className="max-w-[240px] bg-white rounded-xl shadow-md md:max-w-2xl relative">
      <div className="md:flex flex-col">
        {/* <Link to={`/${classInfo.page}/detail/${classInfo.id}`}> */}
        <div className="md:shrink-0 ">
          <img
            className="h-48 object-cover w-full"
            src={classInfo.imageUrl}
            alt={classInfo.name}
          />
        </div>
        {/* </Link> */}
        <div className="p-3">
          {/* <Link to={`/${classInfo.page}/detail/${classInfo.id}`}> */}
          <div className="flex flex-row justify-between">
            <div
              className=" md:text-lg text-slate-400 italic "
              style={{ fontSize: "12px" }}
            >
              {" "}
              {classInfo.description}
            </div>
            <div
              className=" md:text-lg text-slate-400 italic "
              style={{ fontSize: "12px" }}
            >
              {classInfo.inviteUrl}
            </div>
          </div>
          <div className="mt-1 text-lg leading-tight font-medium text-black hover:underline text-ellipsis overflow-hidden roboto-bold text-wrap-2-line">
            {classInfo.name}
          </div>
          {/* </Link> */}
          <div className="mt-5 flex flex-row justify-between align-middle">
            <div className="flex flex-col">
              <div className="flex flex-row">
                <div className="text-lg">
                  <PiProjectorScreenChart />
                </div>
                <p className="text-slate-500 ml-1 text-sm"> 2 teachers </p>
              </div>
              <div className="flex flex-row">
                <div className="text-lg">
                  <IoMdPerson />
                </div>
                <p className="text-slate-500 ml-1 text-sm"> 2 students </p>
              </div>
            </div>
            <a>
              <div className="dropdown dropdown-top">
                <label
                  tabIndex={0}
                  className="btn rounded-full cursor-pointer text-md"
                >
                  <BsThreeDotsVertical />
                </label>
                <ul
                  tabIndex={0}
                  className="p-2 shadow menu dropdown-content z-[1] bg-base-100 rounded-box w-40"
                >
                  <li>
                    <a>Copy invite link</a>
                  </li>
                  <li>
                    <a>Edit</a>
                  </li>
                  <li>
                    <a>Unenroll</a>
                  </li>
                  <li>
                    <a>Leave</a>
                  </li>
                </ul>
              </div>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SmallClass;