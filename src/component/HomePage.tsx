import { useState, useMemo, useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
import PaginationBar from "./PaginationBar";
import SmallClass from "./classItem/SmallClass";
import { FaPlus } from "react-icons/fa";
import { IoMdClose } from "react-icons/io";
import { useTranslations } from "next-intl";
import NewClass from "@/component/classItem/NewClass";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { UserType } from "@/model/UserType";
import { ClassType } from "@/model/ClassType";

// const classes = [
//   {
//     id: 1,
//     imageUrl:
//       "https://static.vecteezy.com/system/resources/previews/011/005/174/original/creative-education-background-with-school-supplies-vector.jpg",
//     name: "My Class Name",
//     description: "This is the class",
//     inviteUrl: "inviteurl",
//     page: "enrolled",
//   },
//   {
//     id: 2,
//     imageUrl:
//       "https://img.freepik.com/free-vector/gradient-international-day-education-illustration_23-2150011975.jpg?w=1060&t=st=1700731744~exp=1700732344~hmac=24b786f258aaa8285646cf1044c2e8ccc3e829ef7d3bee36e80df89a345c792f",
//     name: "My Class Name",
//     description: "This is the class",
//     inviteUrl: "inviteurl",
//     page: "teaching",
//   },
//   {
//     id: 3,
//     imageUrl:
//       "https://static.vecteezy.com/system/resources/previews/011/005/174/original/creative-education-background-with-school-supplies-vector.jpg",
//     name: "My Class Name",
//     description: "This is the class",
//     inviteUrl: "inviteurl",
//     page: "enrolled",
//   },
//   {
//     id: 1,
//     imageUrl:
//       "https://static.vecteezy.com/system/resources/previews/011/005/174/original/creative-education-background-with-school-supplies-vector.jpg",
//     name: "My Class Name 2",
//     description: "This is the class",
//     inviteUrl: "inviteurl",
//     page: "enrolled",
//   },
//   {
//     id: 2,
//     imageUrl:
//       "https://static.vecteezy.com/system/resources/previews/011/005/174/original/creative-education-background-with-school-supplies-vector.jpg",
//     name: "My Class Name 2",
//     description: "This is the class",
//     inviteUrl: "inviteurl",
//     page: "enrolled",
//   },
//   {
//     id: 3,
//     imageUrl:
//       "https://static.vecteezy.com/system/resources/previews/011/005/174/original/creative-education-background-with-school-supplies-vector.jpg",
//     name: "My Class Name 2",
//     description: "This is the class",
//     inviteUrl: "inviteurl",
//     page: "enrolled",
//   },
//   {
//     id: 1,
//     imageUrl:
//       "https://static.vecteezy.com/system/resources/previews/011/005/174/original/creative-education-background-with-school-supplies-vector.jpg",
//     name: "My Class Name",
//     description: "This is the class",
//     inviteUrl: "inviteurl",
//     page: "enrolled",
//   },
//   {
//     id: 2,
//     imageUrl:
//       "https://static.vecteezy.com/system/resources/previews/011/005/174/original/creative-education-background-with-school-supplies-vector.jpg",
//     name: "My Class Name",
//     description: "This is the class",
//     inviteUrl: "inviteurl",
//     page: "enrolled",
//   },
// ];

export default function HomePage() {
  const t_homepage = useTranslations("Homepage");
  const t_tab = useTranslations("Tabs");

  const [classes, setClasses] = useState<ClassType[]>([]);

  const maxItemNumber = 3;
  const limit = 5;
  const totalPages =
    classes.length % maxItemNumber === 0
      ? classes.length / maxItemNumber
      : (classes.length - (classes.length % maxItemNumber)) / maxItemNumber + 1;
  const [page, setPage] = useState(1);

  const filterData = useMemo(() => {
    return classes.filter((item, index) => {
      return (
        index >= (page - 1) * maxItemNumber && index < page * maxItemNumber
      );
    });
  }, [page, classes]);

  const [showModal, setShowModal] = useState(false);
  const auth = useAuth();
  const savedUser = localStorage.getItem("user");
  let currentUser: UserType;
  if (savedUser) {
    currentUser = JSON.parse(savedUser);
  }

  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const handleModal = () => {
    console.log("Modal changed");
    setShowModal(!showModal);
  };

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

  const handleAddNewClass = async (className: string, description: string) => {
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_BACKEND_PREFIX}classes/create`,
        {
          name: className,
          description: description,
        },
        {
          headers: {
            Authorization: `Bearer ${currentUser?.access_token}`,
          },
        }
      );
      if (response.status === 201) {
        const newClass: ClassType = response.data;

        setClasses([...classes, newClass]);
        setShowModal(false);
      }
    } catch (error: any) {
      console.error("Failed to create new rubric:", error);
    }
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
  // end copy invite link

  const handleEnrollClass = async (code: string) => {
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_BACKEND_PREFIX}classes/enrolled?code=${code}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${currentUser?.access_token}`,
          },
        }
      );
      console.log("RESPONSE", response);

      if (response.status === 201) {
        const newClass: ClassType = response.data;
        setClasses([...classes, newClass]);
        setShowModal(false);
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
    axios
      .get(`${process.env.NEXT_PUBLIC_BACKEND_PREFIX}classes`, {
        headers: {
          Authorization: `Bearer ${currentUser?.access_token}`,
        },
      })
      .then((response) => {
        console.log("Response", response.data);
        setClasses(response.data);
        console.log("Response class", classes);
      })
      .catch((error) => {
        console.error("Error fetching classes:", error);
      });
  }, []);

  return auth.user ? (
    <div className="mx-20 my-10">
      <p className="mb-5 text-2xl flex justify-center items-center mx-auto">
        <b>{t_homepage("class")}</b>
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
              <NewClass
                classes={classes}
                handleAddNewClass={handleAddNewClass}
                handleEnrollClass={handleEnrollClass}
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
              imageUrl={
                items.type === "enrolled"
                  ? "https://static.vecteezy.com/system/resources/previews/011/005/174/original/creative-education-background-with-school-supplies-vector.jpg"
                  : "https://img.freepik.com/free-vector/gradient-international-day-education-illustration_23-2150011975.jpg?w=1060&t=st=1700731744~exp=1700732344~hmac=24b786f258aaa8285646cf1044c2e8ccc3e829ef7d3bee36e80df89a345c792f"
              }
              name={items.name}
              description={items.description}
              inviteUrl={items.invite_url}
              page={items.type}
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
      <ToastContainer
        position="bottom-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={true}
        closeOnClick={true}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </div>
  ) : (
    <div></div>
  );
}
