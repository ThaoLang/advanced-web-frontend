import { useState } from "react";
import { useTranslations } from "next-intl";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { RubricType } from "@/model/RubricType";
import axios from "axios";
import { ClassListType } from "@/model/ClassListType";

interface AddMemberFormProps {
  isAddingStudent: boolean;
  handleAddMember: (isAddingStudent: boolean, inviteEmail: string) => void;
  members:ClassListType[]
}

export default function AddMemberForm(props: AddMemberFormProps) {
  const [emailProxy, setEmailProxy] = useState("");
  const t = useTranslations("Tabs");
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const isValidInput = () => {
    setErrorMsg(null);
    if (!emailProxy || emailProxy == "") {
      setErrorMsg(t("add_member_empty_error"));
      return false;
    }
    else if (props.members.filter(member => member.email===emailProxy)) {
        setErrorMsg(t("add_member_error"));
        return false;
      }
    return true;
  };

  const handleAddMember = () => {
    if (!isValidInput()) return;

    props.handleAddMember(props.isAddingStudent, emailProxy);
    setEmailProxy("");
  };

  return (
    <div className="flex flex-row w-full items-center justify-center">
      <div className="flex flex-col  w-full mx-4 gap-4 w-2xl">
        <p className="mb-2 font-bold text-2xl flex items-center justify-center ">
          {" "}
          {props.isAddingStudent ? t("invite_student") : t("invite_teacher")}
        </p>
        <div className="flex ">
          <input
            type="text"
            placeholder={t("add_member_email")}
            className="input input-bordered  w-full max-w-full "
            value={emailProxy}
            onChange={(e) => setEmailProxy(e.target.value)}
          />
        </div>
        {errorMsg && (
          <label className="flex text-center items-center justify-center my-3 text-red-700">
            {errorMsg}
          </label>
        )}
        <button className="btn btn-info w-full " onClick={handleAddMember}>
          {t("send_invitation_btn")}!
        </button>
      </div>
    </div>
  );
}
