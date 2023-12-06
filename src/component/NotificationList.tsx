import { message } from "antd";
import React from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

interface NotificationListProps {
  messages: string[] | undefined;
}

interface NotificationProps {
  senderId: string;
  senderRole: string;
  senderMessage: string;
  createDate: string;
}

export function Notification(props: NotificationProps) {
  return (
    <div className="flex flex-col">
      <label>{props.senderId}</label>
      <label>{props.senderRole}</label>
      <label>{props.senderMessage}</label>
      <label>{props.createDate}</label>
    </div>
  );
}

export default function NotificationList(props: NotificationListProps) {
  // only message for testing
  if (props.messages) {
    for (let i = 0; i < props.messages.length; i++) {
      toast(<div>{props.messages[i]}</div>);
    }
  }

  // notification component

  //   for (let i = 0; i < 3; i++) {
  //     toast(
  //       <Notification
  //         senderId="123"
  //         senderRole="student"
  //         senderMessage="hello!"
  //         createDate="today"
  //       />
  //     );
  //   }

  return (
    <div>
      <ToastContainer
        position="top-right"
        // autoClose={5000}
        autoClose={false}
        hideProgressBar={true}
        newestOnTop={true}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </div>
  );
}
