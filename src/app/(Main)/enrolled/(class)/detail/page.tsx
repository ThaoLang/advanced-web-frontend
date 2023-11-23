"use client";
import Banner from "@/component/classItem/Banner";
import React from "react";

const classInfo = {
  id: 1,
  imageUrl:
    "https://static.vecteezy.com/system/resources/previews/011/005/174/original/creative-education-background-with-school-supplies-vector.jpg",
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