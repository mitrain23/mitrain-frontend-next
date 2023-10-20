import React from "react";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

const ServerSideProtectedRoutes = ({ children }: any) => {
  const cookieStore = cookies();
  const token = cookieStore.get("token");
  console.log(token);

  if (!token) {
    console.log("No token");
    redirect("/loginMitra");
  }

  return children;
};

export default ServerSideProtectedRoutes;
