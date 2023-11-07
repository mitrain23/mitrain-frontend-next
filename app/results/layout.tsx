import Navbar from "@/src/infrastructure/ui/global/navbar";
import SubNavbar from "@/src/infrastructure/ui/global/subNavbar";
import React from "react";
import { cookies } from "next/headers";
import NavbarResults from "@/src/infrastructure/ui/global/navbar/navbarResults";
import Footer from "@/src/infrastructure/ui/global/footer";

export const metadata = {
  title: "Mitrain Konveksi",
  description: "Mitrain Konveksi",
};

const layout = ({ children }: { children: React.ReactNode }) => {
  const cookieStore = cookies();
  const token = cookieStore.get("token");

  return (
    <div className="min-h-screen relative">
      <SubNavbar />
      {/* <Navbar isResults={true} token={token}/> */}
      <NavbarResults token={token} />
      {children}
      <Footer />
    </div>
  );
};

export default layout;
