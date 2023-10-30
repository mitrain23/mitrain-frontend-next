"use client";

import React, { useEffect, useState } from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import SubNavbar from "@/src/infrastructure/ui/global/subNavbar";
import { usePathname, useSearchParams } from "next/navigation";
import Navbar from "@/src/infrastructure/ui/global/navbar";
import { RequestCookie } from "next/dist/compiled/@edge-runtime/cookies";

const QueryClientWrapper = ({
  children,
  token,
}: {
  children: React.ReactNode;
  token: RequestCookie | undefined;
}) => {
  const queryClient = new QueryClient();
  const pathName = usePathname();
  const freeNavbar = pathName.includes("maintenance");

  // Conditionally render Navbar based on freeNavbar
  if (freeNavbar) {
    return (
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    );
  }

  const showSubNavbar =
    pathName.includes("results") ||
    pathName.includes("chat") ||
    pathName.includes("iklan") ||
    pathName.includes("details");
  const showNavbarLandingPage = !(
    pathName.includes("results") ||
    pathName.includes("chat") ||
    pathName.includes("iklan") ||
    pathName.includes("details")
  );

  return (
    <QueryClientProvider client={queryClient}>
      {/* {showSubNavbar && <SubNavbar />}
      {showNavbarLandingPage ? <Navbar isResults={false} token={token} /> : <Navbar isResults={true} token={token} />} */}
      {children}
    </QueryClientProvider>
  );
};

export default QueryClientWrapper;
