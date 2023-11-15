import React from "react";
import { useAuth } from "@/context/AuthContext";

export default function HomePage() {
    const auth = useAuth();
    return (
        auth.user ? 
        <div>
            Welcome back! {auth.user.username}
        </div>
        : <div></div>
    )
}