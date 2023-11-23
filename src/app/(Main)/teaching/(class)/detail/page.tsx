"use client";
import Banner from "@/component/classItem/Banner";
import React from "react";

const classInfo = {
  id: 1,
  imageUrl:
    "https://img.freepik.com/free-vector/gradient-international-day-education-illustration_23-2150011975.jpg?w=1060&t=st=1700731744~exp=1700732344~hmac=24b786f258aaa8285646cf1044c2e8ccc3e829ef7d3bee36e80df89a345c792f",
  name: "My Class Name",
  description: "This is the class",
  inviteUrl: "inviteurl",
  classCode: "classCode",
};

export default function page() {
  return (
    <div className="flex justify-center items-center mx-auto">
      <Banner
        id={classInfo.id}
        imageUrl={classInfo.imageUrl}
        name={classInfo.name}
        description={classInfo.description}
        inviteUrl={classInfo.inviteUrl}
        classCode={classInfo.classCode}
      />
    </div>
  );
}