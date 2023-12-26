import Link from "next/link";
import React from "react";

export default function CredentialError() {
    return (
        <React.Fragment>
            <div className="flex flex-col items-center justify-center h-screen">
                <div className="font-bold text-9xl">403</div>
                <div className="font-semibold text-4xl">Access denied...</div>
                <div className="mt-2 text-2xl">You don&apos;t have permission to access this page</div>
                <Link href="/admin/auth">
                    <div className="mt-2 text-lg text-primary">
                        Go to Login Page
                    </div>
                </Link>
            </div>
        </React.Fragment>
    )
}