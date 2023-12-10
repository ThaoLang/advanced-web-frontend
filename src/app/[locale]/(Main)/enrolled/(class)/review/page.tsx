"use client";
import React, { useState } from "react";
import { useTranslations } from "next-intl";
import ReviewForm from "@/component/classItem/review/ReviewForm";
import { IoMdClose } from "react-icons/io";
import AddReviewModal from "@/component/classItem/review/AddReviewModal";

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
          <div className="p-3 mx-10 text-2xl lg:text-3xl text-yellow-500 flex flex-row items-center justify-between">
            {t("my_review")}
            <button
              className="btn btn-info max-w-xs bg-yellow-400 text-white"
              onClick={handleModal}
            >
              {t("create_review")}
            </button>
          </div>
        </div>
        <div className="m-3 flex-col col-span-2 lg:col-span-1">
          <div className="m-3 text-2xl lg:text-3xl text-yellow-500">
            {t("review_detail")}
          </div>
          <ReviewForm />
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
          <AddReviewModal />
        </div>
        <form method="dialog" className="modal-backdrop">
          <button onClick={handleModal}>close</button>
        </form>
      </dialog>
    </div>
  );
}
