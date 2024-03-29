import React, { useEffect, useState } from "react";
import Link from "next/link";
import { NotificationType } from "@/model/NotificationType";
import { useParams } from "next/navigation";
import { useTranslations } from "next-intl";
import axios from "axios";
import { useAuth } from "@/context/AuthContext";

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
  const t = useTranslations("Notification");

  const [className, setClassName] = useState("");
  const [senderName, setSenderName] = useState("");

  const auth = useAuth();

  useEffect(() => {
    (async () => {
      // get class name
      axios
        .get(
          `${process.env.NEXT_PUBLIC_BACKEND_PREFIX}classes/${props.classId}`,
          {
            headers: {
              Authorization: `Bearer ${auth.user?.access_token}`,
            },
          }
        )
        .then((response) => {
          setClassName(response.data.name);
        })
        .catch((error) => {
          console.error("Error fetching class:", error);
        });
      //get sender name
      // if (props.senderRole === "Teacher") {
      axios
        .get(
          `${process.env.NEXT_PUBLIC_BACKEND_PREFIX}profile/${props.senderId}`,
          {
            headers: {
              Authorization: `Bearer ${auth.user?.access_token}`,
            },
          }
        )
        .then((response) => {
          // console.log("Response name", response);
          setSenderName(response.data.username);
        })
        .catch((error) => {
          console.error("Error fetching user:", error);
        });
      // } else if (props.senderRole === "Student") {
      //   axios
      //     .get(
      //       `${process.env.NEXT_PUBLIC_BACKEND_PREFIX}student/${props.classId}/${student's studentId}`,
      //       {
      //         headers: {
      //           Authorization: `Bearer ${auth.user?.access_token}`,
      //         },
      //       }
      //     )
      //     .then((response) => {
      //       console.log("Response", response);
      //       // setSenderName(response.data.fullname);
      //     })
      //     .catch((error) => {
      //       console.error("Error fetching student:", error);
      //     });
      // }
    })();
  }, []);

  return (
    <Link href={props.redirectUrl}>
      <div className="flex flex-col bg-white border-b-2 border-slate-200 overflow-hidden p-5 cursor-pointer">
        <div className=" flex flex-row justify-between">
          <div className="text-md font-semibold">
            {t("classroom")}: <span className="text-lg">{className}</span>
          </div>
          {!props.isRead && (
            <span className="badge badge-xs badge-primary list-item" />
          )}
        </div>
        <div className="text-xs">
          {t(props.senderRole)}: <b>{senderName}</b>
        </div>
        <div className="my-2">{t(props.message)}</div>
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

const compareDate = (date1: string, date2: string) => {
  const _date1 = new Date(date1);
  const _date2 = new Date(date2);
  return _date1 < _date2 ? 1 : -1;
};

export default function NotificationList(props: NotificationListProps) {
  return (
    <div>
      {props.notifications &&
        props.notifications
          .sort((noti1, noti2) => {
            return compareDate(noti1.createdAt, noti2.createdAt);
          })
          .map((notification, index) => (
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
