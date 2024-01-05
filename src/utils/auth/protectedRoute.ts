"use client";

import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const ProtectedRoute = ({ children }: any) => {
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");
    const tokenCookies = Cookies.get("token");
    //
    if (!tokenCookies) {
      router.push("/login");
    }
  }, [router]);

  return children;
};

export default ProtectedRoute;
