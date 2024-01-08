"use client";
import { useState, useMemo, useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
import PaginationBar from "@/component/PaginationBar";
import SmallClass from "@/component/classItem/SmallClass";
import { FaPlus } from "react-icons/fa";
import { useTranslations } from "next-intl";
import { IoMdClose } from "react-icons/io";
import JoinClassForm from "@/component/classItem/JoinClassForm";
import { ClassType } from "@/model/ClassType";
import { UserType } from "@/model/UserType";
import axios from "axios";

export default function EnrolledPage() {
  const [classes, setClasses] = useState<ClassType[]>([]);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const auth = useAuth();
  const maxItemNumber = 3;
  const limit = 5;
  const totalPages =
    classes.length % maxItemNumber === 0
      ? classes.length / maxItemNumber
      : (classes.length - (classes.length % maxItemNumber)) / maxItemNumber + 1;
  const [page, setPage] = useState(1);
  const [showModal, setShowModal] = useState(false);
  const [isCopied, setIsCopied] = useState(false);
  const t = useTranslations("EnrolledPage");
  const t_tab = useTranslations("Tabs");

  const filterData = useMemo(() => {
    return classes.filter((item, index) => {
      return (
        index >= (page - 1) * maxItemNumber && index < page * maxItemNumber
      );
    });
  }, [page, classes]);

  const handleModal = () => {
    console.log("Modal changed");
    setShowModal(!showModal);
  };

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

  const CopyInviteLink = (text: string) => {
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
  const handleEnrollClass = async (code: string) => {
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_BACKEND_PREFIX}classes/enrolled?code=${code}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${auth.user?.access_token}`,
          },
        }
      );
      if (response.status === 201) {
        const newClass: ClassType = response.data;
        setClasses([...classes, newClass]);
        setShowModal(false);
      } else if (response.status === 409 || response.status === 404) {
        setErrorMsg(response.data.message);
      }
    } catch (error: any) {
      const errorMessage =
        error.response && error.response.data
          ? error.response.data.message
          : t_tab("join_class_code_error_msg");
      setErrorMsg(errorMessage);
    }
  };

  useEffect(() => {
    const savedUser = localStorage.getItem("user");

    if (savedUser != null) {
      const curUser: UserType = JSON.parse(savedUser);
      auth.login(curUser);
    }
  }, []);

  useEffect(() => {
    console.log("ACCESS_TOKEN", auth.user?.access_token);
    axios
      .post(
        `${process.env.NEXT_PUBLIC_BACKEND_PREFIX}classes/get-enrolled`,
        {},
        {
          headers: {
            Authorization: `Bearer ${auth.user?.access_token}`,
          },
        }
      )
      .then(async (response) => {
        console.log("Response", response.data);
        await setClasses(response.data);
        console.log("Response class", classes);
      })
      .catch((error) => {
        console.error("Error fetching classes:", error);
      });
  }, []);

  console.log("Class", classes);

  return auth.user ? (
    <div className="mx-20 my-10">
      <p className="mb-5 text-2xl text-yellow-500 flex justify-center items-center mx-auto">
        <b>{t("title")}</b>
      </p>

      <div className="flex justify-around items-center font-poppins mb-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 w-9/12 pt-10 ">
          <div
            className="max-w-[240px] bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl cursor-pointer py-2"
            onClick={handleModal}
          >
            <div className="h-80 flex items-center justify-center text-4xl">
              <FaPlus />
            </div>
          </div>

          {/* Modal */}
          <dialog className={`modal ${showModal ? "modal-open" : ""}`}>
            <div className="modal-box">
              <div className="flex flex-row justify-between">
                <p className="text-sm text-gray-500">
                  {/* Press X or click outside to close */}
                </p>
                <button onClick={handleModal}>
                  <IoMdClose />
                </button>
              </div>
              <JoinClassForm
                handleJoinNewClass={handleEnrollClass}
                classes={classes}
                errorMsg={errorMsg}
              />
            </div>
            <form method="dialog" className="modal-backdrop">
              <button onClick={handleModal}>close</button>
            </form>
          </dialog>

          {filterData.map((items, index) => (
            <SmallClass
              id={items._id}
              status={items.status}
              imageUrl="https://static.vecteezy.com/system/resources/previews/011/005/174/original/creative-education-background-with-school-supplies-vector.jpg"
              name={items.name}
              description={items.description}
              classCode={items.class_code}
              page="enrolled"
              isCopied={isCopied}
              CopyInviteLink={CopyInviteLink}
              key={index}
              student_number={items.student_number ? items.student_number : 0}
              teacher_number={items.teacher_number ? items.teacher_number : 1}
            />
          ))}
        </div>
      </div>
      <div className="flex items-center justify-center max-w-screen-lg container mx-auto">
        <PaginationBar
          total={totalPages}
          limit={limit}
          current={page}
          onChange={(page) => setPage(page)}
        />
      </div>
    </div>
  ) : (
    <div></div>
  );
}
