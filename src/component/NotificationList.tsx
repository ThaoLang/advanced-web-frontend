import React from "react";
import Link from "next/link";
import { NotificationType } from "@/model/NotificationType";
import { useParams } from "next/navigation";

interface NotificationListProps {
  notifications: NotificationType[] | undefined;
  isClickedNotification: (notification: NotificationType) => void;
}

interface NotificationProps {
  classId: string;
  senderId: string;
  senderRole: string;
  message: string;
  createdAt: string;
  redirectUrl: string;
  isRead: boolean;
}

export function Notification(props: NotificationProps) {
  const { locale } = useParams();
  const language = locale === "en" ? "en-EN" : "vi-VN";

  return (
    <Link href={props.redirectUrl}>
      <div className="flex flex-col bg-white border-b-2 border-slate-200 overflow-hidden p-5 cursor-pointer">
        <div className=" flex flex-row justify-between">
          <div className="text-lg font-semibold">{props.classId}</div>
          {!props.isRead && (
            <span className="badge badge-xs badge-primary list-item" />
          )}
        </div>
        <div className="text-xs">
          {props.senderRole}: <b>{props.senderId}</b>
        </div>
        <div className="my-2">{props.message}</div>
        <div className="text-xs font-extralight">
          {new Date(props.createdAt).toLocaleDateString(language, {
            weekday: "short",
            day: "numeric",
            month: "short",
            year: "numeric",
            hour: "numeric",
            minute: "numeric",
            second: "numeric",
          })}
        </div>
      </div>
    </Link>
  );
}

export default function NotificationList(props: NotificationListProps) {
  return (
    <div>
      {props.notifications &&
        props.notifications.map((notification, index) => (
          <div
            key={index}
            onClick={() => props.isClickedNotification(notification)}
          >
            {notification.redirectUrl && (
              <Notification
                classId={notification.classId}
                senderId={notification.senderId}
                senderRole={notification.senderRole}
                message={notification.message}
                createdAt={notification.createdAt}
                redirectUrl={notification.redirectUrl}
                isRead={notification.isRead}
              />
            )}
          </div>
        ))}
    </div>
  );
}
