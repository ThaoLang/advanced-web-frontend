"use client";
import { useTranslations } from "next-intl";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useState } from "react";

export default function EmptyStudentId() {
  const t = useTranslations("Profile");
  const router = useRouter();
  const searchParams = useSearchParams();
  const [error_msg, setErrorMsg] = useState(searchParams.get("msg"));

  const handleClick = () => {
    router.push("./");
  };
  return (
    <div className="">
      <dialog id="my_modal_1" className="modal modal-open">
        <div className="modal-box">
          <p className="py-4 text-lg bold items-center justify-between text-center">
            {t(`${error_msg}`)}
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
