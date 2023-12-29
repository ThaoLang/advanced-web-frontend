import { useState } from "react";
import { IoIosArrowDropdown, IoIosArrowDropup } from "react-icons/io";
import { FaRegCopy } from "react-icons/fa";
import { useTranslations } from "next-intl";

interface BannerProp {
  id: string;
  imageUrl: string;
  name: string;
  description: string;
  inviteUrl: string;
  classCode: string;
}

const Banner = (classInfo: BannerProp) => {
  const [isActive, setIsActive] = useState(false);
  const t = useTranslations("Tabs");

  // copy
  const [isCopied, setIsCopied] = useState(false);

  const WriteToClipboard = async (text: string) => {
    const param = "clipboard-write" as PermissionName;
    const result = await navigator.permissions.query({ name: param });
    if (result.state === "granted") {
      console.log("Permission granted");
      await navigator.clipboard.writeText(text);
      return true;
    }
    console.log("Permission denied");
    return false;
  };

  const CopyText = (text: string) => {
    // Asynchronously call
    WriteToClipboard(text)
      .then((result) => {
        // If successful, update the isCopied state value
        if (result) {
          setIsCopied(true);
          setTimeout(() => {
            setIsCopied(false);
          }, 1500);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  // end copy

  return (
    <div className="w-full md:w-1/2 lg:w-2/5 bg-white rounded-xl shadow-md overflow-hidden relative">
      <div className="md:flex flex-col">
        <div className="md:shrink-0 ">
          <img
            className="h-44 object-cover w-full"
            src={classInfo.imageUrl}
            alt={classInfo.name}
          />
        </div>
        <div className="p-3">
          <div className="flex flex-row justify-between">
            {/* <div
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
            </div> */}
          </div>

          <div className="collapse collapse-arrow">
            <input type="checkbox" onChange={() => setIsActive(!isActive)} />
            <div className="collapse-title flex flex-row justify-between align-middle">
              <div className="flex-col">
                <div className="mt-1 text-2xl lg:text-4xl leading-tight font-medium text-black hover:underline text-ellipsis overflow-hidden roboto-bold text-wrap-2-line">
                  {classInfo.name}
                </div>
                <div
                  className="md:text-lg text-slate-400 italic "
                  style={{ fontSize: "12px" }}
                >
                  {" "}
                  {classInfo.description}
                </div>
              </div>

              <div className="hidden md:block text-sm mt-3 text-gray-500 ml-1 cursor-pointer">
                {isActive ? <>{t("hide")}</> : <>{t("view_details")}</>}
              </div>
            </div>

            <div className="collapse-content ">
              <div className="grid grid-cols-6 items-center justify-center">
                <div className="hidden md:block md:col-span-1 lg:col-span-1">
                  <p className="m-2 text-sm lg:text-md">{t("class_code")}:</p>
                </div>

                <div className="col-span-4  text-blue-500 col-end-6 text-clip overflow-hidden">
                  <p className="m-2 text-xs">{classInfo.classCode}</p>
                </div>
                <div className="text-lg gap-4 self-end  md:col-span-1  ">
                  <div
                    className="col-end-7 col-span-1  p-4 cursor-pointer"
                    onClick={() => CopyText(classInfo.classCode)}
                  >
                    <FaRegCopy />
                  </div>
                </div>
                <div className="hidden md:block md:col-span-1 lg:col-span-1">
                  <p className="m-2 text-sm lg:text-md">{t("invite_url")}:</p>
                </div>

                <div className="col-span-4  text-blue-500 col-end-6 text-clip overflow-hidden">
                  <p className="m-2 text-xs">{classInfo.inviteUrl}</p>
                </div>
                <div className="text-lg gap-4 self-end  md:col-span-1  ">
                  <div
                    className="col-end-7 col-span-1 items-center p-4 cursor-pointer"
                    onClick={() => CopyText(classInfo.inviteUrl)}
                  >
                    <FaRegCopy />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {isCopied && (
        <div className="toast toast-bottom toast-end">
          <div className="alert alert-info">
            <span>{t("copied")}</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default Banner;
