import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
import { UserType } from "@/model/UserType";
import React from 'react';
import LandingPage from '@/component/LandingPage'

export interface WithAuthProps {
    user: UserType;
    children: React.ReactNode,
    locale: any
}

export default function WithAuth<T extends WithAuthProps = WithAuthProps>(
    WrappedComponent: React.ComponentType<T>,
) {
    const AuthWrapper = (props: Omit<T, keyof WithAuthProps>) => {
        const auth = useAuth();
        const router = useRouter();

        useEffect(() => {
            if (!auth.user) {
                // Redirect to LandingPage if user is not authenticated
                router.push("/");
            }
        }, [auth.user, router]);

        return auth.user ? React.createElement(WrappedComponent, props as T)
            : React.createElement(LandingPage, props as T);
    };

    // Copy the static methods if present
    if (WrappedComponent.defaultProps) {
        AuthWrapper.defaultProps = WrappedComponent.defaultProps;
    }

    return AuthWrapper;
};
