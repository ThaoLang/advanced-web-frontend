import { useState } from "react";

export default function CreateClassForm(){
    const [nameProxy, setNameProxy] = useState("");
    const [descriptionProxy, setDescriptionProxy] = useState("");

    return (
        <div className="flex flex-row m-10 align-middle justify-center">
            <div className="flex flex-col gap-4 w-md">
                <p className="mb-1 text-lg"> Create class </p>
                <input
                    type="text"
                    placeholder="Class name (required)"
                    className="input input-bordered w-full max-w-xs"
                    value={nameProxy}
                    onChange={(e) => setNameProxy(e.target.value)}
                    maxLength={15}
                  />
                  <input
                    type="text"
                    placeholder="Description"
                    className="input input-bordered w-full max-w-xs"
                    value={descriptionProxy}
                    onChange={(e) => setDescriptionProxy(e.target.value)}
                    maxLength={15}
                  />
                <button className="btn btn-info w-full max-w-xs">Create class!</button>
            </div>
        </div>
    )
}