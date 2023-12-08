"use client";
import { useState, useMemo } from "react";
import { useAuth } from "@/context/AuthContext";
import PaginationBar from "@/component/PaginationBar";
import SmallClass from "@/component/classItem/SmallClass";
import { FaPlus } from "react-icons/fa";
import { useTranslations } from "next-intl";
import { IoMdClose } from "react-icons/io";
import JoinClassForm from "@/component/classItem/JoinClassForm";

const classes = [
  {
    id: 2,
    imageUrl:
      "https://static.vecteezy.com/system/resources/previews/011/005/174/original/creative-education-background-with-school-supplies-vector.jpg",
    name: "My Class Name",
    description: "This is the class",
    inviteUrl: "inviteurl",
    page: "enrolled",
  },
  {
    id: 2,
    imageUrl:
      "https://static.vecteezy.com/system/resources/previews/011/005/174/original/creative-education-background-with-school-supplies-vector.jpg",
    name: "My Class Name",
    description: "This is the class",
    inviteUrl: "inviteurl",
    page: "enrolled",
  },
  {
    id: 2,
    imageUrl:
      "https://static.vecteezy.com/system/resources/previews/011/005/174/original/creative-education-background-with-school-supplies-vector.jpg",
    name: "My Class Name",
    description: "This is the class",
    inviteUrl: "inviteurl",
    page: "enrolled",
  },
];

export default function EnrolledPage() {
  const auth = useAuth();
  const maxItemNumber = 3;
  const limit = 5;
  const totalPages =
    classes.length % maxItemNumber === 0
      ? classes.length / maxItemNumber
      : (classes.length - (classes.length % maxItemNumber)) / maxItemNumber + 1;
  const [page, setPage] = useState(1);
  const t = useTranslations("EnrolledPage");

  const filterData = useMemo(() => {
    return classes.filter((item, index) => {
      return (
        index >= (page - 1) * maxItemNumber && index < page * maxItemNumber
      );
    });
  }, [page]);

  const [showModal, setShowModal] = useState(false);

  const handleModal = () => {
    console.log("Modal changed");
    setShowModal(!showModal);
  };

  // function addNewClass() {
  //   setShowModal(true);
  // }

  // function createClass() {
  //   //
  //   setShowModal(false);
  // }

  // function joinClass() {
  //   //
  //   setShowModal(false);
  // }

  // TODO: make this functional
  // copy invite link
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
              <JoinClassForm />
            </div>
            <form method="dialog" className="modal-backdrop">
              <button onClick={handleModal}>close</button>
            </form>
          </dialog>

          {filterData.map((items, index) => (
            <SmallClass
              id={items.id}
              imageUrl={items.imageUrl}
              name={items.name}
              description={items.description}
              inviteUrl={items.inviteUrl}
              page={items.page}
              isCopied={isCopied}
              CopyInviteLink={CopyInviteLink}
              key={index}
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
