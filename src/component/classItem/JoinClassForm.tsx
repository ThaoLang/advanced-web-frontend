import { useState } from "react";

export default function JoinClassForm(){
    const [classCodeProxy, setClassCodeProxy] = useState("");
    const [studentIdProxy, setStudentIdProxy] = useState("");

    return (
        <div className="flex flex-row m-10 align-middle justify-center">
            <div className="flex flex-col gap-4 w-md">
                <p className="mb-2 text-lg"> Join class </p>
                <p className="text-sm"> Ask your teacher for the class code</p>
                <input
                    type="text"
                    placeholder="Class code (required)"
                    className="input input-bordered w-full max-w-xs"
                    value={classCodeProxy}
                    onChange={(e) => setClassCodeProxy(e.target.value)}
                    maxLength={15}
                  />
                  <input
                    type="text"
                    placeholder="Student id (required)"
                    className="input input-bordered w-full max-w-xs"
                    value={studentIdProxy}
                    onChange={(e) => setStudentIdProxy(e.target.value)}
                    maxLength={15}
                  />
                <button className="btn btn-info w-full max-w-xs">Join class!</button>
            </div>
        </div>
    )
}