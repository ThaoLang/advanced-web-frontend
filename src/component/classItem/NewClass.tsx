import { useState } from "react";
import CreateClassForm from "./CreateClassForm";
import JoinClassForm from "./JoinClassForm";
import { useTranslations } from "next-intl";
import axios from "axios";
import { ClassType } from "@/model/ClassType";
import { UserType } from "@/model/UserType";

interface NewClassProps {
  classes: ClassType[];
  handleAddNewClass: (name: string, description: string) => void;
  handleEnrollClass: (code: string) => void;
  errorMsg: string | null;
}

export default function NewClass(props: NewClassProps) {
  const [status, setStatus] = useState("create");
  const t = useTranslations("Tabs");

  return (
    <div className="items-center h-[440px]">
      <div className="flex flex-row gap-4 align-middle justify-center pt-10">
        <button
          className="btn btn-info max-w-xs bg-blue-500 text-white"
          onClick={() => setStatus("create")}
        >
          {t("create_class_btn")}
        </button>
        <button
          className="btn btn-info max-w-xs bg-yellow-400 text-white"
          onClick={() => setStatus("join")}
        >
          {t("join_class_btn")}
        </button>
      </div>
      {status === "create" && (
        <CreateClassForm
          handleAddNewClass={props.handleAddNewClass}
          classes={props.classes}
        />
      )}
      {status === "join" && (
        <JoinClassForm
          handleJoinNewClass={props.handleEnrollClass}
          classes={props.classes}
          errorMsg={props.errorMsg}
        />
      )}
    </div>
  );
}
