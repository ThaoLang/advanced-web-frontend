"use client";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import React from "react";

export default function EmptyStudentId() {
  const t = useTranslations("Profile");
  const router = useRouter();

  const handleClick = () => {
    router.push("./");
  };
  return (
    <div className="">
      <dialog id="my_modal_1" className="modal modal-open">
        <div className="modal-box">
          <p className="py-4 text-lg bold items-center justify-between text-center">
            {t("empty_student_id_error")}
          </p>
          <div className="modal-action">
            <form method="dialog">
              <button className="btn" onClick={handleClick}>
                Close
              </button>
            </form>
          </div>
        </div>
      </dialog>
    </div>
  );
}
