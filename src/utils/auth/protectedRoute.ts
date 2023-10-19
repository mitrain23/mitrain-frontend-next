'use client';


import { useRouter } from "next/navigation";
import { useEffect } from "react";
import Cookies from 'js-cookie';


const ProtectedRoute = ({ children }: any) => {
    const router = useRouter();

    useEffect(() => {
        const token = localStorage.getItem("token");
        const tokenCookies = Cookies.get('token');
        // console.log(tokenCookies)
        if (!tokenCookies) {
            router.push("/login");
            console.log('oke')
        }
    }, [router]);

    return children;
};

export default ProtectedRoute;
