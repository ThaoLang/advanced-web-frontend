"use client";
import { useAuth } from "@/context/AuthContext";
import { ClassType } from "@/model/ClassType";
import { UserType } from "@/model/UserType";
import axios from "axios";
import { useTranslations } from "next-intl";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";

export default function EncrollByLink() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [class_code, setClassCode] = useState(searchParams.get("code"));
  const auth = useAuth();
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const t = useTranslations("Tabs");

  const handleEnrollClass = async (code: string | null) => {
    console.log("enroll class: ", class_code);
    if (class_code) {
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
          router.push(`/enrolled/${newClass._id}/detail`);
          console.log("Error success", errorMsg);
        }
      } catch (error: any) {
        const errorMessage =
          error.response && error.response.data
            ? error.response.data.message
            : t("join_class_code_error_msg");
        setErrorMsg(errorMessage);
        console.log("Error fail", errorMsg);
      }
    } else {
      setErrorMsg("Class code doesn't match any class");
    }
  };

  const handleClick = () => {
    router.push(
      process.env.NEXT_PUBLIC_FRONTEND_PREFIX
        ? process.env.NEXT_PUBLIC_FRONTEND_PREFIX
        : "./"
    );
  };
  
  useEffect(() => {
    if (auth.user) handleEnrollClass(class_code);
  }, [auth.user]);

  return (
    <div className="">
      {errorMsg && (
        <dialog id="my_modal_1" className="modal modal-open">
          <div className="modal-box">
            <p className="py-4 text-lg bold items-center justify-between text-center">
              {errorMsg}
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
      )}
    </div>
  );
}
