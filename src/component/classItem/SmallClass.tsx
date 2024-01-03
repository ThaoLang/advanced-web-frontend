"use client";
import Link from "next/link";
import { IoMdPerson } from "react-icons/io";
import { PiProjectorScreenChart } from "react-icons/pi";
import { BsThreeDotsVertical } from "react-icons/bs";
import { useTranslations } from "next-intl";

interface SmallClassProp {
  id: string;
  imageUrl: string;
  name: string;
  description: string;
  inviteUrl: string;
  page: string | undefined;
  isCopied: boolean;
  CopyInviteLink: (text: string) => void;
  student_number: number;
  teacher_number: number;
}

const SmallClass = (classInfo: SmallClassProp) => {
  const t = useTranslations("Tabs");

  return (
    <div className="max-w-[240px] bg-white rounded-xl overflow-hidden shadow-md md:max-w-2xl relative">
      <div className="md:flex flex-col">
        {/* <Link href={`/${classInfo.page}/detail/${classInfo.id}`}> */}
        <Link href={`/${classInfo.page}/${classInfo.id}/detail`}>
          <div className="md:shrink-0 ">
            <img
              className="h-48 object-cover w-full"
              src={classInfo.imageUrl}
              alt={classInfo.name}
            />
          </div>
        </Link>
        <div className="p-3">
          {/* <Link href={`/${classInfo.page}/detail/${classInfo.id}`}> */}
          <Link href={`/${classInfo.page}/${classInfo.id}/detail`}>
            <div className="flex flex-row justify-between">
              {/* <div
                className=" md:text-lg text-slate-400 italic "
                style={{ fontSize: "12px" }}
              >
                {" "}
                {classInfo.description}
              </div> */}
              {/* <div
                className=" md:text-lg text-slate-400 italic "
                style={{ fontSize: "12px" }}
              >
                {classInfo.inviteUrl}
              </div> */}
            </div>
            <div className="mt-1 text-lg leading-tight font-medium text-black hover:underline text-ellipsis overflow-hidden roboto-bold text-wrap-2-line">
              {classInfo.name}
            </div>
          </Link>
          <div className="mt-5 flex flex-row justify-between align-middle">
            <div className="flex flex-col">
              <div className="flex flex-row">
                <div className="text-lg">
                  <PiProjectorScreenChart />
                </div>
                <p className="text-slate-500 ml-1 text-sm lowercase">
                  {classInfo.teacher_number} {t("teachers")}{" "}
                </p>
              </div>
              <div className="flex flex-row">
                <div className="text-lg">
                  <IoMdPerson />
                </div>
                <p className="text-slate-500 ml-1 text-sm lowercase">
                  {classInfo.student_number} {t("students")}{" "}
                </p>
              </div>
            </div>
            <a>
              <div className="dropdown dropdown-top dropdown-end">
                <label
                  tabIndex={0}
                  className="btn rounded-full cursor-pointer text-md"
                >
                  <BsThreeDotsVertical />
                </label>
                <ul
                  tabIndex={0}
                  className="p-2 shadow menu dropdown-content z-[1] bg-base-100 rounded-box w-44"
                >
                  <li>
                    <div
                      onClick={() =>
                        classInfo.CopyInviteLink(classInfo.inviteUrl)
                      }
                    >
                      {t("copy_invite_url")}
                    </div>
                  </li>
                  {classInfo.page === "teaching" && (
                    <>
                      <li>
                        <div>{t("edit")}</div>
                      </li>
                      <li>
                        <div>{t("delete_class")}</div>
                      </li>
                    </>
                  )}
                  {classInfo.page === "enrolled" && (
                    <li>
                      <div>{t("leave_class")}</div>
                    </li>
                  )}
                </ul>
              </div>
            </a>
          </div>
        </div>
      </div>
      {classInfo.isCopied && (
        <div className="toast toast-bottom toast-end">
          <div className="alert alert-info">
            <span>Copied!</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default SmallClass;
