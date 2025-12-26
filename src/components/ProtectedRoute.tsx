'use client'

import { getTokenPayload } from "@/app/auth/getTokenPayload";
import { getUser } from "@/redux/selectors";
import { TokenPayload } from "@/types/types";
import { usePathname } from "next/navigation";
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

export const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {

    const router = useRouter();
    const pathname = usePathname();
    const user = useSelector(getUser);

    const isProtectedPage = (pathname.includes("/profile"));
    const [tokenPayload, setTokenPayload] = useState<TokenPayload | null>(null);
    const [hasMounted, setHasMounted] = useState<boolean>(false);

    useEffect(() => {
        setHasMounted(true);
        setTokenPayload(getTokenPayload());
    }, [])

    useEffect(() => {
        if (hasMounted && (!tokenPayload && !user) && isProtectedPage) {
            router.replace("/");
        }

    }, [hasMounted, isProtectedPage, router, tokenPayload, user]);

    if (((!tokenPayload && !user) && isProtectedPage) || !hasMounted) {
        return null;
    }

    return (
        <div>
            {children}
        </div>
    )
}