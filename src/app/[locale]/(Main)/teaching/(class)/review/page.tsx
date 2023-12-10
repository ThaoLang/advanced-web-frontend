"use client";
import React, { useState } from "react";
import { useTranslations } from "next-intl";
import TeacherReviewForm from "@/component/classItem/review/TeacherReviewForm";
import { IoMdClose } from "react-icons/io";
import UpdateReviewModal from "@/component/classItem/review/UpdateReviewModal";

export default function ReviewPage() {
  const t = useTranslations("Review");
  const [showModal, setShowModal] = useState(false);
  const handleModal = () => {
    console.log("Modal changed");
    setShowModal(!showModal);
  };

  return (
    <div>
      <div className="grid grid-cols-2 mx-20">
        <div className="hidden lg:block lg:col-span-1">
          <div className="m-3 mx-10 text-2xl lg:text-3xl text-blue-600">
            {t("all_reviews")}
          </div>
        </div>
        <div className="flex-col col-span-2 lg:col-span-1">
          <div className="p-3 text-2xl lg:text-3xl text-blue-600 flex flex-row items-center justify-between">
            {t("review_detail")}
            <button
              className="btn btn-info max-w-xs bg-blue-500 text-white"
              onClick={() => handleModal()}
            >
              {t("update")}
            </button>
          </div>
          <TeacherReviewForm />
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
          <UpdateReviewModal />
        </div>
        <form method="dialog" className="modal-backdrop">
          <button onClick={handleModal}>close</button>
        </form>
      </dialog>
    </div>
  );
}
