import { useAuth } from "@/context/AuthContext";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";

export default function RestrictedPage() {
    const auth = useAuth();

    const handleLogout = () => {
        auth.logout("user");
    }

    useEffect(() => {
        //Fetch the current user
    },[auth.user])

    return (
        <React.Fragment>
            <div className="flex flex-col items-center justify-center h-screen">
                <div className="font-bold text-9xl">403 Forbidden</div>
                <div className="font-semibold text-4xl">Access denied...</div>
                <div className="mt-2 text-2xl">You don&apos;t have permission to access this page</div>
                <Link href="/auth" onClick={handleLogout}>
                    <div className="mt-2 text-lg text-primary">
                        Go to Login Page
                    </div>
                </Link>
            </div>
        </React.Fragment>
    )
}