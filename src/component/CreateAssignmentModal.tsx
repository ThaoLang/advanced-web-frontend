"use client";
import React, { useState } from "react";
import "primereact/resources/themes/lara-light-cyan/theme.css";

function CreateAssignmentModal() {
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  return (
    <div>
      <dialog id="my_modal_3" className="modal modal-open ">
        <div className="modal-box h-screen max-w-full">
          <form method=" dialog " className="flex items-center pb-4">
            <button
              className="btn btn-lg btn-circle btn-ghost absolute"
              title="Close"
            >
              ✕
            </button>

            <img
              src="https://cdn-icons-png.flaticon.com/128/7792/7792148.png"
              sizes="2"
              className="max-w-10 h-10  pl-16 pr-6"
            />
            <h2 className="font-bold text-2xl">Assignment</h2>
            <button className="btn btn-info absolute right-4" title="Close">
              Assign
            </button>
          </form>
          {/* <hr className="w-full" /> */}

          <div className="flex w-full divide-x-2 grid grid-cols-2">
            <div className="  border-grey border-2 border-solid p-4 m-4">
              <div className="p-4">
                <input
                  type="text"
                  placeholder="Title"
                  className="input input-bordered w-full max-w-lg py-4"
                />
              </div>
              <div className="p-4">
                <textarea
                  className="textarea textarea-bordered textarea-md w-full max-w-xl max-h-lg"
                  placeholder="Description"
                ></textarea>
              </div>

              <div className="border-grey border-2 rounded-md border-solid p-4"></div>
            </div>

            <div className=" border-grey border-2 rounded-md border-solid p-4 ">
              content
            </div>
          </div>
        </div>
      </dialog>
    </div>
  );
}

export default CreateAssignmentModal;
