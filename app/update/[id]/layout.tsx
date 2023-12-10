import Footer from "@/src/infrastructure/ui/global/footer";
import NavbarResults from "@/src/infrastructure/ui/global/navbar/navbarResults";
import SubNavbar from "@/src/infrastructure/ui/global/subNavbar";
import ServerSideProtectedRoutes from "@/src/utils/auth/serverSideProtectedRoutes";
import { cookies } from "next/headers";
import React from "react";

type TProps = {
  children: React.ReactNode;
};

const Layout: React.FC<TProps> = ({ children }) => {
  const cookieStore = cookies();
  const token = cookieStore.get("token");

  return (
    <ServerSideProtectedRoutes>
      <div className="min-h-screen relative">
        <SubNavbar />
        <NavbarResults token={token} />
        {children}
        <Footer />
      </div>
    </ServerSideProtectedRoutes>
  );
};

export default Layout;
