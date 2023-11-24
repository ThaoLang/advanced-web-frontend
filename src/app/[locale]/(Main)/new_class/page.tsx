"use client";
import { useState } from "react";
import CreateClassForm from "@/component/classItem/CreateClassForm";
import JoinClassForm from "@/component/classItem/JoinClassForm";
import Link from "next/link";

export default function page() {
  const [status, setStatus] = useState("none");
  return (
    <div className="items-center h-[450px]">
      <div className="flex flex-row gap-4 align-middle justify-center pt-10">
        <button
          className="btn btn-info max-w-xs bg-blue-500 text-white"
          onClick={() => setStatus("create")}
        >
          Create class
        </button>
        <button
          className="btn btn-info max-w-xs bg-yellow-400 text-white"
          onClick={() => setStatus("join")}
        >
          Join class
        </button>
        <Link href="/">
          <button className="btn btn-info max-w-xs bg-red-400 text-white">
            Cancel
          </button>
        </Link>
      </div>
      {status === "create" && <CreateClassForm />}
      {status === "join" && <JoinClassForm />}
    </div>
  );
}