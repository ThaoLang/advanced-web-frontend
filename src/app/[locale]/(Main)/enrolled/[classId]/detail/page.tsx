"use client";
import Banner from "@/component/classItem/detail/Banner";
import { ClassType } from "@/model/ClassType";
import { UserType } from "@/model/UserType";
import axios from "axios";
import { useTranslations } from "next-intl";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";

export default function DetailEnrolledClass() {
  const t = useTranslations("Tabs");
  const [isAvailableStudentList, setIsAvailable] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const { classId } = useParams();
  const [classInfo, setClassInfo] = useState<ClassType>();
  const savedUser = localStorage.getItem("user");
  let currentUser: UserType;
  if (savedUser) {
    currentUser = JSON.parse(savedUser);
    const handleModal = () => {
      console.log("Modal changed");
      setShowModal(!showModal);
    };

    useEffect(() => {
      axios
        .get(`${process.env.NEXT_PUBLIC_BACKEND_PREFIX}classes/${classId}`, {
          headers: {
            Authorization: `Bearer ${currentUser?.access_token}`,
          },
        })
        .then((response) => {
          console.log("Response", response.data);
          setClassInfo(response.data);
          console.log("Response class", classInfo);
        })
        .catch((error) => {
          console.error("Error fetching classes:", error);
        });
    }, []);

    return (
      <div className="flex justify-center items-center mx-auto">
        {classInfo && (
          <Banner
            id={classInfo._id}
            imageUrl="https://static.vecteezy.com/system/resources/previews/011/005/174/original/creative-education-background-with-school-supplies-vector.jpg"
            name={classInfo.name}
            description={classInfo.description}
            inviteUrl={classInfo.invite_url}
            classCode={classInfo.class_code}
          />
        )}
      </div>
    );
  }
}
